import React from "react"
import Axios from "axios"
import Slider from "react-slick"
import linkAPIProducts from "../Supports/Constants/LinkAPIProducts"

// CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Supports/Stylesheets/Carousel.css"

class Carousel extends React.Component {

    state = {
        dataProducts: null
    }

    getDataProducts = () => {
        Axios.get (linkAPIProducts)

        .then ((res) => {
            // console.log (res.data)
            this.setState ({dataProducts: res.data})
        })

        .catch ((err) => {
            console.log (err)
        })
    }

    mapDataProducts = () => {
        return this.state.dataProducts.map ((el, i) => {

            return (
                el.discount ?

                <div key={i}>
                    <div className="card furniture-border-primary furniture-border-rad-3" style={{width: "14rem"}}>
                        <div className="card-header furniture-bg-primary text-light">
                            <h5 className="card-title">
                                Discount {el.discount} %
                            </h5>
                        </div>
                        <img src= {el.image1} className="card-img-top" alt=""/>
                        <div className="card-body">
                            <h6 className="card-text furniture-font-size-20 font-weight-bold">{el.name}</h6>
                            <p>
                                
                                <del>
                                    Rp.
                                        {
                                            el.price.toLocaleString ()
                                        }
                                </del>
                                
                            </p>
                            <p className="font-weight-bold furniture-font-size-16">
                                Rp. 
                                {
                                    (el.price - (el.price * (el.discount / 100))).toLocaleString()
                                } 
                            </p>
                            <a href={`http://localhost:3000/detail-product/${el.id}`} className="btn furniture-bt-primary">See More ...</a>
                        </div>
                    </div>

                </div>
                

                :

                null
                
            )
        })

    }

    componentDidMount () {
        this.getDataProducts ()
    }
    
    render () {

        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        }

        const settingsMobile = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        }

        if (this.state.dataProducts === null) {
            return (
                <div className="container my-5">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex justify-content-center mt-5">
                                <div className="spinner-grow" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )
        } else {

            return (
                <>  
                    {/* Desktop Display */}
                    <div className="container my-5 d-none d-md-block">
                        <Slider {...settings}>
                            {this.mapDataProducts()}
                        </Slider>
                    </div>


                    {/* Mobile Display */}
                    <div className="container my-5 d-block d-md-none">
                        <Slider {...settingsMobile}>
                            {this.mapDataProducts()}
                        </Slider>
                    </div>
                </>
                
            )

        }

    }

}

export default Carousel