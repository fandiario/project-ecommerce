function usernameValidation (inputUsername) {
    let result = true

    if (inputUsername.length < 6) {
        result = false
    }

    return result
}

export default usernameValidation