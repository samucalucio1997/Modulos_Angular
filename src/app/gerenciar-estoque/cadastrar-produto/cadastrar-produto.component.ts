import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrl: './cadastrar-produto.component.css'
})
export class CadastrarProdutoComponent implements OnInit{
onSubmit() {
throw new Error('Method not implemented.');
}
  produtoForm!: FormGroup;
  public form: FormBuilder = inject(FormBuilder);
  
  ngOnInit(){
     this.produtoForm = this.form.group({
        
     });
  }
  
}
