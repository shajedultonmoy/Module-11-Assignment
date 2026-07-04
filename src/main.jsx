import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  Award,
  Camera,
  ChefHat,
  Coffee,
  Flame,
  Gem,
  Globe2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Quote,
  Send,
  Shell,
  Sparkles,
  Star,
  Utensils,
  Wine,
  X,
} from 'lucide-react';
import './styles.css';

const heroImage =
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2400&q=85';

const chefImage =
  'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=85';

const kitchenImage =
  'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=85';

const specialties = [
  { title: 'Italian Cuisine', text: 'Handmade pasta, aged cheeses, slow sauces.', icon: Utensils },
  { title: 'BBQ & Grill', text: 'Charcoal smoke, premium cuts, precise flame.', icon: Flame },
  { title: 'Seafood Dishes', text: 'Clean coastal flavors with luxury plating.', icon: Shell },
  { title: 'Luxury Desserts', text: 'Silky textures, gold accents, sculpted finishes.', icon: Coffee },
  { title: 'Asian Fusion', text: 'Balanced heat, umami depth, modern technique.', icon: Globe2 },
  { title: 'Fine Dining Presentation', text: 'Cinematic plates designed for all senses.', icon: Gem },
];

const dishes = [
  {
    title: 'Saffron Lobster Risotto',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1000&q=85',
  },
  {
    title: 'Truffle Tagliatelle',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1000&q=85',
  },
  {
    title: 'Charcoal Ribeye',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1000&q=85',
  },
  {
    title: 'Velvet Chocolate Gateau',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1000&q=85',
  },
  {
    title: 'Golden Citrus Tart',
    image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=1000&q=85',
  },
  {
    title: 'Seared Scallop Garden',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=85',
  },
];

const skills = [
  { name: 'Culinary Skills', value: 98 },
  { name: 'Food Presentation', value: 96 },
  { name: 'Kitchen Management', value: 92 },
  { name: 'Recipe Innovation', value: 94 },
  { name: 'Team Leadership', value: 90 },
];

