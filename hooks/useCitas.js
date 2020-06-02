import React, { useState, useEffect, useContext } from 'react';
//import { FirebaseContext } from '../firebase';
import firebase,{FirebaseContext} from "../firebase/index";

const useCitas = date => {
  
    const [citas, guardarCitas] = useState(null);
    
    const { firebase } = useContext(FirebaseContext);
    
    useEffect(() => {
        const datefin=new Date(date.getFullYear()+ '-'+(date.getMonth()+1)+'-'+(date.getDate()+1));
        const obtenerCitas = () => {
            firebase.db.collection('appointment_management') .where("date", ">=",date).where("date", "<=",datefin).onSnapshot(manejarSnapshot)
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