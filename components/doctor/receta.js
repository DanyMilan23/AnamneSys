import React,{useContext} from "react";
import { withStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import firebase, { FirebaseContext } from "../../firebase/index";

class receta extends React.Component {      
  constructor(props) {
    super(props);
    //states
    this.state = {
      columns: [
        {
          title: "Medicina",
          field: "id_medicine",
          lookup: {
            "6aSbqYWAqRityRih4dHb": "Aspirina ",
            EArQHuicfyxvhqB9dQgA: "Omeprazol",
            NWutHXk70iI4F5NcdyYR: "Amlodipina",
            VEHluFA8HEn2sSTotOTz: "Paracetamol",
            kGEZTYleuILxmOWULc5l: "Simvastatina",
          },
        },
        { title: "Descripcion", field: "description" },
        { title: "Cantidad", field: "quantity" },
      ],
      data: [],
      data2: [],
      prescription: [],
      medicine: [],
      med: "",
      cant: "",
      desc: "",
      paciente: "",
      pacienteName:"",
      doctor: "9494774",
    };
    //metodos
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    firebase.db
      .collection("medicine")
      .get()
      .then((querySnapshot) => {
        var salida = [];
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          var key = doc.id;
          salida.push({
            id: doc.id,
            name: doc.data().name,
          });
        });
        console.log(salida);
        this.setState({
          /*data:querySnapshot.docs.map(doc=>{
                return doc.data()
              })*/
          medicine: salida,
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    firebase.db
      .collection("Usuarios")
      .orderBy("patient", "asc")
      .get()
      .then((querySnapshot) => {
        var salida = [];
        querySnapshot.forEach(function (doc) {
          salida.push({
            title:
              doc.data().ci +
              "  " +
              doc.data().first_name +
              "  " +
              doc.data().last_name,
            id: doc.id,
          });
        });
        console.log(salida);
        this.setState({
          data2: salida,
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }
  add = () => {
    //1ero registro de correo y email en autenticacion
    firebase.db
      .collection("Usuarios")
      .doc(this.state.paciente)
      .collection("prescription")
      .add({
        fecha: Date.now(),
        doctor:this.props.doctor,
        paciente: this.state.pacienteName,
        medicine: this.state.data,
      })
      .then(function () {
        alert("Document successfully written!");
      })
      .catch(function (error) {
        alert("Error writing document: ", error);
      });
    console.log(this.state.data);
  };

  render() {
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
              <h1>Prescripcion medica</h1>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Autocomplete
                options={this.state.data2}
                getOptionLabel={(option) => option.title}
                onChange={(event, value) => {this.setState({ paciente: value.id, pacienteName: value.title });}}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Busqueda Paciente"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <MaterialTable
                title="Receta"
                columns={this.state.columns}
                data={this.state.data}
                editable={{
                  onRowAdd: (newData) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        resolve();
                        this.setState((prevState) => {
                          const data = [...prevState.data];
                          data.push(newData);
                          //console.log(newData);
                          return { ...prevState, data };
                        });
                      }, 600);
                    }),
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        resolve();
                        if (oldData) {
                          this.setState((prevState) => {
                            const data = [...prevState.data];
                            data[data.indexOf(oldData)] = newData;
                            return { ...prevState, data };
                          });
                        }
                      }, 600);
                    }),
                  onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        resolve();
                        this.setState((prevState) => {
                          const data = [...prevState.data];
                          data.splice(data.indexOf(oldData), 1);
                          return { ...prevState, data };
                        });
                      }, 600);
                    }),
                }}
              />
            </Grid>
            <Grid>
              <Button
                variant="contained"
                color="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  this.add();
                }}
                fullWidth
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}
export default receta;
