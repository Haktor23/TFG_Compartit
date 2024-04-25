import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FirebaseService } from '../../firebase.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";


@Component({
  selector: 'app-animales',
  standalone: true,
  templateUrl: './animales.component.html',
  styleUrl: './animales.component.css',
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule, FormsModule, HeaderComponent]
})
export class AnimalesComponent {


  animales: any[] = [];



  constructor(private firebaseService: FirebaseService, private router: Router) { }

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

  verInformacion(animalId: string) {
    // Redirecciona al componente InfoAnimalesComponent con el ID del animal como parámetro
    this.router.navigate(['/info-animales', animalId]);
  }



  //******************************************************************************************************** */

  nuevoAnimal: any = {}; // Objeto para almacenar los datos del nuevo animal
  imagenBase64: string = ''; // Variable para almacenar la imagen en formato base64


  // Método para procesar el formulario y crear un nuevo animal
  crearAnimal(formulario: any) {
    if (formulario.valid && this.imagenBase64 !== '') { // Verificar si el formulario es válido y se ha seleccionado una imagen
      // Crear objeto con los datos del animal
      const nuevoAnimal = {
        crotal: this.nuevoAnimal.crotal,
        nombre: this.nuevoAnimal.nombre,
        numero: this.nuevoAnimal.numero,
        guarismo: this.nuevoAnimal.guarismo,
        genero: this.nuevoAnimal.genero,
        imagen: this.imagenBase64 // Guardar la imagen en formato base64
      };

      // Subir el nuevo animal a Firebase
      this.firebaseService.subirAnimal(nuevoAnimal).then(() => {
        console.log('Animal creado correctamente.');
        formulario.reset(); // Limpiar el formulario después de crear el animal
        this.imagenBase64 = ''; // Limpiar la variable de la imagen base64
      }).catch(error => {
        console.error('Error al crear el animal:', error);
      });
    } else {
      // Mostrar mensaje de error si el formulario no es válido o falta la imagen
      alert('Por favor, complete todos los campos y seleccione una imagen.');
    }
  }

  // Método para convertir la imagen a base64 cuando se selecciona un archivo
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.imagenBase64 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  marcarAnimalComoCurado(animalId: string) {
    this.firebaseService.marcarAnimalComoCurado(animalId).then(() => {
      console.log('Animal marcado como curado correctamente.');
      // Actualizar localmente el estado del animal como curado
      const animalIndex = this.animales.findIndex(animal => animal.id === animalId);
      if (animalIndex !== -1) {
        this.animales[animalIndex].datos.lesion = false;
      }
    }).catch(error => {
      console.error('Error al marcar el animal como curado:', error);
    });
  }

  /* Filtrar animales */

  busqueda: string = ''; // Término de búsqueda
  campoBusquedaVaca: string = 'nombre'; // Campo de búsqueda por defecto
  campoBusquedaToro: string = 'nombre';
  // Método para filtrar animales según el término de búsqueda y el campo seleccionado
  filtrarAnimalesVaca(): any[] {
    if (!this.busqueda.trim()) {
      return this.animales; // Si no hay término de búsqueda, retornar todos los animales
    }



    return this.animales.filter(animal => {
      // Filtrar animales según el campo seleccionado y el término de búsqueda
      if (this.campoBusquedaVaca === 'nombre') {
        return animal.datos.nombre.toLowerCase().includes(this.busqueda.toLowerCase());
      } else if (this.campoBusquedaVaca === 'numero') {
        return animal.datos.numero.toString().includes(this.busqueda);
      } else if (this.campoBusquedaVaca === 'guarismo') { // Agregado para el campo guarismo
        return animal.datos.guarismo.toString().includes(this.busqueda);
      }
    });
  }

  filtrarAnimalesToro(): any[] {
    if (!this.busqueda.trim()) {
      return this.animales; // Si no hay término de búsqueda, retornar todos los animales
    }



    return this.animales.filter(animal => {
      // Filtrar animales según el campo seleccionado y el término de búsqueda
      if (this.campoBusquedaToro === 'nombre') {
        return animal.datos.nombre.toLowerCase().includes(this.busqueda.toLowerCase());
      } else if (this.campoBusquedaToro === 'numero') {
        return animal.datos.numero.toString().includes(this.busqueda);
      } else if (this.campoBusquedaToro === 'guarismo') { // Agregado para el campo guarismo
        return animal.datos.guarismo.toString().includes(this.busqueda);
      }
    });
  }
}



