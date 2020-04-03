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
      <Layout>
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
          <Grid item xs={12} sm={12}>
            <Paper className={classes.paper} elevation={3}>
              <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
              >
                <Grid item xs={10} sm={10}>
                  <Autocomplete
                    id="combo-box-demo"
                    options={pacientes}
                    getOptionLabel={option => option.title}
                    style={{ width: "auto" }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Busqueda de Pacientes"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={2} sm={2}>
                  <Fab color="primary" aria-label="add">
                    <SearchIcon />
                  </Fab>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          {/*parte de datos personales*/}
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper} elevation={3}>
              <Grid
                container
                spacing={1}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
              >
                <Grid item xs={12} sm={12}>
                  <h2 className={classes.titulos}> Datos Personales </h2>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQ60ufmFsPeBQCj-o_t3GDfRDQSGEkc_0o_kXoXo-Qb_pnxSgX"
                    className={classes.imagen}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <p>
                    <b>Nombre:</b>
                    Ximena
                  </p>
                  <p>
                    <b>Apellidos:</b>
                    Jordan Meza
                  </p>
                  <p>
                    <b>Fecha de Nacimiento:</b>
                    27 de noviembre de 2001
                  </p>
                  <p>
                    <b>Ci:</b>
                    9494774
                  </p>
                  <p>
                    <b>Genero:</b>
                    Femenino
                  </p>
                 
                  <p>
                    <b>Tipo de sangre:</b>
                    Rho +
                  </p>
                  <h1>Medico Cirujano</h1>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          {/*parte de Signos vitales*/}
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper} elevation={3}>
              <Grid
                container
                spacing={1}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
              >
                <Grid item xs={12} sm={12}>
                  <h2 className={classes.titulos}> Horarios de atencion </h2>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <h2 className={classes.titulos}> Lunes - Viernes </h2>
                    <h2 className={classes.titulos}> 8:00 - 12:00 </h2>
                  
                </Grid>
                <Grid item xs={6} sm={6}>
                  <h2 className={classes.titulos}> Hospital Los Angeles </h2>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <h2 className={classes.titulos}> Lunes - Viernes </h2>
                    <h2 className={classes.titulos}> 14:00 - 19:00 </h2>
                  
                </Grid>
                <Grid item xs={6} sm={6}>
                  <h2 className={classes.titulos}> Hospital Univalle </h2>
                </Grid>

                
                
              </Grid>
            </Paper>
            <Button variant="contained" color="primary">
                    Atencion de pacientes
                </Button>
                <Button variant="contained"color="primary">
                    Notificar Emergencia
                </Button>
               
          </Grid>
         
         
        </Grid>
      </Container>
      </Layout>
    </>
  );
};


export default busqueda_doctor;
