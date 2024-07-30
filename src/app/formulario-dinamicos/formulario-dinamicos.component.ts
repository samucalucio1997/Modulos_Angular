import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario-dinamicos',
  templateUrl: './formulario-dinamicos.component.html',
  styleUrl: './formulario-dinamicos.component.css'
})
export class FormularioDinamicosComponent implements OnInit{
  nome:string = '';
  public aba:boolean = true;
  
  ngOnInit() {
    console.log('Praticas de Formularios Dinamicos');
  }

  selecionarAba1(){
    this.aba = true;
  }

  selecionarAba2(){
    this.aba = false;
  }
}
