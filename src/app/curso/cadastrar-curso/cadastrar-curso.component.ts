import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CursoService } from '../../_services/curso.service';

@Component({
  selector: 'app-cadastrar-curso',
  templateUrl: './cadastrar-curso.component.html'
})
export class CadastrarCursoComponent implements OnInit {

  eixoTecnologico;
  segmento;
  modalidadeEducacao;
  tipoCurso;
  modalidadeEnsino;
  cadastroCursoForm: FormGroup;
  funcionalidade: string;
  cursoId: string;
  curso;
  tituloPagina: string;


  constructor(private cursoService: CursoService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute) {
  }


  ngOnInit() {

    this.configurarFormulario();

    this.activatedRoute.url.subscribe(
      url => {

        this.funcionalidade = url[0].path;

        if (this.funcionalidade == 'editar-curso') {
          this.tituloPagina = 'Editar Curso'
          this.cursoId = url[1].path;
          this.consultarCursoPorId(this.cursoId)
        }

        if (this.funcionalidade == 'consultar-curso') {
          this.tituloPagina = 'Detalhes do Curso'
          this.cursoId = url[1].path;
          this.consultarCursoPorId(this.cursoId)
        }

        if (this.funcionalidade == 'cadastrar-curso') {
          this.tituloPagina = 'Novo Curso'
        }

      });
  }

  consultarCursoPorId(cursoId: string) {
    this.cursoService.consultarCursoPorId(cursoId).subscribe(
      data => {
        if (data) {
          this.curso = data;
          this.curso = this.curso.curso;

          this.preencherCampos();

        }
      });;
  }

  preencherCampos() {
    this.cadastroCursoForm.get('nome').setValue(this.curso.nome);
    this.cadastroCursoForm.get('cargaHoraria').setValue(this.curso.cargaHoraria);
    this.cadastroCursoForm.get('objetivo').setValue(this.curso.objetivo);
    this.cadastroCursoForm.get('bibliografia').setValue(this.curso.bibliografia);
    this.cadastroCursoForm.get('avaliacao').setValue(this.curso.avaliacao);
    this.cadastroCursoForm.get('certificacao').setValue(this.curso.certificacao);
    this.cadastroCursoForm.get('eixoTecnologicoId').setValue(this.curso.eixoTecnologico.id);
    this.cadastroCursoForm.get('segmentoId').setValue(this.curso.segmento.id);
    this.cadastroCursoForm.get('modalidadeEducacaoId').setValue(this.curso.modalidadeEducacao.id);
    this.cadastroCursoForm.get('tipoCursoId').setValue(this.curso.tipoCurso.id);
    this.cadastroCursoForm.get('modalidadeEnsinoId').setValue(this.curso.modalidadeEnsino.id);

    if (this.tituloPagina == 'Detalhes do Curso') {
      this.cadastroCursoForm.get('nome').disable();
      this.cadastroCursoForm.get('cargaHoraria').disable();
      this.cadastroCursoForm.get('objetivo').disable();
      this.cadastroCursoForm.get('bibliografia').disable();
      this.cadastroCursoForm.get('avaliacao').disable();
      this.cadastroCursoForm.get('certificacao').disable();
      this.cadastroCursoForm.get('eixoTecnologicoId').disable();
      this.cadastroCursoForm.get('segmentoId').disable();
      this.cadastroCursoForm.get('modalidadeEducacaoId').disable();
      this.cadastroCursoForm.get('tipoCursoId').disable();
      this.cadastroCursoForm.get('modalidadeEnsinoId').disable();
    }

  }

