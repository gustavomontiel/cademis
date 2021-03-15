import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { throwError, fromEvent, timer, interval, of } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import Swal from 'sweetalert2';
import { ToastService } from 'src/app/dashboard/toasts/toast.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private recibiendo;

  constructor(
    public usuarioService: AuthService,
    public toastService: ToastService // <<---- En el constructor
  ) {

  }

  intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {

    const token = sessionStorage.getItem( 'token' );

    if ( token ) {
      request = request.clone( {
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      } );
    }


    // tiempoEspera en segundos
    let tiempoEspera = 1;

    const source = interval( 1000 );
    const tiempoObservable = source.subscribe( ( val ) => {
      tiempoEspera += 1;
      if ( navigator.onLine ) {
        tiempoEspera === 6 && this.mostrarMsgDemora( 'Estamos teniendo demoras en la respuesta del servidor ' + ( this.recibiendo ? '[Recibiendo]' : '[Sin respuetas]' ) );
        tiempoEspera === 12 && this.mostrarMsgDemora( 'La demora es más alta de la esperada ' + ( this.recibiendo ? '[Recibiendo]' : '[Sin respuetas]' ) );
        tiempoEspera === 18 && this.mostrarMsgDemora( 'Por favor aguarde ' + ( this.recibiendo ? '[Recibiendo]' : '[Sin respuetas]' ) );
      }
    } );

    this.recibiendo = false;
    return next.handle( request ).pipe(
      tap( resp => {
        this.recibiendo = true;
        return of( resp );
      }
        ,
        err => {

          if ( !navigator.onLine ) {
            // si no hay conexión
            this.mostrarMsgError( 'Ups, parace que no hay conexión' );
            tiempoObservable.unsubscribe();
            return throwError( err );
          }

          if ( err.error instanceof ErrorEvent ) {
            // client-side error
            console.log( 'TokenInterceptor client-side error', err.message );
            this.mostrarMsgError( err.message );
          } else {
            // server-side error
            console.log( 'TokenInterceptor server-side error', err.message );
            // tslint:disable-next-line: no-unused-expression
            err.status === 401 && this.usuarioService.logout();
            // tslint:disable-next-line: no-unused-expression
            ( err.status >= 500 || err.status === 404 ) && this.mostrarMsgError( err.message );

          }
          tiempoObservable.unsubscribe();
          return throwError( err );

        },
        () => {
          tiempoObservable.unsubscribe();
          // this.toast && this.toast.close();
        } )
      // catchError(
      //   err => {
      //     // clearInterval( interval );
      //     tiempoObservable.unsubscribe();
      //     if ( !navigator.onLine ) {
      //       // si no hay conexión
      //       this.mostrarMsgError( 'Ups, parace que no hay conexión' );

      //       return throwError( err );
      //     }

      //     if ( err.error instanceof ErrorEvent ) {
      //       // client-side error
      //       console.log( 'TokenInterceptor client-side error', err.message );
      //       this.mostrarMsgError( err.message );
      //     } else {
      //       // server-side error
      //       console.log( 'TokenInterceptor server-side error', err.message );
      //       // tslint:disable-next-line: no-unused-expression
      //       err.status === 401 && this.usuarioService.logout();
      //       // tslint:disable-next-line: no-unused-expression
      //       ( err.status >= 500 || err.status === 404 ) && this.mostrarMsgError( err.message );

      //     }

      //     return throwError( err );

      //   }
      // )
    );
  }

  mostrarMsgError( msg: string ) {
    Swal.fire( {
      title: 'Error!',
      html: msg,
      icon: 'error',
    } ).then( ( result ) => {
      return;
    } );
  }

  mostrarMsgDemora( msg: string ) {

    this.toastService.show( msg, {
      classname: 'bg-warning text-light',
      delay: 3000,
      autohide: true,
      headertext: 'Información'
    } );


  }
}
