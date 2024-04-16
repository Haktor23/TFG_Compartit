import { Component, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from './user.model';
import path from 'path';
import { EventosComponent } from '../eventos/eventos.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  error: String;
  firebaseService = inject(AuthService);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  constructor(private router: Router) { }

  ngOnInit(): void {

  }
  async submit() {

    if (this.form.valid) {

      const user = this.form.value;
      this.firebaseService.signIn(this.form.value as User)
        .then((resp => {

          console.log("aaaaaaaaaaaaaaaa" + resp);

          if (resp) {
            this.error = "Usuario logueado correctamente";
            this.router.navigate(['evento']);
          } else {
            this.error = "Correo incorrecto o contraseña incorrecta";
          }

        }
        ));

    } else {
      this.error = "Correo incorrecto o contraseña incorrecta";
    }
  }

}
