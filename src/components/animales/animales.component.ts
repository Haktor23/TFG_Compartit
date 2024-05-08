import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FirebaseService } from '../../firebase.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  imagenSeleccionada: string;



  constructor(private firebaseService: FirebaseService, private router: Router) { }

  ngOnInit(): void {
    console.log("Obteniendo animales...");
    this.obtenerdatos();
  }

  obtenerdatos() {

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

    this.router.navigate(['/info-animales', animalId]);
  }



  //******************************************************************************************************** */

  nuevoAnimal: any = {};
  imagenBase64: string = '';


  // Método para procesar el formulario y crear un nuevo animal
  crearAnimal(formulario: any) {
    if (formulario.valid) {

      const crotalExistente = this.animales.some(animal => animal.datos.crotal === this.nuevoAnimal.crotal);
      if (crotalExistente) {
        alert('El crotal ingresado ya está en uso. Por favor, elija otro.');
        return;
      }

      let imagenBase64 = this.imagenBase64;


      // Crear objeto con los datos del animal
      const nuevoAnimal = {
        crotal: this.nuevoAnimal.crotal,
        nombre: this.nuevoAnimal.nombre,
        numero: this.nuevoAnimal.numero,
        guarismo: this.nuevoAnimal.guarismo,
        genero: this.nuevoAnimal.genero,
        imagen: imagenBase64
      };


      this.firebaseService.subirAnimal(nuevoAnimal).then(() => {
        console.log('Animal creado correctamente.');
        formulario.reset();
        this.imagenBase64 = '';
        this.animales = []; 
        this.obtenerdatos();
      }).catch(error => {
        console.error('Error al crear el animal:', error);
      });
    } else {

      alert('Por favor, complete todos los campos.');
    }
  }

  // Método para convertir la imagen a base64 cuando se selecciona un archivo
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

        this.imagenBase64 = resizedImage; // Guardar la imagen redimensionada en base64
        this.imagenSeleccionada = resizedImage; // Mostrar la imagen en el formulario
      };
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      // Mostrar la imagen en gris predeterminada si no se selecciona ninguna imagen
      this.imagenBase64 = ''; // Limpiar la variable de la imagen base64
      this.imagenSeleccionada = '/src/assets/imageDefault.png'; // Ruta a la imagen en gris predeterminada
    }
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

  busquedatoro: string = '';
  busquedavaca: string = '';
  campoBusquedaVaca: string = 'nombre';
  campoBusquedaToro: string = 'nombre';

  // Método para filtrar animales según el término de búsqueda y el campo seleccionado
  filtrarAnimalesVaca(): any[] {
    if (!this.busquedavaca.trim()) {
      return this.animales; // Si no hay término de búsqueda, retornar todos los animales
    }



    return this.animales.filter(animal => {
      // Filtrar animales según el campo seleccionado y el término de búsqueda
      if (this.campoBusquedaVaca === 'nombre') {
        return animal.datos.nombre.toLowerCase().includes(this.busquedavaca.toLowerCase());
      } else if (this.campoBusquedaVaca === 'numero') {
        return animal.datos.numero.toString().includes(this.busquedavaca);
      } else if (this.campoBusquedaVaca === 'guarismo') { // Agregado para el campo guarismo
        return animal.datos.guarismo.toString().includes(this.busquedavaca);
      }
    });
  }

  filtrarAnimalesToro(): any[] {
    if (!this.busquedatoro.trim()) {
      return this.animales; // Si no hay término de búsqueda, retornar todos los animales
    }



    return this.animales.filter(animal => {
      // Filtrar animales según el campo seleccionado y el término de búsqueda
      if (this.campoBusquedaToro === 'nombre') {
        return animal.datos.nombre.toLowerCase().includes(this.busquedatoro.toLowerCase());
      } else if (this.campoBusquedaToro === 'numero') {
        return animal.datos.numero.toString().includes(this.busquedatoro);
      } else if (this.campoBusquedaToro === 'guarismo') { // Agregado para el campo guarismo
        return animal.datos.guarismo.toString().includes(this.busquedatoro);
      }
    });
  }

}





