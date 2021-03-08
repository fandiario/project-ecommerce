import React from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"

import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import ValidRoute from "./Components/ValidRoute"

import LandingPage from "./Pages/LandingPage"
import Register from "./Pages/Register"
import CatalogueProduct from "./Pages/Products"
import DetailProduct from "./Pages/DetailProduct"
import Cart from "./Pages/Cart"

// Redux
import {createStore, applyMiddleware} from "redux"
import {Provider} from 'react-redux'
import thunk from "redux-thunk"
import allReducer from "../src/Supports/Redux/Reducers/index"

// CSS 
import "./Supports/Stylesheets/Utils.css"
import "./Supports/Stylesheets/LandingPage.css"
import "./Supports/Stylesheets/DetailProduct.css"

const store = createStore (allReducer, applyMiddleware(thunk))

class App extends React.Component {

  render () {
    return (
      <div>
        <Provider store={store}>
          <BrowserRouter>
            
            <Navbar></Navbar>

            <Switch>

              <Route exact path="/" component={LandingPage}></Route>
              <Route path="/products" component={CatalogueProduct}></Route>
              <Route path="/detail-product/:idProduct" component={DetailProduct}></Route>
              <Route path="/cart/:idUser" component={Cart}></Route>

              <ValidRoute path="/register" component={Register}></ValidRoute>

            </Switch>
    
            <Footer></Footer>

          </BrowserRouter>
        </Provider>
        
        
      </div>
    )
  }
}

export default App;
