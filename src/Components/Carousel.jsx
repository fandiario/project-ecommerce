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
                    <div className="card furniture-border-primary furniture-border-rad-3 d-flex align-items-center" style={{width: "15rem", height: "25rem"}}>
                        {/* <div className="card-header furniture-bg-primary text-light" style={{width: "100%"}}>
                            <h5 className="card-title">
                                Discount {el.discount} %
                            </h5>
                        </div> */}
                        <div className="d-flex justify-content-center pt-3">
                            {/* <img src= {el.image1} className="card-img-top" alt="" style={{width: "60%", height: "auto"}}/> */}
                            <img src={el.image1} className="card-img-top my-2 d-flex " alt="..." style={{height: "25vh", width:"100%"}}/>
                        </div>
                        
                        <div className="card-body d-flex flex-column justify-content-end">
                            <h6 className="card-text furniture-font-size-20 font-weight-bold">{el.name}</h6>
                            <div>
                                <span className="mr-2 furniture-bg-primary furniture-border-rad-5 text-light px-2">
                                    {el.discount} %
                                </span>
                                
                                <del>
                                    Rp.
                                        {
                                            el.price.toLocaleString ()
                                        }
                                </del>
                                
                            </div>
                            <div className="font-weight-bold furniture-font-size-16 mb-3">
                                Rp. 
                                {
                                    (el.price - (el.price * (el.discount / 100))).toLocaleString()
                                } 
                            </div>
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
                    <div className="container d-none d-md-block ">
                        <div className="col-md-12 furniture-bg-primary my-2" style={{height: "5px"}}></div>

                        <div className="container my-5">
                            <Slider {...settings}>
                                {this.mapDataProducts()}
                            </Slider>
                        </div>

                        <div className="col-md-12 furniture-bg-primary my-2" style={{height: "5px"}}></div>
                    </div>
                    


                    {/* Mobile Display */}
                    <div className="container d-block d-md-none">
                        <div className="col-12 furniture-bg-primary my-2" style={{height: "5px"}}></div>

                        <div className="container my-5">
                            <Slider {...settingsMobile}>
                                {this.mapDataProducts()}
                            </Slider>
                        </div>

                        <div className="col-12 furniture-bg-primary my-2" style={{height: "5px"}}></div>
                    </div>
                   
                    
                </>
                
            )

        }

    }

}

export default Carousel