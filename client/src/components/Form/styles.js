import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  overrides: {
    MuiInputBase: {
      input: {
        flexShrink: 1,
      },
    },
  },
  root: {
    '& .MuiTextField-root': {
      margin: 1
    },
  },
  paper: {
    display: "flex",
    padding: 2,
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  buttonSubmit: {
    marginBottom: 2,
  },
  textField:{
    
    margin: "5px 0",
    
  },

});

