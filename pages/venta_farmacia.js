import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
//components
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
//iconos
import SearchIcon from "@material-ui/icons/Search";
import MaterialTable from "material-table";
import Layout from '../components/layout/layout'

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
function venta_farmacia(props) {
  const classes = useStyles();
  const pacientes = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 }
  ];
  const [state, setState] = React.useState({
    columns: [
      { title: "Nombre", field: "nombre" },
      { title: "Cantidad", field: "cantidad" },
      { title: "Precio Unitario", field: "precio", type: "numeric" },
      { title: "Descripcion", field: "descripcion" },
      { title: "Indicaciones", field: "indicacion" },
       { title: "Total", field: "total", type: "numeric" },
    ],
    data: [
     
    ]
  });

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
            <h1>Venta Farmacia</h1>
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
                <Grid item xs={6} sm={6}>
                  <Autocomplete
                    id="combo-box-demo"
                    options={pacientes}
                    getOptionLabel={option => option.title}
                    style={{ width: "auto" }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Busqueda Producto"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={1} sm={1}>
                  <Fab color="primary" aria-label="add">
                    <SearchIcon />
                  </Fab>
                </Grid>
                <Grid item xs={2} sm={2}>
                  <Button variant="contained" color="primary" size="large">
                    Cargar Medicina
                  </Button>
                </Grid>
                <Grid item xs={2} sm={2}>
                  <Button variant="contained" color="primary" size="large">
                    Guardar Venta
                  </Button>
                </Grid>
                <Grid item xs={11} sm={11}>
                  <MaterialTable
                    title="Editable Example"
                    columns={state.columns}
                    data={state.data}
                    editable={{
                      onRowAdd: newData =>
                        new Promise(resolve => {
                          setTimeout(() => {
                            resolve();
                            setState(prevState => {
                              const data = [...prevState.data];
                              data.push(newData);
                              return { ...prevState, data };
                            });
                          }, 600);
                        }),
                      onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                          setTimeout(() => {
                            resolve();
                            if (oldData) {
                              setState(prevState => {
                                const data = [...prevState.data];
                                data[data.indexOf(oldData)] = newData;
                                return { ...prevState, data };
                              });
                            }
                          }, 600);
                        }),
                      onRowDelete: oldData =>
                        new Promise(resolve => {
                          setTimeout(() => {
                            resolve();
                            setState(prevState => {
                              const data = [...prevState.data];
                              data.splice(data.indexOf(oldData), 1);
                              return { ...prevState, data };
                            });
                          }, 600);
                        })
                    }}
                  />
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

export default venta_farmacia;
