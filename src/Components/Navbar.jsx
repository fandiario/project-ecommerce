import React, {useState} from "react"
import Axios from "axios"
import linkAPI from "../Supports/Constants/LinkAPI"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faSearch, faShoppingCart, faBars} from '@fortawesome/free-solid-svg-icons'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';



// Navbar search box dibuat di bawah saja
class Navbar extends React.Component {

    state = {
        username: null,
        showModal: false,
        showDropDown: false,
        setOpen: false,
        errLoginEmailPhone: null,
        errLoginPass: null,
        emailPhoneValid: null,
        passwordValid: null
    }

    getUsername = () => {
        let idUser = localStorage.getItem ("id")

        if (idUser) {
            Axios.get (linkAPI + `/${idUser}`)

            .then ((res) => {
                this.setState ({username: res.data.username})
            })

            .catch ((err) => {
                console.log (err)
            })
        }
    }

    checkEmailPhone = () => {
        // Check Email and Phone
        let loginEmailPhone = this.refs.emailPhoneLogin.value

        if (loginEmailPhone[0] >= 0) {
            Axios.get (linkAPI + "?phone=" + loginEmailPhone)

            .then ((res) => {
                if (res.data.length === 1) {
                    this.setState ({emailPhoneValid : true})
                    this.setState ({errLoginEmailPhone: "null"})

                } else {
                    this.setState ({errLoginEmailPhone: "Phone Number isn't found"})
                }
            })

            .catch ((err) => {
                console.log (err)
            })

        } else {

            Axios.get (linkAPI + "?email=" + loginEmailPhone) 

            .then ((res) => {
                if (res.data.length === 1) {
                    this.setState ({emailPhoneValid : true})
                    this.setState ({errLoginEmailPhone: null})
                
                } else {
                    this.setState ({errLoginEmailPhone: "Email isn't found"})
                }
            })

            .catch ((err) => {
                console.log (err)
            })

        }

    }

    checkPass = () => {
        // Check Pass
        let loginPassword = this.refs.passwordLogin.value

        Axios.get (linkAPI + "?password=" + loginPassword)

        .then ((res) => {
            if (res.data.length === 1) {
                this.setState ({passwordValid: true})
                this.setState ({errLoginPass: null})
            
            } else {
                this.setState ({errLoginPass: "Password isn't found"})
            }
        })

        .catch ((err) => {
            console.log (err)
        })
    }

    logIn = () => {
        // Check Valid
        let loginPassword = this.refs.passwordLogin.value
        console.log ("check Login")

        if (this.state.emailPhoneValid === true && this.state.passwordValid === true ){
            console.log ("check Axios Login")
            Axios.get (linkAPI + "?password=" + loginPassword) 

            .then ((res) => {
                localStorage.setItem("id", res.data[0].id)
                console.log (res.data)
            })

            .catch ((err)=> {
                console.log (err)
            })
        }

    }

    logOut = () => {
        let confirm = window.confirm ("Are you sure you want to log out ?")

        if (confirm) {
            localStorage.removeItem ("id")
            window.location = "/"
        }
    }

    componentDidMount () {
        this.getUsername ()
    }

