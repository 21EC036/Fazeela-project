import React, { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  LockKeyhole,
  Mail,
  Sparkles,
} from "lucide-react/dist/esm/lucide-react.mjs";

const loginCss = `
.login-page{min-height:100vh;display:grid;grid-template-columns:1.1fr .9fr;background:#f9f9fe}.login-showcase{position:relative;overflow:hidden;padding:52px 8vw;background:linear-gradient(145deg,#4230b2,#725de1);color:#fff}.login-brand{display:flex;gap:10px;align-items:center;font:800 22px 'Plus Jakarta Sans'}.login-brand i{height:37px;width:37px;border-radius:11px;background:#fff;display:grid;place-items:center;color:#5d4ad1}.login-showcase h1{font-size:clamp(34px,4vw,55px);line-height:1.12;margin:17vh 0 16px;max-width:560px}.login-showcase h1 span{color:#cfc6ff}.login-showcase p{max-width:420px;color:#d9d4ff;font-size:15px;line-height:1.6}.login-orbit{position:absolute;width:440px;height:440px;border:1px solid #ffffff33;border-radius:50%;right:-120px;bottom:-160px}.login-orbit:after{content:"";position:absolute;inset:52px;border:1px solid #ffffff22;border-radius:50%}.login-float{position:absolute;display:flex;align-items:center;gap:9px;background:#fff;color:#595570;padding:11px 14px;border-radius:11px;box-shadow:0 15px 30px #2c207055;font-size:12px;font-weight:700;animation:float 4s ease-in-out infinite}.login-float.one{right:12%;top:27%}.login-float.two{right:23%;bottom:18%;animation-delay:-2s}.login-float i{height:27px;width:27px;background:#eeeaff;color:#6350d7;border-radius:8px;display:grid;place-items:center}.login-form-side{display:grid;place-items:center;padding:35px}.login-form{width:min(100%,390px);animation:appear .55s ease-out}.login-form .mobile-brand{display:none}.login-form h2{font-size:28px;margin:0 0 7px}.login-form>p{color:#9091a1;margin:0 0 30px;font-size:13px}.form-label{display:block;font-size:12px;font-weight:700;margin:17px 0 7px}.field{display:flex;align-items:center;gap:9px;border:1px solid #e3e3ed;border-radius:10px;padding:0 11px;color:#9b9cad}.field:focus-within{border-color:#7160db;box-shadow:0 0 0 3px #eae7ff}.field input{border:0;outline:0;padding:12px 0;width:100%;font:inherit;color:#3d3d4f}.login-options{display:flex;justify-content:space-between;align-items:center;font-size:11px;margin:14px 0 22px;color:#77788a}.login-options label{display:flex;align-items:center;gap:6px}.login-options a{color:#6350d5;font-weight:700}.login-submit{width:100%;display:flex;justify-content:center;align-items:center;gap:7px;padding:13px;border-radius:10px;background:#6552d7;color:#fff;font-weight:700;font-size:12px;box-shadow:0 9px 17px #d9d3ff}.login-submit:hover{background:#5745c4}.login-submit:disabled{cursor:wait;opacity:.8}.form-error{color:#d75d5d;font-size:11px;margin:10px 0 -5px}.demo-note{text-align:center;font-size:11px;color:#9697a7;margin-top:20px}.demo-note b{color:#6754d7}@keyframes float{50%{transform:translateY(-13px)}}@keyframes appear{from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:none}}@media(max-width:800px){.login-page{grid-template-columns:1fr}.login-showcase{display:none}.login-form .mobile-brand{display:flex;color:#5846ca;margin-bottom:38px}.login-form-side{padding:30px 23px}}
`;

const slingCss = `
.login-sling-stage{position:absolute;right:12%;bottom:10%;height:180px;width:180px;border:1px solid #ffffff66;border-radius:50%;z-index:2;animation:sling-stage-spin 7s linear infinite}.login-sling-stage:before{content:"";position:absolute;inset:28px;border:1px solid #ffffff35;border-radius:50%}.login-sling-button{position:absolute;top:-19px;left:50%;height:38px;width:38px;display:grid;place-items:center;border:3px solid #ffffff;background:#fff;color:#171321;border-radius:50%;box-shadow:0 7px 20px #24156c88;transform:translateX(-50%);animation:sling-button-spin 7s linear infinite}.login-sling-button:after{content:"";position:absolute;inset:7px;border:1px solid #d8d2ff;border-radius:50%}@keyframes sling-stage-spin{to{transform:rotate(360deg)}}@keyframes sling-button-spin{to{transform:translateX(-50%) rotate(-360deg)}}
`;

