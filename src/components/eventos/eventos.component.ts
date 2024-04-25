import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../firebase.service';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-crearevento',
  standalone: true,
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css',
  imports: [HeaderComponent, FormsModule, RouterModule]
})
export class EventosComponent implements OnInit {

  eventos: any[] = [];
  eventosOriginales: any[] = []; // Mantener una copia de respaldo de todos los eventos originales
  eventoEditando: any = null;
  eventoEditandoIndex: number | null = null;
  fechaSeleccionada: Date | null = null;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
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
        this.eventosOriginales = [...this.eventos]; // Inicializar eventosOriginales con una copia de eventos
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
      this.eventos = this.eventosOriginales.slice(); // Restaurar la lista original de eventos
    }
  }
}