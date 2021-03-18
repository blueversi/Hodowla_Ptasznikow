
function validateAddFoodForm() {

    let valid = true;

    const speciesName = document.getElementById('name');
    const size = document.getElementById('size');
    const carbs = document.getElementById('carbs_content');
    const protein = document.getElementById('protein_content');
    const fat = document.getElementById('fat_content');

    const errorSpeciesName = document.getElementById('errorSpeciesName');
    const errorSize = document.getElementById('errorSize');
    const errorCarbsContent = document.getElementById('errorCarbsContent');
    const errorProteinContent = document.getElementById('errorProteinContent');
    const errorFatContent = document.getElementById('errorFatContent');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([speciesName, size, carbs, protein, fat], [errorSpeciesName, errorSize, errorCarbsContent, errorProteinContent, errorFatContent], errorsSummary);

    if (!checkRequired(speciesName.value)) {
        valid = false;
        speciesName.classList.add("error-input");
        errorSpeciesName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(speciesName.value, 5, 120)) {
        valid = false;
        speciesName.classList.add("error-input");
        errorSpeciesName.innerText = "Pole powinno zawierać od 5 do 200 znaków";
    }

    if (!checkRequired(size.value)) {
        valid = false;
        size.classList.add("error-input");
        errorSize.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(carbs.value)) {
        valid = false;
        carbs.classList.add("error-input");
        errorCarbsContent.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(protein.value)) {
        valid = false;
        protein.classList.add("error-input");
        errorProteinContent.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(fat.value)) {
        valid = false;
        fat.classList.add("error-input");
        errorFatContent.innerText = "Pole jest wymagane";
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