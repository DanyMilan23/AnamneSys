import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Router from "next/router";
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
import useSintomas from "../../hooks/useSintomas";
import usePacientes from "../../hooks/usePacientes";
import { FirebaseContext } from "../../firebase/index";
import Token from "../../api/api";
import axios from "axios";

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

function nuevo_historial(props) {
  const classes = useStyles();
  const [sin, setSin] = useState([]);
  const [diagnosis, setDiagnosis] = useState(null);
  const { usuario, firebase } = useContext(FirebaseContext);
  const [seleccion, guardarSeleccion] = useState(null);
  const [sintoma, guardarSintoma] = useState([]);
  const [historial, guardarHistorial] = useState({
    current_illness: "",
    laboratory_result: "",
    physical_exam: "",
    presumptive_diagnosis: "",
    reason_consultation: "",
    final_diagnosis: "",
  });
  const { pacientes } = usePacientes();
  let pacientesData = [];
  const data1 = pacientes.map((paciente) => {
    pacientesData.push({
      title:
        paciente.ci + "  " + paciente.first_name + "  " + paciente.last_name,
      id: paciente.id,
      data: paciente,
    });
  });
  //solo ids

  useEffect(() => {
    let soloids = [];
    for (const prop in sintoma) {
      // console.log(sintoma[prop])
      soloids.push(sintoma[prop].ID);
    }
    setSin(soloids);
  }, [sintoma]);
  //fin
  const diagnostico = async () => {
    console.log("entro");
    const consulta = Token.then((data) => {
      const obtenerSintomas = async () => {
        //const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImNvZGVncm91cDIzQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiNjc5NiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAyMC0wNC0xMSIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNTg2OTg0MjQ3LCJuYmYiOjE1ODY5NzcwNDd9.OJ_EIicMNvpnOR39lBZBCrRn8qJ4UqcT23dYvvqXZi0';
        //const token ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImNvZGVncm91cDIzQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiNDEzNCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjEwOSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiIxMDAiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJCYXNpYyIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGFuZ3VhZ2UiOiJlbi1nYiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IjIwOTktMTItMzEiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXBzdGFydCI6IjIwMjAtMDQtMTEiLCJpc3MiOiJodHRwczovL2F1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE1ODcyNzc0NjEsIm5iZiI6MTU4NzI3MDI2MX0.76dqUykG4_bpPL7KroMwGOTwSt6N0Rvu2mPxXdEbtFc'
        const password = data.Token;
        console.log(password);
        const url = `https://healthservice.priaid.ch/diagnosis?token=${password}&format=json&language=en-gb&symptoms=[${sin}]&gender=male&year_of_birth=1999`;
        const resultado = await axios.get(url);
        console.log(resultado);
        setDiagnosis(resultado);
      };
      obtenerSintomas();
    });
  };
  const handleSubmit = (e) => {
    console.log("entro submit");
    e.preventDefault();
    async function nuevoHistorial() {
      // si el usuario no esta autenticado llevar al login
      if (!usuario) {
        return Router.push("/");
      }
      // crear el objeto de nuevo producto
      const historialData = {
        current_illness: historial.current_illness,
        date: Date.now(),
        doctor: usuario.displayName,
        laboratory_result: historial.laboratory_result,
        physical_exam: historial.physical_exam,
        presumptive_diagnosis: historial.presumptive_diagnosis,
        reason_consultation: historial.reason_consultation,
        symptoms: sintoma,
        imageUrl: usuario.photoURL,
        final_diagnosis: historial.final_diagnosis,
      };
      // insertarlo en la base de datos
      firebase.db
        .collection("Usuarios")
        .doc(seleccion)
        .collection("patient_history")
        .add(historialData)
        .then(function (docRef) {
          alert("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          alert("Error adding document: ", error);
        });
      return Router.push("/main");
    }
    nuevoHistorial();
  };
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
                      <Autocomplete
                        id="combo-box-demo"
                        options={pacientesData}
                        getOptionLabel={(option) => option.title}
                        style={{ width: "auto" }}
                        onChange={(event, value) => {
                          if (value != null) {
                            guardarSeleccion(value.id);
                          } else {
                            guardarSeleccion(null);
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
                    <Grid item xs={12} sm={12}>
                      <TextField
                        id="enfermedad_actual"
                        label="Enfermedad Actual"
                        multiline
                        rows="1"
                        variant="outlined"
                        margin="dense"
                        onChange={(e) => {
                          guardarHistorial({
                            ...historial,
                            current_illness: e.target.value,
                          });
                        }}
                        value={historial.current_illness}
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
                        onChange={(e) => {
                          guardarHistorial({
                            ...historial,
                            laboratory_result: e.target.value,
                          });
                        }}
                        value={historial.laboratory_result}
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
                        onChange={(e) => {
                          guardarHistorial({
                            ...historial,
                            physical_exam: e.target.value,
                          });
                        }}
                        value={historial.physical_exam}
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
                        onChange={(e) => {
                          guardarHistorial({
                            ...historial,
                            presumptive_diagnosis: e.target.value,
                          });
                        }}
                        value={historial.presumptive_diagnosis}
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
                        onChange={(e) => {
                          guardarHistorial({
                            ...historial,
                            reason_consultation: e.target.value,
                          });
                        }}
                        value={historial.reason_consultation}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={sintomas}
                        getOptionLabel={(option) => option.Nombre}
                        filterSelectedOptions
                        onChange={(event, value) => {
                          guardarSintoma(value);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="filterSelectedOptions"
                            placeholder="Favorites"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <h2 className={classes.titulos}>Diagnostico</h2>
                      {diagnosis ? (
                        <div>
                         
                          <p>
                            {diagnosis.data.map((sub) => (
                              <div>
                                
                                 <p>Problema</p>
                                <Chip    
                                  label={sub.Issue.Name}
                                  clickable
                                  color="primary"
                                />
                                <p>Especialisacion</p>
                                {sub.Specialisation.map((esp)=>(
                                  <div>
                                  {console.log(esp)}
                                  <Chip    
                                    label={esp.Name}
                                    clickable
                                    color="secondary"
                                  />

                                  </div>
                                ))}
                                
                              </div>
                            ))}
                          </p>
                        </div>
                      ) : (
                        <h1>No hay observaciones</h1>
                      )}
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        id="diagnostico_final"
                        label="Diagnostico final"
                        multiline
                        rows="3"
                        variant="outlined"
                        margin="dense"
                        onChange={(e) => {
                          guardarHistorial({
                            ...historial,
                            final_diagnosis: e.target.value,
                          });
                        }}
                        value={historial.final_diagnosis}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Button variant="contained" color="primary" type="submit">
                        Guardar Historial
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={diagnostico}
                      >
                        Diagnosticar
                      </Button>
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
const sintomas = [
  {
    ID: 188,
    Nombre: "Protección abdominal",
  },
  {
    ID: 10,
    Nombre: "Dolor abdominal",
  },
  {
    ID: 223,
    Nombre: "Dolor abdominal asociado con la menstruación",
  },
  {
    ID: 984,
    Nombre: "Ausencia de pulso",
  },
  {
    ID: 974,
    Nombre: "Agresividad",
  },
  {
    ID: 981,
    Nombre: "Agitación",
  },
  {
    ID: 996,
    Nombre: "Deformidad del tobillo",
  },
  {
    ID: 147,
    Nombre: "inflamación del tobillo",
  },
  {
    ID: 238,
    Nombre: "Ansiedad",
  },
  {
    ID: 1009,
    Nombre: "Dolor en el brazo",
  },
  {
    ID: 971,
    Nombre: "Hinchazón del brazo",
  },
  {
    ID: 998,
    Nombre: "Deformidad de la espalda",
  },
  {
    ID: 104,
    Nombre: "Dolor de espalda",
  },
  {
    ID: 180,
    Nombre: "heces negras",
  },
  {
    ID: 57,
    Nombre: "Ennegrecimiento de la visión",
  },
  {
    ID: 24,
    Nombre: "Espinilla",
  },
  {
    ID: 284,
    Nombre: "Sangrado de la vagina",
  },
  {
    ID: 176,
    Nombre: "Sangrado en la conjuntiva del ojo",
  },
  {
    ID: 48,
    Nombre: "sensación de hinchazón en el estómago",
  },
  {
    ID: 190,
    Nombre: "Sangre en las heces",
  },
  {
    ID: 233,
    Nombre: "Tos sanguinolenta",
  },
  {
    ID: 991,
    Nombre: "Piel de color azul",
  },
  {
    ID: 240,
    Nombre: "Mancha azul en la piel",
  },
  {
    ID: 77,
    Nombre: "Visión borrosa",
  },
  {
    ID: 239,
    Nombre: "Área en negrita entre el cabello en la cabeza",
  },
  {
    ID: 156,
    Nombre: "Fractura de hueso",
  },
  {
    ID: 250,
    Nombre: "Dolores relacionados con la respiración",
  },
  {
    ID: 979,
    Nombre: "fragilidad de las uñas",
  },
  {
    ID: 192,
    Nombre: "Pared abdominal abultada",
  },
  {
    ID: 75,
    Nombre: "Ojos ardientes",
  },
  {
    ID: 46,
    Nombre: "Ardor en la garganta",
  },
  {
    ID: 288,
    Nombre: "Nariz ardiente",
  },
  {
    ID: 107,
    Nombre: "Sensación de ardor al orinar",
  },
  {
    ID: 91,
    Nombre: "Cambios en las uñas",
  },
  {
    ID: 170,
    Nombre: "hinchazón de las mejillas",
  },
  {
    ID: 17,
    Nombre: "Dolor en el pecho",
  },
  {
    ID: 31,
    Nombre: "opresión en el pecho",
  },
  {
    ID: 175,
    Nombre: "Escalofríos",
  },
  {
    ID: 218,
    Nombre: "engrosamiento de la estructura de la piel",
  },
  {
    ID: 89,
    Nombre: "Pies fríos",
  },
  {
    ID: 978,
    Nombre: "Manos frías",
  },
  {
    ID: 139,
    Nombre: "sudores fríos",
  },
  {
    ID: 15,
    Nombre: "Tos",
  },
  {
    ID: 228,
    Nombre: "Tos con esputo",
  },
  {
    ID: 94,
    Nombre: "Calambres",
  },
  {
    ID: 49,
    Nombre: "Antojos",
  },
  {
    ID: 134,
    Nombre: "Cortezas",
  },
  {
    ID: 260,
    Nombre: "Curvatura de la columna vertebral",
  },
  {
    ID: 108,
    Nombre: "orina oscura",
  },
  {
    ID: 163,
    Nombre: "Disminución del flujo de orina",
  },
  {
    ID: 165,
    Nombre: "Comienzo retrasado para orinar",
  },
  {
    ID: 50,
    Nombre: "Diarrea",
  },
  {
    ID: 79,
    Nombre: "defecación difícil",
  },
  {
    ID: 126,
    Nombre: "Dificultad para encontrar palabras",
  },
  {
    ID: 98,
    Nombre: "Dificultad para hablar",
  },
  {
    ID: 93,
    Nombre: "Dificultad para tragar",
  },
  {
    ID: 53,
    Nombre: "Dificultad para concentrarse",
  },
  {
    ID: 1007,
    Nombre: "Dificultad para aprender",
  },
  {
    ID: 1005,
    Nombre: "Dificultad con la marcha",
  },
  {
    ID: 216,
    Nombre: "Decoloración de las uñas",
  },
  {
    ID: 128,
    Nombre: "Desorientación con respecto a la hora o el lugar",
  },
  {
    ID: 989,
    Nombre: "abdomen distendido",
  },
  {
    ID: 207,
    Nombre: "mareos",
  },
  {
    ID: 71,
    Nombre: "Visión doble",
  },
  {
    ID: 270,
    Nombre: "Visión doble, inicio agudo",
  },
  {
    ID: 162,
    Nombre: "Goteo después de orinar",
  },
  {
    ID: 244,
    Nombre: "párpado caído",
  },
  {
    ID: 43,
    Nombre: "Somnolencia",
  },
  {
    ID: 273,
    Nombre: "Ojos secos",
  },
  {
    ID: 272,
    Nombre: "Boca seca",
  },
  {
    ID: 151,
    Nombre: "Piel seca",
  },
  {
    ID: 87,
    Nombre: "Dolor de oído",
  },
  {
    ID: 92,
    Nombre: "Saciedad temprana",
  },
  {
    ID: 1011,
    Nombre: "Dolor en el codo",
  },
  {
    ID: 1006,
    Nombre: "pantorrilla agrandada",
  },
  {
    ID: 242,
    Nombre: "parpadeo de los ojos",
  },
  {
    ID: 287,
    Nombre: "Dolor ocular",
  },
  {
    ID: 33,
    Nombre: "Enrojecimiento de los ojos",
  },
  {
    ID: 208,
    Nombre: "Hinchazón de los párpados",
  },
  {
    ID: 209,
    Nombre: "Párpados pegados",
  },
  {
    ID: 219,
    Nombre: "Dolor de cara",
  },
  {
    ID: 246,
    Nombre: "Parálisis facial",
  },
  {
    ID: 970,
    Nombre: "hinchazón facial",
  },
  {
    ID: 153,
    Nombre: "respiración rápida y profunda",
  },
  {
    ID: 83,
    Nombre: "defecación grasa",
  },
  {
    ID: 982,
    Nombre: "Sensación de desmayo",
  },
  {
    ID: 1014,
    Nombre: "Sentirse enfermo",
  },
  {
    ID: 76,
    Nombre: "Sensación de cuerpo extraño en el ojo",
  },
  {
    ID: 86,
    Nombre: "Sensación de presión en el oído",
  },
  {
    ID: 164,
    Nombre: "Sensación de orina residual",
  },
  {
    ID: 145,
    Nombre: "Sensación de tensión en las piernas",
  },
  {
    ID: 11,
    Nombre: "Fiebre",
  },
  {
    ID: 995,
    Nombre: "Deformidad del dedo",
  },
  {
    ID: 1013,
    Nombre: "Dolor en el dedo",
  },
  {
    ID: 1012,
    Nombre: "hinchazón de los dedos",
  },
  {
    ID: 214,
    Nombre: "Piel descamada",
  },
  {
    ID: 245,
    Nombre: "Piel descamada en la cabeza",
  },
  {
    ID: 154,
    Nombre: "Flatulencia",
  },
  {
    ID: 255,
    Nombre: "Dolor en el pie",
  },
  {
    ID: 1002,
    Nombre: "Hinchazón del pie",
  },
  {
    ID: 125,
    Nombre: "Olvido",
  },
  {
    ID: 62,
    Nombre: "Formación de ampollas en un área de la piel",
  },
  {
    ID: 84,
    Nombre: "defecación con mal olor",
  },
  {
    ID: 59,
    Nombre: "micción frecuente",
  },
  {
    ID: 110,
    Nombre: "Verrugas genitales",
  },
  {
    ID: 152,
    Nombre: "Pérdida de cabello",
  },
  {
    ID: 976,
    Nombre: "Alucinación",
  },
  {
    ID: 72,
    Nombre: "Halo",
  },
  {
    ID: 186,
    Nombre: "Dolor de manos",
  },
  {
    ID: 148,
    Nombre: "hinchazón de la mano",
  },
  {
    ID: 80,
    Nombre: "Defecación dura",
  },
  {
    ID: 184,
    Nombre: "Endurecimiento de la piel",
  },
  {
    ID: 9,
    Nombre: "Dolor de cabeza",
  },
  {
    ID: 206,
    Nombre: "Pérdida auditiva",
  },
  {
    ID: 985,
    Nombre: "soplo cardíaco",
  },
  {
    ID: 45,
    Nombre: "Acidez estomacal",
  },
  {
    ID: 122,
    Nombre: "Hipo",
  },
  {
    ID: 993,
    Nombre: "Deformidad de la cadera",
  },
  {
    ID: 196,
    Nombre: "dolor de cadera",
  },
  {
    ID: 121,
    Nombre: "Ronquera",
  },
  {
    ID: 149,
    Nombre: "sofocos",
  },
  {
    ID: 197,
    Nombre: "Inmovilización",
  },
  {
    ID: 120,
    Nombre: "Saldo deteriorado",
  },
  {
    ID: 90,
    Nombre: "Deficiencia auditiva",
  },
  {
    ID: 70,
    Nombre: "Adaptación luz-oscuridad deteriorada",
  },
  {
    ID: 113,
    Nombre: "Deterioro de la potencia masculina",
  },
  {
    ID: 81,
    Nombre: "defecación incompleta",
  },
  {
    ID: 131,
    Nombre: "Aumento del apetito",
  },
  {
    ID: 262,
    Nombre: "Unidad incrementada",
  },
  {
    ID: 204,
    Nombre: "Aumento de la salivación",
  },
  {
    ID: 40,
    Nombre: "Mayor sed",
  },
  {
    ID: 220,
    Nombre: "Mayor sensibilidad al tacto",
  },
  {
    ID: 39,
    Nombre: "Mayor cantidad de orina",
  },
  {
    ID: 257,
    Nombre: "Movimientos involuntarios",
  },
  {
    ID: 986,
    Nombre: "latidos irregulares",
  },
  {
    ID: 65,
    Nombre: "lunar irregular",
  },
  {
    ID: 73,
    Nombre: "Picazón en los ojos",
  },
  {
    ID: 88,
    Nombre: "Picazón en el oído",
  },
  {
    ID: 973,
    Nombre: "Picazón en la boca o garganta",
  },
  {
    ID: 96,
    Nombre: "Picazón en la nariz",
  },
  {
    ID: 21,
    Nombre: "Picazón en la piel",
  },
  {
    ID: 999,
    Nombre: "Picazón en el ano",
  },
  {
    ID: 247,
    Nombre: "Picazón en la cabeza",
  },
  {
    ID: 268,
    Nombre: "Picazón o ardor en el área genital",
  },
  {
    ID: 194,
    Nombre: "Derrame articular",
  },
  {
    ID: 198,
    Nombre: "Inestabilidad conjunta",
  },
  {
    ID: 27,
    Nombre: "Dolor articular",
  },
  {
    ID: 230,
    Nombre: "enrojecimiento articular",
  },
  {
    ID: 193,
    Nombre: "hinchazón articular",
  },
  {
    ID: 47,
    Nombre: "Alegría",
  },
  {
    ID: 994,
    Nombre: "Deformidad de rodilla",
  },
  {
    ID: 256,
    Nombre: "Dolor de rodilla",
  },
  {
    ID: 146,
    Nombre: "Calambres en las piernas",
  },
  {
    ID: 1010,
    Nombre: "Dolor en las piernas",
  },
  {
    ID: 231,
    Nombre: "Hinchazón de piernas",
  },
  {
    ID: 143,
    Nombre: "Úlcera en la pierna",
  },
  {
    ID: 82,
    Nombre: "Menos de 3 defecaciones por semana",
  },
  {
    ID: 992,
    Nombre: "movilidad limitada del tobillo",
  },
  {
    ID: 167,
    Nombre: "movilidad limitada de la espalda",
  },
  {
    ID: 178,
    Nombre: "movilidad limitada de los dedos",
  },
  {
    ID: 1000,
    Nombre: "movilidad limitada de la cadera",
  },
  {
    ID: 195,
    Nombre: "movilidad limitada de la pierna",
  },
  {
    ID: 35,
    Nombre: "Hinchazón de labios",
  },
  {
    ID: 205,
    Nombre: "Lockjaw",
  },
  {
    ID: 210,
    Nombre: "Pérdida de pestañas",
  },
  {
    ID: 174,
    Nombre: "Dolor abdominal bajo",
  },
  {
    ID: 263,
    Nombre: "dolor lumbar",
  },
  {
    ID: 261,
    Nombre: "bulto en el seno",
  },
  {
    ID: 266,
    Nombre: "Malposición de los testículos",
  },
  {
    ID: 232,
    Nombre: "Venas marcadas",
  },
  {
    ID: 235,
    Nombre: "Brecha de memoria",
  },
  {
    ID: 112,
    Nombre: "trastorno de la menstruación",
  },
  {
    ID: 123,
    Nombre: "Período perdido",
  },
  {
    ID: 215,
    Nombre: "Piel húmeda y suavizada",
  },
  {
    ID: 85,
    Nombre: "Cambios de humor",
  },
  {
    ID: 983,
    Nombre: "rigidez matutina",
  },
  {
    ID: 135,
    Nombre: "Dolor de boca",
  },
  {
    ID: 97,
    Nombre: "Úlceras bucales",
  },
  {
    ID: 177,
    Nombre: "dolor muscular",
  },
  {
    ID: 119,
    Nombre: "rigidez muscular",
  },
  {
    ID: 987,
    Nombre: "Debilidad Musular",
  },
  {
    ID: 252,
    Nombre: "atrofia muscular en la pierna",
  },
  {
    ID: 202,
    Nombre: "atrofia muscular del brazo",
  },
  {
    ID: 168,
    Nombre: "Debilidad muscular en el brazo",
  },
  {
    ID: 253,
    Nombre: "Debilidad muscular en la pierna",
  },
  {
    ID: 44,
    Nombre: "Náuseas",
  },
  {
    ID: 136,
    Nombre: "dolor de cuello",
  },
  {
    ID: 234,
    Nombre: "rigidez del cuello",
  },
  {
    ID: 114,
    Nombre: "Nerviosismo",
  },
  {
    ID: 133,
    Nombre: "Tos nocturna",
  },
  {
    ID: 1004,
    Nombre: "Sudores nocturnos",
  },
  {
    ID: 63,
    Nombre: "Herida cutánea no cicatrizante",
  },
  {
    ID: 38,
    Nombre: "Sangrado nasal",
  },
  {
    ID: 221,
    Nombre: "Entumecimiento en el brazo",
  },
  {
    ID: 254,
    Nombre: "Entumecimiento en la pierna",
  },
  {
    ID: 200,
    Nombre: "Entumecimiento de las manos",
  },
  {
    ID: 137,
    Nombre: "hipersensibilidad a la luz",
  },
  {
    ID: 157,
    Nombre: "Sobrepeso",
  },
  {
    ID: 155,
    Nombre: "Dolor en los huesos",
  },
  {
    ID: 142,
    Nombre: "Dolor en las pantorrillas",
  },
  {
    ID: 12,
    Nombre: "Dolor en las extremidades",
  },
  {
    ID: 990,
    Nombre: "Dolor del ano",
  },
  {
    ID: 203,
    Nombre: "Dolor al tragar",
  },
  {
    ID: 251,
    Nombre: "Dolor que irradia al brazo",
  },
  {
    ID: 103,
    Nombre: "Dolor que irradia a la pierna",
  },
  {
    ID: 286,
    Nombre: "Dolor al masticar",
  },
  {
    ID: 189,
    Nombre: "defecación dolorosa",
  },
  {
    ID: 109,
    Nombre: "micción dolorosa",
  },
  {
    ID: 150,
    Nombre: "Palidez",
  },
  {
    ID: 37,
    Nombre: "Palpitaciones",
  },
  {
    ID: 140,
    Nombre: "Parálisis",
  },
  {
    ID: 118,
    Nombre: "Inactividad física",
  },
  {
    ID: 129,
    Nombre: "Problemas con el sentido del tacto en la cara",
  },
  {
    ID: 130,
    Nombre: "Problemas con el sentido del tacto en los pies",
  },
  {
    ID: 258,
    Nombre: "Protrusión de los ojos",
  },
  {
    ID: 172,
    Nombre: "Secreción purulenta de la uretra",
  },
  {
    ID: 173,
    Nombre: "Secreción purulenta de la vagina",
  },
  {
    ID: 191,
    Nombre: "ternura de rebote",
  },
  {
    ID: 54,
    Nombre: "Apetito reducido",
  },
  {
    ID: 78,
    Nombre: "Zumbido en el oído",
  },
  {
    ID: 14,
    Nombre: "Secreción nasal",
  },
  {
    ID: 975,
    Nombre: "Tristeza",
  },
  {
    ID: 269,
    Nombre: "Enrojecimiento del cuero cabelludo",
  },
  {
    ID: 1001,
    Nombre: "Cicatriz",
  },
  {
    ID: 60,
    Nombre: "Sensibilidad al frío",
  },
  {
    ID: 69,
    Nombre: "Sensibilidad al deslumbramiento",
  },
  {
    ID: 102,
    Nombre: "Sensibilidad al ruido",
  },
  {
    ID: 264,
    Nombre: "Lengua roja brillante",
  },
  {
    ID: 29,
    Nombre: "Falta de aliento",
  },
  {
    ID: 183,
    Nombre: "Dolor lateral",
  },
  {
    ID: 26,
    Nombre: "Lesión cutánea",
  },
  {
    ID: 25,
    Nombre: "Nódulos de piel",
  },
  {
    ID: 124,
    Nombre: "Erupción cutánea",
  },
  {
    ID: 61,
    Nombre: "Enrojecimiento de la piel",
  },
  {
    ID: 217,
    Nombre: "engrosamiento de la piel",
  },
  {
    ID: 34,
    Nombre: "roncha de la piel",
  },
  {
    ID: 241,
    Nombre: "Somnolencia con el sueño espontáneo",
  },
  {
    ID: 52,
    Nombre: "Insomnio",
  },
  {
    ID: 95,
    Nombre: "Estornudos",
  },
  {
    ID: 13,
    Nombre: "Dolor de garganta",
  },
  {
    ID: 64,
    Nombre: "Esputo",
  },
  {
    ID: 179,
    Nombre: "Quema de estómago",
  },
  {
    ID: 185,
    Nombre: "dolor en las piernas relacionado con el estrés",
  },
  {
    ID: 28,
    Nombre: "nariz tapada",
  },
  {
    ID: 138,
    Nombre: "Sudoración",
  },
  {
    ID: 236,
    Nombre: "Hinchazón en el área genital",
  },
  {
    ID: 267,
    Nombre: "Hinchazón de los testículos",
  },
  {
    ID: 248,
    Nombre: "Glándulas inflamadas en la axila",
  },
  {
    ID: 249,
    Nombre: "Glándulas inflamadas en la ingle",
  },
  {
    ID: 169,
    Nombre: "Glándulas inflamadas en el cuello",
  },
  {
    ID: 211,
    Nombre: "Lágrimas",
  },
  {
    ID: 222,
    Nombre: "Dolor testicular",
  },
  {
    ID: 243,
    Nombre: "Tic",
  },
  {
    ID: 201,
    Nombre: "hormigueo",
  },
  {
    ID: 16,
    Nombre: "Cansancio",
  },
  {
    ID: 997,
    Nombre: "Deformidad del dedo del pie",
  },
  {
    ID: 1003,
    Nombre: "hinchazón de los dedos",
  },
  {
    ID: 980,
    Nombre: "Quema de lengua",
  },
  {
    ID: 977,
    Nombre: "hinchazón de la lengua",
  },
  {
    ID: 1008,
    Nombre: "Dolor de muelas",
  },
  {
    ID: 115,
    Nombre: "Temblor en reposo",
  },
  {
    ID: 132,
    Nombre: "Temblor en movimiento",
  },
  {
    ID: 988,
    Nombre: "Problemas para entender el discurso",
  },
  {
    ID: 144,
    Nombre: "Inconsciencia, corta",
  },
  {
    ID: 265,
    Nombre: "defecación no controlada",
  },
  {
    ID: 116,
    Nombre: "Bajo peso",
  },
  {
    ID: 160,
    Nombre: "Urge orinar",
  },
  {
    ID: 161,
    Nombre: "Orinar durante la noche",
  },
  {
    ID: 68,
    Nombre: "Discapacidad visual",
  },
  {
    ID: 213,
    Nombre: "Discapacidad visual para objetos lejanos",
  },
  {
    ID: 166,
    Nombre: "Discapacidad visual para objetos cercanos",
  },
  {
    ID: 66,
    Nombre: "Pérdida de campo visual",
  },
  {
    ID: 101,
    Nombre: "Vómito",
  },
  {
    ID: 181,
    Nombre: "Vómitos de sangre",
  },
  {
    ID: 972,
    Nombre:
      "Debilidad o entumecimiento en el lado derecho o izquierdo del cuerpo",
  },
  {
    ID: 23,
    Nombre: "Aumento de peso",
  },
  {
    ID: 22,
    Nombre: "Pérdida de peso",
  },
  {
    ID: 30,
    Nombre: "Sibilancias",
  },
  {
    ID: 187,
    Nombre: "Herida",
  },
  {
    ID: 105,
    Nombre: "Piel de color amarillo",
  },
  {
    ID: 106,
    Nombre: "Decoloración amarillenta de la parte blanca del ojo",
  },
];
export default nuevo_historial;
