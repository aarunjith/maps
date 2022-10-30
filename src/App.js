import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Home";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import TestCases from "./Components/Testcases";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/lat-long' element={<Home/>} />
          <Route path='/maps' element={<TestCases/>} />
        </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  );
}
export default App;
