export interface HistoriqueUtilisateur {
    id: number; //identifiant de l'entré pour database
    id_machine: number;
    serviceTag: string;  //fallback to id_machine ?
    date: Date;
    descritption: string;
}