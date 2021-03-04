import React from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"

import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"

import LandingPage from "./Pages/LandingPage"
import Register from "./Pages/Register"
import CatalogueProduct from "./Pages/Products"
import DetailProduct from "./Pages/DetailProduct"


// CSS 
import "./Supports/Stylesheets/Utils.css"
import "./Supports/Stylesheets/LandingPage.css"
import "./Supports/Stylesheets/DetailProduct.css"


class App extends React.Component {
  render () {
    return (
      <div>
        <BrowserRouter>
          
          <Navbar></Navbar>

          <Switch>
            <Route exact path="/" component={LandingPage}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/detail-product/1" component={DetailProduct}></Route>
            <Route path="/products" component={CatalogueProduct}></Route>
          </Switch>
  
          <Footer></Footer>

        </BrowserRouter>
        
      </div>
    )
  }
}

export default App;
