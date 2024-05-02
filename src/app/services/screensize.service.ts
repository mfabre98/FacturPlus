import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, } from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScreensizeService {

  private isDesktop = new BehaviorSubject(false);

  constructor() {}

  isDesktopView(): Observable<boolean>{
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        this.isDesktop.next(false);
    } else{
        this.isDesktop.next(true);
    }
    return this.isDesktop.asObservable().pipe(distinctUntilChanged());
  }
}
