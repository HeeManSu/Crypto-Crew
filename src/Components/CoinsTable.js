import React, { useEffect, useState } from 'react'
import axios from "axios"
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { 
  createTheme,
  TableCell, 
  LinearProgress, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableContainer, 
  Table, 
  Paper, 
  TextField, 
  Typography, 
  Container, 
  ThemeProvider 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Pagination } from '@material-ui/lab';
import { useHistory } from "react-router-dom";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const {currency, symbol} = CryptoState();

    const useStyles = makeStyles({
      row: {
        backgroundColor: "#16171a",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#131111",
        },
        fontFamily: "Montserrat",
      },
      Pagination: {
        "& .MuiPaginationItem-root": {
          color: "gold",
        },
      },
    })
    const classes = useStyles()
    const history = useHistory()

    const darkTheme = createTheme({
      palette: {
        primary: {
          main: "#fff"
        },
        type: "dark"
      }
    })


    const fetchCoins = () => {

        setLoading(true);
        const {data} = await axios.get(CoinList(currency));
        console.log(data);

        setCoins(data);
        setLoading(false);
    };

   
    useEffect (()=> {

        fetchCoins()
    }, [currency])
     
   
      const handleSearch =() => {
        return coins.filter(
          (coin) => 
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search)
        )
      }

     
  return (
  <ThemeProvider theme={darkTheme}>
    <Container style={{textAlgin: "center"}}>
        <Typography
         variant= "h4"
          style={{margin: 18, fontFamily: "Montesserrat"}}>
            Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
        label="Search For a Crypto Currency"
        variant='outlined'
        style={{marginBottom: 20, width: "100%"}}
        onchange = {(e) => setSearch(e.target.valuse)}>
        </TextField>
        <TableContainer component={paper}>
          {loading ? (
            <LinearProgress style = {{backgroundColor: "gold"}}></LinearProgress>
          ): (
            <Table>
              <TableHead style = {{backgroundColor: "#EEBC1D"}}>
                <TableRow>
                  {/* Explantion 1 2*/}
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head)=> (
                    <TableCell style ={{
                      color: "black",
                      fontWeight: "700",
                      fontFamily: "Montserrat",
                    }}
                    key= {head}
                    align = {head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* If nothing is searched then it will display all the coins */}
                {handleSearch().slice((page - 1) * 10, (page -1) * 10 + 10).map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    //This will send us to the coins page.
                    <TableRow onClick= {() => history.push(`/coins/${row.id}`)}
                    className = {classes.row}
                    key = {row.name}
                    >
                      <TableCell
                      component = "th"
                      scope = "row"
                      styles={{
                        display: "flex",
                        gap: 15,
                      }}>
                        <img 
                        src={row?.image}
                        alt = {row.name}
                        height = "50"
                        style = {{marginBottom : 10}}
                        />
                        <div style={{display: "flex", flexDirection: "column"}}>
                          <span
                          style={{textTransform: "uppercase", fontSize: 22}}>
                           {row.symbol}
                          </span>
                          <span
                          style={{color: "darkgrey"}}>{row.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        {symbol}{" "}
                        {numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell align="right" style = {{
                        color: profit > 0 ? "rgb(14,203,129)" : "red",
                        fontWeight: 500,
                      }}>
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align = "right">
                        {symbol}{" "}
                        {numberWithCommas(
                          row.market_cap.toString().slice(0, -6)
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
        // we put question mark here if it is empty.
        //We want it to be fixed . we don't want it to be in decimal.
        count={(handleSearch()?.length/10).toFixed(0)}
        style= {{
          padding: 20,
          width: "100%",
          display:"flex",
          justifyContent: "center",
        }}
        //STyle to pagination is provided here.
        classes = {{ul: classes.Pagination}}
        //When we click on any of the page . we want to set the page value and scroll the page to the 450px.
        //On change we are going to take the value and set the page to the value and then scroll to 450px.
        onChange = {(_, value) => {
          setPage(value);
          window.scroll(0, 450);
        }}
        >
        </Pagination>
    </Container>
  </ThemeProvider>
  )
}
export default CoinsTable