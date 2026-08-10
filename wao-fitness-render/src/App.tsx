import { type FormEvent, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SiWhatsapp } from 'react-icons/si';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ArrowDown, ArrowUpRight, Check, ChevronRight, Clock3, Dumbbell, Instagram, Menu, Play, Quote, Sparkles, Target, UserRound, Users, X, Zap } from 'lucide-react';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

const images = {
  hero: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=2200',
  interior: 'https://images.pexels.com/photos/4164848/pexels-photo-4164848.jpeg?auto=compress&cs=tinysrgb&w=1400',
  lift: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1200',
  woman: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=1200',
  coach: 'https://images.pexels.com/photos/6455929/pexels-photo-6455929.jpeg?auto=compress&cs=tinysrgb&w=1200',
  rope: 'https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&w=1200',
  weights: 'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=1200',
  training: 'https://images.pexels.com/photos/6551415/pexels-photo-6551415.jpeg?auto=compress&cs=tinysrgb&w=1200',
};

const navItems = [
  ['About', 'about'],
  ['Programs', 'programs'],
  ['Coaches', 'coaches'],
  ['Membership', 'membership'],
  ['Stories', 'stories'],
];

const programs = [
  { title: 'Strength / Power', meta: '01 — Build the base', copy: 'Progressive training built around better movement, heavier lifts and a body that performs.', image: images.lift, icon: Dumbbell },
  { title: 'Conditioning', meta: '02 — Earn your engine', copy: 'High-intensity work that makes everyday energy feel almost unfair. Scaled to your level.', image: images.rope, icon: Zap },
  { title: 'Personal Coaching', meta: '03 — Your exact plan', copy: 'One coach, one clear path. Training, accountability and nutrition guidance with nowhere to hide.', image: images.coach, icon: Target },
  { title: 'Performance Reset', meta: '04 — Move better', copy: 'A considered return to training for bodies that need mobility, control and a smarter start.', image: images.woman, icon: Sparkles },
];

const testimonials = [
  { quote: 'The body achieves what the mind believes. Show up, stay consistent, and let every rep move you closer.', name: 'WAO FITNESS', detail: 'A reminder for every session', initials: 'W' },
  { quote: 'The space is serious without being intimidating. The coaches see the details, and the results followed.', name: 'Ishita Batra', detail: 'Personal coaching member', initials: 'IB' },
  { quote: 'WAO gave me a routine I can actually live with. Stronger, calmer, and finally consistent.', name: 'Karan Sethi', detail: 'Transformation member', initials: 'KS' },
];

function useReveals() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" data-testid="link-logo" className={`flex items-center gap-2.5 ${light ? 'text-[#f0e5d7]' : 'text-[#f0e5d7]'}`}>
      <span className="flex h-8 w-8 items-center justify-center border border-[#ff7955] font-display text-lg font-bold leading-none text-[#ff7955]">W</span>
      <span className="font-display text-[1.45rem] font-bold tracking-[.08em]">WAO <span className="font-normal text-[#b6a99b]">FITNESS</span></span>
    </a>
  );
}

function Header({ onTrial }: { onTrial: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="container-wide flex h-[82px] items-center justify-between border-b hairline">
        <Logo light />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {navItems.map(([label, id]) => <a key={id} href={`#${id}`} data-testid={`link-nav-${id}`} className="font-mono-custom text-[10px] uppercase tracking-[.11em] text-[#d1c5b7] transition-colors hover:text-[#ff7955]">{label}</a>)}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <a href="tel:06283117815" data-testid="link-header-call" className="font-mono-custom text-[10px] uppercase tracking-[.1em] text-[#b6a99b] transition-colors hover:text-[#f0e5d7]">06283 117815</a>
          <button type="button" onClick={onTrial} data-testid="button-header-trial" className="cta-primary flex items-center gap-3 px-5 py-3 font-mono-custom text-[10px] font-bold uppercase tracking-[.12em]">Book a trial <ArrowUpRight size={14} /></button>
        </div>
        <button type="button" onClick={() => setMenuOpen(!menuOpen)} data-testid="button-mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} className="flex h-10 w-10 items-center justify-center border hairline text-[#f0e5d7] lg:hidden">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <div className={`absolute inset-x-0 top-[82px] border-b border-[#3a2821] bg-[#1a120f]/98 px-5 py-6 backdrop-blur-md transition-all duration-300 lg:hidden ${menuOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'}`}>
        <nav className="flex flex-col gap-1">
          {navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={closeMenu} data-testid={`link-mobile-nav-${id}`} className="flex items-center justify-between border-b hairline py-4 font-display text-2xl uppercase tracking-wide text-[#f0e5d7]">{label}<ChevronRight size={18} className="text-[#ff7955]" /></a>)}
          <button type="button" onClick={() => { closeMenu(); onTrial(); }} data-testid="button-mobile-trial" className="cta-primary mt-5 flex items-center justify-center gap-3 py-4 font-mono-custom text-[11px] uppercase tracking-[.14em]">Book a free trial <ArrowUpRight size={15} /></button>
        </nav>
      </div>
    </header>
  );
}

