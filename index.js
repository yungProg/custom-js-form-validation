const form = document.querySelector("form");
const formFields = {
    email: document.getElementById("email"),
    country: document.getElementById("country"),
    postalCode: document.getElementById("postal-code"),
    password: document.getElementById("password"),
    passwordConfirmation: document.getElementById("password-confirmation")
}
const errorFields = {
    email: document.querySelector(".email-error"),
    country: document.querySelector(".country-error"),
    postalCode: document.querySelector(".postal-code-error"),
    password: document.querySelector(".password-error"),
    passwordConfirmation: document.querySelector(".password-confirmation-error")
}

const errorMessage = {
    empty: {
        email: "Email field can't be empty",
        password: "Enter password please",
        postalCode: "Please let's know your postal code",
    },
    notType: {
        email: "Email format should be someone@example.com or someone@example",
        postalCode: "Not a valid postal code",
        password: "Password should have at least one uppercase, one digit, one punctuation",
    },
    short: {
        password: "Password should be at least 8 characters long"
    },
    inEqual: {
        passwordConfirmation: "Password doesn't match"
    }
}

function showError (node, errorSpan, name, msg) {
    if (node.validity.valueMissing) {
        errorSpan.textContent = errorMessage.empty[name];
    } else if (node.validity.typeMismatch) {
        errorSpan.textContent = errorMessage.notType[name]
    } else if (node.validity.tooShort) {
        errorSpan.textContent = errorMessage.short[name]
    }else if (node.validity.patternMismatch) {
        errorSpan.textContent = ""
    }
     else {
        errorSpan.textContent = msg
    }
}

// form.addEventListener("input", (e) => {    
//     if(e.target.validity.valid) {
//         e.target.nextSibling.nextSibling.nextSibling.textContent = ""
//         e.target.nextSibling.nextSibling.nextSibling.classList.remove("active")
//     }else {
//         showError(e.target, e.target.nextSibling.nextSibling.nextSibling, e.target.dataset.name)
//         e.target.nextSibling.nextSibling.nextSibling.classList.add("active")
//     }
// })

formFields.email.addEventListener("input", () => {
    if (formFields.email.validity.valid) {
        errorFields.email.textContent = ""
        errorFields.email.classList.remove("active")
    }else {
        showError(formFields.email, errorFields.email, "email")
        errorFields.email.classList.add("active")
    }
})

formFields.postalCode.addEventListener("input", () => {

})

formFields.password.addEventListener("input", () => {
    const upcase = formFields.password.value.match(/[A-Z]/)
    const specialChar = formFields.password.value.match(/[^\w\s]/)
    const digit = formFields.password.value.match(/\d/)
    const upcaseP = document.querySelector(".uppercase")
    const specialCharP = document.querySelector(".special-char")
    const digitP = document.querySelector(".digit")    
    if (upcase) {
        upcaseP.classList.remove("active")
    } else {
        upcaseP.classList.add("active")
    }
    if (specialChar) {
        specialCharP.classList.remove("active")
    } else {
        specialCharP.classList.add("active")
    }
    if (digit) {
        digitP.classList.remove("active")
    } else {
        digitP.classList.add("active")
    }
    if (formFields.password.validity.valid) {
        errorFields.password.textContent = ""
        errorFields.password.classList.remove("active")
    }else {
        showError(formFields.password, errorFields.password, "password")
        errorFields.password.classList.add("active")
    }
})

formFields.passwordConfirmation.addEventListener("input", () => {
    if (formFields.password.value === formFields.passwordConfirmation.value) {
        errorFields.passwordConfirmation.textContent = "";
        errorFields.passwordConfirmation.classList.remove("active")
    }else {
        showError(formFields.passwordConfirmation, errorFields.passwordConfirmation, "p", errorMessage.inEqual.passwordConfirmation)
        errorFields.passwordConfirmation.classList.add("active")
    }
})

formFields.postalCode.addEventListener("input", checkPostalCode)
formFields.country.addEventListener("change", checkPostalCode)

function checkPostalCode() {
    const countrySelect = formFields.country.value
    const countries = {
        Switzerland: [/^\d{4}$/, "Postal code should be 4 digits"],
        Nigeria: [/^\d{6}$/, "Postal code should be 6 digits"],
        USA: [/^\d{5}((-\d{4})?)$/, "Postal code should be 5 digits or 5+4 digits format"],
        Germany: [/^\d{5}$/, "Postal code should be 5 digits"],
        Netherlands: [/^\d{4} [a-zA-Z]{2}$/, "Postal code should be 4 digits followed by 2 uppercase letters"],
        Spain: [/^\d{5}$/, "Postal code should be 5 digits"],
        France: [/^\d{5}$/, "Postal code should be 5 digits"],
        UK: [/\w+/, "Postal code should be alphanumeric"],
        Japan: [/^\d{3}-\d{4}$/, "Postal code should be 3 digits + hyphen + 4 digits"],
        SouthKorea: [/^\d{5}$/, "Postal code should be 5 digits"]
    }
    const reg = new RegExp(countries[countrySelect][0])
    if (reg.test(formFields.postalCode.value)) {
        errorFields.postalCode.textContent = ""
    } else {
        errorFields.postalCode.textContent = countries[countrySelect][1]
    }
}

function isAllValid() {
    for (const key in formFields) {
        if (!formFields[key].validity.valid) {
            showError(formFields[key], errorFields[key], key)
            return false
        }
    }
    return true
}

form.addEventListener("submit", (e) => {
    // e.preventDefault()
    if (!isAllValid()) {
        console.log("fail");
        
        e.preventDefault()
    } else {
        console.log("success");
    }
})