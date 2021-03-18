
function validateAddFeedingForm() {

    let valid = true;

    const tarantula = document.getElementById('id_tarantula');
    const food = document.getElementById('id_food');
    const eatenNumber = document.getElementById('eaten_food');
    const feedingDate = document.getElementById('date');
    const eaten = document.getElementById('eaten');
    const notEaten = document.getElementById('notEaten');

    const errorTarantula = document.getElementById('errorTarantula');
    const errorFood = document.getElementById('errorFood');
    const errorEatenNumber = document.getElementById('errorEatenNumber');
    const errorFeedingDate = document.getElementById('errorFeedingDate');
    const errorIsEaten = document.getElementById('errorIsEaten');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([tarantula, food, eatenNumber, feedingDate, eaten, notEaten], [errorTarantula, errorFood, errorEatenNumber, errorFeedingDate, errorIsEaten], errorsSummary);

    if (!checkRequired(tarantula.value)) {
        valid = false;
        tarantula.classList.add("error-input");
        errorTarantula.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(food.value)) {
        valid = false;
        food.classList.add("error-input");
        errorFood.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(eatenNumber.value)) {
        valid = false;
        eatenNumber.classList.add("error-input");
        errorEatenNumber.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(feedingDate.value)) {
        valid = false;
        feedingDate.classList.add("error-input");
        errorFeedingDate.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(eaten.value) || !checkRequired(notEaten.value)) {
        valid = false;
        eaten.classList.add("error-input");
        notEaten.classList.add("error-input");
        errorIsEaten.innerText = "Pole jest wymagane";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;


}

function resetErrors(inputs, errorTexts, errorInfo) {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("error_input");
    }
    for (let i = 0; i < errorTexts.length; i++) {
        errorTexts[i].innerText = "";
    }
    errorInfo.innerText = "";
}

function checkRequired(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    if (value === "") {
        return false;
    }
    return true;
}

function checkTextLengthRange(value, min, max) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const length = value.length;
    if (max && length > max) {
        return false;
    }
    if (min && length < min) {
        return false;
    }
    return true;
}

function checkEmail(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(value);
}