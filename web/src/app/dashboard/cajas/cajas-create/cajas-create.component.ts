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
  selector: 'app-cajas-create',
  templateUrl: './cajas-create.component.html',
  styleUrls: ['./cajas-create.component.scss']
})
export class CajasCreateComponent implements OnInit {

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
  }

  createItem() {

    if (this.forma.invalid) {
      this.formErrorHandlerService.fromLocal(this.forma);
      return;
    }

    Swal.fire({
      title: 'Guardar datos?',
      text: 'Confirma los datos?',
      icon: 'question',
      showCancelButton: true,
    }).then((result) => {

      if (result.value) {
        const item = { ... this.forma.value };
        item.usuario_id = 1;

        this.cajasService.createItem(item).subscribe(
          resp => {

            Swal.fire({
              title: 'Guardado!',
              html: 'Los datos fueron guardados correctamente.',
              icon: 'success',
              timer: 2000
            }).then(res => {
              this.forma.markAsPristine();
              const url = this.router.url.split('/');
              url.pop();
              url.push('caja-list');
              this.router.navigateByUrl(url.join('/'));
            });
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
