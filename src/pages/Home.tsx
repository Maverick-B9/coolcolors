import { FeaturedCollection, FeaturedEditorial, Hero, LegacyEditorial, ShopByCategory, WatchAndBuy } from '../components/home';
import PresenceMap from '../components/PresenceMap';
import Newsletter from '../components/Newsletter';
export default function Home() {
  return <><Hero /><ShopByCategory /><FeaturedEditorial /><LegacyEditorial /><FeaturedCollection /><WatchAndBuy /><PresenceMap /><Newsletter /></>;
}
