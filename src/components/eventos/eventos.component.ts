import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../firebase.service';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { log } from 'node:console';

@Component({
  selector: 'app-crearevento',
  standalone: true,
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css',
  imports: [HeaderComponent, FormsModule, RouterModule, CommonModule]
})
export class EventosComponent implements OnInit {

  eventos: any[] = [];
  eventosOriginales: any[] = []; // Mantener una copia de respaldo de todos los eventos originales
  eventoEditando: any = null;
  eventoEditandoIndex: number | null = null;
  fechaSeleccionada: Date | null = null;
  mesSeleccionado: number | null = null;
  anioSeleccionado: number | null = null;


  meses = [
    { nombre: 'Enero', numero: 1 },
    { nombre: 'Febrero', numero: 2 },
    { nombre: 'Marzo', numero: 3 },
    { nombre: 'Abril', numero: 4 },
    { nombre: 'Mayo', numero: 5 },
    { nombre: 'Junio', numero: 6 },
    { nombre: 'Julio', numero: 7 },
    { nombre: 'Agosto', numero: 8 },
    { nombre: 'Septiembre', numero: 9 },
    { nombre: 'Octubre', numero: 10 },
    { nombre: 'Noviembre', numero: 11 },
    { nombre: 'Diciembre', numero: 12 }
  ];

  anios: number[] = this.getAniosSiguientes();


  constructor(private firebaseService: FirebaseService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerEventos();
    /* this.anios = this.getAniosSiguientes();
     this.anios = this.anios.filter((valor, indice, self) => self.indexOf(valor) === indice); // Eliminar duplicados*/
  }


  obtenerEventos() {
    this.firebaseService.obtenerEventos().subscribe(
      (snapshot: any) => {
        this.eventos = [];
        snapshot.forEach((childSnapshot: any) => {
          const evento = {
            id: childSnapshot.key,
            datos: childSnapshot.val()
          };
          this.eventos.push(evento);
        });
        this.eventosOriginales = [...this.eventos];
        this.ordenarEventosPorFechaProximidad();
      },
      error => {
        console.error("Error al obtener eventos:", error);
      }
    );
  }

  eliminarEvento(eventoId: string) {
    this.firebaseService.eliminarEvento(eventoId);
  }

  ordenarEventosPorFechaProximidad() {
    this.eventos.sort((a, b) => {
      const fechaA = new Date(a.datos.fecha);
      const fechaB = new Date(b.datos.fecha);
      return fechaA.getTime() - fechaB.getTime();
    });
  }

  filtrarPorFecha() {
    this.fechaSeleccionada = new Date(this.fechaSeleccionada);

    if (this.fechaSeleccionada instanceof Date && !isNaN(this.fechaSeleccionada.getTime())) {
      this.eventos = this.eventosOriginales.filter(evento => {
        const fechaEvento = new Date(evento.datos.fecha);
        return (
          fechaEvento.getDate() === this.fechaSeleccionada.getDate() &&
          fechaEvento.getMonth() === this.fechaSeleccionada.getMonth() &&
          fechaEvento.getFullYear() === this.fechaSeleccionada.getFullYear()
        );
      });
    } else {
      console.log(typeof this.fechaSeleccionada);
      this.eventos = this.eventosOriginales.slice(); // Restaurar la lista original de eventos
    }
  }

  /* Marcar como realizado */

  marcarComoRealizado(eventoId: string) {
    this.firebaseService.actualizarEstadoEvento(eventoId, true)
      .then(() => {
        console.log('Evento marcado como realizado correctamente');
        this.eventos = [];
        this.obtenerEventos();
      })
      .catch(error => console.error('Error al marcar el evento como realizado:', error));
  }



  filtrarPorMesYAnio() {
    console.log("Mes seleccionado:", this.mesSeleccionado);

    if (this.mesSeleccionado !== null && this.anioSeleccionado !== null) {
      this.eventos = this.eventosOriginales.filter(evento => {

        const fechaEvento = new Date(evento.datos.fecha);
        const mesEvento = fechaEvento.getMonth() + 1; // Sumamos 1 porque los meses van de 0 a 11
        const anioEvento = fechaEvento.getFullYear();


        console.log(mesEvento == this.mesSeleccionado && anioEvento == this.anioSeleccionado);

        return mesEvento == this.mesSeleccionado && anioEvento == this.anioSeleccionado;
      });
    } else {
      this.eventos = this.eventosOriginales.slice(); // Restaurar la lista original de eventos
    }
    console.log("Eventos filtrados:", this.eventos);

  }



  getAniosSiguientes(): number[] {
    const anioActual = new Date().getFullYear();
    return [anioActual, anioActual + 1, anioActual + 2, anioActual + 3];
  }

}