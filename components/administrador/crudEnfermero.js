import React, { useContext } from "react";
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

class crudPacientes extends React.Component {
  constructor(props){      
      super(props); 
      //states
      this.state={
        columns: [
            { title: 'ID', field: 'id' },
            { title: 'Name', field: 'first_name' },
            { title: 'Last Name', field: 'last_name' },
            { title: 'Genero', field: 'gender' },
            { title: 'Ci', field: 'ci'},
            { title: 'Fecha de nacimiento', field: 'fecha' , type: 'date' },
            { title: 'Email', field: 'email' },
            { title: 'Password', field: 'password' }
          ],
          data: [
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            {
              name: 'Zerya Betül',
              surname: 'Baran',
              birthYear: 2017,
              birthCity: 34,
            },
          ],    
      };
      //metodos
      this.componentDidMount = this.componentDidMount.bind(this);
      
     }
  componentDidMount() {
    firebase.db
      .collection("Usuarios")
      .orderBy("nurse", "asc")
      .get()
      .then((querySnapshot) => {
        var salida = [];
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          salida.push({
            id: doc.id,
            first_name: doc.data().first_name,
            last_name: doc.data().last_name,
            gender: doc.data().gender,
            ci: doc.data().ci,
            fecha: doc.data().birthdate.toDate(),
            email: doc.data().nurse.email,
            password: doc.data().nurse.password,
          });
        });
        console.log(salida);
        this.setState({
          /*data:querySnapshot.docs.map(doc=>{
                return doc.data()
              })*/
          data: salida,
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }
  add = (data) => {
    //1ero registro de correo y email en autenticacion
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .catch(function (error) {});
    console.log("se termino de cargar el data a hacer push");
    firebase.db
      .collection("Usuarios")
      .add({
        ci: data.ci,
        nurse: {
          email: data.email,
          password: data.password,
        },
        first_name: data.first_name,
        gender: data.gender,
        last_name: data.last_name,
        birthdate: fire.firestore.Timestamp.fromDate(new Date(data.fecha)),
      })
      .then(function () {
        alert("Document successfully written!");
      })
      .catch(function (error) {
        alert("Error writing document: ", error);
      });
  };
  update = (olddata, newdata) => {
    //verificar cambios de email y password
    var user = firebase.auth.currentUser;
    if (olddata.email !== newdata.email) {
      user
        .updateEmail(newdata.email)
        .then(function () {
          console.log("Email actualizado correctamente");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    if (olddata.password !== newdata.password) {
      user
        .updatePassword(newdata.password)
        .then(function () {
          console.log("Password actualizado correctamente");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    firebase.db
      .collection("Usuarios")
      .doc(newdata.id)
      .update({
        ci: newdata.ci,
        nurse: {
          email: newdata.email,
          password: newdata.password,
        },
        first_name: newdata.first_name,
        gender: newdata.gender,
        last_name: newdata.last_name,
        birthdate: fire.firestore.Timestamp.fromDate(new Date(newdata.fecha)),
      })
      .then(function () {
        console.log("Document successfully updated!");
      });
  };
  delete = (data) => {
    firebase.db
      .collection("Usuarios")
      .doc(data.id)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
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
              <h1>Administracion Enfermeros</h1>
            </Grid>
            <Grid item xs={12} sm={12}>
              <MaterialTable
                title="Paciente"
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
                          this.add(newData);
                          return { ...prevState, data };
                        });
                      }, 600);
                    }),
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        resolve();
                        this.update(oldData, newData);
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
                        this.delete(oldData);
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
export default crudPacientes;
