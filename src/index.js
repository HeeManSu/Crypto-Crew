import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "react-alice-carousel/lib/alice-carousel.css";
import CryptoContext from "./CryptoContext";

ReactDOM.render(
  <React.StrictMode>
    <CryptoContext>     
      {/*We wrapped the whole app with CryptoContext because we want that all the state variables present in CryptoContext is made available in all the component present in App.js and saare component ke andar ke component me bhi available ho jaye.  */}
      <App />
       {/* We can also wrap App.js with this CryptoContext as all the component is present there */}
    </CryptoContext>
  </React.StrictMode>,
  document.getElementById("root")
);
