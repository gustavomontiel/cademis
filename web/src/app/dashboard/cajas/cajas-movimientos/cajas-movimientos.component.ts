import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2';
import { Caja } from "../../models/caja.model";
import { MovimientoCaja } from '../../models/movimiento-caja.model';
import { CajasService } from "../cajas.service";

@Component({
  selector: "app-cajas-movimientos",
  templateUrl: "./cajas-movimientos.component.html",
  styleUrls: ["./cajas-movimientos.component.scss"],
})
export class CajasMovimientosComponent implements OnInit {
  caja: Caja;

  tableData: MovimientoCaja[];
  dataSource: any;
  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = ['id', 'fecha', 'observacion', 'importe', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('searchText', { static: true }) searchText;


  constructor(
    public cajasService: CajasService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {}


  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.getItem(id);
    });
  }


  getItem(id: string) {
    this.cajasService.getItemById(id).subscribe((resp) => {
      this.caja = resp.data;
      this.tableData = this.caja.movimientos;
        this.tableData.sort( (a, b) => {
          if (a.id > b.id) {
            return -1;
          }
          if (a.id < b.id) {
            return 1;
          }
          return 0;
        });
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
    console.log('agregarItem');
    const url = this.router.url.split('/');
    url.pop();
    url.push('movimientos-create');
    this.router.navigateByUrl(url.join('/'));
  }


  verItem(id: string) {
    const url = this.router.url.split('/');
    url.pop();
    url.push('movimientos-view');
    this.router.navigateByUrl( url.join('/') + '/' + id );
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
        this.cajasService.deleteMovimiento(item)
          .subscribe(
            resp => {
              Swal.fire(
                'Eliminado!',
                'La operación ha sido realizada.',
                'success'
              );
              this.getItem(this.caja.id.toString());
            },
            err => {
              Swal.fire(
                'Error!',
                'La operación no pudo realizarse.',
                'error'
              );
            }
          );
      }
    });
  }


}
