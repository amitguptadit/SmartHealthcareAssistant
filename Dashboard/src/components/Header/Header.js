import React from 'react';
import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
    makeStyles,
  } from "@material-ui/core";
  import { Link, Route, Routes } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    navlinks: {
      marginLeft: theme.spacing(10),
      display: "flex",
    },
   logo: {
      flexGrow: "1",
      cursor: "pointer",
    },
    link: {
      textDecoration: "none",
      color: "#000000",
      fontSize: "16px",
      marginLeft: theme.spacing(5),
      "&:hover": {
        color: "#000000",
        borderBottom: "1px solid white",
      },
    },
  }));

const Header = (props) => {
    
      const classes = useStyles();
      
    return (
        <AppBar position="fixed" style={{ background: '#cfd8dc', color: '#000000' }}>
      <CssBaseline />
      <Toolbar>
        <Typography variant="h6" className={classes.logo}>
          Smart Healthcare
        </Typography>
          <div className={classes.navlinks}>
            <Link to="/patientslist" className={classes.link}>
              Patients
            </Link>
            <Link to="/about" className={classes.link}>
              Reports
            </Link>
          </div>
      </Toolbar>
    </AppBar>
    )
}

export default Header;