import { Link } from 'react-router-dom';
import { F, IMG, LOCAL } from '../data';
import { useInView } from '../hooks';
import Img from '../components/Img';
const LOOKS: [string, string, string, string][] = [
  ['Indigo Edit', 'denim-1', LOCAL[1], '50% 20%'], ['Sandstone Calm', 'new-arrivals', LOCAL[2], '50% 30%'], ['Charcoal Edit', 'new-arrivals', LOCAL[3], '50% 25%'],
  ['Weekend Ease', 'new-arrivals', LOCAL[0], '50% 40%'], ['Midnight Polo', 'polo-t-shirt-1', LOCAL[2], '50% 60%'], ['Ivory Layers', '476558033131', LOCAL[1], '50% 70%'],
  ['Ivory & Charcoal', 'new-arrivals', `${F}lookbook-fresh-cb618e43-a3a2-45df-9aa6-cc1297db9272.png?width=1800`, '50% 30%'], ['City Trousers', '467876413675', LOCAL[5], '50% 50%'],
];
function Look({ i }: { i: number }) {
  const ref = useInView<HTMLElement>();
  const [name, handle, src, pos] = LOOKS[i];
  return (
    <figure ref={ref} className={`clb__f clb__f--${i + 1}`} data-n={String(i + 1).padStart(2, '0')}>
      <Link className="clb__lk" to={`/collections/${handle}`}><div className="clb__ph"><Img src={src} fallback={IMG('cc-ed-btm')} style={{ objectPosition: pos }} alt={name} /></div>
        <figcaption className="clb__cap"><span className="clb__nm">{name}</span><span className="clb__go">Explore the collection</span></figcaption></Link>
    </figure>
  );
}
export default function Lookbook() {
  return (
    <div className="clb clb--js clb--font" style={{ ['--clb-bg' as string]: '#eef0f2', ['--clb-ink' as string]: '#151a20', ['--clb-accent' as string]: '#66788f' }}>
      <section className="clb__hero"><p className="clb__eyebrow">LOOKBOOK · THE EVERYDAY EDIT</p><h1 className="clb__title"><span>The Edit</span><span className="clb__out">Season One</span></h1><p className="clb__sub">Clean lines. Considered textures. Everyday menswear, styled with quiet confidence.</p><span className="clb__side">11 looks</span></section>
      <div className="clb__wrap"><div className="clb__set"><Look i={0} /><Look i={1} /><h2 className="clb__q">Cut quiet.<br /><i>Worn loud.</i></h2>{[2, 3, 4, 5, 6, 7].map(i => <Look key={i} i={i} />)}</div></div>
      <section className="clb__band"><div className="clb__band-in"><div><p className="clb__band-label">The Coolcolors edit</p><h2>Wear the <span>story.</span></h2></div><Link className="clb__btn" to="/collections/new-arrivals">Shop new arrivals</Link></div></section>
    </div>
  );
}
