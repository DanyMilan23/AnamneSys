import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { FirebaseContext } from "../../firebase/index";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Layout from "../../components/layout/layout";
//Doctor Components
import BusquedaPaciente from "../../components/doctor/busquedaPaciente";
import Nuevo_historial from "../../components/doctor/nuevo_historial";
import Historial_completo from "../../components/doctor/historial_completo";
import Atencion_paciente from "../../components/doctor/atencion_paciente";
import Antecedente from "../../components/doctor/antecedente";
import Receta from "../../components/doctor/receta";
//Nurse Components
import Actualizar_datos from "../../components/nurse/actualizar_datos";
import Atencion_caja2 from "../../components/nurse/atencion_caja";
import Busqueda_doctor from "../../components/nurse/busqueda_doctor";
//Pharmacy Components
//import BusquedaPaciente2 from "../../components/pharmacy/busquedaPaciente";
import Producto_farmacia from "../../components/pharmacy/producto_farmacia";
import Venta_farmacia from "../../components/pharmacy/venta_farmacia";
//Cajero Components
import Atencion_caja from "../../components/cajero/atencion_caja";
import Transaccion_caja from "../../components/cajero/transaccion_caja";
//admin comoponents
import AdminPaciente from "../../components/administrador/crudPacientes"
import AdminEnfermero from "../../components/administrador/crudEnfermero"
import AdminDoctor from "../../components/administrador/crudDoctor"

const HealthService = () => {
  // state del componente
  const [producto, guardarProducto] = useState({});
  const [error, guardarError] = useState(false);
  const [comentario, guardarComentario] = useState({});
  const [consultarDB, guardarConsultarDB] = useState(true);
  const [pantalla, guardarPantalla] = useState("inicio");
  // Routing para obtener el id actual
  const router = useRouter();
  const {
    query: { id },
  } = router;

  // context de firebase
  const { usuario, firebase } = useContext(FirebaseContext);

  useEffect(() => {
    if (id && consultarDB) {
      const obtenerProducto = async () => {
        const productoQuery = await firebase.db
          .collection("health_centers")
          .doc(id);
        const producto = await productoQuery.get();
        if (producto.exists) {
          guardarProducto(producto.data());
          guardarConsultarDB(false);
        } else {
          guardarError(true);
          guardarConsultarDB(false);
        }
      };
      obtenerProducto();
    }
  }, [id]);

  if (Object.keys(producto).length === 0 && !error) return "Cargando...";

  return (
    <div>
      <Layout funcion={guardarPantalla}>
        {pantalla == "inicio" ? (
          <Container>
            <Grid
              container
              spacing={2}
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={12}>
                {producto ? (
                  <img
                    src={producto.photo}
                    style={{
                      paddingTop: "20vh",
                      paddingBottom: "20vh",
                      height: "auto",
                      width: "50vw",
                    }}
                  />
                ) : null}
              </Grid>
            </Grid>
          </Container>
        ) : null}
        {pantalla == "Busqueda_paciente" ? <BusquedaPaciente /> : null}
        {pantalla == 'Antecedentes'? <Antecedente/>:null}
        {pantalla == 'Nuevo_historial'? <Nuevo_historial/>:null}
        {pantalla == 'Historial_completo'? <Historial_completo/>:null}
        {pantalla == 'Atencion_paciente'? <Atencion_paciente id={id}/>:null}
        {pantalla == 'Receta'? <Receta id={id} doctor={usuario.displayName}/>:null}

        {pantalla == 'Actualizacion_datos'? <Actualizacion_datos/>:null}
        {pantalla == 'Atencion_caja'? <Atencion_caja2/>:null}
        {pantalla == 'Busqueda_doctor'? <Busqueda_doctor/>:null}

        {pantalla == 'Producto_farmacia'? <Producto_farmacia/>:null}
        {pantalla == 'Ventas_farmacia'? <Venta_farmacia/>:null}

        {pantalla == 'Atencion_caja2'? <Atencion_caja/>:null}
        {pantalla == 'Transaccion_caja'? <Transaccion_caja/>:null}

        {pantalla == 'Admin_paciente'? <AdminPaciente/>:null}
        {pantalla == 'Admin_doc'? <AdminDoctor/>:null}
        {pantalla == 'Admin_enfer'? <AdminEnfermero/>:null}
      </Layout>
    </div>
  );
};

export default HealthService;
