import React from "react"
import Axios from "axios"
import linkAPIProducts from "../Supports/Constants/LinkAPIProducts"
import Slider from "react-slick";

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
                <div key = {i} className="d-flex justify-content-center">
                    <div className="col-5">
                        <img src={el.image1} alt="" className="furniture-img-carousel img-fluid"/>
                    </div>
                    
                    <div className="col-5">
                        <div className="font-weight-bold furniture-font-size-30">
                            Discount {el.discount} %
                        </div>

                        <div className="font-weight-bold furniture-font-size-20 ">
                            {el.name} 
                        </div>
                    </div>
                    
                </div>
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
            slidesToShow: 2,
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
                <div className="container my-5 d-none d-sm-block">
                    {/* <h1>
                        Hello from Carousel
                    </h1> */}
                                
                    <Slider {...settings}>
                        {this.mapDataProducts()}
                    </Slider>
                </div>
            )

        }

    }

}

export default Carousel