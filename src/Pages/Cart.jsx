import React from "react"
import Axios from "axios"
import swal from 'sweetalert'

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
                                    <button className="btn">
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
                                                <button type="button" className="btn justify-content-center">
                                                    <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>  
                                                </button>
                                            </span>
                                            
                                            <span className="furniture-border-primary d-flex justify-content-center furniture-border-rad-5" style={{width: "50px"}}>
                                                {this.state.dataCart[i].quantity}
                                            </span>
                                            
                                            <span>
                                                <button type="button" className="btn justify-content-center" onClick={this.addProductCart}>
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
                <div key={i} className="container d-flex justify-content-center align-items-center">
                    <div className="row">
                        <div className="col-3 my-2">
                            {el.name}
                        </div>
                        <div className="col-3 my-2">
                            
                            Quantity
                            {/* {
                                this.state.dataCart.map ((val, index) => {
                                    return (
                                        <span key={index}>
                                            {val.quantity}
                                        </span>
                                    )
                                })
                            } */}
                            
                        </div>
                        <div className="col-3 my-2">
                            <span>
                                 @ Rp. { (el.price - (el.price * (el.discount / 100))).toLocaleString() }
                            </span>
                        </div>
                        <div className="col-3 my-2">
                            <span>
                                Subtotal
                            </span>
                        </div>
                    </div>

                </div>
            )
        })

    }

    deleteProductCart = () => {

    }

    addProductCart = () => {
        console.log (this.state.dataProduct)
        console.log (this.state.dataCart)

        // for (let i = 0; i < (this.state.dataCart).length; i++) {
        //     for (let j = 0; j < (this.state.dataProduct).length; j++) {
        //         if (Number (this.state.dataCart[i].idProduct) === this.state.dataProduct[j].id ){
        //             console.log ("check")
        //             console.log (i)
        //             // console.log (typeof (this.state.dataProduct[j].id))
        //             // console.log (typeof (this.state.dataCart[i].idProduct))
        //         }
        //     }
        // }
    }

    reduceProductCart = () => {

    }

    checkoutCart = () => {

        swal({
            title: "Are you sure you want to check out ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            className:"furniture-border-primary"
          })

          .then((res) => {

            if (res) {
                console.log ("checkout")

                let userId = localStorage.getItem ("id")

                Axios.delete (linkAPICarts + `?idUser=${userId}`)
                // Axios.get (linkAPICarts + `?idUser=${userId}`)

                .then ((res) => {
                    console.log (res.data)

                    swal({
                        title: "Your cart has been checked out",
                        text: "Thank you for your patronage",
                        icon: "success",
                        className:"furniture-border-primary"
                    })

                    window.location="/"
                })

                .catch ((err) => {
                    console.log (err)
                })

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
    }

    render () {

        if (this.state.dataCart === null || this.state.dataProduct === null ) {
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

                            {/* <div className="row">
                                <div className="col-3">
                                    <span>
                                        Name
                                    </span>
                                </div>
                                <div className="col-3">
                                    <span>
                                        Quantity
                                    </span>
                                </div>
                                <div className="col-3">
                                    <span>
                                        Price
                                    </span>
                                </div>
                                <div className="col-3">
                                    <span>
                                        Subtotal
                                    </span>
                                </div>
                            </div> */}

                            <div className="row">
                                <div className="col-12">
                                    {this.mapSummaryOrder ()}
                                </div>
                                
                            </div>
                            <div className="row">
                                <h3>
                                    Total : Rp. {(this.state.totalPrice).toLocaleString ()}
                                </h3>
                                
                            </div>
                            <div className="my-3">
                                <input type="button" value="Checkout" className="btn furniture-bt-primary" onClick={this.checkoutCart }/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

}

export default Cart 