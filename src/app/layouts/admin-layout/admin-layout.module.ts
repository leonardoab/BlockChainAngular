import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { CadastrarCursoComponent } from '../../curso/cadastrar-curso/cadastrar-curso.component';
import { ConsultarCursoComponent } from '../../curso/consultar-curso/consultar-curso.component';
import { CursoService } from '../../_services/curso.service';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    NgbModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers:[
    CursoService
  ],
  declarations: [
    CadastrarCursoComponent,
    ConsultarCursoComponent,
    
  ]
})

export class AdminLayoutModule {}
