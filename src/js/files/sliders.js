/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from 'swiper';
import {
	Navigation,
	EffectFade,
	Autoplay,
	Thumbs,
} from 'swiper/modules';

import "../../scss/base/swiper.scss";


function initSliders() {
	if (document.querySelector('.products__slider')) {

		const thumbsSlider = new Swiper('.thumbs-products', {
			slidesPerView: 2,
			spaceBetween: 12,
			watchSlidesProgress: true,
			loop: true,
			speed: 400,
		});

		const sideNavButtons = document.querySelectorAll('.products__side-btn');
		const bgItems = document.querySelectorAll('.img-products__item');

		const productsSlider = new Swiper('.products__slider', {
			modules: [Navigation, EffectFade, Autoplay, Thumbs],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			speed: 400,
			loop: true,
			navigation: {
				prevEl: '.products__slider .swiper-button-prev',
				nextEl: '.products__slider .swiper-button-next',
			},
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			autoplay: {
				delay: 4000,
				disableOnInteraction: false,
			},
			thumbs: {
				swiper: thumbsSlider,
				autoScrollOffset: 1,
			},
			on: {
				slideChange: function () {
					updateSideNav(this.realIndex);
					updateBackground(this.realIndex);
				}
			}
		});

		// Клики по боковым кнопкам
		sideNavButtons.forEach((btn) => {
			btn.addEventListener('click', function () {
				const slideIndex = parseInt(this.dataset.slide);
				productsSlider.slideToLoop(slideIndex);
			});
		});

		// Обновляем активное состояние бокового меню
		function updateSideNav(activeIndex) {
			sideNavButtons.forEach((btn, index) => {
				if (index === activeIndex) {
					btn.classList.add('_active');
				} else {
					btn.classList.remove('_active');
				}
			});
		}

		// Обновляем активную картинку фона
		function updateBackground(activeIndex) {
			bgItems.forEach((item, index) => {
				if (index === activeIndex) {
					item.classList.add('active');
				} else {
					item.classList.remove('active');
				}
			});
		}

		// Изначально активируем первый слайд и фон
		updateSideNav(productsSlider.realIndex);
		updateBackground(productsSlider.realIndex);
	}

	if (document.querySelector('.catalog-slider__slider')) {
		const catalogSwiper = new Swiper('.catalog-slider__slider', {
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 5,
			centeredSlides: true,
			loop: true,
			spaceBetween: 20,
			speed: 400,
			navigation: {
				prevEl: '.catalog-slider__slider .swiper-button-prev',
				nextEl: '.catalog-slider__slider .swiper-button-next',
			},
			breakpoints: {
				320: {
					slidesPerView: 2,
					spaceBetween: 10,
				},
				481: {
					slidesPerView: 5,
					spaceBetween: 20,
				},
			},
			on: {
				init(swiper) {
					updateVisibleSlides(swiper);
					updateSlideTitle(swiper);
				},
				slideChange(swiper) {
					updateVisibleSlides(swiper);
					updateSlideTitle(swiper);
				},
				resize(swiper) {
					updateVisibleSlides(swiper);
					updateSlideTitle(swiper);
				}
			}
		});

		function updateVisibleSlides(swiper) {
			// Удаляем класс со всех слайдов
			swiper.slides.forEach(slide => {
				slide.classList.remove('is-visible');
			});

			const slidesPerView = swiper.params.slidesPerView;
			const activeIndex = swiper.activeIndex;
			const half = Math.floor(slidesPerView / 2);

			for (let i = -half; i <= half; i++) {
				const index = activeIndex + i;
				const slide = swiper.slides[index];
				if (slide) {
					slide.classList.add('is-visible');
				}
			}
		}

		function updateSlideTitle(swiper) {
			const usageElement = document.querySelector('.catalog-slider__usage');
			const nameElement = document.querySelector('.catalog-slider__name-product');

			const activeSlide = swiper.slides[swiper.activeIndex];
			if (!activeSlide) return;

			// Область применения
			if (usageElement) {
				const usage = activeSlide.getAttribute('data-slide-usage') || '';
				usageElement.textContent = usage;
			}

			// Название продукта
			if (nameElement) {
				const name = activeSlide.getAttribute('data-slide-name') || '';
				nameElement.textContent = name;
			}
		}

	}


	if (document.querySelector('.product-catalog__slider')) {
		function setSubtitleHeights() {
			const cards = document.querySelectorAll('.card-product-catalog');

			if (cards.length) {
				cards.forEach(card => {
					const block = card.querySelector('.card-product-catalog__block');
					const subtitle = card.querySelector('.card-product-catalog__subtitle');

					let subtitleHeight = 0;

					if (subtitle) {
						subtitleHeight = subtitle.getBoundingClientRect().height;
					}

					if (block) {
						block.style.setProperty('--subtitle-height', `${subtitleHeight}px`);
					}
				});
			}
		}

		new Swiper('.product-catalog__slider', {

			observer: true,
			observeParents: true,
			// slidesPerView: 4,
			spaceBetween: 1,
			speed: 400,
			
			breakpoints: {
				320: {
					slidesPerView: 1.3,
					centeredSlides: true,
					initialSlide: 1,
				},
				480: {
					slidesPerView: 2,
				},
				730: {
						centeredSlides: true,
					slidesPerView: 2.5,
					initialSlide: 1,
				},
				992: {
					centeredSlides: true,
					slidesPerView: 3,
					initialSlide: 2,
				},
				1200: {
					centeredSlides: false,
					slidesPerView: 4,
					initialSlide: 0,
				},
				1500: {
					slidesPerView: 4,
						initialSlide: 1,
					},
			},
			// Події
			on: {
				init: function() {
					setTimeout(() => {
						setSubtitleHeights();
					}, 100);
				}
			}
		});
		let lastWidth = window.innerWidth;
  const resizeObserver = new ResizeObserver(entries => {
    requestAnimationFrame(() => {
      entries.forEach(entry => {
        const currentWidth = entry.contentRect.width;
        if (currentWidth !== lastWidth) {
					setSubtitleHeights();
          lastWidth = currentWidth;
        }
      });
    });
  });
  resizeObserver.observe(document.body);
	}
	if (document.querySelector('.news__slider')) {
		new Swiper('.news__slider', {

			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: "auto",
			spaceBetween: 10,
			speed: 400,

			freeMode: true,

			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			// navigation: {
			// 	prevEl: '.swiper-button-prev',
			// 	nextEl: '.swiper-button-next',
			// },

			breakpoints: {
				320: {
					spaceBetween: 25,
				},
				480: {
					spaceBetween: 10,
				},
			},
			// Події
			on: {

			}
		});
	}

}
window.addEventListener("load", function () {
	initSliders();
});




