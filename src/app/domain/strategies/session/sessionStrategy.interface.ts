import { LogIn, LoginResponseData, RestorePassword } from "src/app/models/interfaces/session.interfaces";
import UserEntity from "../../entities/UserEntity";
import { Observable } from 'rxjs';

export interface SessionStrategy{
    logIn(User:LogIn):Observable<LoginResponseData>,
    signUp(User:UserEntity):Observable<LoginResponseData>,
    logOut():Observable<LoginResponseData>,
    changePassword(email:string):Observable<LoginResponseData>,
    restorePassword(data:RestorePassword):Observable<LoginResponseData>
}