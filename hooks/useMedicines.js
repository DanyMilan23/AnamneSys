import React, { useState, useEffect, useContext } from 'react';
//import { FirebaseContext } from '../firebase';
import firebase,{FirebaseContext} from "../firebase/index";

const useMedicines = () => {

    const [medicinas, guardarMedicinas] = useState([]);

    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        const obtenerMedicinas = () => {
            firebase.db.collection("medicine").orderBy("name", "asc").onSnapshot(manejarSnapshot)
        }
        obtenerMedicinas();
    }, []);

    function manejarSnapshot(snapshot) {
        const medicina = snapshot.docs.map(doc => {
            return {
            id: doc.id,
            ...doc.data()
            }
        });

        guardarMedicinas(medicina);
    }

    return {
        medicinas
    }
}

export default useMedicines;