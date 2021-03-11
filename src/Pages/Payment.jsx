import React from "react"
import Axios from "axios"
import swal from "sweetalert"

import linkAPI from "../Supports/Constants/LinkAPI"
import linkAPITransactions from "../Supports/Constants/LinkAPITransactions"

import { Form, FormGroup } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faMobile } from '@fortawesome/free-solid-svg-icons'

class Payment extends React.Component {

    state = {
        dataUser : null,
        dataTransaction: null,
        shippingPrice: 0
    }

    getDataUser = () => {
        let userId = localStorage.getItem ("id")

        Axios.get (linkAPI + `/${userId}`)

        .then ((res) => {
            this.setState ({dataUser: res.data})
        })

        .catch ((err) => {
            console.log (err)
        })
    }

    mapDataUser = () => {
        if (this.state.dataUser === null) {
            return (
                <div className="col-12 furniture-font-size-14">
                    <div className="spinner-grow" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )

        } else {

            return (
                <div >
                    <div className="col-12 furniture-font-size-14">
                        <div>
                            id : {this.state.dataUser.id}
                        </div>

                        <div>
                            username: {this.state.dataUser.username}
                        </div>

                        
                        {
                            this.state.dataUser.address ?
                                <div>
                                    Address: {this.state.dataUser.address}
                                </div>
                            :
                            <div>
                                Address: Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                            </div>
                        }
                        
                        

                        <div>
                            <span className="mr-3">
                                <FontAwesomeIcon icon= {faEnvelope} className="mr-1"></FontAwesomeIcon>
                                Email: {this.state.dataUser.email}
                            </span>

                            <span>
                                <FontAwesomeIcon icon= {faMobile} className="mr-1"></FontAwesomeIcon>
                                Phone: {this.state.dataUser.phone}
                            </span>
                        </div>


                    </div>
                </div>
            )
        }
    }

    getDataTransaction = () => {
        let idTransaction = this.props.location.pathname.split("/")[2]
        Axios.get (linkAPITransactions+ `/${idTransaction}`)

        .then ((res) => {
            // Is it User's transaction ?
            // console.log (this.state.dataUser.id)
            // this.setState ({dataTransaction: res.data})

            if (res.data.idUser === localStorage.getItem("id")) {
                this.setState ({dataTransaction: res.data})

            } else {
                window.history.back ()
            }


            // console.log (res.data)
            // if (this.state.dataUser.id === localStorage.getItem("id")) {
            //     this.setState ({dataTransaction: res.data})

            // } else {
            //     window.history.back ()
            // }
            
        })

        .catch ((err) => {
            console.log (err)
        })
    }


    mapDataTransaction = () => {        
        return this.state.dataTransaction.detail.map ((el, i) => {
            return (
                <div key={i}>
                    <div className="row my-3 furniture-font-size-18">
                        <div className="col-3">
                            <div>
                                {el.productName}
                            </div>
                        </div>

                        <div className="col-3">
                            <div>
                                {el.quantity} item(s)
                            </div>
                        </div>

                        <div className="col-3">
                            <div>
                                Rp. {((el.productPrice - (el.productPrice * (el.discPrice / 100)))).toLocaleString ()}
                            </div>
                        </div>
                        
                        <div className="col-3">
                            <div>
                            Rp. {((el.productPrice - (el.productPrice * (el.discPrice / 100))) * el.quantity).toLocaleString ()}
                            </div>
                        </div>
                        
                    </div>
                    
                </div>

            )
            
        })

        
    }

    payment = () => {
        // Get idTransaction
        let idTransaction = this.props.location.pathname.split ("/")[2]

        // Get Date
        let date = new Date ()
        date = date.toString()

        let pastDate = this.state.dataTransaction.history.unpaidAt

        let newDate = date.split (" ")[2] + "-" + date.split (" ")[1] + "-" + date.split (" ")[3] + " " + date.split (" ")[4] 

        Axios.patch (linkAPITransactions + `/${idTransaction}`, {status: "paid", history: {unpaidAt: pastDate, paidAt: newDate}})

        .then ((res) => {

            swal({
                title: "Thank You !",
                text: "Your Payment has been accepted!",
                icon: "success",
            })
            
            window.location = `/user-profile/${localStorage.getItem("id")}/user-history`
            
        })

        .catch ((err) => {
            console.log (err)
        })
    }

    cancelPayment = () => {

    }

    componentDidMount () {
        this.getDataUser ()
        this.getDataTransaction ()
    }

    componentDidUpdate () {
        // this.getDataUser ()
        // this.getDataTransaction ()
    }

