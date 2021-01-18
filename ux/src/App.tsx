import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home, AboutMe, HowItWorks, Contact, MenuItems, Order } from './pages/';
import './App.css';
import { Header, Footer } from './components';
import { AdminHeader } from './pages/Admin/components/AdminHeader/AdminHeader';
import { Menus } from './pages/Admin/Menus/Menus';
import { Orders } from './pages/Admin/Orders/Orders';
import { AdminHome } from './pages/Admin/AdminHome/AdminHome';
import { EditMenuItem } from './pages/Admin/MenuItems/EditMenuItem';

function App() {
  const isAdmin = window.location.pathname.includes('/admin');

  return (
    <BrowserRouter>
      <div className="App">

        <div className="starter-template">
          {isAdmin ? <AdminHeader /> : <Header />}
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <AboutMe />
            </Route>
            <Route exact path="/process">
              <HowItWorks />
            </Route>
            <Route exact path="/contact">
              <Contact />
            </Route>
            <Route exact path="/order">
              <Order />
            </Route>

            {/* Admin screens */}
            <Route exact path="/admin">
              <AdminHome />
            </Route>
            <Route exact path="/admin/orders">
              <Orders />
            </Route>
            <Route exact path="/admin/menus">
              <Menus />
            </Route>
            <Route exact path="/admin/menu-items">
              <MenuItems />
            </Route>
            <Route exact path="/admin/menu-items/:id">
              <EditMenuItem />
            </Route>
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
          {!isAdmin && <Footer /> }
        </div>


      </div>
    </BrowserRouter>
  );
}

export default App;
