import { Component, OnInit } from '@angular/core';
import { ColegiadosService } from '../colegiados.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Colegiado } from '../../models/colegiado.model';

@Component({
  selector: 'app-colegiados-view',
  templateUrl: './colegiados-view.component.html',
  styleUrls: ['./colegiados-view.component.scss']
})
export class ColegiadosViewComponent implements OnInit {

  colegiado: Colegiado;
  imgURL: string | ArrayBuffer;

  constructor(
    public colegiadosService: ColegiadosService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.leerItem(id);
    });

  }

  leerItem(id: string) {

    this.colegiadosService.getItemById(id)
      .subscribe(resp => {
        this.colegiado = resp.data;
        // tslint:disable-next-line: max-line-length
        this.imgURL = this.colegiado.persona.foto ? this.colegiadosService.crudService.getApiUrl() + '/' + this.colegiado.persona.foto : null;
      }
    );
  }

}
