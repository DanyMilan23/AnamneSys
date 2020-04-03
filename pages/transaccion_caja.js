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
  const columns = ["Name", "Title", "Location", "Age", "Salary"];

  const data = [
    ["Gabby George", "Business Analyst", "Minneapolis", 30, "$100,000"],
    ["Aiden Lloyd", "Business Consultant", "Dallas", 55, "$200,000"],
    ["Jaden Collins", "Attorney", "Santa Ana", 27, "$500,000"],
    ["Franky Rees", "Business Analyst", "St. Petersburg", 22, "$50,000"],
    ["Aaren Rose", "Business Consultant", "Toledo", 28, "$75,000"],
    ["Blake Duncan", "Business Management Analyst", "San Diego", 65, "$94,000"],
    ["Frankie Parry", "Agency Legal Counsel", "Jacksonville", 71, "$210,000"],
    ["Lane Wilson", "Commercial Specialist", "Omaha", 19, "$65,000"],
    ["Robin Duncan", "Business Analyst", "Los Angeles", 20, "$77,000"],
    ["Mel Brooks", "Business Consultant", "Oklahoma City", 37, "$135,000"],
    ["Harper White", "Attorney", "Pittsburgh", 52, "$420,000"],
    ["Kris Humphrey", "Agency Legal Counsel", "Laredo", 30, "$150,000"],
    ["Frankie Long", "Industrial Analyst", "Austin", 31, "$170,000"],
    ["Brynn Robbins", "Business Analyst", "Norfolk", 22, "$90,000"],
    ["Justice Mann", "Business Consultant", "Chicago", 24, "$133,000"],
    [
      "Addison Navarro",
      "Business Management Analyst",
      "New York",
      50,
      "$295,000"
    ],
    ["Jesse Welch", "Agency Legal Counsel", "Seattle", 28, "$200,000"],
    ["Eli Mejia", "Commercial Specialist", "Long Beach", 65, "$400,000"],
    ["Gene Leblanc", "Industrial Analyst", "Hartford", 34, "$110,000"],
    ["Danny Leon", "Computer Scientist", "Newark", 60, "$220,000"],
    ["Lane Lee", "Corporate Counselor", "Cincinnati", 52, "$180,000"],
    ["Jesse Hall", "Business Analyst", "Baltimore", 44, "$99,000"],
    ["Danni Hudson", "Agency Legal Counsel", "Tampa", 37, "$90,000"],
    ["Terry Macdonald", "Commercial Specialist", "Miami", 39, "$140,000"],
    ["Justice Mccarthy", "Attorney", "Tucson", 26, "$330,000"],
    ["Silver Carey", "Computer Scientist", "Memphis", 47, "$250,000"],
    ["Franky Miles", "Industrial Analyst", "Buffalo", 49, "$190,000"],
    ["Glen Nixon", "Corporate Counselor", "Arlington", 44, "$80,000"],
    [
      "Gabby Strickland",
      "Business Process Consultant",
      "Scottsdale",
      26,
      "$45,000"
    ],
    ["Mason Ray", "Computer Scientist", "San Francisco", 39, "$142,000"]
  ];

  const options = {
    filterType: "dropdown",
    responsive: "scroll"
  };

  return (
    <>
      <CssBaseline />
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
    </>
  );
}

export default transaccion_caja;