import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FirebaseService } from '../../firebase.service';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-eventos-realizados',
    standalone: true,
    templateUrl: './eventos-realizados.component.html',
    styleUrl: './eventos-realizados.component.css',
    imports: [HeaderComponent, FormsModule, RouterModule, CommonModule, FooterComponent]
})
export class EventosRealizadosComponent implements OnInit {

  eventos: any[] = [];
  eventosOriginales: any[] = []; // Mantener una copia de respaldo de todos los eventos originales
  eventoEditando: any = null;
  eventoEditandoIndex: number | null = null;
  fechaSeleccionada: Date | null = null;


  constructor(private firebaseService: FirebaseService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerEventos();
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

  eliminarFiltros() {
    this.eventos = [...this.eventosOriginales];
  }



}
