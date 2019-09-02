import React from 'react';
import Homepage from './components/homepage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style/style.css';
import './assets/style/login.css'

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import InvestPage from './components/investasi';
import InvestDetail from './components/investasi/Detail';
import AdminLogin from './components/auth/adminLogin';
import addInvest from './components/admin/tambahInvestasi';
import UserLogin from './components/auth/userLogin';
import UserRegister from './components/auth/userRegister';



function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path='/' component={Homepage} />
        <Switch>
          <Route exact path='/investasi' component={InvestPage} />
          <Route path='/investasi/:investId' component={InvestDetail} />
        </Switch>
          <Route path='/adm-login' component={AdminLogin}/>
          <Route path='/login' component={UserLogin}/>
          <Route path='/register' component={UserRegister}/>
        <Switch>
        <Route exact path='/adm-invest' component={addInvest} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
