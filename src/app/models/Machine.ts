export interface Machine {
    id: number; //identifiant pour la database, sequence
    type: string, //Laptop,Desktop,Workstation
    marque: string;
    modele: string;
    serviceTag: string;
    reseau: string;
    assignedUser: string;
    emplacement: string;
    //caracteristique
    os: string;
    cpu: string;
    ram: Number; //En Go
    typeStockage: string; //HDD ou SSD
    tailleStockage: Number; //en Go

    dateAchat: Date;
    dateExpirationGarantie: Date;
    vendeur: string;
    commentaire: string;
}