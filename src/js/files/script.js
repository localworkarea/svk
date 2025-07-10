import {
  isMobile,
  menuInit,
  lenis,
  getHash
} from "./functions.js";
// Підключення списку активних модулів
import {
  flsModules
} from "./modules.js";

// import 'keen-slider/keen-slider.min.css'
// import KeenSlider from 'keen-slider'


// import Lenis from 'lenis'
// // npm i lenis
// // data-lenis-prevent="false" - добавить к єлементу, например header, чтобы после остановки скрола открыть меню/попап и можно было скролить внутренний контент



// // === ПЛАВНАЯ ПРОКРУТКА ЧЕРЕЗ LENIS =============================
// // 1. ПОДКЛЮЧИ ЧЕРЕЗ CDN <script></script>
// // 2.Расскоментируй код ниже, если не нужен GSAP найди другой код через документацию lenis
// // 3.Добавь СSS для lenis
// const lenis = new Lenis()
// lenis.on('scroll', ScrollTrigger.update)
// gsap.ticker.add((time)=>{
//   lenis.raf(time * 1000)
// })
// gsap.ticker.lagSmoothing(0)



import SplitType from 'split-type'
// npm i split-type



// == SPLIT TYPE =========================================================
const splitTextLines = document.querySelectorAll('.split-lines');
const splitTextWords = document.querySelectorAll('.split-words');
const splitTextChars = document.querySelectorAll('.split-chars');
const splitTextBoth = document.querySelectorAll('.split-both');
const splitSetSpan = document.querySelectorAll('.split-words.set-span');

function initSplitType() {
  if (splitTextLines.length > 0) {
    splitTextLines.forEach(element => {
      new SplitType(element, {
        types: 'lines'
      });
    });
  }

  if (splitTextWords.length > 0) {
    splitTextWords.forEach(element => {
      new SplitType(element, {
        types: 'words'
      });

      // Проставляем индексы для всех слов
      const words = element.querySelectorAll('.word');
      words.forEach((word, index) => {
        word.style.setProperty('--index', index);
      });
    });
  }

  if (splitTextChars.length > 0) {
    splitTextChars.forEach(element => {
      new SplitType(element, {
        types: 'chars'
      });

      const chars = element.querySelectorAll('.char');
      chars.forEach((char, index) => {
        char.style.setProperty('--index', index);
      });
    });
  }

  if (splitTextBoth.length > 0) {
    splitTextBoth.forEach(element => {
      new SplitType(element, {
        types: 'lines, words'
      });

      const words = element.querySelectorAll('.word');
      words.forEach((word, index) => {
        word.style.setProperty('--index', index);
      });
    });
  }

  if (splitSetSpan.length > 0) {
    splitSetSpan.forEach(splitSetSpan => {
      const words = splitSetSpan.querySelectorAll('.word');

      words.forEach(word => {
        const text = word.textContent.trim();
        word.innerHTML = `<span class="word-span">${text}</span>`;
      });
    });
  }
}

initSplitType();

let lastWidth = window.innerWidth;
const resizeObserver = new ResizeObserver(entries => {
  requestAnimationFrame(() => {
    entries.forEach(entry => {
      const currentWidth = entry.contentRect.width;
      if (currentWidth !== lastWidth) {
        initSplitType();
        lastWidth = currentWidth; // Обновляем lastWidth
      }
    });
  });
});
// Наблюдаем за изменениями в элементе body
resizeObserver.observe(document.body);

// =======================================================================






// Ticker =================================
const tickers = document.querySelectorAll("[data-ticker]");
if (tickers.length > 0) {
  tickers.forEach(ticker => {
    // Получаем скорость и направление из атрибутов data-ticker-speed и data-ticker-dir
    const speed = ticker.getAttribute("data-ticker-speed") || 80;
    const direction = ticker.getAttribute("data-ticker-dir") || "rtl";

    // Берем первый дочерний элемент тикера
    const firstChild = ticker.firstElementChild;
    if (firstChild) {
      // Клонируем первый элемент
      const clone = firstChild.cloneNode(true);

      // Предзагрузка всех изображений в клонированном элементе
      const images = clone.querySelectorAll("img");
      const promises = Array.from(images).map(img => {
        return new Promise(resolve => {
          const preloader = new Image();
          preloader.src = img.src;
          preloader.onload = resolve;
          preloader.onerror = resolve; // Разрешаем, даже если возникла ошибка загрузки
        });
      });

      // После предзагрузки изображений добавляем клонированный элемент и запускаем анимацию
      Promise.all(promises).then(() => {
        ticker.appendChild(clone);

        // Устанавливаем анимацию для всех дочерних элементов тикера
        Array.from(ticker.children).forEach(child => {
          const animationName = direction === "rtl" ? "scroll" : "scroll-rev";
          child.style.animation = `${animationName} ${speed}s linear infinite`;
        });
      });
    }
  });
}
// ====================================================

