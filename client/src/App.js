import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from "./components/Login/Login";
import Table from "./components/Table/Table";
import Chart from "./components/Chart/Chart";

import React from "react";


function App() {
  return (
    <BrowserRouter>
    <React.Fragment>
      <Switch>
    <Route path="/Table" component={Table} />
    <Route path ="/Login" component={Login} />
    <Route path ="/Chart" component={Chart} />
    
    </Switch>
  </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
