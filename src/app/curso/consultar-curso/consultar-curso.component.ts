import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CursoService } from '../../_services/curso.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consultar-curso',
  templateUrl: './consultar-curso.component.html'
})
export class ConsultarCursoComponent implements OnInit {

  cursos;
  cursoId;
  nfts;

  @ViewChild('lgModalConfirmarExclusao') public lgModalConfirmarExclusao: ModalDirective;

  constructor(private cursoService: CursoService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.consultarTodosCursos();
    this.consultarTodosNft();
  }

  consultarTodosCursos() {
    this.cursoService.consultarTodosCursos().subscribe(
      data => {
        if (data) {
          this.cursos = data;
          this.cursos = this.cursos.cursos;
        }
      });;
  }


  consultarTodosNft() {
    this.cursoService.BuscarTodosNfts().subscribe(
      data => {
        if (data) {
          this.nfts = data;
          this.nfts = this.nfts.nfts;
        }
      });;
  }


  irParaDetalhes(cursoId: string) {
    this.router.navigate(['consultar-curso/' + cursoId]);
  }

  irParaEdicao(cursoId: string) {
    this.router.navigate(['editar-curso/' + cursoId]);
  }

  modalConfirmarExclusao(cursoId: string) {
    this.cursoId = cursoId;
    this.lgModalConfirmarExclusao.show();
  }

  excluir(){
    this.excluirCurso(this.cursoId);
  }

  excluirCurso(cursoId: string) {
    console.log(cursoId)
    this.cursoService.excluirCurso(cursoId).subscribe(
      data => {
        if (data) {

          this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Curso excluído com sucesso.', '', {
            timeOut: 8000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-success alert-with-icon",
            positionClass: 'toast-top-right'
          });

          this.lgModalConfirmarExclusao.hide();

          window.location.reload();
        }
      });;
  }
}
