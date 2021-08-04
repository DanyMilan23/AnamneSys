import React, { useState, useEffect, useContext } from "react";
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
import MaterialTable from "material-table";
//inputs
import Fab from "@material-ui/core/Fab";
//iconos
import SearchIcon from "@material-ui/icons/Search";
//datetime
import DateFnsUtils from "@date-io/date-fns";
//import { StaticDatePicker } from "@material-ui/pickers";
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
//MediaQuerys
import useMediaQuery from "@material-ui/core/useMediaQuery";
//Custom hooks
import useUsuario from "../../hooks/useUsuario";
import usePacientes from "../../hooks/usePacientes";
import useServices from "../../hooks/useServices";
import useCitas from "../../hooks/useCitas";
//context
import { FirebaseContext } from "../../firebase/index";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "flex-start",
    color: theme.palette.text.secondary,
    height: "auto",
  },
  titulos: {
    textAlign: "center",
  },
  textField: {
    width: "auto",
  },
}));

function atencion_paciente({ id }) {
  const classes = useStyles();
  const { usuario, firebase } = useContext(FirebaseContext);
  //leer de la base de datos los pacientes
  const { pacientes } = usePacientes();
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
  //cargar el autocomplete service
  let servicesData = [];
  const Data3 = services.map((service) => {
    servicesData.push({
      title: service.name + "  " + service.cost + " Bs",
      id: service.id,
      data: service,
    });
  });
  //state
  const [citas, guardarCitas] = useState([
    {
      patient: "",
      service: "",
      date: "",
      imageUrl: "",
    },
  ]);
  const matches = useMediaQuery("(min-width:960px)");
  const [date, changeDate] = useState(new Date());
  const [source, setSource] = useState(false);
  const [error, guardarError] = useState(false);
  const [pacienteId, guardarPacienteId] = useState(null);
  const [ficha, setFicha] = useState({
    patient: "",
    doctor: "",
    imagenUrl: "",
    service: "",
  });
  //titles para el table
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
  //function guardar
  const handleSubmit = (e) => {
    e.preventDefault();
    async function crearFicha() {
      // si el usuario no esta autenticado llevar al login
      if (!usuario) {
        return;
      }
      // crear el objeto de nuevo producto
      console.log("date", date);
      console.log("type date", typeof date);
      const fichaData = {
        patient: ficha.patient,
        doctor: usuario.displayName,
        imageUrl: ficha.imagenUrl,
        date: date,
        service: ficha.service,
        create: Date.now(),
      };
      console.log("fichaData", fichaData);
      // insertarlo en la base de datos
      firebase.db
        .collection("health_centers")
        .doc(id)
        .collection("appointment_management")
        .add(fichaData)
        .then(function (docRef) {
          alert("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          alert("Error adding document: ", error);
        });
      firebase.db
        .collection("Usuarios")
        .doc(pacienteId)
        .collection("appointment_management")
        .add(fichaData)
        .then(function (docRef) {
          alert("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          alert("Error adding document: ", error);
        });
      return;
    }
    // validar
    if (
      ficha.patient.trim() === "" ||
      ficha.imagenUrl.trim() === "" ||
      ficha.service.trim() === ""
    ) {
      guardarError(true);
      return;
    }
    crearFicha();
  };
  //Media querys
  useEffect(() => {
    setSource(matches);
  }, [matches]);
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
      .collection("health_centers")
      .doc(id)
      .collection("appointment_management")
      .where("date", ">=", fechaInicio)
      .where("date", "<=", fechaFin)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const tiempo = doc.data().date;
          //TODO AQUI CAMBIE
          console.log("date", tiempo);
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
                      style={{ width: "auto" }}
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
                          guardarPacienteId(value.id);
                        } else {
                          setFicha({ ...ficha, patient: "" });
                          guardarPacienteId(null);
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
                    <Button variant="contained" color="primary" type="submit">
                      Guardar
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Autocomplete
                      id="service"
                      name="service"
                      options={servicesData}
                      getOptionLabel={(option) => option.title}
                      style={{ width: "auto" }}
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
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Servicios"
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
                          label="Hora"
                          value={date}
                          onChange={changeDate}
                        />
                      )}
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={1} sm={1}></Grid>
                  <Grid item xs={7} sm={7}>
                    <MaterialTable title="Citas" columns={title} data={citas} />
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

export default atencion_paciente;
