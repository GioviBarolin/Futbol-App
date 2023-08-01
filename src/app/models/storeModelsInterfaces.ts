import { CompetitionEntity } from '../domain/entities/CompetitionEntity';
import { MatchEntity } from '../domain/entities/MatchEntity';
import PlayerEntity from '../domain/entities/PlayerEntity';
import { TeamEntity } from '../domain/entities/TeamEntity';
import UserEntity from '../domain/entities/UserEntity';
import { Standing } from './interfaces/competitioniterfaces';

export interface CompetitionsState{
    loading:boolean,
    current:string,
    competition:CompetitionEntity,
    currentSeason:string,
    competitions:CompetitionEntity[],
    matches:MatchEntity[],
    standings: Standing[],
}

export interface TeamsState{
    loading:boolean,
    current:TeamEntity,
    teams:Array<TeamEntity>,
    popularTeams: TeamEntity[],
    players: PlayerEntity[]
}

export interface UserState{
    user:UserEntity,
    isLogged:boolean,
}
//------------------------------------------

export interface Areas{
    countryCode?:string,
    flag?:string,
    id?:number,
    name?:string,
    parentArea?:string,
    parentAreaId?:number
}

export interface AreasApi{
    areas:Array<Object>,
    count:number,
    filter:Object
}

export interface CompetitionsApi{
    competitions:Array<Object>,
    count:number,
    filter:Object
}