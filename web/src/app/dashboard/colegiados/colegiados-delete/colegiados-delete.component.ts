import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ColegiadosService } from "../colegiados.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Colegiado } from "../../models/colegiado.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { FormErrorHandlerService } from "src/app/shared/services/form-error-handler.service";
import { HttpErrorResponse } from "@angular/common/http";
import { CanDeactivateGuard } from "src/app/shared/services/can-deactivate.guard";

@Component({
  selector: "app-colegiados-delete",
  templateUrl: "./colegiados-delete.component.html",
  styleUrls: ["./colegiados-delete.component.scss"],
})
export class ColegiadosDeleteComponent implements OnInit {
  colegiado: Colegiado;
  forma: FormGroup;
  imgURL: string | ArrayBuffer;

  constructor(
    public colegiadosService: ColegiadosService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private formErrorHandlerService: FormErrorHandlerService
  ) {}

  ngOnInit() {
    this.forma = new FormGroup({
      persona: new FormGroup({
        nombres: new FormControl(null, [Validators.required]),
        apellidos: new FormControl(null, [Validators.required]),
        tipo_doc: new FormControl({ value: null, disabled: true }, [
          Validators.required,
        ]),
        numero_doc: new FormControl(null, [Validators.required]),
        cuit_cuil: new FormControl(null, [Validators.required]),
        foto: new FormControl(null),
      }),
      num_matricula: new FormControl(null, Validators.required),
      fecha_matricula: new FormControl(null, Validators.required),
      folio: new FormControl(null, Validators.required),
      libro: new FormControl(null, Validators.required),
      legajo: new FormControl(null),
      circunscripcion: new FormControl(null, Validators.required),
      estado_id: new FormControl(1),
    });

    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      this.leerItem(id);
    });
  }

  leerItem(id: string) {
    this.colegiadosService.getItemById(id).subscribe((resp) => {
      this.colegiado = resp.data;
      this.forma.patchValue(this.colegiado);
      this.imgURL = this.colegiado.persona.foto
        ? this.colegiadosService.crudService.getApiUrl() +
          "/" +
          this.colegiado.persona.foto
        : null;
    });
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
        this.colegiadosService.deleteItem(this.colegiado).subscribe(
          (resp) => {
            Swal.fire({
              icon: "success",
              title: "Eliminado!",
              text: "La operación ha sido realizada.",
              timer: 2000,
            }).then(() => {
              this.verItems();
            });
          },
          (err) => {
            Swal.fire("Error!", "La operación no pudo realizarse.", "error");
          }
        );
      }
    });
  }

  verItems() {
    const url = this.router.url.split("/");
    url.pop();
    url.pop();
    url.push("colegiados-list");
    const urlFinal = url.join("/");
    this.router.navigateByUrl(urlFinal);
  }

  editarItemMasDatos() {
    const url = this.router.url.split("/");
    url.pop();
    url.pop();
    url.push("colegiados-mas-datos");
    const urlFinal = url.join("/") + "/" + this.colegiado.id;
    this.router.navigateByUrl(urlFinal);
  }

  editarDirecciones() {
    const url = this.router.url.split("/");
    url.pop();
    url.pop();
    url.push("colegiados-direcciones");
    const urlFinal = url.join("/") + "/" + this.colegiado.id;
    this.router.navigateByUrl(urlFinal);
  }

  verEstadoCuenta() {
    const url = this.router.url.split("/");
    url.pop();
    url.pop();
    url.push("colegiados-estado-cuenta");
    const urlFinal = url.join("/") + "/" + this.colegiado.id;
    this.router.navigateByUrl(urlFinal);
  }
}
