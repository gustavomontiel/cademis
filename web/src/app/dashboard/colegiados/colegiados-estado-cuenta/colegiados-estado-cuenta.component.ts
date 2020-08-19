import { Movimiento } from './../../models/movimiento.model';
import { Component, OnInit } from '@angular/core';
import { Colegiado } from '../../models/colegiado.model';
import { ColegiadosService } from '../colegiados.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CuentaCorrienteService } from 'src/app/shared/services/cuentacorriente.service';
import { CuentaCorriente } from '../../models/cuenta_corriente';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormErrorHandlerService } from 'src/app/shared/services/form-error-handler.service';
import { CanDeactivateGuard } from 'src/app/shared/services/can-deactivate.guard';


@Component( {
  selector: 'app-colegiados-estado-cuenta',
  templateUrl: './colegiados-estado-cuenta.component.html',
  styleUrls: [ './colegiados-estado-cuenta.component.scss' ]
} )
export class ColegiadosEstadoCuentaComponent implements OnInit {

  cuentaCorriente: CuentaCorriente;
  forma: FormGroup;
  movimientosFormArray: FormArray;

  constructor(
    public cuentaCorrienteService: CuentaCorrienteService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private formErrorHandlerService: FormErrorHandlerService
  ) { }

  ngOnInit() {
    this.forma = new FormGroup( {
      pago_a_cuenta: new FormControl( 0, Validators.required ),
      importe_pagado: new FormControl( 0, Validators.required ),
      movimientos: this.formBuilder.array( [] )
    } );

    this.activatedRoute.params.subscribe( params => {
      const id = params.id;
      this.leerItem( id );
    } );
  }

  leerItem( id: string ) {
    this.cuentaCorrienteService.cuentaColegiado( id )
      .subscribe( resp => {
        this.cuentaCorriente = resp.data;
        console.log( this.cuentaCorriente );
        this.agregarFormArrayMovimientos();
      }
      );
  }

  agregarFormArrayMovimientos() {
    this.cuentaCorriente.movimientos.forEach(
      mov => {
        const objMov = Movimiento.movFromJson( mov );
        const movimientoFormGroup = this.formBuilder.group( {
          id: [ mov.id, Validators.required ],
          descripcion: [ mov.descripcion, Validators.required ],
          fecha_vencimiento: [ mov.fecha_vencimiento, Validators.required ],
          importe: [ objMov.importe_a_mostrar, Validators.required ],
          saldoOriginal: [ objMov.saldo_a_mostrar, Validators.required ],
          saldo: [ objMov.saldo_a_mostrar, Validators.required ],
          importe_pagado: [ 0, Validators.required ],
          pagar: [ 0 ]
        } );
        ( this.forma.controls.movimientos as FormArray ).push( movimientoFormGroup );
      }
    );
  }

  confirmarPago() {

    if ( this.cuentaCorriente.importe_pagado <= 0 || !this.cuentaCorriente.importe_pagado  ) {

      Swal.fire( {
        title: 'Error',
        text: 'El importe a pagar tiene que ser mayor a cero',
        icon: 'error',
      } ).then( ( result ) => {
        return;
      } );
      return;
    }

    Swal.fire( {
      title: 'Guardar datos?',
      text: 'Confirma los datos?',
      icon: 'question',
      showCancelButton: true,
    } ).then( ( result ) => {

      if ( result.value ) {

        this.cuentaCorriente.movimientos = this.cuentaCorriente.movimientos.filter( mov => mov.importe_pagado > 0 );
        this.cuentaCorrienteService.confirmarPago( this.cuentaCorriente ).subscribe(
          resp => {
            this.forma.markAsPristine();
            Swal.fire( {
              title: 'Guardado!',
              html: 'Los datos fueron guardados correctamente.',
              icon: 'success',
              timer: 2000
            } ).then( res => {
              const url = this.router.url.split( '/' );
              url.pop();
              url.pop();
              this.router.navigateByUrl( url.join( '/' ) );
            } );
          },
          error => {
            // tslint:disable-next-line: no-unused-expression
            ( error instanceof HttpErrorResponse ) && this.formErrorHandlerService.fromServer( this.forma, error );
          }
        );


      }
    } );

  }


  cambioPagar() {
    this.calcularTotalPagado();
  }


  calcularTotalPagado() {

    // tslint:disable-next-line: no-unused-expression
    isNaN( this.forma.controls.pago_a_cuenta.value ) && this.forma.controls.pago_a_cuenta.setValue( 0 );

    let total = 0;

    const movimientos = ( this.forma.controls.movimientos as FormArray );

    movimientos.controls.forEach( mov => {

      if ( ( mov as FormGroup ).controls.pagar.value === true ) {

        // tslint:disable-next-line: no-unused-expression
        isNaN( ( mov as FormGroup ).controls.importe_pagado.value ) || !( ( mov as FormGroup ).controls.importe_pagado.value )
          && ( mov as FormGroup ).controls.importe_pagado.setValue( ( mov as FormGroup ).controls.saldoOriginal.value );

        total += ( mov as FormGroup ).controls.importe_pagado.value;
      } else {
        ( mov as FormGroup ).controls.importe_pagado.setValue( 0 );
      }

      // tslint:disable-next-line: max-line-length
      ( mov as FormGroup ).controls.saldo.setValue( ( mov as FormGroup ).controls.saldoOriginal.value - ( mov as FormGroup ).controls.importe_pagado.value );

      if ( ( mov as FormGroup ).controls.saldo.value < 0 ) {
        ( mov as FormGroup ).controls.saldo.setValue( ( mov as FormGroup ).controls.saldoOriginal.value );
        ( mov as FormGroup ).controls.importe_pagado.setValue( 0 );
      }

      const ori = this.cuentaCorriente.movimientos.find( orig => orig.id === ( mov as FormGroup ).controls.id.value );
      ori.importe_pagado = ( mov as FormGroup ).controls.importe_pagado.value;

    } );

    total += this.forma.controls.pago_a_cuenta.value;
    this.forma.controls.importe_pagado.setValue( total );
    this.cuentaCorriente.importe_pagado = total;
    this.cuentaCorriente.pago_a_cuenta = this.forma.controls.pago_a_cuenta.value;

  }

  verMovimientos() {
    const url = this.router.url.split( '/' );
    url.pop();
    url.pop();
    url.push( 'colegiados-movimientos-cuenta' );
    const urlFinal = url.join( '/' ) + '/' + this.cuentaCorriente.colegiado.id;
    this.router.navigateByUrl( urlFinal );
  }

  permitirSalirDeRuta(): boolean | import( 'rxjs' ).Observable<boolean> | Promise<boolean> {
    return CanDeactivateGuard.confirmaSalirDeRuta( this.forma );
  }

}
