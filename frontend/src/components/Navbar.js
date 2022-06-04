import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import jwt_decode from "jwt-decode";
export default function Navbar({ setSelectedColor }) {
  const [name, setName] = useState("");
  const [user, setUser] = useState({
    color: "",
    name: "",
  });
  const history = useHistory();
  const [msg, setMsg] = useState("");
  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setSelectedColor(decoded.color);
    } catch (error) {
      if (error.response) {
        history.push("/");
      }
    }
  };
  const Update = async (e) => {
    try {
      await axios.put("http://localhost:5000/users", {
        color: e.label,
        name: name,
      });
      history.push("/dashboard");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const Logout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  var colors = [
    { value: 1, label: "Red" },
    { value: 2, label: "Green" },
    { value: 3, label: "Blue" },
    { value: 4, label: "Pink" },
    { value: 5, label: "Orange" },
    { value: 6, label: "White" },
  ];
  var ddhandle = (e) => {
    setUser({ ...user, color: e.label });
    setSelectedColor(e.label);
    Update(e);
  };
  return (
    <div>
      <nav
        className="navbar is-light"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-item ">
              <Select
                placeholder="Choose Background Colour Theme"
                options={colors}
                onChange={ddhandle}
              ></Select>
            </div>
            <div className="navbar-item"> Welcome back: {name}</div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <button onClick={Logout} className="button is-light">
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
