import { Component, OnInit } from '@angular/core';
import { Colegiado } from '../../models/colegiado.model';
import { ColegiadosService } from '../colegiados.service';
import { Router, ActivatedRoute } from '@angular/router';

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

@Component( {
  selector: 'app-colegiados-estado-cuenta',
  templateUrl: './colegiados-estado-cuenta.component.html',
  styleUrls: [ './colegiados-estado-cuenta.component.scss' ]
} )
export class ColegiadosEstadoCuentaComponent implements OnInit {

  colegiado: Colegiado;
  countries = [
    {
      name: 'Russia',
      flag: 'f/f3/Flag_of_Russia.svg',
      area: 17075200,
      population: 146989754
    },
    {
      name: 'Canada',
      flag: 'c/cf/Flag_of_Canada.svg',
      area: 9976140,
      population: 36624199
    },
    {
      name: 'United States',
      flag: 'a/a4/Flag_of_the_United_States.svg',
      area: 9629091,
      population: 324459463
    },
    {
      name: 'China',
      flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
      area: 9596960,
      population: 1409517397
    }
  ];

  constructor(
    public colegiadosService: ColegiadosService,
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
    this.colegiadosService.getItemById( id )
      .subscribe( resp => {
        this.colegiado = resp.data;
      }
      );
  }

  editarItem() {
    const url = this.router.url.split( '/' );
    url.pop();
    url.pop();
    url.push( 'colegiados-update' );
    const urlFinal = url.join( '/' ) + '/' + this.colegiado.id;
    this.router.navigateByUrl( urlFinal );
  }

}
