import React,{Fragment,useState} from 'react'

import UserJoinPage from './Components/UserJoinPage';

import { BrowserRouter as Router, Switch, Route, Link, Routes,Navigate } from "react-router-dom";
import "./App.css";

import AccountHomePage from './Components/AccountHomePage';

function App() {

  return (
    
    <Router>
      <Routes>
      
      <Route exact path="/" element=   {<UserJoinPage/>}>
   
        
      </Route>
     
     <Route exact path="/AccountHomePage" element={<AccountHomePage/>}/>
     
     
   
            



    
    </Routes>
  </Router>
  
     
     
     
     
     
     
    
    
  );
}

export default App;