  configurarFormulario() {

    this.cadastroCursoForm = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.required],
      cargaHoraria: [null, Validators.required],
      objetivo: [null, Validators.maxLength(500)],
      bibliografia: [null, Validators.maxLength(500)],
      avaliacao: [null, Validators.maxLength(500)],
      certificacao: [null, Validators.maxLength(500)],
      eixoTecnologicoId: [null, Validators.required],
      segmentoId: [null, Validators.required],
      modalidadeEducacaoId: [null, Validators.required],
      tipoCursoId: [null, Validators.required],
      modalidadeEnsinoId: [null, Validators.required]
    });

    this.preencherEixoTecnologico();
    this.preencherSegmento();
    this.preencherModalidadeEducacao();
    this.preencherTipoCurso();
    this.preencherModalidadeEnsino();
  }

  preencherModalidadeEnsino() {
    this.cursoService.consultarModalidadeEnsino().subscribe(
      data => {
        if (data) {
          this.modalidadeEnsino = data;
          this.modalidadeEnsino = this.modalidadeEnsino.modalidadesEnsino;
        }
      });
  }

  preencherTipoCurso() {
    this.cursoService.consultarTipoCurso().subscribe(
      data => {
        if (data) {
          this.tipoCurso = data;
          this.tipoCurso = this.tipoCurso.tiposCurso;
        }
      });
  }

  preencherModalidadeEducacao() {
    this.cursoService.consultarModalidadeEducacao().subscribe(
      data => {
        if (data) {
          this.modalidadeEducacao = data;
          this.modalidadeEducacao = this.modalidadeEducacao.modalidadesEducacao;
        }
      });
  }

  preencherSegmento() {
    this.cursoService.consultarSegmento().subscribe(
      data => {
        if (data) {
          this.segmento = data;
          this.segmento = this.segmento.segmentos
        }
      });
  }

  preencherEixoTecnologico() {
    this.cursoService.consultarEixoTecnologico().subscribe(
      data => {
        if (data) {
          this.eixoTecnologico = data;
          this.eixoTecnologico = this.eixoTecnologico.eixosTecnologico
        }
      });
  }

  gravar() {
   
    if (this.cadastroCursoForm.valid) {

      if (this.cursoId){
      
        this.cadastroCursoForm.get('id').setValue(this.cursoId);
        this.editarCurso();
      
      }else{
        
        this.cadastrarCurso();

      }

    } else {

      if (this.cadastroCursoForm.get('nome').value == null)
        this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>O campo Nome é obrigatório.', '', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-warning alert-with-icon",
          positionClass: 'toast-top-right'
        })

      if (this.cadastroCursoForm.get('cargaHoraria').value == null)
        this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>O campo Carga Horária é obrigatório.', '', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-warning alert-with-icon",
          positionClass: 'toast-top-right'
        })

      if (this.cadastroCursoForm.get('eixoTecnologicoId').value == null)
        this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>O campo Eixo Tecnológico é obrigatório.', '', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-warning alert-with-icon",
          positionClass: 'toast-top-right'
        })

      if (this.cadastroCursoForm.get('segmentoId').value == null)
        this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>O campo Segmento é obrigatório.', '', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-warning alert-with-icon",
          positionClass: 'toast-top-right'
        })

      if (this.cadastroCursoForm.get('modalidadeEducacaoId').value == null)
        this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>O campo Modalidade de Educação é obrigatório.', '', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-warning alert-with-icon",
          positionClass: 'toast-top-right'
        })

      if (this.cadastroCursoForm.get('tipoCursoId').value == null)
        this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>O campo Tipo de Curso é obrigatório.', '', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-warning alert-with-icon",
          positionClass: 'toast-top-right'
        })

      if (this.cadastroCursoForm.get('modalidadeEnsinoId').value == null)
        this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>O campo Modalidade de Ensino é obrigatório.', '', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-warning alert-with-icon",
          positionClass: 'toast-top-right'
        })
    }
  }

  cadastrarCurso() {
    this.cursoService.cadastrarCurso(this.cadastroCursoForm.value)
      .subscribe(
        data => {
          if (data) {

            this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Curso cadastrado com sucesso.', '', {
              timeOut: 8000,
              closeButton: true,
              enableHtml: true,
              toastClass: "alert alert-success alert-with-icon",
              positionClass: 'toast-top-right'
            });

            this.cadastroCursoForm.reset();
          }
        },
        (error: any) => this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Ocorreu um erro, entre em contato com o administrador.', '', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-error alert-with-icon",
          positionClass: 'toast-top-right'
        }));
  }

  editarCurso() {

    console.log(this.cadastroCursoForm.value)

    this.cursoService.editarCurso(this.cadastroCursoForm.value)
      .subscribe(
        data => {
          if (data) {

            this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Curso editado com sucesso.', '', {
              timeOut: 8000,
              closeButton: true,
              enableHtml: true,
              toastClass: "alert alert-success alert-with-icon",
              positionClass: 'toast-top-right'
            });

          }
        },
        (error: any) => this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Ocorreu um erro, entre em contato com o administrador.', '', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-error alert-with-icon",
          positionClass: 'toast-top-right'
        }));
  }
}
