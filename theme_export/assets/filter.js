/**
 * Collection Filters
 * Tag-based product filtering + sorting, driven entirely client-side over
 * a collection's /products.json feed. Pairs with sections/collection-filters.liquid
 * and snippets/filter-product-card.liquid (shared "pf-" classes/markup).
 */
(function () {
  'use strict';

  var PRODUCTS_PAGE_LIMIT = 250;
  var PRODUCTS_MAX_PAGES = 20; // safety cap: 20 * 250 = 5000 products
  var PRICE_DEBOUNCE_MS = 300;

  var COLOR_MAP = {
    black: '#111111', white: '#ffffff', grey: '#9CA3AF', gray: '#9CA3AF',
    navy: '#1F2A44', blue: '#3B82F6', red: '#DC2626', maroon: '#7F1D1D',
    green: '#16A34A', olive: '#6B7A3A', khaki: '#C3B091', beige: '#E8DCC5',
    brown: '#7B4B27', tan: '#D2B48C', cream: '#F5F0E6', yellow: '#EAB308',
    orange: '#F97316', pink: '#F472B6', purple: '#8B5CF6', burgundy: '#6B1F3A',
    mustard: '#D8A518', denim: '#4A6FA5', charcoal: '#3A3A3A', teal: '#0D9488',
    wine: '#5B2333', rust: '#B7410E', sky: '#87CEEB', lavender: '#B497D6',
    mint: '#98D8C8', peach: '#FFDAB9', gold: '#D4AF37', silver: '#C0C0C0',
    indigo: '#3730A3', coral: '#FF7F50', ivory: '#FFFFF0', turquoise: '#40E0D0'
  };

  var HEART_SVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
    '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"></path></svg>';

  var SIZE_OPTION_REGEX = /^size$/i;
  var COLOR_OPTION_REGEX = /colou?r/i;
  // Canonical garment-size order so auto-detected Size options sort
  // S/M/L/XL instead of alphabetically (which would put "2XL" before "L").
  var SIZE_ORDER = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL', 'XXXL', '4XL', '5XL'];

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  function boot() {
    var roots = document.querySelectorAll('[data-pf-root]');
    roots.forEach(initFilterSection);
  }

  function initFilterSection(root) {
    var configEl = root.querySelector('[data-pf-config]');
    if (!configEl) return;

    var config;
    try {
      config = JSON.parse(configEl.textContent);
    } catch (err) {
      console.error('[collection-filters] invalid config JSON', err);
      return;
    }
    config.moneyFormat = config.moneyFormat || '${{amount}}';

    var state = {
      products: [],
      selected: {}, // groupKey -> Set<string>
      price: {},    // groupKey -> { min, max }
      sort: 'newest'
    };

    restoreStateFromUrl(config, state);
    wireToolbar(root, config, state);
    syncPriceInputsFromState(root, config, state);
    wireGroupEvents(root, config, state);
    wireGridEvents(root);

    // Replace the server-rendered fallback grid with a loading state right
    // away, rather than leaving it on screen for the whole fetch: the SSR
    // grid only sorts/paginates a small server-side slice of the collection,
    // so on large or non-manually-sorted catalogs it can legitimately show a
    // different set than the fully-fetched, fully-sorted client result. That
    // mismatch reads as "products changing" once the real grid swaps in.
    // Showing a skeleton immediately means the visitor only ever sees one
    // real product grid: whatever filter.js computes from the full catalog.
    renderSkeleton(root, config);
    setLoadingBar(root, true);

    fetchAllProducts(config.collectionUrl)
      .then(function (products) {
        products.forEach(precomputeProduct);
        state.products = products;
        computeAutoGroupOptions(config, state);
        applyPriceBoundsAsPlaceholders(root, config, state);
        renderGroupOptions(root, config, state);
        applyFiltersAndRender(root, config, state);
        setLoadingBar(root, false);
      })
      .catch(function (err) {
        console.error('[collection-filters] failed to load products', err);
        setLoadingBar(root, false);
        renderLoadError(root);
      });
  }

  // -------------------- Data loading --------------------

  function fetchAllProducts(collectionUrl) {
    var all = [];

    function fetchPage(page) {
      var url = collectionUrl + '/products.json?limit=' + PRODUCTS_PAGE_LIMIT + '&page=' + page;
      return fetch(url)
        .then(function (res) { return res.json(); })
        .then(function (data) {
          var products = data.products || [];
          all = all.concat(products);
          if (products.length === PRODUCTS_PAGE_LIMIT && page < PRODUCTS_MAX_PAGES) {
            return fetchPage(page + 1);
          }
          return all;
        });
    }

    return fetchPage(1);
  }

  function precomputeProduct(product) {
    product._tagsLower = (product.tags || []).map(function (t) { return t.toLowerCase(); });

    var prices = (product.variants || [])
      .map(function (v) { return parseFloat(v.price); })
      .filter(function (n) { return !isNaN(n); });
    product._minPrice = prices.length ? Math.min.apply(null, prices) : 0;

    var compareAts = (product.variants || [])
      .map(function (v) { return v.compare_at_price ? parseFloat(v.compare_at_price) : 0; })
      .filter(function (n) { return !isNaN(n); });
    product._maxCompareAt = compareAts.length ? Math.max.apply(null, compareAts) : 0;
  }

  // -------------------- Filtering logic --------------------

  // "tag" groups match against product.tags; "size"/"color" groups match
  // against product.options (the structured variant option Shopify always
  // populates), since raw tags aren't reliably namespaced per-store.
  function productMatchesGroupValue(product, group, value) {
    if (group.type === 'tag') {
      return product._tagsLower.indexOf(value.toLowerCase()) !== -1;
    }
    if (group.type === 'size') {
      return productHasOptionValue(product, SIZE_OPTION_REGEX, value);
    }
    if (group.type === 'color') {
      return productHasOptionValue(product, COLOR_OPTION_REGEX, value);
    }
    return false;
  }

  function productHasOptionValue(product, optionNameRegex, value) {
    var opt = (product.options || []).filter(function (o) { return optionNameRegex.test(o.name); })[0];
    if (!opt || !opt.values) return false;
    var valueLower = value.toLowerCase();
    return opt.values.some(function (v) { return v.toLowerCase() === valueLower; });
  }

  function passesGroup(product, group, state) {
    if (group.type === 'price') {
      var range = state.price[group.key];
      if (!range) return true;
      if (range.min != null && product._minPrice < range.min) return false;
      if (range.max != null && product._minPrice > range.max) return false;
      return true;
    }

    var selected = state.selected[group.key];
    if (!selected || selected.size === 0) return true;
    for (var val of selected) {
      if (productMatchesGroupValue(product, group, val)) return true;
    }
    return false;
  }

  function passesAllExcept(product, excludeKey, config, state) {
    return config.groups.every(function (g) {
      if (g.key === excludeKey) return true;
      return passesGroup(product, g, state);
    });
  }

  function passesAll(product, config, state) {
    return passesAllExcept(product, null, config, state);
  }

  function countForOption(group, option, config, state) {
    var count = 0;
    for (var i = 0; i < state.products.length; i++) {
      var product = state.products[i];
      if (!passesAllExcept(product, group.key, config, state)) continue;
      if (productMatchesGroupValue(product, group, option)) count++;
    }
    return count;
  }

  // Populates group.options for auto-detected "size"/"color" groups by
  // scanning every fetched product's variant options - these values aren't
  // known until the catalog is fetched, unlike merchant-typed "tag" groups.
  function computeAutoGroupOptions(config, state) {
    config.groups.forEach(function (group) {
      if (group.type !== 'size' && group.type !== 'color') return;
      var regex = group.type === 'size' ? SIZE_OPTION_REGEX : COLOR_OPTION_REGEX;
      var seen = {}; // lowercase value -> first-seen original casing

      state.products.forEach(function (product) {
        var opt = (product.options || []).filter(function (o) { return regex.test(o.name); })[0];
        if (!opt || !opt.values) return;
        opt.values.forEach(function (v) {
          var key = v.toLowerCase();
          if (!(key in seen)) seen[key] = v;
        });
      });

      var options = Object.keys(seen).map(function (k) { return seen[k]; });
      if (group.type === 'size') {
        options.sort(function (a, b) { return sizeRank(a) - sizeRank(b); });
      } else {
        options.sort(function (a, b) { return a.localeCompare(b); });
      }
      group.options = options;
    });
  }

  function sizeRank(value) {
    var token = String(value).split('/')[0].trim().toUpperCase();
    var idx = SIZE_ORDER.indexOf(token);
    return idx === -1 ? SIZE_ORDER.length + token.charCodeAt(0) : idx;
  }

  function applyPriceBoundsAsPlaceholders(root, config, state) {
    var prices = state.products.map(function (p) { return p._minPrice; }).filter(function (n) { return !isNaN(n); });
    if (!prices.length) return;
    var min = Math.floor(Math.min.apply(null, prices));
    var max = Math.ceil(Math.max.apply(null, prices));

    config.groups.forEach(function (group) {
      if (group.type !== 'price') return;
      var groupEl = root.querySelector('[data-pf-group-key="' + group.key + '"]');
      if (!groupEl) return;
      var minEl = groupEl.querySelector('[data-pf-price-min]');
      var maxEl = groupEl.querySelector('[data-pf-price-max]');
      if (minEl) minEl.placeholder = String(min);
      if (maxEl) maxEl.placeholder = String(max);
    });
  }

  function applyFiltersAndRender(root, config, state) {
    var filtered = state.products.filter(function (p) { return passesAll(p, config, state); });
    filtered = sortProducts(filtered, state.sort);
    renderGrid(root, config, filtered);
    updateCount(root, filtered.length);
  }

  function sortProducts(list, sort) {
    var copy = list.slice();
    switch (sort) {
      case 'price-asc':
        copy.sort(function (a, b) { return a._minPrice - b._minPrice; });
        break;
      case 'price-desc':
        copy.sort(function (a, b) { return b._minPrice - a._minPrice; });
        break;
      case 'title-asc':
        copy.sort(function (a, b) { return a.title.localeCompare(b.title); });
        break;
      case 'title-desc':
        copy.sort(function (a, b) { return b.title.localeCompare(a.title); });
        break;
      case 'newest':
      default:
        copy.sort(function (a, b) { return new Date(b.created_at) - new Date(a.created_at); });
    }
    return copy;
  }

  // -------------------- Rendering: filter panel --------------------

  function renderGroupOptions(root, config, state) {
    config.groups.forEach(function (group) {
      if (group.type !== 'tag' && group.type !== 'size' && group.type !== 'color') return;
      var detailsEl = root.querySelector('[data-pf-group-key="' + group.key + '"]');
      var groupEl = detailsEl && detailsEl.querySelector('[data-pf-group-options]');
      if (!detailsEl || !groupEl) return;

      if (!group.options || group.options.length === 0) {
        detailsEl.hidden = true;
        return;
      }
      detailsEl.hidden = false;

      var selected = state.selected[group.key] || new Set();
      groupEl.innerHTML = group.options.map(function (opt) {
        var count = countForOption(group, opt, config, state);
        var checked = selected.has(opt);
        var disabled = count === 0 && !checked;
        var id = 'pf-opt-' + group.key + '-' + slug(opt);
        var swatch = group.swatches
          ? '<span class="pf-swatch" style="background:' + swatchColor(opt) + '"></span>'
          : '';
        return '<label class="pf-checkbox' + (disabled ? ' pf-checkbox--disabled' : '') + '" for="' + id + '">' +
          '<input type="checkbox" id="' + id + '" data-pf-option value="' + escapeAttr(opt) + '"' +
          (checked ? ' checked' : '') + (disabled ? ' disabled' : '') + '>' +
          swatch +
          '<span class="pf-checkbox__label">' + escapeHtml(opt) + '</span>' +
          '<span class="pf-checkbox__count">(' + count + ')</span>' +
          '</label>';
      }).join('');
    });
  }

  function syncPriceInputsFromState(root, config, state) {
    config.groups.forEach(function (group) {
      if (group.type !== 'price') return;
      var range = state.price[group.key];
      if (!range) return;
      var groupEl = root.querySelector('[data-pf-group-key="' + group.key + '"]');
      if (!groupEl) return;
      var minEl = groupEl.querySelector('[data-pf-price-min]');
      var maxEl = groupEl.querySelector('[data-pf-price-max]');
      if (minEl && range.min != null) minEl.value = range.min;
      if (maxEl && range.max != null) maxEl.value = range.max;
    });
  }

  // -------------------- Rendering: product grid --------------------

  function renderGrid(root, config, products) {
    var grid = root.querySelector('[data-pf-grid]');
    if (!grid) return;
    grid.removeAttribute('aria-busy');
    if (!products.length) {
      grid.innerHTML = '<div class="pf-empty"><p>No products match your filters.</p></div>';
      return;
    }
    grid.style.setProperty('--pf-columns', config.columnsDesktop || 4);
    grid.innerHTML = products.map(function (p) { return cardHtml(config, p); }).join('');
  }

  function cardHtml(config, product) {
    var image = product.images && product.images[0];
    var imgSrc = image ? resizeShopifyImage(image.src, 600) : '';
    var isNew = (Date.now() - new Date(product.created_at).getTime()) < 30 * 24 * 60 * 60 * 1000;
    var price = product._minPrice;
    var compareAt = product._maxCompareAt;

    var priceHtml = '<span class="pf-price">' + formatMoney(config, Math.round(price * 100)) + '</span>';
    if (compareAt > price) {
      priceHtml += '<span class="pf-price pf-price--compare">' + formatMoney(config, Math.round(compareAt * 100)) + '</span>';
    }

    var swatches = colorSwatchesHtml(product);
    var url = '/products/' + product.handle;

    var HEART_PILL_SVG = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" style="color: #D92231; fill: #D92231; margin-right: 4px; vertical-align: middle;"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"></path></svg>';

    return '' +
      '<div class="pf-card" data-pf-card style="position: relative;">' +
      '<a href="' + url + '" class="pf-card__image-link">' +
      (imgSrc
        ? '<img class="pf-card__image" src="' + imgSrc + '" alt="' + escapeAttr(product.title) + '" loading="lazy" width="600" height="600" style="border-radius: 8px;">'
        : '<div class="pf-card__image pf-card__image--placeholder" style="border-radius: 8px;"></div>') +
      '</a>' +
      '<button type="button" class="pf-badge-save" data-pf-wishlist aria-label="Save" aria-pressed="false" style="position: absolute; top: 12px; left: 12px; background: white; border: 1px solid #CCD3DA; border-radius: 20px; padding: 4px 10px; font-size: 11px; font-weight: 600; color: #0D1117; display: flex; align-items: center; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">' + HEART_PILL_SVG + 'Save</button>' +
      '<div class="pf-card__body" style="padding-top: 12px;">' +
      '<a href="' + url + '" class="pf-card__title" style="color: #0D1117; font-weight: 700; font-size: 14px; text-decoration: none; display: block; margin-bottom: 2px;">' + escapeHtml(product.title) + '</a>' +
      '<div class="pf-card__type" style="color: #5C6874; font-size: 12px; margin-bottom: 4px;">' + escapeHtml(product.product_type || 'Premium apparel') + '</div>' +
      '<div class="pf-card__price-row" style="color: #0D1117; font-weight: 700; font-size: 14px;">' + priceHtml + '</div>' +
      (swatches ? '<div class="pf-card__swatches" style="margin-top: 8px;">' + swatches + '</div>' : '') +
      '</div>' +
      '</div>';
  }

  function colorSwatchesHtml(product) {
    var colorOption = (product.options || []).filter(function (o) { return /colou?r/i.test(o.name); })[0];
    if (!colorOption || !colorOption.values) return '';
    var values = colorOption.values;
    var shown = values.slice(0, 5);
    var extra = values.length - shown.length;
    var dots = shown.map(function (v) {
      return '<span class="pf-swatch pf-swatch--sm" style="background:' + swatchColor(v) + '" title="' + escapeAttr(v) + '"></span>';
    }).join('');
    if (extra > 0) dots += '<span class="pf-swatch-more">+' + extra + '</span>';
    return dots;
  }

  function updateCount(root, n) {
    var el = root.querySelector('[data-pf-count]');
    if (el) el.textContent = n + (n === 1 ? ' product' : ' products');
  }

  var SKELETON_CARD_COUNT = 8;

  function renderSkeleton(root, config) {
    var grid = root.querySelector('[data-pf-grid]');
    if (!grid) return;
    grid.style.setProperty('--pf-columns', config.columnsDesktop || 4);
    grid.setAttribute('aria-busy', 'true');
    var card = '<div class="pf-skeleton-card">' +
      '<div class="pf-skeleton-card__img"></div>' +
      '<div class="pf-skeleton-card__line pf-skeleton-card__line--title"></div>' +
      '<div class="pf-skeleton-card__line pf-skeleton-card__line--price"></div>' +
      '</div>';
    grid.innerHTML = new Array(SKELETON_CARD_COUNT).fill(card).join('');
  }

  function renderLoadError(root) {
    var grid = root.querySelector('[data-pf-grid]');
    if (!grid) return;
    grid.removeAttribute('aria-busy');
    grid.innerHTML = '<div class="pf-empty"><p>Couldn\'t load products. Please refresh the page.</p></div>';
  }

  function setLoadingBar(root, loading) {
    var bar = root.querySelector('[data-pf-loading-bar]');
    if (!bar) return;
    bar.hidden = !loading;
    bar.classList.toggle('pf-loading-bar--active', loading);
  }

  // -------------------- Toolbar / panel interaction --------------------

  function wireToolbar(root, config, state) {
    // Filters/Sort controls exist twice - once inline in the desktop
    // toolbar, once in the fixed mobile bottom bar (CSS shows only one set
    // per breakpoint) - both share the same data attributes and are kept
    // in sync here rather than duplicating wiring per breakpoint.
    var toggles = root.querySelectorAll('[data-pf-toggle]');
    var panel = root.querySelector('[data-pf-panel]');
    var backdrop = root.querySelector('[data-pf-backdrop]');
    var closers = root.querySelectorAll('[data-pf-close]');
    var clearBtn = root.querySelector('[data-pf-clear]');
    var sortSelects = root.querySelectorAll('[data-pf-sort]');

    function setExpanded(expanded) {
      toggles.forEach(function (btn) { btn.setAttribute('aria-expanded', expanded ? 'true' : 'false'); });
    }

    function open() {
      panel.hidden = false;
      backdrop.hidden = false;
      requestAnimationFrame(function () {
        panel.classList.add('pf-panel--open');
        backdrop.classList.add('pf-backdrop--visible');
      });
      setExpanded(true);
      document.documentElement.classList.add('pf-scroll-lock');
    }

    function close() {
      panel.classList.remove('pf-panel--open');
      backdrop.classList.remove('pf-backdrop--visible');
      setExpanded(false);
      document.documentElement.classList.remove('pf-scroll-lock');
      window.setTimeout(function () {
        panel.hidden = true;
        backdrop.hidden = true;
      }, 250);
    }

    toggles.forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        if (panel.hidden) open(); else close();
      });
    });
    backdrop.addEventListener('click', close);
    closers.forEach(function (btn) { btn.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !panel.hidden) close();
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        state.selected = {};
        state.price = {};
        root.querySelectorAll('[data-pf-price-min], [data-pf-price-max]').forEach(function (i) { i.value = ''; });
        syncUrl(config, state, true);
        renderGroupOptions(root, config, state);
        applyFiltersAndRender(root, config, state);
      });
    }

    sortSelects.forEach(function (select) {
      select.value = state.sort;
      select.addEventListener('change', function () {
        state.sort = select.value;
        sortSelects.forEach(function (other) { other.value = state.sort; });
        syncUrl(config, state, true);
        applyFiltersAndRender(root, config, state);
      });
    });
  }

  function wireGroupEvents(root, config, state) {
    var groupsEl = root.querySelector('[data-pf-groups]');
    if (!groupsEl) return;

    groupsEl.addEventListener('change', function (e) {
      if (!e.target.matches('[data-pf-option]')) return;
      var groupEl = e.target.closest('[data-pf-group-key]');
      var key = groupEl.getAttribute('data-pf-group-key');
      var value = e.target.value;
      var set = state.selected[key] || (state.selected[key] = new Set());
      if (e.target.checked) set.add(value); else set.delete(value);
      if (set.size === 0) delete state.selected[key];

      syncUrl(config, state, false);
      renderGroupOptions(root, config, state);
      applyFiltersAndRender(root, config, state);
    });

    var handlePriceInput = debounce(function (e) {
      if (!e.target.matches('[data-pf-price-min], [data-pf-price-max]')) return;
      var groupEl = e.target.closest('[data-pf-group-key]');
      var key = groupEl.getAttribute('data-pf-group-key');
      var minEl = groupEl.querySelector('[data-pf-price-min]');
      var maxEl = groupEl.querySelector('[data-pf-price-max]');
      var min = minEl.value !== '' ? parseFloat(minEl.value) : null;
      var max = maxEl.value !== '' ? parseFloat(maxEl.value) : null;
      if (min == null && max == null) {
        delete state.price[key];
      } else {
        state.price[key] = { min: min, max: max };
      }
      syncUrl(config, state, true);
      renderGroupOptions(root, config, state);
      applyFiltersAndRender(root, config, state);
    }, PRICE_DEBOUNCE_MS);

    groupsEl.addEventListener('input', handlePriceInput);
  }

  function wireGridEvents(root) {
    var grid = root.querySelector('[data-pf-grid]');
    if (!grid) return;
    grid.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-pf-wishlist]');
      if (!btn) return;
      e.preventDefault();
      var active = btn.classList.toggle('pf-card__wishlist--active');
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  // -------------------- URL state sync --------------------

  function syncUrl(config, state, replace) {
    var params = new URLSearchParams();
    config.groups.forEach(function (g) {
      if (g.type === 'tag' || g.type === 'size' || g.type === 'color') {
        var set = state.selected[g.key];
        if (set && set.size) params.set('pf_' + g.key, Array.from(set).join('|'));
      } else if (g.type === 'price') {
        var range = state.price[g.key];
        if (range) {
          if (range.min != null) params.set('pf_' + g.key + '_min', range.min);
          if (range.max != null) params.set('pf_' + g.key + '_max', range.max);
        }
      }
    });
    if (state.sort && state.sort !== 'newest') params.set('pf_sort', state.sort);

    var qs = params.toString();
    var url = window.location.pathname + (qs ? '?' + qs : '');
    if (replace) {
      window.history.replaceState(null, '', url);
    } else {
      window.history.pushState(null, '', url);
    }
  }

  function restoreStateFromUrl(config, state) {
    var params = new URLSearchParams(window.location.search);
    config.groups.forEach(function (g) {
      if (g.type === 'tag' || g.type === 'size' || g.type === 'color') {
        var raw = params.get('pf_' + g.key);
        if (raw) state.selected[g.key] = new Set(raw.split('|'));
      } else if (g.type === 'price') {
        var min = params.get('pf_' + g.key + '_min');
        var max = params.get('pf_' + g.key + '_max');
        if (min || max) {
          state.price[g.key] = { min: min ? parseFloat(min) : null, max: max ? parseFloat(max) : null };
        }
      }
    });
    var sort = params.get('pf_sort');
    if (sort) state.sort = sort;
  }

  // -------------------- Helpers --------------------

  function resizeShopifyImage(src, width) {
    if (!src) return src;
    var sep = src.indexOf('?') > -1 ? '&' : '?';
    return src + sep + 'width=' + width;
  }

  function swatchColor(name) {
    var key = String(name).toLowerCase().trim();
    return COLOR_MAP[key] || '#D1D5DB';
  }

  function slug(str) {
    return String(str).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function escapeAttr(str) {
    return escapeHtml(str);
  }

  function debounce(fn, wait) {
    var t;
    return function () {
      var args = arguments;
      var ctx = this;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(ctx, args); }, wait);
    };
  }

  // Mirrors Shopify's standard money.js placeholder-replacement convention
  // (shop.money_format, e.g. "${{amount}}" / "{{amount_no_decimals}}").
  function formatMoney(config, cents) {
    var format = config.moneyFormat || '${{amount}}';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;

    function formatWithDelimiters(number, precision, thousands, decimal) {
      precision = precision == null ? 2 : precision;
      thousands = thousands == null ? ',' : thousands;
      decimal = decimal == null ? '.' : decimal;
      if (isNaN(number) || number == null) return '0';
      number = (number / 100.0).toFixed(precision);
      var parts = number.split('.');
      var dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
      var centsPart = parts[1] ? decimal + parts[1] : '';
      return dollars + centsPart;
    }

    var match = format.match(placeholderRegex);
    if (!match) return format;

    var value;
    switch (match[1]) {
      case 'amount':
        value = formatWithDelimiters(cents, 2);
        break;
      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0);
        break;
      case 'amount_with_comma_separator':
        value = formatWithDelimiters(cents, 2, '.', ',');
        break;
      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, '.', ',');
        break;
      case 'amount_with_space_separator':
        value = formatWithDelimiters(cents, 2, ' ', ',');
        break;
      default:
        value = formatWithDelimiters(cents, 2);
    }
    return format.replace(placeholderRegex, value);
  }
})();
