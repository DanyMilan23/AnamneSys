import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../firebase';

const usePacientes = () => {

    const [pacientes, guardarPacientes] = useState([]);

    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        const obtenerPacientes = () => {
            firebase.db.collection("Usuarios").orderBy("patient", "asc").onSnapshot(manejarSnapshot)
        }
        obtenerPacientes();
    }, []);

    function manejarSnapshot(snapshot) {
        const paciente = snapshot.docs.map(doc => {
            return {
            id: doc.id,
            ...doc.data()
            }
        });

        guardarPacientes(paciente);
    }

    return {
        pacientes
    }
}

export default usePacientes;