import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../../firebase.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-eventos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar-eventos.component.html',
  styleUrl: './editar-eventos.component.css'
})
export class EditarEventosComponent implements OnInit {
  evento: any; // Objeto para almacenar los datos del evento a editar
  eventoId: string; // ID del evento a editar

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
    // Obtener el ID del evento de los parámetros de la URL
    this.route.params.subscribe(params => {
      this.eventoId = params['id'];
      // Llamar al método en el servicio para obtener los detalles del evento
      this.firebaseService.editarEvento(this.eventoId).subscribe(evento => {
        this.evento = evento.val(); // Asignar los datos del evento al objeto evento
      });
    });
  }

  guardarCambios(): void {

    this.firebaseService.actualizarEvento(this.eventoId, this.evento)
      .then(() => {
        console.log('Evento actualizado correctamente');
        this.router.navigate(['/evento']);
      })
      .catch(error => console.error('Error al actualizar el evento:', error));
  }
}