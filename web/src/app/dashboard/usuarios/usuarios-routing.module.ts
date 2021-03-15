import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { ProfileComponent } from './profile/profile.component';
import { CanDeactivateGuard } from '../../shared/services/can-deactivate.guard';
import { UsuariosDeleteComponent } from './usuarios-delete/usuarios-delete.component';


const usuariosRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Usuarios',
      rolesPermitidos: []
    },
    children: [
      {
        path: 'usuarios-list',
        component: UsuariosListComponent,
        data: {
          title: 'Listado usuario',
          rolesPermitidos: []
        }
      },
      {
        path: 'usuarios-create',
        component: CrearUsuarioComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
          title: 'Crear usuario',
          rolesPermitidos: []
        }
      },
      {
        path: 'usuarios-update/:id',
        component: EditarUsuarioComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
          title: 'Editar usuario',
          rolesPermitidos: []
        }
      },
      {
        path: 'usuarios-delete/:id',
        component: UsuariosDeleteComponent,
        canDeactivate: [],
        data: {
          title: 'Eliminar usuario',
          rolesPermitidos: []
        }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          title: 'Mi Perfil',
          rolesPermitidos: []
        }
      },
      { path: '', redirectTo: 'usuarios-list'},
      { path: '**', redirectTo: 'usuarios-list'}

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(usuariosRoutes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
