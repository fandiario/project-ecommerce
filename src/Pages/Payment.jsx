import React from "react"
import Axios from "axios"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faMobile } from '@fortawesome/free-solid-svg-icons'

class Payment extends React.Component {
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
                            
                            <div className="col-12 furniture-font-size-14">
                                <div>
                                    id : insert id here
                                </div>

                                <div>
                                    username: insert username here
                                </div>

                                <div>
                                    Address: insert address here
                                </div>

                                <div>
                                    <span className="mr-3">
                                        <FontAwesomeIcon icon= {faEnvelope}></FontAwesomeIcon>
                                        Email: insert email here
                                    </span>

                                    <span>
                                        <FontAwesomeIcon icon= {faMobile}></FontAwesomeIcon>
                                        Phone: insert phone here
                                    </span>
                                </div>
                            </div>
                            
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
                    <div className="col-12 furniture-border-primary">
                        <div className="row my-2">
                            <div className="col-12">
                                <h3>
                                    Please choose your shipping methode :
                                </h3>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-4">
                                Overnight Sevice 
                            </div>
                            <div className="col-3">
                                Estimation : 1 day
                            </div>
                            <div className="col-3">
                                Tariff : Rp. insert tariff here
                            </div>
                            <div className="col-1">
                                insert radio button here
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-4">
                                Express Service
                            </div>
                            <div className="col-3">
                                Estimation : 2-3 days
                            </div>
                            <div className="col-3">
                                Tariff : Rp. insert tariff here
                            </div>
                            <div className="col-1">
                                insert radio button here
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-4">
                                Regular Service
                            </div>
                            <div className="col-3">
                                Estimation : 3-5 days
                            </div>
                            <div className="col-3">
                                Tariff : Rp. insert tariff here
                            </div>
                            <div className="col-1">
                                insert radio button here
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-4">
                                International Shipping
                            </div>
                            <div className="col-3">
                                Estimation : 7-30 days
                            </div>
                            <div className="col-3">
                                Tariff : Rp. insert tariff here
                            </div>
                            <div className="col-1">
                                insert radio button here
                            </div>
                        </div>

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

                       <div className="row">
                           <div className="col-6">
                               Virtual Account
                           </div>
                           <div className="col-6 d-flex flex-row justify-content-between">
                               <div className="col-6">
                                   OVO
                               </div>
                               <div className="col-6">
                                   Go-Pay
                               </div>
                           </div>
                       </div>

                       <div className="row my-2">
                           <div className="col-6">
                               Bank Transfer
                           </div>
                           <div className="col-6 d-flex flex-row justify-content-between">
                               <div className="col-3">
                                   BNI
                               </div>
                               <div className="col-3">
                                   Mandiri
                               </div>
                               <div className="col-3">
                                   BCA
                               </div>
                               <div className="col-3">
                                   BRI
                               </div>
                           </div>
                       </div>

                       <div className="row my-2">
                           <div className="col-6">
                               Credit Card
                           </div>
                           <div className="col-6 d-flex flex-row justify-content-between">
                               <div className="col-6">
                                   VISA
                               </div>
                               <div className="col-6">
                                   Master Card
                               </div>
                           </div>
                       </div>
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