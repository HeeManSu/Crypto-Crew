import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import axios from "axios";
import { CoinList } from "./config/api";
import { onSnapshot, doc } from "firebase/firestore";

// We have created a context named crypto.
// crypto is the name of our context.
const Crypto = createContext();

//Here children is all the component and components within those components which is passed as prop.
const CryptoContext = ({ children }) => {

  //Made all the states that is used more than 1 time within the app.
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  //This will show the toast like message .
  const [alert, setAlert] = useState({
    //Our alert is going to have few things.
    open: false,
    message: "",
    type: "success",
  });
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);  //Loading when seared fo the coin.
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user?.uid);
      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          console.log(coin.data().coins);
          setWatchlist(coin.data().coins);
        } else {
          console.log("No Items in Watchlist");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  //This is going to monitor the authentiction state of our firebase app.
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
      console.log(user);
    });
  }, []);


  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    console.log(data);

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");

    fetchCoins();
    // eslint-disable-next-line
  }, [currency]);

  // We have to wrap the createContext return with .Provider.
  // value take all the parameter that we have to export from the createContext.
  // We can make and export anything from cryptoContext like functions, state etc
  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol, coins, loading, alert, user, watchlist, setAlert  }}>
    {children}          {/*Children is all the components and components within those components */}
    </Crypto.Provider>
  );
};

export default CryptoContext;

//Made a function cryptoState and returned Whole createContext within useContext hook.
export const CryptoState = () => {
  return useContext(Crypto);
};
