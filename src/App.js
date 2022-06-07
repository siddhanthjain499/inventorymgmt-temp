import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import Home from './Components/Home/Home';
import PendingOrders from './Components/PendingOrders/PendingOrders';
import Statistics from './Components/Statistics/Statistics';
// import AddCustomer from './Components/AddCustomer/AddCustomer';
import CustomerBoard from './Components/CustomerBoard/CustomerBoard';
import AddCustomerForm from './Components/AddCustomer/AddCustomerForm';
import Layout from './Components/Layout/Layout';
import Inventory from './Components/Inventory/Inventory';
import Login from './Components/Login/Login';
import AuthContext from './Store/auth-context';
// import AddInventory from './Components/AddInventory/AddInventory';

function App() {

  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Layout>

      <Switch>

        <Route path='/' exact>
          {isLoggedIn && (
            <Redirect to='/Home'></Redirect>
          )}
          {!isLoggedIn && (
            <Redirect to='/Login' />
          )}
        </Route>

        <Route path='/Login'>
          {isLoggedIn && (
            <Redirect to='/Home'></Redirect>
          )}
          {!isLoggedIn && (
            <Login />
          )}
        </Route>

        <Route path='/Home'>
          {isLoggedIn && (
            <Home />
          )}
          {!isLoggedIn && (
            <Redirect to='/Login' />
          )}
        </Route>

        <Route path='/AddCustomerForm'>
          {isLoggedIn && (
            <AddCustomerForm />
          )}
          {!isLoggedIn && (
            <Redirect to='/Login' />
          )}
        </Route>

        <Route path='/CustomerBoard'>
          {isLoggedIn && (
            <CustomerBoard />
          )}
          {!isLoggedIn && (
            <Redirect to='/Login' />
          )}
        </Route>

        <Route path='/Inventory'>
          {isLoggedIn && (
            <Inventory />
          )}
          {!isLoggedIn && (
            <Redirect to='/Login' />
          )}
        </Route>

        {/* <Route path='/AddInventory'>
          <AddInventory />
        </Route> */}
        <Route path='/CompletedOrders'>
          {isLoggedIn && (
            <PendingOrders />
          )}
          {!isLoggedIn && (
            <Redirect to='/Login' />
          )}
        </Route>

        <Route path='/Statistics'>
          {isLoggedIn && (
            <Statistics />
          )}
          {!isLoggedIn && (
            <Redirect to='/Login' />
          )}
        </Route>

        <Route path='*'>
          <Redirect to='/' />
        </Route>

      </Switch>

    </Layout>
  );
}

export default App;
