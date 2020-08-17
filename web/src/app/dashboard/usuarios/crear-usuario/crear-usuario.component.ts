import { UsuariosService } from './../usuarios.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { PuedeDesactivar, CanDeactivateGuard } from '../../../shared/services/can-deactivate.guard';
import { HttpErrorResponse } from '@angular/common/http';
import { FormErrorHandlerService } from 'src/app/shared/services/form-error-handler.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit, PuedeDesactivar {

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
      password: new FormControl('', Validators.required),
    });
  }

  crearUsuario() {

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
        const user = { ... this.forma.value };
        console.log(user);

        this.usuariosService.createItem(user).subscribe(
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
              url.push('editar-usuario');
              this.router.navigateByUrl(url.join('/'));
              console.log(url);
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
