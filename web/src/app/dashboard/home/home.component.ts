import { Component, OnInit } from '@angular/core';
import { ToastService } from '../toasts/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public toastService: ToastService
  ) { }

  ngOnInit() {
  }

  showStandard() {
    this.toastService.show('I am a standard toast', {
      delay: 3000,
      autohide: true
    });
  }

  showPrimary() {
    this.toastService.show('I am a primary toast', {
      classname: 'bg-primary text-light',
      delay: 3000 ,
      autohide: true,
      headertext: 'primary'
    });
  }

  showSecondary() {
    this.toastService.show('I am a secondary toast', {
      classname: 'bg-secondary text-light',
      delay: 3000 ,
      autohide: true,
      headertext: 'Secondary'
    });
  }

  showSuccess() {
    this.toastService.show('I am a success toast', {
      classname: 'bg-success text-light',
      delay: 3000 ,
      autohide: true,
      headertext: 'Todo bien'
    });
  }

  showDanger() {
    this.toastService.show('I am a danger toast', {
      classname: 'bg-danger text-light',
      delay: 3000 ,
      autohide: true,
      headertext: 'Error!!!'
    });
  }

  showWarning() {
    this.toastService.show('I am a warning toast', {
      classname: 'bg-warning text-light',
      delay: 3000 ,
      autohide: true,
      headertext: 'Cuidado!'
    });
  }

  showInfo() {
    this.toastService.show('I am a info toast', {
      classname: 'bg-info text-light',
      delay: 3000 ,
      autohide: true,
      headertext: 'Información'
    });
  }

}
