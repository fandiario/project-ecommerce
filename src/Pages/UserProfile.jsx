import React from "react"
import {
    Switch,
    Route,
    Link,
    BrowserRouter
  } from "react-router-dom";
// import LandingPage from "../Pages/LandingPage"

// Pages Child
import UserSetting from "../Components/UserProfile/UserSetting"
import UserHistory from "../Components/UserProfile/UserHistory"
import UserAddress from "../Components/UserProfile/UserAddress"

class UserProfile extends React.Component {

    state = {
        isRefresh: false
    }
    render () {
        return (

            <BrowserRouter>
                <div className="container mt-3">
                    <div className="row">
                        <Link to={`/user-profile/${localStorage.getItem ("id")}/user-setting`} className="furniture-link mx-3" onClick={() => this.setState ({isRefresh: true})}>
                            <button className="btn furniture-bt-primary">
                                User Profile
                            </button>
                        </Link>
                        
                        <Link to={`/user-profile/${localStorage.getItem ("id")}/user-history`} className="furniture-link ">
                            <button className="btn furniture-bt-primary">
                                Transaction History
                            </button>
                        </Link>
                    </div>

                    
                    <Switch>
                        <Route exact path="/user-profile/:idUser/user-setting" component={UserSetting}></Route>
                        <Route path="/user-profile/:idUser/user-history" component={UserHistory}></Route>
                        <Route path="/user-profile/:idUser/user-address" component={UserAddress}></Route>
                    </Switch>
                    

                </div>
            
            </BrowserRouter>
            
        )
    }

}

export default UserProfile