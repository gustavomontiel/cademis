import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Caja } from '../../models/caja.model';
import { CajasService } from '../cajas.service';

@Component({
  selector: 'app-cajas-list',
  templateUrl: './cajas-list.component.html',
  styleUrls: ['./cajas-list.component.scss']
})
export class CajasListComponent implements OnInit {

  tableData: Caja[];
  dataSource: any;
  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = ['id', 'fecha_apertura', 'fecha_cierre', 'saldo', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('searchText', { static: true }) searchText;


  constructor(
    public cajasService: CajasService,
    private route: Router
  ) { }

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    this.cajasService.getItems()
      .subscribe(resp => {
        this.tableData = resp.data;
        /*
        this.tableData.sort( (a, b) => {
          if (a.id > b.id) {
            return -1;
          }
          if (a.id < b.id) {
            return 1;
          }
          return 0;
        });
        */
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
    url.push('cajas-create');
    this.route.navigateByUrl(url.join('/'));
  }


  editarItem(id: string) {
    const url = this.route.url.split('/');
    url.pop();
    url.push('cajas-update');
    this.route.navigateByUrl( url.join('/') + '/' + id );
  }

  
  borrarItem(item) {

    const url = this.route.url.split('/');
    url.pop();
    url.push('cajas-delete');
    this.route.navigateByUrl( url.join('/') + '/' + item.id );

    // Swal.fire({

    //   title: 'Confirmación?',
    //   text: 'Confirma eliminar el registro?',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonText: 'Si',
    //   cancelButtonText: 'Cancelar'

    // }).then((result) => {

    //   if (result.value) {
    //     this.cajasService.deleteItem(item)
    //       .subscribe(
    //         resp => {
    //           Swal.fire(
    //             'Eliminado!',
    //             'La operación ha sido realizada.',
    //             'success'
    //           );
    //           this.getTableData();
    //         },
    //         err => {
    //           Swal.fire(
    //             'Error!',
    //             'La operación no pudo realizarse.',
    //             'error'
    //           );
    //         }
    //       );
    //   }
    // });
  }

  verMovimientos(id: string) {
    const url = this.route.url.split('/');
    url.pop();
    url.push('cajas');
    this.route.navigateByUrl( url.join('/') + '/' + id + '/movimientos');
  }

}
