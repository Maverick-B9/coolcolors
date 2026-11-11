import { useState } from 'react';
import { STORES, type Store } from '../data';

const gm = (s: Store) => `https://www.google.com/maps/search/?api=1&query=${s.lat},${s.lng}`;

export default function PresenceMap() {
  const [sel, setSel] = useState(0);
  const [kind, setKind] = useState<Store['kind'] | null>(null);
  const [list, setList] = useState(false);
  const [swapping, setSwapping] = useState(false);

  const currentStore = STORES[sel];

  const pick = (i: number) => {
    setSwapping(true);
    setSel(i);
    setKind(STORES[i].kind);
    setTimeout(() => setSwapping(false), 120);
  };

  const selectKind = (k: Store['kind']) => {
    setList(false);
    if (kind === k) {
      setKind(null);
    } else {
      setKind(k);
      const firstIndex = STORES.findIndex(s => s.kind === k);
      if (firstIndex >= 0) pick(firstIndex);
    }
  };

  const toggleList = () => {
    setList(!list);
  };

  return (
    <section className="lm" style={{ ['--lm-bg' as string]: '#000000' }}>
      <div className="lm__main">
        <div className="lm__wrap">
          <div className="lm__side">
            <div className="lm__head">
              <p className="lm__title">OUR PRESENCE</p>
              <p className="lm__hint">Tap a pin on the map, or view every location in one list.</p>
            </div>

            <div className="lm__ctl">
              <div className="lm__chips">
                <button
                  type="button"
                  className={`lm__chip lm__all${list ? ' is-on' : ''}`}
                  onClick={toggleList}
                  aria-expanded={list}
                >
                  ☰ {list ? 'Hide List' : 'Show All Stores'}
                </button>
                <button
                  type="button"
                  className={`lm__chip${!list && kind === 'store' ? ' is-on' : ''}`}
                  data-kind="store"
                  onClick={() => selectKind('store')}
                >
                  <i style={{ background: '#2ecc71' }} />
                  Stores
                </button>
                <button
                  type="button"
                  className={`lm__chip${!list && kind === 'office' ? ' is-on' : ''}`}
                  data-kind="office"
                  onClick={() => selectKind('office')}
                >
                  <i style={{ background: '#ff4d4f' }} />
                  Office
                </button>
              </div>
            </div>

            <div className="lm__out">
              {/* Single location card view */}
              <div className={`lm__info${swapping ? ' is-sw' : ''}${list ? ' lm--hide' : ''}`} aria-live="polite">
                <h3>{currentStore.name}</h3>
                <p>{currentStore.address}</p>
                <a className="lm__gm" href={gm(currentStore)} target="_blank" rel="noopener noreferrer">
                  Open in Google Maps ↗
                </a>
              </div>

              {/* All locations list view */}
              <div className={`lm__list${list ? ' is-open' : ''}`} aria-label="All locations">
                {(['store', 'office'] as const).map(k => {
                  const groupStores = STORES.map((s, idx) => ({ ...s, idx })).filter(s => s.kind === k);
                  if (groupStores.length === 0) return null;
                  return (
                    <div key={k}>
                      <div className={`lm__grp lm__grp--${k}`}>
                        <i style={{ background: k === 'store' ? '#2ecc71' : '#ff4d4f' }} />
                        {k === 'store' ? 'Stores' : 'Office'}
                      </div>
                      {groupStores.map(s => (
                        <div
                          key={s.name}
                          className={`lm__item lm__item--${s.kind}${s.idx === sel ? ' is-sel' : ''}`}
                          onClick={() => {
                            pick(s.idx);
                            setList(false);
                          }}
                        >
                          <div>
                            <h4>{s.name}</h4>
                            <p>{s.address}</p>
                          </div>
                          <a
                            href={gm(s)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                          >
                            Directions ↗
                          </a>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Interactive Map with breathing pointers */}
          <div className="lm__map">
            <img src="/images/india-dot-matrix.svg" alt="Map of India" width="405" height="455" loading="lazy" />
            {STORES.map((x, i) => {
              const px = Number((x.lng * 3.0753 - 206.58).toFixed(2));
              const py = Number((124.64 - x.lat * 3.1938).toFixed(2));
              const isSelected = i === sel;
              const isDim = kind !== null && kind !== x.kind;
              const tipx = px < 30 ? 'l' : px > 70 ? 'r' : 'c';
              const tipy = py < 24 ? 'bot' : 'top';

              return (
                <div key={x.name} style={{ display: 'contents' }}>
                  <button
                    type="button"
                    className={`lm__pin lm__pin--${x.kind}${isSelected ? ' is-sel' : ''}${isDim ? ' is-dim' : ''}`}
                    style={{
                      left: `${px}%`,
                      top: `${py}%`,
                      ['--d' as string]: `${i * 0.45}s`,
                    }}
                    data-kind={x.kind}
                    aria-label={x.name}
                    onClick={() => {
                      pick(i);
                      setList(false);
                    }}
                  />
                  <span
                    className={`lm__tip lm__tip--${tipx} lm__tip--${tipy}`}
                    style={{ left: `${px}%`, top: `${py}%` }}
                    aria-hidden="true"
                  >
                    <small>{x.kind === 'store' ? 'Stores' : 'Office'}</small>
                    <strong>{x.name}</strong>
                    <em>{x.address}</em>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
