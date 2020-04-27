import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

function historial({historial}) {
  console.log(historial)
    return (
        <>
            <CssBaseline />
            <Container fixed>
                <Grid
                container
                spacing={1}
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                >   
                 <Grid item xs={12} sm={12}>
                    <p>
                    <b>Enfermedad Actual:</b>
                    {historial.current_illness}
                  </p>
                 </Grid>
                 <Grid item xs={12} sm={12}>
                    <p>
                    <b>Resultados de laboratorio:</b>
                    {historial.laboratory_result}
                  </p>
                 </Grid>
                 <Grid item xs={12} sm={12}>
                    <p>
                    <b>Examen Fisico:</b>
                    {historial.physical_exam}
                  </p>
                 </Grid>
                 <Grid item xs={12} sm={12}>
                    <p>
                    <b>Diagnostico Presuntivo:</b>
                    {historial.presumptive_diagnosis}
                  </p>
                 </Grid>
                 <Grid item xs={12} sm={12}>
                    <p>
                    <b>Razon de la consulta:</b>
                    {historial.reason_consultation}
                  </p>
                 </Grid>
                </Grid>
            </Container>

            
        </>
    );
}

export default historial;