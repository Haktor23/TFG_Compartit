import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreareventoComponent } from "../components/crearevento/crearevento.component";
import { HeaderComponent } from "../components/header/header.component";
import { FooterComponent } from "../components/footer/footer.component";
import { AnimalesComponent } from "../components/animales/animales.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, CreareventoComponent, HeaderComponent, FooterComponent, AnimalesComponent]
})
export class AppComponent {
  title = 'tfghector';
}
