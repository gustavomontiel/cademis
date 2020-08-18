import { Component, OnInit } from '@angular/core';
import { CuentaCorriente } from '../../models/cuenta_corriente';
import { CuentaCorrienteService } from 'src/app/shared/services/cuentacorriente.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-colegiados-movimientos-cuenta',
  templateUrl: './colegiados-movimientos-cuenta.component.html',
  styleUrls: ['./colegiados-movimientos-cuenta.component.scss']
})
export class ColegiadosMovimientosCuentaComponent implements OnInit {

  cuentaCorriente: CuentaCorriente;

  constructor(
    public cuentaCorrienteService: CuentaCorrienteService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe( params => {
      const id = params.id;
      this.leerItem( id );
    } );

  }

  leerItem( id: string ) {
    this.cuentaCorrienteService.movimiesntosColegiado( id )
      .subscribe( resp => {
        this.cuentaCorriente = resp.data as CuentaCorriente;
        console.log( typeof this.cuentaCorriente );
      }
      );
  }

  verEstadoCuenta() {
    const url = this.router.url.split( '/' );
    url.pop();
    url.pop();
    url.push( 'colegiados-estado-cuenta' );
    const urlFinal = url.join( '/' ) + '/' + this.cuentaCorriente.colegiado.id;
    this.router.navigateByUrl( urlFinal );
  }


}
