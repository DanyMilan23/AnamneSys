import React, { useState, useEffect, useContext }  from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
//components
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
//layout
import Layout from "../components/layout/layout"
import useSintomas from "../hooks/useSintomas"; 

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "flex-start",
    color: theme.palette.text.secondary,
    height: "auto"
  },
  titulos: {
    textAlign: "center"
  },
  textField: {
    width: "auto"
  }
}));

function nuevo_historial(props) {
  const classes = useStyles();
  const { sintomas } = useSintomas();
  console.log(sintomas)

  return (
    <>
      <CssBaseline />
      <Layout>
      <Container fixed>
        <Grid
          container
          spacing={1}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12} sm={12}>
            <h1>Nuevo Historial</h1>
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
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="enfermedad_actual"
                    label="Enfermedad Actual"
                    multiline
                    rows="1"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    id="resultado_laboratorio"
                    label="Resultado de laboratorio"
                    multiline
                    rows="5"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    id="examen_fisico"
                    label="Examen Fisico"
                    multiline
                    rows="5"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="diagnostico_presuntivo"
                    label="Diagnostico Presuntivo"
                    multiline
                    rows="3"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="razon_consulta"
                    label="Razon de la consulta"
                    multiline
                    rows="1"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Autocomplete
                    multiple
                    id="fixed-tags-demo"
                    options={sintomas}
                    onChange={(event, value) => {
                      guardarLista(value);
                    }}
                    getOptionLabel={option => option.name}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          label={option.title}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Fixed tag"
                        variant="outlined"
                        placeholder="Favorites"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <h2 className={classes.titulos}>Diagnostico</h2>
                  <p>lorem ipsum</p>
                  <p>lorem ipsum</p>
                  <p>lorem ipsum</p>
                  <p>lorem ipsum</p>
                  <p>lorem ipsum</p>
                  <p>lorem ipsum</p>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    id="diagnostico_final"
                    label="Diagnostico final"
                    multiline
                    rows="3"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Button variant="contained" color="primary" >
                    Guardar Historial
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            
          </Grid>
        </Grid>
      </Container>
      </Layout>
    </>
  );
}
const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 }
];
export default nuevo_historial;