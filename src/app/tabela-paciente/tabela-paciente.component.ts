import { Component, OnInit, input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tabela-paciente',
  templateUrl: './tabela-paciente.component.html',
  styleUrl: './tabela-paciente.component.css'
})
export class TabelaPacienteComponent implements OnInit{
  
public currentDate:number = Date.now();

form!:FormGroup;

constructor(private frm: FormBuilder){
  this.form = this.frm.group({
    grupo1: this.frm.array([]),
    filtro: this.frm.control(''),
    filtro2: this.frm.control('')
  });
}

lista: string[] = ['Willian', `Elton`, 'João', 'Maria'];
  
pessoaslist:{name:string, age:number}[] = [{name:'Willian',age:24},
  {name:'João',age:25},
  {name:'Elton',age:30},
  {name:'Maria',age:26}];  

ngOnInit(): void {
  this.form.get('filtro')?.valueChanges.subscribe((value) => {
     console.log(value);
     this.aplicarFiltro(value);
  });
  this.form.get('filtro2')?.valueChanges.subscribe((value) => {
    console.log(value);
    this.aplicarFiltro(value);
 });
}

dadoslist = this.pessoaslist;

aplicarFiltro(filtro:string){
  this.dadoslist = this.pessoaslist.filter((pessoa) => pessoa.name.includes(filtro));
}


get grupo(){
  return this.form.get('grupo1') as FormArray;
}

acrescentaCampo(tipo:string){
  const group = this.frm.group({
    tipo: [tipo]
  }) 

  this.grupo.push(this.frm.group({ isCheck: [false] }));
  
}

}
