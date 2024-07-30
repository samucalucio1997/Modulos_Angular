import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListaProfissionalService {
   profissionais: string[] = ['Lucas','Floriwaldo','Juca'];  
   
   
   ListaProfissionalService(): string[] {
     return this.profissionais;
   }
 

}
