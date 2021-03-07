import React from "react"
import Axios from "axios"
import swal from 'sweetalert'

import linkAPIProducts from "../Supports/Constants/LinkAPIProducts"
import linkAPICarts from "../Supports/Constants/linkAPICarts"

class DetailProduct extends React.Component {

    state = {
        dataDetailProduct : null
    }

    getDetailProduct = () => {
        let idProduct = this.props.location.pathname.split ("/")[2]

        // console.log (this.props.location.pathname)
        // console.log (idProduct)

        Axios.get (linkAPIProducts + "/" + idProduct)

        .then ((res) => {
            // console.log (res.data)
            this.setState ({dataDetailProduct: res.data})            
        })

        .catch ((err) => {
            console.log (err)
        })
    }

    addDataToCart = () => {
        let userId = localStorage.getItem ("id")
        let productId = this.props.location.pathname.split ("/")[2]

        let dataToAdd = {
            idUser : userId,
            idProduct : productId,
            quantity: 1
        }

        // Check same product
        Axios.get (linkAPICarts + `?idProduct=${productId}`) 

        .then ((res) => {

            if (res.data.length === 0) {

                Axios.post (linkAPICarts, dataToAdd)

                .then ((res) => {
                    // console.log (res)
                    swal({
                        title: "Successfully added to your cart",
                        icon: "success",
                        className:"furniture-border-primary"
                    });
                    window.location = `/detail-product/${productId}`
                })

                .catch ((err) => {
                    console.log (err)
                })

            } else {

                // If there's the same product
                let cartId = res.data[0].id
                let quantityCart = res.data[0].quantity

                let addQuantity = quantityCart + 1

                Axios.patch (linkAPICarts + `/${cartId}`, {quantity: addQuantity})

                .then ((res) => {
                    // console.log (res)
                    console.log (`Quantity has been added. Quantity now: ${res.data.quantity}`)
                    swal({
                        title: "Successfully added to your cart",
                        icon: "success",
                        className:"furniture-border-primary"
                    })
                    window.location = `/detail-product/${productId}`
                })

                .catch ((err) => {
                    console.log (err)
                })

            }

        })

        .catch ((err) => [
            console.log (err)
        ])
    }

    componentDidMount () {
        this.getDetailProduct ()

    }

    render () {

        if (this.state.dataDetailProduct === null) {
            return (
                <>

                    <div className="row">
                        <div className="col-12">
                            <h1>
                                Detail Product 
                            </h1>
                            <div className="d-flex justify-content-center mt-5">
                                <div className="spinner-grow" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        </div>
                    </div> 
                </>
            )
        }

        return (
            <div className= "container">
                <div className="row">
                    <h1>
                        Detail Product 
                    </h1>

                    <div className="col-12 furniture-bg-primary my-2" style={{height: "5px"}}></div>

                    <div className="col-12 col-md-6">
                        <div>
                            <img src={this.state.dataDetailProduct.image1} className="img-fluid" alt=""/>
                        </div>

                        <div className="d-flex flex-row justify-content-between mt-5">
                            <img src= {this.state.dataDetailProduct.image1} className="img-fluid furniture-img-thumb" alt=""/>
                            <img src={this.state.dataDetailProduct.image2} className="img-fluid furniture-img-thumb" alt=""/>
                            <img src={this.state.dataDetailProduct.image3} className="img-fluid furniture-img-thumb" alt=""/>
                        </div>
                        

                    </div>

                    <div className="col-12 col-md-6">
                        <div className="mt-5">
                            <h1>
                                {this.state.dataDetailProduct.name}
                            </h1>
                            
                            <div className="font-weight-bold furniture-font-size-25">
                                Brand : {this.state.dataDetailProduct.brand}
                            </div>

                            {
                                
                                this.state.dataDetailProduct.discount ?

                                    <div>
                                        <div className="furniture-font-size-25">
                                            <del>Rp. {(this.state.dataDetailProduct.price).toLocaleString()}</del>
                                        </div>

                                        <h3 className="font-weight-bold">
                                            Discount : {this.state.dataDetailProduct.discount} %
                                        </h3>
                                    </div>

                                :

                                    null                               

                            }
                            <h1 className="font-weight-bold">
                                Rp. {((this.state.dataDetailProduct.price) - ((this.state.dataDetailProduct.price) * ((this.state.dataDetailProduct.discount) / 100))).toLocaleString ()}
                            </h1>
                            <hr/>
                        </div>

                        <div>
                            <p className="furniture-font-size-18">
                                Stock : {this.state.dataDetailProduct.stock}
                            </p>

                            <p className="furniture-font-size-18">
                                Weight: {(this.state.dataDetailProduct.weight) / 1000} kg
                            </p>
                            <hr/>
                        </div>

                        <div>
                            <h5 className="furniture-font-size-18">
                                Category :
                            </h5>
                            <p className="furniture-font-size-18">
                                {this.state.dataDetailProduct.category}
                            </p>
                        </div>

                        <div className="mt-5 mb-3 d-flex justify-content-center">
                            <input type="button" value="Add To Cart" className="btn furniture-bt-primary" style={{width: "300px"}} onClick={this.addDataToCart}/>
                        </div>


                    </div>
    
                </div>
            </div>
        )
    }

}

export default DetailProduct