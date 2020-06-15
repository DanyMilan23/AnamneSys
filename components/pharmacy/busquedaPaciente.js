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
                       onChange={(event, value) =>{
                       if (value != null) {
                      guardarSeleccion(value.data)
                      }
                      else{
                        guardarSeleccion(null)
                      }
                      } } 
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
                      {seleccion.first_name}
                    </p>
                    <p>
                      <b>Apellidos:</b>
                      {seleccion.last_name}
                    </p>
                    <p>
                      <b>Fecha de Nacimiento:</b>
                      27 de noviembre de 2001
                    </p>
                    <p>
                      <b>Ci:</b>
                      {seleccion.ci}
                    </p>
                    <p>
                      <b>Genero:</b>
                      {seleccion.gender}
                    </p>
                    <p>
                      <b>Estatura:</b>
                      {seleccion.patient.height}
                    </p>
                    <p>
                      <b>Peso:</b>
                      {seleccion.patient.weight}
                    </p>
                    <p>
                      <b>Tipo de sangre:</b>
                      {seleccion.patient.blood}
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
                          <b>Presion Arterial:</b>{seleccion.patient.blood_pressure}
                        </p>
                        <p>
                          <b>Frecuencia Cardiaca:</b> {seleccion.patient.breathing_frequency.inicio} - {seleccion.patient.breathing_frequency.fin}
                        </p>
                        <p>
                          <b>Ritmo Caridaco:</b> {seleccion.patient.heart_rate.inicio} - {seleccion.patient.heart_rate.fin}
                        </p>
                        <p>
                          <b>Temperatura:</b>{seleccion.patient.temperature} C
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
