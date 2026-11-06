// define templates for the Testament-Underground-10.0.0 theme

/* Begin theme init code */
usf.event.add('preinit', function () {
    if (usf.platform.collection === 'aw24') usf.queryRewriter.sort = '-date';
})
/* End theme init code */

var _usfImageWidths;
var usfFilesUrl;
var _usfPriceHtml = `
<div class="price price--listing" :class="{'price--sold-out':isSoldOut,'price--on-sale':hasDiscount}">
    <dl class="price__regular">
        <dt>
            <span class="visually-hidden visually-hidden--inline" v-html="_usfRegulatPriceText"></span>
        </dt>
        <dd>
            <span class="price-item price-item--regular" v-html="priceVaries && !product.selectedVariantId ? _usfFromPriceHtml.replace('{{ lowest_price }}',displayMinDiscountedPrice) : displayDiscountedPrice"></span>
        </dd>
    </dl>
    <dl class="price__sale">
        <dt>
            <span class="visually-hidden visually-hidden--inline" v-html="_usfSalePriceText"></span>
        </dt>
        <dd>
            <span class="price-item price-item--sale" v-html="priceVaries && !product.selectedVariantId ? _usfFromPriceHtml.replace('{{ lowest_price }}',displayMinDiscountedPrice) : displayDiscountedPrice"> </span>
        </dd>
        <dt>
            <span class="visually-hidden visually-hidden--inline" v-html="_usfRegulatPriceText"></span>
        </dt>
        <dd>
            <s class="price-item price-item--regular" v-html="priceVaries && !product.selectedVariantId ? displayMinPrice : displayPrice"></s>
        </dd>
    </dl>
   <div class="sale-item sale-item--percentage icn rectangle_icon" v-if="hasDiscount" > {{salePercent}}% Off </div>
</div>
`;
var _usfFilterBodyTemplate = /*inc_begin_filter-body*/
`<!-- Range filter -->
<div v-if="isRange" class="usf-facet-values usf-facet-range">
    <!-- Range inputs -->
    <div class="usf-slider-inputs usf-clear">
        <span class="usf-slider-input__from">
            <span class="usf-slider-input__prefix" v-html="facet.sliderPrefix" v-if="facet.showSliderInputPrefixSuffix"></span>
            <input :readonly="!hasRangeInputs" :value="rangeConverter(range[0]).toFixed(rangeDecimals)" @change="e => onRangeInput(e, range[0], 0)">
            <span class="usf-slider-input__suffix" v-html="facet.sliderSuffix" v-if="facet.showSliderInputPrefixSuffix"></span>
        </span>
        <span class="usf-slider-div">-</span>
        <span class="usf-slider-input__to">
            <span class="usf-slider-input__prefix" v-html="facet.sliderPrefix" v-if="facet.showSliderInputPrefixSuffix"></span>
            <input :readonly="!hasRangeInputs" :value="rangeConverter(range[1]).toFixed(rangeDecimals)" @change="e => onRangeInput(e, range[1], 1)">
            <span class="usf-slider-input__suffix" v-html="facet.sliderSuffix" v-if="facet.showSliderInputPrefixSuffix"></span>
        </span>
    </div>
	<!-- See API reference of this component at https://docs.sobooster.com/search/storefront-js-api/slider-component -->
    <usf-slider :color="facet.sliderColor" :symbols="facet.sliderValueSymbols" :prefix="facet.sliderPrefix" :suffix="facet.sliderSuffix" :min="facet.min" :max="facet.max" :pips="facet.range[0]" :step="facet.range[1]" :decimals="rangeDecimals" :value="range" :converter="rangeConverter" @input="onRangeSliderInput" @change="onRangeSliderChange"></usf-slider>
</div>
<!-- List + Swatch filter -->
<div v-else ref="values" :class="'usf-facet-values usf-scrollbar usf-facet-values--' + (facet.title == 'Color' ? 'List' : facet.display) + (facet.navigationCollections ? ' usf-navigation' : '') + (facet.valuesTransformation ? (' usf-' + facet.valuesTransformation.toLowerCase()) : '') + (facet.circleSwatch ? ' usf-facet-values--circle' : '')" :style="!usf.isMobileFilter && facet.maxHeight ? { maxHeight: facet.maxHeight } : null">
    <!-- Filter options -->                
    <usf-filter-option v-for="o in visibleOptions" :facet="facet" :option="o" :key="o.id ? o.id : o.label+'_'+o.min+'_'+o.max"></usf-filter-option>
</div>

<!-- More -->
<div v-if="isMoreVisible" class="usf-more" @click="onShowMore" v-html="loc.more"></div>`
/*inc_end_filter-body*/;

var _usfSearchResultsSkeletonItemTpl = 
`<div v-if="view === 'grid'" class="usf-sr-product grid__item collection__page-product product-index js-product-listing usf-skeleton">
    <div class="grid-view-item" v-if="true">
        <div class="usf-img"></div>
        <div class="usf-meta">            
        </div>
    </div>
</div>
<div class="usf-sr-product usf-skeleton" v-else>
    <!-- Image column -->
    <div class="usf-img-column">
        <div class="usf-img"></div>
    </div>

    <!-- Info column -->
    <div class="usf-info-column">
        <div class="usf-title"></div>
        <div class="usf-vendor"></div>
        <div class="usf-price-wrapper"></div>
    </div>
</div>`
;
function _usfSidebarClose(){
    document.body.classList.remove('usf-sidebar-open')
}
function _usfSidebarOpen(){
    document.body.classList.add('usf-sidebar-open')
}
var _usfSearchResultsSummaryTpl = /*inc_begin_search-summary*/
`<span class="usf-sr-summary" v-html="loader === true ? '&nbsp;' : usf.utils.format(term ? loc.productSearchResultWithTermSummary : loc.productSearchResultSummary, result.total, usf.utils.encodeHtml(term))"></span>`
/*inc_end_search-summary*/;

var _usfSearchResultsViewsTpl = /*inc_begin_search-views*/
`<div class="usf-views">
    <button class="usf-view usf-btn usf-icon usf-icon-grid" aria-label="Grid view" :class="{'usf-active': view === 'grid'}" @click.prevent.stop="onGridViewClick"></button>
    <button class="usf-view usf-btn usf-icon usf-icon-list" aria-label="List view" :class="{'usf-active': view === 'list'}" @click.prevent.stop="onListViewClick"></button>
</div>`
/*inc_end_search-views*/;

var _usfSearchResultsSortByTpl = /*inc_begin_search-sortby*/
`<usf-dropdown :placeholder="loc.sort" :value="sortBy" :options="sortByOptions" @input="onSortByChanged"></usf-dropdown>`
/*inc_end_search-sortby*/;

