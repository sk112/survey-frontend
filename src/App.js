
// We import all the components we need in our app
import Navbar from "./components/navbar";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import OtherSurvey from "./components/Other";

const App = () => {
  

  return (
    <div>
      <Navbar />
      <div style={{ margin: 20 }}>

      <Routes>
          <Route exact path="/other" element={<OtherSurvey />} />
          <Route path="/" element={
            <Home />
          } />
      </Routes>
      
      </div>
    </div>
  );
};

export default App;



