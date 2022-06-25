import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { Button, Tab, Tabs, AppBar, Box } from '@material-ui/core'
import Signup from './Signup'
import Login from './Login'
import { useState } from 'react'
import { CryptoState } from '../../CryptoContext'
import { auth } from '../../firebase'
import GoogleButton from 'react-google-button'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

//This will give the popup signup/login form.
//This has been imported from material ui.
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  //Paper is the div inside the modal.
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    color: 'white',
    borderRadius: 10,
  },
  google: {
    padding: 24,
    paddingTop: 0,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    gap: 20,
    fontSize: 20,
  },
}))

export default function AuthModal() {
  const classes = useStyles()
  //This will used to open and close the modal like if we clicked on any of the tabs(signUp/Login) then the modal should be closed.
  const [open, setOpen] = useState(false)

  const { setAlert } = CryptoState()

  //This will open the modal.
  const handleOpen = () => {
    setOpen(true)
  }

  //This will close the modal.
  const handleClose = () => {
    setOpen(false)
  }

  //This value will be used for changing the tabs of the Auth form.
  // default is 0 which means it will show login tab initally.
  const [value, setValue] = useState(0)

  //This handle change will help in changing the tabs of the login/signUp form.
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  //This will used to signIn using signIn with google.
  const googleProvider = new GoogleAuthProvider()

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${res.user.email}`,
          type: 'success',
        })

        handleClose()
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: 'error',
        })
        return
      })
  }

  return (
    <div>
      <Button
        variant="contained"
        style={{
          width: 85,
          height: 40,
          marginLeft: 15,
          backgroundColor: '#EEBC1D',
        }}
        //When it gets triggered it will open the modal.
        onClick={handleOpen}
      >
        Login
      </Button>
      {/* this is the code of the modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {/* this is appbar contains login and signup when clicked on the button */}
            <AppBar
              position="static"
              style={{
                backgroundColor: 'transparent',
                color: 'white',
              }}
            >
              <Tabs
                //This value is used to change state when we change the tabs in the app bar of the auth modal.
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                style={{ borderRadius: 10 }}
              >
                {/* There will be two tabs in the app bar */}
                {/* login and signup */}
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBar>
            {/* if value is 0 then it will show login component. otherwise it will show signUp component. */}
            {/* The handle close will close the modal if we have clicked on any of the modal */}
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <Signup handleClose={handleClose} />}
            <Box className={classes.google}>
              <span>OR</span>
              {/* SignUp with google is button done using libiary called react-google-button */}
              <GoogleButton
                style={{ width: '100%', outline: 'none' }}
                onClick={signInWithGoogle}
              />
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