const transitionCss = `
.login-form.logging-in{animation:login-form-exit .7s cubic-bezier(.22,1,.36,1) forwards;pointer-events:none}.login-transition{position:fixed;inset:0;z-index:9999;overflow:hidden;display:flex;align-items:center;justify-content:center;background:linear-gradient(145deg,#4230b2,#725de1);animation:transition-background .45s ease forwards}.transition-content{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;color:#fff;animation:transition-content-in .65s cubic-bezier(.22,1,.36,1) forwards}.transition-glow{position:absolute;width:320px;height:320px;border-radius:50%;background:#b8adff33;filter:blur(35px);animation:transition-glow-pulse 2.2s ease-in-out infinite alternate}.transition-orbit{position:absolute;border:1px solid #ffffff35;border-radius:50%;animation:transition-orbit-spin 12s linear infinite}.transition-orbit.orbit-1{width:280px;height:280px}.transition-orbit.orbit-2{width:430px;height:210px;transform:rotate(45deg);animation-duration:15s}.transition-orbit.orbit-3{width:520px;height:520px;animation-duration:20s}.transition-logo-wrap{position:relative;width:110px;height:110px;display:grid;place-items:center}.transition-logo{position:relative;z-index:2;width:72px;height:72px;display:flex;align-items:center;justify-content:center;background:#fff;color:#5d4ad1;border-radius:20px;box-shadow:0 15px 45px #140a5059;animation:transition-logo 1s ease-in-out infinite alternate}.logo-ring{position:absolute;border:1px solid #ffffff99;border-radius:50%;animation:logo-ring-spin 5s linear infinite}.logo-ring.ring-one{inset:4px}.logo-ring.ring-two{inset:-9px;border-color:#cfc6ff88;animation-direction:reverse;animation-duration:7s}.transition-brand{display:flex;margin-top:20px;font-size:30px;font-weight:800;letter-spacing:-.5px}.transition-brand span{display:inline-block;animation:brand-letter-in .55s cubic-bezier(.22,1,.36,1) both}.transition-brand span:nth-child(2){animation-delay:.06s}.transition-brand span:nth-child(3){animation-delay:.12s}.transition-brand span:nth-child(4){animation-delay:.18s}.transition-brand span:nth-child(5){animation-delay:.24s}.transition-brand span:nth-child(6){animation-delay:.3s}.transition-message{margin-top:10px;color:#d9d4ff;font-size:12px}.transition-dots{display:flex;gap:7px;margin-top:18px}.transition-dots span{width:8px;height:8px;background:#fff;border-radius:50%;animation:loading-dot .9s ease-in-out infinite}.transition-dots span:nth-child(2){animation-delay:.15s}.transition-dots span:nth-child(3){animation-delay:.3s}@keyframes login-form-exit{to{opacity:0;transform:translateY(-35px) scale(.96)}}@keyframes transition-background{from{opacity:0}to{opacity:1}}@keyframes transition-content-in{from{opacity:0;transform:translateY(35px) scale(.8)}to{opacity:1;transform:translateY(0) scale(1)}}@keyframes transition-logo{to{transform:translateY(-10px) rotate(4deg)}}@keyframes transition-glow-pulse{from{transform:scale(.85);opacity:.5}to{transform:scale(1.15);opacity:1}}@keyframes transition-orbit-spin{to{transform:rotate(360deg)}}@keyframes logo-ring-spin{to{transform:rotate(-360deg)}}@keyframes brand-letter-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes loading-dot{0%,60%,100%{transform:translateY(0);opacity:.5}30%{transform:translateY(-8px);opacity:1}}@media(prefers-reduced-motion:reduce){.login-form.logging-in,.login-transition,.transition-content,.transition-logo,.transition-glow,.transition-orbit,.logo-ring,.transition-brand span,.transition-dots span{animation:none}.transition-logo,.transition-brand span,.transition-dots span{transform:none;opacity:1}}
`;

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("fazeela.m@gmail.com");
  const [password, setPassword] = useState("Fazeela@4321");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (isLoggingIn) return;
    try {
      setError("");
      setIsLoggingIn(true);
      await new Promise((resolve) => setTimeout(resolve, 850));
      await onLogin(email, password);
    } catch (err) {
      setIsLoggingIn(false);
      setError(err.message || "Unable to sign in. Check your details and try again.");
    }
  };

  const pullUpText = (text, startDelay = 0) => text.split(" ").map((word, wordIndex) => (
    <span className="word" key={`${word}-${wordIndex}`}>
      {[...word].map((letter, letterIndex) => (
        <span className="letter" key={`${letter}-${letterIndex}`} style={{ animationDelay: `${startDelay + (wordIndex * word.length + letterIndex) * 0.045}s` }}>{letter}</span>
      ))}
      {wordIndex < text.split(" ").length - 1 && <span className="letter">&nbsp;</span>}
    </span>
  ));

  return (
    <div className="login-page">
      <style>{loginCss}{slingCss}{transitionCss}</style>
      {isLoggingIn && (
  <div className="login-transition">

    <div className="transition-glow"></div>

    <div className="transition-orbit orbit-1"></div>
    <div className="transition-orbit orbit-2"></div>
    <div className="transition-orbit orbit-3"></div>

    <div className="transition-content">

      <div className="transition-logo-wrap">

        <div className="logo-ring ring-one"></div>
        <div className="logo-ring ring-two"></div>

        <div className="transition-logo">
          <GraduationCap size={40} />
        </div>

      </div>

      <div className="transition-brand">
        <span>A</span>
        <span>c</span>
        <span>a</span>
        <span>d</span>
        <span>l</span>
        <span>y</span>
      </div>

      <div className="transition-message">
        Preparing your dashboard
      </div>

      <div className="transition-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>

    </div>

  </div>
)}
      <section className="login-showcase">
        <div className="login-brand"><i><GraduationCap size={23} /></i><span className="brand-word">{pullUpText("Acadly", 0.1)}</span></div>
        <h1><span className="heading-white">{pullUpText("Own your", 0)}</span>{" "}<span className="heading-light">{pullUpText("academic journey.", 0.25)}</span></h1>
        <p>One calm, connected workspace for courses, attendance, schedules, assignments and results.</p>
        <div className="login-orbit"><div className="login-sling-track"><span className="login-sling-button"><Sparkles size={14} /></span></div></div>
        <div className="login-sling-stage" aria-hidden="true"><span className="login-sling-button"><Sparkles size={14} /></span></div>
        <div className="login-float one"><i><Sparkles size={15} /></i> Your goals, on track</div>
        <div className="login-float two"><i><BookOpen size={15} /></i> 4 courses this semester</div>
      </section>
      <section className="login-form-side">
       <form
  className={`login-form ${isLoggingIn ? "logging-in" : ""}`}
  onSubmit={submit}
>
          <div className="login-brand mobile-brand"><i><GraduationCap size={23} /></i><span className="brand-word">{pullUpText("Acadly", 0.1)}</span></div>
          <h2>Welcome back!</h2><p>Sign in to access your student portal.</p>
          <label className="form-label">University email</label>
          <div className="field"><Mail size={17} /><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="name@university.edu" /></div>
          <label className="form-label">Password</label>
          <div className="field"><LockKeyhole size={17} /><input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Enter your password" /></div>
          <div className="login-options"><label><input type="checkbox" defaultChecked /> Keep me signed in</label><a href="#forgot">Forgot password?</a></div>
          <button
  type="submit"
  className="login-submit"
  disabled={isLoggingIn}
>
  <span className="button-text">
    {isLoggingIn ? "Signing you in..." : "Sign in to dashboard"}
  </span>

  <span className="button-arrow">
    <ArrowRight size={17} />
  </span>
</button>
          {error && <p className="form-error">{error}</p>}
          <p className="demo-note">Demo credentials are prefilled. Click <b>Sign in</b> to continue.</p>
        </form>
      </section>
    </div>
  );
}
