import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'
import HomePage from './Pages/HomePage'
import CoinPage from './Pages/CoinPage'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: '#14161a',
    color: 'white',
    minHeight: '100vh',
  },
}))

function App() {

  const classes = useStyles()
  return (
    <Router>
      <div className={classes.App}>
        <Header />

        <Routes>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/coins/:id" component={CoinPage}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App

// 30 minutes
