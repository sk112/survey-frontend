import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
import logo from './../assets/logo.svg';

// Here, we display our Navbar
export default function Navbar() {

  const DownloadHandler = () => {
    fetch("http://localhost:5002/download")
    .then(response => response.blob())
    .then(data => {
      console.log(data)
      var csvURL = window.URL.createObjectURL(data);
      let tempLink = document.createElement('a');
      tempLink.href = csvURL;
      tempLink.setAttribute('download', 'survey-records.csv');
      tempLink.click();
    })
    .catch(err => console.log(err))
  }
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
        <img style={{"width" : 25 + '%'}} src={logo} alt="Survey"></img>
        </NavLink>
        
        <button className="btn btn-primary" onClick={DownloadHandler}>
          Download Responses
        </button>
      </nav>
    </div>
  );
}
