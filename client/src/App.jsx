// ETH
import { EthProvider } from "./contexts/EthContext";
// React-Routing-DOM
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Truffle Box
/*
import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
import Footer from "./components/Footer";
*/

//// PlayXchange ////
  // PlayXchange Frontend pages
import Home from "./PlayXchange/Home/Home.jsx";
import GameList from "./PlayXchange/GameList/GameList.jsx";
//import IdDetails from "./components/Footer";
import CreatePost from "./PlayXchange/CreatePost/CreatePost.jsx";
//import UserAuth from "./components/Footer";

  // PlayXchange Frontend components
//import Navbar from "./components/Footer";
//import Footer from "./components/Footer";


function App() {
  return (
    <EthProvider>
      <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game-list" element={<GameList />} />
            <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </Router>
    
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