    render () {

        if (this.state.dataTransaction === null ) {
            return (
                <div className="container">
                    <h1>
                        You haven't completed your check out.
                    </h1>
                </div>
            )
        } else {

            return (
                <div className="container">
    
                    {/* Invoice Section */}
                    <div className="row">
                        <h1>
                            Invoice
                        </h1>
                        <div className="col-12 furniture-bg-primary" style={{height: "5px"}}></div>
                    </div>
    
                    <div className="row my-3">
                        <div className="col-12 furniture-border-primary">
                            <div className="row">
    
                                {this.mapDataUser()}
                                
                            </div>

                            <div className="col-12 furniture-bg-primary" style={{height: "3px"}}></div>
    
                            <div className="row my-3 furniture-font-size-18">
                                <div className="col-3">
                                    <div>
                                        Product
                                    </div>
                                </div>
    
                                <div className="col-3">
                                    <div>
                                        Quantity
                                    </div>
                                </div>
    
                                <div className="col-3">
                                    <div>
                                        Price Per Unit
                                    </div>
                                </div>
                                
                                <div className="col-3">
                                    <div>
                                        Subtotal
                                    </div>
                                </div>
                                
                            </div>
    
                            {this.mapDataTransaction()}

                            <div className="col-12 furniture-bg-primary" style={{height: "3px"}}></div>
    
                            <div className="row mt-2">
                                <div className="col-12">
                                    <h5>
                                        Shipping Service : Rp. {(this.state.shippingPrice).toLocaleString ()}
                                    </h5>
                                </div>
                            </div>
    
                            <div className="row">
                                <div className="col-12">
                                    <h3>
                                        Total : Rp. {((this.state.dataTransaction.totalPrice) + (this.state.shippingPrice)).toLocaleString()}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">

                        {/* Shipping Section */}
                        <div className="col-7">
                            <div className="row my-3">
                                <h1>
                                    Shipping Courier
                                </h1>
                                <div className="col-12 furniture-bg-primary" style={{height: "5px"}}></div>
                            </div>
            
                            <div className="row my-3">
                                <div className="col-12 furniture-border-primary">
                                    <div className="row my-2">
                                        <div className="col-12">
                                            <h3>
                                                Please choose your shipping methode :
                                            </h3>
                                        </div>
                                    </div>
            
                                    {/* Radio Form Shipping Section */}
                                    <Form>
                                        <FormGroup check>
                                            <div className="row">
                                                <div className="col-4">
                                                    <input type="radio" name="shipping-option" ref="opt-overNightService" className="mr-2"/>
                                                    <label htmlFor="opt-oneNightService">
                                                        Over Night Service    
                                                    </label> 
                                                </div>
                                                <div className="col-3">
                                                    Estimation : 1 day
                                                </div>
                                                <div className="col-4">
                                                    <div className="furniture-bg-primary text-light px-2" style={{borderRadius: "5px"}}>
                                                        Rp. insert here
                                                    </div>
                                                </div>
                                            </div>
                                        </FormGroup>
            
                                        <FormGroup check>
                                            <div className="row">
                                                <div className="col-4">
                                                    <input type="radio" name="shipping-option" ref="opt-expressService" className="mr-2"/>
                                                    <label htmlFor="opt-expressService">
                                                        Express Service    
                                                    </label> 
                                                </div>
                                                <div className="col-3">
                                                    Estimation : 2-3 days
                                                </div>
                                                <div className="col-4">
                                                    <div className="furniture-bg-primary text-light px-2" style={{borderRadius: "5px"}}>
                                                        Rp. insert here
                                                    </div>
                                                </div>
                                            </div>
                                        </FormGroup>
            
                                        <FormGroup check>
                                            <div className="row">
                                                <div className="col-4">
                                                    <input type="radio" name="shipping-option" ref="opt-regularService" className="mr-2"/>
                                                    <label htmlFor="opt-regularService">
                                                        Regular Service 
                                                    </label> 
                                                </div>
                                                <div className="col-3">
                                                    Estimation : 3-5 days
                                                </div>
                                                <div className="col-4">
                                                    <div className="furniture-bg-primary text-light px-2" style={{borderRadius: "5px"}}>
                                                        Rp. insert here
                                                    </div>
                                                </div>
                                            </div>
                                        </FormGroup>
            
                                        <FormGroup check>
                                            <div className="row">
                                                <div className="col-4">
                                                    <input type="radio" name="shipping-option" ref="opt-interShipping" className="mr-2"/>
                                                    <label htmlFor="opt-interShipping">
                                                        International Shipping 
                                                    </label> 
                                                </div>
                                                <div className="col-3">
                                                    Estimation : 7-30 days
                                                </div>
                                                <div className="col-4">
                                                    <div className="furniture-bg-primary text-light px-2" style={{borderRadius: "5px"}}>
                                                        Rp. insert here
                                                    </div>
                                                </div>
                                            </div>
                                        </FormGroup>
                                        
                                    </Form>
                                    
            
                                </div>
                            </div>

                        </div>

                        {/* Payment Section */}
                        <div className="col-5">
                            <div className="row my-3 justify-content-end">
                                <h1>
                                    Payment Methode
                                </h1>
                                <div className="col-11 furniture-bg-primary" style={{height: "5px"}}></div>
                            </div>
                            <div className="row my-3 justify-content-end">
                                <div className="col-11 furniture-border-primary">
                                    <div className="row my-2">
                                        <div className="col-12">
                                            <h3>
                                                Please choose your payment methode :
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Radio Form Payment Section */}
                                    <Form>
                                        <FormGroup>
                                        <div className="row align-items-center">
                                            <div className="col-4">
                                                Virtual Account :
                                            </div>
                                            <div className="col-4">
                                                <span className="d-flex justify-content-start align-items-center">
                                                    <input type="radio" name="pay-option" ref="opt-GoPay" className="mr-2"/>
                                                    <img style={{width: "100%", height: "auto"}} className="img-fluid" src="https://1.bp.blogspot.com/-ftTB8bnkTPA/XUJbw4V3afI/AAAAAAAABto/F_-6eIBe7iMuS_5AJodNooYTtBuCaMZ6gCEwYBhgL/s1600/Logo%2BGopay%2BBaru.png"  alt=""/>
                                                </span>
                                            </div>

                                            <div className="col-4">
                                                <span className="d-flex justify-content-start align-items-center">
                                                    <input type="radio" name="pay-option" ref="opt-Ovo" className="mr-2"/>
                                                    <img style={{width: "70%", height: "25px"}} className="img-fluid" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Logo_ovo_purple.svg/768px-Logo_ovo_purple.svg.png"  alt=""/>
                                                </span>
                                                
                                            </div>
                                        </div>

                                        <div className="row my-2 align-items-center">
                                            <div className="col-4">
                                                Bank Transfer :
                                            </div>
                                            <div className="col-4">
                                                <span className="d-flex justify-content-start align-items-center">
                                                    <input type="radio" name="pay-option" ref="opt-Mandiri" className="mr-2"/>
                                                    <img style={{width: "100%", height: "auto"}} className="img-fluid" src="https://logos-download.com/wp-content/uploads/2016/06/Mandiri_logo-700x220.png"  alt=""/>
                                                </span>
                                            </div>

                                            <div className="col-4">
                                                <span className="d-flex justify-content-start align-items-center">
                                                    <input type="radio" name="pay-option" ref="opt-Bca" className="mr-2"/>
                                                    <img style={{width: "100%", height: "auto"}} className="img-fluid" src="https://www.freepnglogos.com/uploads/logo-bca-png/bank-central-asia-logo-bank-central-asia-bca-format-cdr-png-gudril-1.png"  alt=""/>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="row my-2 align-items-center">
                                            <div className="col-4">
                                                Credit Card :
                                            </div>
                                            <div className="col-4">
                                                <span className="d-flex justify-content-start align-items-center">
                                                    <input type="radio" name="pay-option" ref="opt-Visa" className="mr-2"/>
                                                    <img style={{width: "70%", height: "50px"}} className="img-fluid" src="https://cdn.freebiesupply.com/logos/large/2x/visa-logo-png-transparent.png"  alt=""/>
                                                </span>
                                            </div>

                                            <div className="col-4">
                                                <span className="d-flex justify-content-start align-items-center">
                                                    <input type="radio" name="pay-option" ref="opt-MasterCard" className="mr-2"/>
                                                    <img style={{width: "70%", height: "40px"}} className="img-fluid" src="https://1000logos.net/wp-content/uploads/2017/03/Mastercard-logo-640x360.png"  alt=""/>
                                                </span>
                                            </div>
                                            
                                            <div className="col-3">
                                                
                                            </div>
                                        </div>

                                        </FormGroup>
                                    </Form>
                                
                                    
                                </div>
                            </div>
                
                            

                        </div>

                    </div>

                    <div className="row my-2">
                        <div className="col-6">
                            <input type="button" value="Cancel" disabled={(this.state.dataTransaction === null  ? true : false)} className="btn btn-light furniture-border-primary" style= {{width: "80%"}} onClick={this.cancelPayment}/>
                        </div>
    
                        <div className="col-6 d-flex justify-content-end">
                            <input type="button" value="Proceed" disabled={(this.state.dataTransaction === null ? true : false)} className="btn furniture-bt-primary" style= {{width: "80%"}} onClick={this.payment}/>
                        </div>

                        {/* {this.state.dataTransaction.totalPrice} */}
                    </div>
    
                </div>
            )
        }
        
    }
}

export default Payment