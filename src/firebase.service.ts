import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { UserCredential, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDatabase, ref, child, get, set, push, remove } from "firebase/database";
import { Observable, from } from 'rxjs';
import { firebaseConfig } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  app: any;
  database: any;
  email: string;
  password: string;
  auth: any;



  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.database = getDatabase(this.app);
    this.auth = getAuth();
  }


  firebaseConfig(firebaseConfig: any, arg1: string): any {
    throw new Error('Method not implemented.');
  }

  /*Deu retornar una promesa*/
  login = (email: string, password: string) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: UserCredential) => {
        console.log("Inicio de sesión exitoso");
        const user = userCredential.user;
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error durante el inicio de sesión:", errorCode, errorMessage);
        throw error;
      });
  };

  logout() {
    const auth = getAuth();
    return signOut(auth)
      .then(() => {
        console.log('Sesión cerrada exitosamente');
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
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

  actualizarAnimal(animalId: string, datosAnimal: any) {
    const dbRef = ref(this.database, `animales/${animalId}`);
    return set(dbRef, datosAnimal);
  }

  obtenerVehiculos() {
    const dbRef = ref(this.database, 'vehiculos');
    return from(get(child(dbRef, '/')));
  }

  agregarVehiculo(nuevoVehiculo: any) {
    const dbRef = ref(this.database, 'vehiculos');
    return push(dbRef, nuevoVehiculo);
  }

  obtenerDetallesVehiculo(vehiculoId: string): Observable<any> {
    const dbRef = ref(this.database);
    return from(get(child(dbRef, `vehiculos/${vehiculoId}`)));
  }

  actualizarEstadoEvento(eventoId: string, estado: boolean) {
    const dbRef = ref(this.database, `eventos/${eventoId}/estado`);
    return set(dbRef, estado);
  }

  eliminarVehiculo(vehiculoId: string): Observable<void> {
    const dbRef = ref(this.database, `vehiculos/${vehiculoId}`);
    return from(remove(dbRef));
  }

  actualizarVehiculo(vehiculoId: string, datosVehiculo: any): Observable<void> {
    const dbRef = ref(this.database, `vehiculos/${vehiculoId}`);
    return from(set(dbRef, datosVehiculo));
  }


}