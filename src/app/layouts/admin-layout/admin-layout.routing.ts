import { Routes } from '@angular/router';

import { CadastrarCursoComponent } from '../../curso/cadastrar-curso/cadastrar-curso.component';
import { ConsultarCursoComponent } from '../../curso/consultar-curso/consultar-curso.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'cadastrar-curso', component: CadastrarCursoComponent },
    { path: 'consultar-curso', component: ConsultarCursoComponent },
    { path: 'consultar-curso/:id', component: CadastrarCursoComponent},
    { path: 'editar-curso/:id', component: CadastrarCursoComponent},
    

];
