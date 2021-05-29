import React from 'react';
import AppHeader from './components/AppHeader';
import './components/style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

// pages
import { DashboardPage } from './pages/dashboard/DashboardPage'

// account
import { LoginPage } from './pages/account/LoginPage'
import { RegisterPage } from './pages/account/RegisterPage'
import { ProfilePage } from './pages/account/ProfilePage'

// brands
import { BrandsPage } from './pages/brands/BrandsPage'

// products
import { ProductsPage } from './pages/products/ProductsPage'

function App() {
  return (
    <Router>
      <AppHeader />
      <div className="app">
        <Switch>
          <Route exact path="/" component={DashboardPage} />
          <Route exact path="/brands" component={BrandsPage} />
          <Route exact path="/products" component={ProductsPage} />
          <Route exact path="/account/" component={ProfilePage} />
          <Route exact path="/account/login" component={LoginPage} />
          <Route exact path="/account/register" component={RegisterPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
