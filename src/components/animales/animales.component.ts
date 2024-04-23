import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FirebaseService } from '../../firebase.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-animales',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './animales.component.html',
  styleUrl: './animales.component.css'
})
export class AnimalesComponent {


  animales: any[] = [];
  


  constructor(private firebaseService: FirebaseService,private router: Router) { }

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

  imageUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
      this.selectedFile = file;
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      // Aquí puedes agregar la lógica para subir el archivo a tu servidor
      console.log('Archivo seleccionado:', this.selectedFile);
    } else {
      console.error('No se ha seleccionado ningún archivo.');
    }
  }
  

  verInformacion(animalId: string) {
    // Redirecciona al componente InfoAnimalesComponent con el ID del animal como parámetro
    this.router.navigate(['/info-animales', animalId]);
  }
}
