import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

function Header() {
  const classes = useStyles();
  // State of the app will be changed if we swap from INR to USD or USD to INR.
  const { currency, setCurrency } = CryptoState();


  // This is used to naviagte to other routes using push or replace function
  const history = useHistory();

  return (
    //This is used to give dark theme in Material UI.
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">       {/*static position is default in css */}
         <Container>         {/*Container makes something responsive in material ui. */}
           <Toolbar>         {/*It comes with AppBar and provides styles like flex  */}
            <Typography       //used to give and style text.

              //  This onClick will navigate to home page when click on the logo of navbar
              onClick={() => history.push(`/`)}    
              variant="h6"
              className={classes.title}
            >
              Crypto Hunter
            </Typography>
            <Select       // gave option to choose INR or USD             
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              style={{ width: 100, height: 40, marginLeft: 15 }}
              onChange={(e) => setCurrency(e.target.value)}   //This is set the selceted currency.
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
