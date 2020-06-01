import React, { useEffect, useContext, useState }  from 'react';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../../firebase';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Layout from '../../components/layout/layout'

const HealthService = () => {
     // state del componente
    const [producto, guardarProducto] = useState({});
    const [error, guardarError] = useState(false);
    const [comentario, guardarComentario ] = useState({});
    const [consultarDB, guardarConsultarDB ] = useState(true);

    // Routing para obtener el id actual
    const router = useRouter();
    const { query: { id }} = router;

    // context de firebase
    const { usuario, firebase } = useContext(FirebaseContext);

    useEffect(() => {
        if(id && consultarDB) {
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db.collection('productos').doc(id);
                const producto = await productoQuery.get();
                if(producto.exists) {
                   guardarProducto( producto.data() );
                   guardarConsultarDB(false);
                } else {
                    guardarError( true );
                    guardarConsultarDB(false);
                }
            }
            obtenerProducto();
        }
    }, [id]);

    if(Object.keys(producto).length === 0 && !error)  return 'Cargando...';

    return (
        <div>
            <Layout 
                tipo='doc'
            >
                <Container>
                    <Grid container
                    spacing={2}
                    direction="column"
                    justify="center"
                    alignItems="center" >
                        <Grid item xs={12} sm={12}>
                            <h1>Doctor</h1>
                            <img src='https://firebasestorage.googleapis.com/v0/b/anamnesys-797fa.appspot.com/o/Fotos%20del%20sitio%2FLogo_2.svg?alt=media&token=eb6dcdd0-a07e-446c-b137-342caae77c7c' style={{height:400, width: 800,paddingTop:50,marginBottom:150}}/>
                        </Grid>
                        
                    </Grid>
                </Container>
            </Layout>   
        </div>
    );
};

export default HealthService;