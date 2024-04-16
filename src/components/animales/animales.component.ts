import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-animales',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './animales.component.html',
  styleUrl: './animales.component.css'
})
export class AnimalesComponent {

  vacas = [
    { nombre: 'Vaca 1', raza: 'Holstein', peso: 500, edad: 3 },
    { nombre: 'Vaca 1', raza: 'Holstein', peso: 500, edad: 3 },
    { nombre: 'Vaca 1', raza: 'Holstein', peso: 500, edad: 3 },
    { nombre: 'Vaca 1', raza: 'Holstein', peso: 500, edad: 3 },
    { nombre: 'Vaca 1', raza: 'Holstein', peso: 500, edad: 3 },
    { nombre: 'Vaca 1', raza: 'Holstein', peso: 500, edad: 3 },
    { nombre: 'Vaca 1', raza: 'Holstein', peso: 500, edad: 3 },
    { nombre: 'Vaca 1', raza: 'Holstein', peso: 500, edad: 3 },
    { nombre: 'Vaca 1', raza: 'Holstein', peso: 500, edad: 3 },
    { nombre: 'Vaca 1', raza: 'Holstein', peso: 500, edad: 3 },
    { nombre: 'Vaca 1', raza: 'Holstein', peso: 500, edad: 3 },
    { nombre: 'Vaca 1', raza: 'Holstein', peso: 500, edad: 3 },
    { nombre: 'Vaca 1', raza: 'Holstein', peso: 500, edad: 3 },
    { nombre: 'Vaca 1', raza: 'Holstein', peso: 500, edad: 3 },
    { nombre: 'Vaca 1', raza: 'Holstein', peso: 500, edad: 3 },
    { nombre: 'Vaca 1', raza: 'Holstein', peso: 500, edad: 3 },
    


  ];
}
