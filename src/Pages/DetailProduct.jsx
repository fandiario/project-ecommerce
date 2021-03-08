import React from "react"
import Axios from "axios"
// import swal from 'sweetalert'

import {connect} from 'react-redux'

import linkAPIProducts from "../Supports/Constants/LinkAPIProducts"
// import linkAPICarts from "../Supports/Constants/linkAPICarts"

// Action Redux

import {getDataCart} from "./../Supports/Redux/Actions/CartAction"

class DetailProduct extends React.Component {

    state = {
        dataDetailProduct : null,
        mainImage : null
    }

    getDetailProduct = () => {
        let idProduct = this.props.location.pathname.split ("/")[2]

        // console.log (this.props.location.pathname)
        // console.log (idProduct)

        Axios.get (linkAPIProducts + "/" + idProduct)

        .then ((res) => {
            // console.log (res.data)
            this.setState ({dataDetailProduct: res.data})     
            this.setState ({mainImage: res.data.image1})       
        })

        .catch ((err) => {
            console.log (err)
        })
    }

    addDataToCart = () => {
        
        let userId = localStorage.getItem ("id")
        let productId = this.props.location.pathname.split ("/")[2]
        let quantity = 1

        this.props.getDataCart (userId, productId, quantity)
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
                            <img src={this.state.mainImage} className="img-fluid" alt=""/>
                        </div>

                        <div className="d-flex flex-row justify-content-between mt-5">
                            <img src= {this.state.dataDetailProduct.image1} className={this.state.mainImage === this.state.dataDetailProduct.image1 ? "img-fluid furniture-img-thumb furniture-clickable-element furniture-border-primary furniture-border-rad-5" : "img-fluid furniture-img-thumb furniture-clickable-element"} alt="" onClick={() => this.setState ({mainImage: this.state.dataDetailProduct.image1})}/>
                            <img src={this.state.dataDetailProduct.image2} className={this.state.mainImage === this.state.dataDetailProduct.image2 ? "img-fluid furniture-img-thumb furniture-clickable-element furniture-border-primary furniture-border-rad-5" : "img-fluid furniture-img-thumb furniture-clickable-element"} alt="" onClick={() => this.setState ({mainImage: this.state.dataDetailProduct.image2})}/>
                            <img src={this.state.dataDetailProduct.image3} className={this.state.mainImage === this.state.dataDetailProduct.image3 ? "img-fluid furniture-img-thumb furniture-clickable-element furniture-border-primary furniture-border-rad-5" : "img-fluid furniture-img-thumb furniture-clickable-element"} alt="" onClick={() => this.setState ({mainImage: this.state.dataDetailProduct.image3})}/>
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
                                            Discount : 
                                            <span className="furniture-bg-primary furniture-border-rad-5 text-light px-2 ml-2">
                                                {this.state.dataDetailProduct.discount} %
                                            </span>
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
                                Stock : {this.state.dataDetailProduct.stock} item(s)
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

                        <div>
                            <h5 className="furniture-font-size-18">
                                Description :
                            </h5>
                            <p className="furniture-font-size-18">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur nemo beatae eum minima ex aut sapiente eveniet molestiae, nam non vitae porro explicabo omnis illo, dicta, modi incidunt est numquam.
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

const mapDispatchToProps = {getDataCart}

export default connect ("", mapDispatchToProps) (DetailProduct)

// export default DetailProduct