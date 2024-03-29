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
//hooks
import usePacientes from "../../hooks/usePacientes";
import useAntecedentes from '../../hooks/useAntecedentes'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "flex-start",
    color: theme.palette.text.secondary,
    height: "auto",
  },
  imagen: {
    width: "auto",
    height: "auto",
  },
  titulos: {
    textAlign: "center",
  },
}));

const busqueda_paciente = (props) => {
  const classes = useStyles();
  const { pacientes } = usePacientes();
  const { antecedentes } = useAntecedentes();
  const [seleccion, guardarSeleccion] = useState(null);
  const [selecAnte, guardarSelecAnte] = useState(null);
  //cargar el autocomplete
  let salida = [];
  const data = pacientes.map((paciente) => {
    salida.push({
      title:
        paciente.ci + "  " + paciente.first_name + "  " + paciente.last_name,
      id: paciente.id,
      data: paciente,
    });
  });


  let antecedenteData = [];
  const data2 = antecedentes.map((antecedente) => {
    antecedenteData.push({
      title:
        antecedente.name + " - " + antecedente.description,
      id: antecedente.id,
      data: antecedente,
    });
  });  
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
            <h1>Antecedentes</h1>
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
                    getOptionLabel={(option) => option.title}
                    style={{ width: "auto" }}
                    onChange={(event, value) => {
                      if (value != null) {
                        guardarSeleccion(value.data);
                      } else {
                        guardarSeleccion(null);
                      }
                    }}
                    renderInput={(params) => (
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
          {seleccion != null ? (
            <>
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
                      <h2 className={classes.titulos}>Antecedentes</h2>

                      {seleccion.antecedent ? (
                        <>
                          {seleccion.antecedent.map((ant) => (
                            <Grid item xs>
                              <Chip
                                variant="outlined"
                                label={ant}
                                color="secondary"
                              />
                            </Grid>
                          ))}
                        </>
                      ) : (
                        <h3> No tiene Antecedentes</h3>
                      )}
                      <Grid item xs={12} sm={12}>
                        <Autocomplete
                          options={antecedenteData}
                          getOptionLabel={(option) => option.title}
                          style={{ width: "auto" }}
                          onChange={(event, value) => {
                            if (value != null) {
                              guardarSelecAnte(value.data);
                            } else {
                              guardarSelecAnte(null);
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Antecedentes"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={2} sm={2}>
                        <Button variant="contained" color="primary" fullWidth>
                          Añadir
                        </Button>
                      </Grid>
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
              </Grid>
            </>
          ) : null}
        </Grid>
      </Container>
    </>
  );
};

busqueda_paciente.propTypes = {};

export default busqueda_paciente;
