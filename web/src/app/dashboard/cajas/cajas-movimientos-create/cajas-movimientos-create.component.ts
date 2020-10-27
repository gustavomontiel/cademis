import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/shared/services/can-deactivate.guard';
import { FormErrorHandlerService } from 'src/app/shared/services/form-error-handler.service';
import Swal from 'sweetalert2';
import { MovimientoCaja } from '../../models/movimiento-caja.model';
import { CajasService } from '../cajas.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-cajas-movimientos-create',
  templateUrl: './cajas-movimientos-create.component.html',
  styleUrls: ['./cajas-movimientos-create.component.scss']
})
export class CajasMovimientosCreateComponent implements OnInit {

  movimientoCaja: MovimientoCaja;
  forma: FormGroup;
  caja_id: number;

  constructor(
    public cajasService: CajasService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private formErrorHandlerService: FormErrorHandlerService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    const hoy = new Date().toISOString().substring(0, 10);
    this.forma = new FormGroup({
      fecha: new FormControl(hoy, Validators.required),
      observacion: new FormControl(null, Validators.required),
      tipo_movimiento_caja_id: new FormControl(1, Validators.required),
      importe: new FormControl(null, Validators.required),
    });
    console.log(this.forma);
    
    this.activatedRoute.params.subscribe(params => {
      this.caja_id = params.id;
    });

  }


  permitirSalirDeRuta(): boolean | import('rxjs').Observable<boolean> | Promise<boolean> {
    return CanDeactivateGuard.confirmaSalirDeRuta(this.forma);
  }


  volver() {
    console.log('volver');
    const url = this.router.url.split('/');
    url.pop();
    url.push('movimientos');
    this.router.navigateByUrl(url.join('/'));
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
        item.usuario_id = this.authService.usuario.id;
        item.caja_id = this.caja_id;
        console.log(item);

        this.cajasService.createMovimiento(item).subscribe(
          resp => {

            Swal.fire({
              title: 'Guardado!',
              html: 'Los datos fueron guardados correctamente.',
              icon: 'success',
              timer: 2000
            }).then(res => {
              this.volver();
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

}
