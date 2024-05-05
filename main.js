const nextBtn = document.querySelector('.btn-next');
const prevBtn = document.querySelector('.btn-prev');
const submittBtn = document.querySelector('.btn-submit');
const steps = document.querySelectorAll('.step');
const formSteps = document.querySelectorAll('.form-step');
const form = document.forms[0];

let active = 1;

nextBtn.addEventListener('click', () => {
	if (active > steps.length) {
		active = steps.length;
	}
	active++;
	console.log(active, steps.length);
	updateProgress();
});

prevBtn.addEventListener('click', () => {
	if (active < 1) {
		active = 1;
	}
	active--;
	updateProgress();
});

const updateProgress = () => {
	steps.forEach((step, i) => {
		if (i === active - 1) {
			step.classList.add('active');
			formSteps[i].classList.add('active');
		} else {
			step.classList.remove('active');
			formSteps[i].classList.remove('active');
		}
	});
	if (active === 1) {
		prevBtn.disabled = true;
	} else if (active === steps.length) {
		nextBtn.disabled = true;
	} else {
		prevBtn.disabled = false;
		nextBtn.disabled = false;
	}
};

let elements = document.querySelectorAll("[data-val='true']");

let validators = {};

validators.validate = function (element, message, conditions) {
	let errorLabel = document.querySelector('#' + element.dataset.errorLabel);
	errorLabel.innerHTML = message;
	errorLabel.style.display = 'none';
	element.classList.remove('valid');
	element.classList.remove('invalid');

	if (typeof conditions == 'function' && conditions()) {
		element.classList.add('valid');
		return true;
	} else {
		element.classList.add('invalid');
		errorLabel.style.display = 'block';
		return false;
	}
};

validators.required = {
	isValid: function (element) {
		let message = element.dataset.required;
		return validators.validate(
			element,
			message,
			() => element.value.length > 0
		);
	},
};

validators.pattern = {
	isValid: function (element) {
		let message = 'Введенное значенеи не соответствует шаблону';
		let regex = new RegExp(element.dataset.pattern);
		return validators.validate(element, message, () =>
			regex.test(element.value)
		);
	},
};

validators.confirm = {
	isValid: function (element) {
		let message = 'Значения не совпадают';
		let confirmInput = document.querySelector(
			'#' + element.dataset.confirm
		);
		return validators.validate(
			element,
			message,
			() => element.value == confirmInput.value
		);
	},
};

function validateElement(element) {
	for (const key in validators) {
		if (
			Object.hasOwnProperty.call(validators, key) &&
			typeof validators[key] == 'object'
		) {
			if (element.dataset[key] !== undefined) {
				const validator = validators[key];
				if (!validator.isValid(element)) return false;
			}
		}
	}

	return true;
}

function onChangeHandler(e) {
	const element = e.target;
	if (element.tagName == 'INPUT') {
		validateElement(element);
	}
}

 elements.forEach((element) => {
		element.addEventListener('input', onChangeHandler);
 });