    componentDidUpdate () {
        this.getUsername ()
    }
    render () {
        return (
            <>
                <div className="furniture-bg-primary text-light">
                    <div className="container" style= {{height: "50px"}}>
                        <div className="row align-items-center justify-content-between pt-2">

                            {/* Only appear on tablet */}
                            <div className="d-block d-lg-none mx-3">
                                <FontAwesomeIcon icon= {faBars} ></FontAwesomeIcon>                            
                            </div>

                            {/* Appear on all size */}
                            <div className="furniture-font-size-25">
                                <span className="font-weight-bold">
                                    Magasin 
                                </span>
                                <span className="font-italic">
                                    de 
                                </span>
                                <span className="font-weight-bold">
                                    Meubles 
                                </span>
                            </div>

                            {/* Only appear on desktop */}
                            <div className="d-none d-lg-block">
                                <span className="mr-3">
                                    Home Interior
                                </span>
                                
                                <span className="mr-3">
                                    Office Interior
                                </span> 

                                <span className="mr-3">
                                    Interior Design
                                </span>

                            </div>

                            <div className="d-none d-md-block">
                                <span className= "mr-2">
                                    {
                                        this.state.username ? `Hi, ${this.state.username}` : null
                                    }
                                </span>

                                <a href="" className="furniture-link">
                                    <span className="mr-2" onClick={this.logOut}>
                                    {
                                        this.state.username ? `/ Logout` : null
                                    }
                                    </span>
                                </a>
                                
                                {/* <span>
                                    <ButtonDropdown isOpen={this.state.showDropDown} toggle= {() => this.setState({setOpen: true })} className="bt furniture-bt-primary">
                                        <DropdownToggle caret color="furniture-bg-primary" className="text-light">
                                            <FontAwesomeIcon icon= {faUser} className="mr-3"></FontAwesomeIcon>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem>Add User</DropdownItem>
                                            <DropdownItem>Login User</DropdownItem>
                                            <DropdownItem>Edit User</DropdownItem>
                                            <DropdownItem divider ></DropdownItem>
                                            <DropdownItem>Log Out</DropdownItem>
                                        </DropdownMenu>

                                    </ButtonDropdown>
                                </span> */}

                                <span onClick ={() => this.setState ({showModal: true})}>
                                    <FontAwesomeIcon icon= {faUser} className="mr-3"></FontAwesomeIcon>
                                </span>

                                <span>
                                    <FontAwesomeIcon icon= {faShoppingCart}></FontAwesomeIcon>
                                </span>
                            </div>

                            {/* Only apper on tablet */}
                            <div className="d-block d-md-none">
                                <span className= "mr-2">
                                    {
                                        this.state.username ? `Hi, ${this.state.username}` : null
                                    }
                                </span>
                                <span onClick ={() => this.setState ({showModal: true})}>
                                    <FontAwesomeIcon icon= {faUser} className="mr-3"></FontAwesomeIcon>
                                </span>

                                <span>
                                    <FontAwesomeIcon icon= {faShoppingCart} className="mr-3"></FontAwesomeIcon>
                                </span>
                            </div>
                            
                        </div>
                    </div>

                    <div className="furniture-bg-light">
                        <div className="container">
                            <div className="row text-dark" style= {{height: "50px"}}>
                                <div className="col-12 d-flex align-items-center justify-content-end">
                                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                                    <button className="btn furniture-bt-primary my-2 my-sm-0" type="submit">
                                        <FontAwesomeIcon icon= {faSearch}></FontAwesomeIcon>
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>

                    
                </div>

                {/* Modal Login*/}
                <Modal toggle= {() => this.setState({showModal: false})} isOpen={this.state.showModal}>
                    <ModalHeader>Login</ModalHeader>
                    <ModalBody>
                        <div>
                            <input type="text" placeholder="Insert your phone number / email" className="form form-control" ref="emailPhoneLogin" onChange={this.checkEmailPhone}/>
                            <small className="text-muted">
                                {
                                    this.state.errLoginEmailPhone ? this.state.errLoginEmailPhone : null
                                }
                            </small>
                        </div>

                        <div className="my-3">
                            <input type="password" placeholder="Insert your password" className="form form-control" ref="passwordLogin" onChange={this.checkPass}/>
                            <small className="text-muted">
                                {
                                    this.state.errLoginPass ? this.state.errLoginPass : null
                                }
                            </small>
                        </div>

                        <div>
                            <input type="button" value="Login" className="btn furniture-bt-primary" onClick={this.logIn}/>
                        </div>
                    </ModalBody>

                </Modal>

                
            </>
        )
    }
}

export default Navbar