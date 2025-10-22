import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrl: './cadastrar-produto.component.css'
})
export class CadastrarProdutoComponent implements OnInit{
  produtoForm!: FormGroup;
  public form: FormBuilder = inject(FormBuilder);
  
  ngOnInit(){
    this.initializerForm();
  }
  
  private initializerForm(): void{
    this.produtoForm = this.form.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      codigo: ['', [Validators.required]],
      preco: [null, [Validators.required, Validators.min(0)]],
      quantidade: [0, [Validators.min(0)]],
      descricao: ['']
    });  
  }
  
  onSubmit() {
  throw new Error('Method not implemented.');
  }
}
