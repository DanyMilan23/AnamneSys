import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../firebase';

const useDoctores = () => {

    const [doctores, guardarDoctores] = useState([]);

    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        const obtenerDoctores = () => {
            firebase.db.collection("Usuarios").orderBy("doctor", "asc").onSnapshot(manejarSnapshot)
        }
        obtenerDoctores();
    }, []);

    function manejarSnapshot(snapshot) {
        const doctor = snapshot.docs.map(doc => {
            return {
            id: doc.id,
            ...doc.data()
            }
        });

        guardarDoctores(doctor);
    }

    return {
        doctores
    }
}

export default useDoctores;