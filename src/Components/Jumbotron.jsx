import React from "react"

class Jumbotron extends React.Component {
    render () {
        return (
            <div className="d-flex justify-content-center align-items-center flex-column furniture-jumbotron">
                              
               <h1>
                    Discount Up To 25%
                </h1>

                <button type="button" className="btn btn-warning font-weight-bold furniture-font-size-35 m-3">Buy It Now</button>
            </div>
        )
    }
}

export default Jumbotron