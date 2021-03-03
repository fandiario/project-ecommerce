import React from "react"

class DetailProduct extends React.Component {

    render () {
        return (
            <div className= "container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div>
                            <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/728/0172811_PE327002_S4.jpg" className="img-fluid" alt=""/>
                        </div>

                        <div className="d-flex flex-row justify-content-between">
                            <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/728/0172811_PE327002_S4.jpg" className="img-fluid furniture-img-thumb" alt=""/>
                            <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/032/0403204_PE565263_S4.jpg" className="img-fluid furniture-img-thumb" alt=""/>
                            <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/034/0403483_PE565542_S4.jpg" className="img-fluid furniture-img-thumb" alt=""/>
                        </div>
                        

                    </div>

                    <div className="col-12 col-md-6">
                        <div className="mt-5">
                            <h1>
                                Meja Kantor
                            </h1>
                            <p className="font-italic">
                                Sold : 2 Products
                            </p>
                            <h3>
                                Rp. 5.000.000
                            </h3>
                            <hr/>
                        </div>

                        <div>
                            <p>
                                Stock : 20 items
                            </p>

                            <p>
                                Weight: 7 kg
                            </p>
                            <hr/>
                        </div>

                        <div>
                            <h5>
                                Category :
                            </h5>
                            <p>
                                Perabotan Kantor
                            </p>
                        </div>

                        <div className="mt-5 mb-3 d-flex justify-content-center">
                            <input type="button" value="Add To Cart" className="btn furniture-bt-primary" style={{width: "300px"}}/>
                        </div>


                    </div>
    
                </div>
            </div>
        )
    }

}

export default DetailProduct