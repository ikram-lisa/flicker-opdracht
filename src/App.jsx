import Details from "./Components/Details";
import Flicker from "./Pages/Flicker";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Flicker />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
