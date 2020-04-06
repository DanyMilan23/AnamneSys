import React, { useState, useEffect, useContext } from "react";
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
import Layout from "../components/layout/layout";
//hooks
import usePacientes from "../hooks/usePacientes";

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

const busqueda_paciente = props => {
  const classes = useStyles();
  const { pacientes } = usePacientes();
  const [seleccion,guardarSeleccion]=useState(null);
  //cargar el autocomplete
  let salida = [];
  const data = pacientes.map(paciente => {
    salida.push({
      title:paciente.ci +"  " +paciente.first_name +"  " +paciente.last_name,
      id: paciente.id,
      data:paciente
    });
  });

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
              <h1> Busqueda de paciente</h1>
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
                      options={salida}
                      getOptionLabel={option => option.title}
                      style={{ width: "auto" }}
                      onChange={(event, value) =>guardarSeleccion(value.data) } 
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
            {seleccion !=null?(<>
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
                      src={seleccion.photo}
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
                      <b>Estatura:</b>
                      1,72 metros
                    </p>
                    <p>
                      <b>Peso:</b>
                      50 Kg
                    </p>
                    <p>
                      <b>Tipo de sangre:</b>
                      Rho +
                    </p>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
           
            <Grid item xs={12} sm={6}>
              <Grid
                container
                spacing={1}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
              >
                <Grid item xs={12} sm={12}>
                  <Paper className={classes.paper} elevation={3}>
                    <Grid
                      container
                      spacing={1}
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-start"
                    >
                      <Grid item xs={12} sm={8}>
                        <h2 className={classes.titulos}>Signos Vitales</h2>
                        <p>
                          <b>Presion Arterial:</b>2311
                        </p>
                        <p>
                          <b>Frecuencia Cardiaca:</b>16 - 20
                        </p>
                        <p>
                          <b>Ritmo Caridaco:</b> 60 - 80
                        </p>
                        <p>
                          <b>Temperatura:</b>37 C{" "}
                        </p>
                      </Grid>
                      {/*Aqui van los chips de recomendacion*/}
                      <Chip color="primary" size="small" />
                    </Grid>
                  </Paper>
                </Grid>
               
                <Grid item xs={12} sm={12}>
                  <Paper className={classes.paper} elevation={3}>
                    <h2 className={classes.titulos}>Antecedentes</h2>
                    <Chip color="primary" size="small" />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={2} />
            <Grid item xs={12} sm={3}>
              <Button variant="contained" color="primary">
                Historial Completo
              </Button>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button variant="contained" color="primary">
                Atender Paciente
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button variant="contained" color="primary">
                Actualizar Informacion
              </Button>
            </Grid></>):null}
          </Grid>
        </Container>
      </Layout>
    </>
  );
};

busqueda_paciente.propTypes = {};

export default busqueda_paciente;
