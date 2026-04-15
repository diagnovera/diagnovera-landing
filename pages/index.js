// pages/index.js
// DiagnoVera Landing Page — Vercel deployment
// Login links point to Cloud Run backend
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';

const landingCSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --cream:   #faf8f4;
  --ink:     #18120a;
  --ink2:    #3a2c1e;
  --ink3:    #7a6a58;
  --blue:    #0288d1;
  --blue2:   #005b9a;
  --red:     #d42010;
  --gold:    #c89820;
  --green:   #2e6a30;
  --border:  rgba(58,44,30,0.12);
  --r:       14px;
}
html{scroll-behavior:smooth}
body{font-family:'DM Sans',system-ui,sans-serif;background:var(--cream);color:var(--ink);overflow-x:hidden;line-height:1.6}
a{text-decoration:none;color:inherit}

/* ── NAV ── */
nav{
  position:sticky;top:0;z-index:200;
  height:62px;padding:0 52px;
  display:flex;align-items:center;justify-content:space-between;
  background:rgba(250,248,244,0.96);
  border-bottom:1px solid var(--border);
  backdrop-filter:blur(12px);
}
.logo{display:flex;align-items:center;gap:10px}
.logo-mark{
  width:34px;height:34px;border-radius:8px;flex-shrink:0;
  background:linear-gradient(135deg,#1565c0,#0288d1,#00bcd4);
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 3px 12px rgba(2,136,209,0.38);
}
.logo-name{font-family:'Playfair Display',Georgia,serif;font-size:19px;font-weight:900;color:var(--ink);letter-spacing:-.3px}
.logo-name b{color:var(--blue)}
.logo-tm{font-size:7.5px;color:var(--blue);vertical-align:super;letter-spacing:1px;font-family:sans-serif}
.nav-links{display:flex;gap:26px}
.nav-links a{font-size:13px;color:var(--ink3);transition:color .2s}
.nav-links a:hover{color:var(--ink)}
.nav-right{display:flex;align-items:center;gap:12px}
.btn-demo{font-size:13px;color:var(--ink3);transition:color .2s}
.btn-demo:hover{color:var(--ink)}
.btn-login{
  background:var(--blue);color:#fff;
  padding:8px 20px;border-radius:7px;
  font-size:13px;font-weight:600;letter-spacing:.3px;
  box-shadow:0 3px 14px rgba(2,136,209,0.35);
  transition:background .2s,transform .15s;
}
.btn-login:hover{background:var(--blue2);transform:translateY(-1px)}

/* ── HERO ── */
.hero{
  position:relative;
  height:78vh;min-height:520px;max-height:720px;
  overflow:hidden;
  border-bottom:1px solid var(--border);
}
.hero-scene{position:absolute;inset:0;width:100%;height:100%}
/* Dark overlay — heavier at bottom for text legibility */
.hero-veil{
  position:absolute;inset:0;
  background:linear-gradient(
    180deg,
    rgba(24,18,10,0.08) 0%,
    rgba(24,18,10,0.22) 45%,
    rgba(24,18,10,0.78) 100%
  );
  z-index:2;
}
.hero-content{
  position:absolute;bottom:0;left:0;right:0;z-index:3;
  padding:0 52px 56px;
  display:flex;align-items:flex-end;justify-content:space-between;
  gap:40px;
}
.hero-left{max-width:620px}
.hero-kicker{
  display:inline-flex;align-items:center;gap:9px;
  background:rgba(8,16,36,0.78);border:1px solid rgba(255,255,255,0.32);
  border-radius:24px;padding:7px 18px;margin-bottom:18px;
  font-size:11px;font-weight:700;letter-spacing:2px;
  color:#ffffff;text-transform:uppercase;
  backdrop-filter:blur(12px);
  box-shadow:0 2px 16px rgba(0,0,0,0.30);
}
.kicker-dot{width:6px;height:6px;border-radius:50%;background:#ff6b5a;flex-shrink:0;animation:blink 2.2s ease-in-out infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}
.hero h1{
  font-family:'Playfair Display',Georgia,serif;
  font-size:52px;font-weight:900;line-height:1.06;
  letter-spacing:-2px;color:#fff;
  margin-bottom:18px;
  text-shadow:0 2px 20px rgba(0,0,0,0.42);
}
.hero h1 em{color:#82cef4;font-style:normal}
.hero-sub{
  font-size:16px;font-weight:300;
  color:rgba(220,210,195,0.82);
  line-height:1.68;max-width:520px;
  text-shadow:0 1px 8px rgba(0,0,0,0.35);
  margin-bottom:28px;
}
.hero-sub strong{color:rgba(240,235,220,0.95);font-weight:500}
.hero-ctas{display:flex;gap:12px;align-items:center}
.btn-enter{
  background:linear-gradient(135deg,#0d47a1,#0288d1 55%,#00acc1);
  color:#fff;padding:13px 28px;border-radius:9px;
  font-size:14.5px;font-weight:600;letter-spacing:.3px;
  box-shadow:0 5px 22px rgba(2,136,209,0.45);
  transition:opacity .2s,transform .15s;
}
.btn-enter:hover{opacity:.90;transform:translateY(-1px)}
.btn-ghost{
  border:1.5px solid rgba(255,255,255,0.32);color:rgba(255,255,255,0.82);
  padding:12px 22px;border-radius:9px;font-size:14px;
  transition:background .2s,border-color .2s;backdrop-filter:blur(8px);
}
.btn-ghost:hover{background:rgba(255,255,255,0.14);border-color:rgba(255,255,255,0.55)}
/* Trust badges right of hero content */
.hero-trust{
  display:flex;flex-direction:column;gap:8px;
  align-items:flex-end;padding-bottom:4px;flex-shrink:0;
}
.trust-badge{
  display:flex;align-items:center;gap:8px;
  background:rgba(250,248,244,0.10);
  border:1px solid rgba(255,255,255,0.20);
  border-radius:8px;padding:7px 14px;
  backdrop-filter:blur(8px);
  font-size:11.5px;color:rgba(240,235,220,0.92);
  white-space:nowrap;
}
.trust-badge span{width:6px;height:6px;border-radius:50%;flex-shrink:0}

/* ── STAT STRIP ── */
.stat-strip{
  display:grid;grid-template-columns:repeat(4,1fr);
  background:#fff;
  border-bottom:2px solid var(--border);
}
.stat-box{
  padding:26px 20px;text-align:center;
  border-right:1px solid var(--border);
}
.stat-box:last-child{border-right:none}
.st-num{
  font-family:'Playfair Display',Georgia,serif;
  font-size:36px;font-weight:900;color:var(--blue);
  letter-spacing:-1px;line-height:1;
}
.st-lbl{font-size:10.5px;color:var(--ink3);text-transform:uppercase;letter-spacing:1.2px;margin-top:5px;font-weight:600}

/* ── SECTIONS ── */
.section{padding:80px 52px}
.si{max-width:1100px;margin:0 auto}
.eyebrow{
  font-size:9.5px;font-weight:700;letter-spacing:3.5px;
  text-transform:uppercase;color:var(--blue);margin-bottom:10px;
}
.h2{
  font-family:'Playfair Display',Georgia,serif;
  font-size:38px;font-weight:900;color:var(--ink);
  letter-spacing:-.8px;line-height:1.14;margin-bottom:10px;
}
.h2 em{color:var(--blue);font-style:normal}
.section-lead{
  font-size:15.5px;color:var(--ink3);
  max-width:480px;line-height:1.70;font-weight:300;
}
.sh{margin-bottom:52px}
.alt{background:#fff;border-top:1px solid var(--border);border-bottom:1px solid var(--border)}

/* ── SIX FEATURE CARDS ── */
.card-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.fcard{
  background:var(--cream);
  border:1.5px solid var(--border);
  border-radius:18px;
  padding:30px 28px 26px;
  position:relative;
  overflow:hidden;
  transition:border-color .22s,box-shadow .22s,transform .22s;
}
.fcard:hover{
  border-color:rgba(2,136,209,0.35);
  box-shadow:0 10px 40px rgba(0,60,120,0.09);
  transform:translateY(-3px);
}
.fcard::before{
  content:'';position:absolute;top:-30px;right:-30px;
  width:120px;height:120px;border-radius:50%;
  opacity:.06;
}
.fc-blue::before{background:var(--blue)}
.fc-red::before{background:var(--red)}
.fc-gold::before{background:var(--gold)}
.fc-green::before{background:var(--green)}
.fcard-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:18px}
.fcard-icon{
  width:44px;height:44px;border-radius:11px;
  display:flex;align-items:center;justify-content:center;
  font-size:22px;flex-shrink:0;
}
.fcard-lb{flex-shrink:0}  /* ladybug badge */
.fcard h3{font-family:'Playfair Display',Georgia,serif;font-size:20px;font-weight:900;color:var(--ink);margin-bottom:10px;letter-spacing:-.3px;line-height:1.2}
.fcard p{font-size:13px;color:var(--ink3);line-height:1.68}
.fcard-tags{display:flex;gap:6px;flex-wrap:wrap;margin-top:16px}
.ftag{font-size:10.5px;padding:3px 9px;border-radius:5px;font-weight:600;border:1px solid}

/* ── SPLIT SECTIONS ── */
.split{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;max-width:1100px;margin:0 auto}
.split.rev{direction:rtl}
.split.rev > *{direction:ltr}
.split-text p{font-size:14.5px;color:var(--ink3);line-height:1.74;margin-bottom:12px}
.split-text p strong{color:var(--ink);font-weight:600}
.split-art{
  background:#fff;border:1.5px solid var(--border);
  border-radius:20px;overflow:hidden;
  box-shadow:0 8px 40px rgba(0,0,0,0.07);
}
.art-panel{padding:0}
.art-cap{
  background:#faf8f4;border-top:1px solid var(--border);
  padding:12px 20px;display:flex;align-items:center;gap:10px;
}
.art-cap-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.art-cap-label{font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:var(--blue)}
.art-cap-val{font-size:12.5px;color:var(--ink);font-weight:600;margin-left:auto}
.pill-row{display:flex;gap:7px;flex-wrap:wrap;margin-top:16px}
.pill{font-size:11px;padding:4px 11px;border-radius:20px;font-weight:600;border:1px solid}

/* ── FACILITY GRID ── */
.fac-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:13px}
.fac{
  background:#fff;border:1.5px solid var(--border);border-radius:14px;
  padding:22px 18px;transition:border-color .2s,transform .2s;
}
.fac:hover{border-color:rgba(2,136,209,0.30);transform:translateY(-2px)}
.fac-icon{font-size:26px;margin-bottom:10px}
.fac-name{font-size:13px;font-weight:700;color:var(--ink);margin-bottom:4px}
.fac-desc{font-size:11.5px;color:var(--ink3);line-height:1.55}

/* ── QUOTE ── */
.quote-panel{
  background:#fff;border:1.5px solid var(--border);border-radius:20px;
  padding:40px 44px;position:relative;overflow:hidden;
  max-width:880px;margin:48px auto 0;
}
.quote-panel::before{
  content:'"';position:absolute;top:-10px;left:28px;
  font-family:'Playfair Display',Georgia,serif;
  font-size:120px;font-weight:900;color:rgba(2,136,209,0.08);line-height:1;
}
.qt{font-family:'Playfair Display',Georgia,serif;font-size:19px;font-style:italic;color:var(--ink);line-height:1.62;padding-left:8px;margin-bottom:16px}
.qa{font-size:12px;color:var(--ink3);font-weight:600;letter-spacing:.3px}
.quote-lb{position:absolute;bottom:18px;right:24px}

/* ── STAKE ROW ── */
.stake{
  display:grid;grid-template-columns:repeat(5,1fr);
  border:1.5px solid var(--border);border-radius:16px;overflow:hidden;
  background:#fff;margin-top:36px;
}
.sc{padding:24px 18px;text-align:center;border-right:1px solid var(--border)}
.sc:last-child{border-right:none}
.sl{font-size:9.5px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--ink2);margin-bottom:8px}
.sv{font-family:'Playfair Display',Georgia,serif;font-size:13.5px;color:var(--ink);line-height:1.72}

/* ── CLAUDE STRIP ── */
.claude-strip{
  background:linear-gradient(135deg,#04101e,#071828);
  padding:56px 52px;
  display:grid;grid-template-columns:auto 1fr auto;
  align-items:center;gap:40px;
  border-top:1px solid rgba(79,195,247,0.10);
  border-bottom:1px solid rgba(79,195,247,0.10);
}
.ant-badge{
  display:flex;align-items:center;gap:14px;
  padding:14px 22px;
  background:rgba(201,100,66,0.08);border:1px solid rgba(201,100,66,0.18);
  border-radius:14px;flex-shrink:0;
}
.ant-icon{
  width:44px;height:44px;border-radius:9px;
  background:linear-gradient(135deg,#c96442,#e8784a);
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 3px 14px rgba(200,100,60,0.36);flex-shrink:0;
}
.ant-by{font-size:9px;color:rgba(200,170,140,0.85);letter-spacing:2px;text-transform:uppercase;margin-bottom:2px}
.ant-name{font-family:'Playfair Display',Georgia,serif;font-size:19px;font-weight:900;color:rgba(220,175,145,0.90)}
.claude-text h3{font-family:'Playfair Display',Georgia,serif;font-size:22px;font-weight:900;color:#e8f4ff;margin-bottom:6px;letter-spacing:-.3px}
.claude-text p{font-size:13.5px;color:rgba(170,205,230,0.90);line-height:1.68;max-width:480px}
.claude-ctas{display:flex;flex-direction:column;gap:10px;flex-shrink:0}
.btn-claude{background:linear-gradient(135deg,#0d47a1,#0288d1 60%,#00acc1);color:#fff;padding:11px 24px;border-radius:8px;font-size:13.5px;font-weight:600;text-align:center;box-shadow:0 4px 16px rgba(2,136,209,0.40);transition:opacity .2s}
.btn-claude:hover{opacity:.88}
.btn-ant{border:1px solid rgba(255,255,255,0.28);color:rgba(210,230,245,0.90);padding:10px 24px;border-radius:8px;font-size:13px;text-align:center;transition:background .2s}
.btn-ant:hover{background:rgba(255,255,255,0.07)}

/* ── FOOTER ── */
footer{
  background:#fff;
  border-top:1.5px solid var(--border);
  padding:64px 52px 36px;
}
.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:52px;max-width:1100px;margin:0 auto 48px}
.flogo{font-family:'Playfair Display',Georgia,serif;font-size:19px;font-weight:900;color:var(--ink);margin-bottom:10px}
.flogo b{color:var(--blue)}
.fdesc{font-size:12.5px;color:var(--ink3);line-height:1.70;max-width:240px;margin-bottom:18px}
.fcontact{font-size:12px;color:var(--ink3);line-height:2.0}
.fcontact strong{color:var(--ink);font-weight:600;display:block;margin-top:10px}
.fcontact strong:first-child{margin-top:0}
.fcol-title{font-size:10px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:var(--blue);margin-bottom:14px;opacity:.70}
.fcol-links{display:flex;flex-direction:column;gap:9px}
.fcol-links a{font-size:13px;color:var(--ink3);transition:color .2s}
.fcol-links a:hover{color:var(--ink)}
.footer-divider{height:1px;background:var(--border);max-width:1100px;margin:0 auto 24px}
.footer-bottom{display:flex;align-items:center;justify-content:space-between;max-width:1100px;margin:0 auto;flex-wrap:wrap;gap:12px}
.fbadges{display:flex;gap:7px}
.fbadge{font-size:9.5px;padding:3px 8px;border-radius:4px;font-weight:700;border:1px solid}
.fb-h{background:rgba(2,136,209,0.10);border-color:rgba(2,136,209,0.25);color:#0277b0}
.fb-k{background:rgba(46,106,48,0.10);border-color:rgba(46,106,48,0.25);color:#2e6a30}
.fb-c{background:rgba(200,100,60,0.10);border-color:rgba(200,100,60,0.25);color:#a0522d}
.fcopy{font-size:11px;color:var(--ink3);opacity:.80}
.fsocial{display:flex;gap:14px}
.fsocial a{font-size:12px;color:var(--ink3);opacity:.80;transition:opacity .2s}
.fsocial a:hover{opacity:1}
`;

const landingBody = `<!-- NAV -->
<nav>
  <a class="logo" href="#">
    <div class="logo-mark">
      <svg width="22" height="22" viewBox="-16 -20 32 34" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="0" cy="0" rx="10" ry="8.5" fill="#d42010"/>
        <ellipse cx="-2.5" cy="-3" rx="3.8" ry="2.8" fill="rgba(255,160,140,0.45)"/>
        <line x1="0" y1="-8.5" x2="0" y2="8.5" stroke="#1a0800" stroke-width="1.2"/>
        <circle cx="-3.5" cy="-2.5" r="2" fill="#1a0800"/>
        <circle cx="-4" cy="2.5" r="1.6" fill="#1a0800"/>
        <circle cx="3.5" cy="-2.5" r="2" fill="#1a0800"/>
        <circle cx="4" cy="2.5" r="1.6" fill="#1a0800"/>
        <ellipse cx="0" cy="-9.5" rx="5.2" ry="4.5" fill="#1a0800"/>
        <circle cx="-2.5" cy="-10.5" r="1.7" fill="white"/>
        <circle cx="2.5" cy="-10.5" r="1.7" fill="white"/>
        <circle cx="-2" cy="-10.5" r="0.9" fill="#1a0800"/>
        <circle cx="2.8" cy="-10.5" r="0.9" fill="#1a0800"/>
        <circle cx="-1.6" cy="-11.1" r="0.4" fill="white"/>
        <circle cx="3.2" cy="-11.1" r="0.4" fill="white"/>
        <path d="M-2,-13.5 C-3.5,-16.5 -6,-18 -7.5,-19" fill="none" stroke="#1a0800" stroke-width="0.9" stroke-linecap="round"/>
        <circle cx="-7.5" cy="-19" r="1.1" fill="#1a0800"/>
        <path d="M2,-13.5 C3.5,-16.5 6,-18 7.5,-19" fill="none" stroke="#1a0800" stroke-width="0.9" stroke-linecap="round"/>
        <circle cx="7.5" cy="-19" r="1.1" fill="#1a0800"/>
      </svg>
    </div>
    <span class="logo-name">Diagno<b>Vera</b><sup class="logo-tm">&#8482;</sup></span>
  </a>
  <div class="nav-links">
    <a href="#platform">Platform</a>
    <a href="#lambda-dx">&#923; Lambda Dx</a>
    <a href="#telehealth">Telehealth</a>
    <a href="#billing">Billing &amp; RCM</a>
    <a href="#solutions">Solutions</a>
    <a href="#contact">Contact</a>
  </div>
  <div class="nav-right">
    <a class="btn-demo" href="#contact">Request Demo</a>
    <a class="btn-login" href="https://diagnovera-924070815611.us-west1.run.app/login">Sign In &#8594;</a>
  </div>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-scene"><svg viewBox="0 0 1440 580" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style="display:block;width:100%;height:100%">
<defs>
  <filter id="fSun"><feGaussianBlur stdDeviation="18" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <radialGradient id="gSunH" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#fff8d0" stop-opacity="0.65"/>
    <stop offset="55%" stop-color="#f0c840" stop-opacity="0.18"/>
    <stop offset="100%" stop-color="#e09820" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="gSunD" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#fffce8"/>
    <stop offset="100%" stop-color="#ffe890"/>
  </radialGradient>

  <linearGradient id="gSky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%"   stop-color="#f0d8a0"/>
    <stop offset="18%"  stop-color="#e8c878"/>
    <stop offset="38%"  stop-color="#c8d8f0"/>
    <stop offset="65%"  stop-color="#5ab4ec"/>
    <stop offset="100%" stop-color="#82cef4"/>
  </linearGradient>

  <linearGradient id="gSnowMain" x1="0.25" y1="0" x2="0.75" y2="1">
    <stop offset="0%"   stop-color="#ffffff"/>
    <stop offset="40%"  stop-color="#eef6fc"/>
    <stop offset="85%"  stop-color="#c4dff0"/>
    <stop offset="100%" stop-color="#a0c8e0"/>
  </linearGradient>
  <linearGradient id="gSnowL" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%"   stop-color="#b8d8ec"/>
    <stop offset="100%" stop-color="#78a8c4"/>
  </linearGradient>
  <linearGradient id="gSnowR" x1="1" y1="0" x2="0" y2="1">
    <stop offset="0%"   stop-color="#a8cce0"/>
    <stop offset="100%" stop-color="#6898b4"/>
  </linearGradient>
  <linearGradient id="gRock" x1="0.1" y1="0" x2="0.3" y2="1">
    <stop offset="0%"   stop-color="#687c8c"/>
    <stop offset="55%"  stop-color="#485868"/>
    <stop offset="100%" stop-color="#2c3c48"/>
  </linearGradient>
  <linearGradient id="gRockDark" x1="0.9" y1="0" x2="0.7" y2="1">
    <stop offset="0%"   stop-color="#384858"/>
    <stop offset="100%" stop-color="#202c36"/>
  </linearGradient>
  <linearGradient id="gForestL" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%"   stop-color="#2c6a34"/>
    <stop offset="100%" stop-color="#143c1c"/>
  </linearGradient>
  <linearGradient id="gForestR" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%"   stop-color="#286230"/>
    <stop offset="100%" stop-color="#103a18"/>
  </linearGradient>
  <linearGradient id="gMeadow" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%"   stop-color="#4aa452"/>
    <stop offset="100%" stop-color="#2a6232"/>
  </linearGradient>

  <filter id="fSnow" x="-20%" y="-20%" width="140%" height="140%">
    <feGaussianBlur stdDeviation="6" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="fEagle" x="-15%" y="-15%" width="130%" height="130%">
    <feDropShadow dx="4" dy="6" stdDeviation="5" flood-color="rgba(0,0,0,0.50)"/>
  </filter>
  <filter id="fTulip">
    <feDropShadow dx="2" dy="3" stdDeviation="2.5" flood-color="rgba(0,0,0,0.28)"/>
  </filter>
  <radialGradient id="gVig" cx="50%" cy="50%" r="70%">
    <stop offset="50%" stop-color="transparent"/>
    <stop offset="100%" stop-color="rgba(0,8,24,0.58)"/>
  </radialGradient>

</defs>

<!-- SKY -->
<rect width="1440" height="580" fill="url(#gSky)"/>

<!-- SUN — upper right, warm dawn -->
<circle cx="1148" cy="78" r="210" fill="url(#gSunH)"/>
<circle cx="1148" cy="78" r="120" fill="rgba(255,220,80,0.10)"/>
<circle cx="1148" cy="78" r="80"  fill="rgba(255,230,100,0.14)"/>
<circle cx="1148" cy="78" r="52"  fill="rgba(255,240,120,0.20)"/>
<circle cx="1148" cy="78" r="36"  fill="url(#gSunD)" filter="url(#fSun)"/>
<circle cx="1148" cy="78" r="28"  fill="#fffde8"/>
<g opacity="0.22" stroke="#d8b840" stroke-width="2" stroke-linecap="round">
  <line x1="1148" y1="28"  x2="1148" y2="14"/>
  <line x1="1148" y1="128" x2="1148" y2="142"/>
  <line x1="1098" y1="78"  x2="1084" y2="78"/>
  <line x1="1198" y1="78"  x2="1212" y2="78"/>
  <line x1="1113" y1="43"  x2="1103" y2="33"/>
  <line x1="1183" y1="43"  x2="1193" y2="33"/>
  <line x1="1113" y1="113" x2="1103" y2="123"/>
  <line x1="1183" y1="113" x2="1193" y2="123"/>
</g>

<!-- ══ CLOUDS ══ -->
<g opacity="0.92">
  <ellipse cx="140" cy="95"  rx="108" ry="36" fill="white"/>
  <ellipse cx="195" cy="80"  rx="72"  ry="28" fill="white"/>
  <ellipse cx="88"  cy="106" rx="58"  ry="22" fill="#f6fafd"/>
</g>
<g opacity="0.86">
  <ellipse cx="1200" cy="72" rx="118" ry="37" fill="white"/>
  <ellipse cx="1275" cy="57" rx="76"  ry="28" fill="white"/>
  <ellipse cx="1134" cy="83" rx="60"  ry="22" fill="#f4f8fc"/>
</g>
<g opacity="0.62">
  <ellipse cx="520"  cy="115" rx="84" ry="26" fill="white"/>
  <ellipse cx="588"  cy="100" rx="54" ry="20" fill="white"/>
</g>
<g opacity="0.52">
  <ellipse cx="820"  cy="84"  rx="70" ry="23" fill="white"/>
  <ellipse cx="882"  cy="72"  rx="46" ry="17" fill="white"/>
</g>


<!-- ══ BACKGROUND HILLS ══ -->
<path d="M-10,590 C150,520 360,496 560,510 C680,520 740,544 760,550 C780,544 840,520 960,510 C1160,496 1350,522 1450,592 L1450,680 L-10,680 Z"
      fill="#3a8844" opacity="0.50"/>


<!-- ══ LEFT FOREST FLANK ══ -->
<path d="M-10,628 C55,518 138,412 248,364 C304,340 352,362 390,408 C426,450 455,506 478,556 C500,600 514,622 526,636 L-10,648 Z"
      fill="url(#gForestL)"/>
<path d="M8,636 C24,606 38,586 52,612 C66,584 80,566 96,592 C114,562 132,546 150,574 C168,544 188,530 208,558 C228,530 250,516 274,544 C296,518 320,506 346,530 C368,508 392,498 416,520 C436,500 456,490 474,510 L474,642 L8,642 Z"
      fill="#103c1a" opacity="0.90"/>

<!-- ══ RIGHT FOREST FLANK ══ -->
<path d="M1450,628 C1382,516 1270,406 1150,360 C1084,334 1032,358 984,406 C936,454 902,508 872,558 C844,600 826,622 812,636 L1450,648 Z"
      fill="url(#gForestR)"/>
<path d="M1432,636 C1414,606 1398,586 1382,612 C1366,584 1350,566 1332,592 C1312,562 1292,546 1270,574 C1248,544 1226,530 1202,558 C1178,530 1154,516 1128,544 C1104,518 1078,506 1052,530 C1028,508 1002,498 976,520 C954,500 930,490 908,510 L908,642 L1432,642 Z"
      fill="#103818" opacity="0.90"/>

<!-- ══════════════════════════════════════════════════════
     ALPS MOUNTAIN — broad, rounded, majestic snow-capped peak
     Inspired by the Jungfrau: wide base, multiple sub-ridges,
     rounded summit dome (NOT a spike), generous snow coverage
══════════════════════════════════════════════════════ -->

<!-- ── Far background ridge (gives depth) ── -->
<path d="M200,660 C280,580 400,510 520,490 C600,478 650,490 680,510
         C700,520 710,535 720,545
         C730,535 740,520 760,510
         C790,490 840,478 920,490
         C1040,510 1160,580 1240,660 Z"
      fill="#4a6a78" opacity="0.55"/>

<!-- ── Main mountain rocky body ── -->
<!-- Wide flanks rising to a broad shouldered peak with natural ridgelines -->
<path d="M280,655
         C310,610 345,560 385,515
         C420,474 460,444 495,428
         C518,418 538,418 555,424
         C572,430 588,444 604,462
         C616,474 628,490 638,508
         C648,490 660,470 674,452
         C690,430 708,412 720,400
         C732,412 750,430 766,452
         C780,470 792,490 802,508
         C812,490 824,474 836,462
         C852,444 868,430 885,424
         C902,418 922,418 945,428
         C980,444 1020,474 1055,515
         C1095,560 1130,610 1160,655 Z"
      fill="url(#gRock)"/>

<!-- Left flank deep shadow -->
<path d="M280,655 C310,610 345,560 385,515 C420,474 460,444 495,428
         C518,418 538,418 555,424
         C530,440 505,466 482,498
         C458,532 438,568 420,604
         C400,636 355,650 280,655 Z"
      fill="#1e2e3c" opacity="0.68"/>

<!-- Right flank shadow -->
<path d="M1160,655 C1130,610 1095,560 1055,515 C1020,474 980,444 945,428
         C922,418 902,418 885,424
         C910,440 935,466 958,498
         C982,532 1002,568 1020,604
         C1040,636 1085,650 1160,655 Z"
      fill="#18242e" opacity="0.72"/>

<!-- Mid-mountain rocky texture / ledge lines -->
<path d="M498,470 C516,452 538,440 558,446 C540,458 524,476 512,492
         C530,484 554,472 576,468 L558,500 C536,508 510,514 488,518 Z"
      fill="#334858" opacity="0.60"/>
<path d="M942,470 C924,452 902,440 882,446 C900,458 916,476 928,492
         C910,484 886,472 864,468 L882,500 C904,508 930,514 952,518 Z"
      fill="#2c3e4c" opacity="0.58"/>
<!-- Additional mid-left rocky crease -->
<path d="M420,540 C436,522 456,510 474,516 C458,528 444,544 436,558
         C452,550 470,540 488,536 L474,562 C456,570 434,574 416,578 Z"
      fill="#2a3e50" opacity="0.50"/>

<!-- ══ SNOW CAP — broad rounded dome, covers upper 40% of mountain ══ -->
<!-- Key: the summit is a wide DOME, not a spike.
     Snow drapes naturally down the flanks in flowing curtains.
     Left side in shadow (cooler blue-white), right side lit (bright white). -->

<!-- Snow base — the wide skirt of snow flowing down both sides -->
<path d="M555,424
         C572,430 588,444 604,462
         C616,474 628,490 638,508
         C648,490 660,470 674,452
         C690,430 708,412 720,400
         C732,412 750,430 766,452
         C780,470 792,490 802,508
         C812,490 824,474 836,462
         C852,444 868,430 885,424
         C866,416 848,406 832,396
         C814,384 800,370 788,354
         C774,336 762,316 752,296
         C744,278 736,260 728,244
         C724,230 722,218 720,208
         C718,218 716,230 712,244
         C704,260 696,278 688,296
         C678,316 666,336 652,354
         C640,370 626,384 608,396
         C592,406 574,416 555,424 Z"
      fill="url(#gSnowMain)" filter="url(#fSnow)"/>

<!-- Snow left shadow plane — blue-grey shading on left face -->
<path d="M720,208 C718,218 716,230 712,244 C704,260 696,278 688,296
         C678,316 666,336 652,354 C640,370 626,384 608,396
         C592,406 574,416 555,424
         C535,434 516,444 500,456
         C520,444 544,430 566,414
         C590,396 614,374 634,350
         C654,326 672,298 686,270
         C696,250 706,228 712,208
         C714,202 716,208 720,208 Z"
      fill="url(#gSnowL)" opacity="0.90"/>

<!-- Snow right lit face -->
<path d="M720,208 C722,218 724,230 728,244 C736,260 744,278 752,296
         C762,316 774,336 788,354 C800,370 814,384 832,396
         C848,406 866,416 885,424
         C905,434 924,444 940,456
         C920,444 896,430 874,414
         C850,396 826,374 806,350
         C786,326 768,298 754,270
         C744,250 734,228 728,208
         C726,202 724,208 720,208 Z"
      fill="url(#gSnowR)" opacity="0.86"/>

<!-- Summit dome — the key rounded top, wide and natural -->
<!-- This replaces the spike: a broad rounded hill shape -->
<path d="M672,298
         C682,272 694,250 706,234
         C712,224 716,216 720,210
         C724,216 728,224 734,234
         C746,250 758,272 768,298
         C758,286 748,272 740,258
         C734,246 728,234 720,226
         C712,234 706,246 700,258
         C692,272 682,286 672,298 Z"
      fill="white" opacity="0.96"/>

<!-- Summit rounded crown — soft dome top, NOT pointed -->
<ellipse cx="720" cy="212" rx="52" ry="28" fill="white" opacity="0.98"/>
<ellipse cx="718" cy="208" rx="38" ry="22" fill="white"/>
<!-- Snow highlights on dome -->
<ellipse cx="710" cy="205" rx="18" ry="10" fill="rgba(255,255,255,0.85)"/>

<!-- Snow shelf / cornice left side -->
<path d="M608,396 C626,378 648,362 668,368 C650,380 634,398 624,414
         C644,406 666,394 688,388 L670,422 C646,430 618,438 596,444 Z"
      fill="rgba(230,246,255,0.84)"/>
<!-- Snow shelf right side -->
<path d="M832,396 C814,378 792,362 772,368 C790,380 806,398 816,414
         C796,406 774,394 752,388 L770,422 C794,430 822,438 844,444 Z"
      fill="rgba(215,238,252,0.80)"/>

<!-- Snow drape over left shoulder ridge -->
<path d="M638,348 C650,328 664,312 678,308 C670,322 660,338 654,352
         C666,344 680,334 694,328 L682,352 C668,360 650,366 636,370 Z"
      fill="rgba(240,250,255,0.78)"/>
<!-- Snow drape right shoulder -->
<path d="M802,348 C790,328 776,312 762,308 C770,322 780,338 786,352
         C774,344 760,334 746,328 L758,352 C772,360 790,366 804,370 Z"
      fill="rgba(225,242,252,0.76)"/>

<!-- Atmospheric haze at mountain base -->
<ellipse cx="720" cy="530" rx="400" ry="60" fill="rgba(172,215,240,0.18)"/>


<!-- ══ MEADOW / FOREGROUND ══ -->
<path d="M-10,658 C130,612 340,595 545,608 C660,616 718,630 745,626 C772,622 830,614 935,608 C1140,595 1350,613 1450,660 L1450,900 L-10,900 Z"
      fill="url(#gMeadow)"/>
<path d="M-10,714 C120,676 318,660 520,672 C636,679 706,692 740,688 C774,684 844,677 958,672 C1160,660 1356,676 1450,715 L1450,900 L-10,900 Z"
      fill="#2e6434"/>
<path d="M-10,762 C170,736 410,724 648,732 C712,734 770,742 810,738 C952,726 1148,722 1450,756 L1450,900 L-10,900 Z"
      fill="#1c4a22"/>


<!-- ══ YELLOW WILDFLOWERS ══ -->
<g opacity="0.84">
  <ellipse cx="55"   cy="764" rx="58" ry="19" fill="#c0a410"/>
  <ellipse cx="148"  cy="758" rx="50" ry="16" fill="#d0b418"/>
  <ellipse cx="235"  cy="766" rx="54" ry="18" fill="#c4ac0e"/>
  <ellipse cx="325"  cy="760" rx="46" ry="15" fill="#ccb01a"/>
  <ellipse cx="415"  cy="768" rx="52" ry="17" fill="#c0a80e"/>
  <ellipse cx="505"  cy="762" rx="58" ry="19" fill="#ccb218"/>
  <ellipse cx="918"  cy="762" rx="58" ry="19" fill="#c0a410"/>
  <ellipse cx="1010" cy="766" rx="54" ry="18" fill="#ccb218"/>
  <ellipse cx="1100" cy="758" rx="50" ry="16" fill="#c4ac0e"/>
  <ellipse cx="1190" cy="764" rx="56" ry="18" fill="#d0b81e"/>
  <ellipse cx="1280" cy="758" rx="48" ry="15" fill="#c4ac1a"/>
  <ellipse cx="1368" cy="764" rx="52" ry="17" fill="#ccb01e"/>
</g>

<!-- ══════════════════════════════════════════════
     TULIPS — left half of screen, beautiful cup-form
     (right side kept clear for login panel)
══════════════════════════════════════════════ -->

<!-- Each tulip: curved stem + 2 strap leaves + 5 true cup petals -->
<!-- Petal shape: pointed oval, wide at top, pinched waist at base -->

<!-- TULIP T1 — DARK BURGUNDY, tallest center-left -->
<g filter="url(#fTulip)" transform="translate(520,770)">
  <path d="M0,0 C-3,-55 2,-115 0,-182" stroke="#386828" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M0,-95 C-32,-80 -55,-56 -46,-28 C-36,-44 -18,-68 0,-95 Z" fill="#4a8038" stroke="#2e5820" stroke-width="1"/>
  <path d="M0,-72 C32,-57 56,-33 47,-5 C37,-21 19,-46 0,-72 Z" fill="#528840" stroke="#2e5820" stroke-width="1"/>
  <!-- sepal -->
  <path d="M-15,-182 C-9,-194 0,-200 0,-200 C0,-200 9,-194 15,-182 C8,-187 -8,-187 -15,-182 Z" fill="#386828"/>
  <path d="M-8,-182 C-15,-174 -17,-162 0,-160 C17,-162 15,-174 8,-182 Z" fill="#4a8038"/>
  <!-- petals: back-left -->
  <path d="M-4,-188 C-20,-192 -34,-208 -30,-228 C-27,-246 -16,-256 -4,-260
           C-14,-252 -18,-238 -16,-222 C-14,-208 -10,-194 -4,-188 Z"
        fill="#300608" transform="rotate(-20,-4,-188)"/>
  <!-- back-right -->
  <path d="M4,-188 C20,-192 34,-208 30,-228 C27,-246 16,-256 4,-260
           C14,-252 18,-238 16,-222 C14,-208 10,-194 4,-188 Z"
        fill="#300608" transform="rotate(20,4,-188)"/>
  <!-- mid-left -->
  <path d="M-2,-188 C-18,-190 -32,-206 -28,-226 C-25,-244 -13,-254 -2,-258
           C-12,-250 -16,-236 -14,-220 C-12,-205 -7,-192 -2,-188 Z"
        fill="#460c12" transform="rotate(-9,-2,-188)"/>
  <!-- mid-right -->
  <path d="M2,-188 C18,-190 32,-206 28,-226 C25,-244 13,-254 2,-258
           C12,-250 16,-236 14,-220 C12,-205 7,-192 2,-188 Z"
        fill="#460c12" transform="rotate(9,2,-188)"/>
  <!-- front center -->
  <path d="M0,-188 C-16,-188 -26,-204 -23,-225 C-20,-244 -9,-256 0,-261
           C9,-256 20,-244 23,-225 C26,-204 16,-188 0,-188 Z"
        fill="#5e1018"/>
  <path d="M-3,-205 C-4,-222 -2,-242 0,-257 C2,-242 4,-222 3,-205 Z" fill="rgba(180,40,55,0.32)"/>
</g>

<!-- TULIP T2 — DARK BURGUNDY left -->
<g filter="url(#fTulip)" transform="translate(443,754)">
  <path d="M0,0 C2,-52 -2,-108 0,-168" stroke="#386828" stroke-width="5.5" fill="none" stroke-linecap="round"/>
  <path d="M0,-88 C-29,-74 -50,-52 -42,-26 C-33,-41 -16,-63 0,-88 Z" fill="#4a8038"/>
  <path d="M0,-66 C30,-52 52,-30 43,-4 C34,-19 17,-43 0,-66 Z" fill="#528840"/>
  <path d="M-13,-168 C-8,-180 0,-185 0,-185 C0,-185 8,-180 13,-168 C7,-173 -7,-173 -13,-168 Z" fill="#386828"/>
  <path d="M-7,-168 C-13,-160 -15,-150 0,-148 C15,-150 13,-160 7,-168 Z" fill="#4a8038"/>
  <path d="M-3,-174 C-19,-178 -31,-193 -28,-212 C-24,-229 -13,-238 -3,-242
           C-13,-235 -17,-222 -15,-207 C-13,-193 -8,-179 -3,-174 Z" fill="#2c0508" transform="rotate(-19,-3,-174)"/>
  <path d="M3,-174 C19,-178 31,-193 28,-212 C24,-229 13,-238 3,-242
           C13,-235 17,-222 15,-207 C13,-193 8,-179 3,-174 Z" fill="#2c0508" transform="rotate(19,3,-174)"/>
  <path d="M-1,-174 C-17,-176 -29,-191 -26,-210 C-22,-228 -11,-237 -1,-241
           C-11,-234 -15,-220 -13,-206 C-11,-191 -6,-177 -1,-174 Z" fill="#420a10" transform="rotate(-8,-1,-174)"/>
  <path d="M1,-174 C17,-176 29,-191 26,-210 C22,-228 11,-237 1,-241
           C11,-234 15,-220 13,-206 C11,-191 6,-177 1,-174 Z" fill="#420a10" transform="rotate(8,1,-174)"/>
  <path d="M0,-174 C-15,-172 -24,-187 -22,-207 C-19,-225 -8,-237 0,-241
           C8,-237 19,-225 22,-207 C24,-187 15,-172 0,-174 Z" fill="#560e16"/>
  <path d="M-2,-190 C-3,-207 -1,-226 0,-239 C1,-226 3,-207 2,-190 Z" fill="rgba(170,36,52,0.30)"/>
</g>

<!-- TULIP T3 — BRIGHT PINK, right of T1 -->
<g filter="url(#fTulip)" transform="translate(604,762)">
  <path d="M0,0 C-2,-50 1,-104 0,-162" stroke="#386828" stroke-width="5.5" fill="none" stroke-linecap="round"/>
  <path d="M0,-84 C-28,-70 -48,-48 -40,-23 C-31,-38 -15,-61 0,-84 Z" fill="#4a8038"/>
  <path d="M0,-63 C28,-49 49,-27 40,-2 C31,-17 15,-41 0,-63 Z" fill="#528840"/>
  <path d="M-13,-162 C-8,-173 0,-178 0,-178 C0,-178 8,-173 13,-162 C7,-167 -7,-167 -13,-162 Z" fill="#386828"/>
  <path d="M-7,-162 C-13,-154 -15,-145 0,-143 C15,-145 13,-154 7,-162 Z" fill="#4a8038"/>
  <!-- bright pink petals -->
  <path d="M-3,-168 C-18,-172 -30,-187 -27,-205 C-23,-222 -12,-231 -3,-235
           C-13,-228 -16,-215 -14,-201 C-12,-187 -7,-172 -3,-168 Z" fill="#8c0a38" transform="rotate(-19,-3,-168)"/>
  <path d="M3,-168 C18,-172 30,-187 27,-205 C23,-222 12,-231 3,-235
           C13,-228 16,-215 14,-201 C12,-187 7,-172 3,-168 Z" fill="#8c0a38" transform="rotate(19,3,-168)"/>
  <path d="M-1,-168 C-17,-170 -28,-185 -25,-204 C-22,-221 -10,-231 -1,-235
           C-11,-228 -14,-214 -12,-200 C-10,-186 -5,-170 -1,-168 Z" fill="#b01650" transform="rotate(-9,-1,-168)"/>
  <path d="M1,-168 C17,-170 28,-185 25,-204 C22,-221 10,-231 1,-235
           C11,-228 14,-214 12,-200 C10,-186 5,-170 1,-168 Z" fill="#b01650" transform="rotate(9,1,-168)"/>
  <path d="M0,-168 C-15,-166 -24,-181 -21,-200 C-18,-218 -7,-230 0,-234
           C7,-230 18,-218 21,-200 C24,-181 15,-166 0,-168 Z" fill="#d02468"/>
  <path d="M-2,-184 C-3,-200 -1,-219 0,-232 C1,-219 3,-200 2,-184 Z" fill="rgba(255,155,195,0.42)"/>
</g>

<!-- TULIP T4 — WHITE/CREAM -->
<g filter="url(#fTulip)" transform="translate(370,762)">
  <path d="M0,0 C1,-48 -1,-98 0,-154" stroke="#386828" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M0,-80 C-26,-67 -44,-46 -36,-22 C-28,-36 -13,-58 0,-80 Z" fill="#4a8038"/>
  <path d="M0,-60 C26,-47 44,-26 36,-2 C28,-16 13,-39 0,-60 Z" fill="#528840"/>
  <path d="M-12,-154 C-7,-164 0,-169 0,-169 C0,-169 7,-164 12,-154 C6,-159 -6,-159 -12,-154 Z" fill="#386828"/>
  <path d="M-6,-154 C-12,-146 -14,-137 0,-135 C14,-137 12,-146 6,-154 Z" fill="#4a8038"/>
  <!-- white petals -->
  <path d="M-3,-160 C-17,-163 -28,-177 -25,-195 C-22,-211 -11,-221 -3,-224
           C-12,-218 -15,-205 -13,-192 C-11,-179 -6,-163 -3,-160 Z" fill="#ccd2d8" transform="rotate(-18,-3,-160)"/>
  <path d="M3,-160 C17,-163 28,-177 25,-195 C22,-211 11,-221 3,-224
           C12,-218 15,-205 13,-192 C11,-179 6,-163 3,-160 Z" fill="#ccd2d8" transform="rotate(18,3,-160)"/>
  <path d="M-1,-160 C-16,-162 -26,-176 -23,-194 C-20,-211 -9,-221 -1,-225
           C-9,-218 -13,-205 -11,-191 C-9,-177 -4,-163 -1,-160 Z" fill="#dce2e8" transform="rotate(-8,-1,-160)"/>
  <path d="M1,-160 C16,-162 26,-176 23,-194 C20,-211 9,-221 1,-225
           C9,-218 13,-205 11,-191 C9,-177 4,-163 1,-160 Z" fill="#dce2e8" transform="rotate(8,1,-160)"/>
  <path d="M0,-160 C-14,-158 -22,-172 -19,-191 C-16,-209 -5,-220 0,-224
           C5,-220 16,-209 19,-191 C22,-172 14,-158 0,-160 Z" fill="#edf1f5"/>
  <path d="M-2,-175 C-3,-192 -1,-210 0,-222 C1,-210 3,-192 2,-175 Z" fill="rgba(150,180,210,0.36)"/>
</g>

<!-- TULIP T5 — CRIMSON RED -->
<g filter="url(#fTulip)" transform="translate(468,772)">
  <path d="M0,0 C-1,-44 1,-91 0,-142" stroke="#386828" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M0,-74 C-24,-61 -42,-41 -35,-17 C-27,-32 -12,-54 0,-74 Z" fill="#4a8038"/>
  <path d="M0,-56 C24,-43 42,-23 35,1 C27,-14 12,-37 0,-56 Z" fill="#528840"/>
  <path d="M-11,-142 C-7,-152 0,-157 0,-157 C0,-157 7,-152 11,-142 C5,-147 -5,-147 -11,-142 Z" fill="#386828"/>
  <path d="M-5,-142 C-11,-134 -13,-125 0,-123 C13,-125 11,-134 5,-142 Z" fill="#4a8038"/>
  <path d="M-3,-148 C-17,-151 -28,-165 -25,-182 C-21,-198 -11,-208 -3,-211
           C-12,-204 -15,-191 -13,-178 C-11,-165 -6,-151 -3,-148 Z" fill="#8a1010" transform="rotate(-17,-3,-148)"/>
  <path d="M3,-148 C17,-151 28,-165 25,-182 C21,-198 11,-208 3,-211
           C12,-204 15,-191 13,-178 C11,-165 6,-151 3,-148 Z" fill="#8a1010" transform="rotate(17,3,-148)"/>
  <path d="M-1,-148 C-15,-150 -26,-164 -23,-181 C-19,-197 -9,-207 -1,-211
           C-10,-204 -13,-191 -11,-178 C-9,-164 -4,-150 -1,-148 Z" fill="#a81818" transform="rotate(-8,-1,-148)"/>
  <path d="M1,-148 C15,-150 26,-164 23,-181 C19,-197 9,-207 1,-211
           C10,-204 13,-191 11,-178 C9,-164 4,-150 1,-148 Z" fill="#a81818" transform="rotate(8,1,-148)"/>
  <path d="M0,-148 C-13,-146 -21,-160 -18,-178 C-15,-195 -4,-207 0,-211
           C4,-207 15,-195 18,-178 C21,-160 13,-146 0,-148 Z" fill="#c82020"/>
  <path d="M-2,-163 C-3,-179 -1,-196 0,-209 C1,-196 3,-179 2,-163 Z" fill="rgba(255,110,90,0.38)"/>
</g>

<!-- TULIP T6 — DEEP PINK right -->
<g filter="url(#fTulip)" transform="translate(686,772)">
  <path d="M0,0 C2,-42 -1,-87 0,-136" stroke="#386828" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M0,-70 C-22,-58 -39,-39 -32,-16 C-24,-30 -11,-52 0,-70 Z" fill="#4a8038"/>
  <path d="M0,-53 C22,-41 39,-22 32,2 C24,-12 11,-35 0,-53 Z" fill="#528840"/>
  <path d="M-11,-136 C-6,-146 0,-151 0,-151 C0,-151 6,-146 11,-136 C5,-141 -5,-141 -11,-136 Z" fill="#386828"/>
  <path d="M-5,-136 C-11,-128 -13,-119 0,-117 C13,-119 11,-128 5,-136 Z" fill="#4a8038"/>
  <path d="M-3,-142 C-16,-145 -27,-159 -23,-176 C-20,-192 -9,-201 -3,-205
           C-12,-198 -15,-185 -13,-173 C-11,-160 -6,-145 -3,-142 Z" fill="#920a40" transform="rotate(-17,-3,-142)"/>
  <path d="M3,-142 C16,-145 27,-159 23,-176 C20,-192 9,-201 3,-205
           C12,-198 15,-185 13,-173 C11,-160 6,-145 3,-142 Z" fill="#920a40" transform="rotate(17,3,-142)"/>
  <path d="M-1,-142 C-15,-144 -25,-158 -22,-175 C-19,-191 -8,-201 -1,-205
           C-10,-198 -13,-185 -11,-172 C-9,-159 -4,-145 -1,-142 Z" fill="#b81858" transform="rotate(-8,-1,-142)"/>
  <path d="M1,-142 C15,-144 25,-158 22,-175 C19,-191 8,-201 1,-205
           C10,-198 13,-185 11,-172 C9,-159 4,-145 1,-142 Z" fill="#b81858" transform="rotate(8,1,-142)"/>
  <path d="M0,-142 C-13,-140 -21,-154 -18,-172 C-15,-189 -4,-201 0,-205
           C4,-201 15,-189 18,-172 C21,-154 13,-140 0,-142 Z" fill="#d42070"/>
  <path d="M-2,-157 C-3,-173 -1,-190 0,-203 C1,-190 3,-173 2,-157 Z" fill="rgba(255,150,190,0.40)"/>
</g>

<!-- Small background tulips -->
<g opacity="0.58" transform="translate(312,778)">
  <path d="M0,0 C0,-36 0,-74 0,-116" stroke="#386828" stroke-width="3.5" fill="none"/>
  <path d="M0,-116 C-12,-118 -19,-130 -17,-145 C-14,-160 -5,-168 0,-172 C5,-168 14,-160 17,-145 C19,-130 12,-118 0,-116 Z" fill="#3e0a12"/>
  <path d="M-8,-116 C-5,-124 5,-124 8,-116 C4,-120 -4,-120 -8,-116 Z" fill="#386828"/>
</g>
<g opacity="0.55" transform="translate(748,776)">
  <path d="M0,0 C1,-34 -1,-70 0,-110" stroke="#386828" stroke-width="3.5" fill="none"/>
  <path d="M0,-110 C-11,-112 -18,-123 -16,-137 C-13,-151 -4,-160 0,-163 C4,-160 13,-151 16,-137 C18,-123 11,-112 0,-110 Z" fill="#c82868"/>
  <path d="M-7,-110 C-4,-118 4,-118 7,-110 C3,-114 -3,-114 -7,-110 Z" fill="#386828"/>
</g>
<g opacity="0.52" transform="translate(790,780)">
  <path d="M0,0 C-1,-32 1,-66 0,-104" stroke="#386828" stroke-width="3.5" fill="none"/>
  <path d="M0,-104 C-10,-106 -17,-117 -15,-130 C-12,-143 -4,-152 0,-155 C4,-152 12,-143 15,-130 C17,-117 10,-106 0,-104 Z" fill="#e8ecf0"/>
  <path d="M-7,-104 C-4,-112 4,-112 7,-104 C3,-108 -3,-108 -7,-104 Z" fill="#386828"/>
</g>

<!-- ══════════════════════════════════════════════════════════
     TWO EAGLES IN LOVE — upper left sky, large, beautiful,
     flying TOGETHER side by side toward each other,
     heads turned inward.
     These are CARTOON-ILLUSTRATED bald eagles with:
     - Clear white head
     - Yellow beak (hooked)
     - Dark brown/black body + wings
     - White tail fan
     - Separated primary feathers at wingtips
     - One banking left, one banking right, nearly touching
     Positioned at top-left so login box (top-right) doesn't cover them
══════════════════════════════════════════════════════════ -->

<!--
  EAGLE DESIGN:
  I'll draw each eagle as a clear silhouette-style illustration:
  1. Full wingspan ~160px
  2. Body as a tapered oval
  3. Wings as two arching shapes with notched primary feathers
  4. Distinct white head-blob on correct side
  5. Yellow beak hook
  6. White fan tail on opposite end
  7. Each eagle faces the other — romantic pose, close together
-->



<!-- TREE OF LIFE — centre-right, behind content, majestic -->
<g transform="translate(890,562)" opacity="0.82">
  <path d="M0,0 C-3,-22 -4,-52 -3,-84 C-2,-118 -1,-148 0,-172" stroke="#3a2810" stroke-width="14" stroke-linecap="round" fill="none"/>
  <path d="M0,-68 C-18,-78 -40,-82 -58,-76" stroke="#3a2810" stroke-width="8" stroke-linecap="round" fill="none"/>
  <path d="M0,-68 C18,-78 40,-82 58,-76" stroke="#3a2810" stroke-width="8" stroke-linecap="round" fill="none"/>
  <path d="M0,-108 C-22,-120 -50,-124 -70,-118" stroke="#3a2810" stroke-width="6" stroke-linecap="round" fill="none"/>
  <path d="M0,-108 C22,-120 50,-124 70,-118" stroke="#3a2810" stroke-width="6" stroke-linecap="round" fill="none"/>
  <path d="M0,-148 C-16,-160 -36,-163 -50,-158" stroke="#3a2810" stroke-width="4.5" stroke-linecap="round" fill="none"/>
  <path d="M0,-148 C16,-160 36,-163 50,-158" stroke="#3a2810" stroke-width="4.5" stroke-linecap="round" fill="none"/>
  <path d="M-58,-76 C-70,-88 -78,-104 -80,-118" stroke="#4a3418" stroke-width="4" stroke-linecap="round" fill="none"/>
  <path d="M58,-76  C70,-88  78,-104  80,-118" stroke="#4a3418" stroke-width="4" stroke-linecap="round" fill="none"/>
  <path d="M-70,-118 C-82,-132 -90,-148 -88,-162" stroke="#4a3418" stroke-width="3.5" stroke-linecap="round" fill="none"/>
  <path d="M70,-118  C82,-132  90,-148  88,-162" stroke="#4a3418" stroke-width="3.5" stroke-linecap="round" fill="none"/>
  <ellipse cx="-78" cy="-122" rx="28" ry="20" fill="#2e6a30" opacity="0.90" transform="rotate(-18,-78,-122)"/>
  <ellipse cx="-62" cy="-82"  rx="24" ry="17" fill="#3a7838" opacity="0.86" transform="rotate(12,-62,-82)"/>
  <ellipse cx="78"  cy="-122" rx="28" ry="20" fill="#2e6a30" opacity="0.90" transform="rotate(18,78,-122)"/>
  <ellipse cx="62"  cy="-82"  rx="24" ry="17" fill="#3a7838" opacity="0.86" transform="rotate(-12,62,-82)"/>
  <ellipse cx="-86" cy="-166" rx="26" ry="18" fill="#286228" opacity="0.88" transform="rotate(-22,-86,-166)"/>
  <ellipse cx="86"  cy="-166" rx="26" ry="18" fill="#286228" opacity="0.88" transform="rotate(22,86,-166)"/>
  <ellipse cx="-50" cy="-162" rx="22" ry="16" fill="#347030" opacity="0.84" transform="rotate(-10,-50,-162)"/>
  <ellipse cx="50"  cy="-162" rx="22" ry="16" fill="#347030" opacity="0.84" transform="rotate(10,50,-162)"/>
  <ellipse cx="0"   cy="-198" rx="38" ry="28" fill="#347030" opacity="0.92"/>
  <ellipse cx="-28" cy="-188" rx="30" ry="22" fill="#286228" opacity="0.88" transform="rotate(-12,-28,-188)"/>
  <ellipse cx="28"  cy="-188" rx="30" ry="22" fill="#286228" opacity="0.88" transform="rotate(12,28,-188)"/>
  <ellipse cx="0"   cy="-218" rx="24" ry="17" fill="#3e8038" opacity="0.86"/>
  <ellipse cx="-78" cy="-126" rx="14" ry="9" fill="#5aaa50" opacity="0.35" transform="rotate(-18,-78,-126)"/>
  <ellipse cx="78"  cy="-126" rx="14" ry="9" fill="#5aaa50" opacity="0.35" transform="rotate(18,78,-126)"/>
  <ellipse cx="0"   cy="-200" rx="18" ry="12" fill="#5aaa50" opacity="0.40"/>
  <circle cx="-80" cy="-120" r="7"  fill="#c82030" opacity="0.90"/>
  <circle cx="-80" cy="-120" r="4.5" fill="#f04858" opacity="0.95"/>
  <circle cx="80"  cy="-120" r="7"  fill="#c82030" opacity="0.90"/>
  <circle cx="80"  cy="-120" r="4.5" fill="#f04858" opacity="0.95"/>
  <circle cx="0"   cy="-222" r="8"  fill="#c82030" opacity="0.92"/>
  <circle cx="0"   cy="-222" r="5"  fill="#f04858" opacity="0.96"/>
  <circle cx="-52" cy="-160" r="6"  fill="#e8b820" opacity="0.88"/>
  <circle cx="52"  cy="-160" r="6"  fill="#e8b820" opacity="0.88"/>
  <circle cx="-88" cy="-164" r="5.5" fill="#d02468" opacity="0.84"/>
  <circle cx="88"  cy="-164" r="5.5" fill="#d02468" opacity="0.84"/>
  <circle cx="-64" cy="-80"  r="5.5" fill="#edf1f5" opacity="0.88"/>
  <circle cx="64"  cy="-80"  r="5.5" fill="#edf1f5" opacity="0.88"/>
</g>

<!-- FLOCK OF BIRDS — 14 birds at varying heights across dawn sky -->
<g fill="none" stroke="#2a1c0e" stroke-linecap="round">
  <g stroke-width="2.6"><path d="M295,115 C304,107 314,105 319,112 C324,105 334,107 343,115"/><ellipse cx="319" cy="117" rx="4" ry="3" fill="#2a1c0e" stroke="none"/></g>
  <g stroke-width="2.2"><path d="M340,103 C348,96 357,94 361,100 C365,94 374,96 382,103"/><ellipse cx="361" cy="105" rx="3.5" ry="2.6" fill="#2a1c0e" stroke="none"/></g>
  <g stroke-width="2.0"><path d="M268,97  C276,90 284,88 288,94 C292,88 300,90 308,97"/><ellipse cx="288" cy="99" rx="3" ry="2.2" fill="#2a1c0e" stroke="none"/></g>
  <g stroke-width="2.3"><path d="M388,122 C396,114 405,112 409,118 C413,112 422,114 430,122"/><ellipse cx="409" cy="124" rx="3.5" ry="2.6" fill="#2a1c0e" stroke="none"/></g>
  <g stroke-width="1.7"><path d="M440,90  C447,84 454,83 457,88 C460,83 467,84 474,90"/><ellipse cx="457" cy="92" rx="2.5" ry="1.9" fill="#2a1c0e" stroke="none"/></g>
  <g stroke-width="1.5"><path d="M480,80  C486,75 492,74 495,79 C498,74 504,75 510,80"/><ellipse cx="495" cy="82" rx="2.2" ry="1.6" fill="#2a1c0e" stroke="none"/></g>
  <g stroke-width="2.1" transform="rotate(-10,370,136)"><path d="M363,136 C371,129 380,127 384,133 C388,127 397,129 405,136"/><ellipse cx="384" cy="137" rx="3.2" ry="2.4" fill="#2a1c0e" stroke="none"/></g>
  <g stroke-width="1.9"><path d="M540,104 C547,98 554,96 557,101 C560,96 567,98 574,104"/><ellipse cx="557" cy="106" rx="2.8" ry="2.1" fill="#2a1c0e" stroke="none"/></g>
  <g stroke-width="1.4"><path d="M570,88  C576,83 582,82 585,87 C588,82 594,83 600,88"/><ellipse cx="585" cy="90" rx="2.0" ry="1.5" fill="#2a1c0e" stroke="none"/></g>
  <g stroke-width="1.9"><path d="M228,152 C235,145 243,144 246,149 C249,144 257,145 264,152"/><ellipse cx="246" cy="153" rx="2.8" ry="2.0" fill="#2a1c0e" stroke="none"/></g>
  <g stroke-width="2.0"><path d="M408,116 C415,109 423,108 426,113 C429,108 437,109 444,116"/><ellipse cx="426" cy="118" rx="3.0" ry="2.2" fill="#2a1c0e" stroke="none"/></g>
  <g stroke-width="1.8"><path d="M422,110 C428,104 435,103 438,108 C441,103 448,104 454,110"/><ellipse cx="438" cy="112" rx="2.6" ry="1.9" fill="#2a1c0e" stroke="none"/></g>
  <g stroke-width="1.3" opacity="0.55"><path d="M618,95  C623,91 628,90 631,94 C634,90 639,91 644,95"/></g>
  <g stroke-width="1.1" opacity="0.35"><path d="M1088,68 C1093,64 1098,63 1101,67 C1104,63 1109,64 1114,68"/></g>
</g>

<!-- LADYBUG — faithful to login page, same position/scale -->
<!-- LADYBUG — sitting on the ground next to the tulips -->
<g transform="translate(340,772) scale(1.7)">
  <!-- Shadow -->
  <ellipse cx="0" cy="12" rx="16" ry="4" fill="rgba(0,0,0,0.18)"/>
  <!-- Body — bright red rounded shell -->
  <ellipse cx="0" cy="0" rx="14" ry="12" fill="#d42010"/>
  <!-- Shell highlight -->
  <ellipse cx="-4" cy="-5" rx="6" ry="4" fill="rgba(255,120,100,0.45)"/>
  <!-- Center divide line -->
  <line x1="0" y1="-12" x2="0" y2="12" stroke="#1a0800" stroke-width="1.5"/>
  <!-- Black dots — left side -->
  <circle cx="-5" cy="-4" r="2.8" fill="#1a0800"/>
  <circle cx="-6" cy="3"  r="2.2" fill="#1a0800"/>
  <circle cx="-4" cy="9"  r="1.8" fill="#1a0800"/>
  <!-- Black dots — right side -->
  <circle cx="5"  cy="-4" r="2.8" fill="#1a0800"/>
  <circle cx="6"  cy="3"  r="2.2" fill="#1a0800"/>
  <circle cx="4"  cy="9"  r="1.8" fill="#1a0800"/>
  <!-- Head — black rounded -->
  <ellipse cx="0" cy="-13" rx="7" ry="6" fill="#1a0800"/>
  <!-- Eye whites -->
  <circle cx="-3.5" cy="-14" r="2.2" fill="white"/>
  <circle cx="3.5"  cy="-14" r="2.2" fill="white"/>
  <!-- Pupils -->
  <circle cx="-3"   cy="-14" r="1.2" fill="#1a0800"/>
  <circle cx="3.5"  cy="-14" r="1.2" fill="#1a0800"/>
  <!-- Eye shine -->
  <circle cx="-2.5" cy="-14.8" r="0.5" fill="white"/>
  <circle cx="4"    cy="-14.8" r="0.5" fill="white"/>
  <!-- Antennae -->
  <path d="M-3,-18 C-5,-24 -8,-28 -10,-30" fill="none" stroke="#1a0800" stroke-width="1.2" stroke-linecap="round"/>
  <circle cx="-10" cy="-30" r="1.5" fill="#1a0800"/>
  <path d="M3,-18 C5,-24 8,-28 10,-30" fill="none" stroke="#1a0800" stroke-width="1.2" stroke-linecap="round"/>
  <circle cx="10" cy="-30" r="1.5" fill="#1a0800"/>
  <!-- Tiny legs -->
  <path d="M-12,-2 C-18,-4 -20,-2 -18,0"   fill="none" stroke="#1a0800" stroke-width="1.1" stroke-linecap="round"/>
  <path d="M-12,4  C-18,4  -20,6  -18,8"   fill="none" stroke="#1a0800" stroke-width="1.1" stroke-linecap="round"/>
  <path d="M12,-2  C18,-4  20,-2  18,0"    fill="none" stroke="#1a0800" stroke-width="1.1" stroke-linecap="round"/>
  <path d="M12,4   C18,4   20,6   18,8"    fill="none" stroke="#1a0800" stroke-width="1.1" stroke-linecap="round"/>
</g>



<!-- Vignette -->
<radialGradient id="gVig" cx="50%" cy="30%" r="70%">
  <stop offset="50%" stop-color="transparent"/>
  <stop offset="100%" stop-color="rgba(0,8,24,0.38)"/>
</radialGradient>
<rect width="1440" height="580" fill="url(#gVig)"/>
</svg></div>
  <div class="hero-veil"></div>
  <div class="hero-content">
    <div class="hero-left">
      <div class="hero-kicker"><div class="kicker-dot"></div>Nephrology Intelligence Platform</div>
      <h1>Where every<br>kidney care setting<br>speaks <em>one language</em></h1>
      <p class="hero-sub">DiagnoVera connects <strong>hospitals, nursing homes, dialysis centers, IPAs, and payers</strong> with AI diagnosis, automated documentation, nephrology billing, and telehealth — all in one verified platform.</p>
      <div class="hero-ctas">
        <a class="btn-enter" href="https://diagnovera-924070815611.us-west1.run.app/login">Enter Platform &#8594;</a>
        <a class="btn-ghost" href="#contact">Request a Demo</a>
      </div>
    </div>
    <div class="hero-trust">
      <div class="trust-badge"><span style="background:#4fc3f7"></span>Epic FHIR &middot; Manifest MedEx HIE</div>
      <div class="trust-badge"><span style="background:#d42010"></span>&#923; Lambda Calculus Verified</div>
      <div class="trust-badge"><span style="background:#34d399"></span>HIPAA Compliant &middot; BAA Signed</div>
      <div class="trust-badge"><span style="background:#e8b820"></span>KDIGO 2024 Aligned</div>
    </div>
  </div>
</section>

<!-- STAT STRIP -->
<div class="stat-strip">
  <div class="stat-box">
    <div class="st-num">54+</div>
    <div class="st-lbl">Nephrology Modules</div>
  </div>
  <div class="stat-box">
    <div class="st-num">&#923;</div>
    <div class="st-lbl">Lambda Verified Dx</div>
  </div>
  <div class="stat-box">
    <div class="st-num">8</div>
    <div class="st-lbl">Facility Types Connected</div>
  </div>
  <div class="stat-box">
    <div class="st-num" style="font-size:22px;letter-spacing:0;color:#2e7d32">HIPAA</div>
    <div class="st-lbl">Compliant &amp; BAA-signed</div>
  </div>
</div>

<!-- SIX VALUE PROP CARDS -->
<section class="section" id="platform">
  <div class="si">
    <div class="sh">
      <div class="eyebrow">What DiagnoVera Does</div>
      <div class="h2">An AI-Powered EMR<br><em>Built to Think.</em></div>
      <p class="section-lead">DiagnoVera is more than a traditional EMR &mdash; it is an AI-powered clinical intelligence platform that doesn&rsquo;t just store information, it understands it. By processing clinical data through advanced diagnostic algorithms, DiagnoVera provides meaningful analysis that empowers physicians to deliver better care. It integrates seamlessly with existing EHR systems like Epic and Cerner, reaching into hospitals, clinics, nursing homes, long-term care facilities, and beyond.</p>
    </div>
    <div class="card-grid">

      <!-- 1. CONNECTIVITY -->
      <div class="fcard fc-blue">
        <div class="fcard-top">
          <div class="fcard-icon" style="background:#e6f4ff;font-size:24px">&#128279;</div>

        </div>
        <h3>Universal EHR Connectivity</h3>
        <p>DiagnoVera integrates directly with Epic, Cerner, PointClickCare, MatrixCare, and any HL7 FHIR R4 system &mdash; bringing subspecialty-grade AI into every care setting. From a 500-bed ICU to a rural nursing home, one connection enables full bidirectional data exchange: DiagnoVera reads the patient record, performs AI-driven clinical analysis, and writes completed documentation back into the EHR. No fax machines. No manual data entry. No workflow disruption.</p>
        <div class="fcard-tags">
          <span class="ftag" style="background:#e6f4ff;color:#0a4a82;border-color:#b8d8f0">Epic FHIR</span>
          <span class="ftag" style="background:#e6f4ff;color:#0a4a82;border-color:#b8d8f0">Manifest MedEx</span>
          <span class="ftag" style="background:#e6f4ff;color:#0a4a82;border-color:#b8d8f0">HL7 R4</span>
          <span class="ftag" style="background:#e6f4ff;color:#0a4a82;border-color:#b8d8f0">Bidirectional</span>
        </div>
      </div>

      <!-- 2. LAMBDA DIAGNOSIS -->
      <div class="fcard fc-blue" id="lambda-dx">
        <div class="fcard-top">
          <div class="fcard-icon" style="background:#e6f4ff;font-family:'Playfair Display',serif;font-size:26px;font-weight:900;color:#0288d1">&#923;</div>
        </div>
        <h3>AI-Verified Diagnosis</h3>
        <p>The &#923; Lambda Diagnostic Engine processes over 165 clinical variables &mdash; labs, vitals, medications, imaging, pathology, flowsheet data, and temporal trends &mdash; through Bayesian-Markov analysis and formal mathematical functions. The result is not a suggestion; it is a verified diagnosis with a complete audit trail: ICD-10 codes, confidence scores, supporting evidence chains, and KDIGO-aligned staging. Every diagnostic conclusion can be traced back to its clinical inputs. No black box. No hallucination.</p>
        <div class="fcard-tags">
          <span class="ftag" style="background:#e6f4ff;color:#0a4a82;border-color:#b8d8f0">Lambda Calculus</span>
          <span class="ftag" style="background:#e6f4ff;color:#0a4a82;border-color:#b8d8f0">Bayesian Priors</span>
          <span class="ftag" style="background:#e6f4ff;color:#0a4a82;border-color:#b8d8f0">KDIGO Aligned</span>
          <span class="ftag" style="background:#e6f4ff;color:#0a4a82;border-color:#b8d8f0">Audit Trail</span>
        </div>
      </div>

      <!-- 3. DOCUMENTATION -->
      <div class="fcard fc-red">
        <div class="fcard-top">
          <div class="fcard-icon" style="background:#fff0ee;font-size:24px">&#128196;</div>
        </div>
        <h3>Intelligent Documentation</h3>
        <p>DiagnoVera generates complete, subspecialty-grade clinical documentation &mdash; History &amp; Physical, consultation notes, SOAP notes, and discharge summaries &mdash; in under 60 seconds. Each note is synthesized directly from the patient&rsquo;s clinical data, not from templates or dictation. The AI structures the narrative around the verified diagnosis, ensuring that every assessment finding and treatment recommendation is evidence-linked. Epic-compatible, ready to review and sign. The physician retains full editorial control; DiagnoVera eliminates the documentation burden.</p>
        <div class="fcard-tags">
          <span class="ftag" style="background:#fff0ee;color:#8b1a10;border-color:#f4c4be">SOAP Format</span>
          <span class="ftag" style="background:#fff0ee;color:#8b1a10;border-color:#f4c4be">Epic-compatible</span>
          <span class="ftag" style="background:#fff0ee;color:#8b1a10;border-color:#f4c4be">PHI On-premise</span>
        </div>
      </div>

      <!-- 4. BILLING / RCM -->
      <div class="fcard fc-gold">
        <div class="fcard-top">
          <div class="fcard-icon" style="background:#fdf6e0;font-size:24px">&#128200;</div>
        </div>
        <h3>Automated Billing &amp; Revenue Optimization</h3>
        <p>Every clinical note DiagnoVera generates carries embedded billing intelligence: ICD-10 codes derived directly from the verified diagnosis, CPT mapping calibrated to nephrology-specific E&amp;M complexity, HCC risk adjustment capture, and value-based care metric documentation. Undercoding &mdash; the silent revenue drain in subspecialty medicine &mdash; is eliminated because the billing output mirrors the clinical complexity that was actually documented and verified. For payers and IPAs, Lambda-verified outputs support prior authorization on first pass.</p>
        <div class="fcard-tags">
          <span class="ftag" style="background:#fdf6e0;color:#7a5600;border-color:#e8d080">ICD-10 Auto-code</span>
          <span class="ftag" style="background:#fdf6e0;color:#7a5600;border-color:#e8d080">HCC Capture</span>
          <span class="ftag" style="background:#fdf6e0;color:#7a5600;border-color:#e8d080">CPT Mapping</span>
          <span class="ftag" style="background:#fdf6e0;color:#7a5600;border-color:#e8d080">Prior Auth Support</span>
        </div>
      </div>

      <!-- 5. TELEHEALTH -->
      <div class="fcard fc-green">
        <div class="fcard-top">
          <div class="fcard-icon" style="background:#e8f5e9;font-size:24px">&#128241;</div>
        </div>
        <h3>Telehealth &mdash; Subspecialty Care Without Boundaries</h3>
        <p>Telehealth is not an add-on &mdash; it is a core capability that allows DiagnoVera to extend subspecialty nephrology into any healthcare setting: nursing homes, skilled nursing facilities, rural hospitals, home health, and outpatient clinics. During a live telehealth encounter, DiagnoVera pulls the complete FHIR record and runs its diagnostic engine in real time. The nephrologist sees the verified differential, confidence scores, and management plan before the patient finishes their history. When the encounter ends, the consult note is generated automatically and pushed back to the EHR.</p>
        <div class="fcard-tags">
          <span class="ftag" style="background:#e8f5e9;color:#1b5e20;border-color:#a8d8a8">Real-time FHIR Pull</span>
          <span class="ftag" style="background:#e8f5e9;color:#1b5e20;border-color:#a8d8a8">Auto Visit Note</span>
          <span class="ftag" style="background:#e8f5e9;color:#1b5e20;border-color:#a8d8a8">Async Consults</span>
        </div>
      </div>

      <!-- 6. SCALE / MULTI-SETTING -->
      <div class="fcard fc-blue">
        <div class="fcard-top">
          <div class="fcard-icon" style="background:#e6f4ff;font-size:24px">&#127758;</div>
        </div>
        <h3>One Intelligence Layer &mdash; Every Healthcare Setting</h3>
        <p>DiagnoVera adapts its intelligence to each care environment. Hospitals receive ICU-grade CRRT decision support and AKI rapid response. Nursing homes and long-term care facilities gain CKD surveillance, medication safety alerts, and specialist access via telehealth. Dialysis centers receive ESRD management and adequacy tracking. Outpatient clinics get CKD progression monitoring and preventive automation. IPAs and payers receive population risk stratification and Lambda-verified prior authorization documentation. One platform. Same AI. Tailored to every stakeholder.</p>
        <div class="fcard-tags">
          <span class="ftag" style="background:#e6f4ff;color:#0a4a82;border-color:#b8d8f0">IPA Risk Stratification</span>
          <span class="ftag" style="background:#e6f4ff;color:#0a4a82;border-color:#b8d8f0">CRRT Support</span>
          <span class="ftag" style="background:#e6f4ff;color:#0a4a82;border-color:#b8d8f0">Payer Audit-ready</span>
        </div>
      </div>

    </div><!-- end card-grid -->

    <!-- Founder quote with ladybug accent -->
    <div class="quote-panel">
      <p class="qt">At the heart of every diagnostic algorithm is a patient who deserves our best. I built DiagnoVera because I believe technology should amplify the physician&rsquo;s ability to care &mdash; not replace it. When a nephrologist can see 165 clinical variables analyzed in seconds, with a verified diagnosis and a complete note ready to sign, they gain something precious: time to listen, time to explain, time to be present with their patient. That is what better care looks like.</p>
      <div class="qa">Dr. Mehrdad Ghahremani-Ghajar, DO &mdash; Nephrologist &middot; Founder &amp; CMO, DiagnoVera</div>
      <div class="quote-lb">
        <svg width="52" height="52" viewBox="-20 -26 40 44" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="0" cy="14" rx="16" ry="4.5" fill="rgba(0,0,0,0.14)"/>
          <ellipse cx="0" cy="0" rx="14" ry="12" fill="#d42010"/>
          <ellipse cx="-4" cy="-5" rx="6" ry="4" fill="rgba(255,120,100,0.44)"/>
          <line x1="0" y1="-12" x2="0" y2="12" stroke="#1a0800" stroke-width="1.5"/>
          <circle cx="-5" cy="-4" r="2.8" fill="#1a0800"/>
          <circle cx="-6" cy="3"  r="2.2" fill="#1a0800"/>
          <circle cx="-4" cy="9"  r="1.8" fill="#1a0800"/>
          <circle cx="5"  cy="-4" r="2.8" fill="#1a0800"/>
          <circle cx="6"  cy="3"  r="2.2" fill="#1a0800"/>
          <circle cx="4"  cy="9"  r="1.8" fill="#1a0800"/>
          <ellipse cx="0" cy="-13" rx="7" ry="6" fill="#1a0800"/>
          <circle cx="-3.5" cy="-14" r="2.2" fill="white"/>
          <circle cx="3.5"  cy="-14" r="2.2" fill="white"/>
          <circle cx="-3"   cy="-14" r="1.2" fill="#1a0800"/>
          <circle cx="3.5"  cy="-14" r="1.2" fill="#1a0800"/>
          <circle cx="-2.5" cy="-14.8" r="0.5" fill="white"/>
          <circle cx="4"    cy="-14.8" r="0.5" fill="white"/>
          <path d="M-3,-18 C-5,-24 -8,-28 -10,-30" fill="none" stroke="#1a0800" stroke-width="1.2" stroke-linecap="round"/>
          <circle cx="-10" cy="-30" r="1.5" fill="#1a0800"/>
          <path d="M3,-18 C5,-24 8,-28 10,-30" fill="none" stroke="#1a0800" stroke-width="1.2" stroke-linecap="round"/>
          <circle cx="10" cy="-30" r="1.5" fill="#1a0800"/>
          <path d="M-12,-2 C-18,-4 -20,-2 -18,0" fill="none" stroke="#1a0800" stroke-width="1.1" stroke-linecap="round"/>
          <path d="M-12,4  C-18,4  -20,6  -18,8" fill="none" stroke="#1a0800" stroke-width="1.1" stroke-linecap="round"/>
          <path d="M12,-2  C18,-4  20,-2  18,0"  fill="none" stroke="#1a0800" stroke-width="1.1" stroke-linecap="round"/>
          <path d="M12,4   C18,4   20,6   18,8"  fill="none" stroke="#1a0800" stroke-width="1.1" stroke-linecap="round"/>
        </svg>
      </div>
    </div>
  </div>
</section>

<!-- BILLING + RCM DETAIL SECTION -->
<section class="section alt">
  <div class="split si">
    <div class="split-text">
      <div class="eyebrow" id="billing">Billing &amp; Revenue Cycle</div>
      <div class="h2">Stop leaving<br><em>revenue on the table</em></div>
      <p>Nephrology documentation is complex. Undercoding is silent and pervasive — complex visits documented as simple, diagnoses left uncaptured, HCC codes missed. DiagnoVera closes the gap automatically.</p>
      <p>Every H&amp;P note DiagnoVera generates includes nephrology-specific ICD-10 coding, appropriate E&amp;M complexity leveling, procedure documentation, and HCC risk capture — ready for billing the moment the physician signs.</p>
      <p>For payers and IPAs, Lambda-verified outputs support prior authorization without additional documentation burden. <strong>Lambda proof is the appeal.</strong> The audit trail is already there.</p>
      <div class="pill-row">
        <span class="pill" style="background:#fdf6e0;color:#7a5600;border-color:#e8d080">ICD-10 Auto-coding</span>
        <span class="pill" style="background:#fdf6e0;color:#7a5600;border-color:#e8d080">E&amp;M Complexity</span>
        <span class="pill" style="background:#fdf6e0;color:#7a5600;border-color:#e8d080">HCC Capture</span>
        <span class="pill" style="background:#fdf6e0;color:#7a5600;border-color:#e8d080">Prior Auth Documentation</span>
        <span class="pill" style="background:#fdf6e0;color:#7a5600;border-color:#e8d080">HEDIS &amp; STAR Metrics</span>
        <span class="pill" style="background:#fdf6e0;color:#7a5600;border-color:#e8d080">Dialysis Billing (ESRD)</span>
      </div>
    </div>
    <div class="split-art">
      <!-- Billing illustration panel -->
      <svg viewBox="0 0 460 310" xmlns="http://www.w3.org/2000/svg" style="background:#fdfbf7;display:block">
        <rect width="460" height="310" fill="#fdfbf7"/>
        <!-- Receipt / note illustration -->
        <rect x="60" y="24" width="250" height="230" rx="10" fill="#fff" stroke="#e0d8c8" stroke-width="1.5"/>
        <rect x="60" y="24" width="250" height="38" rx="10" fill="#0288d1"/>
        <rect x="60" y="50" width="250" height="12" fill="#0288d1"/>
        <text x="185" y="47" text-anchor="middle" font-family="sans-serif" font-size="10.5" fill="white" font-weight="700">DiagnoVera — Clinical Note</text>
        <!-- Note lines -->
        <rect x="80"  y="76"  width="60"  height="7" rx="3" fill="#e8eef6"/>
        <text x="80" y="83" font-family="sans-serif" font-size="7.5" fill="#0a4a82" font-weight="700">DIAGNOSIS</text>
        <rect x="80"  y="88"  width="140" height="5" rx="2" fill="#c8d8e8" opacity=".7"/>
        <rect x="80"  y="97"  width="110" height="5" rx="2" fill="#c8d8e8" opacity=".5"/>
        <rect x="80"  y="110" width="55"  height="7" rx="3" fill="#e8eef6"/>
        <text x="80" y="117" font-family="sans-serif" font-size="7.5" fill="#0a4a82" font-weight="700">ICD-10 CODES</text>
        <!-- ICD code chips -->
        <rect x="80"  y="122" width="44" height="13" rx="4" fill="#e6f4ff" stroke="#b8d8f0" stroke-width="1"/>
        <text x="102" y="132" text-anchor="middle" font-family="sans-serif" font-size="8.5" fill="#0a4a82" font-weight="700">N17.9</text>
        <rect x="130" y="122" width="44" height="13" rx="4" fill="#e6f4ff" stroke="#b8d8f0" stroke-width="1"/>
        <text x="152" y="132" text-anchor="middle" font-family="sans-serif" font-size="8.5" fill="#0a4a82" font-weight="700">N18.4</text>
        <rect x="180" y="122" width="44" height="13" rx="4" fill="#e6f4ff" stroke="#b8d8f0" stroke-width="1"/>
        <text x="202" y="132" text-anchor="middle" font-family="sans-serif" font-size="8.5" fill="#0a4a82" font-weight="700">E11.65</text>
        <rect x="80"  y="143" width="55"  height="7" rx="3" fill="#e8eef6"/>
        <text x="80" y="150" font-family="sans-serif" font-size="7.5" fill="#0a4a82" font-weight="700">E&amp;M LEVEL</text>
        <!-- E&M bar -->
        <rect x="80"  y="154" width="180" height="8" rx="4" fill="#e8eef6"/>
        <rect x="80"  y="154" width="144" height="8" rx="4" fill="#0288d1" opacity=".80"/>
        <text x="270" y="162" font-family="sans-serif" font-size="8" fill="#0a4a82">99215</text>
        <!-- HCC section -->
        <rect x="80"  y="171" width="50"  height="7" rx="3" fill="#e8eef6"/>
        <text x="80" y="178" font-family="sans-serif" font-size="7.5" fill="#0a4a82" font-weight="700">HCC RISK</text>
        <rect x="80"  y="182" width="60"  height="13" rx="4" fill="#e8f5e9" stroke="#a8d8a8" stroke-width="1"/>
        <text x="110" y="192" text-anchor="middle" font-family="sans-serif" font-size="8" fill="#1b5e20" font-weight="700">&#10003; Captured</text>
        <!-- Lambda seal -->
        <circle cx="270" cy="200" r="28" fill="#f0f8ff" stroke="#0288d1" stroke-width="1.5"/>
        <text x="270" y="196" text-anchor="middle" font-family="Georgia,serif" font-size="20" font-weight="900" fill="#0288d1">&#923;</text>
        <text x="270" y="210" text-anchor="middle" font-family="sans-serif" font-size="7" fill="#0a4a82" font-weight="700">VERIFIED</text>
        <!-- Signature line -->
        <line x1="80" y1="228" x2="220" y2="228" stroke="#d0c8b8" stroke-width="1"/>
        <text x="80" y="242" font-family="sans-serif" font-size="8" fill="#8a7a68">Physician Signature</text>
        <!-- Ladybug on the note corner -->
        <g transform="translate(295,58) scale(0.95)">
          <ellipse cx="0" cy="10" rx="13" ry="3.5" fill="rgba(0,0,0,0.14)"/>
          <ellipse cx="0" cy="0" rx="12" ry="10.5" fill="#d42010"/>
          <ellipse cx="-3.5" cy="-4" rx="5" ry="3.5" fill="rgba(255,120,100,0.43)"/>
          <line x1="0" y1="-10.5" x2="0" y2="10.5" stroke="#1a0800" stroke-width="1.4"/>
          <circle cx="-4.5" cy="-3.5" r="2.5" fill="#1a0800"/>
          <circle cx="-5" cy="3" r="2" fill="#1a0800"/>
          <circle cx="4.5" cy="-3.5" r="2.5" fill="#1a0800"/>
          <circle cx="5" cy="3" r="2" fill="#1a0800"/>
          <ellipse cx="0" cy="-11.5" rx="6.5" ry="5.5" fill="#1a0800"/>
          <circle cx="-3" cy="-12.5" r="2" fill="white"/>
          <circle cx="3"  cy="-12.5" r="2" fill="white"/>
          <circle cx="-2.5" cy="-12.5" r="1.1" fill="#1a0800"/>
          <circle cx="3"   cy="-12.5" r="1.1" fill="#1a0800"/>
          <path d="M-2.5,-15 C-4,-19 -7,-22 -9,-24" fill="none" stroke="#1a0800" stroke-width="1" stroke-linecap="round"/>
          <circle cx="-9" cy="-24" r="1.3" fill="#1a0800"/>
          <path d="M2.5,-15 C4,-19 7,-22 9,-24" fill="none" stroke="#1a0800" stroke-width="1" stroke-linecap="round"/>
          <circle cx="9" cy="-24" r="1.3" fill="#1a0800"/>
          <path d="M-11,-2 C-16,-4 -18,-1 -16,1" fill="none" stroke="#1a0800" stroke-width="1" stroke-linecap="round"/>
          <path d="M-11,4  C-16,4  -18,6  -16,8" fill="none" stroke="#1a0800" stroke-width="1" stroke-linecap="round"/>
          <path d="M11,-2  C16,-4  18,-1  16,1"  fill="none" stroke="#1a0800" stroke-width="1" stroke-linecap="round"/>
          <path d="M11,4   C16,4   18,6   16,8"  fill="none" stroke="#1a0800" stroke-width="1" stroke-linecap="round"/>
        </g>
        <!-- Floating chips right side -->
        <rect x="340" y="70" width="94" height="28" rx="8" fill="#fff" stroke="#e0d8c8" stroke-width="1.5"/>
        <text x="387" y="80" text-anchor="middle" font-family="sans-serif" font-size="7" fill="#5a7088">Time to bill</text>
        <text x="387" y="92" text-anchor="middle" font-family="'Playfair Display',serif" font-size="16" fill="#0288d1" font-weight="900">-68%</text>
        <rect x="340" y="108" width="94" height="28" rx="8" fill="#fff" stroke="#e0d8c8" stroke-width="1.5"/>
        <text x="387" y="118" text-anchor="middle" font-family="sans-serif" font-size="7" fill="#5a7088">HCC capture rate</text>
        <text x="387" y="130" text-anchor="middle" font-family="'Playfair Display',serif" font-size="16" fill="#2e7d32" font-weight="900">+34%</text>
        <rect x="340" y="146" width="94" height="28" rx="8" fill="#fff" stroke="#e0d8c8" stroke-width="1.5"/>
        <text x="387" y="156" text-anchor="middle" font-family="sans-serif" font-size="7" fill="#5a7088">Prior auth approval</text>
        <text x="387" y="168" text-anchor="middle" font-family="'Playfair Display',serif" font-size="16" fill="#0288d1" font-weight="900">1st pass</text>
      </svg>
      <div class="art-cap">
        <div class="art-cap-dot" style="background:#c89820"></div>
        <span class="art-cap-label">Revenue Cycle</span>
        <span class="art-cap-val">Auto-coded &middot; Lambda-verified &middot; Signed-ready</span>
      </div>
    </div>
  </div>
</section>

<!-- TELEHEALTH SECTION -->
<section class="section">
  <div class="split rev si">
    <div class="split-text">
      <div class="eyebrow" id="telehealth">Telehealth Consultations</div>
      <div class="h2">The nephrologist<br>is always <em>in the room</em></div>
      <p>There are approximately 9,000 practicing nephrologists serving over 40 million patients with kidney disease in the United States. The ratio is unsustainable. DiagnoVera transforms one subspecialist into a virtual nephrology presence across multiple facilities &mdash; nursing homes, SNFs, rural hospitals, and clinics &mdash; with full AI diagnostic co-pilot support during every encounter.</p>
      <p>The moment a telehealth session begins, DiagnoVera pulls the complete FHIR record and runs its diagnostic engine in parallel. The nephrologist sees the ranked differential diagnosis, Lambda verification confidence, and evidence-based management plan <strong>before the patient finishes their history.</strong> Clinical decision support happens in real time, not after the fact.</p>
      <div class="pill-row">
        <span class="pill" style="background:#e8f5e9;color:#1b5e20;border-color:#a8d8a8">Live FHIR Data Pull</span>
        <span class="pill" style="background:#e8f5e9;color:#1b5e20;border-color:#a8d8a8">AI Diagnostic Co-pilot</span>
        <span class="pill" style="background:#e8f5e9;color:#1b5e20;border-color:#a8d8a8">Auto Consult Note</span>
        <span class="pill" style="background:#e8f5e9;color:#1b5e20;border-color:#a8d8a8">Async Consultations</span>
        <span class="pill" style="background:#e8f5e9;color:#1b5e20;border-color:#a8d8a8">SNF &amp; Rural Access</span>
      </div>
    </div>
    <div class="split-art">
      <svg viewBox="0 0 460 310" xmlns="http://www.w3.org/2000/svg" style="background:#f0f8ff;display:block">
        <rect width="460" height="310" fill="#f0f8ff"/>
        <!-- Screen -->
        <rect x="40" y="24" width="380" height="218" rx="12" fill="#fff" stroke="#cce4f6" stroke-width="1.5"/>
        <rect x="40" y="24" width="380" height="34" rx="12" fill="#0a1e30"/>
        <rect x="40" y="46" width="380" height="12" fill="#0a1e30"/>
        <!-- Traffic lights -->
        <circle cx="58" cy="41" r="4.5" fill="#ef5350"/>
        <circle cx="72" cy="41" r="4.5" fill="#f59e0b"/>
        <circle cx="86" cy="41" r="4.5" fill="#4caf50"/>
        <text x="230" y="44" text-anchor="middle" font-family="sans-serif" font-size="9.5" fill="rgba(255,255,255,0.60)">DiagnoVera Telehealth</text>
        <!-- Patient left video -->
        <rect x="52" y="70" width="172" height="120" rx="7" fill="#132030"/>
        <circle cx="138" cy="106" r="20" fill="#1e3a5c"/>
        <path d="M108,174 Q138,152 168,174" fill="#152840"/>
        <text x="138" y="200" text-anchor="middle" font-family="sans-serif" font-size="8" fill="#6a9ac0">Patient</text>
        <!-- Nephrologist right video -->
        <rect x="236" y="70" width="172" height="120" rx="7" fill="#0a1620"/>
        <circle cx="322" cy="106" r="20" fill="#16304e"/>
        <path d="M292,174 Q322,152 352,174" fill="#0c1c2e"/>
        <text x="322" y="200" text-anchor="middle" font-family="sans-serif" font-size="8" fill="#6a9ac0">Nephrologist</text>
        <!-- AI overlay — diagnosis badge on patient video -->
        <rect x="52" y="196" width="110" height="16" rx="4" fill="rgba(2,136,209,0.88)"/>
        <text x="107" y="207" text-anchor="middle" font-family="sans-serif" font-size="7.5" fill="white" font-weight="700">AKI Stage 2 — 87%</text>
        <rect x="168" y="196" width="56" height="16" rx="4" fill="rgba(46,125,50,0.88)"/>
        <text x="196" y="207" text-anchor="middle" font-family="sans-serif" font-size="7.5" fill="white" font-weight="700">&#923; Verified</text>
        <!-- FHIR live panel on nephrologist video -->
        <rect x="236" y="190" width="172" height="40" rx="5" fill="rgba(10,30,50,0.88)"/>
        <text x="250" y="202" font-family="sans-serif" font-size="7" fill="#4fc3f7" font-weight="700">LIVE FHIR</text>
        <text x="250" y="213" font-family="sans-serif" font-size="7" fill="#88b0c8">Cr: 3.2  eGFR: 18  K: 5.8</text>
        <text x="250" y="223" font-family="sans-serif" font-size="7" fill="#88b0c8">UPCR: 4.2  BNP: 680  pH: 7.28</text>
        <!-- Note progress bar -->
        <rect x="52"  y="242" width="356" height="12" rx="4" fill="#e6f4ff" stroke="#b8d8f0" stroke-width="1"/>
        <rect x="52"  y="242" width="230" height="12" rx="4" fill="#0288d1" opacity=".85"/>
        <text x="318" y="252" font-family="sans-serif" font-size="8" fill="#0a4a82">Generating consult note… 65%</text>
        <!-- Ladybug bottom right -->
        <g transform="translate(418,278) scale(0.88)">
          <ellipse cx="0" cy="10" rx="13" ry="3.5" fill="rgba(0,0,0,0.14)"/>
          <ellipse cx="0" cy="0" rx="12.5" ry="11" fill="#d42010"/>
          <ellipse cx="-3.5" cy="-4.5" rx="5" ry="3.5" fill="rgba(255,120,100,0.43)"/>
          <line x1="0" y1="-11" x2="0" y2="11" stroke="#1a0800" stroke-width="1.4"/>
          <circle cx="-5" cy="-3.5" r="2.5" fill="#1a0800"/>
          <circle cx="-5.5" cy="3" r="2" fill="#1a0800"/>
          <circle cx="5" cy="-3.5" r="2.5" fill="#1a0800"/>
          <circle cx="5.5" cy="3" r="2" fill="#1a0800"/>
          <ellipse cx="0" cy="-12" rx="6.5" ry="5.5" fill="#1a0800"/>
          <circle cx="-3" cy="-13" r="2" fill="white"/>
          <circle cx="3"  cy="-13" r="2" fill="white"/>
          <path d="M-2.5,-15 C-4,-19 -7,-22 -9,-24" fill="none" stroke="#1a0800" stroke-width="1" stroke-linecap="round"/>
          <circle cx="-9" cy="-24" r="1.3" fill="#1a0800"/>
          <path d="M2.5,-15 C4,-19 7,-22 9,-24" fill="none" stroke="#1a0800" stroke-width="1" stroke-linecap="round"/>
          <circle cx="9" cy="-24" r="1.3" fill="#1a0800"/>
        </g>
      </svg>
      <div class="art-cap">
        <div class="art-cap-dot" style="background:#2e7d32"></div>
        <span class="art-cap-label">Telehealth Console</span>
        <span class="art-cap-val">Live AI &middot; FHIR &middot; Auto-note</span>
      </div>
    </div>
  </div>
</section>

<!-- FACILITIES -->
<section class="section alt">
  <div class="si">
    <div class="sh">
      <div class="eyebrow" id="solutions">Where DiagnoVera Works</div>
      <div class="h2">One Platform.<br><em>Every Care Setting.</em></div>
      <p class="section-lead">Kidney disease follows the patient across hospitals, nursing homes, dialysis centers, and living rooms. DiagnoVera follows too &mdash; bringing the same subspecialty intelligence to every setting, every encounter.</p>
    </div>
    <div class="fac-grid">
      <div class="fac"><div class="fac-icon">&#127973;</div><div class="fac-name">Acute Hospitals</div><div class="fac-desc">ICU CRRT, AKI rapid response, inpatient nephrology, Baxter &amp; Fresenius integration</div></div>
      <div class="fac"><div class="fac-icon">&#127969;</div><div class="fac-name">Nursing Homes</div><div class="fac-desc">CKD surveillance, medication alerts, telehealth specialist access, renal trend monitoring</div></div>
      <div class="fac"><div class="fac-icon">&#128260;</div><div class="fac-name">Subacute / SNF</div><div class="fac-desc">Post-AKI recovery protocols, transition of care, CKD staging continuity</div></div>
      <div class="fac"><div class="fac-icon">&#128167;</div><div class="fac-name">Dialysis Centers</div><div class="fac-desc">ESRD management, adequacy tracking, access planning, Baxter &amp; Fresenius data</div></div>
      <div class="fac"><div class="fac-icon">&#127968;</div><div class="fac-name">Home Health</div><div class="fac-desc">Remote monitoring, home dialysis support, peritoneal dialysis management</div></div>
      <div class="fac"><div class="fac-icon">&#128241;</div><div class="fac-name">Telehealth</div><div class="fac-desc">Virtual nephrology with AI co-pilot, auto-generated consult notes, async consultations</div></div>
      <div class="fac"><div class="fac-icon">&#127962;</div><div class="fac-name">Outpatient Clinics</div><div class="fac-desc">CKD progression tracking, population dashboards, preventive protocol automation</div></div>
      <div class="fac"><div class="fac-icon">&#129309;</div><div class="fac-name">IPAs &amp; Payers</div><div class="fac-desc">Risk stratification, prior auth support, Lambda-verified audit trail, HEDIS metrics</div></div>
    </div>
    <!-- Stakeholder row -->
    <div class="stake">
      <div class="sc"><div class="sl">Providers</div><div class="sv">Nephrologists<br>Hospitalists<br>NPs &amp; PAs</div></div>
      <div class="sc"><div class="sl">Facilities</div><div class="sv">Hospitals &middot; SNFs<br>Dialysis &middot; Home Health</div></div>
      <div class="sc"><div class="sl">Payers</div><div class="sv">Insurance<br>IPAs<br>Managed Care</div></div>
      <div class="sc"><div class="sl">Patients</div><div class="sv">Patient Portal<br>Lab Transparency<br>Care Plans</div></div>
      <div class="sc"><div class="sl">Data Networks</div><div class="sv">Epic &middot; Cerner<br>Manifest MedEx<br>HL7 FHIR R4</div></div>
    </div>
  </div>
</section>

<!-- CLAUDE STRIP -->
<div class="claude-strip">
  <div class="ant-badge">
    <div class="ant-icon"><svg width="20" height="20" viewBox="0 0 40 40" fill="none"><path d="M20 5L35 30H5L20 5Z" fill="white" opacity="0.92"/></svg></div>
    <div><div class="ant-by">Powered by</div><div class="ant-name">Anthropic Claude</div></div>
  </div>
  <div class="claude-text">
    <h3>Purpose-Built Nephrology AI</h3>
    <p>DiagnoVera is powered by Anthropic&rsquo;s Claude &mdash; purpose-built for nephrology at fellowship-grade depth. The AI is trained on nephrology literature, KDIGO 2024 guidelines, AKI biomarker research, dialysis protocols, and renal pathophysiology. Constitutional AI safety ensures it explains its reasoning, acknowledges uncertainty, and always defers to clinical judgment. This is not a general-purpose chatbot with a medical prompt &mdash; it is a clinical intelligence engine designed for the complexity of kidney disease.</p>
  </div>
  <div class="claude-ctas">
    <a class="btn-claude" href="https://diagnovera-924070815611.us-west1.run.app/login">Enter DiagnoVera &#8594;</a>
    <a class="btn-ant" href="https://www.anthropic.com">About Anthropic</a>
  </div>
</div>

<!-- FOOTER -->
<footer id="contact">
  <div class="footer-grid">
    <div>
      <div class="flogo">Diagno<b>Vera</b>&#8482; &middot; DVERA&#8482;</div>
      <p class="fdesc">An AI-powered nephrology intelligence platform &mdash; verified diagnosis, intelligent documentation, automated billing, telehealth, and universal EHR connectivity &mdash; built on Anthropic Claude.</p>
      <div class="fcontact">
        <strong>Headquarters</strong>
        1325 East Cooley Drive, Suite 109<br>Colton, CA 92324
        <strong>Clinical Inquiries &amp; Demo Requests</strong>
        <a href="mailto:clinical@diagnovera.com">clinical@diagnovera.com</a>
        <strong>Partnerships, Sales &amp; IPAs</strong>
        <a href="mailto:partners@diagnovera.com">partners@diagnovera.com</a>
        <strong>Payer &amp; Insurance Relations</strong>
        <a href="mailto:payers@diagnovera.com">payers@diagnovera.com</a>
        <strong>Technical Support</strong>
        <a href="mailto:support@diagnovera.com">support@diagnovera.com</a>
        <strong>Media &amp; Press</strong>
        <a href="mailto:press@diagnovera.com">press@diagnovera.com</a>
      </div>
    </div>
    <div>
      <div class="fcol-title">Platform</div>
      <div class="fcol-links">
        <a href="#">&#923; Lambda Diagnosis</a>
        <a href="#">AI Layer (Claude)</a>
        <a href="#">54+ Clinical Modules</a>
        <a href="#">H&amp;P Note Generation</a>
        <a href="#">Billing &amp; RCM</a>
        <a href="#">Telehealth Console</a>
        <a href="#">Patient Portal</a>
        <a href="#">Payer Integration</a>
        <a href="#">FHIR Integrations</a>
        <a href="#">Population Analytics</a>
      </div>
    </div>
    <div>
      <div class="fcol-title">Solutions</div>
      <div class="fcol-links">
        <a href="#">Acute Hospitals</a>
        <a href="#">Nursing Homes</a>
        <a href="#">Dialysis Centers</a>
        <a href="#">Subacute / SNF</a>
        <a href="#">Home Health</a>
        <a href="#">Telehealth</a>
        <a href="#">IPAs &amp; Payers</a>
        <a href="#">Outpatient Clinics</a>
        <a href="#">Academic Centers</a>
      </div>
    </div>
    <div>
      <div class="fcol-title">Company</div>
      <div class="fcol-links">
        <a href="#">About Us</a>
        <a href="#">Leadership</a>
        <a href="#">Careers</a>
        <a href="#">Clinical Evidence</a>
        <a href="#">FHIR Documentation</a>
        <a href="#">Security Whitepaper</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">HIPAA Notice</a>
        <a href="#">BAA Request</a>
        <a href="https://diagnovera-924070815611.us-west1.run.app/login">Sign In</a>
      </div>
    </div>
  </div>
  <div class="footer-divider"></div>
  <div class="footer-bottom">
    <div class="fbadges">
      <span class="fbadge fb-h">HIPAA</span>
      <span class="fbadge fb-k">KDIGO 2024</span>
      <span class="fbadge fb-c">Claude AI</span>
    </div>
    <div class="fcopy">&copy; 2026 DiagnoVera Inc. All rights reserved. DVERA&trade; is a registered trademark.</div>
    <div class="fsocial">
      <a href="https://www.linkedin.com/company/diagnovera" target="_blank" rel="noopener">LinkedIn</a>
      <a href="https://twitter.com/diagnovera" target="_blank" rel="noopener">Twitter</a>
    </div>
  </div>
</footer>
`;

const overrideCSS = `
  .diagnovera-landing, .diagnovera-landing * { box-sizing: border-box; }
  .diagnovera-landing { all: initial; font-family: 'DM Sans', system-ui, sans-serif; color: #18120a; line-height: 1.6; }
  .diagnovera-landing a { text-decoration: none; color: inherit; }
  .diagnovera-landing .btn-enter {
    background: linear-gradient(135deg,#0d47a1,#0288d1 55%,#00acc1) !important;
    color: #fff !important;
  }
  .diagnovera-landing .btn-claude {
    background: linear-gradient(135deg,#0d47a1,#0288d1 60%,#00acc1) !important;
    color: #fff !important;
  }
  .diagnovera-landing .btn-ghost {
    color: rgba(255,255,255,0.92) !important;
    border-color: rgba(255,255,255,0.40) !important;
  }
  .diagnovera-landing .btn-ant {
    color: rgba(210,230,245,0.90) !important;
    border-color: rgba(255,255,255,0.28) !important;
  }
  .diagnovera-landing .btn-login {
    background: var(--blue) !important;
    color: #fff !important;
  }
  .diagnovera-landing .btn-demo {
    color: var(--ink2) !important;
  }
  .diagnovera-landing .logo-mark {
    background-image: initial !important;
  }
  .diagnovera-landing .fcard {
    border-radius: 18px !important;
    background: #faf8f4 !important;
  }
`;

const ladybugCSS = `
/* ── S-PATH LADYBUG ── */
.lb-path-container{position:fixed;top:0;left:0;width:100%;height:100%;z-index:497;pointer-events:none}
.lb-path-container svg{width:100%;height:100%}
.lb-path-line{fill:none;stroke:rgba(212,32,16,0.06);stroke-width:2;stroke-dasharray:8 6}
.lb-bug{position:fixed;z-index:500;pointer-events:none;transition:transform 0.1s linear;will-change:transform,left,top}
.lb-bug.flying .lb-shell{opacity:0}
.lb-bug.flying .lb-wing-l{animation:lbFlutterL 0.14s ease-in-out infinite}
.lb-bug.flying .lb-wing-r{animation:lbFlutterR 0.14s ease-in-out infinite}
.lb-bug.sitting .lb-wing-l,.lb-bug.sitting .lb-wing-r{animation:none;transform:rotate(0) scaleX(1)}
.lb-bug.sitting{animation:lbBob 2.8s ease-in-out infinite}
@keyframes lbBob{
  0%,100%{transform:translateY(0) rotate(0)}
  50%{transform:translateY(-3px) rotate(2deg)}
}
@keyframes lbFlutterL{
  0%,100%{transform:rotate(-22deg) scaleX(1.35)}
  50%{transform:rotate(-42deg) scaleX(1.5)}
}
@keyframes lbFlutterR{
  0%,100%{transform:rotate(22deg) scaleX(1.35)}
  50%{transform:rotate(42deg) scaleX(1.5)}
}
`;

export default function HomePage() {
  const pathRef = useRef(null);
  const landingRef = useRef(null);
  const scrollTimer = useRef(null);
  const [bugPos, setBugPos] = useState({ x: -100, y: -100 });
  const [isFlying, setIsFlying] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // S-path ladybug: compute position along path based on scroll
  useEffect(() => {
    if (!mounted) return;
    const path = pathRef.current;
    if (!path) return;

    function update() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const progress = Math.min(1, Math.max(0, window.scrollY / docHeight));
      const totalLen = path.getTotalLength();
      const pt = path.getPointAtLength(progress * totalLen);
      // Convert SVG user-space (0-500 x, 0-2000 y) to viewport pixels
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setBugPos({ x: (pt.x / 500) * vw, y: (pt.y / 2000) * vh });
    }

    function onScroll() {
      if (!isFlying) setIsFlying(true);
      update();
      clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => setIsFlying(false), 400);
    }

    // Initial position
    setTimeout(update, 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      clearTimeout(scrollTimer.current);
    };
  }, [mounted, isFlying]);

  return (
    <>
      <Head>
        <title>DiagnoVera\u2122 \u2014 Nephrology Intelligence Platform</title>
        <meta name="description" content="DiagnoVera is a full-spectrum nephrology intelligence platform with AI diagnosis, automated documentation, nephrology billing, telehealth, and universal FHIR connectivity." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>
      <style dangerouslySetInnerHTML={{ __html: landingCSS + overrideCSS + ladybugCSS }} />
      <div ref={landingRef} className="diagnovera-landing" dangerouslySetInnerHTML={{ __html: landingBody }} />

      {/* Hidden SVG with S-shaped flight path */}
      {mounted && (
        <svg viewBox="0 0 500 2000" preserveAspectRatio="none" style={{ position:'fixed',top:0,left:0,width:'100vw',height:'100vh',zIndex:497,pointerEvents:'none' }}>
          <path
            ref={pathRef}
            d="M 60,40 C 200,120 380,180 340,340 S 80,520 220,680 S 420,820 180,980 S 40,1140 280,1300 S 460,1460 160,1620 S 40,1780 240,1940"
            fill="none"
            stroke="rgba(212,32,16,0.04)"
            strokeWidth="2"
            strokeDasharray="8 6"
          />
        </svg>
      )}

      {/* Scroll-driven ladybug */}
      {mounted && <div
        className={'lb-bug ' + (isFlying ? 'flying' : 'sitting')}
        style={{ position:'fixed', left: bugPos.x - 18, top: bugPos.y - 18, zIndex:500, pointerEvents:'none' }}
      >
        <svg width="36" height="36" viewBox="-24 -34 48 52" xmlns="http://www.w3.org/2000/svg">
          {/* Left wing */}
          <ellipse className="lb-wing-l" cx="-6" cy="0" rx="12" ry="10" fill="#d42010" style={{transformOrigin:'0px 0px'}} />
          {/* Right wing */}
          <ellipse className="lb-wing-r" cx="6" cy="0" rx="12" ry="10" fill="#d42010" style={{transformOrigin:'0px 0px'}} />
          {/* Dark body */}
          <ellipse cx="0" cy="0" rx="6" ry="9" fill="#1a0800" />
          {/* Shell */}
          <ellipse className="lb-shell" cx="0" cy="0" rx="13" ry="11" fill="#d42010" />
          <ellipse cx="-3.5" cy="-4" rx="5" ry="3.5" fill="rgba(255,120,100,0.45)" />
          <line x1="0" y1="-11" x2="0" y2="11" stroke="#1a0800" strokeWidth="1.4" />
          {/* Spots */}
          <circle cx="-4.5" cy="-3.5" r="2.5" fill="#1a0800" />
          <circle cx="-5" cy="3" r="2" fill="#1a0800" />
          <circle cx="4.5" cy="-3.5" r="2.5" fill="#1a0800" />
          <circle cx="5" cy="3" r="2" fill="#1a0800" />
          {/* Head */}
          <ellipse cx="0" cy="-13" rx="7" ry="6" fill="#1a0800" />
          <circle cx="-3.5" cy="-14" r="2.2" fill="white" />
          <circle cx="3.5" cy="-14" r="2.2" fill="white" />
          <circle cx="-3" cy="-14" r="1.2" fill="#1a0800" />
          <circle cx="3.5" cy="-14" r="1.2" fill="#1a0800" />
          <circle cx="-2.5" cy="-14.8" r="0.5" fill="white" />
          <circle cx="4" cy="-14.8" r="0.5" fill="white" />
          {/* Antennae */}
          <path d="M-3,-18 C-5,-24 -8,-28 -10,-30" fill="none" stroke="#1a0800" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="-10" cy="-30" r="1.5" fill="#1a0800" />
          <path d="M3,-18 C5,-24 8,-28 10,-30" fill="none" stroke="#1a0800" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="10" cy="-30" r="1.5" fill="#1a0800" />
          {/* Legs */}
          <g className="lb-legs">
            <path d="M-12,-2 C-18,-4 -20,-2 -18,0" fill="none" stroke="#1a0800" strokeWidth="1.1" strokeLinecap="round" />
            <path d="M-12,4 C-18,4 -20,6 -18,8" fill="none" stroke="#1a0800" strokeWidth="1.1" strokeLinecap="round" />
            <path d="M12,-2 C18,-4 20,-2 18,0" fill="none" stroke="#1a0800" strokeWidth="1.1" strokeLinecap="round" />
            <path d="M12,4 C18,4 20,6 18,8" fill="none" stroke="#1a0800" strokeWidth="1.1" strokeLinecap="round" />
          </g>
        </svg>
      </div>}
    </>
  );
}
