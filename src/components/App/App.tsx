import React from 'react';
import './App.css';
import background from '../../images/background.jpg';
import {Startpage} from "../Startpage/Startpage";
import {Outlet} from "react-router-dom";

function App() {
  return (
    <div className="App" style={{backgroundImage: `url(${background})`}}>
        <Outlet />
    </div>
  );
}

export default App;
