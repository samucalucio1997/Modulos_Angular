import { Injectable } from '@angular/core';
import { StorageServiceService } from './storage-service.service';

const CHAVERECUSA = 'MeuAceite.v1';

@Injectable({
  providedIn: 'root'
})
export class CheckDatasService {
  
  constructor(
    private storageService: StorageServiceService
  ){}

  aceiteRecusaDatas(id:number): void{
       const idRecusa:object = this.storageService.getItem(id);
       if (!idRecusa) {
          this.storageService.setItem(id,true);
       }else{
          this.storageService.removeItem(id);
       }
  }

  carregarVerificaRecusaDatas(id:number):boolean{
       var y = this.storageService.getItem(id);
       console.log(y)
       return !!y;
  }


  chaveRecusa(chave: string):string{
     return `${CHAVERECUSA}.${chave}`
  }
}
