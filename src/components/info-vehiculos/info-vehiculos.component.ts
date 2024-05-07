import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../firebase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-vehiculos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-vehiculos.component.html',
  styleUrl: './info-vehiculos.component.css'
})
export class InfoVehiculosComponent implements OnInit {
  vehiculoData: any;
  @Input() id?: string;
  vehiculoId: string;
  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.vehiculoId = this.id;
    console.log("id", this.id);
    this.firebaseService.obtenerDetallesVehiculo(this.vehiculoId).subscribe(snapshot => {
      this.vehiculoData = snapshot.val();
      console.log(this.vehiculoData);
    });
  }

}