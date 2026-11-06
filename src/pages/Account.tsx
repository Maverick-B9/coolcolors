import { useState, type FormEvent } from 'react';
export default function Account() {
  const [ok, setOk] = useState(false);
  const submit = (e: FormEvent) => { e.preventDefault(); setOk(true); };
  return <section className="pw"><h1>Sign in</h1>{ok ? <p><b>Signed in (demo).</b></p> : <form className="cf" onSubmit={submit}><input type="email" required placeholder="Email" /><input type="password" required placeholder="Password" /><button className="btn red">Sign in</button></form>}</section>;
}
