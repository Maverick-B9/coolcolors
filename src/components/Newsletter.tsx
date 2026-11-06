import { useState, type FormEvent } from 'react';
import { api } from '../api';
export default function Newsletter({ className = 'lmnews' }: { className?: string }) {
  const [done, setDone] = useState(false);
  const submit = async (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); await api.subscribe(String(new FormData(e.currentTarget).get('email'))); setDone(true); };
  return (
    <section className={className}>
      <div><h2>Keep Dreaming. Get Updates.</h2><p>Join the list for new drops, editorial stories, and early access to premium Indian menswear.</p></div>
      {done ? <p><b>Thanks for subscribing!</b></p> : <form onSubmit={submit}><input name="email" type="email" required placeholder="Enter your email" /><button>Subscribe</button></form>}
    </section>
  );
}
