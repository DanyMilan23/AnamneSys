import React, { useState, useEffect, useContext } from "react";
import Router from 'next/router';
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
import AddIcon from "@material-ui/icons/Add";
import MUIDataTable from "mui-datatables";
//custom hooks
import usePacientes from "../../hooks/usePacientes";
import useServices from "../../hooks/useServices";
import useCitas from "../../hooks/useCitas";
//context
import { FirebaseContext } from "../../firebase/index";

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
function transaccion_caja(props) {
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

  const [sale, guardarSale] = useState({
    patient: "",
    ci: "",
    name_facture: "",
  });
  const [servicio, guardarServicio] = useState({
    service: "",
    cost: "",
    quantity: "",
    total: "",
  });
  const [dataServices, setDataServices] = useState({ services: [] });
  let data = [];
  const columns = [
    {
      name: "service",
      label: "Servicio",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "quantity",
      label: "Cantidad",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "cost",
      label: "Costo Unitario",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "total",
      label: "Total",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];
  useEffect(() => {
    if (servicio.cost !== "" && servicio.quantity !== "") {
      guardarServicio({
        ...servicio,
        total: parseInt(servicio.quantity) * parseInt(servicio.cost),
      });
    }
  }, [servicio.cost, servicio.quantity]);

  const options = {
    filterType: "dropdown",
    responsive: "scroll",
  };
  function addService() {
    setDataServices({ services: [...dataServices.services, servicio] });
    guardarServicio({
      ...servicio,
      service: "",
      cost: "",
      quantity: "",
      total: "",
    });
  }
  function addSale() {
    async function newSale() {
      // si el usuario no esta autenticado llevar al login
      if (!usuario) {
        return Router.push("/");
      }
      // crear el objeto de nuevo producto
     
      let alltotal=0;
      const allServices=dataServices.services
      
      allServices.map((val)=>{
          console.log(val.total)
          alltotal= alltotal+val.total
      })
     
      const salesData = {
        patient:sale.patient,
        ci:sale.ci,
        name_facture:sale.name_facture,
        services:allServices,
        total:alltotal,
      };
     
      // insertarlo en la base de datos
      firebase.db
        .collection("sale")
        .add(salesData)
        .then(function (docRef) {
          alert("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          alert("Error adding document: ", error);
        });
      return Router.push("/main");
    }
    newSale();
  }

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
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    id="pacientes"
                    options={pacientesData}
                    getOptionLabel={(option) => option.title}
                    style={{ width: "auto" }}
                    onChange={(event, value) => {
                      if (value != null) {
                        guardarSale({
                          ...sale,
                          patient:
                            value.data.first_name + " " + value.data.last_name,
                        });
                      } else {
                        setFicha({ ...ficha, patient: "" });
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
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    id="services"
                    options={servicesData}
                    getOptionLabel={(option) => option.title}
                    style={{ width: "auto" }}
                    onChange={(event, value) => {
                      if (value != null) {
                        guardarServicio({
                          ...servicio,
                          service: value.data.name,
                          cost: value.data.cost,
                        });
                      } else {
                        guardarServicio({ ...servicio, patient: "" });
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
                </Grid>
                <Grid item xs={9} sm={2}>
                  <TextField
                    id="cantidad"
                    label="Cantidad"
                    variant="outlined"
                    type="number"
                    min="0"
                    onChange={(e) => {
                      guardarServicio({
                        ...servicio,
                        quantity: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={1} sm={1}>
                  <Fab
                    color="secondary"
                    aria-label="add"
                    onClick={(e) => {
                      e.preventDefault();
                      addService();
                    }}
                  >
                    <AddIcon />
                  </Fab>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="nombre_factura"
                    label="Nombre Factura"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => {
                      guardarSale({
                        ...sale,
                        name_facture: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    id="ci"
                    label="Ci"
                    fullWidth
                    variant="outlined"
                    onChange={(e) => {
                      guardarSale({
                        ...sale,
                        ci: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={11}>
                  <MUIDataTable
                    title={"Factura"}
                    data={dataServices.services}
                    columns={columns}
                    options={options}
                  />
                </Grid>
                <Grid item xs={0} sm={7} />
                <Grid item xs={12} sm={2}>
                  <Button variant="contained" color="secondary" fullWidth>
                    Guardar ficha
                  </Button>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      addSale();
                    }}
                    fullWidth
                  >
                    Facturar
                  </Button>
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
