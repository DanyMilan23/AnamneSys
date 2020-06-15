import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Router, { useRouter } from "next/router";
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
import Alert from "@material-ui/lab/Alert";
//iconos
import SearchIcon from "@material-ui/icons/Search";
import MaterialTable from "material-table";
//datetime
import DateFnsUtils from "@date-io/date-fns";
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
//MediaQuerys
import useMediaQuery from "@material-ui/core/useMediaQuery";
//hooks
import usePacientes from "../../hooks/usePacientes";
import useDoctores from "../../hooks/useDoctores";
import useServices from "../../hooks/useServices";
import useCitas from "../../hooks/useCitas";
//context
import { FirebaseContext } from "../../firebase/index";
//estilos
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

function atencion_caja(props) {
  const classes = useStyles();
  //leer de la base de datos los pacientes
  const { pacientes } = usePacientes();
  const { doctores } = useDoctores();
  const { services } = useServices();
  //cargar el autocomplete pacientes
  let pacientesData = [];
  const Data1 = pacientes.map((paciente) => {
    pacientesData.push({
      title:
        paciente.ci + "  " + paciente.first_name + "  " + paciente.last_name,
      id: paciente.id,
      data: paciente,
    });
  });
  //cargar el autocomplete pacientes
  let doctoresData = [];
  const Data2 = doctores.map((doctor) => {
    doctoresData.push({
      title: doctor.ci + "  " + doctor.first_name + "  " + doctor.last_name,
      id: doctor.id,
      data: doctor,
    });
  });
  //cargar el autocomplete service
  let servicesData = [];
  const Data3 = services.map((service) => {
    servicesData.push({
      title: service.name + "  " + service.cost + " Bs",
      id: service.id,
      data: service,
    });
  });

  //Media Query
  const matches = useMediaQuery("(min-width:960px)");
  useEffect(() => {
    setSource(matches);
  }, [matches]);
  //State
  const [citas, guardarCitas] = useState([
    {
      patient: "",
      service: "",
      date: "",
      imageUrl: "",
    },
  ]);
  const [source, setSource] = useState(false);
  const [error, guardarError] = useState(false);
  const [date, changeDate] = useState(new Date());
  const [ficha, setFicha] = useState({
    patient: "",
    doctor: "",
    imagenUrl: "",
    service: "",
  });
  //title para el table
  const title = [
    {
      title: "Paciente",
      field: "imageUrl",
      render: (rowData) => (
        <div>
          <img
            src={rowData.imageUrl}
            alt=""
            style={{ width: 40, height: 40, borderRadius: "50%" }}
          />
          <b style={{ verticalAlign: "top", paddingLeft: "20px" }}>
            {rowData.patient}
          </b>
        </div>
      ),
    },
    { title: "Hora", field: "date", type: "time" },
    { title: "Servicio", field: "service" },
  ];
  const { usuario, firebase } = useContext(FirebaseContext);
  //function guardar
  const handleSubmit = (e) => {
    e.preventDefault();
    async function crearFicha() {
      // si el usuario no esta autenticado llevar al login
      if (!usuario) {
        return Router.push("/");
      }
      // crear el objeto de nuevo producto
      const fichaData = {
        patient: ficha.patient,
        doctor: ficha.doctor,
        imageUrl: ficha.imagenUrl,
        date: date,
        service: ficha.service,
        create: Date.now(),
      };
      // insertarlo en la base de datos
      firebase.db
        .collection("appointment_management")
        .add(fichaData)
        .then(function (docRef) {
          alert("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          alert("Error adding document: ", error);
        });
      return router.push("/main");
    }
    // validar
    if (
      ficha.patient.trim() === "" ||
      ficha.doctor.trim() === "" ||
      ficha.imagenUrl.trim() === "" ||
      ficha.service.trim() === ""
    ) {
      guardarError(true);
      return;
    }
    crearFicha();
  };
  //fichas en tiempo real
  useEffect(() => {
    actualizarCitas(date);
    console.log(citas);
  }, [date]);
  let citasData = [];
  function actualizarCitas(fecha) {
    const fechaInicio = new Date(
      fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate()
    );
    const fechaFin = new Date(
      fecha.getFullYear() +
        "-" +
        (fecha.getMonth() + 1) +
        "-" +
        (fecha.getDate() + 1)
    );
    firebase.db
      .collection("appointment_management")
      .where("date", ">=", fechaInicio)
      .where("date", "<=", fechaFin)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const tiempo = doc.data().date;
          citasData.push({
            id: doc.id,
            patient: doc.data().patient,
            doctor: doc.data().doctor,
            imageUrl: doc.data().imageUrl,
            date: new Date(tiempo * 1000),
            service: doc.data().service,
            create: doc.data().create,
          });
          guardarCitas(citasData);
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }
  return (
    <>
      <CssBaseline />
      <Container fixed>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid
            container
            spacing={1}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={12} sm={12}>
              <h1>Atencion de Paciente</h1>
              {error && (
                <Alert variant="filled" severity="error">
                  Todos los campos deben estar llenos
                </Alert>
              )}
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
                      id="patient"
                      name="patient"
                      options={pacientesData}
                      getOptionLabel={(option) => option.title}
                      onChange={(event, value) => {
                        if (value != null) {
                          setFicha({
                            ...ficha,
                            patient:
                              value.data.first_name +
                              " " +
                              value.data.last_name,
                            imagenUrl: value.data.photo,
                          });
                        } else {
                          setFicha({ ...ficha, patient: "" });
                        }
                      }}
                      style={{ width: "auto" }}
                      renderInput={(params) => (
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
                        id="hour"
                        name="hour"
                        variant="inline"
                        label="Elija una hora"
                        value={date}
                        onChange={changeDate}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={2} sm={2}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Guardar
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      id="doctor"
                      name="doctor"
                      onChange={(event, value) => {
                        if (value != null) {
                          setFicha({
                            ...ficha,
                            doctor:
                              value.data.first_name + value.data.last_name,
                          });
                        } else {
                          setFicha({ ...ficha, doctor: "" });
                        }
                      }}
                      options={doctoresData}
                      getOptionLabel={(option) => option.title}
                      style={{ width: "auto" }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Busqueda de Doctores"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <Autocomplete
                      id="service"
                      name="service"
                      onChange={(event, value) => {
                        if (value != null) {
                          setFicha({
                            ...ficha,
                            service: value.data.name,
                          });
                        } else {
                          setFicha({ ...ficha, service: "" });
                        }
                      }}
                      options={servicesData}
                      getOptionLabel={(option) => option.title}
                      style={{ width: "auto" }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Servicios"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      {source ? (
                        <DatePicker
                          id="date"
                          name="date"
                          autoOk
                          variant="static"
                          openTo="date"
                          value={date}
                          onChange={changeDate}
                        />
                      ) : (
                        <DatePicker
                          id="date"
                          name="date"
                          variant="inline"
                          label="Elija una fecha"
                          value={date}
                          onChange={changeDate}
                        />
                      )}
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={1} sm={1}></Grid>
                  <Grid item xs={7} sm={7}>
                    <MaterialTable
                      title="Fichas del dia"
                      columns={title}
                      data={citas}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
}

export default atencion_caja;
