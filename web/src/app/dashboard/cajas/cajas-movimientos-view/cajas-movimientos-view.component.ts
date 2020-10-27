import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/shared/services/can-deactivate.guard';
import { MovimientoCaja } from '../../models/movimiento-caja.model';
import { CajasService } from '../cajas.service';

@Component({
  selector: 'app-cajas-movimientos-view',
  templateUrl: './cajas-movimientos-view.component.html',
  styleUrls: ['./cajas-movimientos-view.component.scss']
})
export class CajasMovimientosViewComponent implements OnInit {

  movimientoCaja: MovimientoCaja;
  forma: FormGroup;

  constructor(
    public cajasService: CajasService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

  
  ngOnInit() {
    this.forma = new FormGroup({
      fecha: new FormControl(null, Validators.required),
      observacion: new FormControl(null, Validators.required),
      tipo_movimiento_caja_id: new FormControl(null, Validators.required),
      importe: new FormControl(null, Validators.required),
    });

    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.getItem(id);
    });
  }


  getItem(id: string) {

    this.cajasService.getMovimientoById(id)
      .subscribe(resp => {
        this.movimientoCaja = resp.data;

        this.forma.setValue({
          fecha: this.movimientoCaja.fecha,
          observacion: this.movimientoCaja.observacion,
          tipo_movimiento_caja_id: this.movimientoCaja.tipo_movimiento_caja_id,
          importe: this.movimientoCaja.importe,
        });

      });
  }


  permitirSalirDeRuta(): boolean | import('rxjs').Observable<boolean> | Promise<boolean> {
    return CanDeactivateGuard.confirmaSalirDeRuta(this.forma);
  }

  volver() {
    console.log('volver');
    const url = this.router.url.split('/');
    url.pop();
    url.pop();
    url.push('movimientos');
    this.router.navigateByUrl(url.join('/'));
  }

}
