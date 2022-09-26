import { Historico } from './Historico';
import { Transacao } from './Transacao';
import { Nft } from './Nft';

export class Carteira  {
  
    Id?: String;    
    NumeroTransacoes?: number;
    Rank?: number;
    Saldo?: number;
    SaldoDiario?: number;    
    TipoCarteira?: string; 
    CodigoCarteira: string;
    DataVerificacao: string;

    Historicos?: Historico;
    Transacoes?: Transacao;  
    Nfts?: Nft;

}