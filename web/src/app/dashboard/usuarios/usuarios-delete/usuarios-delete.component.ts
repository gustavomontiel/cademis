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
  selector: 'app-usuarios-delete',
  templateUrl: './usuarios-delete.component.html',
  styleUrls: ['./usuarios-delete.component.scss']
})
export class UsuariosDeleteComponent implements OnInit {

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

  deleteItem() {

    Swal.fire({
      title: "Confirmación?",
      text: "Confirma eliminar el registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        this.usuariosService.deleteItem(this.usuario).subscribe(
          (resp) => {
            Swal.fire({
              icon: "success",
              title: "Eliminado!",
              text: "La operación ha sido realizada.",
              timer: 2000,
            }).then(() => {
              const url = this.router.url.split('/');
              url.pop();
              url.pop();
              url.push('usuarios-list');
              this.router.navigateByUrl( url.join('/') );
            });
          },
          (err) => {
            Swal.fire("Error!", "La operación no pudo realizarse.", "error");
          }
        );
      }
    });

  }

  

  permitirSalirDeRuta(): boolean | import('rxjs').Observable<boolean> | Promise<boolean> {
    return CanDeactivateGuard.confirmaSalirDeRuta(this.forma);
  }

}
