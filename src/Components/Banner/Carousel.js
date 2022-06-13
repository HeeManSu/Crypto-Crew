import { makeStyles } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { TrendingCoins } from '../../config/api'
import {CryptoState} from '../../CryptoContext'


const useStyles = makeStyles((theme) => ({
    carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center",
    }
}))

const Carousel = () => {
  cosnt [trending, setTrending] = useState([]);
  const classes = useStyles()
  const  {currency} = CryptoState();

  const fetchTrendingCoins = async => {
    const {data} = await axios.get(TrendingCoins(currency))
    console.log(data)
    setTrending(data);
  }
  useEffect (()=> {
    fetchTrendingCoins();
  }, [currency]);


   
  return (
    <div className={classes.carousel}>Carousel</div>
  )
}

export default Carousel