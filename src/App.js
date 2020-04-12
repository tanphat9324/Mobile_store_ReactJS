import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import LoginPage from "./components/Pages/LoginPage/LoginPage";
import ProductListPage from "./components/Pages/ProductListPage/ProductListPage";
import ProductAddPage from "./components/Pages/ProductAddPage/ProductAddPage";
import DetailPage from "./components/Pages/DetailPage/DetailPage";
import CartPage from "./components/Pages/CartPage/CartPage";
import Auth from "./components/Auth/Auth";

// import logo from './logo.svg';
// import './App.css';
function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Auth  exact  Component={LoginPage} path="/login" />
          <Route exact  component={ProductListPage} path="/" />
          <Route exact  component={ProductListPage} path="/productlist" />
          <Route exact  component={DetailPage} path="/detail/:id" />
          <Auth  exact  Component={ProductAddPage} path="/productadd" />
          <Route exact  component={CartPage} path="/cart" />
          <Redirect path='*' to='/' />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
