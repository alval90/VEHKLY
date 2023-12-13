import "./App.css";
import background from "../../assets/background.jpg";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App" style={{ backgroundImage: `url(${background})` }}>
      <Outlet />
    </div>
  );
}

export default App;
