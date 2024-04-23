import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../firebase.service';

@Component({
  selector: 'app-info-animales',
  standalone: true,
  imports: [],
  templateUrl: './info-animales.component.html',
  styleUrl: './info-animales.component.css'
})
export class InfoAnimalesComponent implements OnInit {
  animalId: string;
  animalData: any;

  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    // Obtener el ID del animal de los parámetros de la ruta
    this.route.params.subscribe(params => {
      this.animalId = params['id'];
      // Llamar al servicio Firebase para obtener los detalles del animal
      this.firebaseService.obtenerDetallesAnimal(this.animalId).subscribe(data => {
        this.animalData = data;
      });
    });
  }
}
