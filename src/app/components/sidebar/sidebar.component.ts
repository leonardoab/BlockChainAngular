import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    
    //{ path: '/cadastrar-curso', title: 'Cadastrar',  icon:'files_single-copy-04', class: '' },
    //{ path: '/consultar-curso', title: 'Consultar',  icon:'design_bullet-list-67', class: '' },
    { path: '/carteiras', title: 'Carteiras',  icon:'design_bullet-list-67', class: '' },
    { path: '/movimentacoes', title: 'Movimentações',  icon:'design_bullet-list-67', class: '' }


];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
