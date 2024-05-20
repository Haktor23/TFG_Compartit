import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../firebase.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-info-vehiculos',
    standalone: true,
    templateUrl: './info-vehiculos.component.html',
    styleUrl: './info-vehiculos.component.css',
    imports: [CommonModule, FooterComponent]
})
export class InfoVehiculosComponent implements OnInit {
  vehiculoData: any;
  @Input() id?: string;
  vehiculoId: string;
  constructor(private router: Router, private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.vehiculoId = this.id;
    console.log("id", this.id);
    this.firebaseService.obtenerDetallesVehiculo(this.vehiculoId).subscribe(snapshot => {
      this.vehiculoData = snapshot.val();
      console.log(this.vehiculoData);
    });
  }

  eliminarVehiculo(vehiculoId: string): void {
    this.firebaseService.eliminarVehiculo(vehiculoId).subscribe(() => {
      console.log('Vehículo eliminado correctamente');
      this.router.navigate(['/vehiculos']);
    });
  }

  editarVehiculo(vehiculoId: string): void {
    this.router.navigate(['/editar-vehiculo', vehiculoId]);
  }

  volverVerVehiculos(): void {
    this.router.navigate(['/vehiculos']);
  }
}