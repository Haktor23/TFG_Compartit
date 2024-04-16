import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-crearevento',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './crearevento.component.html',
  styleUrl: './crearevento.component.css'
})
export class CreareventoComponent {
  fecha: string = '';
  hora: string = '';
  pueblo: string = '';
  nombreEspectaculo: string = '';
  ubicacion: string = '';
  vacas?: number | undefined;
  toroEmbolado?: number | undefined;
  capon?: number | undefined;
  toro?: number | undefined;
  vacaEmbolada?: number | undefined;
  toroEnCuerda?: number | undefined;
  otros?: string | undefined;
  precio: number = 0;


  eventos = [
    {
      id: 1,
      fecha: '15/06/2024',
      hora: '12:30',
      pueblo: 'Canals',
      nombreEspectaculo: 'Suelta de vaquillas y toro embolado',
      ubicacion: "https://www.google.com/maps/place/38%C2%B057'46.3%22N+0%C2%B034'51.6%22W/@38.9628747,-0.582278,18z/data=!3m1!4b1!4m4!3m3!8m2!3d38.9628726!4d-0.5809905?hl=es&entry=ttu",
      vacas: 3,
      toroEmbolado: 1,
      precio: 1200
    },
    {
      id: 2,
      fecha: '16/06/2024',
      hora: '01:30',
      pueblo: 'Canals',
      nombreEspectaculo: 'Suelta de vaquillas y toro embolado',
      ubicacion: "https://www.google.com/maps/place/38%C2%B057'46.3%22N+0%C2%B034'51.6%22W/@38.9628747,-0.582278,18z/data=!3m1!4b1!4m4!3m3!8m2!3d38.9628726!4d-0.5809905?hl=es&entry=ttu",
      vacas: 3,
      capon: 1,
      toroEmbolado: 1,
      toro: 1,
      precio: 1200
    },
    {
      id: 3,
      fecha: '15/06/2024',
      hora: '12:30',
      pueblo: 'Canals',
      nombreEspectaculo: 'Suelta de vaquillas y toro embolado',
      ubicacion: "https://www.google.com/maps/place/38%C2%B057'46.3%22N+0%C2%B034'51.6%22W/@38.9628747,-0.582278,18z/data=!3m1!4b1!4m4!3m3!8m2!3d38.9628726!4d-0.5809905?hl=es&entry=ttu",
      vacas: 3,
      toroEmbolado: 1,
      vacaEmbolada: 1,
      precio: 1200
    },
    {
      id: 4,
      fecha: '16/06/2024',
      hora: '12:30',
      pueblo: 'Moixent',
      nombreEspectaculo: 'Toro en cuerda',
      ubicacion: "https://www.google.com/maps/place/38%C2%B057'46.3%22N+0%C2%B034'51.6%22W/@38.9628747,-0.582278,18z/data=!3m1!4b1!4m4!3m3!8m2!3d38.9628726!4d-0.5809905?hl=es&entry=ttu",
      toroEnCuerda: 1,
      otros: 'Toro en cuerda decorao con cintas de colores',
      precio: 1200
    },



  ];

  anyadirarray(event: Event) {
    const eventonuevo = {
      id: this.eventos.length + 1,
      fecha: this.fecha,
      hora: this.hora,
      pueblo: this.pueblo,
      nombreEspectaculo: this.nombreEspectaculo,
      ubicacion: this.ubicacion,
      toro: this.toro,
      vacas: this.vacas,
      capon: this.capon,
      otros: this.otros,
      precio: this.precio
    };

    // Agregar el nuevo evento al arreglo eventos
   

    // Limpiar los campos después de agregar el evento
    this.limpiarCampos();

    event.preventDefault();
  }

  limpiarCampos() {
    this.fecha = '';
    this.hora = '';
    this.pueblo = '';
    this.nombreEspectaculo = '';
    this.ubicacion = '';
    this.toro = undefined;
    this.vacas = undefined;
    this.capon = undefined;
    this.otros = '';
    this.precio = 0;
  }
}

