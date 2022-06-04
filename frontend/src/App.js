import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import React, { useState } from "react";

function App() {
  const [selectedColor, setSelectedColor] = useState("");
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/dashboard">
            <Navbar setSelectedColor={setSelectedColor} />
            <Dashboard selectedColor={selectedColor} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
