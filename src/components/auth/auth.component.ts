import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../../firebase.service';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, FooterComponent]
})
export class AuthComponent {

  constructor(private firebaseService: FirebaseService, private router: Router) { }

  ngOnInit() {

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
      this.router.navigate(['/evento']);
    } catch (error) {
      this.error = "Correo electrónico o contraseña incorrectos.";
    }
  }
}
