import React from "react"
import Axios from "axios"

import phoneValidation from "../Supports/Functions/phoneValidation"
import emailValidation from "../Supports/Functions/emailValidation"
import usernameValidation from "../Supports/Functions/usernameValidation"
import passwordValidation from "../Supports/Functions/passwordValidation"

import linkAPI from "../Supports/Constants/LinkAPI"

// const linkAPI = "http://localhost:2000/users"

class Register extends React.Component {

    state = {
        errorEmailNumber: null,
        errorUsername: null,
        errorPassword: null,
        errorConfirmPassword: null,
        emailSubmit: null,
        phoneSubmit: null,
        usernameSubmit: null,
        passwordSubmit: null,
        passwordMatch: null
    }

    
    // Validation Email and Phone Number
    emailPhoneValidation = () => {

        let inputEmailPhone = this.refs.emailPhoneRegister.value

        // Phone Validation
        if (inputEmailPhone[0] >= 0) {

            let phoneValidationRes = phoneValidation (inputEmailPhone)
            console.log (phoneValidationRes)
            console.log (inputEmailPhone)

            if (phoneValidationRes !== true) {
                this.setState ({errorEmailNumber: "Incorrect phone number format"})
                console.log ("Incorrect phone number format")

            } else {
                this.setState ({errorEmailNumber: null})
                console.log ("check Axios Phone")

                Axios.get (linkAPI + "?phone=" + inputEmailPhone)

                .then ((res) => {
                    if (res.data.length > 0) {
                        this.setState ({errorEmailNumber: "This number has been registered"})
                        console.log ("This number has been registered")

                    } else {
                        this.setState ({phoneSubmit: inputEmailPhone})
                        console.log (`${this.state.phoneSubmit} has been added succefully`)
                    }
                })

                .catch ((err) => {
                    console.log (err)
                })

            }
            
            
        } else {
            // Email Validation

            let emailValidationRes = emailValidation (inputEmailPhone)
            console.log (emailValidationRes)
            console.log (inputEmailPhone)

            if (emailValidationRes !== true) {
                this.setState ({errorEmailNumber: "Incorrect email format"})
                console.log ("Incorrect email format")
            
            } else {
                this.setState ({errorEmailNumber: null})
                console.log ("check Axios Email")

                Axios.get (linkAPI + "?email=" + inputEmailPhone)

                .then ((res) => {
                    if (res.data.length > 0) {
                        this.setState ({errorEmailNumber: "This email has been registered"})
                        console.log ("This email has been registered")
                    
                    } else {
                        this.setState ({emailSubmit: inputEmailPhone})
                        console.log (`${this.state.emailSubmit} has been added successfully`)
                    }
                })
            }

        }
    }

    usernameValidation = () => {

        let inputUsername = this.refs.usernameRegister.value
        let usernameValidationRes = usernameValidation (inputUsername)

        if (usernameValidationRes !== true) {
            this.setState ({errorUsername: "Incorrect Username format"})
            console.log ("Incorrect Username format")

        } else {
            this.setState ({errorUsername: null})
            console.log ("check Axios Username")
            
            Axios.get (linkAPI + "?username=" + inputUsername) 

            .then ((res) => {
                if (res.data.length > 0) {
                    this.setState ({errorUsername: "This Username has been registered"})
                    console.log ("This Username has been registered")

                } else {
                    this.setState ({usernameSubmit: inputUsername})
                    console.log (`${this.state.usernameSubmit} has been added successfully`)
                }
            })

            .catch ((err) => {
                console.log (err)
            })

        }
    }

    passwordValidation = () => {
        let inputPassword = this.refs.passwordRegister.value
        // let inputConfirmPassword = this.refs.confirmPasswordRegister.value

        let passwordValidationRes = passwordValidation (inputPassword)

        if (passwordValidationRes !== true) {
            this.setState ({errorPassword: "Incorrect Password Format"})
            console.log ("Incorrect Password Format")

        } else {
            this.setState ({errorPassword: null})
            console.log ("check Axios Password")

            Axios.get (linkAPI + "?password=" + inputPassword)

            .then ((res) => {
                if (res.data.length > 0 ) {
                    this.setState ({errorPassword: "This Password has been registered"})
                    console.log ("This Password has been registered")
                }

            })

            .catch ((err) => {
                console.log (err)
            })
        }

    }

