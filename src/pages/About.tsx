import { IMG, LOCAL } from '../data';
import { Link } from 'react-router-dom';
const STATS = [['10+', 'Years of craft'], ['2', 'Locations across India'], ['100%', 'Made in India'], ['50k+', 'Happy customers']];
const VALUES = [['Premium fabrics', 'Soft, breathable cottons, linens and blends chosen to feel as good as they look.'], ['Quiet design', 'Clean cuts and a calm palette. Details that reward a second look, never shout.'], ['Made with care', 'Cut, stitched and finished in our own units, with quality checked at every step.']];
const MILES = [['2015', 'The first stitch', 'Cool Colors starts as a small shirt label in Rajasthan.'], ['2019', 'Growing the studio', 'A dedicated design office and our own manufacturing units come together.'], ['2024', 'Going editorial', 'A new calm, editorial direction for the modern Indian man.'], ['Today', 'Worn across India', 'Premium Indian menswear, delivered to your door.']];
export default function About() {
  return (
    <div className="cos" style={{ ['--cos-bg' as string]: '#eef0f2', ['--cos-ink' as string]: '#151a20', ['--cos-accent' as string]: '#66788f' }}>
      <section className="cos__hero"><div className="cos__heroimg"><img src={IMG('cc-hero')} alt="" /></div><div className="cos__heroin"><p className="cos__eyebrow">Our story</p><h1 className="cos__h1"><span>Crafted in India</span><span className="cos__h1b">Worn everywhere</span></h1></div></section>
      <div className="cos__wrap cos__intro"><h2 className="cos__statement">We make menswear that feels calm, sharp and unmistakably premium.</h2>
        <div className="cos__copy"><p>Cool Colors began with a simple idea: modern Indian menswear should be as considered as the people who wear it. Premium fabrics, honest craftsmanship and a quiet editorial eye guide every piece we make.</p><p>From our design office in Jodhpur to our manufacturing units across the country, every garment is cut, stitched and finished with care.</p></div></div>
      <div className="cos__wrap cos__stats">{STATS.map(([b, s]) => <div className="cos__stat" key={s}><b>{b}</b><span>{s}</span></div>)}</div>
      <div className="cos__wrap cos__pair"><div className="cos__p cos__p--1"><img src={LOCAL[1]} alt="" /></div><div className="cos__p cos__p--2"><img src={LOCAL[3]} alt="" /></div></div>
      <section className="cos__values"><div className="cos__wrap"><p className="cos__label">What we stand for</p><div className="cos__vgrid">{VALUES.map(([h, p]) => <div className="cos__value" key={h}><h3>{h}</h3><p>{p}</p></div>)}</div></div></section>
      <section className="cos__wrap cos__time"><p className="cos__label">The journey</p>{MILES.map(([y, h, p]) => <div className="cos__ms" key={y}><div className="cos__year">{y}</div><div className="cos__mtx"><h3>{h}</h3><p>{p}</p></div></div>)}</section>
      <section className="cos__cta"><div className="cos__cta-in"><h2>Wear the <span>story.</span></h2><div className="cos__btns"><Link className="cos__btn cos__btn--p" to="/collections/new-arrivals">Shop new arrivals</Link><Link className="cos__btn cos__btn--g" to="/pages/lookbook">View the lookbook</Link></div></div></section>
    </div>
  );
}
