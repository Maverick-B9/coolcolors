import { Link } from 'react-router-dom';
import { F, IMG } from '../data';
import { useInView } from '../hooks';
import Img from '../components/Img';

interface LookItem {
  title: string;
  link: string;
  image: string;
  fallback: string;
}

const LOOKS: LookItem[] = [
  // Set 1: Looks 01 to 08
  {
    title: 'Indigo Edit',
    link: '/collections/shirts',
    image: `${F}lookbook-first-oct12-837f9a0a.png?width=1800`,
    fallback: IMG('cc-hero'),
  },
  {
    title: 'Indigo Edit',
    link: '/collections/shirts',
    image: `${F}lookbook-square-oct12-8c628a3e.png?width=1800`,
    fallback: IMG('cc-ed-top'),
  },
  {
    title: 'Indigo Edit',
    link: '/collections/shirts',
    image: `${F}lookbook-tall-oct12-42d88410.png?width=1800`,
    fallback: IMG('cc-ed-btm'),
  },
  {
    title: 'Sandstone Calm',
    link: '/collections/best-sellers',
    image: `${F}lookbook-wide-oct12-9bf66158.png?width=1800`,
    fallback: IMG('cc-reel-1'),
  },
  {
    title: 'Ivory & Charcoal',
    link: '/collections/best-sellers',
    image: `${F}lookbook-fresh-cb618e43-a3a2-45df-9aa6-cc1297db9272.png?width=1800`,
    fallback: IMG('cc-reel-2'),
  },
  {
    title: 'Charcoal Edit',
    link: '/collections/best-sellers',
    image: `${F}lookbook-five-315395d6.png?width=1800`,
    fallback: IMG('cc-reel-3'),
  },
  {
    title: 'Weekend Ease',
    link: '/collections/best-sellers',
    image: `${F}lookbook-weekend-da622d7d.png?width=1800`,
    fallback: IMG('cc-reel-4'),
  },
  {
    title: 'Midnight Polo',
    link: '/collections/t-shirt',
    image: `${F}lookbook-midnight-4ae58b19.png?width=1800`,
    fallback: IMG('cc-cat-kurtas'),
  },

  // Set 2: Looks 09 to 11
  {
    title: 'Ivory Layers',
    link: '/collections/shirts',
    image: `${F}lookbook-eight-17291536.png?width=1800`,
    fallback: IMG('cc-ed-btm'),
  },
  {
    title: 'City Trousers',
    link: '/collections/bottoms',
    image: `${F}lookbook-nine-fbac9b3d.png?width=1800`,
    fallback: IMG('cc-cat-trousers'),
  },
  {
    title: 'Quiet Luxury',
    link: '/collections/best-sellers',
    image: `${F}lookbook-ten-b1724ea9.png?width=1800`,
    fallback: IMG('cc-ed-top'),
  },
];

function LookCard({ look, pos, num }: { look: LookItem; pos: number; num: string }) {
  const ref = useInView<HTMLElement>();

  return (
    <figure ref={ref} className={`clb__f clb__f--${pos}`} data-n={num}>
      <Link to={look.link} className="clb__lk">
        <div className="clb__ph">
          <Img src={look.image} fallback={look.fallback} alt={look.title} />
        </div>
        <figcaption className="clb__cap">
          <span className="clb__nm">{look.title}</span>
          <span className="clb__go">Explore the collection</span>
        </figcaption>
      </Link>
    </figure>
  );
}

export default function Lookbook() {
  return (
    <div
      className="clb clb--js clb--font"
      style={{
        ['--clb-bg' as string]: '#eef0f2',
        ['--clb-ink' as string]: '#151a20',
        ['--clb-accent' as string]: '#66788f',
      }}
    >
      {/* Hero Header */}
      <section className="clb__hero">
        <p className="clb__eyebrow">LOOKBOOK · THE EVERYDAY EDIT</p>
        <h1 className="clb__title">
          <span>The Edit</span>
          <span className="clb__out">Season One</span>
        </h1>
        <p className="clb__sub">
          Clean lines. Considered textures. Everyday menswear, styled with quiet confidence.
        </p>
        <span className="clb__side">11 looks</span>
      </section>

      {/* Looks Grid */}
      <div className="clb__wrap">
        {/* Set 1: Looks 01 to 08 */}
        <div className="clb__set">
          <LookCard look={LOOKS[0]} pos={1} num="01" />
          <LookCard look={LOOKS[1]} pos={2} num="02" />

          {/* Pull Quote between look 2 and look 3 */}
          <h2 className="clb__q">
            Cut quiet.<br /><i>Worn loud.</i>
          </h2>

          <LookCard look={LOOKS[2]} pos={3} num="03" />
          <LookCard look={LOOKS[3]} pos={4} num="04" />
          <LookCard look={LOOKS[4]} pos={5} num="05" />
          <LookCard look={LOOKS[5]} pos={6} num="06" />
          <LookCard look={LOOKS[6]} pos={7} num="07" />
          <LookCard look={LOOKS[7]} pos={8} num="08" />
        </div>

        {/* Set 2: Looks 09 to 11 */}
        <div className="clb__set clb__set--2">
          <LookCard look={LOOKS[8]} pos={1} num="09" />
          <LookCard look={LOOKS[9]} pos={2} num="10" />
          <LookCard look={LOOKS[10]} pos={3} num="11" />
        </div>
      </div>

      {/* Closing Band */}
      <section className="clb__band">
        <div className="clb__band-in">
          <div className="clb__band-txt">
            <p className="clb__band-label">The Coolcolors edit</p>
            <h2>
              Wear the <span>story.</span>
            </h2>
          </div>
          <Link className="clb__btn" to="/collections/best-sellers">
            Shop new arrivals
          </Link>
        </div>
      </section>
    </div>
  );
}
