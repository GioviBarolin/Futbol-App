import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import PlayerEntity from 'src/app/domain/entities/PlayerEntity';
import { TeamEntity } from 'src/app/domain/entities/TeamEntity';
import { TeamApiStrategy } from 'src/app/models/interfaces/strategies/teamStrategies';
import { ApiFootballDataFilters, Error } from 'src/app/models/interfaces/dtoInterfaces';
import { ResponseTeamPlayers, ResponseUser } from 'src/app/models/interfaces/session.interfaces';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root'
})
export class TeamApiServerRepositoryService implements TeamApiStrategy {

  #urlTeams:string=`${environment.api_futbolServer_url}/teams`
  headers = new HttpHeaders({
      'Content-Type':'application/json',
      'X-Auth-Token': '860f9df0ee73439a9cc24ca71319e092'
  })
  
  constructor(
    private http: HttpClient
  ) { }

  getTeam(teamCode:number=86){
      const url = `${this.#urlTeams}/team/${teamCode}`;
      return new Observable<TeamEntity>((observer)=>{
          this.http.get<TeamEntity>(url,{headers:this.headers}).subscribe(
            (result)=>{
                const team = new TeamEntity({
                    area: result.area,     
                    id: result.id,    
                    name: result.name,    
                    shortName: result.shortName,
                    tla: result.tla,    
                    logo: result.logo,
                    coach: result.coach,
                    squad: result.squad,
                });
              observer.next(team);
            },
            (error:HttpErrorResponse)=>{
              const newError:Error={
                message: error.error.message,
                status:error.status
              }
             observer.error(newError)
            }
          )
      });
  }
  getTeams(competitionCode: string, filter?: ApiFootballDataFilters | undefined): Observable<TeamEntity[]> {
    return new Observable();
  }

  getTeamsByName(teamName:string){
    const url = `${this.#urlTeams}/team/name/${teamName}`;
    return this.http.get<ResponseUser>(url,{headers:this.headers}).pipe(
          map((result)=>{
            const teams = result.data.map(team=>new TeamEntity({     
              id: team.id,    
              name: team.name,    
              shortName: team.shortName,
              tla: team.tla,    
              logo: team.logo,
            }));
            return teams;
          }),
          catchError((error)=>{
            const newError = new HttpErrorResponse({
              error:error.error,
              status: error.status
            })
            return throwError(newError)
          })
    );
  }

  getPlayers(playersList: number[]): Observable<PlayerEntity[]> {
    const url = `${this.#urlTeams}/players`;
    return this.http.post<ResponseTeamPlayers>(url,{players:playersList},{headers:this.headers}).pipe(
          map((result)=>{
              return result.data
          }),
          catchError((error)=>{
            const newError = new HttpErrorResponse({
              error:error.error,
              status: error.status
            })
            return throwError(newError)
          })
      );
  }
}