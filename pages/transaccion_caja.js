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
import MUIDataTable from "mui-datatables";
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
function transaccion_caja(props) {
  const classes = useStyles();
  const pacientes = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 }
  ];
  const columns = ["Nombre Servicio", "Cantidad", "Costo Unitario", "Total"];

  const data = [
    ["Atencion de emergencia", 1, 80, 80 ],
    ["Kit de Sutura",3, 120, 360 ],
  ];

  const options = {
    filterType: "dropdown",
    responsive: "scroll"
  };

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
            <h1>Caja</h1>
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
                <Grid item xs={12} sm={5}>
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
                <Grid item xs={11} sm={5}>
                  <Autocomplete
                    id="combo-box-demo"
                    options={pacientes}
                    getOptionLabel={option => option.title}
                    style={{ width: "auto" }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Servicios"
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
                <Grid item xs={12} sm={10}>
                  <MUIDataTable
                    title={"Factura"}
                    data={data}
                    columns={columns}
                    options={options}
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

export default transaccion_caja;