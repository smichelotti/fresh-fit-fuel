import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home, AboutMe, HowItWorks, Contact, MenuItems } from './pages/';
import './App.css';
import './styles.css';
import { Header, Footer } from './components';

function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <div className="starter-template text-center py-5 px-3">
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/admin">
              <MenuItems />
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
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
          <Footer />
        </div>


      </div>
    </BrowserRouter>
  );
}

export default App;
