// ==========================================
// 1. Dark Mode / Theme Toggle
// ==========================================
const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

// Set user preference if stored
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);
} else {
  // Default to light mode
  document.documentElement.setAttribute('data-theme', 'light');
}

themeToggleBtn.addEventListener('click', () => {
  let theme = document.documentElement.getAttribute('data-theme');
  let newTheme = theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  const sunIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
    </svg>`;
  const moonIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12.3 22c5.07 0 9.2-3.79 9.7-8.63.12-1.22-.96-2.18-2.13-1.83-3.07.93-6.24-1.2-6.75-4.35-.24-1.52.75-2.85 2.18-3.07.69-.11 1-.84.62-1.39C14.47 1.8 12.8 1 11 1 5.48 1 1 5.48 1 11s4.48 10 10 10c.44 0 .87-.03 1.3-.1z"/>
    </svg>`;
  themeToggleBtn.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
}

// ==========================================
// 2. Responsive Navigation Menu (Hamburger)
// ==========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

// Header Scrolled styling & active link highlight
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Highlight active nav link on scroll
  let current = '';
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - 150)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ==========================================
// 3. Scroll Reveal Animation
// ==========================================
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 150;
    if (elementTop < window.innerHeight - revealPoint) {
      element.classList.add('active');
    }
  });
};
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll); // run once on load

// ==========================================
// 4. Interactive Quiz (Travel Style Finder)
// ==========================================
const quizSteps = document.querySelectorAll('.quiz-step');
const progressBar = document.getElementById('quiz-progress');
const quizAnswers = {
  healing: 0,
  culture: 0,
  history: 0
};

let currentStep = 0;

function selectOption(category) {
  // Add to score
  quizAnswers[category]++;
  
  // Advance to next step
  quizSteps[currentStep].classList.remove('active');
  currentStep++;
  
  // Update Progress Bar
  const progressPercent = (currentStep / (quizSteps.length - 1)) * 100;
  progressBar.style.width = `${progressPercent}%`;

  if (currentStep < quizSteps.length - 1) {
    quizSteps[currentStep].classList.add('active');
  } else {
    showQuizResult();
  }
}

function showQuizResult() {
  const resultStep = document.getElementById('quiz-result');
  const resultTitle = resultStep.querySelector('.quiz-result-title');
  const resultDesc = resultStep.querySelector('.quiz-result-desc');
  const resultBadge = resultStep.querySelector('.quiz-result-badge');
  const resultImg = resultStep.querySelector('.quiz-result-img');
  const attractionName = resultStep.querySelector('.quiz-result-info h4');
  const attractionDesc = resultStep.querySelector('.quiz-result-info p');
  
  // Determine highest score
  let maxScore = -1;
  let styleType = 'healing';
  
  for (const [key, value] of Object.entries(quizAnswers)) {
    if (value > maxScore) {
      maxScore = value;
      styleType = key;
    }
  }
  
  // Custom results based on type
  if (styleType === 'healing') {
    resultTitle.textContent = "자연과의 온전한 호흡, 힐링 트래블러";
    resultBadge.textContent = "숲과 맑은 공기가 필요한 타입";
    resultDesc.textContent = "복잡한 생각은 멈추고, 자연의 소리에 귀 기울이며 지친 일상 속 진정한 휴식을 원하는 분에게 추천합니다.";
    resultImg.src = "assets/dutayeon.png";
    resultImg.alt = "두타연";
    attractionName.textContent = "두타연 계곡";
    attractionDesc.textContent = "60여 년간 숨겨져 온 신비의 자연 생태계와 맑은 물이 흐르는 두타연 계곡에서 조용한 사색의 힐링을 체험해 보세요.";
  } else if (styleType === 'culture') {
    resultTitle.textContent = "감성과 예술의 탐색가, 컬처 트래블러";
    resultBadge.textContent = "문화와 아름다움을 사랑하는 타입";
    resultDesc.textContent = "인간 본연의 아름다움과 예술적 영감을 발견하는 여정을 원하며, 깊이 있는 시선으로 세상을 바라보는 예술 탐험가에 어울립니다.";
    resultImg.src = "assets/museum.png"; // We can also use Park Soo-keun museum if available, let's fall back gracefully or show stars
    resultImg.alt = "박수근미술관";
    attractionName.textContent = "국토정중앙천문대 & 박수근미술관";
    attractionDesc.textContent = "한국 현대미술의 거장 박수근 화백의 생가 미술관을 관람하고, 밤에는 국토정중앙천문대에서 광활한 우주의 별자리를 감상해보세요.";
  } else {
    resultTitle.textContent = "역사의 흔적을 쫓는 모험가, 익스플로러";
    resultBadge.textContent = "지형과 역사의 신비를 탐험하는 타입";
    resultDesc.textContent = "지형의 독특함과 역사적 사건에 흥미를 느끼며, 발로 직접 뛰며 탐구하고 체험하는 역동적인 여행을 원하시는 분께 적합합니다.";
    resultImg.src = "assets/punchbowl.png";
    resultImg.alt = "펀치볼 해안분지";
    attractionName.textContent = "펀치볼 & 을지전망대";
    attractionDesc.textContent = "거대한 화채 그릇 모양의 독특한 분지인 해안분지(펀치볼)를 직접 걸으며, 국토 분단의 생생한 역사와 장엄한 풍경을 마주해 보세요.";
  }
  
  resultStep.classList.add('active');
}

