import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { loadPlayers, loadPopular, loadTeam, loadedTeams } from '../../../store/actions/teams.actions';
import { AppState } from '@store/app.state';
import { selectTeamsList, selectedTeam, popularTeams, listOfPlayers } from '../../../store/selectors/teams.selectors';
import { TeamEntity } from 'src/app/domain/entities/TeamEntity';
import { TeamRepository } from '../../../models/interfaces/repositories/teamRepository.interface';
import PlayerEntity from 'src/app/domain/entities/PlayerEntity';

@Injectable({
  providedIn: 'root'
})
export class TeamRepositoryNgrxStoreService implements TeamRepository {

  constructor(
    private store: Store<AppState>,
  ) { }

  setTeams(teams:TeamEntity[]){
    this.store.dispatch(loadedTeams({teams}))
  }

  setTeam(current: TeamEntity){
    this.store.dispatch(loadTeam({current}));
  }

  setPopularTeams(teams:TeamEntity[]){
    this.store.dispatch(loadPopular({teams}));
  }

  setPlayers(players: PlayerEntity[]): void {
    this.store.dispatch(loadPlayers({players}));
  }

  getCurrent(){
    return this.store.select(selectedTeam)
  }
  
  getTeams(){
   return new Observable<TeamEntity[]>((observer)=>{
    this.store.select(selectTeamsList).subscribe(
      (value)=>{observer.next(value)}
     )
   })
  }

  getPopularTeams(){
    return this.store.select(popularTeams);
  }

  getListOfPlayers(): Observable<PlayerEntity[]> {
    return this.store.select(listOfPlayers);
  }


}
