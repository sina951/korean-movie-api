import React from "react";
import "./Main.css";
import requests from "./components/requestApi";
import Nav from "./components/Nav";
import Banner from "./components/Banner";
import Row from "./components/Row";
// Form
import { AuthProvider } from "./contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"  // switch determens which route we are currently on
import Signup from "./components/Signup"
import Login from "./components/Login"
import Logout from "./components/Logout"
import PrivateRoute from "./components/PrivateRoute"
import ForgotPassword from "./components/ForgotPassword"
import UpdateProfile from "./components/UpdateProfile"
// THE 2 HOOKS WE USE ARE THE FOLLOWING
// useState allows us to use state within our functional components [items] which is our data from API and [setState] to change items. We name it setItems in our case
// useEffect we use to fire of when components load to make an http request to get the data /img /name /movies etc. A snippet of code that runs based on a specific condition/variable, this is where we use useEffect
// fetchUrl pulls information from requestApi.js, it send info via props to our row.component, which renders it.
// When this is true = our row will display a poster instead of thumbnail - poster is bigger :) isLargeRow is a name we just made up be create wiht it!
const App = () => {
  return (
    <div className="app-container">
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/">
              <Nav />
              <Banner />
              <Row
                title="KOREA MOST POPULAR"
                fetchUrl={requests.fetchKoreanPopular}
                isLargeRow={true} 
              />
              <Row title="Top Rated" fetchUrl={requests.fetchKoreanTopRated} />
              <Row title="Best Revenue" fetchUrl={requests.fetchByRevenue} />
              <Row
                title="Top Rated Movies Choi Min-sik (För Anders)"
                fetchUrl={requests.fetchChoiMinsik}
              />
            <Row title="US" fetchUrl={requests.fetchTrending}/>
          </PrivateRoute>
          <PrivateRoute path="/logout" component={Logout} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
