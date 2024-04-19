import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../firebase.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-crearevento',
  standalone: true,
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css',
  imports: [HeaderComponent]
})
export class EventosComponent implements OnInit {
  eventos: any[] = []; 

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
