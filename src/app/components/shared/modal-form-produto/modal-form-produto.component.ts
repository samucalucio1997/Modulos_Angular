import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ImagemProdutoDTO, ProdutoDto } from '../../../interfaces/produto';
import { CategoriProduto } from '../../../enum/categori-produto';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { FileUtilService } from '../../../services/file-util.service';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProdutoService } from '../../../services/api/produto.service';
import { CORE_API_URL } from '../../../services/api/core.constants';

@Component({
  selector: 'app-modal-form-produto',
  templateUrl: './modal-form-produto.component.html',
  styleUrls: ['./modal-form-produto.component.css']
})
export class ModalFormProdutoComponent implements OnInit{
    readonly nzModalData = inject(NZ_MODAL_DATA);
    private API_URL: String = inject(CORE_API_URL);
    loadingFile: boolean = false;
    imagensProduto: String[] = [];
    previewVisible: boolean = false;
    fileList: NzUploadFile[] = [];
    previewImage: string | undefined = '';
    produtoForm!: FormGroup;
    produtoData?: ProdutoDto;
    isLoading: boolean = false;
    categorias: string[] = Object.values(CategoriProduto);

    private produtoService:ProdutoService = inject(ProdutoService);
    private fileUtil: FileUtilService = inject(FileUtilService);
    private modal: NzModalRef = inject(NzModalRef);
    private nzMessageService: NzMessageService = inject(NzMessageService);
    private frm: FormBuilder = inject(FormBuilder);
  
    ngOnInit(): void {
      if (this.nzModalData) {
        this.produtoData = this.nzModalData.produto as ProdutoDto;
        console.log('assim está vindo a lista de url imagens' + this.produtoData);
        this.produtoForm = this.frm.group({
            id: this.produtoData.id,
            nome: this.produtoData?.nome,
            codigo: this.produtoData?.id,
            precoUni: this.produtoData?.precoUni,
            quantidade: this.produtoData?.qtd,
            foto: this.produtoData?.imagens,
            descricao: this.produtoData?.descricao,
            categoriaSelecionada: this.produtoData?.categoria,
        });
        
        console.log('numeros de elementos na lista', this.produtoData.imagens?.length);

        this.addImagemLista();
      } else {
        this.produtoForm = this.frm.group({
            nome: ['', Validators.required],
            codigo: ['', Validators.required],
            precoUni: [0.0, Validators.required],
            quantidade: [1],
            foto: this.frm.array([]),
            descricao: ['', Validators.required],
            categoriaSelecionada: ['', Validators.required],
        });
      }
    }

    handleCancel(): void {
      this.modal.close();
      this.modal.destroy();
    }

    async handlePreview(file: NzUploadFile): Promise<void> {
      if (!file.url && file.originFileObj) {
        file.url = (await this.fileUtil.getBase64(file.originFileObj)) as string;
      }
      this.previewImage = file.url || '';
      this.previewVisible = true;
      console.log(this.previewImage);
    }

    handleOk(): void {
      this.isLoading = true;
      const produto: ProdutoDto = {
         id: this.produtoForm.get('id')?.value,
         nome: this.produtoForm.get('nome')?.value,
         qtd: this.produtoForm.get('quantidade')?.value,
         precoUni: this.produtoForm.get('precoUni')?.value,
         descricao: this.produtoForm.get('descricao')?.value,
         imagens: this.produtoForm.get('foto')?.value,
         categoria: this.produtoForm.get('categoriaSelecionada')?.value as CategoriProduto
       };

       if(!this.nzModalData){
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
       } else {
          this.produtoService.editarProduto(produto.id || 0, 
            produto.nome,
            produto.qtd,
            produto.categoria,
            produto.precoUni,
            produto.descricao,
            this.fileList)
          .subscribe({
           next: e => {
            this.nzMessageService.success("modificação feita com sucesso");            
            this.modal.close();
           },
           error: err => {
             console.log(err);
             this.nzMessageService.error("Erro ao editar produto")
             this.isLoading = false;
           },
           complete: () => {
               this.produtoForm = this.frm.group({
                   nome: ['', Validators.required],
                   codigo: ['', Validators.required],
                   quantidade: [1],
                   precoUni: [0.0, Validators.required],
                   descricao: ['', Validators.required],
                   foto: this.frm.array([]),
                   categoriaSelecionada: ['', Validators.required]
               }
              );
               this.isLoading = false;
           },
       });
       }
    }

    getCategoriaNome(categoria: string): string {
      if (categoria == null) {
        return '';
      }
      return typeof categoria === 'string' ? categoria : (CategoriProduto as any)[categoria];
    }

    addImagemLista():void {
      const imagensDto: ImagemProdutoDTO[] = this.produtoData?.imagens || [];
      imagensDto.forEach(imagem => {
        const nomeEncoded = encodeURIComponent(imagem.path);
        const image: NzUploadFile = {
          uid: String(imagem.id),
          name: imagem.path,
          url: `${this.API_URL}/files/img?nomeArquivo=${nomeEncoded}`
        };
        
        this.fileList.push(image);
      });

      console.log('lista de imagens => ', this.fileList);
    }



    get produtoFoto(): FormControl<ImagemProdutoDTO[]> {
      return this.produtoForm.get('foto') as FormControl<ImagemProdutoDTO[]>;
    }
}
