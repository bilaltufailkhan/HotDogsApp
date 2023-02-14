import HotdogExplorer from "./components/HotdogExplorer";
import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./common/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateHotDog from "./components/CreateHotDog";
import EditHotDog from "./components/EditHotDog";

const App = () => {

  return (
    <div className="main-wrapper">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HotdogExplorer />} />
          <Route path="/create" element={<CreateHotDog />} />
          <Route path="/edit/:prodId" element={<EditHotDog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