usf.templates = {
    // application
app: /*inc_begin_app*/
`<div id="usf_container" class="usf-zone usf-clear" :class="{'usf-filters-horz': usf.settings.filters.horz}">
    <template v-if="hasFilters && usf.isMobile">
        <usf-filters class="usf-sr-filters"></usf-filters>
    </template>
    <div v-else>
        <div class="usf-sidebar-overlay" @click="_usfSidebarClose"></div>
        <div class="usf-sidebar">
            <span @click="_usfSidebarClose" class="usf-sidebar-close"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 64 64" viewBox="0 0 64 64"><g transform="translate(381 231)"><polyline fill="#134563" points="-370.7 -174.7 -373 -177 -327 -223 -324.7 -220.7 -370.7 -174.7"></polyline><polyline fill="#134563" points="-327 -174.7 -373 -220.7 -370.7 -223 -324.7 -177 -327 -174.7"></polyline></g></svg></span>
            <div  v-if="hasFilters" class="usf-filter-wrap">
                <usf-filters class="usf-sr-filters"></usf-filters>
            </div>
        </div>
    </div>
    <div v-if="!usf.isMobile" class="usf-filter-button" @click="_usfSidebarOpen">
  
                 
                <svg xmlns="http://www.w3.org/2000/svg" width="13.621" height="11" viewBox="0 0 13.621 11">
                <g id="svgexport-10" transform="translate(0 -1.608)">
                    <path id="Path_7946" data-name="Path 7946" d="M0,4H13.621M0,10.811H13.621" transform="translate(0 -0.297)" fill="none" stroke="#282828" stroke-width="1"/>
                    <circle id="Ellipse_2126" data-name="Ellipse 2126" cx="1.5" cy="1.5" r="1.5" transform="translate(2.811 2.108)" fill="#fff" stroke="#282828" stroke-width="1"/>
                    <circle id="Ellipse_2127" data-name="Ellipse 2127" cx="1.5" cy="1.5" r="1.5" transform="translate(7.811 9.108)" fill="#fff" stroke="#282828" stroke-width="1"/>
                </g>
                </svg>


                <span v-html="usf.settings.translation.filters"></span>
    </div>
    <usf-sr></usf-sr>
</div>`
/*inc_end_app*/,


    // search results
    searchResults: `
<div class="usf-sr-container" :class="{'usf-no-facets': noFacets, 'usf-empty': !loader && !hasResults, 'usf-nosearch': !showSearchBox}">
    <!-- Search form -->
    <form v-if="showSearchBox" action="/search" method="get" role="search" class="usf-sr-inputbox">
        <button type="submit" class="usf-icon usf-icon-search usf-btn"></button>
        <input name="q" autocomplete="off" ref="searchInput" v-model="termModel">
        <button v-if="termModel" class="usf-remove usf-btn" @click.prevent.stop="clearSearch"></span>
    </form>

    <div class="usf-sr-config" v-if="usf.isMobile">
        <div class="usf-sr-config__mobile-filters-wrapper">
            <div class="usf-filters" :class="{'usf-has-filters': !!facetFilters}" @click="onMobileToggle">
                <button class="usf-btn" v-html="loc.filters"></button>
            </div>
            ` + _usfSearchResultsSortByTpl + `
        </div>
        
        ` + _usfSearchResultsSummaryTpl + _usfSearchResultsViewsTpl + `
    </div>
    <div class="usf-sr-config" v-else>
        ` + _usfSearchResultsViewsTpl + _usfSearchResultsSummaryTpl + _usfSearchResultsSortByTpl + `
    </div>

    <usf-sr-banner v-if="result && result.extra && result.extra.banner && !result.extra.banner.isBottom" :banner="result.extra.banner"></usf-sr-banner>

    <!-- Load previous -->
    <div id="usf-sr-top-loader" :class="{'usf-with-loader':loader === 'prev'}" v-if="(loader === 'prev' || itemsOffset) && loader !== true && hasResults && usf.settings.search.more !== 'page'"></div>

    <div :class="(view === \'grid\' ? \'collection__page-products product-loop grid__wrapper grid__wrapper-nest edge\' + (_usfSectionSettings.products_per_row == 5 ? ' five--columns ' : '') + (!usf.platform.collection ? ' search_section-grid--wrapper' : '') : \'list-view-items\') + \' usf-results usf-clear usf-\' + view">
        <template v-if="loader===true">` + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl +
        `</template>
        <template v-else>
            <template v-if="hasResults">
                <template v-if="view === 'grid'">
                    <template v-for="p in result.items"><usf-sr-griditem :product="p" :result="result" :key="p.id"></usf-sr-griditem></template>
                </template>
                <template v-else>
                    <template v-for="p in result.items"><usf-sr-listitem :product="p" :result="result" :key="p.id"></usf-sr-listitem></template>
                </template>
            </template>
        </template>
    </div>
    <div v-if="!(loader === true || hasResults)" class="usf-sr-empty">
         <div class="usf-icon"></div>
         <span v-html="term ? usf.utils.format(loc.productSearchNoResults, usf.utils.encodeHtml(term)) : loc.productSearchNoResultsEmptyTerm"></span>
         <button v-if="facetFilters" class="usf-btn usf-btn-action" v-html="loc.clearAllFilters" @click="usf.queryRewriter.removeAllFacetFilters"></button>
    </div>
    <usf-sr-banner v-if="result && result.extra && result.extra.banner && result.extra.banner.isBottom" :banner="result.extra.banner"></usf-sr-banner>

    <!-- Paging & load more -->
    <div class="usf-sr-paging" v-if="loader !== true">
        <div class="usf-sr-more" v-if="hasResults && usf.settings.search.more === 'more'">
            <div class="usf-title" v-html="usf.utils.format(loc.youHaveViewed, itemsLoaded, result.total)"></div>
            <div class="usf-progress">
                <div :style="{width: (itemsLoaded * 100 / result.total) + '%'}"></div>
            </div>
            <div v-if="itemsLoaded < result.total" class="usf-load-more" :class="{'usf-with-loader': loader === 'more'}" @click="onLoadMore"><span v-html="loc.loadMore"></span></div>
        </div>
        <usf-sr-pages v-else-if="hasResults && usf.settings.search.more === 'page'" :page="page" :pages-total="pagesTotal" :pages-to-display="4" :side-pages-to-display="1"></usf-sr-pages>
        <div class="usf-sr-loader usf-with-loader" v-else-if="loader === 'more'"></div>
    </div>
</div>
`,
    // Grid view item
    searchResultsGridViewItem: `
<a :href="productUrl" :id="'product-listing-' + product.id" class="collection__page-product product-index auto js-product-listing" :class="[window._usf_prod_grid,(_usfSectionSettings.mobile_1pr ? 'sm-span-12' : 'sm-span-6')]" :data-alpha="product.title" :data-price="price" :data-product-id="product.id" :data-usf-pid="product.id">
    <div class="product-index-inner">
        <div v-if="isSoldOut && usf.settings.search.showSoldOut" class="so icn" :class="[_usfGlobalSettings.icon_style]" v-html="_usfSoldOutText"></div>
        <template v-else>
            <div v-for="c in product.collections" v-if="_usfCollectionById[c] == 'new'" class="new icn" :class="[_usfGlobalSettings.icon_style]" v-html="_usfNewText"></div>
            <template v-if="hasDiscount && usf.settings.search.showSale" >
                <div v-if="_usfGlobalSettings.sale_items == 'percentage'" class="sale-item icn" :class="['sale-item--' + _usfGlobalSettings.sale_items,_usfGlobalSettings.icon_style]" v-html="priceVaries && !product.selectedVariantId ? loc.sale : loc.save + ' ' + salePercent + '%'"></div>
                <div v-else-if="_usfGlobalSettings.sale_items == 'amount'" class="sale-item icn" :class="['sale-item--' + _usfGlobalSettings.sale_items,_usfGlobalSettings.icon_style]" v-html="priceVaries && !product.selectedVariantId ? loc.sale : loc.save + ' ' + displayDiscount"></div>
            </template>
        </template>
    </div>
    <div class="js-product-image animated prod-image usf-sr-product__image-container" :class="['image_' + _usfGlobalSettings.product_image_size]"  @mouseover="onItemHover" @mouseleave="onItemLeave">
        <a :href="productUrl" @click="onItemClick" :title="product.title">
            <div class="reveal">
                
                <!-- Wishlist
                <usf-plugin name="searchResultsProductWishList" :data="pluginData"></usf-plugin> -->
                <!-- Labels -->
                <usf-plugin name="searchResultsProductLabel" :data="pluginData"></usf-plugin>

                <div v-if="!product.images.length" class="box-ratio" style="padding-bottom: 100%;" v-html="_usfNoImage"></div>
                <template v-else>
                    <div class="box-ratio" :style="'padding-bottom:' + 100/_usfGetImageRatio(selectedImage) + '%;'">
                        <img :src="selectedImageUrl" :alt="product.title" :srcset="_usfGetSrcset(selectedImage,scaledSelectedImageUrl)" :width="selectedImage.width" :height="selectedImage.height" loading="eager" sizes="(min-width: 1601px) 2000px, (min-width: 768px) and (max-width: 1600px) 1200px, (max-width: 767px) 100vw, 900px" :class="">
                    </div>
                    <div v-if="_usfGlobalSettings.switch_image && hoverImage" class="hidden">
                        <div class="box-ratio" :style="'padding-bottom:' + 100/_usfGetImageRatio(hoverImage) + '%;'">
                            <img :src="hoverImageUrl" :alt="product.title" :srcset="_usfGetSrcset(hoverImage,scaledHoverImageUrl)" :width="hoverImage.width" :height="hoverImage.height" loading="lazy" sizes="(min-width: 1601px) 2000px, (min-width: 768px) and (max-width: 1600px) 1200px, (max-width: 767px) 100vw, 900px" :class="">
                        </div>
                    </div>
                </template>
            </div>
        </a>
        <template v-if="_usfGlobalSettings.quickview_type != 'none'">
            <button v-if="_usfGlobalSettings.quickview_type == 'modal'" class="product-listing__quickview-trigger js-quickview-trigger js-modal-open" :class="['quick-view-' + product.id]" type="button" name="button" data-wau-modal-target="quickview" :data-product-url="'/products/' + product.urlName + '?view=quick'" v-html="_usfQuickViewText"></button>
            <button v-else-if="_usfGlobalSettings.quickview_type == 'drawer'" class="product-listing__quickview-trigger js-quickview-trigger js-slideout-open" :class="['quick-view-' + product.id]" type="button" name="button" data-wau-slideout-target="quickview" data-slideout-direction="right" :data-product-url="'/products/' + product.urlName + '?view=quick'" v-html="_usfQuickViewText"></button>
        </template>
        <!-- product image extra -->
             <usf-plugin name="searchResultsProductCart" :data="pluginData"></usf-plugin>
    </div>
    <div class="product-info">
        <div class="product-info-inner">
            <div class="pr-list-title">
 
                <a :href="productUrl">
                    <span v-if="_usfGlobalSettings.vendor && usf.settings.search.showVendor" class="prod-vendor" v-html="product.vendor"></span>
                    <span class="prod-title" v-html="product.title"></span>
                </a>
                <span class="smartwishlist" :data-product="product.id" :data-variant="selectedVariantForPrice.id"></span>      
        
            </div>

            `+ _usfPriceHtml +`
            <!-- Product review -->
            <usf-plugin name="searchResultsProductReview" :data="pluginData"></usf-plugin>
            <div v-if="_usfGlobalSettings.alternate_colors && product.images.length" class="prod-colors">
                <usf-swatches :product="product"></usf-swatches>
            </div>
                <!-- Swatchs-->
            <usf-plugin name="searchResultsProductSwatch" :data="pluginData"></usf-plugin>
        </div>
    </div>
</a>
`,
    // Search result pages
    searchResultsPages: `
<div id="pagination" class="desktop-12 tablet-6 mobile-3">
    <template v-for="e in elements">
        <div v-if="e.type === 'prev'" class="pagiprev">
            <a href="javascript:void(0)" :title="loc.prevPage" @click="onPrev" class="paginate_prev">
                <svg class="testament--apollo-left-carrot pagination--icon vib-center" height="10px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 13.3 20" xml:space="preserve">
                    <g class="hover-fill" fill="var(--link-color)">
                    <polygon class="st0" points="13.3,2.3 10.8,0 0,10 10.8,20 13.3,17.7 5,10 "></polygon>
                    </g>
                    <style>.pagination .testament--apollo-left-carrot:hover .hover-fill { fill: var(--link-color);}</style>
                </svg>
            </a>
        </div>

        <span v-else-if="e.type === 'dots'">…</span>
        <span v-else-if="e.type === 'page' && e.current" class="current" style="font-weight:bold">{{e.page}}</span>
        <a v-else-if="e.type === 'page' && !e.current" class="page" href="javascript:void(0)" @click="ev=>onPage(e.page,ev)" :title="usf.utils.format(loc.gotoPage,e.page)">{{e.page}}</a>
        
        <div v-else-if="e.type === 'next'" class="paginext">
            <a href="javascript:void(0)" :title="loc.nextPage" @click="onNext" class="paginate_next">
                <svg class="testament--apollo-right-carrot pagination--icon vib-center" height="10px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 13.3 20" xml:space="preserve">
                    <g class="hover-fill" fill="var(--link-color)">
                    <polygon points="0,2.3 2.5,0 13.3,10 2.5,20 0,17.7 8.3,10 "></polygon>
                    </g>
                    <style>.pagination .testament--apollo-right-carrot:hover .hover-fill { fill: var(--link-color);}</style>
                </svg>
            </a>
        </div>
    </template>
</div>
`,
    // List view item
    searchResultsListViewItem: /*inc_begin_search-list-item*/
`<a class="usf-sr-product" @click="onItemClick" @mouseover="onItemHover" @mouseleave="onItemLeave" :href="productUrl" :data-usf-pid="product.id">
    <!-- Image column -->
    <div class="usf-img-column">
        <!-- product image -->
        <div class="usf-img-wrapper usf-sr-product__image-container" :class="{'usf-has-second-img': hoverImage}">
            <div class="usf-main-img lazyload" :data-bgset="_usfGetScaledImageUrl(scaledSelectedImageUrl)" :style="{'background-image': 'url(' + getSelectedImageUrl('600') + ')'}"></div>
            <span class="usf-img-loader"></span>
            <template v-if="hoverImage">
                <div class="usf-second-img lazyload" :data-bgset="_usfGetScaledImageUrl(scaledHoverImageUrl)" :style="{'background-image': 'url(' + getHoverImageUrl('600') + ')'}"></div>
                <span class="usf-img-loader"></span>
            </template>
            <!-- product image extra -->
            <usf-plugin name="searchResultsProductPreview" :data="pluginData"></usf-plugin>
            <usf-plugin name="searchResultsProductCart" :data="pluginData"></usf-plugin>
            
            <div v-if="isSoldOut && usf.settings.search.showSoldOut" class="usf-badge"><span v-html="loc.soldOut"></span></div>
            <div v-else-if="hasDiscount && usf.settings.search.showSale" class="usf-badge usf-sale-badge"><span v-html="loc.sale"></span></div>
        </div>
    </div>

    <!-- Info column -->
    <div class="usf-info-column">
        <div class="usf-title" v-html="product.title"></div>
        <div class="usf-vendor" v-if="usf.settings.search.showVendor" v-html="product.vendor"></div>

        <!-- price -->
        <usf-plugin name="searchResultsProductPrice" :data="pluginData"></usf-plugin>
        <div class="usf-price-wrapper" :class="{'usf-price--sold-out': isSoldOut}" v-if="!usf.plugins.lastRenderResult" :data-variant-id="product.selectedVariantId">
            <span class="usf-price" :class="{'usf-has-discount': hasDiscount}" v-html="displayPrice"></span>
            <span class="usf-discount" v-if="hasDiscount" v-html="displayDiscountedPrice"></span>
            <span v-if="hasDiscount" class="usf-price-savings" v-html="loc.save + ' ' + salePercent + '%'"></span>
        </div>
        <div class="usf-description"></div>
    </div>
</a>`
/*inc_end_search-list-item*/,
    // AddToCart Plugin	
    addToCartPlugin: /*inc_begin_addtocart-plugin*/
`<form class="usf-add-to-cart" method="POST" enctype="multipart/form-data" :action="usf.platform.addToCartUrl">
    <input type="hidden" name="form_type" value="product">
    <input type="hidden" name="utf8" value="✓">
    <input type="hidden" name="quantity" value="1">
    <input type="hidden" name="id" :value="variant.id">
    <usf-choose-options1 v-if="args.product.variants.length > 1" :loc="usf.settings.translation" :args="args"></usf-choose-options1>
    <button v-else-if="!usf.utils.isVariantSoldOut(variant)" type="submit" name="add" class="usf-add-to-cart-btn" :data-product-id="args.product.id" @click.prevent.stop="_usfAddToCart">
        <span class="usf-icon usf-icon-cart"></span>
        <span class="usf-label" v-html="loc.addToCart"></span>
    </button>
</form>`
/*inc_end_addtocart-plugin*/,

    // Preview Plugin
    previewPlugin:``,
    previewPluginModal: ``,

    searchResultsBanner: /*inc_begin_search-banner*/        
`<div class="usf-sr-banner">
    <a :href="banner.url || 'javascript:void(0)'" :alt="banner.description">
        <img :src="banner.mediaUrl" style="max-width:100%">
    </a>
</div>
`
/*inc_end_search-banner*/,

    ////////////////////////
    // Filter templates
    // facet filters breadcrumb
    filtersBreadcrumb: /*inc_begin_filters-breadcrumb*/
`<div v-if="usf.settings.filterNavigation.showFilterArea && root.facetFilters && root.facets && facetFilterIds.length" class="usf-refineby">
    <!-- Breadcrumb Header -->
    <div class="usf-title usf-clear">
        <span class="usf-pull-left usf-icon usf-icon-equalizer"></span>
        <span class="usf-label" v-html="loc.filters"></span>

        <!-- Clear all -->
        <button class="usf-clear-all usf-btn" v-html="loc.clearAll" @click.prevent.stop="root.removeAllFacetFilters" :aria-label="loc.clearAllFilters"></button>
    </div>

    <!-- Breadcrumb Values -->
    <div class="usf-refineby__body">
        <template v-for="facetId in facetFilterIds" v-if="(facet = root.facets.find(fc => fc.id === facetId)) && (f = root.facetFilters[facetId])">
            <template v-for="queryValStr in f[1]">
                <div class="usf-refineby__item usf-pointer usf-clear" @click.prevent.stop="root.removeFacetFilter(facetId, queryValStr)">
                    <button class="usf-btn"><span class="usf-filter-label" v-html="facet.title + ': '"></span><b v-html="root.formatBreadcrumbLabel(facet, f[0], usf.utils.encodeHtml(queryValStr))"></b></button><span class="usf-remove"></span>
                </div>
            </template>
        </template>
    </div>
 </div>`
 /*inc_end_filters-breadcrumb*/,

    // facet filters    
    filters: /*inc_begin_filters*/
// Vert & Horz modes have different render order
`<div class="usf-facets usf-no-select usf-zone" :class="{'usf-facets--mobile':usf.isMobileFilter}">
<!-- Mobile view -->
<template v-if="usf.isMobile">
    <div class="usf-close" @click="onMobileBack(1)"></div>
    <div class="usf-facets-wrapper">
        <!-- Header. shows 'Filters', facet name, etc. -->
        <div class="usf-header">
            <!-- Single facet mode -->
            <template v-if="isSingleFacetMode">
                <div class="usf-title" @click="onMobileBack(0)" v-html="facets[0].title"></div>
                <div v-if="facetFilters" class="usf-clear" @click="removeAllFacetFilters" v-html="loc.clear"></div>
            </template>

            <!-- When a filter is selected -->
            <template v-else-if="mobileSelectedFacet">
                <div class="usf-title usf-back" @click="onMobileBack(0)" v-html="mobileSelectedFacet.title"></div>
                <div v-if="facetFilters && facetFilters[mobileSelectedFacet.id]" class="usf-clear" @click="removeFacetFilter(mobileSelectedFacet.id)" v-html="loc.clear"></div>
                <div v-else-if="mobileSelectedFacet.multiple" class="usf-all" @click="selectFacetFilter(mobileSelectedFacet)" v-html="loc.all"></div>
            </template>

            <!-- When no filter is selected -->
            <template v-else>
                <div class="usf-title" @click="onMobileBack(0)" v-html="loc.filters"></div>
                <div v-if="facetFilters" class="usf-clear" @click="removeAllFacetFilters" v-html="loc.clearAll"></div>
            </template>
        </div>

        <div class="usf-body">
            <!-- Desktop-like filter in mobile -->
            <template v-if="usf.settings.filters.desktopLikeMobile">
                <usf-filter-breadcrumb></usf-filter-breadcrumb>
                
                <!-- Facets body -->
                <div class="usf-facets__body">
                    <usf-filter :facet="f" :key="f.id" v-for="f in facets"></usf-filter>
                </div>
            </template>
            
            <!-- Mobile filter -->
            <template v-else>
                <!-- List all filter options, in single facet mode -->
                <usf-filter v-if="isSingleFacetMode" :facet="facets[0]"></usf-filter>

                <!-- List all filter options, when a filter is selected -->
                <usf-filter v-else-if="mobileSelectedFacet" :facet="mobileSelectedFacet"></usf-filter>

                <!-- List all when there are more than one facet -->
                <template v-else v-for="f in facets">
                    <template v-if="canShowFilter(f)">
                        <div :key="f.id" class="usf-facet-value" @click="onMobileSelectFacet(f)">
                            <span class="usf-title" v-html="f.title"></span>
                            <div v-if="(selectedFilterOptionValues = facetFilters && (ff = facetFilters[f.id]) ? ff[1] : null)" class="usf-dimmed">
                                <span v-for="cf in selectedFilterOptionValues" v-html="formatBreadcrumbLabel(f, f.facetName, cf)"></span>
                            </div>
                        </div>
                    </template>
                </template>
            </template>
        </div>

        <!-- View items -->
        <div class="usf-footer">
            <div @click="onMobileBack(1)" v-html="loc.viewItems"></div>
        </div>
    </div>
</template>

<!-- Desktop view -->
<template v-else>
    <usf-filter-breadcrumb></usf-filter-breadcrumb>
    <!-- Filters Loader -->
    <div v-if="!facets" class="usf-facets__first-loader">
        <template v-for="i in 3">
            <div class="usf-facet"><div class="usf-title usf-no-select"><span class="usf-label"></span></div>
                <div v-if="!usf.settings.filters.horz" class="usf-container"><div class="usf-facet-values usf-facet-values--List"><div class="usf-relative usf-facet-value usf-facet-value-single"><span class="usf-label"></span><span class="usf-value"></span></div><div class="usf-relative usf-facet-value usf-facet-value-single"><span class="usf-label"></span><span class="usf-value"></span></div></div></div>
            </div>
        </template>
    </div>
    <!-- Facets body -->
    <div v-else class="usf-facets__body">
        <usf-filter :facet="f" :key="f.id" v-for="f in facets"></usf-filter>
    </div>
</template>
</div>`
/*inc_end_filters*/,

    // facet filter item
    filter: /*inc_begin_filter*/
`<div v-if="canShow" class="usf-facet" :class="{'usf-collapsed': collapsed && !usf.isMobileFilter, 'usf-has-filter': isInBreadcrumb}">
    <!-- Mobile filter -->
    <div v-if="usf.isMobileFilter" class="usf-container">
        <!-- Search box -->
        <input v-if="hasSearchBox" class="usf-search-box" :aria-label="loc.filterOptions" :placeholder="loc.filterOptions" :value="term" @input="v => term = v.target.value">

        <!-- Values -->
        ` + _usfFilterBodyTemplate +
    `</div>

    <!-- Desktop filter -->
    <template v-else>
        <!-- Filter title -->
        <div class="usf-clear">
            <div class="usf-title usf-no-select" @click.prevent.stop="onExpandCollapse">
                <button class="usf-label usf-btn" v-html="facet.title" :aria-label="usf.utils.format(loc.filterBy,facet.title)" :aria-expanded="!collapsed"></button>
                <usf-helptip v-if="facet.tooltip" :tooltip="facet.tooltip"></usf-helptip>            
                <!-- 'Clear all' button to clear the current facet filter. -->
                <button v-if="isInBreadcrumb" class="usf-clear-all usf-btn" :title="loc.clearFilterOptions" :aria-label="usf.utils.format(loc.clearFiltersBy,facet.title)" @click.prevent.stop="onClear" v-html="loc.clear"></button>
                <span class="usf-pm"></span>
            </div>
        </div>

        <!-- Filter body -->
        <div class="usf-container">
            <!-- Search box -->
            <input v-if="hasSearchBox" class="usf-search-box" :placeholder="loc.filterOptions" :value="term" @input="v => term = v.target.value">

            ` + _usfFilterBodyTemplate +
        `
        </div>
    </template>
</div>`
/*inc_end_filter*/,

    // facet filter option
    filterOption: /*inc_begin_filter-option*/
`<div v-if="children" :class="(isSelected ? 'usf-selected ' : '') + ' usf-relative usf-facet-value usf-facet-value-single usf-with-children' + (collapsed ? ' usf-collapsed' : '')">
    <!-- option label -->
    <button class="usf-pm usf-btn" aria-label="Toggle children" v-if="children" @click.prevent.stop="onToggleChildren"></button>
    <button class="usf-label usf-btn" v-html="label" @click.prevent.stop="onToggle"></button>

    <!-- product count -->
    <span v-if="!(!usf.settings.filterNavigation.showProductCount || (swatchImage && !usf.isMobileFilter)) && option.value !== undefined" class="usf-value">{{option.value}}</span>    

    <div class="usf-children-container" v-if="children && !collapsed">
        <button :class="'usf-child-item usf-btn usf-facet-value' + (isChildSelected(c) ? ' usf-selected' : '')" v-for="c in children" v-html="getChildLabel(c)" @click="onChildClick(c)"></button>
    </div>
</div>
<button v-else :data-title="facet.title" :class="(isSelected ? 'usf-selected ' : '') + (swatchImage ? (facet.title == 'Color' ? '' : ' usf-facet-value--with-background') : '') + ' usf-btn usf-relative usf-facet-value usf-facet-value-' + (facet.multiple ? 'multiple' : 'single')" :title="isSwatch || isBox ? label + ' (' + option.value + ')' : undefined" :style="usf.isMobileFilter ? null : (facet.title == 'Color' ? null : swatchStyle)" @click.prevent.stop="onToggle">
    <!-- checkbox -->
    <div v-if="!isBox && (!isSwatch || facet.title == 'Color') && facet.multiple" :class="'usf-checkbox' + (isSelected ? ' usf-checked' : '')">
        <span class="usf-checkbox-inner"></span>
    </div> 

    <!-- swatch image in mobile -->
    <div v-if="swatchImage && usf.isMobileFilter || facet.title == 'Color'" class="usf-mobile-swatch" :style="swatchStyle"></div>

    <!-- option label -->
    <span class="usf-label usf-btn" v-html="label"></span>
    
    <!-- product count -->
    <span v-if="!(!usf.settings.filterNavigation.showProductCount || (swatchImage && !usf.isMobileFilter)) && option.value !== undefined" class="usf-value">{{option.value}}</span>
</button>`
/*inc_end_filter-option*/,

    // Instant search popup
    instantSearch: /*inc_begin_instantsearch*/
`<div :class="'usf-popup usf-zone usf-is usf-is--compact usf-is--' + position + (shouldShow ? '' : ' usf-hide') + (isEmpty ? ' usf-empty' : '') + (hasProductsOnly ? ' usf-is--products-only' : '') + (firstLoader ? ' usf-is--first-loader': '')"  :style="usf.isMobile ? null : {left: this.left + 'px',top: this.top + 'px',width: this.width + 'px'}">
    <!-- Mobile search box -->
    <div v-if="usf.isMobile">
        <form class="usf-is-inputbox" :action="searchUrl" method="get" role="search">
            <span class="usf-icon usf-icon-back usf-close" @click="usf.utils.hideInstantSearch"></span>
            <input name="q" autocomplete="off" ref="searchInput" :value="term" @input="onSearchBoxInput">
            <span class="usf-remove" v-if="term" @click="onClear"></span>
        </form>
    </div>

    <!-- First loader -->
    <div class="usf-is-first-loader" v-if="firstLoader">
        <div class="usf-clear">
            <div class="usf-img"></div>
            <div class="usf-title"></div>
            <div class="usf-subtitle"></div>
        </div>
        <div class="usf-clear">
            <div class="usf-img"></div>
            <div class="usf-title"></div>
            <div class="usf-subtitle"></div>
        </div>
        <div class="usf-clear">
            <div class="usf-img"></div>
            <div class="usf-title"></div>
            <div class="usf-subtitle"></div>
        </div>
    </div>

    <!-- All JS files loaded -->
    <template v-else>
        <!-- Empty view -->
        <div v-if="isEmpty" class="usf-is-no-results">
            <div style="background:url('//cdn.shopify.com/s/files/1/0257/0108/9360/t/85/assets/no-items.png?t=2') center no-repeat;min-height:160px"></div>
            <div v-html="usf.utils.format(loc.noMatchesFoundFor, usf.utils.encodeHtml(term))"></div>
        </div>
        <template v-else>
            <!-- Body content -->
            <div class="usf-is-content">
                <!-- Products -->
                <div class="usf-is-matches usf-is-products">
                    <div class="usf-title" v-html="queryOrTerm ? loc.productMatches : loc.trending"></div>
                    
                    <div class="usf-is-list" v-if="result.items.length">
                        <!-- Did you mean -->
                        <span class="usf-is-did-you-mean" v-html="usf.utils.format(loc.didYouMean, usf.utils.encodeHtml(term), result.query)" v-if="termDiffers"></span>

                        <!-- Product -->
                        <usf-is-item v-for="p in result.items" :product="p" :result="result" :key="p.id + '-' + p.selectedVariantId"></usf-is-item>
                    </div>
                    <div class="usf-is-list" v-else style="background:url('//cdn.shopify.com/s/files/1/0257/0108/9360/t/85/assets/no-products.png?t=2') center no-repeat;min-height:250px"></div>
                </div>

                <div class="usf-is-side">
                    <!-- Suggestions -->
                    <div class="usf-is-matches usf-is-suggestions" v-if="result.suggestions && result.suggestions.length">
                        <div class="usf-title" v-html="loc.searchSuggestions"></div>
                        <button v-for="s in result.suggestions" class="usf-is-match usf-btn" v-html="usf.utils.highlight(s, result.query)" @click="search(s)"></button>
                    </div>

                    <!-- Collections -->
                    <div class="usf-is-matches usf-is-collections" v-if="result.collections && result.collections.length">
                        <div class="usf-title" v-html="loc.collections"></div>
                        <button v-for="c in result.collections" class="usf-is-match usf-btn" v-html="usf.utils.highlight(c.title, result.query)" @click="selectCollection(c)"></button>
                    </div>

                    <!-- Pages -->
                    <div class="usf-is-matches usf-is-pages" v-if="result.pages && result.pages.length">
                        <div class="usf-title" v-html="loc.pages"></div>
                        <button v-for="p in result.pages" class="usf-is-match usf-btn" v-html="usf.utils.highlight(p.title, result.query)" @click="selectPage(p)"></button>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="usf-is-viewall">
                <button class="usf-btn" @click="search(queryOrTerm)" v-html="usf.utils.format(queryOrTerm ? loc.viewAllResultsFor : loc.viewAllResults, usf.utils.encodeHtml(queryOrTerm))"></button>
            </div>
        </template>
    </template>
</div>`
/*inc_end_instantsearch*/
,

    // Instant search item
    instantSearchItem:/*inc_begin_instantsearch-item*/
`<div class="usf-is-product usf-clear" @click="onItemClick">
    <!-- Image -->
    <div class="usf-img-wrapper usf-pull-left">
        <img class="usf-img" :src="selectedImageUrl" :alt="selectedImage.alt">
    </div>
    
    <div class="usf-pull-left">
        <!-- Title -->
        <button class="usf-title usf-btn" v-html="usf.utils.highlight(product.title, result.query)"></button>

        <!-- Vendor -->
        <div class="usf-vendor" v-html="product.vendor" v-if="usf.settings.search.showVendor"></div>

        <!-- Prices -->
        <div class="usf-price-wrapper">
            <span class="usf-price" :class="{ 'usf-has-discount': hasDiscount }" v-html="displayPrice"></span>
            <span v-if="hasDiscount" class="usf-discount" v-html="displayDiscountedPrice"></span>
        </div>
    </div>
</div>`
/*inc_end_instantsearch-item*/,
};

