import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../Pages/Home';
import AboutUs from '../Pages/AboutUs';
import PrivacyPolicy from '../Pages/PrivacyPolicy';
import ContactUs from '../Pages/ContactUs';
import Gallery from '../Pages/Gallery';
import Categories from '../Pages/Categories';
import RecentOrders from '../Pages/RecentOrders';
import Cart from '../Pages/Cart';

const AppRoutes = () => {
  return (
  <BrowserRouter>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route  path="/about" component={AboutUs} />
        <Route  path="/privacy-policy" component={PrivacyPolicy} />
        <Route  path="/contact" component={ContactUs} />
        <Route  path="/gallery" component={Gallery} />
        <Route  path="/categories" component={Categories} />
        <Route  path="/recent-order" component={RecentOrders} />
        <Route  path="/cart" component={Cart} />
    </Switch>
  </BrowserRouter>
  );
};

export default AppRoutes;