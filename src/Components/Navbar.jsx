import React from "react"
import Axios from "axios"
import swal from 'sweetalert'

import {Link} from "react-router-dom"
// import { Alert } from 'reactstrap'

import linkAPI from "../Supports/Constants/LinkAPI"
import linkAPICarts from "../Supports/Constants/linkAPICarts"

import {connect} from "react-redux"
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 
    { 
        faUser,faSearch, faShoppingCart, faBars, faCog, faUserPlus, faSignInAlt, faSignOutAlt, faEye, faEyeSlash
    } from '@fortawesome/free-solid-svg-icons'



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
        passwordValid: null,
        currentTotalCarts: 0,
        eyeCon: true
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
        // Check Phone
        let loginEmailPhone = this.refs.emailPhoneLogin.value

        if (loginEmailPhone[0] >= 0) {
            Axios.get (linkAPI + "?phone=" + loginEmailPhone)

            .then ((res) => {
                if (res.data.length === 1) {
                    this.setState ({emailPhoneValid : true})
                    this.setState ({errLoginEmailPhone: null})

                } else {
                    this.setState ({errLoginEmailPhone: "Phone Number isn't found"})
                }
            })

            .catch ((err) => {
                console.log (err)
            })

        } else {
            // Check Email 
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
                // console.log (res.data)
                this.setState ({showModal: false})
                
                swal({
                    title: "Log In",
                    text: "You have been logged in",
                    icon: "success",
                    className:"furniture-border-primary"
                })

                window.location = "/"
               
            })

            .catch ((err)=> {
                console.log (err)
            })
        } else {
            // alert ("Email or Phone Number and Password are not match.")
            swal({
                text: "Email or Phone Number and Password are not match.",
                icon: "error",
                className:"furniture-border-primary"
            })

            this.setState ({showModal: false})
        }

    }

    logOut = () => {
        
        swal({
            title: "Are you sure you want to log out?",
            icon: "warning",
            className:"furniture-border-primary",
            buttons: true,
            dangerMode: true,
          })
          .then((res) => {
              
            if (res) {
                localStorage.removeItem ("id")
                window.location = "/"
                swal("You have been logged out.", {
                    icon: "success",
                    className:"furniture-border-primary"
                })

            } 
        });
    }

    switchInput = () => {

        this.setState ({eyeCon: !this.state.eyeCon})
    }

    getCurrentTotalCarts = () => {  
        let userId = localStorage.getItem ("id")

        Axios.get (linkAPICarts+`?idUser=${userId}`)

        .then ((res) => {
            this.setState ({currentTotalCarts: res.data.length})
        })

        .catch ((err) => {
            console.log (err)
        })

    }

    getToCartPage = () => {
        let userId = localStorage.getItem ("id")
        
        userId ?
            window.location = `/cart/${userId}`
        :
            swal ({
                text: "You haven't logged in yet!",
                icon: "error",
                className:"furniture-border-primary"                
            })
    }

    
    componentDidMount () {
        this.getUsername ()
        this.getCurrentTotalCarts ()
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
                                <a href="http://localhost:3000/" className="furniture-link">
                                    <span className="font-weight-bold">
                                        Magasin 
                                    </span>
                                    <span className="font-italic">
                                        de 
                                    </span>
                                    <span className="font-weight-bold">
                                        Meubles 
                                    </span>
                                </a>
                            </div>

                            {/* Only appear on desktop */}
                            <div className="d-none d-lg-block">
                                <span>
                                    Home Interior
                                </span>
                                
                                <span className="mx-3">
                                    Office Interior
                                </span> 

                                <span className="mx-3">
                                    Interior Design
                                </span>

                                <span>
                                    <Link to="/products" className="furniture-link">Products</Link>
                                </span>

                            </div>

                            <div className="d-none d-md-block">
                                <span className= "">
                                    {
                                        this.state.username ? `Hi, ${this.state.username}` : null
                                    }
                                </span>
                                
                                <span>
                                    <ButtonDropdown isOpen={this.state.showDropDown} toggle= {() => this.setState({showDropDown: !this.state.showDropDown})} className="bt furniture-bt-primary">
                                        <DropdownToggle caret color="furniture-bg-primary" className="text-light">
                                            <FontAwesomeIcon icon= {faUser} className="mr-3"></FontAwesomeIcon>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem>
                                                {
                                                    localStorage.getItem ("id") ? 
                                                        null 
                                                    : 
                                                    <a href="http://localhost:3000/register" className="furniture-link">
                                                        <span>
                                                            <FontAwesomeIcon icon={faUserPlus} className="mr-1"></FontAwesomeIcon>
                                                            Add User
                                                        </span> 
                                                    </a>
                                                }
                                            </DropdownItem>
                                            <DropdownItem>
                                                {
                                                    localStorage.getItem ("id") ? 
                                                        null 
                                                    : 
                                                    <span className="furniture-clickable-element" onClick ={() => this.setState ({showModal: true})}>
                                                        <FontAwesomeIcon icon={faSignInAlt} className="mr-1" ></FontAwesomeIcon>
                                                        Log In
                                                    </span>
                
                                                }
                                            </DropdownItem>
                                            <DropdownItem>
                                                {
                                                    localStorage.getItem ("id") ? 
                                                        <span>
                                                            <FontAwesomeIcon icon={faCog} className="mr-1" ></FontAwesomeIcon>
                                                            Edit User
                                                        </span>
                                                          
                                                    : 
                                                        null
                                                }
                                            </DropdownItem>
                                            <DropdownItem>
                                                {
                                                    localStorage.getItem ("id") ? 
                                                    <span className="furniture-clickable-element" onClick={this.logOut}>
                                                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-1"></FontAwesomeIcon>
                                                        Log Out
                                                    </span> 
                                                    : 
                                                        null
                                                }
                                            </DropdownItem>
                                        </DropdownMenu>

                                    </ButtonDropdown>
                                </span>

                                <span className="furniture-clickable-element" onClick={this.getToCartPage}>
                                    <FontAwesomeIcon icon= {faShoppingCart}></FontAwesomeIcon>
                                        {
                                            localStorage.getItem("id") ?
                                                <span className="badge badge-pill badge-light mx-1">{(this.state.currentTotalCarts)} item(s)</span>
                                            :
                                                null
                                        }
                                </span>
        
                            </div>

                            {/* Only apper on tablet */}
                            <div className="d-block d-md-none">
                                <span className= "mr-2">
                                    {
                                        this.state.username ? `Hi, ${this.state.username}` : null
                                    }
                                </span>
                                
                                <span className="furniture-clickable-element mr-2" onClick={this.logOut}>
                                    {   
                                        this.state.username ? `/ Logout` : null
                                    }
                                </span>

                                <span className="furniture-clickable-elementk" onClick ={() => this.setState ({showModal: true})}>
                                    <FontAwesomeIcon icon= {faUser} className="mr-3"></FontAwesomeIcon>
                                </span>

                                <span className="furniture-clickable-element" onClick={this.getToCartPage}>
                                    <FontAwesomeIcon icon= {faShoppingCart}></FontAwesomeIcon>
                                        {
                                            localStorage.getItem("id") ?
                                                <span className="badge badge-pill badge-light mx-1">{(this.state.cartQuantity)} item(s)</span>
                                            :
                                                null
                                        }
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
                            <label htmlFor="emailPhoneLogin">Email or Phone Number</label>
                            <input type="text" className="form form-control" ref="emailPhoneLogin" onChange={this.checkEmailPhone}/>
                            <small className="text-muted">
                                {
                                    this.state.errLoginEmailPhone ? this.state.errLoginEmailPhone : null
                                }
                            </small>
                        </div>

                        <div className="my-3">
                            <div className="d-flex justify-content-between">
                                <label htmlFor="passwordLogin">Password</label>
                                <button className="btn bg-transparent" onClick={this.switchInput}>
                                    {
                                        this.state.eyeCon === true ?
                                            <FontAwesomeIcon icon= {faEye}></FontAwesomeIcon>
                                        :
                                            <FontAwesomeIcon icon= {faEyeSlash}></FontAwesomeIcon>
                                    }
                                </button>
                            </div>

                            <div>
                                {   
                                    this.state.eyeCon === true ?
                                        <input type="password" className="form form-control" ref="passwordLogin" onChange={this.checkPass}/>
                                    :
                                        <input type="text" className="form form-control" ref="passwordLogin" onChange={this.checkPass}/>
                                }
                            </div>
                            
                            
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
                    <ModalFooter>
                        <p>
                            Haven't registered yet ? 
                            <a href="http://localhost:3000/register"> Register here</a>
                        </p>
                    </ModalFooter>

                </Modal>

                
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        carts: state.carts
    }
}

export default connect (mapStateToProps, "") (Navbar)
// export default Navbar