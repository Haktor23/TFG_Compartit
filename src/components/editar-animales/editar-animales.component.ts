import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../../firebase.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-animales',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar-animales.component.html',
  styleUrl: './editar-animales.component.css'
})
export class EditarAnimalesComponent implements OnInit {
  animalId: string;
  animalData: any;
  imagenBase64: string = ''; // Variable para almacenar la imagen en base64

  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.animalId = params['id'];
      this.firebaseService.obtenerDetallesAnimal(this.animalId).subscribe(snapshot => {
        this.animalData = snapshot.val();
      });
    });
  }

  guardarCambios() {
    this.firebaseService.actualizarAnimal(this.animalId, this.animalData).then(() => {
      console.log('Animal actualizado correctamente');
    }).catch(error => {
      console.error('Error al actualizar el animal:', error);
    });
  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        canvas.width = 600;
        canvas.height = 450;
        ctx.drawImage(img, 0, 0, 600, 450);
        const resizedImage = canvas.toDataURL('image/jpeg');

        this.imagenBase64 = resizedImage;
        this.animalData.imagen = resizedImage;
      };
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }
}