import React, { useEffect } from 'react';
import './components/style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

// header
import AppHeader from './components/AppHeader';

// account pages
import { LoginPage } from './pages/oauth/LoginPage'
import { RegisterPage } from './pages/oauth/RegisterPage'
import { UserPage } from './pages/users/UserPage'

// about pages
import { AboutPage } from './pages/about/AboutPage'

// brands pages
import { BrandsPage } from './pages/brands/BrandsPage'

// products pages
import { ProductsPage } from './pages/products/ProductsPage'

// community pages
import { CommunityPage } from './pages/community/CommunityPage'

// redux store
import { checkLogin, checkUserAge, fetchCurrentUser, getOauthAccess, isUserValidAge } from './pages/oauth/oauthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { PostsPage } from './pages/posts/PostsPage';
import { ValidateAgePage } from './pages/oauth/ValidateAgePage';

function App() {

  const dispatch = useDispatch()
  const isValidAge = useSelector(isUserValidAge)
  const oauthAccess = useSelector(getOauthAccess);
  useEffect(() => {
      dispatch(checkLogin())
      .then(res => {
        if(res.meta.requestStatus === "fulfilled"){ // logged in (assume of age)
          dispatch(fetchCurrentUser())
        }else{ // user not logged in (check age)
          dispatch(checkUserAge())
        }
      })
  }, [dispatch])
  
  if(!isValidAge
    && oauthAccess.status !== "loading"
    && !oauthAccess.isLoggedIn
  ){ // age not determined
    return (
      <div className="app">
        <ValidateAgePage />
      </div>
    )
  }

  return (
    <Router>
      <AppHeader isLoggedIn={oauthAccess.isLoggedIn}/>
      <div className="app">
        <Switch>
        <Route exact path="/:location?/:brandId?/:productUrl?/submit/:postType?/" component={PostsPage} />
          <Route exact path="/brands/:brandId?/:postsType?/:displayName?/:postLink?"
            component={BrandsPage} />
          <Route exact path="/products/:brandId?/:productUrlId?/:postsType?/:displayName?/:postLink?" 
            component={ProductsPage} />
          <Route exact path="/community/:type?/:displayName?/:postLink?" component={CommunityPage} />
          <Route exact path="/account/" component={UserPage} />
          <Route exact path="/user/:displayName?/:postType?" component={UserPage} />
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
