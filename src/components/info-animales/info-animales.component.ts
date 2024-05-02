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
  animalData: any;

  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService, private router: Router) { }

  @Input() id?: string;

  ngOnInit(): void {

    // Obtener el ID del animal de los parámetros de la ruta

    console.log(this.id);
    this.animalId = this.id;
    this.firebaseService.obtenerDetallesAnimal(this.animalId).subscribe(snapshot => {
      /* snapshot.forEach((childSnapshot: any) => {
         const animal = {
           id: childSnapshot.key,
           datos: childSnapshot.val()
 
         };
         this.animalData= animal.datos;
         console.log("Animal elegido:", this.animalData);
 
       });*/

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
      // También puedes actualizar animalData local si es necesario
      this.animalData.lesion = true;
    }).catch(error => console.error('Error al marcar animal como lesionado:', error));
  }



  editarAnimal(animalId: string) {
    // Navegar a la página de edición del animal, pasando el ID del animal como parámetro en la ruta
    this.router.navigate(['/editar-animales', animalId]);
  }
}
