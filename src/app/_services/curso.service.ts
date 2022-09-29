import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { Curso } from "../_models/curso";
import { BaseService } from "./base.service";


@Injectable()
export class CursoService extends BaseService{

    UrlAPI = 'https://pos-infnet-catalogo-curso.azure-api.net/v1/api/'
    UrlAPIBlock = 'https://blockchain.azure-api.net/api/'
    //UrlAPI = 'https://pos-infnet-catalogo-curso.azurewebsites.net/api/'
    //UrlAPI = 'https://localhost:7262/api/'

    constructor(private httpClient: HttpClient) {
        super();
    }

    public consultarEixoTecnologico(){
        return this.httpClient.get(this.UrlAPI + 'eixoTecnologico/obter-todos')
            .pipe(catchError(this.handleError));
    }

    public consultarSegmento(){
        return this.httpClient.get(this.UrlAPI + 'segmento/obter-todos')
            .pipe(catchError(this.handleError));
    }

    public consultarModalidadeEducacao(){
        return this.httpClient.get(this.UrlAPI + 'modalidadeEducacao/obter-todos')
            .pipe(catchError(this.handleError));
    }

    public consultarTipoCurso(){
        return this.httpClient.get(this.UrlAPI + 'tipoCurso/obter-todos')
            .pipe(catchError(this.handleError));
    }

    public consultarModalidadeEnsino(){
        return this.httpClient.get(this.UrlAPI + 'modalidadeEnsino/obter-todos')
            .pipe(catchError(this.handleError));
    }

    public cadastrarCurso(curso: Curso){
        return this.httpClient.post(this.UrlAPI + 'curso/criar', curso)
            .pipe(catchError(this.handleError));
    }

    public editarCurso(curso: Curso){
        return this.httpClient.post(this.UrlAPI + 'curso/editar', curso)
            .pipe(catchError(this.handleError));
    }

    public consultarTodosCursos(){
        return this.httpClient.get(this.UrlAPI + 'curso/obter-todos')
        .pipe(catchError(this.handleError));
    }

    public consultarCursoPorId(cursoId: string){
        return this.httpClient.get(this.UrlAPI + 'curso/obter-por-id/' + cursoId)
        .pipe(catchError(this.handleError));
    }

    public excluirCurso(cursoId: string){
        return this.httpClient.post(this.UrlAPI + 'curso/excluir/' + cursoId, null)
        .pipe(catchError(this.handleError));
    }

    public BuscarTodosNfts(){
        return this.httpClient.get(this.UrlAPIBlock + 'Nft/ListarTodos')
        .pipe(catchError(this.handleError));
    }

    public BuscarTodasCarteiras(){
        return this.httpClient.get(this.UrlAPIBlock + 'Carteira/TodasCarteirasTodosTipos')
        .pipe(catchError(this.handleError));
    }


    public BuscarTodasCarteirasEmpresa(){
        return this.httpClient.get(this.UrlAPIBlock + 'Carteira/TodasCarteirasEmpresa')
        .pipe(catchError(this.handleError));
    }

    public BuscarTodasCarteirasPrivada(){
        return this.httpClient.get(this.UrlAPIBlock + 'Carteira/TodasCarteirasPrivada')
        .pipe(catchError(this.handleError));
    }

    public BuscarTodosHistoricos(){
        return this.httpClient.get(this.UrlAPIBlock + 'Historico/BuscarPorHistoricoPersonalizado?numeroTokens=0')
        .pipe(catchError(this.handleError));
    }

    public BuscarPorCodCarteira(codcarteira : string){
        return this.httpClient.get(this.UrlAPIBlock + 'Carteira/BuscarPorCodCarteira?codCarteira=' + codcarteira)
        .pipe(catchError(this.handleError));
    }

    public BuscarPorCodCarteiraHist(codcarteira : string){
        return this.httpClient.get(this.UrlAPIBlock + 'Historico/BuscarPorCodCarteira?codCarteira=' + codcarteira)
        .pipe(catchError(this.handleError));
    }


    public BuscarHistEmpresa(){
        return this.httpClient.get(this.UrlAPIBlock + 'Historico/BuscarPorHistoricoPersonalizado?TipoCarteira=Empresa&numeroTokens=0' )
        .pipe(catchError(this.handleError));
    }

    public BuscarHistPrivada(){
        return this.httpClient.get(this.UrlAPIBlock + 'Historico/BuscarPorHistoricoPersonalizado?TipoCarteira=Privada&numeroTokens=0' )
        .pipe(catchError(this.handleError));
    }

    public BuscarHistCem(){
        return this.httpClient.get(this.UrlAPIBlock + 'Historico/BuscarPorHistoricoPersonalizado?numeroTokens=100000' )
        .pipe(catchError(this.handleError));
    }

    public BuscarHistCotacao(){
        return this.httpClient.get(this.UrlAPIBlock + 'Historico/BuscarUltimaCotacao' )
        .pipe(catchError(this.handleError));
    }


}