import React, { useEffect, useState } from "react";
import App from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../components/theme";
import firebase, { FirebaseContext } from "../firebase/index";
import useAutenticacion from "../hooks/useAutenticacion";
import useUsuario from "../hooks/useUsuario";

const MyApp = (props) => {
  //state
  const [consultarDB, guardarConsultarDB] = useState(true);
  const [datosUsuario, guardarDatosUsuario] = useState({});

  const usuario = useAutenticacion();
  console.log("usuario from _app", usuario);
  const { Component, pageProps } = props;
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  });

  useEffect(() => {
    if (usuario === null) {
      guardarDatosUsuario({});
      guardarConsultarDB(true);
      return;
    }
    if (usuario && consultarDB) {
      const obtenerDatos = async () => {
        const datosQuery = await firebase.db
          .collection("Usuarios")
          .where("email", "==", usuario.email);
        const datos = await datosQuery
          .get()
          .then((dato) => {
            dato.forEach(function (doc) {
              guardarDatosUsuario(doc.data());
              guardarConsultarDB(false);
            });
          })
          .catch((error) => {
            console.log(error);
            guardarConsultarDB(false);
          });
      };
      obtenerDatos();
      console.log(datosUsuario);
    }
  }, [usuario]);
  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        usuario,
        datosUsuario,
      }}
    >
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </FirebaseContext.Provider>
  );
};
export default MyApp;
/*<Head>
          <title>AnamneSys</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>*/