const testimonials = [
  {
    quote: 'Mr. Rio turns dinner into theater. Every course arrived with confidence, texture, and unforgettable flavor.',
    name: 'Amelia Brooks',
    role: 'Private Dining Client',
  },
  {
    quote: 'His menu development brought our restaurant a new level of polish and consistency within weeks.',
    name: 'Marco Bellini',
    role: 'Restaurant Director',
  },
  {
    quote: 'Elegant, disciplined, and wildly creative. The dessert tasting alone deserved applause.',
    name: 'Nadia Rahman',
    role: 'Event Curator',
  },
];

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function Counter({ value, suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame;
    const duration = 1600;
    const start = performance.now();

    const tick = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = ['About', 'Experience', 'Specialties', 'Gallery', 'Skills', 'Testimonials', 'Contact'];

  return (
    <header className="navbar">
      <a className="brand" href="#home" aria-label="Mr. Rio home">
        <ChefHat size={24} />
        <span>Mr. Rio</span>
      </a>
      <button className="nav-toggle" aria-label="Toggle navigation" onClick={() => setOpen((value) => !value)}>
        {open ? <X /> : <Menu />}
      </button>
      <nav className={open ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
        {links.map((link) => (
          <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>
            {link}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${heroImage})` }} />
      <div className="hero-noise" />
      <div className="hero-content">
        <p className="eyebrow">Michelin-inspired private dining</p>
        <h1>Mr. Rio - Master Chef & Culinary Artist</h1>
        <p className="hero-copy">
          A refined culinary portfolio shaped by flame, precision, global technique, and unforgettable presentation.
        </p>
        <div className="hero-actions">
          <a className="btn primary" href="#gallery">
            View Portfolio <ArrowRight size={18} />
          </a>
          <a className="btn secondary" href="#contact">
            Book a Table <Wine size={18} />
          </a>
          <a className="btn ghost" href="#contact">
            Contact Now <Phone size={18} />
          </a>
        </div>
      </div>
      <div className="hero-stats" data-reveal>
        <article>
          <strong>
            <Counter value={18} suffix="+" />
          </strong>
          <span>Years Experience</span>
        </article>
        <article>
          <strong>
            <Counter value={42} suffix="+" />
          </strong>
          <span>Signature Menus</span>
        </article>
        <article>
          <strong>
            <Counter value={12} />
          </strong>
          <span>Awards Earned</span>
        </article>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about">
      <div className="section-copy" data-reveal>
        <p className="eyebrow">About the chef</p>
        <h2>Crafted with discipline, served with soul.</h2>
        <p>
          Mr. Rio is a professional master chef with 18 years of experience across luxury restaurants,
          boutique hotels, destination events, and private dining rooms. His cooking blends European
          fundamentals, open-fire confidence, and Asian-inspired balance.
        </p>
        <p>
          Every menu is built around exacting technique and an instinct for atmosphere: aroma, texture,
          plating rhythm, and the quiet drama of a perfect final detail.
        </p>
        <div className="about-badges">
          <span>18+ years</span>
          <span>Global cuisine</span>
          <span>Fine dining</span>
        </div>
      </div>
      <div className="image-collage" data-reveal>
        <img className="portrait" src={chefImage} alt="Professional chef plating food" />
        <img className="kitchen" src={kitchenImage} alt="Elegant restaurant kitchen scene" />
      </div>
    </section>
  );
}

function Experience() {
  const events = [
    ['2008', 'Started professional kitchen training in classic European technique.'],
    ['2013', 'Led grill and seafood stations for premium restaurant groups.'],
    ['2018', 'Developed international tasting menus for private clients and hotels.'],
    ['2026', 'Recognized for luxury presentation, menu innovation, and team leadership.'],
  ];

  return (
    <section id="experience" className="section experience">
      <div className="center-title" data-reveal>
        <p className="eyebrow">Experience</p>
        <h2>A timeline of heat, craft, and accolades.</h2>
      </div>
      <div className="timeline">
        {events.map(([year, text], index) => (
          <article className="timeline-item" data-reveal key={year} style={{ '--delay': `${index * 120}ms` }}>
            <span>{year}</span>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <div className="experience-grid">
        {[
          ['Restaurants worked at', '16+', Award],
          ['International expertise', '9 regions', Globe2],
          ['Awards & achievements', '12', Star],
        ].map(([label, value, Icon]) => (
          <article className="metric" data-reveal key={label}>
            <Icon />
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function Specialties() {
  return (
    <section id="specialties" className="section specialties">
      <div className="center-title" data-reveal>
        <p className="eyebrow">Specialties</p>
        <h2>Distinctive flavors with a fine dining finish.</h2>
      </div>
      <div className="card-grid">
        {specialties.map(({ title, text, icon: Icon }, index) => (
          <article className="specialty-card" data-reveal key={title} style={{ '--delay': `${index * 80}ms` }}>
            <Icon />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Gallery() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="gallery" className="section gallery">
      <div className="section-heading-row" data-reveal>
        <div>
          <p className="eyebrow">Signature dishes</p>
          <h2>Plates designed to linger in memory.</h2>
        </div>
        <Sparkles />
      </div>
      <div className="gallery-grid">
        {dishes.map((dish, index) => (
          <button className="dish-card" data-reveal key={dish.title} onClick={() => setSelected(dish)}>
            <img src={dish.image} alt={dish.title} />
            <span>{dish.title}</span>
          </button>
        ))}
      </div>
      {selected && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={selected.title} onClick={() => setSelected(null)}>
          <button className="close-lightbox" aria-label="Close preview">
            <X />
          </button>
          <img src={selected.image} alt={selected.title} />
          <p>{selected.title}</p>
        </div>
      )}
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="section-copy" data-reveal>
        <p className="eyebrow">Skills</p>
        <h2>Leadership measured in precision and calm.</h2>
        <p>
          From first prep to final service, Mr. Rio builds kitchens that move with focus,
          creative confidence, and the kind of standards guests can taste.
        </p>
      </div>
      <div className="skill-list" data-reveal>
        {skills.map((skill) => (
          <div className="skill" key={skill.name}>
            <div>
              <span>{skill.name}</span>
              <strong>{skill.value}%</strong>
            </div>
            <div className="bar">
              <span style={{ width: `${skill.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  useEffect(() => {
    const timer = setInterval(() => setActive((value) => (value + 1) % testimonials.length), 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="section testimonials">
      <div className="center-title" data-reveal>
        <p className="eyebrow">Testimonials</p>
        <h2>Words from the dining room.</h2>
      </div>
      <article className="testimonial-card" data-reveal>
        <Quote />
        <p>{current.quote}</p>
        <div>
          <strong>{current.name}</strong>
          <span>{current.role}</span>
        </div>
      </article>
      <div className="slider-dots" aria-label="Testimonials">
        {testimonials.map((item, index) => (
          <button
            key={item.name}
            aria-label={`Show testimonial ${index + 1}`}
            className={index === active ? 'active' : ''}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const validEmail = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email), [form.email]);

  const submit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !validEmail || form.message.trim().length < 10) {
      setStatus('Please add your name, a valid email, and a message of at least 10 characters.');
      return;
    }
    setStatus('Thank you. Mr. Rio will respond to your culinary request shortly.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="section contact">
      <div className="contact-panel" data-reveal>
        <p className="eyebrow">Contact</p>
        <h2>Reserve a private table or culinary consultation.</h2>
        <div className="contact-list">
          <a href="tel:+8801712345678">
            <Phone /> +880 1712 345 678
          </a>
          <a href="mailto:hello@mrrio.com">
            <Mail /> hello@mrrio.com
          </a>
          <span>
            <MapPin /> Gulshan Avenue, Dhaka
          </span>
        </div>
        <div className="socials">
          <a href="https://www.instagram.com/" aria-label="Instagram">
            <Camera />
          </a>
          <a href="https://www.facebook.com/" aria-label="Facebook">
            f
          </a>
          <a href="https://www.linkedin.com/" aria-label="LinkedIn">
            in
          </a>
        </div>
        <iframe
          title="Restaurant location map"
          src="https://www.google.com/maps?q=Gulshan%20Avenue%20Dhaka&output=embed"
          loading="lazy"
        />
      </div>
      <form className="contact-form" data-reveal onSubmit={submit} noValidate>
        <label>
          Name
          <input
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            placeholder="Your name"
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            placeholder="you@example.com"
          />
        </label>
        <label>
          Message
          <textarea
            value={form.message}
            onChange={(event) => setForm({ ...form, message: event.target.value })}
            placeholder="Tell us about your event, table request, or tasting menu."
          />
        </label>
        <button className="btn primary" type="submit">
          Send Request <Send size={18} />
        </button>
        {status && <p className="form-status">{status}</p>}
      </form>
    </section>
  );
}

function Preloader() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);
  return loading ? (
    <div className="preloader">
      <ChefHat />
      <span>Preparing the table</span>
    </div>
  ) : null;
}

function App() {
  useReveal();

  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Specialties />
        <Gallery />
        <Skills />
        <Testimonials />
        <Contact />
      </main>
      <footer>
        <ChefHat />
        <span>© 2026 Mr. Rio. Master Chef & Culinary Artist.</span>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
