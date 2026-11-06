import { useState } from 'react';
import { KIND_LABEL, STORES, type Store } from '../data';
const gm = (s: Store) => `https://www.google.com/maps/search/?api=1&query=${s.lat},${s.lng}`;
export default function PresenceMap() {
  const [sel, setSel] = useState(0);
  const [kind, setKind] = useState<Store['kind'] | null>(null);
  const [list, setList] = useState(false);
  const s = STORES[sel];
  const pick = (i: number) => { setSel(i); setList(false); };
  return (
    <section className="lm"><div className="lm__wrap">
      <div>
        <p className="lm__title">OUR PRESENCE</p><p className="lm__hint">Tap a pin on the map, or view every location in one list.</p>
        <div className="chips">
          <button className="chip all" onClick={() => setList(l => !l)}>☰ Show All</button>
          {(Object.keys(KIND_LABEL) as Store['kind'][]).map(k => (
            <button key={k} className={`chip${kind === k ? ' on' : ''}`} onClick={() => { setKind(k); const i = STORES.findIndex(x => x.kind === k); if (i >= 0) pick(i); }}><i className={k} />{KIND_LABEL[k]}</button>
          ))}
        </div>
        {!list && <div className={`info ${s.kind}`}><h3>{s.name}</h3><p>{s.address}</p><a className="gm" target="_blank" rel="noreferrer" href={gm(s)}>Open in Google Maps ↗</a></div>}
        <div className={`list${list ? ' open' : ''}`}>
          {(['store', 'office'] as const).map(k => (<div key={k}><div className="grp">{KIND_LABEL[k]}</div>
            {STORES.map((x, i) => x.kind === k && <div className="item" key={x.name} onClick={() => pick(i)}><div><h4>{x.name}</h4><p>{x.address}</p></div><a target="_blank" rel="noreferrer" href={gm(x)} onClick={e => e.stopPropagation()}>Directions ↗</a></div>)}</div>))}
        </div>
      </div>
      <div className="map"><img src="/images/india-dot-matrix.svg" alt="Map of India" />
        {STORES.map((x, i) => <button key={x.name} aria-label={x.name} className={`pin ${x.kind}${i === sel ? ' sel' : ''}`} style={{ left: `${(x.lng * 3.0753 - 206.58).toFixed(2)}%`, top: `${(124.64 - x.lat * 3.1938).toFixed(2)}%`, opacity: kind && kind !== x.kind ? 0.15 : 1 }} onClick={() => pick(i)} />)}
      </div>
    </div></section>
  );
}
