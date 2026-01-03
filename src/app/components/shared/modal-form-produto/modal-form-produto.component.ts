import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from '../../../services/produto.service';
import { ProdutoDto } from '../../../interfaces/produto';
import { CategoriProduto } from '../../../enum/categori-produto';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable } from 'rxjs';
import { FileUtilService } from '../../../services/file-util.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-modal-form-produto',
  templateUrl: './modal-form-produto.component.html',
  styleUrls: ['./modal-form-produto.component.css']
})
export class ModalFormProdutoComponent {
    loadingFile: boolean = false;
    previewVisible: boolean = false;
    fileList: NzUploadFile[] = [];
    previewImage: string | undefined = '';
    produtoForm!: FormGroup;
    isLoading: boolean = false;
    categorias: string[] = Object.values(CategoriProduto);

    private produtoService:ProdutoService = inject(ProdutoService);
    private fileUtil: FileUtilService = inject(FileUtilService);
    private modal: NzModalRef = inject(NzModalRef);
    private nzMessageService: NzMessageService = inject(NzMessageService);

    constructor(private frm: FormBuilder) {
        this.produtoForm = this.frm.group({
            nome: ['', Validators.required],
            codigo: ['', Validators.required],
            precoUni: [0.0, Validators.required],
            quantidade: [1],
            foto: frm.array([]),
            descricao: ['', Validators.required],
            categoriaSelecionada: ['', Validators.required],
        });
    }

    handleCancel(): void {
      this.modal.close();
      this.modal.destroy();
    }

    async handlePreview(file: NzUploadFile): Promise<void> {
      if (!file.url) {
        await this.fileUtil.getBase64(file.originFileObj!);
      }
      this.previewImage = file.url;
      this.previewVisible = true;
      console.log(this.previewImage);
    }

    handleOk(): void {
      this.isLoading = true;
      const produto: ProdutoDto = {
         nome: this.produtoForm.get('nome')?.value,
         qtd: this.produtoForm.get('quantidade')?.value,
         precoUni: this.produtoForm.get('precoUni')?.value,
         descricao: this.produtoForm.get('descricao')?.value,
         imagens: this.produtoForm.get('foto')?.value,
         categoria: this.produtoForm.get('categoriaSelecionada')?.value as CategoriProduto
       };
       console.log('aqui é o array de fotos', this.fileList);
       this.produtoService.cadastrarProduto(produto, this.fileList)
       .subscribe(
        (resp) => { 
          console.log(resp);
          this.nzMessageService.success("Cadastro feito com sucesso");            
          this.modal.close();
        },
        err => {
          console.log(err);
          this.nzMessageService.error("Erro no cadastro!")
          this.isLoading = false;
        },
        () => {
            this.produtoForm = this.frm.group({
                nome: ['', Validators.required],
                codigo: ['', Validators.required],
                quantidade: [1],
                precoUni: [0.0, Validators.required],
                descricao: ['', Validators.required],
                foto: this.frm.array([]),
                categoriaSelecionada: ['', Validators.required]
            });
            this.isLoading = false;
        }
      );
      
    }

    resetForm(): void {

    }

    getCategoriaNome(categoria: string): string {
      if (categoria == null) {
        return '';
      }
      return typeof categoria === 'string' ? categoria : (CategoriProduto as any)[categoria];
    }
}
