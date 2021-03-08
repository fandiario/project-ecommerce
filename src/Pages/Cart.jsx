import React from "react"
import Axios from "axios"
import swal from 'sweetalert'
import {Link} from "react-router-dom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

import linkAPIProducts from "../Supports/Constants/LinkAPIProducts"
import linkAPICarts from "../Supports/Constants/linkAPICarts"

class Cart extends React.Component {
    state = {
        dataCart: null,
        dataProduct: null,
        totalPrice: 0
    }

    getDataCart = () => {
        let userId = localStorage.getItem ("id")

        Axios.get (linkAPICarts + `?idUser=${userId}`)


        .then ((res) => {
            // console.log (res.data)
            this.setState ({dataCart: res.data})

            this.getDataProduct()
        })

        .catch ((err) => {
            console.log (err)
        })

    }

    getDataProduct = () => {
        let arr = []

        for (let i = 0; i < (this.state.dataCart).length; i++) {

            // console.log (this.state.dataCart[i].idProduct)
            Axios.get (linkAPIProducts + `?id=${this.state.dataCart[i].idProduct}`)

            .then ((res) => {
                // console.log (res.data[0])
                arr.push (res.data[0])
                this.setState ({dataProduct: arr})
                
                this.calculateTotal ()
                // console.log (this.state.dataProduct)
            })

            .catch ((err) => {
                console.log (err)
            })

        }

    }

    mapProductCart = () => {
        return this.state.dataProduct.map ((el, i) => {
            return (
                <div key = {i}>        
                  <div className="d-flex flex-row furniture-border-primary furniture-border-rad-5 mb-3" >
                      <div className="col-3 d-flex align-items-center justify-content-center">
                          <img src={el.image1} alt="" className="img-fluid" style={{height: "15vh", width:"auto"}}/>
                      </div>

                      <div className="col-9 py-3">
                          <div className="d-flex flex-row">
                              <div className="col-8">
                                  <h5>
                                        {el.name}
                                  </h5>
                              </div>

                                <div className="col-4 d-flex justify-content-end">
                                    <button className="btn" onClick={() => this.deleteProductCart (i)}>
                                        <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                                    </button>
                                    
                                </div>
                            </div>

                            <div>
                                <div className="col-12">
                                    <div>
                                        Stock : {el.stock} items
                                    </div>

                                    {
                                        el.discount ?
                                            <div>
                                                Discount : <span className="furniture-bg-primary furniture-border-rad-5 text-light px-2"> {el.discount} %</span>
                                            </div>

                                        :
                                            null

                                    }
                                    
                                    <div className="row mt-3">
                                        <div className="col-7">
                                            <h5 className="furniture-bg-primary furniture-border-rad-5 text-light d-flex justify-content-center p-2">
                                                Rp. { (el.price - (el.price * (el.discount / 100))).toLocaleString() }
                                            </h5>
                                        </div>

                                        <div className="col-5 d-flex justify-content-end align-items-center">
                                            <span>
                                                <button type="button" disabled={(this.state.dataCart[i].quantity === 1 ? true : false)} className="btn furniture-bt-primary justify-content-center mr-1" style={{borderRadius: "100%"}} onClick={ () => this.reduceProductCart (i)}>
                                                    <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>  
                                                </button>
                                            </span>
                                            
                                            <span className="furniture-border-primary d-flex justify-content-center furniture-border-rad-5" style={{width: "50px"}} >
                                                {this.state.dataCart[i].quantity}
                                            </span>
                                            
                                            <span>
                                                <button type="button" disabled={(this.state.dataCart[i].quantity === el.stock ? true : false)} className="btn furniture-bt-primary justify-content-center ml-1" style={{borderRadius: "100%"}} onClick={ () => this.addProductCart (i)}>
                                                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>  
                                                </button>
                                            </span>
                                        </div>

                                    </div>

                                </div>
                                
                            </div>

                        </div>

                    </div>

                </div>
            )
        }) 
        
    }

    mapSummaryOrder = () => {
        return this.state.dataProduct.map ((el, i) => {
            return (
                <div key={i} className="container furniture-font-size-16">
                    <div className="row">
                        <div className="col-3 my-2 d-flex justify-content-center">
                            {el.name}
                        </div>

                        <div className="col-3 my-2 d-flex justify-content-center">
                            {
                                this.state.dataCart[i].quantity
                            } item(s)
                            
                        </div>
                        <div className="col-3 my-2 d-flex justify-content-center">
                            <span>
                                 @ Rp. { (el.price - (el.price * (el.discount / 100))).toLocaleString() }
                            </span>
                        </div>
                        <div className="col-3 my-2 d-flex justify-content-center">
                            <span>
                                Rp. {((el.price - (el.price * (el.discount / 100))) * (this.state.dataCart[i].quantity)).toLocaleString ()}

                            </span>
                        </div>
                    </div>

                </div>
            )
        })

    }

