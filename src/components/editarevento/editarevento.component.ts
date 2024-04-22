import { Component } from '@angular/core';
import { FirebaseService } from '../../firebase.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editarevento',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editarevento.component.html',
  styleUrl: './editarevento.component.css'
})
export class EditareventoComponent {
  eventoEditando: any = null;
evento: any;

  constructor(private firebaseService: FirebaseService) { }

  cargarEventoParaEditar(eventoId: string) {
    eventoId="-NvlVwPYAq0MS4sIXsKU"
    this.firebaseService.editarEvento(eventoId)
      .subscribe(evento => {
        this.eventoEditando = evento;
      });
  }

  actualizarEvento(eventoId: string) {
    this.firebaseService.actualizarEvento(eventoId, this.eventoEditando)
      .then(() => {
        console.log('Evento actualizado correctamente');
        // Opcional: puedes limpiar los datos del evento editando después de la actualización
        this.eventoEditando = null;
      })
      .catch(error => console.error('Error al actualizar el evento:', error));
  }
}
