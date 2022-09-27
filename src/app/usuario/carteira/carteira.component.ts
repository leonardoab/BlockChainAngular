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
 }

  ngOnInit() {
    
    this.consultarTodasCarteiras();
  }

  consultarTodasCarteiras() {
    this.cursoService.BuscarTodasCarteiras().subscribe(
      data => {
        if (data) {
          this.carteiras = data;
          //this.carteiras = this.carteiras.carteiras;
        }
      });
  }

  
   





}
