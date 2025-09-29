import { Component, inject, OnInit, SimpleChange } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ModuloItem } from '../../interfaces/modulos/modulo-item';
import { Permission } from '../../function/permision';
import { StorageServiceService } from '../../services/storage-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  isCollapsed = true;
  private $modulos = new Subject<ModuloItem[]>();
  private storageService: StorageServiceService = inject(StorageServiceService);
  public modulos: ModuloItem[] = [];
  public permision: Permission = inject(Permission);
  private router: Router = inject(Router)

  constructor() { }

  ngOnInit() {
    this.modulos = this.permision.getPermission();
  }

  getModulos(): ModuloItem[] {
    return this.modulos;
  }

  handlerLogOut(): void {
    this.storageService.removeItem('login');
    // window.location.href = '/login';
    console.log(this.storageService.getItem('login'));
    this.router.navigate(['/login']);
  }
}
