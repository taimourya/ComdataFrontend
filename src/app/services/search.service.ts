import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchSubject = new Subject<string>();

  constructor() { }

  onChange(mc: string) {
    this.searchSubject.next(mc);

  }

}
