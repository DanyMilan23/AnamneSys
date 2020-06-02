import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
//next dependencies
import Router from "next/router";
import Link from "next/link";
//Firebase
import { FirebaseContext } from "../firebase/index";

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
  list: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
  },
  imagen: {
    width: "100px",
    height: "auto",
  },
}));

const seleccion = () => {
  const classes = useStyles();
  const [consultarDB, guardarConsultarDB] = useState(true);
  const [accesos, guardarAccesos] = useState([]);
  const { datosUsuario } = useContext(FirebaseContext);
  useEffect(() => {
    if (datosUsuario && consultarDB) {
      guardarAccesos(datosUsuario.access);
      guardarConsultarDB(false);
    }
  }, [datosUsuario]);
    if(Object.keys(datosUsuario).length === 0 )  return 'Cargando...';

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
          {datosUsuario ? (
            <List dense className={classes.list}>
              {accesos.map((token) => (
                <ListItem key={token.token} button>
                  <ListItemAvatar>
                    <img src={token.photo} className={classes.imagen} />
                  </ListItemAvatar>
                  <ListItemText
                    id={token.token}
                    primary={token.name}
                    secondary={token.type}
                  />
                  <ListItemSecondaryAction>
                    <Link
                      href="/healthservice/[id]"
                      as={`/healthservice/${token.token}`}
                    >
                      <Button variant="contained" color="primary">
                        Acceder
                      </Button>
                    </Link>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          ) : null}
        </div>
      </Grid>
    </Grid>
  );
};

export default seleccion;
