import { PuedeDesactivar, CanDeactivateGuard } from '../../../shared/services/can-deactivate.guard';
import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { FormErrorHandlerService } from 'src/app/shared/services/form-error-handler.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit, PuedeDesactivar {

  usuario: Usuario;
  forma: FormGroup;

  constructor(
    public usuariosService: UsuariosService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private formErrorHandlerService: FormErrorHandlerService
  ) { }

  ngOnInit() {

    this.forma = new FormGroup({
      name: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      // rol: new FormControl(null, [Validators.required]),
      password: new FormControl(null),
    });

    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.leerItem(id);
    });

  }

  leerItem(id: string) {

    this.usuariosService.getItemById(id)
      .subscribe(resp => {
        this.usuario = resp.data;
        console.log(this.usuario);
        this.forma.setValue({
          name: this.usuario.name,
          username: this.usuario.username,
          email: this.usuario.email,
          password: ''
          // roleNames: this.usuario.roleNames[0] ? this.usuario.roleNames[0] : '',
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

        const item = { ... this.forma.value, id: this.usuario.id } as Usuario;
        item.password = item.password.length < 3 ? null : item.password;

        this.usuariosService.updateItem(item).subscribe(
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
