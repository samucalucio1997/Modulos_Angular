import { Component, OnInit } from '@angular/core';
import { ListaProfissionalService } from '../../../services/lista-profissional.service';

@Component({
  selector: 'app-modal-profissional',
  templateUrl: './modal-profissional.component.html',
  styleUrl: './modal-profissional.component.css'
})
export class ModalProfissionalComponent implements OnInit{
  public profissionaisLista: string[] = [];
  
  selectedValue: any;
  
  constructor(private profissionais: ListaProfissionalService) {}
  
  ngOnInit(): void {
    this.profissionaisLista = this.profissionais.ListaProfissionalService();
  }
  
  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!',this.selectedValue);
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  } 

}
