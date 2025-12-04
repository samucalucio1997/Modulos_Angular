import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from '../../../services/produto.service';
import { ProdutoDto } from '../../../interfaces/produto';
import { CategoriProduto } from '../../../enum/categori-produto';

@Component({
  selector: 'app-modal-form-produto',
  templateUrl: './modal-form-produto.component.html',
  styleUrls: ['./modal-form-produto.component.css']
})
export class ModalFormProdutoComponent {
    isVisible: boolean = true;
    produtoForm!: FormGroup;
    categorias: string[] = Object.values(CategoriProduto);
    private produtoService:ProdutoService = inject(ProdutoService);

    constructor(private frm: FormBuilder) {
        this.produtoForm = this.frm.group({
            nome: ['', Validators.required],
            codigo: ['', Validators.required],
            precoUni: [0.0, Validators.required],
            quantidade: [1],
            descricao: ['', Validators.required],
            categoriaSelecionada: ['', Validators.required],//
        });
    }

    handleCancel(): void {
      this.isVisible = false;
    }

    handleOk(): void {
      const produto: ProdutoDto = {
         nome: this.produtoForm.get('nome')?.value,
         qtd: this.produtoForm.get('quantidade')?.value,
         precoUni: this.produtoForm.get('precoUni')?.value,
         descricao: this.produtoForm.get('descricao')?.value,
         categoria: this.produtoForm.get('categoriaSelecionada')?.value as CategoriProduto
       }
       this.produtoService.cadastrarProduto(produto)
       .subscribe(
        (resp) => {
         console.log(resp);
        },
        err => {
          console.log(err);
        }
      );
       this.produtoForm = this.frm.group({
            nome: ['', Validators.required],
            codigo: ['', Validators.required],
            quantidade: [1],
            precoUni: [0.0, Validators.required],
            descricao: ['', Validators.required],
            categoriaSelecionada: ['', Validators.required],
       });

      this.isVisible = false;
    }

    getCategoriaNome(categoria: string): string {
      if (categoria == null) {
        return '';
      }
      return typeof categoria === 'string' ? categoria : (CategoriProduto as any)[categoria];
    }
}
