const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{9,}/; 

const handleFillCountry = _.debounce((event) => {
    const input = event.target;
    const filterValue = input.value.toLowerCase();

    
    const countryListElement = document.getElementById('country-list'); 
    if(countryListElement) {
        countryListElement.innerHTML = ''; 
        
        const filteredCountries = countries.filter(country => 
            country.toLowerCase().includes(filterValue)
        );

        filteredCountries.forEach(country => {
            const li = document.createElement('li');
            li.textContent = country;
            li.addEventListener('click', () => {
                input.value = country;
            });
            countryListElement.appendChild(li);
        });
    }
  }, 300);

//
function validateName(event) {
    const input = event.target;
    const value = input.value.trim();

    // El campo no está vacío y longitud > 8
    if (value.length > 0 && value.length > 8) {
        showElementWithClassName(input, 'valid-feedback');
        hideElementWithClassName(input, 'invalid-feedback');
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        return true;
    } else {
        showElementWithClassName(input, 'invalid-feedback');
        hideElementWithClassName(input, 'valid-feedback');
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        return false;
    }
}



function validatePassword(event) {
    const password = event.target.value;
    const notEmpty = password.length > 0;
    const isLongEnoughAndMeetsRegex = passwordRegex.test(password);

    const isValid = notEmpty && isLongEnoughAndMeetsRegex; 

    if (isValid) {
        showElementWithClassName(event.target, 'valid-feedback');
        hideElementWithClassName(event.target, 'invalid-feedback');
    } else {
        showElementWithClassName(event.target, 'invalid-feedback');
        hideElementWithClassName(event.target, 'valid-feedback');
    }
    return isValid;
}


function validateEmail(event) {
  const input = event.target;
    const value = input.value.trim();

    if (value.length > 0 && emailRegex.test(value)) {
        showElementWithClassName(input, 'valid-feedback');
        hideElementWithClassName(input, 'invalid-feedback');
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        return true;
    } else {
        showElementWithClassName(input, 'invalid-feedback');
        hideElementWithClassName(input, 'valid-feedback');
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        return false;
    }
}

// general register
function register(event) {
    // check if name is fullfiled
    // check if email is fullfiled
    // check if password is fullfiled
    // check if gender is selected
    // check if checkbox with "I confirm that all data are correct" is checked
    event.preventDefault(); 

    const nameInput = document.getElementById('name'); 
    const emailInput = document.getElementById('email'); 
    const passwordInput = document.getElementById('password'); 
    const countryInput = document.getElementById('country'); 
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const termsCheckbox = document.getElementById('male'); 
    const termsCheckbox1 = document.getElementById('female'); 
    const termsCheckbox2 = document.getElementById('secret'); 


    
    const isNameValid = validateName({ target: nameInput });
    const isEmailValid = validateEmail({ target: emailInput });
    const isPasswordValid = validatePassword({ target: passwordInput });
    const isCountryValid = countryInput.value.trim().length > 0; 

    let isGenderSelected = false;
    genderInputs.forEach(input => {
        if (input.checked) isGenderSelected = true;
    });

    const isTermsAccepted = termsCheckbox.checked;
    const isTermsAccepted1 = termsCheckbox1.checked;
    const isTermsAccepted2 = termsCheckbox2.checked;


    if (isNameValid && isEmailValid && isPasswordValid && isCountryValid && isGenderSelected && isTermsAccepted || isTermsAccepted1 || isTermsAccepted2) {
        console.log('Todos los datos son correctos, enviando...');
        
        fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: nameInput.value,
                email: emailInput.value,
                password: passwordInput.value,
                country: countryInput.value,
            }),
        })
        .then(response => {
            if(response.ok) {
                alert('Usuario registrado con éxito');
            } else {
                alert('Error en el registro');
            }
        })
        .catch(error => console.error('Error:', error));

    } else {
        console.log('Formulario inválido. Revisa los campos.');
        alert('Por favor, rellena todos los campos correctamente.');
    }
}

// utility functions
function showElementWithClassName(node, className) {
    node.parentNode.getElementsByClassName(className)[0].style.display = 'initial'
}
function hideElementWithClassName(node, className) {
    node.parentNode.getElementsByClassName(className)[0].style.display = 'none'
}
function selectCountry(event) {
    console.log(event);
    document.forms[0].country.value = event.target.innerText

    const node = document.getElementsByClassName('search-box')[0]
    node.style.display = 'none'
    node.innerHTML = ''
}

function init() {
    let items = document.getElementsByClassName('valid-feedback')
    for (const item of items) {
        item.style.display = 'none'
    }
    items = document.getElementsByClassName('invalid-feedback')
    for (const item of items) {
        item.style.display = 'none'
    }

    document.getElementsByClassName('search-box')[0].style.display = 'none'
}

init()