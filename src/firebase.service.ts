import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, set, query, orderByKey, limitToLast, push } from "firebase/database";
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firebaseConfig: any;
  app: any;
  database: any;
  contador: number = 0;

  constructor() {
    console.log("Inicializando Firebase...");

    this.firebaseConfig = {
      // ...
      // The value of `databaseURL` depends on the location of the database
      databaseURL: "https://tfghector-d12c1-default-rtdb.europe-west1.firebasedatabase.app/",
    };

    // Initialize Firebase
    this.app = initializeApp(this.firebaseConfig, "evento");

    // Initialize Realtime Database and get a reference to the service
    this.database = getDatabase(this.app);
  }


  obtenerEventos() {
    const dbRef = ref(this.database);
    return from(get(child(dbRef, `eventos`)));
  }









  crearEventos(fecha, hora, pueblo, ubicacion, nombreEspectaculo, vacas, toro, capon, otros, precio) {


    const dbRef = ref(this.database);
    push(child(dbRef, `eventos/`), {
      fecha: fecha,
      hora: hora,
      pueblo: pueblo,
      ubicacion: ubicacion,
      nombreEspectaculo: nombreEspectaculo,
      vacas: vacas,
      toro: toro,
      capon: capon,
      otros: otros,
      precio: precio
    });
    this.contador++;
  }
}

