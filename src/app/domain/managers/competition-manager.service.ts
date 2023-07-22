import { Injectable } from '@angular/core';

import { CompetitionRepositoryNgrxStoreService } from 'src/app/data/repositories/competition-repository-ngrx-store.service';
import { CompetitionApiStrategy } from '../strategies/competition/competitionStrategy.interface';
import CompetitionApiStrategyFactory from '../factory/competition/strategyFactory';
import { ApiFootballDataFilters } from 'src/app/models/interfaces/dtoInterfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CompetitionManagerService {

  strategy:CompetitionApiStrategy;
  constructor( 
    private storage:  CompetitionRepositoryNgrxStoreService,
    private strategyFactory: CompetitionApiStrategyFactory,
    private router: Router
    ) {
      this.strategy = this.strategyFactory.create('CompetitionfootballApi');
    }

  findCompetitions(){
    this.strategy.getCompetitions().subscribe(
      (list)=>{
          this.storage.saveCompetitions(list);
      },
      (error)=>{
        this.router.navigate(['not-found',error])
      })
  }

  findCompetition(competitionCode:string,filter?:ApiFootballDataFilters){
    this.strategy.getCompetition(competitionCode,filter).subscribe(
      (result)=>{
        this.storage.saveCompetition(result)
      },
      (error)=>{
        this.router.navigate(['not-found',error])
      }
    )
  }

  findMatches(competitionCode:string){
    this.strategy.getMatches(competitionCode).subscribe(
      (result)=>{
        this.storage.addMatches(result);
      },
      (error)=>{
        this.router.navigate(['not-found',error])
      }
    )
  }

  findStandings(competitionCode:string,filter?:ApiFootballDataFilters){
    this.strategy.getStandings(competitionCode,filter).subscribe(
      (result)=>{
        this.storage.addStandings(result);
      },
      (error)=>{
        this.router.navigate(['not-found',error])
      }
    )
  }

  setCurrent(competition:string){
    this.storage.setCurrent(competition);
  }

  getCurrent(){
    return this.storage.getCurrent();
  }

  getCompetitions(){
    return this.storage.getCompetitions();
  }

  getCompetition(){
    return this.storage.getCompetition();
  }

  getMatches(){
    return this.storage.getMatches();
  }

  getStandings(){
    return this.storage.getStandings();
  }

}
