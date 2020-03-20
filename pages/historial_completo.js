import React from "react";
import MaterialTable from "material-table";
import Historial from "./historial";

const historial_completo = () => {
  const title = [
    {
      title: "Doctor",
      field: "imageUrl",
      render: rowData => (
        <div>
          <img
            src={rowData.imageUrl}
            alt=""
            style={{ width: 40, borderRadius: "50%" }}
          />
          <b style={{ verticalAlign: "top", paddingLeft: "20px" }}>
            {rowData.name}
          </b>
        </div>
      )
    },
    { title: "Enfermedad Actual", field: "enfermedad" },
    { title: "Fecha", field: "fecha", type: "date" }
  ];

  const data = [
    { name: "Mehmet", surname: "Xd", birthYear: 1987, birthCity: 63 },
    {
      name: "Zerya Betül",
      surname: "Baran",
      birthYear: 2017,
      birthCity: 34
    }
  ];
  return (
    <>
      <MaterialTable
        title="Historial Completo"
        columns={title}
        data={data}
        detailPanel={[
          {
            tooltip: "Show Name",
            render: rowData => {
              return (
                <div
                  style={{
                    textAlign: "center"
                  }}
                >
                  <Historial historial={data} />
                </div>
              );
            }
          }
        ]}
      />
    </>
  );
};

export default historial_completo;
