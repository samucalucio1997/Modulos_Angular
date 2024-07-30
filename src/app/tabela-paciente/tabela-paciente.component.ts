import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tabela-paciente',
  templateUrl: './tabela-paciente.component.html',
  styleUrl: './tabela-paciente.component.css'
})
export class TabelaPacienteComponent implements OnInit{
  
public currentDate:number = Date.now();

form!:FormGroup;

constructor(private frm: FormBuilder){}
  

ngOnInit(): void {
  const pessoas = [{name:'Willian',age:24}]  
  this.form = this.frm.group({
    grupo1: this.frm.array([])
  });
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
