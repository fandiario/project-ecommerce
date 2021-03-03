function passwordValidation (inputPassword) {
    let result = false
    let numbers = "0123456789"

    if (inputPassword.length <= 6) {
        result = false
    }

    for (let i = 0; i < inputPassword.length; i ++) {
        for (let j = 0; j < numbers.length; j++) {

            if (inputPassword[i] === numbers[j]) {
                result = true
            } 
        }
    }

    return result
}

export default passwordValidation