import React from "react"
import Axios from "axios"

import linkAPI from "../Supports/Constants/LinkAPI"

import { Form, FormGroup } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faMobile } from '@fortawesome/free-solid-svg-icons'

class Payment extends React.Component {

    state = {
        dataUser : null
    }

    getDataUser = () => {
        let userId = localStorage.getItem ("id")

        Axios.get (linkAPI + `?id=${userId}`)

        .then ((res) => {
            // console.log (res.data)
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
            return this.state.dataUser.map ((el, i) => {
                return (
                    <div key={i}>
                        <div className="col-12 furniture-font-size-14">
                            <div>
                                id : {el.id}
                            </div>

                            <div>
                                username: {el.username}
                            </div>

                            <div>
                                Address: Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                            </div>

                            <div>
                                <span className="mr-3">
                                    <FontAwesomeIcon icon= {faEnvelope}></FontAwesomeIcon>
                                    Email: {el.email}
                                </span>

                                <span>
                                    <FontAwesomeIcon icon= {faMobile}></FontAwesomeIcon>
                                    Phone: {el.phone}
                                </span>
                            </div>


                        </div>
                    </div>
                )
            })
                
            
        }

    }

    componentDidMount () {
        this.getDataUser ()
    }

    render () {

        return (
            <div className="container">
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

                        <div className="row my-3 furniture-font-size-18">
                            <div className="col-3">
                                <div>
                                    Product
                                </div>

                                <div>
                                    insert product's name here
                                </div>
                            </div>

                            <div className="col-3">
                                <div>
                                    Quantity
                                </div>

                                <div>
                                    insert product's    quantity here
                                </div>
                            </div>

                            <div className="col-3">
                                <div>
                                    Price Per Unit
                                </div>

                                <div>
                                    insert product's price per unit here
                                </div>
                            </div>
                            
                            <div className="col-3">
                                <div>
                                    Subtotal
                                </div>

                                <div>
                                    insert product's Subtotal here
                                </div>
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-12">
                                <h3>
                                    Total : Rp. (insert total price here)
                                </h3>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div className="row my-3">
                    <h1>
                        Shipping Courier
                    </h1>
                    <div className="col-12 furniture-bg-primary" style={{height: "5px"}}></div>
                </div>

                <div className="row my-3">
                    <div className="col-9 furniture-border-primary">
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
                                    <div className="col-6">
                                        <input type="radio" name="shipping-option" ref="opt-overNightService" className="mr-2"/>
                                        <label htmlFor="opt-oneNightService">
                                            Over Night Service    
                                        </label> 
                                    </div>
                                    <div className="col-3">
                                        Estimation : 1 day
                                    </div>
                                    <div className="col-3">
                                        <div className="furniture-bg-primary text-light px-2" style={{borderRadius: "5px"}}>
                                            Rp. insert here
                                        </div>
                                    </div>
                                </div>
                            </FormGroup>

                            <FormGroup check>
                                <div className="row">
                                    <div className="col-6">
                                        <input type="radio" name="shipping-option" ref="opt-expressService" className="mr-2"/>
                                        <label htmlFor="opt-expressService">
                                            Express Service    
                                        </label> 
                                    </div>
                                    <div className="col-3">
                                        Estimation : 2-3 days
                                    </div>
                                    <div className="col-3">
                                        <div className="furniture-bg-primary text-light px-2" style={{borderRadius: "5px"}}>
                                            Rp. insert here
                                        </div>
                                    </div>
                                </div>
                            </FormGroup>

                            <FormGroup check>
                                <div className="row">
                                    <div className="col-6">
                                        <input type="radio" name="shipping-option" ref="opt-regularService" className="mr-2"/>
                                        <label htmlFor="opt-regularService">
                                            Regular Service 
                                        </label> 
                                    </div>
                                    <div className="col-3">
                                        Estimation : 3-5 days
                                    </div>
                                    <div className="col-3">
                                        <div className="furniture-bg-primary text-light px-2" style={{borderRadius: "5px"}}>
                                            Rp. insert here
                                        </div>
                                    </div>
                                </div>
                            </FormGroup>

                            <FormGroup check>
                                <div className="row">
                                    <div className="col-6">
                                        <input type="radio" name="shipping-option" ref="opt-interShipping" className="mr-2"/>
                                        <label htmlFor="opt-interShipping">
                                            International Shipping 
                                        </label> 
                                    </div>
                                    <div className="col-3">
                                        Estimation : 7-30 days
                                    </div>
                                    <div className="col-3">
                                        <div className="furniture-bg-primary text-light px-2" style={{borderRadius: "5px"}}>
                                            Rp. insert here
                                        </div>
                                    </div>
                                </div>
                            </FormGroup>
                            
                        </Form>
                        

                    </div>
                </div>

                <div className="row my-3">
                    <h1>
                        Payment Methode
                    </h1>
                    <div className="col-12 furniture-bg-primary" style={{height: "5px"}}></div>
                </div>
               <div className="row my-3">
                   <div className="col-9 furniture-border-primary">
                        <div className="row my-2">
                            <div className="col-12">
                                <h3>
                                    Please choose your payment methode :
                                </h3>
                            </div>
                        </div>

                        {/* Radio Form Payment Section */}
                        <Form>
                            <FormGroup check>
                                <div className="row">
                                    <div className="col-6">
                                        Virtual Account
                                    </div>
                                    <div className="col-6 d-flex flex-row justify-content-between">
                                        <div className="col-6">
                                            <input type="radio" name="pay-option" ref="opt-OVO" className="mr-2"/>
                                            <label htmlFor="opt-OVO">
                                                OVO 
                                            </label> 
                                        </div>
                                        <div className="col-6">
                                            <input type="radio" name="pay-option" ref="opt-GoPay" className="mr-2"/>
                                            <label htmlFor="opt-GoPay">
                                                GoPay 
                                            </label> 
                                        </div>
                                    </div>
                                </div>

                                <div className="row my-2">
                                    <div className="col-6">
                                        Bank Transfer
                                    </div>
                                    <div className="col-6 d-flex flex-row justify-content-between">
                                        <div className="col-4">
                                        <input type="radio" name="pay-option" ref="opt-Mandiri" className="mr-2"/>
                                            <label htmlFor="opt-Mandiri">
                                                Mandiri 
                                            </label> 
                                        </div>
                                        <div className="col-4">
                                            <input type="radio" name="pay-option" ref="opt-BNI" className="mr-2"/>
                                            <label htmlFor="opt-BNI">
                                                BNI 
                                            </label>  
                                        </div>
                                        <div className="col-4">
                                            <input type="radio" name="pay-option" ref="opt-BCA" className="mr-2"/>
                                            <label htmlFor="opt-BCA">
                                                BCA 
                                            </label> 
                                        </div>
                                    </div>
                                </div>

                                <div className="row my-2">
                                    <div className="col-6">
                                        Credit Card
                                    </div>
                                    <div className="col-6 d-flex flex-row justify-content-between">
                                        <div className="col-6">
                                            <input type="radio" name="pay-option" ref="opt-VISA" className="mr-2"/>
                                                <label htmlFor="opt-VISA">
                                                    VISA 
                                                </label> 
                                        </div>
                                        <div className="col-6">
                                            <input type="radio" name="pay-option" ref="opt-MCard" className="mr-2"/>
                                                <label htmlFor="opt-MCard">
                                                    MasterCard 
                                                </label> 
                                        </div>
                                    </div>
                                </div>
                            </FormGroup>

                        </Form>
                       
                   </div>
               </div>

               <div className="row my-2">
                    <div className="col-6">
                        <input type="button" value="Cancel" className="btn btn-light furniture-border-primary" style= {{width: "80%"}}/>
                    </div>

                    <div className="col-6 d-flex justify-content-end">
                        <input type="button" value="Proceed" className="btn furniture-bt-primary" style= {{width: "80%"}}/>
                    </div>
               </div>

            </div>
        )
    }
}

export default Payment