import { EthProvider } from "./contexts/EthContext";
/* Truffle Box 
import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
import Footer from "./components/Footer";
*/

//// PlayXchange ////
  // PlayXchange Frontend pages
import Home from "./PlayXchange/Home/Home.jsx";
//import GameList from "./components/Footer";
//import IdDetails from "./components/Footer";
//import CreatePost from "./components/Footer";
//import UserAuth from "./components/Footer";

  // PlayXchange Frontend components
//import Navbar from "./components/Footer";
import Footer from "./components/Footer";


function App() {
  return (
    <EthProvider>
      <Home />
    </EthProvider>
  );
}

export default App;

/*
<div id="App">
        <div className="container">
          <Intro />
          <hr />
          <Setup />
          <hr />
          <Demo />
          <hr />
          <Footer />
        </div>
      </div>
*/