import React from 'react';
import './App.css';
import background from '../../images/background.jpg';
import {Startpage} from "../Startpage/Startpage";

function App() {
  return (
    <div className="App" style={{backgroundImage: `url(${background})`}}>
        <Startpage />
    </div>
  );
}

export default App;
