import React from "react"
import Axios from "axios"
import swal from "sweetalert"

import linkAPI from "../../Supports/Constants/LinkAPI"
import usernameValidation from "../../Supports/Functions/usernameValidation"
import emailValidation from "../../Supports/Functions/emailValidation"
import phoneValidation from "../../Supports/Functions/phoneValidation"
import passwordValidation from "../../Supports/Functions/passwordValidation"


class UserSetting extends React.Component {
    state= {
        dataUser: null,
        errorUsername: null,
        usernameValid: false,
        usernameSubmit:null,
        errorEmail: null,
        emailValid: false,
        emailSubmit:null,
        errorPhone: null,
        phoneValid: false,
        phoneSubmit: null,
        errorPassword: null,
        passwordValid: false,
        passwordSubmit: null,
        errorConfirmPass: null,
        confirmPassValid: false,
        errorAddress: null,
        address1Submit: null,
        address2Submit: null,
        addressValid: false,
        check1: false,
        check2: false
    }

    getDataUser = () => {
        let idUser = localStorage.getItem ("id")

        Axios.get (linkAPI+`/${idUser}`)

        .then ((res) => {
            // console.log (res.data)
            this.setState ({dataUser: res.data})
        })

        .catch ((err) => {
            console.log (err)
        })
    }

    usernameCheck = () => {
        let editUsernameVal = this.refs.editUsername.value
        let usernameValidRes = usernameValidation (editUsernameVal)

        if (usernameValidRes !== true) {
            this.setState ({errorUsername: "Incorrect Username format"})
        
        } else {
            this.setState ({errorUsername: null})

            Axios.get (linkAPI +`?username=${editUsernameVal}`)

            .then ((res) => {
                // console.log (res.data[0].username)
                // console.log (editUsernameVal)

                if (res.data[0].username !== this.state.dataUser.username){
                    if (res.data.length > 0) {
                        this.setState ({errorUsername: "Username has been registered"})
                    
                    } else {
                        this.setState ({usernameValid: true})
                        this.setState ({usernameSubmit: editUsernameVal})
                    }

                } else {
                    this.setState ({usernameValid: true})
                    this.setState ({usernameSubmit: editUsernameVal})
                }

            })

            .catch ((err) => {
                console.log (err)
            })
        } 

    }

    emailCheck = () => {
        console.log (this.state.dataUser.email)
        this.setState ({emailValid: true})

        // let editEmailVal = this.refs.editEmail.value
        // let emailValidRes = emailValidation (editEmailVal)

        // if (emailValidRes !== true) {
        //     this.setState ({errorEmail: "Incorrect Email format"})

        // } else {
        //     this.setState ({errorEmail: null})

        //     if (this.state.dataUser.email === null) {
        //         this.setState ({emailValid: true})
        //         this.setState ({emailSubmit: editEmailVal})

        //     } else {

        //         Axios.get (linkAPI + `?email=${editEmailVal}`)

        //         .then ((res) => {

        //             if (res.data[0].email !== this.state.dataUser.email ) {

        //                 if (res.data.length > 0) {
        //                     this.setState ({errorEmail: "This email has been registered"})
                        
        //                 } else {
        //                     this.setState ({emailValid: true})
        //                     this.setState ({emailSubmit: editEmailVal})
        //                 }

        //             } else {
        //                 this.setState ({emailValid: true})
        //                 this.setState ({emailSubmit: editEmailVal})

        //             }

        //         })

        //         .catch ((err) => {
        //             console.log (err)
        //         })

        //     }

            
        // }
    }

    phoneCheck = () => {
        console.log (this.state.dataUser.phone)
        this.setState ({phoneValid: true})
        // let editPhoneVal = this.refs.editPhone.value
        // let phoneValidRes = phoneValidation (editPhoneVal)

        // if (phoneValidRes !== true) {
        //     this.setState ({errorPhone: "Incorrect Phone number format"})

        // } else {
        //     this.setState ({errorPhone: null})

        //     Axios.get (linkAPI + `?phone=${editPhoneVal}`)

        //     .then ((res) => {
        //         if (res.data[0].phone !== this.state.dataUser.phone) {

        //             if (res.data.length > 0) {
        //                 this.setState ({errorPhone: "This Phone number has been registered"})
                    
        //             } else {
        //                 this.setState ({phoneValid: true})
        //                 this.setState ({phoneSubmit: editPhoneVal})
        //             }

        //         } else {
        //             this.setState ({phoneValid: true})
        //             this.setState ({phoneSubmit: editPhoneVal})
        //         }

        //     })

        //     .catch ((err) => {
        //         console.log (err)
        //     })
        // }
    }