    deleteProductCart = (index) => {
        let cartId = this.state.dataCart[index].id

        swal({
            title: "Are you sure you want to remove this product from your cart?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            className: "furniture-border-primary"
          })

          .then((willDelete) => {
            if (willDelete) {
                Axios.delete (linkAPICarts + `/${cartId}`)

                .then ((res) => {
                    if (res.status === 200) {

                        swal({
                            title: "This product has been removed from your cart",
                            icon: "success",
                            className: "furniture-border-primary"
                        })

                        window.location= `${this.props.location.pathname}`

                    } else {
                        swal({
                            title: `Error : ${res.status}`,
                            icon: "error",
                            className: "furniture-border-primary"
                        })
                    }
                })


                .catch ((err) => {
                    console.log (err)
                })
              
              
            } else {

                swal({
                    title: "This action has been canceled",
                    className: "furniture-border-primary"
                })
              
            }
        })

    }

    addProductCart = (index) => {

        let cartId = this.state.dataCart[index].id
        let plusQuantity = this.state.dataCart[index].quantity + 1
        
        Axios.patch (linkAPICarts +`/${cartId}`, {quantity: plusQuantity}) 

        .then ((res) => {
            if (res.status === 200) {
                this.getDataCart ()
            
            } else {

                swal({
                    title: `Error : ${res.status}`,
                    icon: "error",
                    className: "furniture-border-primary"
                })

            }
        })

        .catch ((err) => {
            console.log (err)
        })

    }

    reduceProductCart = (index) => {

        let cartId = this.state.dataCart[index].id
        let minQuantity = this.state.dataCart[index].quantity - 1

        Axios.patch (linkAPICarts + `/${cartId}`, {quantity: minQuantity})

        .then ((res) => {
            if (res.status === 200) {
                this.getDataCart ()

            } else {
                
                swal({
                    title: `Error : ${res.status}`,
                    icon: "error",
                    className: "furniture-border-primary"
                })

            }
        })

        .catch ((err) => {
            console.log (err)
        })

    }

    calculateTotal = () => {

        let arrSubtotals = []
        let arrQuantities = []
        let arrDiscPrices = []

        let subtotals = 0
        let discPrice = 0
        let result = 0

        for (let i = 0; i < (this.state.dataProduct).length; i++) {
            
            let dataPrice = this.state.dataProduct[i].price
            let dataDisc = this.state.dataProduct[i].discount

            discPrice =  dataPrice - (dataPrice * (dataDisc / 100))

            arrDiscPrices.push (discPrice)
        }

        for (let j = 0; j < (this.state.dataCart).length; j++) {

            let dataQuantity = this.state.dataCart[j].quantity

            arrQuantities.push (dataQuantity)

        }

        for (let k = 0; k < arrQuantities.length; k++) {
            
            subtotals = arrQuantities[k] * arrDiscPrices[k]

            arrSubtotals.push (subtotals)
        }

        for (let l = 0; l < arrSubtotals.length; l++) {
            result += arrSubtotals[l]
        }

        this.setState ({totalPrice: result})

    }

    checkoutCart = () => {
        let dataToSend = {
            idUser: localStorage.getItem("id"),
            // idDataCart: this.state.
            totalPrice: this.state.totalPrice
        }

        swal({
            title: "Are you sure you want to check out ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            className:"furniture-border-primary"
          })

          .then((res) => {

            if (res) {
                
                
               window.location (`/payment/${localStorage.getItem("id")}`)
            } else {

              swal({
                text: "Your transaction has been canceled",
                className:"furniture-border-primary"
              })

            }

        })

    }

    componentDidMount () {
        this.getDataCart ()
        // this.calculateTotal ()
        console.log (this.props.location.pathname)
    }

    render () {

        if (this.state.dataCart === null || this.state.dataProduct === null || this.state.totalPrice === 0) {
            return (
                <div className="d-flex justify-content-center mt-5">
                    {/* <div className="spinner-grow" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> */}
                    <h1>
                        Your Cart is Empty
                    </h1>
                </div>
            )
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>
                            Cart 
                        </h1>
                    </div>
                    <div className="col-12 furniture-bg-primary" style={{height: "5px"}}></div>
                </div>

                <div className="row mt-3">
                    <div className="col-7">
                        {this.mapProductCart ()}
                    </div>

                    <div className="col-md-5 col-12">
                        <div className="furniture-border-primary furniture-border-rad-3 d-flex justify-content-center align-items-center flex-column">
                            <h2 className="my-2">
                                Summary Order
                            </h2>

                            <div className="row">
                                <div className="col-12">
                                    {this.mapSummaryOrder ()}
                                </div>
                                
                            </div>

                            <div className="row mt-3">
                                <h3>
                                    Total : Rp. {(this.state.totalPrice).toLocaleString ()}
                                </h3>
                                
                            </div>
                            <div className="my-3">
                                <input type="button" value="Check Out" className="btn furniture-bt-primary" onClick={this.checkoutCart }/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

}

export default Cart 