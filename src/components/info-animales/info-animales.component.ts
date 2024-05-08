import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  @Input() id?: string;
  animalData: any;

  constructor(private firebaseService: FirebaseService, private router: Router) { }



  ngOnInit(): void {
    console.log(this.id);
    this.animalId = this.id;
    this.firebaseService.obtenerDetallesAnimal(this.animalId).subscribe(snapshot => {
      this.animalData = snapshot.val();
      console.log(this.animalData);
    });
  }

  eliminarAnimal(animalId: string) {
    this.firebaseService.eliminarAnimal(animalId);
    this.router.navigate(['/animales']);
  }

  marcarComoLesionado(animalId: string) {
    this.firebaseService.marcarAnimalComoLesionado(animalId).then(() => {
      console.log('Animal marcado como lesionado correctamente');
      this.animalData.lesion = true;
      this.router.navigate(['/animales']);
    }).catch(error => console.error('Error al marcar animal como lesionado:', error));
  }



  editarAnimal(animalId: string) {
    // Navegar a la página de edición del animal, pasando el ID del animal como parámetro en la ruta
    this.router.navigate(['/editar-animales', animalId]);
  }
}
