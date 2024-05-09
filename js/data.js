const form = document.forms[0];

function renderResult() {
	for (let i = 0; i < form.elements.length; i++) {
		const element = form.elements[i];
		console.log(element.value);
	}
}

renderResult();
