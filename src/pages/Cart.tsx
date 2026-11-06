import { Link } from 'react-router-dom';
import { useCart } from '../cart';
import { inr } from '../data';
export default function Cart() {
  const { lines, total, setQty } = useCart();
  return (
    <section className="pw"><h1>Cart</h1>
      {lines.length === 0 ? <><p>Your cart is empty.</p><Link className="btn" to="/collections/best-sellers">Continue shopping</Link></> : <>
        {lines.map((l, i) => (
          <div className="ci" key={l.product.handle + l.size}><img src={l.product.images[0]} alt="" />
            <div><Link to={`/products/${l.product.handle}`}>{l.product.title}</Link><p>Size {l.size}</p>
              <div className="qty"><button onClick={() => setQty(i, -1)}>−</button><span>{l.qty}</span><button onClick={() => setQty(i, 1)}>+</button></div></div>
            <b>{inr(l.product.price * l.qty)}</b></div>
        ))}
        <div className="tot">Subtotal <b>{inr(total)}</b></div><Link className="btn red" to="/pages/checkout">Checkout</Link></>}
    </section>
  );
}
