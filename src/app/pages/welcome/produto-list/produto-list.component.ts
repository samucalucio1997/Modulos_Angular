import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriProduto } from '../../../enum/categori-produto';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrl: './produto-list.component.css'
})
export class ProdutoListComponent implements OnInit{
  formBuilder: FormBuilder = inject(FormBuilder);
  formProdutoFilter!: FormGroup;
  categorias = CategoriProduto;

  ngOnInit(): void {
    this.formProdutoFilter = this.formBuilder.group({
      preco: [0.0],
      categoria: []
    });
  }

  limparFiltros() {
    this.formProdutoFilter = this.formBuilder.group({
      preco: [0.0],
      categoria: []
    });
  }
}