// if (document.querySelector('.swiper')) { 
// 	new Swiper('.swiper', { 

// 		modules: [Navigation],
// 		observer: true,
// 		observeParents: true,
// 		slidesPerView: 1,
// 		spaceBetween: 0,
// 		speed: 800,

// 		//touchRatio: 0,
// 		//simulateTouch: false,
// 		//loop: true,
// 		//preloadImages: false,
// 		//lazy: true,

// 		/*
// 		// Ефекти
// 		effect: 'fade',
// 		autoplay: {
// 			delay: 3000,
// 			disableOnInteraction: false,
// 		},
// 		*/

// 		// Пагінація
// 		/*
// 		pagination: {
// 			el: '.swiper-pagination',
// 			clickable: true,
// 		},
// 		*/

// 		// Скроллбар
// 		/*
// 		scrollbar: {
// 			el: '.swiper-scrollbar',
// 			draggable: true,
// 		},
// 		*/

// 		// Кнопки "вліво/вправо"
// 		navigation: {
// 			prevEl: '.swiper-button-prev',
// 			nextEl: '.swiper-button-next',
// 		},
// 		/*
// 		// Брейкпоінти
// 		breakpoints: {
// 			640: {
// 				slidesPerView: 1,
// 				spaceBetween: 0,
// 				autoHeight: true,
// 			},
// 			768: {
// 				slidesPerView: 2,
// 				spaceBetween: 20,
// 			},
// 			992: {
// 				slidesPerView: 3,
// 				spaceBetween: 20,
// 			},
// 			1268: {
// 				slidesPerView: 4,
// 				spaceBetween: 30,
// 			},
// 		},
// 		*/
// 		// Події
// 		on: {

// 		}
// 	});
// }