document.addEventListener("DOMContentLoaded", function () {
  const lngHeader = document.querySelector('.lng-header');
  const lngBtn = document.querySelector('.lng-header__btn');

  if (lngHeader) {
    // Получить список элементов
    const items = lngHeader.querySelectorAll('.lng-header__item');
    const itemsCount = items.length;

    // Записать количество в CSS-переменную
    lngHeader.style.setProperty('--items', itemsCount);

    // Проставить каждому элементу --index
    items.forEach((item, i) => {
      const index = itemsCount - i; // первый = максимум
      item.style.setProperty('--index', index);
    });


    // === Desktop: Hover ===
    if (!isMobile.any()) {
      lngBtn.addEventListener('mouseenter', () => {
        lngHeader.classList.add('_show');
      });

      lngHeader.addEventListener('mouseleave', () => {
        lngHeader.classList.remove('_show');
      });

      // === Mobile: Click ===
    } else {
      document.addEventListener('click', function (e) {
        const isBtn = e.target.closest('.lng-header__btn');
        const isInside = e.target.closest('.lng-header');

        if (isBtn) {
          // Переключение при клике по кнопке
          lngHeader.classList.toggle('_show');
        } else if (!isInside) {
          // Клик вне элемента — скрываем
          lngHeader.classList.remove('_show');
        }
      });
    }
  }






  function updateHeadHeightVar() {
    const ctaBodies = document.querySelectorAll('.body-el');
    if (ctaBodies.length > 0) {
      ctaBodies.forEach((body) => {
        const ctaHead = body.querySelector('.body-head-el');
        if (ctaHead) {
          const headHeight = ctaHead.offsetHeight;
          body.style.setProperty('--head-height', `${headHeight}px`);
        }
      });
    }
  }

  updateHeadHeightVar();



  // === видео воспроизведение ==================
  const videoNews = document.querySelector('.news__video');
  if (videoNews) {
    const cover = videoNews.querySelector('.news__cover');
    const video = videoNews.querySelector('video');

    if (cover && video) {
      cover.addEventListener('click', () => {
        cover.classList.add('_play');
        video.setAttribute('controls', '');
        video.muted = false;
        video.play();
      });
    }
  }













  // === Подсчет количества элементов ==============
  function setProductPlusItemsCount() {
    const lists = document.querySelectorAll('.product-plus__list');
    const listCount = document.querySelectorAll('.progress__counters');
    const listResolve = document.querySelectorAll('.resolve');
    if (lists.length > 0) {
      lists.forEach((list) => {
        const items = list.querySelectorAll('.product-plus__item');
        const count = items.length;
        list.style.setProperty('--items-count', count);
      });
    }
    if (listCount.length > 0) {
      listCount.forEach((list) => {
        const items = list.querySelectorAll('.progress__item');
        const count = items.length;
        list.style.setProperty('--items-count', count);
      });
    }
    if (listResolve.length > 0) {
      listResolve.forEach((list) => {
        const items = list.querySelectorAll('.resolve__item');
        const count = items.length;
        list.style.setProperty('--items-count', count);
      });
    }
  }
  setProductPlusItemsCount();











  // ==== slider-value ==========================================================================

  let updateSizes = () => {};
  let updateSliderPosition = () => {};

  const slider = document.querySelector(".slider-value");
  let sliderBody;
  let bodyScrollWidth = 0;
  let parentWidth = 0;
  let maxTranslateX = 0;

  let targetTranslateX = 0;
  let currentTranslateX = 0;

  if (slider) {
    sliderBody = slider.querySelector(".slider-value__body");

    updateSizes = function () {
      bodyScrollWidth = sliderBody.scrollWidth;
      parentWidth = slider.clientWidth;
      maxTranslateX = bodyScrollWidth - parentWidth;
    };

    updateSliderPosition = function () {
      const rect = slider.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const triggerStart = rect.bottom - viewportHeight - 80;
      const triggerEnd = rect.top - 80;

      const totalDistance = triggerEnd - triggerStart;

      let progress = (0 - triggerStart) / totalDistance;
      progress = Math.min(Math.max(progress, 0), 1);

      targetTranslateX = maxTranslateX * progress;
    };

    function animate() {
      currentTranslateX += (targetTranslateX - currentTranslateX) * 0.1;
      sliderBody.style.transform = `translateX(-${currentTranslateX}px)`;
      requestAnimationFrame(animate);
    }

    updateSizes();
    updateSliderPosition();
    animate();

    window.addEventListener("scroll", updateSliderPosition);
  }



  // ResizeObserver
  let lastWidth = window.innerWidth;
  const resizeObserver = new ResizeObserver(entries => {
    requestAnimationFrame(() => {
      entries.forEach(entry => {
        const currentWidth = entry.contentRect.width;
        if (currentWidth !== lastWidth) {
          updateSizes();
          updateSliderPosition();
          updateHeadHeightVar();
          lastWidth = currentWidth;
        }
      });
    });
  });
  resizeObserver.observe(document.body);



});



// Загрузка плагина маски только при клике на поле =================
let inputmaskLoaded = false;

document.addEventListener("focusin", async function (event) {
  const input = event.target;

  if (input.hasAttribute("data-mask") && !input.dataset.masked) {
    if (!inputmaskLoaded) {
      try {
        await loadInputMask();
        inputmaskLoaded = true;
      } catch (e) {
        console.error("Не удалось загрузить Inputmask:", e);
        return;
      }
    }

    // Получаем язык документа
    const lang = document.documentElement.lang;

    // Выбираем маску в зависимости от языка
    const mask = (lang === "uk" || lang === "ru") 
       ? "+38 (999) 999 99 99"
      : "+99 999 999 99 99";

    Inputmask({
      mask: mask,
      showMaskOnHover: false,
      showMaskOnFocus: true
    }).mask(input);

    input.dataset.masked = "true";
  }
});

function loadInputMask() {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/inputmask@5.0.9/dist/inputmask.min.js";
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
// =====================
