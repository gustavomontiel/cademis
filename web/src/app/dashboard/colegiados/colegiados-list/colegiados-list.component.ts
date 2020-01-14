import { ColegiadosService } from './../colegiados.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Colegiado } from '../../models/colegiado.model';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
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
  displayedColumns: string[] = ['num_matricula', 'circunscripcion', 'persona.apellidos', 'persona.nombres', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

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
    url.push('crear-colegiado');
    this.route.navigateByUrl(url.join('/'));
  }

  editarItem(id: string) {
    const url = this.route.url.split('/');
    url.pop();
    url.push('editar-colegiado');
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
