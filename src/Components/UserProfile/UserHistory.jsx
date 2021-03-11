import React from "react"
import Axios from "axios"

import linkAPITransactions from "../../Supports/Constants/LinkAPITransactions"

class UserHistory extends React.Component {

    state = {
        dataTransaction : null
    }

    getDataTransaction=()=> {
        let userId = localStorage.getItem ("id")

        Axios.get (linkAPITransactions + `?idUser=${userId}`)

        .then ((res) => {
            // console.log (res.data)
            this.setState ({dataTransaction: res.data})
        })

        .catch ((err) => {
            console.log (err)
        })
    }

    redirectToPayment = (idTransaction) => {
        window.location=`/payment/${idTransaction}`
    }

    mapDataTransaction = () => {       
        
        return this.state.dataTransaction.map ((el, i) => {

            return (

                <div key={i}>

                    <div className="row d-flex flex-column furniture-border-primary shadow my-3">
                        <div className="row">
                            <div className="col-8 my-2">
                                <div className="ml-2">
                                    Status : {el.status}
                                </div>

                                <div className="ml-2">
                                    Date : {el.history.paidAt} WIB
                                </div>

                                <div className="ml-2">
                                    INV.No: {el.id}
                                </div>
                            </div>

                            <div className="col-4 d-flex justify-content-end align-items-center">
                                {
                                    el.status === "unpaid" ?
                                        <button className="btn furniture-bt-primary mr-2" onClick={() => this.redirectToPayment(el.id)}>
                                        Pay Now
                                        </button>
                                    :
                                        <button className="btn furniture-bt-primary mr-2">
                                        Print Invoice
                                        </button>
                                }
                                
                            </div>

                            <div className="col-12">
                                <div className="col-12 furniture-bg-primary mb-1" style={{height: "2px"}}></div>
                            </div>
                        </div>

                        {
                            el.detail.map ((val, j) => {
                                return (

                                    <div className="row my-2" key={j}>
                                        <div className="col-2 ml-2 d-flex justify-content-center">
                                            <img src={val.productImage} className="img-fluid" style={{width:"auto", height:"100px"}} alt=""/>
                                        </div>

                                        <div className="col-4 d-flex align-items-center">
                                            <span className="font-weight-bold">
                                                {val.productName}
                                            </span>
                                        </div>

                                        <div className="col-2 d-flex align-items-center">
                                            {val.quantity} items
                                        </div>

                                        <div className="col-2 d-flex align-items-center justify-content-start">
                                            Rp. {((val.productPrice - (val.productPrice * (val.discPrice / 100))) * val.quantity).toLocaleString ("id-Id")}
                                        </div>
                                    </div>

                                )
                            })
                        }

                        <div className="row">
                            
                            <div className="col-12 ml-5 mb-2">
                                <h3>
                                    Total : Rp. {(el.totalPrice).toLocaleString ("id-Id")}
                                </h3>
                                
                            </div>
                        </div>

                    </div>  


                </div>
            )
        })
    }

    componentDidMount () {
        this.getDataTransaction ()
    }

    render () {
        if (this.state.dataTransaction === null) {
            return (
                
                <div className='row'>
                    <h1>
                        Your Transaction History is Empty
                    </h1>
                </div>
                   
            )
        }

        return (

            <div className="container">

                {
                    this.mapDataTransaction ()
                }

            </div>
        )
    }
}

export default UserHistory