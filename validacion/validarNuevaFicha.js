export default function validarNuevaFicha(valores) {

    let errores = {};

    // Validar el ID paciente
    if(!valores.id_paciente) {
        errores.id_paciente = "Debe seleccionar un Paciente";
    }

    // Validar el ID paciente
    if(!valores.id_doctor) {
        errores.id_doctor = "Debe seleccionar un Doctor";
    }

    // Validar Fecha
    if(!valores.fecha) {
        errores.fecha = "Debe seleccionar un Fecha";
    }

    // Validar el ID paciente
    if(!valores.hora) {
        errores.hora = "Debe seleccionar una Hora";
    }
      // Validar el ID servicio
    if(!valores.hora) {
        errores.hora = "Debe seleccionar un Servicio";
    }

    return errores;
}