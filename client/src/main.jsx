import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  Banknote,
  BookMarked,
  BookOpen,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  Clipboard,
  Compass,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  Home,
  Landmark,
  Languages,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Mic2,
  MoonStar,
  Phone,
  ScrollText,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Users,
  Video,
  X
} from 'lucide-react';
import './style.css';
import logo from './assets/logo-clean.png';
import flyerOne from './assets/1000475856.jpg';
import flyerTwo from './assets/1000475857.jpg';
import contactCard from './assets/1000475859.jpg';

const whatsappNumber = '2348068012244';
const phoneDisplay = '08068012244';
const email = 'lateefazeez1.aa@gmail.com';
const location = 'Siun-Ajura, along Lagos-Abeokuta Express Road';
const account = {
  bank: 'Union Bank of Nigeria',
  name: 'ABDULAZEEZ ABDULLATEEF',
  number: '0113442792'
};

const navLinks = [
  ['About', '#about'],
  ['Programmes', '#programmes'],
  ['Schedule', '#schedule'],
  ['Da’wah', '#dawah'],
  ['Support', '#support'],
  ['Register', '#register']
];

const programmes = [
  {
    icon: BookOpen,
    title: 'Qur’an Studies',
    text: 'A structured path for learners who want to read, recite, memorise and revise the Qur’an with confidence and discipline.',
    items: ['Arabic Alphabet (Qā’idah)', 'Qur’an Reading', 'Tajwīd', 'Qur’an Memorisation (Ḥifẓ)', 'Revision and Fluency Development', 'Selected Qur’anic Vocabulary']
  },
  {
    icon: Languages,
    title: 'Arabic Language',
    text: 'Arabic learning for students who need a strong foundation in reading, writing, grammar, expression and comprehension.',
    items: ['Reading and Writing', 'Grammar (Naḥw)', 'Morphology (Ṣarf)', 'Conversation', 'Composition', 'Literature', 'Translation Skills']
  },
  {
    icon: MoonStar,
    title: 'Islamic Studies',
    text: 'A balanced Islamic studies programme that strengthens creed, worship, manners and understanding of Islamic knowledge.',
    items: ['Tawḥīd', 'Fiqh', 'Sharī’ah', 'Hadith Studies', 'Tafsīr', 'Sīrah', 'Akhlāq', 'Daily Adhkār and Du’ā’']
  },
  {
    icon: GraduationCap,
    title: 'Academic Coaching',
    text: 'Focused preparation for students taking school, external and advanced examinations in Arabic and Islamic Studies.',
    items: ['WAEC Arabic', 'WAEC Islamic Studies', 'JAMB Arabic', 'JAMB Islamic Studies', 'GCE', 'A-Level', 'Diploma/Foundation Programmes', 'Advanced Islamic Sciences']
  }
];

