import { Routes } from '@angular/router';
import { CreareventoComponent } from '../components/crearevento/crearevento.component';
import { EventosComponent } from '../components/eventos/eventos.component';
import { AnimalesComponent } from '../components/animales/animales.component';
import { AuthComponent } from '../components/auth/auth.component';
import { InfoAnimalesComponent } from '../components/info-animales/info-animales.component';
import { EditarEventosComponent } from '../components/editar-eventos/editar-eventos.component';
import { EditarAnimalesComponent } from '../components/editar-animales/editar-animales.component';
import { VehiculosComponent } from '../components/vehiculos/vehiculos.component';
import { InfoVehiculosComponent } from '../components/info-vehiculos/info-vehiculos.component';

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
        path: 'editar-evento/:id',
        component: EditarEventosComponent
    }, {
        path: 'info-animales/:id',
        component: InfoAnimalesComponent
    },
    {
        path: 'editar-animales/:id',
        component: EditarAnimalesComponent
    },
    {
        path: 'vehiculos',
        component: VehiculosComponent
    },
    {
        path: 'info-vehiculo/:id',
        component: InfoVehiculosComponent
    },
    {
        path: '**',
        component: AuthComponent
    }
];
