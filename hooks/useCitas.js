import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../firebase';

const useCitas = date => {
    console.log(date)
    const [citas, guardarCitas] = useState(null);

    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        const obtenerCitas = () => {
            firebase.db.collection('appointment_management') .where("date", ">=",date).onSnapshot(manejarSnapshot)
        }
        obtenerCitas();
    }, []);

    function manejarSnapshot(snapshot) {
        const cita = snapshot.docs.map(doc => {
            return {
            id: doc.id,
            ...doc.data()
            }
        });

        guardarCitas(cita);
    }

    return {
        citas
    }
}

export default useCitas;