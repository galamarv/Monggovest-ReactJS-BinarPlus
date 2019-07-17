import React from 'react';
import Homepage from './components/homepage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style/style.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import InvestPage from './components/investasi';
import InvestDetail from './components/investasi/Detail';
import AuthLogin from './components/auth/authLogin';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path='/' component={Homepage} />
        <Switch>
          <Route exact path='/investasi' component={InvestPage} />
          <Route path='/investasi/:investId' component={InvestDetail} />
        </Switch>
        <Route path='/login' component={AuthLogin}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
