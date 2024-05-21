import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FirebaseService } from '../../firebase.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  // Método para manejar el logout
  logout() {
    this.firebaseService.logout().then(() => {
      this.router.navigate(['/login']); // Redirigir a la página de login
    });
  }
}