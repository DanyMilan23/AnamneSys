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
//datetime
import DateFnsUtils from "@date-io/date-fns";
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
//MediaQuerys
import useMediaQuery from "@material-ui/core/useMediaQuery";

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
function atencion_caja(props) {
  const classes = useStyles();
  const pacientes = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 }
  ];
  const matches = useMediaQuery("(min-width:960px)");
  useEffect(() => {
    setSource(matches);
  }, [matches]);
  const [date, changeDate] = useState(new Date());
  const [source, setSource] = useState(false);
  const title = [
    {
      title: "Doctor",
      field: "imageUrl",
      render: rowData => (
        <div>
          <img
            src={rowData.imageUrl}
            alt=""
            style={{ width: 40, borderRadius: "50%" }}
          />
          <b style={{ verticalAlign: "top", paddingLeft: "20px" }}>
            {rowData.name}
          </b>
        </div>
      )
    },
    { title: "Enfermedad Actual", field: "enfermedad" },
    { title: "Fecha", field: "fecha", type: "date" }
  ];

  const data = [
    { name: "Mehmet", surname: "Xd", birthYear: 1987, birthCity: 63 },
    {
      name: "Zerya Betül",
      surname: "Baran",
      birthYear: 2017,
      birthCity: 34
    }
  ];
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
            <h1>Atencion de Paciente</h1>
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
                <Grid item xs={10} sm={6}>
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
                <Grid item xs={1} sm={1}>
                  <Fab color="primary" aria-label="add">
                    <SearchIcon />
                  </Fab>
                </Grid>
                <Grid item xs={2} sm={2}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <TimePicker
                      variant="inline"
                      label="Inline mode"
                      value={date}
                      onChange={changeDate}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={2} sm={2}>
                  <Button variant="contained" color="primary">
                    Guardar
                  </Button>
                </Grid>
                <Grid item xs={12} sm={3}>
                <Autocomplete
                    id="combo-box-demo"
                    options={pacientes}
                    getOptionLabel={option => option.title}
                    style={{ width: "auto" }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Busqueda de Doctores"
                        variant="outlined"
                      />
                    )}
                  />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    {source ? (
                      <DatePicker
                        autoOk
                        variant="static"
                        openTo="date"
                        value={date}
                        onChange={changeDate}
                      />
                    ) : (
                      <DatePicker
                        variant="inline"
                        label="Basic example"
                        value={date}
                        onChange={changeDate}
                      />
                    )}
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={1} sm={1}></Grid>
                <Grid item xs={7} sm={7}>
                  <MaterialTable
                    title="Historial Completo"
                    columns={title}
                    data={data}
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

export default atencion_caja;
