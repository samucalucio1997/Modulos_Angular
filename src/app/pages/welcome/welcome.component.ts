import { Component, inject, OnInit, SimpleChange } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ModuloItem } from '../../interfaces/modulos/modulo-item';
import { Permission } from '../../function/permision';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
   isCollapsed = true;
  private $modulos = new Subject<ModuloItem[]>();
  public modulos: ModuloItem[] = [];
  public permision: Permission = inject(Permission);

  constructor() { }

  ngOnInit() {
    this.modulos = this.permision.getPermission();
  }

  getModulos(): ModuloItem[] {
    return this.modulos;
  }

}
