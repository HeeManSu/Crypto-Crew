// Snack Component - https://material-ui.com/components/snackbars/
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { CryptoState } from "../CryptoContext";

const Alert = () => {

    //We are importing the alert context that we had created.
  const { alert, setAlert } = CryptoState();

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    //Whenever we want to close the setAlert the open is false.
    setAlert({ open: false });
  };

  return (

    //This snackbar is imported from material ui. This will show the toast message.
    <Snackbar
      open={alert.open}
      autoHideDuration={3000}
      onClose={handleCloseAlert}
    >
      <MuiAlert
        onClose={handleCloseAlert}
        elevation={10}
        variant="filled"
        severity={alert.type}
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;