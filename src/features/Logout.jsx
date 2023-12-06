import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  function handleClicks() {
    // console.log("logout");
    // window.localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div>
      <button onClick={handleClicks}>logout</button>
    </div>
  );
}

export default Logout;
