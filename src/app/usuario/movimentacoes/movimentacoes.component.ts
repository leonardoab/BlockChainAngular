import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CursoService } from '../../_services/curso.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movimentacoes',
  templateUrl: './movimentacoes.component.html',
  styleUrls: ['./movimentacoes.component.css']
})
export class MovimentacoesComponent implements OnInit {

  historicos;
  codigoCarteira: string = '';

  constructor(private cursoService: CursoService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    
    this.consultarTodosHistoricos();
  }

  consultarTodosHistoricos() {
    this.cursoService.BuscarTodosHistoricos().subscribe(
      data => {
        if (data) {
          this.historicos = data;
          this.historicos = this.historicos.historicos;
        }
      });
  }

  BuscarPorCodCarteira() {
    console.log(this.codigoCarteira);
    this.cursoService.BuscarPorCodCarteiraHist(this.codigoCarteira).subscribe(
      data => {
        if (data) {
          this.historicos = data;
          //this.carteiras = this.carteiras.carteiras;
        }
      });
    
  }


}
