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
import NewIdDetails from './PlayXchange/IdDetails/newidDetails.jsx';
import CreatePost from "./PlayXchange/CreatePost/CreatePost.jsx";
import AccountSecret from './PlayXchange/AccountSecret/AccountSecret.jsx';
import Confirmation from './PlayXchange/Confirmation/Confirmation.jsx';
import Success from './PlayXchange/Success/Success.jsx';

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
            <Route path="/id-details" element={<NewIdDetails />} />
            <Route path="/account-secret" element={<AccountSecret />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/success" element={<Success />} />
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