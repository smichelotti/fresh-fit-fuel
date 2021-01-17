import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home, AboutMe, HowItWorks, Contact, MenuItems } from './pages/';
import './App.css';
import { Header, Footer } from './components';
import { AdminHeader } from './pages/Admin/components/AdminHeader/AdminHeader';

function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <div className="starter-template text-center">
          {window.location.pathname.includes('/admin') ? <AdminHeader /> : <Header />}
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

            {/* Admin screens */}
            <Route exact path="/admin/menu-items">
              <MenuItems />
            </Route>
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
          <Footer />
        </div>


      </div>
    </BrowserRouter>
  );
}

export default App;
