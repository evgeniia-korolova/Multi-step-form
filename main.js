const nextBtn = document.querySelector('.btn-next');
const prevBtn = document.querySelector('.btn-prev');
const submittBtn = document.querySelector('.btn-submit');
const steps = document.querySelectorAll('.step');
const formSteps = document.querySelectorAll('.form-step');

let active = 1;

nextBtn.addEventListener('click', () => {
   
    if (active > steps.length) {
        active = steps.length;
    }
    active++;
    console.log(active, steps.length)
    updateProgress();
})

prevBtn.addEventListener('click', () => {
   
    if (active < 1) {
        active = 1;
    }
     active--;
    updateProgress();
})

const updateProgress = () => {
    steps.forEach((step, i) => {
        if (i === active-1) {
            step.classList.add('active');
            formSteps[i].classList.add('active')
        } else {
            step.classList.remove('active');
            formSteps[i].classList.remove('active');
        }
    })
    if (active === 1) {
        prevBtn.disabled = true;
    } else if (active === steps.length) {
        nextBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
        nextBtn.disabled = false;
    }
}