const examTargets = ['WAEC Arabic', 'WAEC Islamic Studies (IRS)', 'JAMB Arabic', 'JAMB Islamic Studies', 'GCE Arabic & Islamic Studies', 'A-Level Arabic', 'A-Level Islamic Studies', 'Diploma & University Foundation Programmes'];
const learners = ['Children', 'Teenagers', 'Adults', 'Beginners', 'Advanced learners', 'Secondary school students', 'WAEC, NECO, GCE & JAMB candidates', 'A-Level students', 'University students', 'Teachers seeking improvement', 'New Muslims', 'Lifelong learners'];
const modes = [
  ['Live Online Classes', Video],
  ['Physical Classes', Home],
  ['One-to-One Tutorials', Users],
  ['Weekend Programmes', CalendarCheck],
  ['Small Interactive Groups', HeartHandshake],
  ['Flexible Timetable', Compass]
];
const whyChoose = ['Qualified and experienced instructors', 'Authentic Qur’an and Sunnah-based curriculum', 'Student-centred teaching approach', 'Strong academic and spiritual mentoring', 'Comprehensive examination preparation', 'Continuous assessment and progress monitoring', 'Flexible learning options', 'Affordable tuition with exceptional educational value'];
const values = [
  ['Ikhlāṣ', 'Sincerity'],
  ['‘Ilm', 'Knowledge'],
  ['Iḥsān', 'Excellence'],
  ['Amānah', 'Integrity'],
  ['Ḥikmah', 'Wisdom'],
  ['Discipline', 'Steadiness'],
  ['Raḥmah', 'Compassion'],
  ['Service', 'Service to Humanity']
];
const dawahServices = ['Public Islamic Lectures and Seminars', 'Friday (Jumu’ah) and Eid Sermons', 'Ramadan Lectures and Tafsīr Sessions', 'Marriage (Nikāḥ) Counselling and Family Guidance', 'Walīmah and Graduation Ceremonies', 'Qur’an Completion (Khatm al-Qur’an) Programmes', 'Islamic Conferences, Workshops and Symposia', 'Youth Development and Leadership Programmes', 'School and Campus Islamic Awareness Programmes', 'Educational Consultations in Arabic and Islamic Studies', 'Anchoring and Moderating Islamic Events and Ceremonies', 'Training Programmes for Islamic Schools, Teachers and Community Organisations'];
const supportWays = ['Cash Donations', 'Building Materials', 'Educational Materials and Furniture', 'Sponsorship of Specific Construction Phases'];

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.12 });
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function App() {
  useReveal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState('');
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    category: 'Children',
    programme: 'Qur’an Studies',
    level: 'Beginner',
    mode: 'Live Online Classes',
    schedule: 'Friday 8:00 p.m. – 10:00 p.m.',
    exam: 'Not exam-focused',
    message: ''
  });

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const registrationMessage = useMemo(() => {
    const message = `Assalamu Alaikum. I would like to register/enquire for Daar El-Mahfouz classes.\n\nName: ${form.name}\nPhone: ${form.phone}\nLearner category: ${form.category}\nProgramme: ${form.programme}\nCurrent level: ${form.level}\nPreferred mode: ${form.mode}\nPreferred schedule: ${form.schedule}\nExam target: ${form.exam}\nExtra message: ${form.message || 'None'}\n\nPlease guide me on the next steps.`;
    return encodeURIComponent(message);
  }, [form]);

  const copyText = async (label, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied(''), 1800);
    } catch {
      setCopied('Copy manually');
    }
  };

  const submitRegistration = (event) => {
    event.preventDefault();
    setSent(true);
    window.open(`https://wa.me/${whatsappNumber}?text=${registrationMessage}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <header className="siteHeader">
        <a className="brand" href="#home" aria-label="Daar El-Mahfouz home">
          <img src={logo} alt="Daar El-Mahfouz logo" />
          <span>Daar El-Mahfouz</span>
        </a>
        <button className="menuButton" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation menu">
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={menuOpen ? 'open' : ''} onClick={() => setMenuOpen(false)}>
          {navLinks.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
          <a className="navCta" href={`https://wa.me/${whatsappNumber}`}>WhatsApp</a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero patternSection">
          <div className="heroCopy reveal">
            <p className="arabicTitle">دار المحفوظ للدعوة والحذاقة الدينية</p>
            <p className="eyebrow">Da’wah • Islamic Scholarship • Arabic Education</p>
            <h1>Educating Minds, Nurturing Faith, Building Character.</h1>
            <p className="lead">Daar El-Mahfouz helps children, youths and adults grow through Qur’an studies, Arabic language, Islamic knowledge and academic coaching, with learning options designed for different levels and schedules.</p>
            <div className="heroActions">
              <a className="primaryBtn" href="#register">Begin Registration <ArrowRight /></a>
              <a className="secondaryBtn" href="#programmes">View Programmes</a>
            </div>
            <div className="trustStrip" aria-label="Main learning options">
              <span><BookOpen /> Qur’an</span>
              <span><Languages /> Arabic</span>
              <span><MoonStar /> Islamic Studies</span>
              <span><GraduationCap /> Exam Coaching</span>
            </div>
          </div>
          <div className="heroVisual reveal delayOne">
            <div className="logoBadge">
              <img src={logo} alt="Daar El-Mahfouz logo" />
            </div>
            <div className="heroCard">
              <img src={flyerTwo} alt="Daar El-Mahfouz online classes flyer" />
              <div className="heroCardText">
                <span>Admission is open</span>
                <strong>Online and physical learning available</strong>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section splitSection aboutSection">
          <div className="reveal">
            <p className="eyebrow">About the Institution</p>
            <h2>A centre for Qur’an, Arabic and Islamic education.</h2>
            <p>Daar El-Mahfouz for Da’wah and Islamic Scholarship is dedicated to comprehensive instruction in the Qur’an, Arabic Language, Islamic Studies and related disciplines. The institution is built around sound Islamic knowledge, academic excellence, good character and service to Allah and humanity.</p>
            <p>Its programmes are structured for children, youths and adults, with teaching methods that support learners at different stages of their educational journey.</p>
          </div>
          <div className="identityPanel reveal delayOne">
            <img src={logo} alt="Daar El-Mahfouz identity" />
            <span>Daar El-Mahfouz for Da’wah and Islamic Scholarship</span>
            <strong>“Building Lives Upon the Qur’an and the Sunnah.”</strong>
          </div>
        </section>

        <section className="section visionMission patternSection">
          <div className="sectionIntro reveal">
            <p className="eyebrow center">Vision & Mission</p>
            <h2 className="center">Knowledge that shapes faith, character and community.</h2>
          </div>
          <div className="twoCards">
            <article className="statementCard reveal">
              <Target />
              <h3>Our Vision</h3>
              <p>To become a leading centre of excellence in Islamic and Arabic education, producing knowledgeable, morally upright and intellectually empowered Muslims who contribute positively to their communities and the wider society.</p>
            </article>
            <article className="statementCard reveal delayOne">
              <Sparkles />
              <h3>Our Mission</h3>
              <ul>
                <li>Provide authentic Islamic education based on the Qur’an and the Sunnah.</li>
                <li>Develop proficiency in Qur’anic recitation, memorisation and Arabic language.</li>
                <li>Prepare students for excellence in Arabic and Islamic Studies examinations.</li>
                <li>Cultivate sound faith, noble character and responsible citizenship.</li>
                <li>Inspire lifelong learning, leadership and service to humanity.</li>
              </ul>
            </article>
          </div>
        </section>

        <section id="programmes" className="section programmesSection">
          <div className="sectionIntro reveal">
            <p className="eyebrow center">Academic Programmes</p>
            <h2 className="center">Structured learning paths for every stage.</h2>
            <p className="center wideText">Students can begin from the basics or continue from their current level. Each programme is designed to build understanding, fluency, discipline and confidence over time.</p>
          </div>
          <div className="programmeGrid">
            {programmes.map((programme, index) => {
              const Icon = programme.icon;
              return (
                <article className="programmeCard reveal" style={{ '--delay': `${index * 70}ms` }} key={programme.title}>
                  <div className="iconWrap"><Icon /></div>
                  <h3>{programme.title}</h3>
                  <p>{programme.text}</p>
                  <ul>
                    {programme.items.map((item) => <li key={item}><CheckCircle2 /> {item}</li>)}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section examSection splitSection">
          <div className="reveal">
            <p className="eyebrow">Examination Preparation</p>
            <h2>Coaching for Arabic and Islamic Studies examinations.</h2>
            <p>Daar El-Mahfouz prepares students for school, external and advanced examinations with focused academic support, revision, assessment and guidance.</p>
            <div className="pillGrid">
              {examTargets.map((target) => <span key={target}><GraduationCap /> {target}</span>)}
            </div>
          </div>
          <div className="examPanel reveal delayOne">
            <ScrollText />
            <h3>For students who want more than casual lessons.</h3>
            <p>Coaching is arranged to help learners strengthen topic understanding, improve exam confidence and build steady performance in Arabic and Islamic Studies.</p>
          </div>
        </section>

        <section className="section enrolSection patternSection">
          <div className="sectionIntro reveal">
            <p className="eyebrow center">Who May Enrol?</p>
            <h2 className="center">Open to learners at different ages and levels.</h2>
          </div>
          <div className="learnerGrid">
            {learners.map((learner) => <span className="learnerPill reveal" key={learner}><Users /> {learner}</span>)}
          </div>
        </section>

        <section className="section modesSection">
          <div className="sectionIntro reveal">
            <p className="eyebrow center">Mode of Instruction</p>
            <h2 className="center">Flexible learning that fits real life.</h2>
            <p className="center wideText">Classes may be arranged online, physically, individually or in small groups depending on the student’s level, location and availability.</p>
          </div>
          <div className="modeGrid">
            {modes.map(([mode, Icon]) => <article className="modeCard reveal" key={mode}><Icon /><h3>{mode}</h3></article>)}
          </div>
        </section>

        <section id="schedule" className="section scheduleSection splitSection patternSection">
          <div className="reveal">
            <p className="eyebrow">Class Schedule & Tuition</p>
            <h2>Regular learning periods with room for special arrangements.</h2>
            <p>Class times are listed in Nigeria Time. Additional classes may be arranged by mutual agreement when a student needs a different schedule.</p>
            <div className="scheduleList">
              <article><span>Friday</span><strong>8:00 p.m. – 10:00 p.m.</strong></article>
              <article><span>Saturday</span><strong>8:00 p.m. – 10:00 p.m.</strong></article>
              <article><span>Saturday & Sunday</span><strong>3:00 p.m. – 8:15 p.m.</strong></article>
            </div>
          </div>
          <div className="pricingCard reveal delayOne">
            <span className="priceLabel">Monthly Tuition</span>
            <strong className="price">₦25,000</strong>
            <p>Per student, per month. Tuition provides access to quality instruction, continuous academic support, regular assessments and personalised guidance throughout the learning programme.</p>
            <div className="accountBox">
              <h3>Payment Details</h3>
              <p><b>Bank:</b> {account.bank}</p>
              <p><b>Account Name:</b> {account.name}</p>
              <p><b>Account Number:</b> {account.number}</p>
              <button onClick={() => copyText('payment', `${account.bank}\n${account.name}\n${account.number}`)}><Clipboard /> {copied === 'payment' ? 'Copied' : 'Copy payment details'}</button>
            </div>
          </div>
        </section>

        <section className="section whySection">
          <div className="sectionIntro reveal">
            <p className="eyebrow center">Why Choose Daar El-Mahfouz?</p>
            <h2 className="center">A learning environment built on trust and excellence.</h2>
          </div>
          <div className="whyGrid">
            {whyChoose.map((item, index) => <article className="whyCard reveal" style={{ '--delay': `${index * 45}ms` }} key={item}><ShieldCheck /><span>{item}</span></article>)}
          </div>
        </section>

        <section className="section valuesSection patternSection">
          <div className="sectionIntro reveal">
            <p className="eyebrow center">Core Values</p>
            <h2 className="center">The principles behind the work.</h2>
          </div>
          <div className="valuesGrid">
            {values.map(([arabic, english]) => <article className="valueCard reveal" key={arabic}><strong>{arabic}</strong><span>{english}</span></article>)}
          </div>
        </section>

        <section className="section admissionCta">
          <div className="admissionBox reveal">
            <p className="eyebrow center">Admission Is Now Open</p>
            <h2>Begin your journey towards knowledge and excellence today.</h2>
            <p>Whether your goal is to read the Qur’an fluently, master the Arabic language, excel in WAEC or JAMB, pursue advanced Islamic studies or strengthen your understanding of Islam, Daar El-Mahfouz provides the guidance and academic support you need to succeed.</p>
            <a className="primaryBtn" href="#register">Register Now <ArrowRight /></a>
          </div>
        </section>

        <section id="dawah" className="section dawahSection splitSection patternSection">
          <div className="reveal">
            <p className="eyebrow">Da’wah & Educational Services</p>
            <h2>Beyond classroom learning.</h2>
            <p>Daar El-Mahfouz also contributes to Islamic education and community development through lectures, counselling, programmes, workshops and educational consultation.</p>
            <div className="dawahImageWrap">
              <img src={flyerOne} alt="Daar El-Mahfouz class flyer" />
            </div>
          </div>
          <div className="serviceGrid reveal delayOne">
            {dawahServices.map((service) => <span key={service}><Mic2 /> {service}</span>)}
          </div>
        </section>

        <section id="support" className="section supportSection splitSection">
          <div className="supportPanel reveal">
            <p className="eyebrow">Support Our Vision</p>
            <h2>Permanent Madrasah and Masjid Project.</h2>
            <p>Daar El-Mahfouz is undertaking the construction of a permanent Madrasah and Masjid at its designated site in Abeokuta, Ogun State, Nigeria.</p>
            <p>Support from philanthropists, charitable organisations, corporate bodies and well-wishers will help establish a lasting centre for Qur’anic education, Islamic scholarship, da’wah and community development.</p>
            <div className="quoteBox">“Whoever builds a mosque for Allah, Allah will build for him a house in Paradise.”</div>
          </div>
          <div className="donationCard reveal delayOne">
            <HandHeart />
            <h3>How You Can Support</h3>
            <ul>
              {supportWays.map((way) => <li key={way}><CheckCircle2 /> {way}</li>)}
            </ul>
            <div className="accountBox donation">
              <h3>Project Donation Account</h3>
              <p><b>Bank:</b> {account.bank}</p>
              <p><b>Account Name:</b> {account.name}</p>
              <p><b>Account Number:</b> {account.number}</p>
              <button onClick={() => copyText('donation', `${account.bank}\n${account.name}\n${account.number}`)}><Clipboard /> {copied === 'donation' ? 'Copied' : 'Copy donation details'}</button>
            </div>
          </div>
        </section>

        <section id="founder" className="section founderSection patternSection">
          <div className="founderPlaceholder reveal">
            <div>
              <p className="eyebrow">Founder</p>
              <h2>Founder profile will be added soon.</h2>
              <p>This section is intentionally reserved for the founder’s biography, message, qualifications, teaching background and vision. Once the owner provides the details, it can be added without changing the rest of the site structure.</p>
            </div>
            <div className="emptyProfile">
              <Landmark />
              <span>Reserved for founder details</span>
            </div>
          </div>
        </section>

        <section id="register" className="section registerSection splitSection">
          <div className="reveal">
            <p className="eyebrow">Registration & Enquiries</p>
            <h2>Send your details directly to WhatsApp.</h2>
            <p>Complete the form below. Your information will open in WhatsApp as a ready message, so you can review it and press send.</p>
            <div className="contactStack">
              <a href={`tel:${phoneDisplay}`}><Phone /> {phoneDisplay}</a>
              <a href={`https://wa.me/${whatsappNumber}`}><MessageCircle /> WhatsApp: {phoneDisplay}</a>
              <a href={`mailto:${email}`}><Mail /> {email}</a>
              <span><MapPin /> {location}</span>
            </div>
            <img className="contactCard" src={contactCard} alt="Daar El-Mahfouz contact card" />
          </div>
          <form className="registerForm reveal delayOne" onSubmit={submitRegistration}>
            <div className="formRow">
              <label>Full name<input required name="name" value={form.name} onChange={update} placeholder="Enter full name" /></label>
              <label>Phone number<input required name="phone" value={form.phone} onChange={update} placeholder="Your WhatsApp/phone number" /></label>
            </div>
            <label>Learner category<select name="category" value={form.category} onChange={update}>{learners.map((learner) => <option key={learner}>{learner}</option>)}</select></label>
            <label>Programme<select name="programme" value={form.programme} onChange={update}>{programmes.map((programme) => <option key={programme.title}>{programme.title}</option>)}</select></label>
            <div className="formRow">
              <label>Current level<select name="level" value={form.level} onChange={update}><option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>Not sure yet</option></select></label>
              <label>Preferred mode<select name="mode" value={form.mode} onChange={update}>{modes.map(([mode]) => <option key={mode}>{mode}</option>)}</select></label>
            </div>
            <label>Preferred schedule<select name="schedule" value={form.schedule} onChange={update}><option>Friday 8:00 p.m. – 10:00 p.m.</option><option>Saturday 8:00 p.m. – 10:00 p.m.</option><option>Saturday & Sunday 3:00 p.m. – 8:15 p.m.</option><option>I need a special arrangement</option></select></label>
            <label>Exam target<select name="exam" value={form.exam} onChange={update}><option>Not exam-focused</option>{examTargets.map((target) => <option key={target}>{target}</option>)}</select></label>
            <label>Extra message<textarea name="message" value={form.message} onChange={update} placeholder="Mention any learning goal, preferred timing, age of learner, or special request."></textarea></label>
            <button type="submit" className="submitBtn"><Send /> Open WhatsApp Message</button>
            {sent && <p className="successMsg"><CheckCircle2 /> WhatsApp opened. Review the message and press send there.</p>}
          </form>
        </section>
      </main>

      <footer className="footer">
        <img src={logo} alt="Daar El-Mahfouz logo" />
        <h3>Daar El-Mahfouz</h3>
        <p>For Da’wah and Islamic Scholarship</p>
        <div className="footerLinks">
          {navLinks.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        </div>
        <div className="footerContact">
          <span><Phone /> {phoneDisplay}</span>
          <span><Mail /> {email}</span>
          <span><MapPin /> {location}</span>
        </div>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
