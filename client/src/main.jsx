import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Phone, Mail, MapPin, MessageCircle, BookOpen, Users, Star, Clock, Menu, X, Send, CheckCircle2, ShieldCheck, GraduationCap, CalendarCheck, Sparkles, Globe2, Video, Home, HeartHandshake, ListChecks, PenLine, BookMarked, Compass, UserRound } from 'lucide-react';
import './style.css';
import flyerOne from './assets/1000475856.jpg';
import cardImg from './assets/1000475859.jpg';
import logoClean from './assets/logo-clean.png';
import flyerTwo from './assets/1000475857.jpg';

const ownerWhatsapp = '2348068012244';
const phone = '+2348068012244';
const email = 'lateefazeez1.aa@gmail.com';
const address = '6, Mufutau Shobola Street, Haruna Bus Stop, Ifako-Ijaiye, Lagos';
const whatsappLink = `https://wa.me/${ownerWhatsapp}`;

const courses = [
  {
    title: 'Qur’an Recitation with Tajweed',
    desc: 'Learn correct pronunciation, fluency, makhraj, rhythm and the rules that guide beautiful Qur’an recitation.',
    points: ['Letter pronunciation', 'Tajweed correction', 'Fluency practice', 'Guided recitation']
  },
  {
    title: 'Qur’an Memorization',
    desc: 'Structured memorization support with revision, consistency, accountability and a pace suitable for the learner.',
    points: ['Daily/weekly targets', 'Revision support', 'Mistake correction', 'Retention method']
  },
  {
    title: 'Arabic Language',
    desc: 'Build Arabic reading, writing and understanding from the basics, with steady lessons for beginners and improvers.',
    points: ['Arabic letters', 'Reading practice', 'Writing support', 'Basic comprehension']
  },
  {
    title: 'Islamic Education & Ethics',
    desc: 'Learn practical Islamic knowledge, manners, values and daily-life guidance in a clear and structured way.',
    points: ['Islamic manners', 'Daily guidance', 'Ethics and values', 'Foundational knowledge']
  }
];

