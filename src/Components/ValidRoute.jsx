import React from "react"
import {Redirect, Route} from "react-router-dom"
import Register from "../Pages/Register"

class ValidRoute extends React.Component {

    render () {

        if (localStorage.getItem ("id")) {

            return (
                <Redirect to={{pathname: "/"}} ></Redirect>
            )

        } else {

            return (
                <Route path="/register" component={Register}></Route>
            )          
        }
        
    }

}

export default ValidRoute