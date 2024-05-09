import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../../firebase.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-vehiculo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar-vehiculo.component.html',
  styleUrl: './editar-vehiculo.component.css'
})
export class EditarVehiculoComponent implements OnInit {
  vehiculoId: string;
  vehiculoData: any = {};

  constructor(private route: ActivatedRoute, private router: Router, private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.vehiculoId = params['id'];
      this.obtenerDetallesVehiculo();
    });
  }

  obtenerDetallesVehiculo(): void {
    this.firebaseService.obtenerDetallesVehiculo(this.vehiculoId).subscribe(snapshot => {
      this.vehiculoData = snapshot.val();
    });
  }

  guardarCambios(): void {
    this.firebaseService.actualizarVehiculo(this.vehiculoId, this.vehiculoData).subscribe(() => {
      console.log('Vehículo actualizado correctamente');
      // Puedes realizar alguna acción adicional después de guardar los cambios, como navegar a la página de detalles del vehículo.
      this.router.navigate(['/info-vehiculo', this.vehiculoId]);
    });
  }
}