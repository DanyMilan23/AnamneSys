import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
//table
import MUIDataTable from "mui-datatables";
import Layout from "../components/layout/layout"

producto_farmacia.propTypes = {};

function producto_farmacia(props) {
  const columns = ["Id", "Nombre", "Laboratorio", "Fecha de vencimiento", "Costo Unitario"];

    const data = [
      [1, "Ibuprofeno", "Inti", '25/11/2021', "$100,000"],
      [2, "Paracetamol", "Inti", '19/01/2021', "$200,000"],
      [3, "Ibuprofeno", "MultiLab", '11/05/2021', "$500,000"],
      [4, "Acitromicina", "Bago", '20/04/2023', "$50,000"],
      [5, "Diacepan", "CodeInc", '11/09/2020', "$75,000"],
      
    ];

    const options = {
      filterType: "dropdown",
      responsive: "scroll"
    };

  return (
    <>
      <CssBaseline />
      <Layout>
      <Container fixed>
        <Grid
          container
          spacing={1}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12} sm={12}>
            <MUIDataTable
              title={"Productos Farmacia"}
              data={data}
              columns={columns}
              options={options}
            />
          </Grid>
        </Grid>
      </Container>
      </Layout>
    </>
  );
}

export default producto_farmacia;
