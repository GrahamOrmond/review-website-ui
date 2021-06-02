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

// about
import { AboutPage } from './pages/about/AboutPage'

// brands
import { BrandsPage } from './pages/brands/BrandsPage'

// products
import { ProductsPage } from './pages/products/ProductsPage'

// community
import { CommunityPage } from './pages/community/CommunityPage'

function App() {
  return (
    <Router>
      <AppHeader />
      <div className="app">
        <Switch>
          <Route exact path="/" component={DashboardPage} />
          <Route exact path="/brands/:brandId?/:productLink?/:postsType?/:postLink?" 
            component={BrandsPage} 
          />
          <Route exact path="/products/" component={ProductsPage} />
          <Route exact path="/community/" component={CommunityPage} />
          <Route exact path="/account/" component={ProfilePage} />
          <Route exact path="/account/login" component={LoginPage} />
          <Route exact path="/account/register" component={RegisterPage} />
          <Route exact path="/about/:page" component={AboutPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
