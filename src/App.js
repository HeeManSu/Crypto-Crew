import { makeStyles } from "@material-ui/core";
import Homepage from "./Pages/HomePage";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import CoinPage from "./Pages/CoinPage";
import Header from "./components/Header";

// use Styles is used to provide styles. It returns a hook which can be used in the function component.
const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",    //Blackish color
    color: "white",                //White color for the text.
    minHeight: "100vh",
  },
}));

function App() {
  //This is hook reutrned by makeStyles.
  const classes = useStyles();

  return (
    <BrowserRouter>
    {/* That hook is used with classes and dot operator. */}
      <div className={classes.App}>
        <Header />
        {/* / Gives the default page. Homepage and coinPage are the two pages here. */}
        <Route path="/" component={Homepage} exact />
        <Route path="/coins/:id" component={CoinPage} exact />
      </div>
    </BrowserRouter>
  );
}

export default App;
