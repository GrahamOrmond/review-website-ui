import React, { useEffect } from 'react';
import AppHeader from './components/AppHeader';
import './components/style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

// account pages
import { LoginPage } from './pages/oauth/LoginPage'
import { RegisterPage } from './pages/oauth/RegisterPage'
import { ProfilePage } from './pages/users/ProfilePage'

// about pages
import { AboutPage } from './pages/about/AboutPage'

// brands pages
import { BrandsPage } from './pages/brands/BrandsPage'

// products pages
import { ProductsPage } from './pages/products/ProductsPage'

// community pages
import { CommunityPage } from './pages/community/CommunityPage'

// redux store
import { store } from './store/store';
import { fetchBrands } from './pages/brands/brandsSlice';
import { fetchProducts } from './pages/products/productsSlice';
import { checkLogin, isUserLoggedIn } from './pages/oauth/oauthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from './pages/posts/postsSlice';

store.dispatch(fetchBrands());
store.dispatch(fetchProducts());
store.dispatch(fetchPosts());

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(checkLogin())
  }, [dispatch])
  const isLoggedIn = useSelector(isUserLoggedIn);

  return (
    <Router>
      <AppHeader isLoggedIn={isLoggedIn}/>
      <div className="app">
        <Switch>
          <Route exact path="/brands/:brandId?/:postsType?/:postLink?" 
            component={BrandsPage} 
          />
          <Route exact path="/products/:brandId?/:productUrlId?/:postsType?/:postLink?" component={ProductsPage} />
          <Route exact path="/community/:action?" component={CommunityPage} />
          <Route exact path="/account/" component={ProfilePage} />
          <Route exact path="/user/:userId?" component={ProfilePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/about/:page" component={AboutPage} />
          <Route exact path="/" component={CommunityPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
