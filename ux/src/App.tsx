import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import './App.css';
import { MenuItems } from './pages/Admin/MenuItems/MenuItems';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container">

          <div className="starter-template text-center py-5 px-3">
            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>
              <Route exact path="/admin">
                <MenuItems />
              </Route>

            </Switch>
            
          </div>

        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;
