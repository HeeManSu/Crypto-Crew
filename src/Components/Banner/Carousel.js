import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import { numberWithCommas } from "../CoinsTable";

const Carousel = () => {
  const [trending, setTrending] = useState([]);  //Inital State is going to be an empty array.
  //Imported currency and symbol from the CreateContext.
  const { currency, symbol } = CryptoState();

  // fetching the data from that api using axios.
  const fetchTrendingCoins = async () => {
    //This will return the data of that api.
    const { data } = await axios.get(TrendingCoins(currency));

    console.log(data);
    setTrending(data);
    // Gave that coins data to setTrending coins
  };

  //whenever any currency is changed we value gets updated.
  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const useStyles = makeStyles(() => ({
    carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white",
    },
  }));

  const classes = useStyles();

  //To get the items which will be shown in the carousel.
  const items = trending.map((coin) => {

    //Price change precentage data will be given by the API.
    //If price coin price in  24h is greater than 0 then it will be profit.
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      //It help us to travel from one page to another page, like here we want to coins id.
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img      //It is the logo of the coins in the carasoul.
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
         <span>       {/*These two span will show the name and the profit or loss percentage. */}
          {coin?.symbol}
          &nbsp;
          <span
            style={{    //If profit is > 0. Then, It will show rgb color otherwise red.
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >    
           {profit && "+"}      {/* If it is profit then it will show +  */}
             {coin?.price_change_percentage_24h?.toFixed(2)}%   {/*tofixed fixed upto  2 decimal places */}
          </span>
         </span>        {/*This span will show the current price */}
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {/* symbol will show the symbol USD or INR */}
          {/* numberwithcommas to give commas between the numbers and toFixed to fix the number upto 2 decimal places */}
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  //Responsive object.
  const responsive = {
    0: {               //If it is 0px then it will show 2 items.
      items: 2,
    },
    512: {             //If it is 512px or above then it will show 4 items on the scrren
      items: 4,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel              //   Styling carasoul
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}    //How many item will be shown on the screen in one time.
        items={items}              //It will be items shown in the carousel.   
        autoPlay                
      />
    </div>
  );
};

export default Carousel;
