import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../firebase.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  eventos: any[] = []; // Array para almacenar los eventos

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    console.log("Obteniendo eventos...");

    this.firebaseService.obtenerEventos().subscribe((snapshot: any) => {
      snapshot.forEach((childSnapshot: any) => {
        const evento = {
          id: childSnapshot.key,
          datos: childSnapshot.val()
          
        };
        this.eventos.push(evento);
      console.log("Eventos:", this.eventos);
      
      });
    });
  }
}
