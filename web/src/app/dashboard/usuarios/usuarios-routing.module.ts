import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { ProfileComponent } from './profile/profile.component';
import { CanDeactivateGuard } from '../../shared/services/can-deactivate.guard';
import { UsuariosDeleteComponent } from './usuarios-delete/usuarios-delete.component';
import { RoleGuard } from 'src/app/auth/services/role.guard';


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
        canActivate: [RoleGuard],
        data: {
          title: 'Listado usuario',
          rolesPermitidos: ['administrador']
        }
      },
      {
        path: 'usuarios-create',
        component: CrearUsuarioComponent,
        canDeactivate: [CanDeactivateGuard],
        canActivate: [RoleGuard],
        data: {
          title: 'Crear usuario',
          rolesPermitidos: ['administrador']
        }
      },
      {
        path: 'usuarios-update/:id',
        component: EditarUsuarioComponent,
        canDeactivate: [CanDeactivateGuard],
        canActivate: [RoleGuard],
        data: {
          title: 'Editar usuario',
          rolesPermitidos: ['administrador']
        }
      },
      {
        path: 'usuarios-delete/:id',
        component: UsuariosDeleteComponent,
        canActivate: [RoleGuard],
        canDeactivate: [],
        data: {
          title: 'Eliminar usuario',
          rolesPermitidos: ['administrador']
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
