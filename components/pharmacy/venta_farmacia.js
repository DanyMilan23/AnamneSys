import React, { useState, useEffect,useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Router from 'next/router';
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
import MaterialTable from "material-table";
//custom hooks
import usePacientes from "../../hooks/usePacientes";
import useMedicines from "../../hooks/useMedicines";
//context
import { FirebaseContext } from "../../firebase/index";

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
   const { usuario, firebase } = useContext(FirebaseContext);
  //leer de la base de datos los pacientes
  const { medicinas } = useMedicines();
  //cargar el autocomplete service
  let madecineData = [];
  const Data3 = medicinas.map((medicine) => {
    madecineData.push({
      title: medicine.name + "  " + medicine.cost + " Bs",
      id: medicine.id,
      data: medicine,
    });
  });

  const [sale, setSale] = useState({
    ci: "",
    name_facture: "",
  });
  const [medicine, setMedicine] = useState({
    medicine: "",
    cost: "",
    quantity: "",
    total: "",
    description:"",
  });
  const [dataMedicines, setDataMedicines] = useState({ medicines: [] });
  useEffect(() => {
    if (medicine.cost !== "" && medicine.quantity !== "") {
      setMedicine({
        ...medicine,
        total: parseInt(medicine.quantity) * parseInt(medicine.cost),
      });
    }
  }, [medicine.cost, medicine.quantity]);

    const columns= [
      { title: "Nombre", field: "medicine" },
      { title: "Cantidad", field: "quantity" },
      { title: "Precio Unitario", field: "cost", type: "numeric" },
      { title: "Descripcion", field: "description" },
      { title: "Indicaciones", field: "indicacion" },
       { title: "Total", field: "total", type: "numeric" },
    ]


  function addService() {
    setDataMedicines({ medicines: [...dataMedicines.medicines, medicine] });
    setMedicine({
      ...medicine,
      service: "",
      cost: "",
      quantity: "",
      total: "",
      description:"",
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
      const allServices=dataMedicines.medicines
      
      allServices.map((val)=>{
          console.log(val.total)
          alltotal= alltotal+val.total
      })
     
      const salesData = {
        ci:sale.ci,
        name_facture:sale.name_facture,
        services:allServices,
        //description:sale.description,
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
                <Grid item xs={12} sm={8}>
                  <Autocomplete
                    id="medicine"
                    options={madecineData}
                    getOptionLabel={(option) => option.title}
                    style={{ width: "auto" }}
                    onChange={(event, value) => {
                      if (value != null) {
                        setMedicine({
                          ...medicine,
                          medicine: value.data.name,
                          cost: value.data.cost,
                          description:value.data.description,
                        });
                      } else {
                        setMedicine({ ...medicine, medicine: "" });
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Busqueda Medicinas"
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
                      setMedicine({
                        ...medicine,
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
                      setSale({
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
                      setSale({
                        ...sale,
                        ci: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={11} sm={11}>
                  <MaterialTable
                    title="Editable Example"
                    columns={columns}
                    data={dataMedicines.medicines}
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
                <Grid item xs={0} sm={9}/>
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

export default venta_farmacia;