function Hero({ onTrial }: { onTrial: () => void }) {
  return (
    <section id="top" className="relative flex min-h-[740px] items-end overflow-hidden bg-[#17110e] pb-14 pt-32 sm:min-h-[820px] lg:min-h-[900px] lg:pb-20">
      <img src={images.hero} alt="Athlete training in a dark WAO Fitness gym" className="hero-photo absolute inset-0 h-full w-full object-cover object-[62%] opacity-75" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#17110e_0%,rgba(23,17,14,.84)_28%,rgba(23,17,14,.2)_72%,rgba(23,17,14,.72)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,#17110e_0%,transparent_34%,rgba(23,17,14,.4)_100%)]" />
      <div className="absolute right-7 top-40 hidden h-36 w-36 rounded-full border border-[#d5bca2]/25 lg:block" />
      <div className="absolute right-[104px] top-[160px] hidden h-20 w-20 rounded-full border border-[#ff7955]/60 lg:block" />
      <div className="container-wide relative z-10">
        <div className="max-w-[730px]">
          <div className="reveal mb-7 flex items-center gap-4"><span className="line-accent pulse-line" /><span className="eyebrow">Chandigarh / Sector 9D / Est. 2016</span></div>
          <h1 className="reveal delay-1 display-title font-display text-[4.7rem] font-bold uppercase text-[#f0e5d7] sm:text-[7.2rem] lg:text-[9.1rem]">Build the<br /><span className="text-[#ff7955]">standard.</span></h1>
          <p className="reveal delay-2 mt-8 max-w-[460px] text-[15px] leading-7 text-[#c3b6a8] sm:text-base">A high-performance training club for people in Chandigarh who are ready to make their body match their ambition.</p>
          <div className="reveal delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={onTrial} data-testid="button-hero-join" className="cta-primary flex items-center justify-center gap-3 px-7 py-4 font-mono-custom text-[11px] font-bold uppercase tracking-[.14em]">Start your transformation <ArrowUpRight size={16} /></button>
            <a href="#programs" data-testid="link-hero-programs" className="cta-secondary flex items-center justify-center gap-3 px-7 py-4 font-mono-custom text-[11px] uppercase tracking-[.14em]">Explore the floor <ArrowDown size={15} /></a>
          </div>
        </div>
        <div className="reveal delay-4 mt-20 flex flex-wrap items-center gap-x-8 gap-y-4 border-t hairline pt-5 sm:mt-28">
          <div className="flex items-center gap-3"><span className="font-display text-2xl tracking-[.08em] text-[#e7d9c5]">4.9</span><span className="text-[#ff7955]">★★★★★</span></div>
          <span className="font-mono-custom text-[10px] uppercase tracking-[.14em] text-[#9b8c7d]">Google rating / 1,319+ reviews</span>
          <span className="hidden h-4 w-px bg-[#e7d9c5]/20 sm:block" />
          <span className="font-mono-custom text-[10px] uppercase tracking-[.14em] text-[#9b8c7d]">Open daily / 05:30 — 23:00</span>
        </div>
      </div>
      <div className="absolute bottom-9 right-8 hidden items-center gap-3 [writing-mode:vertical-rl] lg:flex"><span className="font-mono-custom text-[9px] uppercase tracking-[.2em] text-[#968b80]">Scroll to train</span><span className="h-12 w-px bg-[#ff7955]" /></div>
    </section>
  );
}

