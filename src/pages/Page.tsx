import { useState, type FormEvent } from 'react';
import { useParams } from 'react-router-dom';
const TITLES: Record<string, string> = { 'contact-us-1': 'Contact Us', faq: 'FAQ', sitemap: 'Sitemap', 'terms-and-conditions-1': 'Terms & Conditions', 'privacy-policy-1': 'Privacy Policy', 'return-and-refund-policy-1': 'Returns Policy', 'shipping-policy-1': 'Shipping Policy', 'payment-terms-1': 'Payment Terms', 'cancellation-policy': 'Cancellation Policy', checkout: 'Checkout', blog: 'Blog' };
const FAQ = [['How long does delivery take?', '3–7 business days.'], ['What is the return window?', '7 days from delivery.'], ['Do you ship across India?', 'Yes, pan-India.']];
export default function Page() {
  const { slug = '' } = useParams();
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true); };
  return (
    <section className="pw"><h1>{TITLES[slug] ?? 'Page'}</h1>
      {slug === 'contact-us-1' ? (sent ? <p><b>Thanks! We'll be in touch.</b></p> : <form className="cf" onSubmit={submit}><input placeholder="Name" /><input type="email" required placeholder="Email" /><textarea rows={5} placeholder="Message" /><button className="btn red">Send</button></form>)
        : slug === 'faq' ? FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)
        : <p>Content for this page is loaded from your CMS/API.</p>}
    </section>
  );
}
