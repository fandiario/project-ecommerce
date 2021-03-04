import React from "react"
import Axios from "axios"

import linkAPIProducts from"../Supports/Constants/LinkAPIProducts"
import Banner from "../Components/Banner"

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class CatalogueProduct extends React.Component {
    state = {
        
        dataProducts: null,
        dataBackupProducts: null,
        showModal : false,
        showDropDown: false,
        allCategories: null,
        allBrands: null
    }

    getDataProducts = () => {
        Axios.get (linkAPIProducts)

        .then ((res) => {
            this.setState ({dataProducts: res.data})
            this.setState ({dataBackupProducts: res.data})
            // console.log (this.state.dataBackupProducts)
        })

        .catch ((err) => {
            console.log (err)
        })

    }

    mapDataProducts = () => {
        return this.state.dataProducts.map ((el, i) => {
            return (
                <div key={i}>
                    <div className="card furniture-border-primary furniture-border-rad-3 my-3" style={{width: "18rem"}}>
                        <img src={el.image1} className="card-img-top img-fluid" alt="..." style={{height: "250px", width:"100%"}}/>
                        <div className="card-body">
                            <h5 className="card-title">{el.name}</h5>

                            {
                                el.discount ?

                                <div className="card-text">
                                    <p>
                                        <del>
                                            Rp. {el.price.toLocaleString ()}
                                        </del>
                                    </p>
                                    
                                    <p className="font-weight-bold furniture-font-size-25">
                                        Rp. { (el.price - (el.price * (el.discount / 100))).toLocaleString() }
                                    </p>
                                    
                                    
                                </div>
                                
                                :

                                <p className="card-text font-weight-bold furniture-font-size-25">
                                    Rp. {el.price.toLocaleString ()}
                                </p>


                            }
                            <p className="furniture-font-size-18">
                                Brand: {el.brand}
                            </p>

                            <p className="furniture-font-size-18">
                                Category: {el.category}
                            </p>
                            
                            <a href={`http://localhost:3000/detail-product/${el.id}`} className="btn furniture-bt-primary">See more...</a>
                        </div>
                    </div>

                </div>
            )
        })

    }

    getDataCategory = () => {
        Axios.get (linkAPIProducts)

        .then ((res) => {
            let arrCategories = []

            res.data.forEach ((data) => {
                if (arrCategories.includes (data.category)) {

                } else {
                    arrCategories.push (data.category)
                }

            })

            this.setState ({allCategories: arrCategories})


        })

        .catch ((err) => {
            console.log (err)
        })
    }

    getDataBrand = () => {
        Axios.get (linkAPIProducts)

        .then ((res) => {
            let arrBrands = []

            res.data.forEach ((data) => {
                if (arrBrands.includes (data.brand)) {

                } else {
                    arrBrands.push (data.brand)
                }
            })

            this.setState ({allBrands: arrBrands})

        })

        .catch ((err) => {
            console.log (err)
        })
    }

    filterProduct = () => {
        let category = this.refs.inputCategory.value
        let brand = this.refs.inputBrand.value
        // console.log ("check before backup all")

        let filterProductRes = this.state.dataBackupProducts.filter ((data) => {
            if (category === "all" && brand === "all") {
                return this.state.dataBackupProducts
                // return console.log ("check backup all")
            
            } else if (category !== "all" && brand === "all") {
                // console.log ("check category not all")
                return data.category === category

            } else if (category === "all" && brand !== "all") {
                return data.brand === brand

            } else if (category !== "all" && brand !== "all") {
                return data.category === category && data.brand === brand
            }
        })

        this.setState ({dataProducts: filterProductRes})
        this.setState ({showModal: false})

    }

    sortProductDef = () => {
        let sortProductRes

        sortProductRes = this.state.dataBackupProducts.sort ((a, b) => {
            return a.id - b.id
        })

        this.setState ({dataProducts: sortProductRes})
    }

    sortProductLow = () => {
        let sortProductRes

        sortProductRes = this.state.dataBackupProducts.sort ((a, b) => {
            return a.price - b.price
        })

        this.setState ({dataProducts: sortProductRes})     
    }

    sortproductHigh = () => {
        let sortProductRes

        sortProductRes = this.state.dataBackupProducts.sort ((a, b) => {
            return b.price - a.price
        })

        this.setState ({dataProducts: sortProductRes})  
    }

    componentDidMount () {
        this.getDataProducts ()
        this.getDataCategory ()
        this.getDataBrand ()
        
    }


    render () {

        if (this.state.dataProducts === null) {
            return (
                <>

                    <div className="row">
                        <div className="col-12">
                            <h1>
                                Products 
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
            <>
                <Banner></Banner>

                <div className="container my-5">
                    
                    {/* Filter Section */}
                    <div className="row mb-5">
                        <div className="col-12 d-flex align-items-center justify-content-end">
                            <button type="button" className="btn furniture-bt-primary mr-2" onClick={ () => this.setState ({showModal: true})}>Filter</button> 

                            <ButtonDropdown className="furniture-bg-primary" style={{borderRadius: "5px"}} isOpen={this.state.showDropDown} toggle={() => this.setState ({showDropDown: !this.state.showDropDown})}>
                                <DropdownToggle caret color="furniture-bg-primary" className="btn text-light">
                                    Sort
                                </DropdownToggle>
                                <DropdownMenu>
                            
                                    <DropdownItem onClick={this.sortProductLow}>
                                        Sort From Lowest Price
                                    </DropdownItem>
                                    <DropdownItem onClick= {this.sortproductHigh}>
                                        Sort From Highest Price
                                    </DropdownItem>
                                    <DropdownItem onClick={this.sortProductDef}>
                                        Default
                                    </DropdownItem>

                                </DropdownMenu>
                            </ButtonDropdown> 
                     
                        </div>
                    </div>

                    {/* Product Section */}
                    <div className="row">
                        <h1>
                            Products 
                        </h1>
                        <div className="col-12 d-flex flex-wrap justify-content-between align-items-center">
                            
                            {
                                this.mapDataProducts ()
                            }

                        </div>
                    </div>
                </div>

                {/* Modal Section */}
                <Modal isOpen={this.state.showModal} toggle = {() => this.setState ({showModal: false})}>
                    <ModalHeader>
                        Filter Product
                    </ModalHeader>

                    <ModalBody>
                            <div>
                                <label htmlFor="inputCategory">Category :</label>
                                <select className="form-control" ref="inputCategory">
                                    <option value="all">All</option>
                                    
                                    {
                                        this.state.allCategories ? 

                                            this.state.allCategories.map ((el, i) => {
                                                return (
                                                    <option value= {el} key={i}>{el}</option>
                                                )
                                            })
                                        :
                                            null
                                    }

                                </select>
                            </div>

                            <div className="mt-3">
                                <label htmlFor="inputBrand">Brand :</label>
                                <select className="form-control" ref="inputBrand">
                                    <option value="all">All</option>

                                    {
                                        this.state.allBrands ?

                                            this.state.allBrands.map ((el, i) => {
                                                return (
                                                    <option value= {el} key={i}>{el}</option>
                                                )
                                            })
                                        :
                                            null
                                    }

                                </select>
                            </div>
                    </ModalBody>

                    <ModalFooter>
                            <input type="button" value="Ok" className="btn furniture-bt-primary" onClick={this.filterProduct}/>
                    </ModalFooter>

                </Modal>



                
            </>
            
        )
    }

}

export default CatalogueProduct