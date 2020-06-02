import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
//Componentes de listas
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
//Iconos
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MenuIcon from "@material-ui/icons/Menu";
//Router with next
import Link from "next/link";
import Router from "next/router";
//iconos
import FindInPageOutlinedIcon from "@material-ui/icons/FindInPageOutlined";
import CreateNewFolderOutlinedIcon from "@material-ui/icons/CreateNewFolderOutlined";
import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import PermMediaOutlinedIcon from "@material-ui/icons/PermMediaOutlined";
import PlaylistAddCheckOutlinedIcon from "@material-ui/icons/PlaylistAddCheckOutlined";
//Context
import useUsuario from "../../hooks/useUsuario";
//import { FirebaseContext } from "../../firebase";
import firebase,{FirebaseContext} from "../../firebase/index";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}));

export default function MenuAppBar({ tipo }) {
  const classes = useStyles();
  const { usuario, firebase, datosUsuario } = useContext(FirebaseContext);
  //states
  const [menu, setmenu] = React.useState({
    left: false,
  });
  //funcion de activacion del slide
  const toggleDrawer = (side, open) => (event) => {
    setmenu({ ...menu, [side]: open });
  };
  //menu Doctor
  const MenuDoctor = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer("left", false)}
      onKeyDown={toggleDrawer("left", false)}
    >
      <List>
        <Link href="/busquedaPaciente">
          <ListItem button key="Test">
            <ListItemIcon>
              <FindInPageOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Busqueda Paciente" />
          </ListItem>
        </Link>
        <Link href="/main">
          <ListItem button key="Test">
            <ListItemIcon>
              <AccountTreeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Antecedentes" />
          </ListItem>
        </Link>
        <Link href="/nuevo_historial">
          <ListItem button key="Test">
            <ListItemIcon>
              <CreateNewFolderOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Nuevo Historial" />
          </ListItem>
        </Link>
        <Link href="/historial_completo">
          <ListItem button key="Test">
            <ListItemIcon>
              <PermMediaOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Historial Completo" />
          </ListItem>
        </Link>
        <Link href="/atencion_paciente">
          <ListItem button key="Test">
            <ListItemIcon>
              <PlaylistAddCheckOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Atencion Paciente" />
          </ListItem>
        </Link>
      </List>
    </div>
  );
  //Menu enfermero
  const MenuEnfermero = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer("left", false)}
      onKeyDown={toggleDrawer("left", false)}
    >
      <List>
        <Link href="/actualizacion_datos">
          <ListItem button key="Test">
            <ListItemIcon>
              <FindInPageOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Actualizacion de datos" />
          </ListItem>
        </Link>
        <Link href="/busquedaPaciente">
          <ListItem button key="Test">
            <ListItemIcon>
              <FindInPageOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Busqueda Paciente" />
          </ListItem>
        </Link>
        <Link href="/atencion_paciente">
          <ListItem button key="Test">
            <ListItemIcon>
              <FindInPageOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Atencion Paciente" />
          </ListItem>
        </Link>
      </List>
    </div>
  );
  //MENU FARMACIA
  const MenuFarmacia = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer("left", false)}
      onKeyDown={toggleDrawer("left", false)}
    >
      <List>
        <Link href="/producto_farmacia">
          <ListItem button key="Test">
            <ListItemIcon>
              <FindInPageOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Producto Farmacia" />
          </ListItem>
        </Link>
        <Link href="/venta_farmacia">
          <ListItem button key="Test">
            <ListItemIcon>
              <AccountTreeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Ventas Farmacia" />
          </ListItem>
        </Link>
      </List>
    </div>
  );
  //Menu Cajero
  const MenuCajero = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer("left", false)}
      onKeyDown={toggleDrawer("left", false)}
    >
      <List>
        <Link href="/busquedaPaciente">
          <ListItem button key="Test">
            <ListItemIcon>
              <FindInPageOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Busqueda Paciente" />
          </ListItem>
        </Link>
        <Link href="/main">
          <ListItem button key="Test">
            <ListItemIcon>
              <AccountTreeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Antecedentes" />
          </ListItem>
        </Link>
      </List>
    </div>
  );
  //Menu Administrador
  const MenuAdmin = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer("left", false)}
      onKeyDown={toggleDrawer("left", false)}
    >
      <List>
        <Link href="/busquedaPaciente">
          <ListItem button key="Test">
            <ListItemIcon>
              <FindInPageOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Busqueda Paciente" />
          </ListItem>
        </Link>
        <Link href="/main">
          <ListItem button key="Test">
            <ListItemIcon>
              <AccountTreeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Antecedentes" />
          </ListItem>
        </Link>
        <Link href="/nuevo_historial">
          <ListItem button key="Test">
            <ListItemIcon>
              <CreateNewFolderOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Nuevo Historial" />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  if(Object.keys(datosUsuario).length === 0 )  return 'Cargando...';
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            AnamneSys
          </Typography>
          {usuario ? (
            <Typography variant="h6" className={classes.title}>
              Bienvenido Dr.{datosUsuario.first_name}
            </Typography>
          ) : null}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              firebase.cerrarSesion();
              Router.push("/");
            }}
          >
            Cerrar Sesion
          </Button>
          {usuario ? <Avatar alt="Remy Sharp" src={usuario.photoURL} /> : null}
        </Toolbar>
      </AppBar>
      <Drawer open={menu.left} onClose={toggleDrawer("left", false)}>
        {datosUsuario.type == "doctor" ? <MenuDoctor /> : null}
        {datosUsuario.type == "administrator" ? <MenuAdmin /> : null}
        {datosUsuario.type == "nurse" ? <MenuEnfermero /> : null}
        {datosUsuario.type == "pharmacy" ? <MenuFarmacia /> : null}
        {datosUsuario.type == "caj" ? <MenuCajero /> : null}
      </Drawer>
    </div>
  );
}