usf.event.add('init', function () {    
    var UsfChooseOptions = {
    props: {
        loc: Object,
        args: Object,
    },
    data() {

        var product = this.args.product;
        var owner = this.args.owner
        var selectedOptions = {};
        var selectedVariant = owner.selectedVariantForPrice;
        for (let i = 0; i < product.options.length; i++) {
            var o = product.options[i];

            if (selectedVariant.options[i] != undefined)
                selectedOptions[i] = selectedVariant.options[i];
        }
        return {
            product: product,
            show: false,
            selectedOptions: selectedOptions,
            selectedVariant: selectedVariant,
            settings: {},
            owner: owner,
            unavailable: false,
            quantity: 1,
            availableOptions: [],
            hasClick: false,
            optionClicked: 0,
            loader: false
        }
    },
    created() {
        // get plugin settings or default.
        var settings = usf.settings.plugins['swatch-colorsizeswatch'] || {
            swatchType: 'circle',
            colorNames: 'Color',
            showImage: true,
            showSoldOutVariant: true,
            hideOptions: [], //ex: ['Size']
            showToolTip: true,
            tooltipPosition: 'top' // top/left/right
        };
        var colorsMapStr = settings.colorsMap;
        if (colorsMapStr && colorsMapStr.length) {
            var map = {};
            colorsMapStr.split(';').forEach(c => {
                var n = c.indexOf(':');
                if (n !== -1)
                    map[c.substr(0, n)] = c.substr(n + 1);
            })
            settings.colorsMap = map;
        }

        this.settings = settings;
    },
    mounted(){
        document.body.classList.add('usf-has-popup');
    },
    beforedestroy(){
        document.body.classList.remove('usf-has-popup');
    },
    methods: {
        selectOptionValue(e, optionIndex, optionValue) {
            e.preventDefault();
            this.$set(this.selectedOptions, optionIndex, optionValue);

            // how to map option to variant? 
            var options = this.product.options;
            // selected options are saved in 'selectedOptions'.
            // 
            var variants = this.product.variants;

            for (var i = 0; i < variants.length; i++) {
                var variant = variants[i];
                var variantOptions = variant.options;

                var found = true;
                for (var n = 0; n < variantOptions.length; n++) {
                    var voptValue = variantOptions[n];

                    if (voptValue !== this.selectedOptions[n]) {
                        found = false;
                        break;
                    }
                }

                // if found, select the variant.
                if (found) {
                    // DO NOT update image here as this add to cart plugin is not a swatch plugin.

                    this.unavailable = false;
                    this.selectedVariant = variant;

                    // update price when selected variant is changed
                    var discount = variant.compareAtPrice > variant.price ? variant.compareAtPrice - variant.price : 0;
                    this.owner.hasDiscount == !!discount;
                    var price = variant.price;
                    var originalPrice = variant.compareAtPrice > variant.price ? variant.compareAtPrice : variant.price; 
                    this.owner.displayPrice = usf.utils.getDisplayPrice(originalPrice);
                    this.owner.displayDiscountedPrice = usf.utils.getDisplayPrice(price);

                    // update hidden input: update selectedVariant Id
                    var ip = this.owner.$el.querySelector('form.usf-add-to-cart input[name="id"]');
                    if(ip)
                        ip.value = variant.id;

                    break;
                } else {
                    //hide add to cart button if variant unavailable
                    this.unavailable = true
                }
            }

            /*hide values that is not available based on the selected option*/
            if (this.settings.hideOptionsUnavailable) {
                this.hasClick = true;
                this.availableOptions = [];
                this.optionClicked = optionIndex;
                loop1:
                for (var j = 0; j < variants.length; j++) {
                    var variant = variants[j];
                    var variantOptions = variant.options;
                    loop2:
                    for (var k = 0; k < variantOptions.length; k++) {

                        var voptValue = variantOptions[k];

                        if (voptValue === optionValue && optionIndex === k) {
                            for (var n = 0; n < variantOptions.length; n++) {
                                if (n != k) {
                                    this.availableOptions.push({
                                        optIndex: n,
                                        optValue: variantOptions[n]
                                    })
                                }
                            }

                            break loop2;
                        }
                    }
                }
            }
        },
    },

    render(h) {
        if (!this.show) {
    var soldOut = this.owner.isSoldOut;
    return h('button', {
        staticClass: 'usf-add-to-cart-btn sold',
        class: {
            'usf-soldout': soldOut,
        },
        attrs: {
            type: 'submit',
            'data-product-id': this.product.id,
        },
        on: {
            mouseover: (e) => {
                usf.utils.stopEvent(e);
                this.show = true;
            },
            touchstart: (e) => {
                usf.utils.stopEvent(e);
                this.show = true;
            }
        }
    }, [
        h('span', { class: 'usf-icon usf-icon-cart' }),
        h('span', { class: 'usf-label' }, [soldOut ? this.loc.soldOut : this.loc.chooseOptions])
    ])
}


        var unavailableVariant = this.unavailable;
        var soldOut = usf.utils.isVariantSoldOut(this.selectedVariant);
        
        var selectedVariant = this.owner.selectedVariantForPrice;
        
        var maxAvail = selectedVariant.available;
        var continueSelling = selectedVariant.flags & 1;

        if (continueSelling || maxAvail === -2147483648)
            maxAvail = 1000000;

        var s = this.settings;
        return h('div', {
            staticClass: "usf-quick-popup",
            class: { 'usf-quick-show': this.show },
            on: { click: e => usf.utils.stopEvent(e) }
        }, [
            h('div', {
                staticClass: 'usf-customLayer', 
                on: {
                    click: (e) => {
                        window.location.href=this.owner.productUrl
                    },
                    mouseleave:(e) => {
                        this.show = false;
                    }
                }
            }),
            h('div', { class: 'usf-quick-card',
            on: {
                mouseleave:(e) => {
                            this.show = false;
                        }
            }
            

             }, [
                h('span', {
                    class: 'usf-remove',
                    on: {
                        click: (e) => {
                            this.show = false;
                        }
                    }
                }),
                !usf.isMobile ? null : h('div', {
                    class: 'usf-quick-product-cart'
                }, [
                    h('div', { class: 'usf-quick-product-image-wrap' }, [
                        h('div', { class: 'usf-quick-product-image' }, [
                            h('img', {
                                attrs: {
                                    src: this.owner.selectedImageUrl
                                }
                            })
                        ])
                    ]),
                    h('div', { class: 'usf-quick-product-title' }, [
                        h('h3', [
                            h('a', {
                                attrs: {
                                    href: this.owner.productUrl
                                }
                            }, [this.owner.product.title])
                        ]),
                        h('div', { class: 'usf-quick-price-wrap' }, [
                            h('span', {
                                staticClass: 'usf-quick-price',
                                class: {
                                    'usf-quick-sale-price': this.owner.hasDiscount
                                },
                                domProps: { innerHTML: this.owner.displayDiscountedPrice }
                            }),
                            this.owner.hasDiscount ? h('span', {
                                staticClass: 'usf-quick-price usf-compare-at-price',
                                domProps: { innerHTML: this.owner.displayPrice }
                            }) : null
                        ])
                    ])
                ]),
                h('div', {
                    class: 'usf-quick-swatch'
                }, [
                    h('div', {
                        attrs: {
                            'data-product-id': this.product.id
                        },
                        class: 'usf-swatchs'
                    }, [
                        this.product.options.map((option, optionIndex) => {
                            var isColor = s.colorNames == option.name;
                            var renderedOptions = {};
                            if (!s.hideOptions.includes(option.name)) return h('ul', {
                                class: {
                                    'usf-is-color': isColor,
                                    'usf-swatch-circle': isColor && s.swatchType == 'circle'
                                },
                                attrs: { 'data-option-index': optionIndex }
                            }, [
                                h('h4', { class: 'usf-swatch__title' }, [
                                    option.name + ': ',
                                    h('span', { class: 'name_current' }, [option.values[this.selectedOptions[optionIndex]]])
                                ]),
                                option.values.map((o, index) => {
                                    for (let x = 0; x < this.product.variants.length; x++) {
                                        var v = this.product.variants[x];
                                        for (let i = 0; i < v.options.length; i++) {
                                            var vrOpt = this.product.options[i].values[v.options[i]];
                                            const isSoldOut = usf.utils.isVariantSoldOut(v);

                                            if (o === vrOpt && !renderedOptions[o] && (s.showSoldOutVariant || !usf.utils.isVariantSoldOut(v))) {
                                                renderedOptions[o] = 1;
                                                var isUnavailable = true;
                                                if (!this.hasClick || optionIndex == this.optionClicked || !this.settings.hideOptionsUnavailable)
                                                    isUnavailable = false;
                                                else
                                                    for (let z = 0; z < this.availableOptions.length; z++) {
                                                        var availableOption = this.availableOptions[z];
                                                        if (availableOption.optIndex == optionIndex && availableOption.optValue == index) {
                                                            isUnavailable = false;
                                                            break;
                                                        }
                                                    }

                                                var colorStyle;
                                                if (isColor) {
                                                    var img;
                                                    if (s.showImage && (img = this.product.images[v.imageIndex])) {
                                                        var bgImg = _usfGetOriginImgWithSize(img.url, '50x50');

                                                        colorStyle = `background-image:url(${bgImg});`;
                                                    } else {
                                                        var colorsMap = s.colorsMap;
                                                        var color;
                                                        if (colorsMap)
                                                            color = colorsMap[o];
                                                        if (!color)
                                                            color = _usfHandlezie(o);

                                                        // allow background image
                                                        colorStyle = color.startsWith('//') || color.startsWith('http') ?
                                                            `background-image:url(${color});` :
                                                            `background-color:${color};`;
                                                    }
                                                }
                                                return h('li', {
                                                    staticClass: '',
                                                    class: { 'usf-option-disabled': usf.utils.isVariantSoldOut(v), 'usf-selected': this.selectedOptions[optionIndex] === index, 'usf-swatch-unavailable': isUnavailable },
                                                    attrs: { 'data-index': index, type: 'submit', 'data-product-id': this.product.id, },
                                                         class: 'clickme',
                    on: {
                        click: (e) => {
                            usf.utils.stopEvent(e);
                            this.loader = true;
                            _usfAddToCart(e, () => { 
                                this.loader = false;
                                this.show = false;                            
                            });
                        }
                    }
                                                }, [
                                                    s.showToolTip && isColor ? h('span', { class: `usf-tooltip usf-tooltip-${s.tooltipPosition}` }, [o]) : null,
                                                    h('label', {
                                                        attrs: { for: 'size-' + v.id },
                                                        style: colorStyle,
                                                        on: {
                                                            click: (e) => {
                                                                this.selectOptionValue(e, optionIndex, index)
                                                            }
                                                        }
                                                    }, [isColor ? '' : h('span', [o])])
                                                ])
                                            }
                                        }
                                    }
                                }),
                            ])
                        }),
                    ]),
                    h('div', {
                        class: 'usf-quick-quantity-group'
                    }, [
                        unavailableVariant ? null : h('usf-num-input', {
                            props: {
                                name: 'quantity',
                                value: this.quantity,
                                min: 1,
                                max: maxAvail,
                            },
                            on: {
                                input: (v) => this.quantity = v
                            }
                        }),
                    ]),

                    usf.isMobile ? null : h('div', { class: 'usf-quick-price-wrap' }, [
                        h('span', {
                            staticClass: 'usf-quick-price',
                            class: {
                                'usf-quick-sale-price': this.owner.hasDiscount
                            },
                             domProps: { innerHTML: this.owner.displayDiscountedPrice }
                        }),
                        this.owner.hasDiscount ? h('span', {
                            staticClass: 'usf-quick-price usf-compare-at-price',
                            domProps: { innerHTML: this.owner.displayPrice }
                        }) : null
                    ]),
                ]),
                
                h('button', {
                    staticClass: 'usf-add-to-cart-btn',
                    class: {
                        'usf-quick-showing': this.show,
                        'usf-quick-soldout': unavailableVariant,
                        'usf-with-loader': this.loader
                    },
                    attrs: {
                        type: 'submit',
                        //name: 'add',
                        'data-product-id': this.product.id,
                    },
                    on: {
                        click: (e) => {
                            usf.utils.stopEvent(e);
                            this.loader = true;
                            _usfAddToCart(e, () => { 
                                this.loader = false;
                                this.show = false;                            
                            });
                        }
                    }
                }, [
                    h('span', { class: 'usf-icon usf-icon-cart' }),
                    h('span', { class: 'usf-label' }, [soldOut ? this.loc.soldOut : this.loc.addToCart]),
                ]),
                
                usf.isMobile ? h('a', { class: 'usf-preview__link', attrs: { href: this.owner.productUrl } }, [this.loc.seeFullDetails]) : null,
            ]),                
                
            usf.isMobile ? h('div', {
                class: 'usf-quick-backdrop',
                on: {
                    click: (e) => {
                        this.show = false;
                    }
                }
            }) : null,
        ])
    }
} 
usf.register(UsfChooseOptions, null, 'usf-choose-options1');
	// register or override components
    // ...    
    /*var SearchResultsGridItem2 = {
        template: usf.templates.searchResultsGridViewItem,
    }
    usf.register(SearchResultsGridItem2, usf.components.SearchResultsGridItem, "usf-sr-griditem");*/
    _usfImageWidths = _usfIsDynamicImage ? [180, 360, 540, 720]: [usf.settings.search.imageSize];

    var nodes = document.head.children;
    for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        if (n.href && (n.href.indexOf('stylesheet.css') !== -1 || n.href.indexOf('theme.css') !== -1)) {
            usfFilesUrl = n.href;
            var m = usfFilesUrl.indexOf('/assets/');
            while (usfFilesUrl[--m] !== '/');
            while (usfFilesUrl[--m] !== '/');
            var k = usfFilesUrl.indexOf('?v=');
            usfFilesUrl = usfFilesUrl.substring(0, m) + "/files/";
            break;
        }
    }

    _usfSetDefaultSettings();


    /**
  * color swatch component
  * */
    var UsfSwatches = {
        props: {
            product: Object,
        },
        data() {
            var product = this.product;
            var option, option_handle;
            var option_index = 0;
            for (let i = 0; i < product.options.length; i++) {
                var o = product.options[i];
                var o_name = _usfHandlezie(o.name);
                if (o_name == 'color' || o_name == 'colour') {
                    option_handle = o_name;
                    option_index = i;
                    option = o;
                    break;
                }
            }
            return {
                product: product,
                option: option,
                optionRendereds: {},
                option_handle: option_handle,
                option_index: option_index,
            }
        },
        methods: {
            _variantUrl(v) {
                return _usfAddQuery(this.$parent.productUrl, `variant=${v.id}`)
            },
            _onHover(dataSrc) {
                var imgSelector = document.querySelector(`#product-listing-${this.product.id} .box-ratio img`);
                if (imgSelector && dataSrc) {
                    imgSelector.setAttribute('data-src', dataSrc);
                    imgSelector.classList.add('lazyload');
                }
            }
        },
        render(h) {
            if (this.option) return h('div', { class: 'col-swatch', attrs: { 'data-collection-prod-swatches': true } }, [
                h('ul', { class: `${this.option_handle} options`, attrs: { 'data-option-index': this.option_index } }, [
                    this.option.values.map((o, index) => {
                        var optHandled = _usfHandlezie(o);
                        var temp = o.split(' ').pop();
                        var opt_handle_last = _usfHandlezie(temp);
                        for (let x = 0; x < this.product.variants.length; x++) {
                            var v = this.product.variants[x];
                            if (v.options[this.option_index] != undefined) {
                                var vrOpt = this.option.values[v.options[this.option_index]];
                                if (o === vrOpt && !this.optionRendereds[o]) {
                                    this.optionRendereds[o] = 1;
                                    var img = this.product.images[v.imageIndex];
                                    var imgUrl;
                                    var dataSrc;
                                    var bgImg = usfFilesUrl + optHandled + '.png';
                                    if (img) {
                                        imgUrl = _usfGetOriginImgWithSize(img.url, 'large');
                                        dataSrc = _usfGetOriginImgWithSize(img.url, '{width}x');
                                        if (_usfGlobalSettings.color_swatch_style == 'variant-image') {
                                            bgImg = _usfGetOriginImgWithSize(img.url, '50x');
                                        }
                                    }
                                    var inline_styles = `background-position: center center;background-color: ${opt_handle_last};`;
                                    if ((_usfGlobalSettings.color_swatch_style == 'variant-image' || _usfGlobalSettings.color_swatch_style == 'custom-image') && _usfGlobalSettings.use_swatch_images == true) {
                                        inline_styles += `background-image: url(${bgImg})`;
                                    }

                                    return h('li', {
                                        attrs: {
                                            'data-option-title': o,
                                            'data-href': img ? imgUrl : false,
                                        },
                                        staticClass: `js-collection-swatch color ${optHandled}`,
                                        class: {
                                            'js-is-active': v.id == this.$parent.selectedVariantForPrice.id
                                        },
                                        on: {
                                            mouseover: () => img ? this._onHover(dataSrc) : null,
                                        }
                                    }, [
                                        h('a', {
                                            attrs: {
                                                href: this._variantUrl(v),
                                                title: getVariantTitle(v.options, this.product)
                                            }
                                        }, [
                                            h('span', { style: inline_styles })
                                        ]),
                                    ])
                                }
                            }

                        }
                    }),
                ])
            ])

        }
    }
    usf.register(UsfSwatches, null, 'usf-swatches');


    usf.event.add('init', function () {
        usf.event.add(['sr_updated', 'sr_viewChanged', 'rerender'], function () {
            setTimeout(function () {
                _usfInitProductFeature()
            }, 300);
        });
    });
});
function _usfInitProductFeature() {
    window.Shopify && Shopify.theme && Shopify.theme.quickview && Shopify.theme.quickview.init && Shopify.theme.quickview.init();
    document.querySelectorAll('.usf-results .js-quickview-trigger').forEach(el => {
        el.classList.remove('js-quickview-trigger')
    })
    //window.WAU && WAU.ProductColorSwatches && WAU.ProductColorSwatches.init && WAU.ProductColorSwatches.init(document.querySelector('#usf_container'), 200)
}
function getVariantTitle(options, p) {
    if (!p.options.length)
        return 'Default title'
    var arrs = [];
    for (let i = 0; i < options.length; i++) {
        var o = options[i];
        arrs.push(p.options[i].values[o])
    }
    return arrs.join(' / ');
}

