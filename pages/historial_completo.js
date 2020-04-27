import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
//components
import MaterialTable from "material-table";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Historial from "../components/historial";
import Layout from "../components/layout/layout";
import usePacientes from "../hooks/usePacientes";
import { FirebaseContext } from "../firebase";

const historial_completo = ({pacienteId}) => {
  const [seleccion,guardarSeleccion]=useState(null);
  const [historial,guardarHistorial]=useState([]);
  const { usuario, firebase } = useContext(FirebaseContext);
  const { pacientes } = usePacientes();
  let pacientesData = [];
  const data1 = pacientes.map(paciente => {
    pacientesData.push({
      title:paciente.ci +"  " +paciente.first_name +"  " +paciente.last_name,
      id: paciente.id,
      data:paciente
    });
  });
  const title = [
    {
      title: "Doctor",
      field: "imageUrl",
      render: (rowData) => (
        <div>
          <img
            src={rowData.imageUrl}
            alt=""
            style={{ width: 40, borderRadius: "50%" }}
          />
          <b style={{ verticalAlign: "top", paddingLeft: "20px" }}>
            {rowData.doctor}
          </b>
        </div>
      ),
    },
    { title: "Enfermedad Actual", field: "current_illness" },
    { title: "Fecha", field: "date", type: "datetime" },
  ];
  const data=[]
  useEffect(() => { 
    if(seleccion!=null){
      consultarHistorial(seleccion)
    }
  }, [seleccion]);
  let historialData=[];
  function consultarHistorial(id){
    console.log(id)
    firebase.db.collection('Usuarios').doc(id).collection("patient_history").get()
    .then((querySnapshot)=> {      
        querySnapshot.forEach((doc)=> {
            const tiempo =doc.data().date
            historialData.push({
                id:doc.id,
                current_illness:doc.data().current_illness,
                date:new Date(tiempo * 1000),
                doctor:doc.data().doctor,
                laboratory_result:doc.data().laboratory_result,
                physical_exam:doc.data().physical_exam,
                presumptive_diagnosis:doc.data().presumptive_diagnosis,
                reason_consultation:doc.data().reason_consultation,
                symptomps:doc.data().symptomps
            })
            guardarHistorial(historialData);
        })
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

  }
  
  return (
    <>
      <CssBaseline />
      <Layout>
      <Container fixed>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12} sm={12}>
            <h1>Historial Completo</h1>
          </Grid>
          {pacienteId === undefined ?(<>
          <Grid item xs={12} sm={12}>
            <Autocomplete
              id="combo-box-demo"
              options={pacientesData}
              getOptionLabel={option => option.title}
              style={{ width: "auto" }}
               onChange={(event, value) =>{
               if (value != null) {
              guardarSeleccion(value.id)
              }
              else{
                guardarSeleccion(null)
              }
              } } 
              renderInput={params => (
                <TextField
                  {...params}
                  label="Busqueda de Pacientes"
                  variant="outlined"
                />
              )}
            />
          </Grid></>):null}
          <Grid item xs={12} sm={12}>
            <MaterialTable
              title=""
              columns={title} 
              data={historial}
              detailPanel={[
                {
                  tooltip: "Show Name",
                  render: (rowData) => {
                    return (
                      <div
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <Historial historial={rowData} />
                      </div>
                    );
                  },
                },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
      </Layout>
    </>
  );
};

export default historial_completo;
