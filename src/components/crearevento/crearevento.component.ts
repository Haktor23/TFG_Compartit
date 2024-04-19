import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from '../../firebase.service';
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'app-crearevento',
    standalone: true,
    templateUrl: './crearevento.component.html',
    styleUrl: './crearevento.component.css',
    imports: [CommonModule, ReactiveFormsModule, FormsModule, HeaderComponent]
})
export class CreareventoComponent implements OnInit {

  constructor(private firebaseService: FirebaseService) {

  }
  ngOnInit(): void {
  }
  crearevento() {
    this.firebaseService.crearEventos(this.form.value.fecha, this.form.value.hora, this.form.value.pueblo, this.form.value.ubicacion, this.form.value.nombreEspectaculo, this.form.value.vacas, this.form.value.toro, this.form.value.capon, this.form.value.otros, this.form.value.precio);
  }

  form = new FormGroup({
    fecha: new FormControl('', [Validators.required, Validators.pattern('[0-9]{2}/[0-9]{2}/[0-9]{4}')]),
    hora: new FormControl('', [Validators.required]),
    pueblo: new FormControl('', [Validators.required]),
    nombreEspectaculo: new FormControl('', [Validators.required]),
    ubicacion: new FormControl('', [Validators.required]),
    vacas: new FormControl('', [Validators.required]),
    toro: new FormControl('', [Validators.required]),
    capon: new FormControl('', [Validators.required]),
    otros: new FormControl('', [Validators.required]),
    precio: new FormControl('', [Validators.required])
  });

  fecha: string = '';
  hora: string = '';
  pueblo: string = '';
  nombreEspectaculo: string = '';
  ubicacion: string = '';
  vacas?: number | undefined;
  capon?: number | undefined;
  toro?: number | undefined;
  otros?: string | undefined;
  precio: number = 0;


}

