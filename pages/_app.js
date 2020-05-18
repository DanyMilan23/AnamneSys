import React,{ useEffect} from "react";
import App from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../components/theme";
import firebase, { FirebaseContext } from '../firebase';
import useAutenticacion from '../hooks/useAutenticacion';
import useUsuario from '../hooks/useUsuario';


const MyApp = props => {
  const usuario = useAutenticacion();
  console.log(usuario);
  const { Component, pageProps } = props;
  useEffect(() => { 
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  })
  return (
        <FirebaseContext.Provider
            value={{
                firebase,
                usuario
            }}
        >
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </FirebaseContext.Provider>
    )
  
}
export default MyApp;
/*<Head>
          <title>AnamneSys</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>*/