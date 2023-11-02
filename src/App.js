import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageNotFound from "./components/PageNotFound"
import MovieDetail from "./components/MovieDetail"

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/movie/:imdbID" element={<MovieDetail />} />
            <Route exact path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
