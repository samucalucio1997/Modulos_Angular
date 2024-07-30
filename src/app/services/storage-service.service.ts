import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {
   
   
   public getItem(chave:any):object{
      try {
         var valor = localStorage.getItem(chave) as string;
         return JSON.parse(valor);
      } catch (error) {
        console.log(error);
        throw error;
      }
   }

   public setItem(chave:any, valor:any):void{
       localStorage.setItem(chave, valor);
   }

   public removeItem(chave:any){
      localStorage.removeItem(chave);
   }
  
}
