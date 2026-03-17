

/* ================================================================
   UTILITY
================================================================ */
document.getElementById('fyear').textContent = new Date().getFullYear();

/* ================================================================
   NAVBAR
================================================================ */
const navWrap   = document.getElementById('navWrap');
const navBurger = document.getElementById('navBurger');
const navMobile = document.getElementById('navMobile');

window.addEventListener('scroll', () => {
  navWrap.classList.toggle('scrolled', window.scrollY > 60);

  // active link highlight
  const sections = document.querySelectorAll('section[id], div[id]');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

navBurger.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});

// close mobile nav on link click
document.querySelectorAll('.nav-mobile a').forEach(a => {
  a.addEventListener('click', () => navMobile.classList.remove('open'));
});

/* ================================================================
   SCROLL REVEAL
================================================================ */
const ro = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); }
  });
}, { threshold: 0.10 });

document.querySelectorAll('.reveal, .stagger').forEach(el => ro.observe(el));

/* ================================================================
   TABS
================================================================ */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const pane = document.getElementById(btn.dataset.tab);
    pane.classList.add('active');
    // re-trigger stagger
    pane.querySelectorAll('.stagger').forEach(s => {
      s.classList.remove('visible');
      setTimeout(() => ro.observe(s), 10);
    });
  });
});

/* ================================================================
   PROJECTS
================================================================ */
const projects = [
  {
    tag:'Website', title:'ETERNA NL', year:'', live:'https://eternanl.com/',
    desc:'Developed and maintained a full-featured business website for ETERNA NL, delivering a polished online presence with fast load times, responsive layouts, and a design that reflects the brand\'s identity. Increased client reach and productivity by 10%.',
    pills:['React','Node.js','Vercel','Javascript','SEO','SaaS'],
    main:'img/Eterna/Eterna4.png',
    shots:['img/Eterna/Eterna1.png','img/Eterna/Eterna2.png','img/Eterna/Eterna3.png','img/Eterna/Eterna5.png','img/Eterna/Eterna6.png']
  },
  {
    tag:'Automation', title:'Standard Healthcare', year:'', live:'https://standardhealthcareplus.com/',
    desc:'Designed and implemented an AI-powered chatbot automation on the Standard Healthcare platform, reducing patient wait times and enhancing support efficiency. The chatbot intelligently provides instant responses, resulting in quicker consultations.',
    pills:['TypeScript','SaaS','Conversational AI','CRM','React'],
    main:'img/SHC/shc1.png',
    shots:['img/SHC/shc2.png','img/SHC/shc3.png','img/SHC/shc4.png','img/SHC/shc5.png']
  },
  {
    tag:'Automation', title:'Bistro 64', year:'', live:'https://bistro64.aboova.com/',
    desc:'Collaborated with a team to automate key operational processes on their platform. Implemented feedback automation tool by integrated third-party APIs, and reduced repetitive manual tasks — converting more leads into clients.',
    pills:['Node.js','Aws','CRM','REST API','Automation','CI/CD','SaaS'],
    main:'img/Bistro/bistro1.png',
    shots:['img/Bistro/bistro2.png','img/Bistro/bistro3.png','img/Bistro/bistro4.png',]
  },
  {
    tag:'AI / SaaS', title:'Yman Auto', year:'', live:'https://ymanautosalesllc.com/',
    desc:'Built an end-to-end automated lead nurturing and sales pipeline for Aboova Digital Solutions, integrating AI/LLM tools for personalized outreach. The system boosted lead generation by 10% and improved overall business performance by 30%.',
    pills:['GoHighlevel','TypeScript','AWS','AI','CRM Integration'],
    main:'img/Yman Auto/yman1.png',
    shots:['img/Yman Auto/yman2.png','img/Yman Auto/yman3.png','img/Yman Auto/yman4.png','img/Yman Auto/yman5.png']
  },
  {
    tag:'Website', title:'BOBA-DC', year:'', live:'https://bobadc.org/',
    desc:'Architected a production-ready, cloud-native backend infrastructure for a high-traffic SaaS product. Designed for horizontal scalability with containerized microservices, load balancing, automated deployments, and zero-downtime rollouts.',
    pills:['AWS','SaaS','Node.js','MongoDB','GoHighlevel'],
    main:'img/Boba-DC/boba1.png',
    shots:['img/Boba-DC/boba2.png','img/Boba-DC/boba3.png','img/Boba-DC/boba4.png','img/Boba-DC/boba5.png']
  },
  {
    tag:'Website', title:'Cleanso Therapy', year:'', live:'https://ctpoglobal.com/',
    desc:'Delivered a sleek, minimalistic, and fast full-stack web platform for Cleanso Therapy. Its creative design direction, clean codebase, and the seamless developer-client collaboration was greatly appreciated throughout the entire build.',
    pills:['React','Node.js','TypeScript','REST API','Javascript'],
    main:'img/CTPO/ctpo1.png',
    shots:['img/CTPO/ctpo2.png','img/CTPO/ctpo3.png','img/CTPO/ctpo4.png','img/CTPO/ctpo5.png','img/CTPO/ctpo6.png']
  }
];

function openProject(i) {
  const p = projects[i];
  document.getElementById('d-tag').textContent   = p.tag;
  document.getElementById('d-title').textContent  = p.title;
  document.getElementById('d-desc').textContent   = p.desc;
  document.getElementById('d-img').src            = p.main;
  document.getElementById('d-img').alt            = p.title;
  document.getElementById('d-live').href          = p.live;
  document.getElementById('d-pills').innerHTML    = p.pills.map(t=>`<span class="d-pill">${t}</span>`).join('');
  document.getElementById('d-shots').innerHTML    = p.shots.map(s=>`<div class="shot-item" onclick="openLb('${s}')"><img src="${s}" alt="Screenshot" loading="lazy"></div>`).join('');

  document.getElementById('projects-grid').style.display = 'none';
  const det = document.getElementById('project-detail');
  det.classList.add('open');
  window.scrollTo({ top: document.getElementById('projects').offsetTop - 80, behavior:'smooth' });
}

function closeProject() {
  document.getElementById('project-detail').classList.remove('open');
  document.getElementById('projects-grid').style.display = 'grid';
  window.scrollTo({ top: document.getElementById('projects').offsetTop - 80, behavior:'smooth' });
}

/* ================================================================
   LIGHTBOX
================================================================ */
function openLb(src) {
  document.getElementById('lbImg').src = src;
  document.getElementById('lbOverlay').classList.add('open');
}
function closeLb() {
  document.getElementById('lbOverlay').classList.remove('open');
}
document.addEventListener('keydown', e => { if(e.key==='Escape') closeLb(); });

/* ================================================================
   BACK TO TOP
================================================================ */
const btt = document.getElementById('back-to-top');
window.addEventListener('scroll', () => { btt.style.display = window.scrollY>500?'block':'none'; });
btt.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

/* ================================================================
   CONTACT FORM (EmailJS)
================================================================ */
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('.form-submit');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  emailjs.sendForm('service_aj3l70b', 'template_8e99o5c', this)
    .then(() => {
      btn.textContent = '✓ Sent!';
      btn.style.background = '#16a34a';
      this.reset();
      setTimeout(() => {
        btn.innerHTML = '<i class="fa fa-paper-plane"></i> Send Message';
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    })
    .catch(() => {
      btn.textContent = 'Error – try again';
      btn.style.background = '#dc2626';
      btn.disabled = false;
    });
});