    passwordCheck = () => {
        let editPassVal = this.refs.editPassword.value
        let editPassValRes = passwordValidation (editPassVal)

        if (editPassValRes !== true) {
            this.setState ({errorPassword: "Incorrect Password Format"})
        
        } else {
            this.setState ({errorPassword: null})

            Axios.get (linkAPI + `?password=${editPassVal}`)

            .then ((res) => {
                if (res.data[0].password !== this.state.dataUser.password) {

                    if (res.data.length > 0) {
                        this.setState ({errorPassword: "This Password has been registered."})
                    
                    } else {
                        this.setState ({passwordValid: true})
                    }

                } else {
                    this.setState ({passwordValid: true})
                }

            })

            .catch ((err) => {
                console.log (err)
            })
        }
    }

    confirmPassCheck = () => {
        let editPassVal = this.refs.editPassword.value
        let editConfirmPassVal = this.refs.editConfirmPass.value

        if (editPassVal === editConfirmPassVal) {

            this.setState ({errorConfirmPass: null})
            this.setState ({passwordSubmit: editPassVal})
            this.setState ({confirmPassValid: true})

        } else {
            this.setState ({errorConfirmPass: "The Confirmed password doesn't match."})
        }

        if (editConfirmPassVal === "" || editConfirmPassVal.length === 0) {
            this.setState ({errorConfirmPass: null})
        }
    }

    addressCheck = () => {
        let address1Val = this.refs.editAddress1
        let address2Val = this.refs.editAddress2

        if (address1Val === " " || address2Val === " ") {
            this.setState ({errorAddress: "You can't enter your Address with an empty string or a space"})
            
        } else if (address1Val !== null || address2Val !== null) {
            this.setState ({errorAddress: null})
            this.setState ({address1Submit: address1Val})
            this.setState ({address2Submit: address2Val})
            this.setState ({addressValid: true})
        }

    }

    dataSubmit = () => {
        let idUser = localStorage.getItem ("id")

        let dataToSend = {
            username: this.state.usernameSubmit,
            password: this.state.passwordSubmit,
            email: this.state.emailSubmit,
            phone: this.state.phoneSubmit,
            address: {
                address1: this.state.address1Submit,
                address2: this.state.address2Submit
            },
            role: "user" 
        }

        if (this.state.usernameValid === true && this.state.passwordValid === true && this.state.addressValid === true && this.state.phoneValid === true) {
            this.setState ({check1 : true})
        }

        if (this.state.usernameValid === true && this.state.passwordValid === true && this.state.addressValid === true && this.state.emailValid === true) {
            this.setState ({check2 : true})
        }

        console.log (`username = ${this.state.usernameValid}`)
        console.log (`password = ${this.state.passwordValid}`)
        console.log (`address = ${this.state.addressValid}`)
        console.log (`email = ${this.state.emailValid}`)
        console.log (`phone = ${this.state.phoneValid}`)
        

        console.log (this.state.check1)
        console.log (this.state.check2)

        // if (this.state.check1 || this.state.check2 === true) {

        //     swal({
        //         title: "Are you sure?",
        //         text: "Make sure you have to double check your given data.",
        //         icon: "warning",
        //         buttons: true,
        //         dangerMode: true,
        //         className:"furniture-border-primary"
        //     })
            
        //     .then((willSend) => {

        //         if (willSend) {
                   
        //             Axios.put (linkAPI + `?id=${idUser}`, dataToSend) 

        //             .then ((res) => {
        //                 if (res.status === 201) {

        //                     swal("Your data have been updated!", {
        //                         icon: "success",
        //                         className:"furniture-border-primary"
        //                     })

        //                 } else {
        //                     swal ({
        //                         title: `Error code ${res.status}`,
        //                         icon: "error",
        //                         className:"furniture-border-primary"
        //                     })
        //                 }
        //             })

        //             .catch ((err) => {
        //                 console.log (err)
        //             })
                    
        //         } else {
        //             swal("Your data hasn't been updated!");
        //         }
        //     })
            
        // } else {
        //     swal({
        //         title: "Error!",
        //         text: "You have to fill some necessary data field",
        //         icon: "error",
        //       })
        // }

        


    }


    componentDidMount () {
        this.getDataUser ()
    }

    // componentDidUpdate () {
    //     this.getDataUser ()
    // }