function _usfOnAddToCartSuccess(rs, form) {
    let config = document.getElementById('cart-config');
    if (!config) return false;
    config = JSON.parse(config.innerHTML || '{}');

    Shopify.theme.cart.getCart().then(Cart => {

        if (config.cart_action == 'drawer' && config.cart_added_event == 'go_to_active_cart') {
            Shopify.theme.ajaxCart.showDrawer(config);
        } else if (config.cart_action == 'modal_cart' && config.cart_added_event == 'go_to_active_cart') {
            Shopify.theme.ajaxCart.showModal(config);
        } else if (config.cart_action == 'page_only' && config.cart_added_event == 'go_to_active_cart') {
            window.location.href = config.cart_url;
        } else if (config.cart_added_event == 'product_page') {
            theme.Helpers.fadeIn(context.querySelector(selectors.cartAddedMsg));

            setTimeout(function () {
                theme.Helpers.fadeOut(context.querySelector(selectors.cartAddedMsg));
            }, 3000);
        } else {
            window.location.href = config.cart_url;
        }

        Shopify.theme.ajaxCart.updateView(config, Cart);
    });
}

function _usfSetDefaultSettings(){
    window._usfNoImage = window._usfNoImage || '<svg class="placeholder-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 525.5 525.5"><path d="M375.5 345.2c0-.1 0-.1 0 0 0-.1 0-.1 0 0-1.1-2.9-2.3-5.5-3.4-7.8-1.4-4.7-2.4-13.8-.5-19.8 3.4-10.6 3.6-40.6 1.2-54.5-2.3-14-12.3-29.8-18.5-36.9-5.3-6.2-12.8-14.9-15.4-17.9 8.6-5.6 13.3-13.3 14-23 0-.3 0-.6.1-.8.4-4.1-.6-9.9-3.9-13.5-2.1-2.3-4.8-3.5-8-3.5h-54.9c-.8-7.1-3-13-5.2-17.5-6.8-13.9-12.5-16.5-21.2-16.5h-.7c-8.7 0-14.4 2.5-21.2 16.5-2.2 4.5-4.4 10.4-5.2 17.5h-48.5c-3.2 0-5.9 1.2-8 3.5-3.2 3.6-4.3 9.3-3.9 13.5 0 .2 0 .5.1.8.7 9.8 5.4 17.4 14 23-2.6 3.1-10.1 11.7-15.4 17.9-6.1 7.2-16.1 22.9-18.5 36.9-2.2 13.3-1.2 47.4 1 54.9 1.1 3.8 1.4 14.5-.2 19.4-1.2 2.4-2.3 5-3.4 7.9-4.4 11.6-6.2 26.3-5 32.6 1.8 9.9 16.5 14.4 29.4 14.4h176.8c12.9 0 27.6-4.5 29.4-14.4 1.2-6.5-.5-21.1-5-32.7zm-97.7-178c.3-3.2.8-10.6-.2-18 2.4 4.3 5 10.5 5.9 18h-5.7zm-36.3-17.9c-1 7.4-.5 14.8-.2 18h-5.7c.9-7.5 3.5-13.7 5.9-18zm4.5-6.9c0-.1.1-.2.1-.4 4.4-5.3 8.4-5.8 13.1-5.8h.7c4.7 0 8.7.6 13.1 5.8 0 .1 0 .2.1.4 3.2 8.9 2.2 21.2 1.8 25h-30.7c-.4-3.8-1.3-16.1 1.8-25zm-70.7 42.5c0-.3 0-.6-.1-.9-.3-3.4.5-8.4 3.1-11.3 1-1.1 2.1-1.7 3.4-2.1l-.6.6c-2.8 3.1-3.7 8.1-3.3 11.6 0 .2 0 .5.1.8.3 3.5.9 11.7 10.6 18.8.3.2.8.2 1-.2.2-.3.2-.8-.2-1-9.2-6.7-9.8-14.4-10-17.7 0-.3 0-.6-.1-.8-.3-3.2.5-7.7 3-10.5.8-.8 1.7-1.5 2.6-1.9h155.7c1 .4 1.9 1.1 2.6 1.9 2.5 2.8 3.3 7.3 3 10.5 0 .2 0 .5-.1.8-.3 3.6-1 13.1-13.8 20.1-.3.2-.5.6-.3 1 .1.2.4.4.6.4.1 0 .2 0 .3-.1 13.5-7.5 14.3-17.5 14.6-21.3 0-.3 0-.5.1-.8.4-3.5-.5-8.5-3.3-11.6l-.6-.6c1.3.4 2.5 1.1 3.4 2.1 2.6 2.9 3.5 7.9 3.1 11.3 0 .3 0 .6-.1.9-1.5 20.9-23.6 31.4-65.5 31.4h-43.8c-41.8 0-63.9-10.5-65.4-31.4zm91 89.1h-7c0-1.5 0-3-.1-4.2-.2-12.5-2.2-31.1-2.7-35.1h3.6c.8 0 1.4-.6 1.4-1.4v-14.1h2.4v14.1c0 .8.6 1.4 1.4 1.4h3.7c-.4 3.9-2.4 22.6-2.7 35.1v4.2zm65.3 11.9h-16.8c-.4 0-.7.3-.7.7 0 .4.3.7.7.7h16.8v2.8h-62.2c0-.9-.1-1.9-.1-2.8h33.9c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7h-33.9c-.1-3.2-.1-6.3-.1-9h62.5v9zm-12.5 24.4h-6.3l.2-1.6h5.9l.2 1.6zm-5.8-4.5l1.6-12.3h2l1.6 12.3h-5.2zm-57-19.9h-62.4v-9h62.5c0 2.7 0 5.8-.1 9zm-62.4 1.4h62.4c0 .9-.1 1.8-.1 2.8H194v-2.8zm65.2 0h7.3c0 .9.1 1.8.1 2.8H259c.1-.9.1-1.8.1-2.8zm7.2-1.4h-7.2c.1-3.2.1-6.3.1-9h7c0 2.7 0 5.8.1 9zm-7.7-66.7v6.8h-9v-6.8h9zm-8.9 8.3h9v.7h-9v-.7zm0 2.1h9v2.3h-9v-2.3zm26-1.4h-9v-.7h9v.7zm-9 3.7v-2.3h9v2.3h-9zm9-5.9h-9v-6.8h9v6.8zm-119.3 91.1c-2.1-7.1-3-40.9-.9-53.6 2.2-13.5 11.9-28.6 17.8-35.6 5.6-6.5 13.5-15.7 15.7-18.3 11.4 6.4 28.7 9.6 51.8 9.6h6v14.1c0 .8.6 1.4 1.4 1.4h5.4c.3 3.1 2.4 22.4 2.7 35.1 0 1.2.1 2.6.1 4.2h-63.9c-.8 0-1.4.6-1.4 1.4v16.1c0 .8.6 1.4 1.4 1.4H256c-.8 11.8-2.8 24.7-8 33.3-2.6 4.4-4.9 8.5-6.9 12.2-.4.7-.1 1.6.6 1.9.2.1.4.2.6.2.5 0 1-.3 1.3-.8 1.9-3.7 4.2-7.7 6.8-12.1 5.4-9.1 7.6-22.5 8.4-34.7h7.8c.7 11.2 2.6 23.5 7.1 32.4.2.5.8.8 1.3.8.2 0 .4 0 .6-.2.7-.4 1-1.2.6-1.9-4.3-8.5-6.1-20.3-6.8-31.1H312l-2.4 18.6c-.1.4.1.8.3 1.1.3.3.7.5 1.1.5h9.6c.4 0 .8-.2 1.1-.5.3-.3.4-.7.3-1.1l-2.4-18.6H333c.8 0 1.4-.6 1.4-1.4v-16.1c0-.8-.6-1.4-1.4-1.4h-63.9c0-1.5 0-2.9.1-4.2.2-12.7 2.3-32 2.7-35.1h5.2c.8 0 1.4-.6 1.4-1.4v-14.1h6.2c23.1 0 40.4-3.2 51.8-9.6 2.3 2.6 10.1 11.8 15.7 18.3 5.9 6.9 15.6 22.1 17.8 35.6 2.2 13.4 2 43.2-1.1 53.1-1.2 3.9-1.4 8.7-1 13-1.7-2.8-2.9-4.4-3-4.6-.2-.3-.6-.5-.9-.6h-.5c-.2 0-.4.1-.5.2-.6.5-.8 1.4-.3 2 0 0 .2.3.5.8 1.4 2.1 5.6 8.4 8.9 16.7h-42.9v-43.8c0-.8-.6-1.4-1.4-1.4s-1.4.6-1.4 1.4v44.9c0 .1-.1.2-.1.3 0 .1 0 .2.1.3v9c-1.1 2-3.9 3.7-10.5 3.7h-7.5c-.4 0-.7.3-.7.7 0 .4.3.7.7.7h7.5c5 0 8.5-.9 10.5-2.8-.1 3.1-1.5 6.5-10.5 6.5H210.4c-9 0-10.5-3.4-10.5-6.5 2 1.9 5.5 2.8 10.5 2.8h67.4c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7h-67.4c-6.7 0-9.4-1.7-10.5-3.7v-54.5c0-.8-.6-1.4-1.4-1.4s-1.4.6-1.4 1.4v43.8h-43.6c4.2-10.2 9.4-17.4 9.5-17.5.5-.6.3-1.5-.3-2s-1.5-.3-2 .3c-.1.2-1.4 2-3.2 5 .1-4.9-.4-10.2-1.1-12.8zm221.4 60.2c-1.5 8.3-14.9 12-26.6 12H174.4c-11.8 0-25.1-3.8-26.6-12-1-5.7.6-19.3 4.6-30.2H197v9.8c0 6.4 4.5 9.7 13.4 9.7h105.4c8.9 0 13.4-3.3 13.4-9.7v-9.8h44c4 10.9 5.6 24.5 4.6 30.2z"/><path d="M286.1 359.3c0 .4.3.7.7.7h14.7c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7h-14.7c-.3 0-.7.3-.7.7zm5.3-145.6c13.5-.5 24.7-2.3 33.5-5.3.4-.1.6-.5.4-.9-.1-.4-.5-.6-.9-.4-8.6 3-19.7 4.7-33 5.2-.4 0-.7.3-.7.7 0 .4.3.7.7.7zm-11.3.1c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7H242c-19.9 0-35.3-2.5-45.9-7.4-.4-.2-.8 0-.9.3-.2.4 0 .8.3.9 10.8 5 26.4 7.5 46.5 7.5h38.1zm-7.2 116.9c.4.1.9.1 1.4.1 1.7 0 3.4-.7 4.7-1.9 1.4-1.4 1.9-3.2 1.5-5-.2-.8-.9-1.2-1.7-1.1-.8.2-1.2.9-1.1 1.7.3 1.2-.4 2-.7 2.4-.9.9-2.2 1.3-3.4 1-.8-.2-1.5.3-1.7 1.1s.2 1.5 1 1.7z"/><path d="M275.5 331.6c-.8 0-1.4.6-1.5 1.4 0 .8.6 1.4 1.4 1.5h.3c3.6 0 7-2.8 7.7-6.3.2-.8-.4-1.5-1.1-1.7-.8-.2-1.5.4-1.7 1.1-.4 2.3-2.8 4.2-5.1 4zm5.4 1.6c-.6.5-.6 1.4-.1 2 1.1 1.3 2.5 2.2 4.2 2.8.2.1.3.1.5.1.6 0 1.1-.3 1.3-.9.3-.7-.1-1.6-.8-1.8-1.2-.5-2.2-1.2-3-2.1-.6-.6-1.5-.6-2.1-.1zm-38.2 12.7c.5 0 .9 0 1.4-.1.8-.2 1.3-.9 1.1-1.7-.2-.8-.9-1.3-1.7-1.1-1.2.3-2.5-.1-3.4-1-.4-.4-1-1.2-.8-2.4.2-.8-.3-1.5-1.1-1.7-.8-.2-1.5.3-1.7 1.1-.4 1.8.1 3.7 1.5 5 1.2 1.2 2.9 1.9 4.7 1.9z"/><path d="M241.2 349.6h.3c.8 0 1.4-.7 1.4-1.5s-.7-1.4-1.5-1.4c-2.3.1-4.6-1.7-5.1-4-.2-.8-.9-1.3-1.7-1.1-.8.2-1.3.9-1.1 1.7.7 3.5 4.1 6.3 7.7 6.3zm-9.7 3.6c.2 0 .3 0 .5-.1 1.6-.6 3-1.6 4.2-2.8.5-.6.5-1.5-.1-2s-1.5-.5-2 .1c-.8.9-1.8 1.6-3 2.1-.7.3-1.1 1.1-.8 1.8 0 .6.6.9 1.2.9z"/></svg>';
    window._usfSaleText = window._usfSaleText || usf.settings.translation.sale;
    window._usfSoldOutText = window._usfSoldOutText || usf.settings.translation.soldOut;
    window._usfNewText = window._usfNewText || "NEW";
    window._usfQuickViewText = window._usfQuickViewText || usf.settings.translation.quickView;
    window._usfUnitPriceText = window._usfUnitPriceText || "Unit Price";
    window._usfRegulatPriceText = window._usfRegulatPriceText || "Regular Price";
    window._usfFromPriceHtml = window._usfFromPriceHtml || usf.settings.translation.from + " {{ lowest_price }}";
    window._usfSalePriceText = window._usfSalePriceText || "Sale Price";
    window._usfGlobalSettings = window._usfGlobalSettings || {
      product_image_size: "natural",
      secondary_images_hover: "alternate_colors",
      quickview: true,
      vendor: true,
      color_swatch_style: "default-color",
      use_swatch_images: true,
      icon_style: "circle_icon",
      sale_items: "percentage",
      switch_image: true,
      quickview_type: "drawer",
      alternate_colors: true,
    };
    window._usfGlobalSettings.quickview_type=false;
    window._usfSectionSettings = window._usfSectionSettings || {
        products_per_row: 4,
        mobile_1pr: false
      };
      window._usf_prod_grid = window._usf_prod_grid || "span-3";
    window._usfCollectionById = window._usfCollectionById || {};
}

/* Begin theme ready code */
if (usf.settings.instantSearch.online && usf.isMobile) {
    var searchIcon = document.querySelector('.slideout__trigger-search');
    if (searchIcon) {
        searchIcon.addEventListener('click', function (e) {
            var target  = document.createElement('input');
            usf.utils.loadAndShowInstantSearch(target, true);
            usf.utils.stopEvent(e);

            // to hide it.
            searchIcon.click();
        })
    }

    
    // still register to 'is_show' event to hide the drawer.
    usf.event.add('is_show', function () {
        setTimeout(() => {
            var closeSearch = document.querySelector('.slideout__trigger-search-sidebar');
            if(closeSearch)
                closeSearch.click();
            // refocus on our input box
            usf.instantSearch.focus();
        }, 300);
    })
}
/* End theme ready code */