function App() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    course: 'Qur’an Recitation with Tajweed',
    mode: 'Online',
    learner: 'Myself',
    time: '',
    message: ''
  });

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const whatsappMessage = useMemo(() => {
    return `Assalamu Alaikum. I want to register for Daar El-Mahfouz classes.%0A%0AName: ${encodeURIComponent(form.name)}%0APhone: ${encodeURIComponent(form.phone)}%0AEmail: ${encodeURIComponent(form.email || 'Not provided')}%0AClass: ${encodeURIComponent(form.course)}%0AMode: ${encodeURIComponent(form.mode)}%0ALearner: ${encodeURIComponent(form.learner)}%0APreferred time/days: ${encodeURIComponent(form.time || 'Not specified')}%0AExtra message: ${encodeURIComponent(form.message || 'No extra message')}`;
  }, [form]);

  function submit(e) {
    e.preventDefault();
    setSent(true);
    window.open(`https://wa.me/${ownerWhatsapp}?text=${whatsappMessage}`, '_blank', 'noopener,noreferrer');
  }

  return <>
    <header className="nav">
      <a className="brand" href="#home" aria-label="Daar El-Mahfouz home">
        <img src={logoClean} alt="Daar El-Mahfouz logo" />
        <span>Daar El-Mahfouz</span>
      </a>
      <button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
      <nav className={open ? 'show' : ''} onClick={() => setOpen(false)}>
        <a href="#about">About</a>
        <a href="#classes">Classes</a>
        <a href="#method">Method</a>
        <a href="#founder">Founder</a>
        <a href="#register">Register</a>
        <a className="navBtn" href={whatsappLink}>WhatsApp</a>
      </nav>
    </header>

    <main>
      <section id="home" className="hero">
        <div className="heroText reveal">
          <p className="eyebrow">Online & Physical Islamic Learning</p>
          <h1>Qur’an, Arabic & Islamic Studies Classes</h1>
          <p className="lead">Daar El-Mahfouz provides structured learning for Qur’an recitation with Tajweed, Qur’an memorization, Arabic language, Islamic education and ethics, with flexible timing for learners in Nigeria and the UK time zone.</p>
          <div className="actions">
            <a className="primary" href="#register">Register Now</a>
            <a className="secondary" href={whatsappLink}><MessageCircle size={18} /> Chat on WhatsApp</a>
          </div>
          <div className="heroBadges">
            <span><Video /> Zoom & Telegram</span>
            <span><Home /> Physical classes</span>
            <span><CalendarCheck /> Flexible schedule</span>
          </div>
        </div>
        <div className="heroVisual reveal delay">
          <div className="logoOrb"><img src={logoClean} alt="Daar El-Mahfouz logo" /></div>
          <img className="heroFlyer" src={flyerTwo} alt="Online Qur’an, Arabic and Islamic Studies flyer" />
        </div>
      </section>

      <section id="about" className="section split about">
        <div className="reveal">
          <p className="eyebrow">For Da’wah & Guidance</p>
          <h2>Awareness, learning and guidance in one clean place.</h2>
          <p>Daar El-Mahfouz is focused on making Qur’an, Arabic and Islamic education easier to access through online and arranged physical classes. The site helps visitors understand the classes, contact the school quickly and register without stress.</p>
          <p>The goal is simple: give learners a clear path to start, continue and improve their Islamic learning with proper guidance, flexible communication and organized class options.</p>
          <div className="miniStats">
            <span><ShieldCheck /> Islamic ethics</span>
            <span><CalendarCheck /> Flexible timing</span>
            <span><Users /> Online & physical</span>
            <span><Globe2 /> Nigeria & UK timezone</span>
          </div>
        </div>
        <div className="aboutCard reveal delay">
          <img src={logoClean} alt="Daar El-Mahfouz logo" />
          <p>Daar El-Mahfouz for Da’wah & Guidance</p>
        </div>
      </section>

      <section id="classes" className="section classes">
        <p className="eyebrow center">Our Classes</p>
        <h2 className="center">What students can register for</h2>
        <p className="center wide">Each class is arranged to help learners build confidence step by step. Students can choose online classes, physical classes or both depending on their timing and location.</p>
        <div className="grid detailedGrid">
          {courses.map((course) => <article className="classCard reveal" key={course.title}>
            <BookOpen />
            <h3>{course.title}</h3>
            <p>{course.desc}</p>
            <ul>
              {course.points.map((point) => <li key={point}><CheckCircle2 /> {point}</li>)}
            </ul>
          </article>)}
        </div>
      </section>

      <section id="method" className="section method">
        <div className="sectionIntro reveal">
          <p className="eyebrow center">How Learning Works</p>
          <h2 className="center">A simple path from registration to steady learning.</h2>
        </div>
        <div className="steps">
          <article className="step reveal"><span>01</span><PenLine /><h3>Register your interest</h3><p>Fill the form with your name, preferred class, learning mode and suitable time. The details open directly in WhatsApp for easy sending.</p></article>
          <article className="step reveal"><span>02</span><MessageCircle /><h3>Get contacted</h3><p>The owner receives your details and can reply on WhatsApp to confirm timing, class mode and the best starting point for the learner.</p></article>
          <article className="step reveal"><span>03</span><BookMarked /><h3>Start structured lessons</h3><p>Lessons are arranged through Zoom, Telegram or physical class scheduling, depending on what works best for the student.</p></article>
          <article className="step reveal"><span>04</span><ListChecks /><h3>Continue with guidance</h3><p>Students learn with correction, revision and consistent follow-up so progress becomes easier to track and maintain.</p></article>
        </div>
      </section>

      <section className="section learning split">
        <div className="reveal">
          <p className="eyebrow">Why Choose This Class?</p>
          <h2>Built for learners who need structure, patience and clarity.</h2>
          <p>The classes are suitable for beginners, children, teenagers and adults who want a guided learning process instead of scattered lessons. The focus is not only on finishing topics, but on helping students understand, revise and improve properly.</p>
          <div className="featureList">
            <span><HeartHandshake /> Patient teaching approach</span>
            <span><Compass /> Clear learning direction</span>
            <span><Clock /> Flexible class arrangement</span>
            <span><Sparkles /> Clean and simple communication</span>
          </div>
        </div>
        <div className="posterStack reveal delay">
          <img src={flyerOne} alt="Class information flyer" />
          <img src={flyerTwo} alt="Online class flyer" />
        </div>
      </section>

      <section id="founder" className="section split founder">
        <div className="founderCard reveal"><img src={cardImg} alt="Founder contact card" /></div>
        <div className="reveal delay">
          <p className="eyebrow">Founder</p>
          <h2>Founder profile coming soon</h2>
          <p>This section is reserved for the founder’s full biography, mission, vision and personal introduction. It can be updated once the owner provides the preferred details.</p>
          <div className="blankFounder">
            <UserRound />
            <div>
              <strong>Pending founder write-up</strong>
              <span>Biography, experience, mission statement and message to students will be added here.</span>
            </div>
          </div>
          <div className="contactRows">
            <a href={`tel:${phone}`}><Phone /> {phone}</a>
            <a href={`mailto:${email}`}><Mail /> {email}</a>
            <span><MapPin /> {address}</span>
          </div>
        </div>
      </section>

      <section className="section highlight">
        <div className="reveal"><Clock /><h3>Flexible schedule</h3><p>Online classes through Zoom and Telegram, with physical classes arranged around suitable timing.</p></div>
        <div className="reveal"><GraduationCap /><h3>Beginner friendly</h3><p>Suitable for learners who want structured Qur’an, Arabic and Islamic education support.</p></div>
        <div className="reveal"><Star /><h3>Direct registration</h3><p>Students can submit details and send them straight to the owner’s WhatsApp.</p></div>
      </section>

      <section id="register" className="section split register">
        <div className="reveal">
          <p className="eyebrow">Registration</p>
          <h2>Register your interest</h2>
          <p>Fill this form. Your details will open inside WhatsApp already typed, then you only need to press send.</p>
          <div className="registrationNotes">
            <span><CheckCircle2 /> No account needed</span>
            <span><CheckCircle2 /> No payment on the website</span>
            <span><CheckCircle2 /> Details go straight to WhatsApp</span>
          </div>
        </div>
        <form onSubmit={submit} className="reveal delay">
          <input name="name" placeholder="Full name" value={form.name} onChange={update} required />
          <input name="phone" placeholder="Phone / WhatsApp number" value={form.phone} onChange={update} required />
          <input name="email" type="email" placeholder="Email address (optional)" value={form.email} onChange={update} />
          <select name="course" value={form.course} onChange={update}>
            {courses.map((course) => <option key={course.title}>{course.title}</option>)}
          </select>
          <select name="mode" value={form.mode} onChange={update}>
            <option>Online</option>
            <option>Physical</option>
            <option>Both</option>
          </select>
          <select name="learner" value={form.learner} onChange={update}>
            <option>Myself</option>
            <option>My child</option>
            <option>My sibling</option>
            <option>Someone else</option>
          </select>
          <input name="time" placeholder="Preferred time / days" value={form.time} onChange={update} />
          <textarea name="message" placeholder="Extra message" value={form.message} onChange={update}></textarea>
          <button type="submit"><Send size={18} /> Send Registration to WhatsApp</button>
          {sent && <p className="ok"><CheckCircle2 /> WhatsApp opened. Press send there to complete registration.</p>}
        </form>
      </section>
    </main>

    <footer>
      <img src={logoClean} alt="Daar El-Mahfouz logo" />
      <p>Daar El-Mahfouz for Da’wah & Guidance</p>
      <div className="footerLinks">
        <a href="#about">About</a>
        <a href="#classes">Classes</a>
        <a href="#founder">Founder</a>
        <a href="#register">Register</a>
      </div>
      <a href={whatsappLink}>Call / WhatsApp: {phone}</a>
    </footer>
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
