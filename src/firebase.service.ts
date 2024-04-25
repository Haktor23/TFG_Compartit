import { Injectable } from '@angular/core';
import { log } from 'console';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, set, query, orderByKey, limitToLast, push, remove } from "firebase/database";
import { Observable, from } from 'rxjs';

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

  }

  eliminarEvento(eventoId: string) {
    const dbRef = ref(this.database);
    remove(child(dbRef, `eventos/${eventoId}`))
      .then(() => {
        console.log('Evento eliminado correctamente');
        // Recargar la página después de eliminar el evento
        location.reload();
      })
      .catch(error => console.error('Error al eliminar el evento:', error));
  }

  editarEvento(eventoId: string) {
    const dbRef = ref(this.database);
    return from(get(child(dbRef, `eventos/${eventoId}`)));
  }

  actualizarEvento(eventoId: string, datosEvento: any) {
    const dbRef = ref(this.database);
    return set(child(dbRef, `eventos/${eventoId}`), datosEvento);
  }

  //ANIMALES

  obtenerAnimales() {
    const dbRef = ref(this.database);
    return from(get(child(dbRef, `animales`)));
  }

  obtenerDetallesAnimal(animalId: string): Observable<any> {
    const dbRef = ref(this.database);
    return from(get(child(dbRef, `animales/${animalId}`)));
  }

  eliminarAnimal(animalId: string) {
    const dbRef = ref(this.database);
    remove(child(dbRef, `animales/${animalId}`))
      .then(() => {
        console.log('Animal eliminado correctamente');
        // Recargar la página después de eliminar el animal
        location.reload();
      })
      .catch(error => console.error('Error al eliminar el animal:', error));
  }

  subirAnimal(nuevoAnimal: any) {
    nuevoAnimal.lesion = false;
    const dbRef = ref(this.database, 'animales');
    return push(dbRef, nuevoAnimal);
  }

  marcarAnimalComoLesionado(animalId: string) {
    const dbRef = ref(this.database, `animales/${animalId}/lesion`);
    return set(dbRef, true);
  }

  marcarAnimalComoCurado(animalId: string) {
    const dbRef = ref(this.database, `animales/${animalId}/lesion`);
    return set(dbRef, false);
  }

}




