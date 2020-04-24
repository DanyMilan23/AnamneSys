import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../firebase';

const useServices = () => {

    const [services, guardarServices] = useState([]);

    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        const obtenerServices = () => {
            firebase.db.collection("services").orderBy("name", "asc").onSnapshot(manejarSnapshot)
        }
        obtenerServices();
    }, []);

    function manejarSnapshot(snapshot) {
        const service = snapshot.docs.map(doc => {
            return {
            id: doc.id,
            ...doc.data()
            }
        });

        guardarServices(service);
    }

    return {
        services
    }
}

export default useServices;