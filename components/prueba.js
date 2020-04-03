import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
//Components
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
//inputs
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Fab from "@material-ui/core/Fab";
import PropTypes from "prop-types";
//iconos
import SearchIcon from "@material-ui/icons/Search";
//layout
import Layout from "../components/layout/layout"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "flex-start",
    color: theme.palette.text.secondary,
    height: "auto"
  },
  imagen: {
    width: "auto",
    height: "auto"
  },
  titulos: {
    textAlign: "center"
  }
}));

const busqueda_doctor = props => {
  const classes = useStyles();
  const pacientes = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 }
  ];
  return (
    <>
      <CssBaseline />

      <Container fixed>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {/*parte de busqueda de usuarios*/}
          <Grid item xs={12} sm={12}>
            <h1> Busqueda Doctor</h1>
          </Grid>
          
         
         
        </Grid>
      </Container>

    </>
  );
};


export default busqueda_doctor;
