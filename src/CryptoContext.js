import React, { createContext, useContext, useEffect, useState } from "react";

// We have created a context named crypto.
// crypto is the name of our context.
const Crypto = createContext();

//Here children is all the component and components within those components which is passed as prop.
const CryptoContext = ({ children }) => {

  //Made all the states that is used more than 1 time within the app.
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  // We have to wrap the createContext return with .Provider.
  // value take all the parameter that we have to export from the createContext.
  // We can make and export anything from cryptoContext like functions, state etc
  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol }}>
    {children}          {/*Children is all the components and components within those components */}
    </Crypto.Provider>
  );
};

export default CryptoContext;

//Made a function cryptoState and returned Whole createContext within useContext hook.
export const CryptoState = () => {
  return useContext(Crypto);
};
