import { Link } from 'react-router-dom';
import { F, IMG } from '../data';
import Img from '../components/Img';

const STATS = [
  { num: '10+', label: 'Years of craft' },
  { num: '2', label: 'Locations across India' },
  { num: '100%', label: 'Made in India' },
  { num: '50k+', label: 'Happy customers' },
];

const VALUES = [
  {
    title: 'Premium fabrics',
    text: 'Soft, breathable cottons, linens and blends chosen to feel as good as they look.',
  },
  {
    title: 'Quiet design',
    text: 'Clean cuts and a calm palette. Details that reward a second look, never shout.',
  },
  {
    title: 'Made with care',
    text: 'Cut, stitched and finished in our own units, with quality checked at every step.',
  },
];

const MILESTONES = [
  {
    year: '2015',
    title: 'The first stitch',
    text: 'Cool Colors starts as a small shirt label in Rajasthan.',
  },
  {
    year: '2019',
    title: 'Growing the studio',
    text: 'A dedicated design office and our own manufacturing units come together.',
  },
  {
    year: '2024',
    title: 'Going editorial',
    text: 'A new calm, editorial direction for the modern Indian man.',
  },
  {
    year: 'Today',
    title: 'Worn across India',
    text: 'Premium Indian menswear, delivered to your door.',
  },
];

export default function About() {
  return (
    <div
      className="cos cos--font"
      style={{
        ['--cos-bg' as string]: '#eef0f2',
        ['--cos-ink' as string]: '#151a20',
        ['--cos-accent' as string]: '#66788f',
      }}
    >
      {/* Hero section */}
      <section className="cos__hero">
        <div className="cos__heroimg">
          <Img
            src={`${F}image_b7110a78-29ae-4d47-bd99-30e0cf706150.png?width=2400`}
            fallback={IMG('cc-hero')}
            alt="Cool Colors Studio"
            loading="eager"
          />
        </div>
        <div className="cos__heroin">
          <p className="cos__eyebrow">Our story</p>
          <h1 className="cos__h1">
            <span>Crafted in India</span>
            <span className="cos__h1b">Worn everywhere</span>
          </h1>
        </div>
      </section>

      {/* Intro statement & story copy */}
      <div className="cos__wrap cos__intro">
        <h2 className="cos__statement">
          We make menswear that feels calm, sharp and unmistakably premium.
        </h2>
        <div className="cos__copy">
          <p>
            Cool Colors began with a simple idea: modern Indian menswear should be as considered as the people who wear it. Premium fabrics, honest craftsmanship and a quiet editorial eye guide every piece we make.
          </p>
          <p>
            From our design office in Jodhpur to our manufacturing units across the country, every garment is cut, stitched and finished with care.
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="cos__wrap cos__stats">
        {STATS.map((s) => (
          <div className="cos__stat" key={s.label}>
            <b>{s.num}</b>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Editorial photo pair */}
      <div className="cos__wrap cos__pair">
        <div className="cos__p cos__p--1">
          <Img
            src={`${F}image_036565fb-0565-4206-8ecb-847dda509b91.png?width=1400`}
            fallback={IMG('cc-ed-top')}
            alt="Craftsmanship and tailoring"
            loading="lazy"
          />
        </div>
        <div className="cos__p cos__p--2">
          <Img
            src={`${F}image_a8347173-3f60-4d6e-a5e3-bbd3fb4abd63.png?width=1400`}
            fallback={IMG('cc-ed-btm')}
            alt="Editorial details"
            loading="lazy"
          />
        </div>
      </div>

      {/* Brand values panel */}
      <section className="cos__values">
        <div className="cos__wrap">
          <p className="cos__label">What we stand for</p>
          <div className="cos__vgrid">
            {VALUES.map((v) => (
              <div className="cos__value" key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline section */}
      <section className="cos__wrap cos__time">
        <p className="cos__label">The journey</p>
        <div className="cos__tl">
          {MILESTONES.map((m) => (
            <div className="cos__ms" key={m.year}>
              <span className="cos__year">{m.year}</span>
              <div className="cos__mtx">
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA Banner */}
      <section className="cos__cta">
        <div className="cos__cta-in">
          <h2>
            Wear the <span>story.</span>
          </h2>
          <div className="cos__btns">
            <Link className="cos__btn cos__btn--p" to="/collections/best-sellers">
              Shop new arrivals
            </Link>
            <Link className="cos__btn cos__btn--g" to="/pages/lookbook">
              View the lookbook
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
