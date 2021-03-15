import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Usuario } from '../../models/usuario.model';
import { UsuariosService } from '../usuarios.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss']
})

export class UsuariosListComponent implements OnInit {

  tableData: Usuario[];
  dataSource: any;
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'rolenames', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    public usuariosService: UsuariosService,
    private route: Router
  ) { }

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    this.usuariosService.getItems()
      .subscribe(resp => {
        this.tableData = resp.data;
        this.dataSource = new MatTableDataSource(this.tableData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  agregarItem() {
    const url = this.route.url.split('/');
    url.pop();
    url.push('usuarios-create');
    this.route.navigateByUrl(url.join('/'));
  }

  editarItem(id: string) {
    const url = this.route.url.split('/');
    url.pop();
    url.push('usuarios-update');
    this.route.navigateByUrl( url.join('/') + '/' + id );
  }

  borrarItem(item) {

    const url = this.route.url.split('/');
    url.pop();
    url.push('usuarios-delete');
    this.route.navigateByUrl( url.join('/') + '/' + item.id );
   
  }

}
