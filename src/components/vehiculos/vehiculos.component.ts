import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../firebase.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";
import { Router } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-vehiculos',
    standalone: true,
    templateUrl: './vehiculos.component.html',
    styleUrl: './vehiculos.component.css',
    imports: [FormsModule, HeaderComponent, ReactiveFormsModule, FooterComponent]
})
export class VehiculosComponent implements OnInit {

    vehiculos: any[] = [];
    nuevoVehiculo: any = {};
    mostrarFormulario: boolean = false;

    constructor(private firebaseService: FirebaseService, private router: Router) { }

    ngOnInit(): void {
        this.obtenerVehiculos();
    }

    obtenerVehiculos() {
        this.firebaseService.obtenerVehiculos().subscribe(
            (data: any) => {
                // Limpiar vehículos anteriores
                this.vehiculos = [];
                // Iterar sobre los datos recibidos y agregarlos al arreglo de vehículos
                data.forEach((vehiculo: any) => {
                    this.vehiculos.push({
                        id: vehiculo.key,
                        modeloVehiculo: vehiculo.val().modeloVehiculo,
                        matricula: vehiculo.val().matricula,
                        numeroBastidor: vehiculo.val().numeroBastidor,
                        km: vehiculo.val().km,
                        proximaItv: vehiculo.val().proximaItv,
                        observaciones: vehiculo.val().observaciones
                    });
                });
            },
            (error: any) => {
                console.error('Error al obtener vehículos:', error);
            }
        );
    }

    agregarVehiculo() {
        // Verificar que el nuevo vehículo no esté vacío
        if (Object.keys(this.nuevoVehiculo).length === 0) {
            alert('Por favor completa todos los campos del formulario.');
            return;
        }

        // Verificar si la matrícula ya existe en la base de datos
        const matriculaExistente = this.vehiculos.find(vehiculo => vehiculo.matricula === this.nuevoVehiculo.matricula);
        if (matriculaExistente) {
            alert('La matrícula ingresada ya existe en la base de datos.');
            return;
        }

        // Agregar el nuevo vehículo a la base de datos
        this.firebaseService.agregarVehiculo(this.nuevoVehiculo).then(() => {
            console.log('Vehículo añadido correctamente.');
            // Limpiar el formulario y volver a cargar los vehículos
            this.nuevoVehiculo = {};
            this.obtenerVehiculos();
        }).catch((error: any) => {
            console.error('Error al añadir vehículo:', error);
        });
    }

    infoVehiculo(id: string) {
        this.router.navigate(['/info-vehiculo', id]);
    }

    toggleFormulario() {
        this.mostrarFormulario = !this.mostrarFormulario;
    }
}
