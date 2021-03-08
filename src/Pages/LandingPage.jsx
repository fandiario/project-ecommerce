import React from "react"

import Jumbotron from "../Components/Jumbotron"
import Carousel from "../Components/Carousel"
import Motto from "../Components/Motto"


class LandingPage extends React.Component {
    render () {
        return (
            <>
                <Jumbotron></Jumbotron>
                <Motto></Motto>
                <Carousel></Carousel>
            </>
        )
    }
}

export default LandingPage