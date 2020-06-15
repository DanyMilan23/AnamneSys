import React, { useState, useEffect, useContext } from 'react';
//import { FirebaseContext } from '../firebase';
import firebase,{FirebaseContext} from "../firebase/index";

const useAntecedentes = () => {

    const [antecedentes, guardarAntecedentes] = useState([]);

    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        const obtenerAntecedentes = () => {
            firebase.db.collection("antecedent").onSnapshot(manejarSnapshot)
        }
        obtenerAntecedentes();
    }, []);

    function manejarSnapshot(snapshot) {
        const antecedente = snapshot.docs.map(doc => {
            return {
            id: doc.id,
            ...doc.data()
            }
        });

        guardarAntecedentes(antecedente);
    }

    return {
        antecedentes
    }
}

export default useAntecedentes;