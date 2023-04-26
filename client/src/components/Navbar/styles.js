import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  appBar: {
    position:"static",
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  image: {
    marginLeft: '15px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
})