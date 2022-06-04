import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
export default function Dashboard({ selectedColor }) {
  const [color, setColor] = useState("");
  const [expire, setExpire] = useState("");
  const history = useHistory();

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      const decoded = jwt_decode(response.data.accessToken);
      setColor(decoded.color);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        history.push("/");
      }
    }
  };

  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        const decoded = jwt_decode(response.data.accessToken);
        setColor(decoded.color);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return (
    <div>
      <style>{"body {background:" + selectedColor + ";}"}</style>
      <div
        style={{
          width: "100%",
          height: "1115px",
        }}
      />
    </div>
  );
}
