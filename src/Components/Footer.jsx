import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt, faEnvelope} from '@fortawesome/free-solid-svg-icons'

class Footer extends React.Component {
    render () {
        return (
            <div>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-12 furniture-bg-third ">
                            <h5>
                                Lorem Ipsum
                            </h5>

                            <hr/>

                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis commodo tincidunt tristique. Mauris eu sollicitudin quam. Nam in ante imperdiet, tristique dolor ornare, sagittis dolor. Phasellus a aliquam odio, non commodo mauris. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla sodales dictum finibus. Duis sit amet lacus sem. Vestibulum rhoncus sit amet sapien eu condimentum. Nullam vitae tincidunt tortor. 
                            </p>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-md-4 d-none d-md-block">
                            <h5>
                                Magasin de Meubles
                            </h5>

                            <p>
                                About Us
                            </p>

                            <p>
                                Promo
                            </p>

                            <p>
                                Projects
                            </p>

                            <p>
                                Blog
                            </p>

                            <p>
                                Career
                            </p>

                        </div>

                        <div className="col-md-4 d-none d-md-block">
                            <h5>
                                Customer Sevice
                            </h5>

                            <p>
                                FAQ
                            </p>

                            <p>
                                Privacy Agreement
                            </p>

                            <p>
                                Rules
                            </p>

                            <p>
                                Delivery Policy
                            </p>

                            <p>
                                Goods Return Policy
                            </p>

                            <p>
                                Delivery Area
                            </p>

                            

                        </div>

                        <div className="col-md-4 d-none d-md-block">
                            <h5>
                                Contact Us
                            </h5>

                            <p>
                                <FontAwesomeIcon icon ={faPhoneAlt} className="mr-2"></FontAwesomeIcon>
                                
                                <span>
                                    0811-1234-1234
                                </span>
                                
                            </p>

                            <p>
                                <FontAwesomeIcon icon ={faEnvelope} className="mr-2"></FontAwesomeIcon>
                                
                                <span>
                                    contact_us@magasindemeubles.com
                                </span>
                                
                            </p>                           

                        </div>

                    </div>
                </div>
                

                <div className="row furniture-bg-primary justify-content-center pt-3 text-light">
                    <p className="font-weight-bold">
                        Purwadhika Digital Technology School
                    </p>
                </div>

            </div>
        )
    }

}

export default Footer