function phoneValidation (inputPhone) {

    let result = true

    if (inputPhone.length < 9 || inputPhone.length > 12) {
        result = false
    }

    for (let i = 0; i < inputPhone.length; i++) {
        if ( !(inputPhone[i] >= 0 )) {
            result = false
        }

        if (inputPhone[i] === " ") {
            result = false
        }
    }

    return result   

}

// console.log (phoneValidation("0,19279-1"))

export default phoneValidation




