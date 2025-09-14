import { Component, inject, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ModuloItem } from '../../interfaces/modulos/modulo-item';
import { Permission } from '../../function/permision';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
   isCollapsed = false;
  private $modulos = new Subject<ModuloItem[]>();
  public modulos: ModuloItem[] = [];
  public permision: Permission = inject(Permission);

  constructor() { }

  ngOnInit() {
    this.$modulos.next(this.permision.getPermission());
    this.$modulos.subscribe(mods => this.modulos = mods);
  }

  getModulos(): ModuloItem[] {
    return this.modulos;
  }

}
