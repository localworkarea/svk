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

		const thumbsSlider = new Swiper('.products__thumbs', {
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
}
window.addEventListener("load", function () {
	initSliders();
});




// // Список слайдерів
// // Перевіряємо, чи є слайдер на сторінці
// if (document.querySelector('.swiper')) { // Вказуємо склас потрібного слайдера
// 	// Створюємо слайдер
// 	new Swiper('.swiper', { // Вказуємо склас потрібного слайдера
// 		// Підключаємо модулі слайдера
// 		// для конкретного випадку
// 		modules: [Navigation],
// 		observer: true,
// 		observeParents: true,
// 		slidesPerView: 1,
// 		spaceBetween: 0,
// 		//autoHeight: true,
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