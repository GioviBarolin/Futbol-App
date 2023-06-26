export interface CompetitionCard{
    name:string,
    code:string,
    image:string,
    id:number
}

export interface TeamCard{
    name:string,
    image: string,
    tla: string,
    areaName: string,
    areaCode: string,
    id: number
}

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