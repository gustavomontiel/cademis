import { ColegiadosService } from './../colegiados.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Colegiado } from '../../models/colegiado.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-colegiados-list',
  templateUrl: './colegiados-list.component.html',
  styleUrls: ['./colegiados-list.component.scss']
})
export class ColegiadosListComponent implements OnInit {

  tableData: Colegiado[];
  dataSource: any;
  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = ['num_matricula', 'circunscripcion', 'persona.apellidos', 'persona.nombres', 'persona.numero_doc', 'estado.nombre', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('searchText', { static: true }) searchText;

  constructor(
    public colegiadosService: ColegiadosService,
    private route: Router
  ) { }

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    this.colegiadosService.getItems()
      .subscribe(resp => {
        console.log(resp);
        this.tableData = resp.data;
        this.dataSource = new MatTableDataSource(this.tableData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSource.filterPredicate =
          (data: Colegiado, filtersJson: string) => {
            const matchFilter = [];
            const filters = JSON.parse(filtersJson);

            filters.forEach(filter => {
              matchFilter.push(
                String(data.num_matricula).toLowerCase().includes(filter.value)
                ||
                data.circunscripcion.toLowerCase().includes(filter.value)
                ||
                data.persona.apellidos.toLowerCase().includes(filter.value)
                ||
                data.persona.nombres.toLowerCase().includes(filter.value)
                );
            });
            return matchFilter.every(Boolean);
          };

        if ( String( this.searchText.nativeElement.value ).length > 0 ) {
          this.applyFilter( this.searchText.nativeElement.value );
        }

      });
  }

  applyFilter(filterValue: string) {

    const tableFilters = [
      {
        value: filterValue.trim().toLowerCase()
      }
    ];

    this.dataSource.filter = JSON.stringify(tableFilters);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  agregarItem() {
    const url = this.route.url.split('/');
    url.pop();
    url.push('colegiados-create');
    this.route.navigateByUrl(url.join('/'));
  }

  verItem(id: string) {
    const url = this.route.url.split('/');
    url.pop();
    url.push('colegiados-view');
    this.route.navigateByUrl(url.join('/') + '/' + id);
  }

  editarItem(id: string) {
    const url = this.route.url.split('/');
    url.pop();
    url.push('colegiados-update');
    this.route.navigateByUrl(url.join('/') + '/' + id);
  }

  editarItemMasDatos(id: string) {
    const url = this.route.url.split('/');
    url.pop();
    url.push('colegiados-mas-datos');
    this.route.navigateByUrl(url.join('/') + '/' + id);
  }

  editarDirecciones(id: string) {
    const url = this.route.url.split('/');
    url.pop();
    url.push('colegiados-direcciones');
    this.route.navigateByUrl(url.join('/') + '/' + id);
  }

  verEstadoCuenta(id: string) {
    const url = this.route.url.split('/');
    url.pop();
    url.push('colegiados-estado-cuenta');
    this.route.navigateByUrl(url.join('/') + '/' + id);
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
        this.colegiadosService.deleteItem(item)
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
                'La operación no pudo realizarse.',
                'error'
              );
            }
          );
      }
    });
  }

}
