
function validateAddTarantulaForm() {

    let valid = true;

    const speciesName = document.getElementById('species_name');
    const gender = document.getElementById('gender');
    const birthDate = document.getElementById('birthDate');
    const stadium = document.getElementById('stadium');
    const CITES = document.getElementById('CITES');
    const CITES = document.getElementById('CITES');

    const errorSpeciesName = document.getElementById('errorSpeciesName');
    const errorGender = document.getElementById('errorGender');
    const errorBirthDate = document.getElementById('errorBirthDate');
    const errorStadium = document.getElementById('errorStadium');
    const errorCITES = document.getElementById('errorCITES');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([speciesName, gender, birthDate, stadium, CITES], [errorSpeciesName, errorGender, errorBirthDate, errorStadium, errorCITES], errorsSummary);

    if (!checkRequired(speciesName.value)) {
        valid = false;
        speciesName.classList.add("error-input");
        errorSpeciesName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(speciesName.value, 5, 130)) {
        valid = false;
        speciesName.classList.add("error-input");
        errorSpeciesName.innerText = "Pole powinno zawierać od 5 do 200 znaków";
    }

    if (!checkRequired(gender.value)) {
        valid = false;
        gender.classList.add("error-input");
        errorGender.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(birthDate.value)) {
        valid = false;
        birthDate.classList.add("error-input");
        errorBirthDate.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(stadium.value)) {
        valid = false;
        stadium.classList.add("error-input");
        errorStadium.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(CITES)) {
        valid = false;
        CITESYes.classList.add("error-input");
        errorCITES.innerText = "Pole jest wymagane";
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