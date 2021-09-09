import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavToggleService {

  private state: boolean = true;

  stateSubject = new Subject<boolean>();

  constructor() { }

  toggle() {
    this.state = !this.state;
    if(this.state) {
      document.body.classList.add('sidebar-toggled');
    }
    else {
      document.body.classList.remove('sidebar-toggled')
    }
    this.stateSubject.next(this.state);
  }

}
