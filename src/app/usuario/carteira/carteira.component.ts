import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CursoService } from '../../_services/curso.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-carteira',
  templateUrl: './carteira.component.html',
  styleUrls: ['./carteira.component.css']
})


export class CarteiraComponent implements OnInit {

  carteiras;
  codigoCarteira: string = '';
  historicoscotacao;

  constructor(private cursoService: CursoService,
    private router: Router,
    private toastr: ToastrService
  ) { 

   

  }

  BuscarCarteirasEmpresa(){
    this.cursoService.BuscarTodasCarteirasEmpresa().subscribe(
      data => {
        if (data) {
          this.carteiras = data;
          //this.carteiras = this.carteiras.carteiras;
        }
      });
      this.codigoCarteira =  '';
 }

 BuscarCarteirasPrivada(){
  this.cursoService.BuscarTodasCarteirasPrivada().subscribe(
    data => {
      if (data) {
        this.carteiras = data;
        //this.carteiras = this.carteiras.carteiras;
      }
    });
    this.codigoCarteira =  '';
}

  ngOnInit() {
    
    this.consultarTodasCarteiras();
    this.BuscarUltimaCotacao();
  }

  consultarTodasCarteiras() {
    this.cursoService.BuscarTodasCarteiras().subscribe(
      data => {
        if (data) {
          this.carteiras = data;
          //this.carteiras = this.carteiras.carteiras;
        }
      });
      this.codigoCarteira =  '';
  }


  BuscarPorCodCarteira() {
    console.log(this.codigoCarteira);
    this.cursoService.BuscarPorCodCarteira(this.codigoCarteira).subscribe(
      data => {
        if (data) {
          this.carteiras = data;
          //this.carteiras = this.carteiras.carteiras;
        }
      });
    
  }

  BuscarUltimaCotacao() {
    console.log(this.codigoCarteira);
    this.cursoService.BuscarHistCotacao().subscribe(
      data => {
        if (data) {
          this.historicoscotacao = data;
          
        }
      });
    
  }

  

  
   





}
