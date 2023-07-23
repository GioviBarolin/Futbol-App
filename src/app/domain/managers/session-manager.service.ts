import { Injectable } from '@angular/core';
import { SessionFutbolServerStrategy } from '../strategies/session/sessionFutbolServerStrategy';
import { HttpClient } from '@angular/common/http';
import { LogIn, LoginResponseData } from 'src/app/models/interfaces/session.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {

  session:SessionFutbolServerStrategy;

  constructor(private http: HttpClient) {
    this.session = new SessionFutbolServerStrategy(this.http);
   }

   logIn(user:LogIn):Observable<LoginResponseData>{
      return this.session.logIn(user);
   }

}
