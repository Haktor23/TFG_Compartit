import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from '../../firebase.service';

@Component({
  selector: 'app-animales',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './animales.component.html',
  styleUrl: './animales.component.css'
})
export class AnimalesComponent {


  animales: any[] = [];


  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    console.log("Obteniendo animales...");

    this.firebaseService.obtenerAnimales().subscribe((snapshot: any) => {
      snapshot.forEach((childSnapshot: any) => {
        const animal = {
          id: childSnapshot.key,
          datos: childSnapshot.val()

        };
        this.animales.push(animal);
        console.log("Eventos:", this.animales);

      });
    });
  }
}
