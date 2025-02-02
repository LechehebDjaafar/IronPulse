/*==================== SHOW MENU ====================*/
const navMenu = document.getElementById('nav-menu'),
	navToggle = document.getElementById('nav-toggle'),
	navClose = document.getElementById('nav-close');

/*===== MENU SHOW || HIDE =====*/
if (navToggle) {
	navToggle.addEventListener('click', () => {
		navMenu.classList.add('show-menu');
	});
}
if (navClose) {
	navClose.addEventListener('click', () => {
		navMenu.classList.remove('show-menu');
	});
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
	const navMenu = document.getElementById('nav-menu');
	// When we click on each nav__link, we remove the show-menu class
	navMenu.classList.remove('show-menu');
}
navLink.forEach((link) => link.addEventListener('click', linkAction));

/*==================== CHANGE BACKGROUND HEADER ADD BOX SHADOW ====================*/
function scrollHeader() {
	const header = document.getElementById('header');
	this.scrollY >= 100
		? header.classList.add('bg-header')
		: header.classList.remove('bg-header');
}
window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
	const scrollUp = document.getElementById('scroll-up');
	// When the scroll is higher than 200 viewport height, add the show-scroll class to the a tag with the scroll-top class
	this.scrollY >= 400
		? scrollUp.classList.add('show-scroll')
		: scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');
console.log(sections);

function scrollActive() {
	const scrollY = window.pageYOffset;

	sections.forEach((current) => {
		const sectionHeight = current.offsetHeight;
		const sectionTop = current.offsetTop - 50;
		sectionId = current.getAttribute('id');

		if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
			document
				.querySelector('.nav__menu a[href*=' + sectionId + ']')
				.classList.add('active-link');
		} else {
			document
				.querySelector('.nav__menu a[href*=' + sectionId + ']')
				.classList.remove('active-link');
		}
	});
}
window.addEventListener('scroll', scrollActive);

// /*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
	origin: 'top',
	distance: '50px',
	duration: 2500,
	reset: false,
	delay: 400,
});

sr.reveal(
	`.home__data, .choose__content, .calculate__content, .footer__email`,
	{
		origin: 'top',
	}
);
sr.reveal(`.program__card, .pricing__card`, {
	origin: 'top',
	interval: 100,
});
sr.reveal(
	`.home__img, .pricing__card:last-of-type, .calculate__img, .footer__social`,
	{
		delay: 500,
		origin: 'right',
	}
);
sr.reveal(`.logo__img, .footer__content`, {
	origin: 'bottom',
	interval: 100,
});
sr.reveal(`.choose__img, .pricing__card:first-of-type, .footer__copy`, {
	origin: 'left',
});

/*=============== CALCULATE JS ===============*/
const calculateForm = document.getElementById('calculate-form');
const calculateCm = document.getElementById('calculate-cm');
const calculateKg = document.getElementById('calculate-kg');
const calculateMessage = document.getElementById('calculate-message');

const calculateBmi = (e) => {
	e.preventDefault();
	if (!calculateCm.value || !calculateKg.value) {
		calculateMessage.classList.add('color-red');
		calculateMessage.textContent = 'FILL IN THE HEIGHT AND THE WEIGHT!';

		setTimeout(() => {
			calculateCm.value = '';
			calculateKg.value = '';
			calculateMessage.textContent = '';
			calculateMessage.classList.remove('color-red');
		}, 3000);
	} else if (isNaN(calculateCm.value) || isNaN(calculateKg.value)) {
		calculateMessage.classList.add('color-red');
		calculateMessage.textContent = 'PLEASE ENTER ONLY NUMBERS!';
		setTimeout(() => {
			calculateCm.value = '';
			calculateKg.value = '';
			calculateMessage.textContent = '';
			calculateMessage.classList.remove('color-red');
		}, 3000);
	} else {
		const CM = calculateCm.value / 100;
		const KG = calculateKg.value;
		const BMI = Math.round(KG / (CM * CM));

		if (BMI < 18.5) {
			calculateMessage.classList.add('color-green');
			calculateMessage.textContent = `Your BMI is ${BMI} and you are skinny`;
		} else if (BMI < 25) {
			calculateMessage.classList.add('color-green');
			calculateMessage.textContent = `Your BMI is ${BMI} and you are healthy`;
		} else {
			calculateMessage.classList.add('color-green');
			calculateMessage.textContent = `Your BMI is ${BMI} and you are overweight`;
		}

		setTimeout(() => {
			calculateCm.value = '';
			calculateKg.value = '';
			calculateMessage.textContent = '';
			calculateMessage.classList.remove('color-green');
		}, 5000);
	}
};
calculateForm.addEventListener('submit', calculateBmi);

/*=============== EMAIL ===============*/
const contactForm = document.getElementById('contact-form');
const contactInput = document.getElementById('contact-user');
const contactMessage = document.getElementById('contact-message');

const validateForm = (e) => {
	e.preventDefault();
	let contactMessageColor = '';
	let contactMessageText = '';
	if (!contactInput.value) {
		contactMessageColor = 'color-red';
		contactMessage.classList.add(contactMessageColor);

		contactMessageText = 'You must enter your email';
		contactMessage.textContent = contactMessageText;
	} else {
		contactMessageColor = 'color-green';
		contactMessage.classList.add(contactMessageColor);

		contactMessageText = 'You registered successfully';
		contactMessage.textContent = contactMessageText;
	}
	setTimeout(() => {
		if (contactMessage.classList.contains(contactMessageColor)) {
			contactMessage.classList.remove(contactMessageColor);
			contactMessage.textContent = '';
			contactInput.value = '';
		}
	}, 4000);
};

contactForm.addEventListener('submit', validateForm);
