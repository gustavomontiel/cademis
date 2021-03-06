import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Tasa } from '../../models/tasa.model';
import { TasasService } from './../tasas.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasas-list',
  templateUrl: './tasas-list.component.html',
  styleUrls: ['./tasas-list.component.scss']
})

export class TasasListComponent implements OnInit {
  
  tableData: Tasa[];
  dataSource: any;
  displayedColumns: string[] = ['id', 'tasa', 'fecha', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    public tasasService: TasasService,
    private route: Router
  ) {}

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    this.tasasService.getItems()
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
    url.push('tasas-create');
    this.route.navigateByUrl(url.join('/'));
  }

  editarItem(id: string) {
    const url = this.route.url.split('/');
    url.pop();
    url.push('tasas-update');
    this.route.navigateByUrl( url.join('/') + '/' + id );
  }

  borrarItem(item) {

    Swal.fire({

      title: 'Confirmación?',
      text: 'Confirma eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'

    }).then((result) => {

      if (result.value) {
        this.tasasService.deleteItem(item)
          .subscribe(
            resp => {
              Swal.fire(
                'Eliminado!',
                'La operación ha sido realizada.',
                'success'
              );
              this.getTableData();
            },
            err => {
              Swal.fire(
                'Error!',
                'La operación no pudo realizarse. ',
                'error'
              );
            }
          );
      }
    });
  }



}
