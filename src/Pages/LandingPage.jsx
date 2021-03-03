import React from "react"
import Jumbotron from "../Components/Jumbotron"
import Carousel from "../Components/Carousel"


class LandingPage extends React.Component {
    render () {
        return (
            <>
                <Jumbotron></Jumbotron>
                <Carousel></Carousel>
            </>
        )
    }
}

export default LandingPage