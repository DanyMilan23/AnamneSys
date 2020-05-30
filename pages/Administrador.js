import React,{ useState, useContext,useEffect } from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";

import Layout from '../components/layout/layout'
import useUsuario from '../hooks/useUsuario'
import { FirebaseContext } from '../firebase'; 

const main = () => {
    const { usuario, firebase } = useContext(FirebaseContext);
    //const {user} = useUsuario(usuario.email);

    return (
        <>
            <Layout 
            >
                <Container>
                    <Grid container
                    spacing={2}
                    direction="column"
                    justify="center"
                    alignItems="center" >
                        <Grid item xs={12} sm={12}>
                            <h1>Administrador</h1>
                            <img src='https://firebasestorage.googleapis.com/v0/b/anamnesys-797fa.appspot.com/o/Fotos%20del%20sitio%2FLogo_2.svg?alt=media&token=eb6dcdd0-a07e-446c-b137-342caae77c7c' style={{height:400, width: 800,paddingTop:50,marginBottom:150}}/>
                        </Grid>
                        
                    </Grid>
                </Container>
            </Layout>   
        </>
    );
};

export default main;