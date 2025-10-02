import { Component, inject, OnInit } from '@angular/core';
import { StorageServiceService } from '../../../services/storage-service.service';
import { UsuarioResponse } from '../../../interfaces/usuario-request';
import { Permission } from '../../../function/permision';
import { ModuloItem } from '../../../interfaces/modulos/modulo-item';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private permissoesList: Permission = inject(Permission);
  public modulos: ModuloItem[] = [];

  ngOnInit() {
      this.modulos = this.permissoesList.getPermission();
  }

}
