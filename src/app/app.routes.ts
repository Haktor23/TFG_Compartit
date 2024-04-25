import { Routes } from '@angular/router';
import { CreareventoComponent } from '../components/crearevento/crearevento.component';
import { EventosComponent } from '../components/eventos/eventos.component';
import { AnimalesComponent } from '../components/animales/animales.component';
import { AuthComponent } from '../components/auth/auth.component';
import { EditareventoComponent } from '../components/editarevento/editarevento.component';
import { InfoAnimalesComponent } from '../components/info-animales/info-animales.component';

export const routes: Routes = [

    {
        path: 'auth',
        component: AuthComponent
    },
    {
        path: 'crearevento',
        component: CreareventoComponent
    },
    {
        path: 'evento',
        component: EventosComponent
    },
    {
        path: 'animales',
        component: AnimalesComponent
    }, 
    {
        path: 'editarevento',
        component: EditareventoComponent
    },  {
        path: 'info-animales/:id',
        component: InfoAnimalesComponent
    }, 
    {
        path: '**',
        component: AuthComponent
    }
];
