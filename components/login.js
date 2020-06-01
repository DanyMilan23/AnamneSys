import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
//next dependencies
import Router from "next/router";
//Firebase
import firebase from "../firebase";
// validaciones
import useValidacion from "../hooks/useValidacion";
import useUsuario from "../hooks/useUsuario";
import validarIniciarSesion from "../validacion/validarIniciarSesion";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://wa.me/59167593666">
        Code - Group
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://firebasestorage.googleapis.com/v0/b/anamnesys-797fa.appspot.com/o/Fotos%20del%20sitio%2FFondo_3.jpg?alt=media&token=1e15a713-7487-4aba-b022-849e53265883)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const STATE_INICIAL = {
  email: "",
  password: "",
};

export default function SignInSide() {
  const classes = useStyles();
  //const {sintomas}=useSintomas();
  const [error, guardarError] = useState(false);

  const {
    valores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);

  const { email, password } = valores;

  async function iniciarSesion() {
    try {
      await firebase.login(email, password);
      /*const user = firebase.db
        .collection("Usuarios")
        .where("email", "==", email)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            //console.log()
            if(doc.data().type == 'doctor'){
              console.log('entro doctor')
              Router.push("/Doctor");
            }
            if(doc.data().type == 'administrator'){
              console.log('entro admin')
              Router.push("/Administrador");
            }
            if(doc.data().type == 'nurse'){
              console.log('entro nurse')
              Router.push("/Enfermeria");
            }
            if(doc.data().type == 'pharmacy'){
               console.log('entro farmacia')
              Router.push("/Farmacia");
            }
          });
        });*/
      Router.push("/seleccion");
    } catch (error) {
      console.error("Hubo un error al autenticar el usuario ", error.message);
      guardarError(error.message);
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/anamnesys-797fa.appspot.com/o/Fotos%20del%20sitio%2FLogo_2.svg?alt=media&token=eb6dcdd0-a07e-446c-b137-342caae77c7c"
            style={{ height: 200, width: 400 }}
          />
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Direccion de Correo"
              name="email"
              autoComplete="email"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errores.email && (
              <Alert variant="filled" severity="error">
                {errores.email}
              </Alert>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errores.email && (
              <Alert variant="filled" severity="error">
                {errores.password}
              </Alert>
            )}
            {error && (
              <Alert variant="filled" severity="error">
                {error}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Iniciar Sesion
            </Button>

            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