function restartQuiz() {
  const resultStep = document.getElementById('quiz-result');
  resultStep.classList.remove('active');
  
  // Reset states
  quizAnswers.healing = 0;
  quizAnswers.culture = 0;
  quizAnswers.history = 0;
  currentStep = 0;
  progressBar.style.width = '0%';
  
  quizSteps[0].classList.add('active');
}

// Attach quiz option event listeners dynamically
document.querySelectorAll('.quiz-option').forEach(option => {
  option.addEventListener('click', () => {
    const category = option.getAttribute('data-cat');
    selectOption(category);
  });
});

const restartBtn = document.querySelector('.quiz-restart-btn');
if (restartBtn) {
  restartBtn.addEventListener('click', restartQuiz);
}

// ==========================================
// 5. Gallery Slider (Carousel)
// ==========================================
const slider = document.getElementById('gallery-slider');
const slides = document.querySelectorAll('.gallery-slide');
const prevBtn = document.getElementById('slider-prev');
const nextBtn = document.getElementById('slider-next');
const dotsContainer = document.getElementById('slider-dots');

let slideIndex = 0;
let slideInterval;

// Initialize Dots
slides.forEach((_, idx) => {
  const dot = document.createElement('div');
  dot.classList.add('slider-dot');
  if (idx === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(idx));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.slider-dot');

function updateSlider() {
  slider.style.transform = `translateX(-${slideIndex * 100}%)`;
  
  // Update Dots
  dots.forEach(dot => dot.classList.remove('active'));
  dots[slideIndex].classList.add('active');
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  updateSlider();
}

function prevSlide() {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  updateSlider();
}

function goToSlide(index) {
  slideIndex = index;
  updateSlider();
  resetInterval();
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetInterval();
  });
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetInterval();
  });
}

function startInterval() {
  slideInterval = setInterval(nextSlide, 5000); // auto scroll 5 seconds
}

function resetInterval() {
  clearInterval(slideInterval);
  startInterval();
}

startInterval();

// ==========================================
// 6. Interactive Tour Map (SVG Pins)
// ==========================================
const mapPins = document.querySelectorAll('.map-pin');
const mapInfoTitle = document.getElementById('map-info-title');
const mapInfoDesc = document.getElementById('map-info-desc');
const metaVal1 = document.getElementById('meta-val-1');
const metaVal2 = document.getElementById('meta-val-2');
const metaVal3 = document.getElementById('meta-val-3');
const metaVal4 = document.getElementById('meta-val-4');

