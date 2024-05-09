const nextBtn = document.querySelector('.btn-next');
const prevBtn = document.querySelector('.btn-prev');
const submittBtn = document.querySelector('.btn-submit');
const steps = document.querySelectorAll('.step');
const formSteps = document.querySelectorAll('.form-step');
const form = document.forms[0];

const resultBtn = document.querySelector('.result')

const PSWD_EYE_BTNS = document.querySelectorAll('.eye');
const PSWD_EYE_SLASH_BTNS = document.querySelectorAll('.eye-slash');

let active = 0;

form.addEventListener('submit', onSubmitHandler);

function onSubmitHandler(e) {
	for (let i = 0; i < form.elements.length; i++) {
		const element = form.elements[i];
		let valid = validateElement(element);
		if (!valid) {
			console.log('form invalid')
			e.preventDefault();
			return false;
		}
	}
}


// resultBtn.addEventListener('click', renderResult)


nextBtn.addEventListener('click', validatePage);



function validatePage() {

if (active > steps.length) {
	active = steps.length;
}
	let currentStep = document.querySelector('.form-step.active');
	let activeStep = formSteps[active];
	console.log(currentStep);
	console.log(activeStep);

	let inputs = [...currentStep.querySelectorAll('input')];
	let activeInputs = [...activeStep.querySelectorAll('input')];
	console.log('inputs', inputs)
	console.log('Active inputs', activeInputs)
	console.log(active, steps.length);

	let allValid = inputs.every((input) => input.reportValidity());

	
	
	for (let i = 0; i < inputs.length; i++) {
		const element = inputs[i];
		let valid = validateElement(element);
		if (!valid) {
			
			return;
		}
	}

if (allValid) {
	active++;
	updateProgress();
	
	console.log(active, steps.length);
} else {
	console.log('Invalid input');
}
}



prevBtn.addEventListener('click', () => {
	if (active < 0) {
		active = 0;
	}
	active--;
	updateProgress();
});

const updateProgress = () => {
	steps.forEach((step, i) => {
		if (i === active) {
			step.classList.add('active');
			formSteps[i].classList.add('active');
		} else {
			step.classList.remove('active');
			formSteps[i].classList.remove('active');
		}
		
	});
	if (active === 0) {
		prevBtn.disabled = true;
	} else if (active === steps.length - 1) {
		nextBtn.disabled = true;
	} else {
		prevBtn.disabled = false;
		nextBtn.disabled = false;
	}
};



// form.addEventListener('submit', onSubmitHandler);

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
		// let message = "Doesn't match the pattern";
		let message = element.dataset.required;
		let regex = new RegExp(element.dataset.pattern);
		return validators.validate(element, message, () =>
			regex.test(element.value)
		);
	},
};

validators.confirm = {
	isValid: function (element) {
		let message = "Does't match password";
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
		element.addEventListener('change', onChangeHandler);
 });

 PSWD_EYE_SLASH_BTNS.forEach((b) => {
		b.addEventListener('click', (e) => {
			const BTN = e.target;
			BTN.classList.add('hidden');
			BTN.parentElement.querySelector('.eye').classList.remove('hidden');
			BTN.parentElement.querySelector('.password-input').type = 'text';
		});
 });

 PSWD_EYE_BTNS.forEach((b) => {
		b.addEventListener('click', (e) => {
			const BTN = e.target;
			BTN.classList.add('hidden');
			BTN.parentElement
				.querySelector('.eye-slash')
				.classList.remove('hidden');
			BTN.parentElement.querySelector('.password-input').type =
				'password';
		});
 });
