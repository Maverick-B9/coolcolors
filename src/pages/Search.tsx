import { useState } from 'react';
import { api } from '../api';
import { useData } from '../hooks';
import ProductCard from '../components/ProductCard';
export default function Search() {
  const [q, setQ] = useState('');
  const res = useData(() => api.search(q), [q]);
  return (
    <section className="pw"><h1>Search</h1><input className="cf" style={{ padding: 12, marginBottom: 24, width: '100%', maxWidth: 480 }} placeholder="Search products" value={q} onChange={e => setQ(e.target.value)} />
      <div className="grid">{res?.map(p => <ProductCard key={p.handle} p={p} />)}</div>{res?.length === 0 && <p>No results.</p>}</section>
  );
}