const locationData = {
  dutayeon: {
    title: "두타연 (Dutayeon Valley)",
    desc: "금강산에서 흘러내린 맑은 물이 기암괴석 사이로 떨어지며 이룬 명소로, 60여 년간 가려졌던 아름다운 DMZ 청정 생태계를 간직하고 있습니다. 한국에서 보기 드문 열목어의 최대 서식지이기도 합니다.",
    meta1: "강원특별자치도 양구군 방산면 고방산리",
    meta2: "사전 예약 또는 당일 출입 신청 가능 (신분증 필수)",
    meta3: "연중무휴 (매주 월요일 휴무)",
    meta4: "양구 시내에서 차량으로 약 30분 소요"
  },
  punchbowl: {
    title: "해안분지 펀치볼 (Punch Bowl)",
    desc: "해발 1,100m가 넘는 외고산맥이 양구를 둥글게 둘러싸고 있는 한국 전쟁의 격전지이자 기묘한 원형 분지입니다. 화채 그릇(Punch Bowl)과 닮았다고 명명되었습니다. 시래기가 전국적으로 유명합니다.",
    meta1: "강원특별자치도 양구군 해안면 일대",
    meta2: "을지전망대 및 제4땅굴 연계 관광 가능",
    meta3: "전망대 입장 제한 여부 확인 요망 (안보관광)",
    meta4: "시래기 축제 (매년 가을-겨울 개최)"
  },
  observatory: {
    title: "국토정중앙천문대 (Korea Central Point Observatory)",
    desc: "한반도의 지리적 정중앙 지점에 세워진 천문대입니다. 우리나라의 배꼽 지점에서 광활한 우주와 쏟아지는 별을 800mm 주망원경으로 생생하게 감상할 수 있어 가족 단위 관광객에게 큰 인기를 끕니다.",
    meta1: "강원특별자치도 양구군 국토정중앙면 국토정중앙로 814",
    meta2: "성인 2,000원 / 청소년 1,000원",
    meta3: "오후 2시 ~ 밤 10시 (월요일 휴무)",
    meta4: "가상현실(VR) 우주선 탑승 체험실 운영"
  },
  museum: {
    title: "박수근미술관 (Park Soo-keun Museum)",
    desc: "한국의 서민적인 풍경과 모성애를 가장 진솔하게 그려낸 국민화가 박수근 화백의 생가 터에 마련된 예술 공간입니다. 화백의 손때 묻은 유품과 원화 작품, 돌을 깎아 만든 듯한 감각적인 돌담 미술관 건물이 조화를 이룹니다.",
    meta1: "강원특별자치도 양구군 양구읍 박수근미술관길 86-1",
    meta2: "성인 3,000원 / 초중고 1,500원",
    meta3: "오전 9시 ~ 오후 6시 (매주 월요일 휴무)",
    meta4: "상설전시관, 미술체험관, 미디어아트 감상실"
  }
};

mapPins.forEach(pin => {
  pin.addEventListener('click', () => {
    // Toggle active pin class
    mapPins.forEach(p => p.classList.remove('active'));
    pin.classList.add('active');
    
    // Get target location key
    const target = pin.getAttribute('data-target');
    const data = locationData[target];
    
    if (data) {
      // Smooth text transition
      mapInfoTitle.parentElement.style.opacity = 0;
      setTimeout(() => {
        mapInfoTitle.textContent = data.title;
        mapInfoDesc.textContent = data.desc;
        metaVal1.textContent = data.meta1;
        metaVal2.textContent = data.meta2;
        metaVal3.textContent = data.meta3;
        metaVal4.textContent = data.meta4;
        mapInfoTitle.parentElement.style.opacity = 1;
      }, 200);
    }
  });
});
// Set transition style for map pane
const mapPane = document.getElementById('map-info-pane');
if (mapPane) {
  mapPane.style.transition = "opacity 0.2s ease";
}

// ==========================================
// 7. EmailJS Form Integration
// ==========================================
// IMPORTANT: Please replace these with your actual EmailJS credentials
const EMAILJS_PUBLIC_KEY = "Iz-7euLuUb-9D1QuT"; 
const EMAILJS_SERVICE_ID = "service_efgedam";
const EMAILJS_TEMPLATE_ID = "template_jrcdw25";

// Initialize EmailJS
if (typeof emailjs !== 'undefined') {
  emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY,
  });
}

const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');

if (contactForm) {
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Check if credentials are placeholders
    if (EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY" || EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID" || EMAILJS_TEMPLATE_ID === "YOUR_TEMPLATE_ID") {
      showStatus("EmailJS 설정이 완료되지 않았습니다. app.js 파일 상단에 Public Key, Service ID, Template ID를 입력해 주세요.", "error");
      return;
    }

    // Set time parameter dynamically in 'YYYY-MM-DD HH:mm:ss' format
    const now = new Date();
    const formattedTime = now.getFullYear() + '-' + 
      String(now.getMonth() + 1).padStart(2, '0') + '-' + 
      String(now.getDate()).padStart(2, '0') + ' ' + 
      String(now.getHours()).padStart(2, '0') + ':' + 
      String(now.getMinutes()).padStart(2, '0') + ':' + 
      String(now.getSeconds()).padStart(2, '0');
    
    document.getElementById('contact-time').value = formattedTime;

    showStatus("문의를 전송하는 중입니다...", "sending");

    // Send using emailjs.sendForm
    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
      .then(() => {
        showStatus("문의가 성공적으로 전송되었습니다! 메일 수신함을 확인해 주세요.", "success");
        contactForm.reset();
      }, (error) => {
        console.error('Failed to send email:', error);
        showStatus("전송에 실패했습니다. 다시 시도해 주세요. 오류: " + JSON.stringify(error), "error");
      });
  });
}

function showStatus(message, type) {
  contactStatus.textContent = message;
  contactStatus.className = "contact-status " + type;
}
