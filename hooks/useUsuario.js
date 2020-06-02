import React, { useState, useEffect, useContext } from 'react';
//import { FirebaseContext } from '../firebase';
import firebase,{FirebaseContext} from "../firebase/index";

const useUsuario = email => {

    const [user, guardarUsuario] = useState(null);

    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        const obtenerUsuario = () => {
            firebase.db.collection('Usuarios') .where("email", "==",email).onSnapshot(manejarSnapshot)
        }
        obtenerUsuario();
    }, []);

    function manejarSnapshot(snapshot) {
        const usuario = snapshot.docs.map(doc => {
            return {
            id: doc.id,
            ...doc.data()
            }
        });

        guardarUsuario(usuario);
    }

    return {
        user
    }
}

export default useUsuario;