    confirmPasswordValidation = () => {
        let inputPassword = this.refs.passwordRegister.value
        let inputConfirmPassword = this.refs.confirmPasswordRegister.value
        console.log (`${inputPassword}`)
        console.log (`${inputConfirmPassword}`)

        if (inputPassword === inputConfirmPassword) {
            // this.setState ({passwordSubmit: inputPassword})
            this.setState ({passwordMatch: true})
            this.setState ({errorConfirmPassword: null})
            this.setState ({passwordSubmit: inputPassword})
            console.log (`Password Match is ${this.state.passwordMatch}`)

        } else {
            this.setState ({errorConfirmPassword: "Password doesn't match with confirmed password"})
            console.log ("Password doesn't match with confirmed password")
        }

        if (inputConfirmPassword.length === 0 || inputConfirmPassword === "") {
            this.setState ({errorConfirmPassword: null})
        }

        // if (this.state.passwordMatch === true) {
        //     this.setState ({passwordSubmit: inputPassword})
        //     console.log (`${this.state.passwordSubmit} has been added successfully`)
        // }

    }

    submitRegister = () => {
        let usernameInput = this.state.usernameSubmit
        let passwordInput = this.state.passwordSubmit
        let emailInput = this.state.emailSubmit
        let phoneInput = this.state.phoneSubmit

        let dataUser = {
            username : usernameInput,
            password : passwordInput,
            email : emailInput,
            phone : phoneInput,
            role: "user" 
        }
        console.log ("check before Axios register")

        if (this.state.passwordMatch === true && usernameInput && passwordInput && emailInput || this.state.passwordMatch === true && usernameInput && passwordInput && phoneInput) {
            console.log ("check Axios register")

            Axios.post (linkAPI, dataUser)

            .then ((res) => {
                if (res.status === 201) {
                    console.log ("Data User has been registered")
                    alert ("Data User has been registered")

                    this.refs.emailPhoneRegister.value = ""
                    this.refs.usernameRegister.value = ""
                    this.refs.passwordRegister.value = ""
                    this.refs.confirmPasswordRegister.value = ""

                    localStorage.setItem("id", res.data.id)
                    window.location = '/'
                }
            })

            .catch ((err) => {
                console.log (err)
            })
        }
    }
    
    render () {
        return (
            <div className="container">

                <div className= "row">

                    <div className="col-6">

                        <div className="d-flex flex-column justify-content-around m-3">
                            <h1>
                                Register
                            </h1>

                            <form style={{width: "75vh"}}>
                                <div className="form-group">
                                    <label htmlFor="emailPhoneRegister">Email address or Phone Number</label>
                                    <input type="text" className="form-control" ref="emailPhoneRegister" placeholder="ex : 081112341234 or namasaya@email.com" onChange={this.emailPhoneValidation}/>    
                                    <small className="text-muted">
                                        {
                                            this.state.errorEmailNumber ? this.state.errorEmailNumber : null
                                        }
                                    </small>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="usernameRegister">Username</label>
                                    <input type="text" className="form-control" ref="usernameRegister" placeholder="Min.length of username is 6 characters" onChange={this.usernameValidation}/>
                                    <small className="text-muted">
                                        {
                                            this.state.errorUsername ? this.state.errorUsername : null
                                        }
                                    </small>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="passwordRegister">Password</label>
                                    <input type="password" className="form-control" ref="passwordRegister" placeholder="Password consist of letter and number also min. 6 characters" onChange={this.passwordValidation}/>
                                    <small className="text-muted">
                                        {
                                            this.state.errorPassword ? this.state.errorPassword : null
                                        }
                                    </small>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirmPasswordRegister">Confirm Password</label>
                                    <input type="password" className="form-control" ref="confirmPasswordRegister" onChange= {this.confirmPasswordValidation}/>
                                    <small className="text-muted">
                                        {
                                            this.state.errorConfirmPassword ? this.state.errorConfirmPassword : null
                                        }
                                    </small>
                                </div>
                            
                                <input type="button" value="Submit" className="btn furniture-bt-primary" onClick={this.submitRegister}/>
                            </form>
                        
                        </div>

                    </div>

                </div>
                
            </div>
        )
    }

}

export default Register