    render () {
        if (this.state.dataUser === null) {
            
            return (
                <div className="container">
                    <div className="d-flex justify-content-center mt-5">
                        <div className="spinner-grow" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="container">
                <div className="row">
                    <h1>
                        User Profile
                    </h1>
                    <div className="col-12 furniture-bg-primary my-2" style={{height: "5px"}}></div>
                </div>

                {/* Error Section */}
                <div className="row flex-column align-items-center">

                    {/* Error Username */}
                    {
                        this.state.errorUsername ?
                            <div className="alert alert-danger" role="alert">
                                {this.state.errorUsername}
                            </div>
                        :
                            null
                    }

                    {/* Error Email */}
                    {
                        this.state.errorEmail ?
                            <div className="alert alert-danger" role="alert">
                                {this.state.errorEmail}
                            </div>
                        :
                            null
                    }

                    {/* Error Phone Number */}
                    {
                        this.state.errorPhone ?
                            <div className="alert alert-danger" role="alert">
                                {this.state.errorPhone}
                            </div>
                        :
                            null
                    }

                    {/* Error Password */}
                    {
                        this.state.errorPassword ?
                            <div className="alert alert-danger" role="alert">
                                {this.state.errorPassword}
                            </div>
                        :
                            null
                    }

                    {/* Error Confirmed Password */}
                    {
                        this.state.errorConfirmPass ?
                            <div className="alert alert-danger" role="alert">
                                {this.state.errorConfirmPass}
                            </div>
                        :
                            null
                    }

                    {/* Error Address */}
                    {
                        this.state.errorAddress ?
                            <div className="alert alert-danger" role="alert">
                                {this.state.errorAddress}
                            </div>
                        :
                            null
                    }

                </div>

                <div className="row flex-column align-items-center mt-3">
                    <div className="col-6 furniture-border-primary d-flex flex-column align-items-center shadow">
                        <div className="col-11 form-group mt-2">
                            <label htmlFor="editUsername">
                                Username :
                            </label>
                            <input type="text" ref="editUsername" className="form-control" defaultValue={this.state.dataUser.username} onChange={this.usernameCheck}/>
                            <small className="text-muted">Min.length of username is 6 characters</small>
                        </div>
                        <div className="col-11 form-group">
                            <label htmlFor="editEmail">
                                Email : <sup>*</sup>
                            </label>
                            <input type="text" ref="editEmail" className="form-control" defaultValue={this.state.dataUser.email} onChange={this.emailCheck}/>
                            <small className="text-muted">ex : namasaya@email.com</small>
                        </div>
                        <div className="col-11 form-group">
                            <label htmlFor="editPhone">
                                Phone : <sup>*</sup>
                            </label>
                            <input type="text" ref="editPhone" className="form-control" defaultValue={this.state.dataUser.phone} onChange={this.phoneCheck}/>
                            <small className="text-muted">ex : 081112341234</small>
                        </div>
                        <div className="col-11 form-group">
                            <label htmlFor="editPassword">
                                Password :
                            </label>
                            <input type="password" ref="editPassword" className="form-control" defaultValue={this.state.dataUser.username} onChange={this.passwordCheck}/>
                            <small className="text-muted">Password consist of letter and number also min. 6 characters</small>
                        </div>
                        <div className="col-11 form-group">
                            <label htmlFor="editConfirmPass">
                                Confirm Password :
                            </label>
                            <input type="password" ref="editConfirmPass" className="form-control" onChange={this.confirmPassCheck}/>
                        </div>
                        <div className="col-11 form-group">
                            <label htmlFor="editAddress1">
                                Address 1: <sup>**</sup>
                            </label>
                            <textarea ref="editAddress1" rows="3" className="form-control" onChange={this.addressCheck}></textarea>
                        </div>
                        <div className="col-11 form-group">
                            <label htmlFor="editAddress2">
                                Address 2: <sup>**</sup>
                            </label>
                            <textarea ref="editAddress2" rows="3" className="form-control" onChange={this.addressCheck}></textarea>
                        </div>
                        <div className="col-11 mb-3">
                            <div>
                                <small className="text-muted">* : You can choose to fill either email or phone number data field</small>
                            </div>
                            <div>
                                <small className="text-muted">** : You can choose to fill either address 1 or 2 data field</small>
                            </div>
                            
                        </div>
                    </div>

                </div>
                    

                <div className="row justify-content-center my-5">
                    <div className="col-6 d-flex justify-content-between">
                        <div>
                            <input type="button" value="Cancel" className="btn btn-light furniture-border-primary shadow"/>
                        </div>

                        <div>
                            <input type="button" value="Update" className="btn furniture-bt-primary shadow" onClick={this.dataSubmit}/>
                        </div>
                    </div>
                </div>
                



                

                

            </div>
        )
    }
}

export default UserSetting