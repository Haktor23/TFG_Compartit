import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from './user.model';
import { Router } from '@angular/router';
import { FirebaseService } from '../../firebase.service';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  constructor(private firebaseService: FirebaseService, private router: Router) { }

  ngOnInit() {
    if (Token == null) {
      this.router.navigate(['/login']);
    }
  }


  error: String;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  async login(): Promise<void> {
    const { email, password } = this.form.value;
    try {
      await this.firebaseService.login(email, password);
      // Esperar a que la autenticación tenga éxito antes de redirigir
      this.router.navigate(['/evento']);
    } catch (error) {
      // Manejar el error de inicio de sesión
      this.error = "Correo electrónico o contraseña incorrectos.";
    }
  }
  
}