function About() {
  const features = ['Premium equipment', 'Expert trainers', 'Personal coaching', 'Results-driven programs'];
  return (
    <section id="about" className="section-pad relative bg-[#211916]">
      <div className="container-wide grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
        <div className="reveal relative min-h-[430px]">
          <div className="image-mask absolute left-0 top-0 h-[360px] w-[78%] sm:h-[440px]"><img src={images.weights} alt="WAO Fitness premium training floor" className="h-full w-full object-cover grayscale-[.18]" /></div>
          <div className="absolute bottom-0 right-0 w-[48%] border-8 border-[#211916] bg-[#ff5d32] p-5 sm:p-7"><span className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-[#301711]">The WAO method</span><p className="mt-6 font-display text-3xl font-bold uppercase leading-[.88] text-[#301711] sm:text-4xl">Show up.<br />Get stronger.</p></div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="reveal flex items-center gap-4"><span className="eyebrow">01 / The club</span><span className="line-accent" /></div>
          <h2 className="reveal delay-1 mt-6 max-w-[600px] font-display text-[4rem] font-bold uppercase leading-[.88] text-[#f0e5d7] sm:text-[5.5rem]">Built for<br /><span className="text-[#c9b39c]">the committed.</span></h2>
          <p className="reveal delay-2 mt-8 max-w-[550px] text-[15px] leading-7 text-[#b6a99b]">WAO FITNESS is Chandigarh’s premium fitness destination for people who want real results. Modern equipment, experienced coaches and an environment that makes showing up feel like a decision you already made.</p>
          <div className="reveal delay-3 mt-9 grid grid-cols-1 gap-x-8 gap-y-4 border-t hairline pt-6 sm:grid-cols-2">{features.map((feature, index) => <div key={feature} data-testid={`text-feature-${index}`} className="flex items-center gap-3 text-sm text-[#e7d9c5]"><span className="flex h-5 w-5 items-center justify-center bg-[#ff5d32] text-[#211916]"><Check size={13} strokeWidth={3} /></span>{feature}</div>)}</div>
        </div>
      </div>
    </section>
  );
}

function Programs() {
  return (
    <section id="programs" className="section-pad section-grid bg-[#17110e]">
      <div className="container-wide">
        <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><span className="eyebrow">02 / Choose your work</span><h2 className="mt-5 font-display text-[4.5rem] font-bold uppercase leading-[.86] text-[#f0e5d7] sm:text-[6rem]">Train with<br /><span className="text-[#ff7955]">intent.</span></h2></div><p className="max-w-[300px] text-sm leading-6 text-[#a99b8d]">No one-size-fits-all plans. Pick the path that matches where you are going.</p></div>
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{programs.map((program, index) => { const Icon = program.icon; return <article key={program.title} className={`reveal delay-${(index % 4) + 1} group relative min-h-[440px] overflow-hidden border border-[#d9c7b2]/15 bg-[#231a16]`} data-testid={`card-program-${index}`}><img src={program.image} alt={program.title} className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-luminosity transition duration-700 group-hover:scale-105 group-hover:opacity-75 group-hover:mix-blend-normal" /><div className="absolute inset-0 bg-gradient-to-t from-[#17110e] via-[#17110e]/45 to-transparent" /><div className="relative flex h-full flex-col justify-between p-6"><div className="flex items-start justify-between"><span className="font-mono-custom text-[10px] tracking-[.16em] text-[#ff7955]">{program.meta}</span><Icon size={20} className="text-[#e7d9c5]" /></div><div><h3 className="font-display text-4xl font-bold uppercase leading-[.9] text-[#f0e5d7]">{program.title}</h3><p className="mt-4 text-sm leading-6 text-[#c6b7a8]">{program.copy}</p><a href="#contact" data-testid={`link-program-enquire-${index}`} className="mt-6 inline-flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[.13em] text-[#ff7955]">Enquire now <ArrowUpRight size={14} /></a></div></div></article>; })}</div>
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section className="border-y border-[#3b2921] bg-[#ff5d32] py-12 text-[#25140e]">
      <div className="container-wide grid gap-8 md:grid-cols-4 md:gap-0">{[['1,319+', 'happy reviews'], ['4.9', 'Google rating'], ['10+', 'expert trainers'], ['1,000+', 'transformations']].map(([number, label], index) => <div key={label} data-testid={`stat-proof-${index}`} className={`reveal ${index ? 'md:border-l md:border-[#451e15]/25' : ''} px-0 md:px-8 ${index === 0 ? 'md:pl-0' : ''}`}><div className="stat-number font-display text-6xl font-bold leading-none sm:text-7xl">{number}{index === 1 && <span className="text-4xl">★</span>}</div><div className="mt-2 font-mono-custom text-[10px] uppercase tracking-[.15em] text-[#59251a]">{label}</div></div>)}</div>
    </section>
  );
}

function Coaches() {
  const coaches = [{ role: 'Strength & conditioning', image: images.coach, years: '12 yrs' }, { role: 'Performance & mobility', image: images.woman, years: '9 yrs' }, { role: 'Transformation coaching', image: images.training, years: '10 yrs' }];
  return <section id="coaches" className="section-pad bg-[#211916]"><div className="container-wide"><div className="reveal flex items-center gap-4"><span className="eyebrow">03 / The coaching team</span><span className="line-accent" /></div><div className="reveal delay-1 mt-5 flex flex-col justify-between gap-5 md:flex-row md:items-end"><h2 className="font-display text-[4.5rem] font-bold uppercase leading-[.86] text-[#f0e5d7] sm:text-[6rem]">People who<br /><span className="text-[#c9b39c]">raise the bar.</span></h2><p className="max-w-[300px] text-sm leading-6 text-[#a99b8d]">Ask better questions. Get better coaching. Our team brings experience to every rep.</p></div><div className="mt-14 grid gap-5 md:grid-cols-3">{coaches.map((coach, index) => <article key={coach.role} className={`reveal delay-${index + 1} group`} data-testid={`card-coach-${index}`}><div className="image-mask relative aspect-[.9] bg-[#33251f]"><img src={coach.image} alt={`${coach.role} coach`} className="h-full w-full object-cover grayscale-[.25] group-hover:grayscale-0" /><span className="absolute left-4 top-4 bg-[#ff5d32] px-3 py-2 font-mono-custom text-[10px] uppercase tracking-wider text-[#241510]">{coach.years}</span></div><div className="flex items-end justify-between border-b hairline py-5"><div><h3 className="font-display text-3xl font-bold uppercase text-[#f0e5d7]">{coach.role}</h3><p className="mt-1 font-mono-custom text-[10px] uppercase tracking-[.1em] text-[#ff7955]">WAO coaching team</p></div><ArrowUpRight size={19} className="text-[#998d81] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#ff7955]" /></div></article>)}</div></div></section>;
}

function Membership({ onTrial }: { onTrial: () => void }) {
  const plans = [{ name: 'Base', note: 'For the self-directed', features: ['Gym access', 'All equipment', 'Locker facility'], accent: false }, { name: 'Premium', note: 'For the serious regular', features: ['Personal training', 'Workout planning', 'Diet guidance'], accent: true }, { name: 'Transform', note: 'For total commitment', features: ['Complete fitness plan', 'Personal coach', 'Nutrition support'], accent: false }];
  return <section id="membership" className="section-pad section-grid bg-[#17110e]"><div className="container-wide"><div className="reveal text-center"><span className="eyebrow">04 / Your next chapter</span><h2 className="mx-auto mt-5 max-w-[760px] font-display text-[4.5rem] font-bold uppercase leading-[.86] text-[#f0e5d7] sm:text-[6.5rem]">Memberships<br /><span className="text-[#ff7955]">with a point.</span></h2><p className="mx-auto mt-7 max-w-[450px] text-sm leading-6 text-[#a99b8d]">Choose the level of support that keeps you moving when motivation gets quiet.</p></div><div className="mt-16 grid gap-4 lg:grid-cols-3">{plans.map((plan, index) => <article key={plan.name} className={`reveal delay-${index + 1} relative border p-7 ${plan.accent ? 'border-[#ff5d32] bg-[#ff5d32] text-[#25140e]' : 'border-[#d9c7b2]/20 bg-[#231a16] text-[#f0e5d7]'}`} data-testid={`card-membership-${index}`}>{plan.accent && <span className="absolute right-6 top-6 font-mono-custom text-[9px] uppercase tracking-[.16em]">Most chosen</span>}<span className={`font-mono-custom text-[10px] uppercase tracking-[.15em] ${plan.accent ? 'text-[#652517]' : 'text-[#ff7955]'}`}>0{index + 1} / {plan.note}</span><h3 className="mt-14 font-display text-6xl font-bold uppercase leading-none">{plan.name}</h3><div className={`my-8 h-px ${plan.accent ? 'bg-[#6a2819]/30' : 'bg-[#d9c7b2]/15'}`} />{plan.features.map((feature) => <div key={feature} className="mb-5 flex items-center gap-3 text-sm"><Check size={16} className={plan.accent ? 'text-[#5e2116]' : 'text-[#ff7955]'} />{feature}</div>)}<button type="button" onClick={onTrial} data-testid={`button-membership-${index}`} className={`mt-5 flex w-full items-center justify-center gap-2 border py-4 font-mono-custom text-[10px] uppercase tracking-[.13em] ${plan.accent ? 'border-[#6a2819]/40 hover:bg-[#ff825f]' : 'border-[#d9c7b2]/30 hover:border-[#ff7955]'}`}>Contact for membership <ArrowUpRight size={14} /></button></article>)}</div></div></section>;
}

function Stories() {
  return <section id="stories" className="section-pad bg-[#211916]"><div className="container-wide"><div className="reveal flex items-center gap-4"><span className="eyebrow">05 / Word on the floor</span><span className="line-accent" /></div><div className="reveal delay-1 mt-5 flex items-end justify-between"><h2 className="font-display text-[4.5rem] font-bold uppercase leading-[.86] text-[#f0e5d7] sm:text-[6rem]">Proof is<br /><span className="text-[#c9b39c]">personal.</span></h2><div className="hidden gap-2 sm:flex"><button type="button" data-testid="button-story-prev" aria-label="Previous story" className="flex h-11 w-11 items-center justify-center border hairline text-[#e7d9c5] hover:border-[#ff7955]"><ArrowDown className="rotate-90" size={17} /></button><button type="button" data-testid="button-story-next" aria-label="Next story" className="flex h-11 w-11 items-center justify-center border hairline text-[#e7d9c5] hover:border-[#ff7955]"><ArrowDown className="-rotate-90" size={17} /></button></div></div><div className="mt-14 grid gap-4 lg:grid-cols-3">{testimonials.map((story, index) => <article key={story.name} className={`reveal delay-${index + 1} border border-[#d9c7b2]/15 bg-[#2a1f1a] p-7`} data-testid={`card-testimonial-${index}`}><Quote size={28} className="text-[#ff7955]" /><p className="mt-12 min-h-[128px] font-display text-3xl uppercase leading-[.98] text-[#f0e5d7]">“{story.quote}”</p><div className="mt-8 flex items-center gap-3 border-t hairline pt-5"><span className="flex h-9 w-9 items-center justify-center bg-[#ff5d32] font-mono-custom text-[10px] font-bold text-[#25140e]">{story.initials}</span><div><div className="text-sm text-[#e7d9c5]">{story.name}</div><div className="font-mono-custom text-[9px] uppercase tracking-[.1em] text-[#9f9082]">{story.detail}</div></div></div></article>)}</div></div></section>;
}

function Contact({ onSubmit }: { onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return <section id="contact" className="section-pad relative bg-[#ff5d32] text-[#25140e]"><div className="container-wide grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-24"><div className="reveal"><span className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[#67261a]">06 / Make your move</span><h2 className="mt-6 font-display text-[5.2rem] font-bold uppercase leading-[.82] sm:text-[7rem]">Your<br />turn.</h2><p className="mt-8 max-w-[360px] text-[15px] leading-7 text-[#59251a]">Tell us where you are starting from. We will help map out what comes next.</p><div className="mt-12 space-y-5 border-t border-[#6a2819]/30 pt-6"><div className="flex gap-4"><Clock3 size={19} /><div><div className="font-mono-custom text-[10px] uppercase tracking-[.13em]">Hours</div><div className="mt-1 text-sm text-[#59251a]">Monday — Sunday / 05:30 — 23:00</div></div></div><div className="flex gap-4"><Target size={19} /><div><div className="font-mono-custom text-[10px] uppercase tracking-[.13em]">Find us</div><div className="mt-1 text-sm text-[#59251a]">SCO 34,35,36,37, Madhya Marg,<br />Sector 9D, Chandigarh 160009</div></div></div><div className="flex gap-4"><UserRound size={19} /><div><div className="font-mono-custom text-[10px] uppercase tracking-[.13em]">Call</div><a href="tel:06283117815" data-testid="link-contact-call" className="mt-1 block text-sm text-[#59251a] hover:underline">06283 117815</a></div></div></div></div><form onSubmit={onSubmit} className="reveal delay-2 border border-[#6a2819]/35 bg-[#f47b50]/35 p-6 sm:p-9" data-testid="form-enquiry"><div className="mb-8 flex items-center justify-between border-b border-[#6a2819]/30 pb-5"><span className="font-display text-3xl font-bold uppercase">Book a free trial</span><ArrowUpRight size={21} /></div><div className="grid gap-6 sm:grid-cols-2"><label className="block"><span className="font-mono-custom text-[9px] uppercase tracking-[.12em]">Your name</span><input required name="name" data-testid="input-enquiry-name" className="mt-2 w-full border-b border-[#6a2819]/45 bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[#8b3c29] focus:border-[#25140e]" placeholder="Enter your name" /></label><label className="block"><span className="font-mono-custom text-[9px] uppercase tracking-[.12em]">Phone number</span><input required type="tel" name="phone" data-testid="input-enquiry-phone" className="mt-2 w-full border-b border-[#6a2819]/45 bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[#8b3c29] focus:border-[#25140e]" placeholder="Your number" /></label><label className="block sm:col-span-2"><span className="font-mono-custom text-[9px] uppercase tracking-[.12em]">Fitness goal</span><select name="goal" data-testid="select-enquiry-goal" defaultValue="" className="mt-2 w-full border-b border-[#6a2819]/45 bg-transparent py-3 text-sm outline-none focus:border-[#25140e]"><option value="" disabled>Select your focus</option><option>Build strength</option><option>Lose weight</option><option>Personal coaching</option><option>Move and feel better</option></select></label><label className="block sm:col-span-2"><span className="font-mono-custom text-[9px] uppercase tracking-[.12em]">Anything we should know?</span><textarea name="message" data-testid="textarea-enquiry-message" rows={3} className="mt-2 w-full resize-none border-b border-[#6a2819]/45 bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[#8b3c29] focus:border-[#25140e]" placeholder="Optional — tell us what you are working towards" /></label></div><button type="submit" data-testid="button-submit-enquiry" className="mt-9 flex w-full items-center justify-between bg-[#25140e] px-5 py-4 font-mono-custom text-[10px] uppercase tracking-[.14em] text-[#f0e5d7] transition hover:bg-[#3a1d15]">Send enquiry <ArrowUpRight size={16} /></button><p className="mt-4 text-center font-mono-custom text-[9px] uppercase tracking-[.08em] text-[#6f2b1c]">No spam. Just a conversation about your goals.</p></form></div></section>;
}

function Footer() {
  return <footer className="bg-[#17110e] py-12 text-[#e7d9c5]"><div className="container-wide"><div className="flex flex-col justify-between gap-10 border-b hairline pb-12 md:flex-row md:items-end"><div><Logo /><p className="mt-6 max-w-[280px] font-display text-3xl uppercase leading-[.9] text-[#b8a99a]">Transform your body.<br /><span className="text-[#ff7955]">Transform your life.</span></p></div><div className="grid grid-cols-2 gap-x-16 gap-y-4 sm:flex sm:gap-10"><a href="#about" data-testid="link-footer-about" className="font-mono-custom text-[10px] uppercase tracking-[.12em] text-[#9f9082] hover:text-[#ff7955]">About</a><a href="#programs" data-testid="link-footer-programs" className="font-mono-custom text-[10px] uppercase tracking-[.12em] text-[#9f9082] hover:text-[#ff7955]">Programs</a><a href="#membership" data-testid="link-footer-membership" className="font-mono-custom text-[10px] uppercase tracking-[.12em] text-[#9f9082] hover:text-[#ff7955]">Membership</a><a href="#contact" data-testid="link-footer-contact" className="font-mono-custom text-[10px] uppercase tracking-[.12em] text-[#9f9082] hover:text-[#ff7955]">Contact</a></div></div><div className="flex flex-col justify-between gap-4 pt-6 sm:flex-row"><span className="font-mono-custom text-[9px] uppercase tracking-[.14em] text-[#75695e]">© 2024 WAO FITNESS / Chandigarh, India</span><div className="flex items-center gap-5"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" data-testid="link-social-instagram" aria-label="Instagram" className="text-[#9f9082] hover:text-[#ff7955]"><Instagram size={17} /></a><a href="https://www.facebook.com/" target="_blank" rel="noreferrer" data-testid="link-social-facebook" aria-label="Facebook" className="font-mono-custom text-xs text-[#9f9082] hover:text-[#ff7955]">f</a><a href="https://www.youtube.com/" target="_blank" rel="noreferrer" data-testid="link-social-youtube" aria-label="YouTube" className="font-mono-custom text-[10px] text-[#9f9082] hover:text-[#ff7955]">YT</a></div></div></div></footer>;
}

function Home() {
  const [trialOpen, setTrialOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  useReveals();
  useEffect(() => { document.title = 'WAO FITNESS — Build the standard | Chandigarh'; }, []);
  const openTrial = () => { setSubmitted(false); setTrialOpen(true); window.setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 20); };
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); event.currentTarget.reset(); };
  return <div className="wao-shell noise min-h-[100dvh]"><Header onTrial={openTrial} /><main><Hero onTrial={openTrial} /><About /><Programs /><Proof /><Coaches /><Membership onTrial={openTrial} /><Stories /><Contact onSubmit={submit} /></main><Footer /><a href="https://wa.me/916283117815" target="_blank" rel="noreferrer" data-testid="link-floating-whatsapp" aria-label="Chat with WAO Fitness on WhatsApp" className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#35b978] text-[#0c2116] shadow-xl transition-transform hover:scale-105"><SiWhatsapp size={25} aria-hidden="true" /></a><a href="tel:06283117815" data-testid="link-floating-call" aria-label="Call WAO Fitness" className="fixed bottom-5 left-5 z-30 flex h-12 items-center gap-2 border border-[#ff7955] bg-[#211916] px-4 text-[#ff7955] shadow-xl transition hover:bg-[#ff5d32] hover:text-[#211916] sm:hidden"><span className="font-mono-custom text-[10px] uppercase tracking-[.1em]">Call WAO</span></a>{submitted && <div role="status" data-testid="status-enquiry-success" className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 bg-[#f0e5d7] px-5 py-4 text-[#25140e] shadow-2xl"><span className="flex h-6 w-6 items-center justify-center bg-[#ff5d32]"><Check size={15} /></span><div><strong className="block font-display text-lg uppercase leading-none">Enquiry received.</strong><span className="mt-1 block text-xs text-[#6f6258]">We will call you soon to set up your trial.</span></div><button type="button" onClick={() => setSubmitted(false)} data-testid="button-dismiss-success" aria-label="Dismiss success message" className="ml-3 text-[#6f6258]"><X size={16} /></button></div>}{trialOpen && <div className="pointer-events-none fixed left-1/2 top-24 z-30 -translate-x-1/2 border border-[#ff7955] bg-[#211916] px-4 py-2 font-mono-custom text-[10px] uppercase tracking-[.12em] text-[#ff7955] opacity-0">Trial form ready</div>}</div>;
}

function Router() {
  return <ErrorBoundary resetKey={useLocation()[0]}><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;