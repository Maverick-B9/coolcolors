import { STORES } from '../data';
import PresenceMap from '../components/PresenceMap';
export default function Stores() {
  return (
    <><section className="pw"><h1>Store Locations</h1>
      {STORES.map(s => <div className="ci" key={s.name}><div><h4>{s.name}</h4><p>{s.address}</p></div><a className="btn o" target="_blank" rel="noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${s.lat},${s.lng}`}>Directions ↗</a></div>)}</section>
    <PresenceMap /></>
  );
}
