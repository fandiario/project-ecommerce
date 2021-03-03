function emailValidation (inputEmail) {
    let result = true
    let arr = []

    let specialChara = "`~!#$%^&*()+={[]}|:;,/"

    for (let i = 0; i < inputEmail.length; i++) {
        if (inputEmail[0] === "@") {
            result = false
        }

        if (inputEmail[0] === ".") {
            result = false
        }

        if (inputEmail[i] === "@" && inputEmail[i-1] === "@") {
            result = false
        }

        if (inputEmail[i] === "." && inputEmail[i-1] === ".") {
            result = false
        }

        if (inputEmail[i] === "@") {
            arr.push (inputEmail[i])

            if (arr.length !== 1) {
                result = false
                arr = []
            }

            if (inputEmail[i + 1] === "" || inputEmail[i + 1] === " ") {
                result = false
            }

        }

        for (let j = 0; j < specialChara.length; j++) {
            if (inputEmail[i] === specialChara[j]) {
                result = false
            }

        }
    }

    return result
}

export default emailValidation