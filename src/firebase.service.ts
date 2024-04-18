import { Injectable } from '@angular/core';
import { time } from 'console';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { from } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firebaseConfig: any;
  app: any;
  database: any;

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
    return from(get(child(dbRef, `eventos`)))

    /*get(child(dbRef, `eventos`)).then((snapshot) => {
          if (snapshot.exists()) {
            // Iterar sobre cada evento
            snapshot.forEach((childSnapshot) => {
              // Obtener el ID del evento
              const eventId = childSnapshot.key;
              // Obtener los datos del evento
              const eventData = childSnapshot.val();
              
              // Mostrar el ID del evento
              console.log("Evento ID:", eventId);
              // Mostrar los datos del evento
              console.log("Datos del evento:", eventData);
            });
          } else {
            console.log("No hay datos disponibles para eventos");
          }
        }).catch((error) => {
          console.error("Error al obtener eventos:", error);
        });*/
  }




  crearEventos(fecha, hora, pueblo, ubicacion, nombreEspectaculo, vacas, toro, capon, otros, precio) {
    const dbRef = ref(this.database); // Obteniendo la referencia correcta a la base de datos
    set(child(dbRef, 'eventos/evento4'), { // Usando child para referenciar 'eventos/evento3'
      fecha: fecha,
      hora: hora,
      pueblo: pueblo,
      ubicacion: ubicacion,
      nombreEspectaculo: nombreEspectaculo,
      vacas:vacas,
      toro: toro,
      capon: capon,
      otros: otros,
      precio: precio
      
    });
  }




}
