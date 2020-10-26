import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/shared/services/can-deactivate.guard';
import { FormErrorHandlerService } from 'src/app/shared/services/form-error-handler.service';
import Swal from 'sweetalert2';
import { Caja } from '../../models/caja.model';
import { CajasService } from '../cajas.service';

@Component({
  selector: 'app-cajas-update',
  templateUrl: './cajas-update.component.html',
  styleUrls: ['./cajas-update.component.scss']
})
export class CajasUpdateComponent implements OnInit {

  caja: Caja;
  forma: FormGroup;

  constructor(
    public cajasService: CajasService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private formErrorHandlerService: FormErrorHandlerService
  ) { }


  ngOnInit() {
    this.forma = new FormGroup({
      fecha_apertura: new FormControl(null, Validators.required),
      saldo: new FormControl(null, Validators.required),
    });

    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.getItem(id);
    });
  }


  getItem(id: string) {

    this.cajasService.getItemById(id)
      .subscribe(resp => {
        this.caja = resp.data;

        this.forma.setValue({
          fecha_apertura: this.caja.fecha_apertura,
          saldo: this.caja.saldo,
        });
      }
      );
  }


  updateItem() {

    if (this.forma.invalid) {
      this.formErrorHandlerService.fromLocal(this.forma);
      return;
    }

    Swal.fire({
      title: 'Guardar cambios?',
      text: 'Confirma los cambios?',
      icon: 'question',
      showCancelButton: true,
    }).then((result) => {

      if (result.value) {

        const item = { ... this.forma.value, id: this.caja.usuario_id };

        this.cajasService.updateItem(item).subscribe(
          resp => {
            Swal.fire(
              'Guardado!',
              'Los cambios fueron guardados correctamente.',
              'success'
            );
            this.forma.markAsPristine();
          },
          error => {
            // tslint:disable-next-line: no-unused-expression
            (error instanceof HttpErrorResponse) && this.formErrorHandlerService.fromServer(this.forma, error);
          }
        );
      }
    });

  }
  

  permitirSalirDeRuta(): boolean | import('rxjs').Observable<boolean> | Promise<boolean> {
    return CanDeactivateGuard.confirmaSalirDeRuta(this.forma);
  }

}
