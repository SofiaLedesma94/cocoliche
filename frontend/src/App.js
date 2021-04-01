
import Home from './pages/Home'
import Calendary from './pages/Calendar'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Menu from './pages/Menu'
import Profile from './pages/Profile'
import ScrollToTop from './components/ScrollTop'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import authActions from './redux/actions/authActions'
import React, { useState } from 'react'
import Admin from './pages/Admin.jsx';
import Reservation from './components/Reservation'
import ConfirmPurchase from './pages/ConfirmPurchase'


function App(props) {
  const [reload, setReload] = useState(false)
  var routes
  if (props.loggedUser) {
    if (props.loggedUser.role === "admin") {
      routes =
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/reservation" component={Reservation} />
            <Route exact path="/calendar" component={Calendary} />
            <Route path="/cart" component={Cart} />
            <Route path="/menu" component={Menu} />
            <Route path="/contact" component={Contact} />
            <Route path="/profile" component={Profile} />
            <Route path="/admin" component={Admin} />
            <Route path="/confirm" component={ConfirmPurchase} />
            <Redirect to="/" />
          </Switch>
        </ScrollToTop>
    } else {
      routes =
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/reservation" component={Reservation} />
            <Route path="/calendar" component={Calendary} />
            <Route path="/cart" component={Cart} />
            <Route path="/menu" component={Menu} />
            <Route path="/contact" component={Contact} />
            <Route path="/profile" component={Profile} />
            <Route path="/confirm" component={ConfirmPurchase} />
            <Redirect to="/" />
          </Switch>
        </ScrollToTop>
    }
  } else if (localStorage.getItem('token')) {
    props.logFromLS(localStorage.getItem('token'))
      .then(respuesta => {
        if (respuesta === '/') setReload(!reload)
      })
  } else {
    routes =
      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/calendar" component={Calendary} />
          <Route path="/cart" component={Cart} />
          <Route path="/menu" component={Menu} />
          <Route path="/contact" component={Contact} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/reservation" component={Reservation} />
          <Route path="/profile" component={Profile} />
          <Redirect to="/" />
        </Switch>
      </ScrollToTop>

  }

  return (
    <>
      <Router>
        {routes}
      </Router>
    </>
  );
}
const mapStateToProps = state => {
  return {
    loggedUser: state.authReducer.loggedUser
  }
}

const mapDispatchToProps = {
  logFromLS: authActions.logFromLS
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
