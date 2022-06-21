import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { Line } from "react-chartjs-2";
import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";
import { CryptoState } from "../CryptoContext";


const CoinInfo = ({ coin }) => {
  //This set and update the previous data of the coin.
  const [historicData, setHistoricData] = useState();
  //Of how many days the graph will be shown.
  //inititally the day will be 1.
  const [days, setDays] = useState(1);
  //This will set and update the currency.
  const { currency } = CryptoState();
  //
  const [flag, setflag] = useState(false);

  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));

  const classes = useStyles();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setflag(true);
    //We only want prices of the historyData.
    setHistoricData(data.prices);
  };

  // console.log(historicData);

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
      {/* If historicData is loading then it will show CircularProgress.*/}
        {!historicData | flag===false ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          // else if we are having the chart.
          <>
          {/* We are going to use the line chart.*/}
            <Line
            //The chart will have some data with it.
            //This will show the x-axis . date or time.
              data={{
                //The prices and the dates are labels here.
                labels: historicData.map((coin) => {
                  //At the 0th index we have the actual date.
                  //YOu can see it in the console by writing console.log(historicData);
                  let date = new Date(coin[0]);
                  let time =
                  //This will give the exact time in the javascript.
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                      //If day is 1 then we are going to display time else we are going to display date.
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                //This will be y-axis and data of the chart.
                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              //It is used to remove the dots on the chart.
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
             {/* It will give the 4 buttons below the chart. */}
             {/* ChartDays has been imported from the data which has all the days. */}
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  //Whenever we click on the button it should set the data to that particular date.
                  //Value is present in the data file.
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  //If day.value is equals to days. then it is selected.
                  selected={day.value === days}
                >
                  {/* label is present in the data file. */}
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
