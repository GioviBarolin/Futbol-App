import { Component, OnInit, Output,Input, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ButtonLinkComponent } from '../../shared/button-link/button-link.component';
import { SessionManagerService } from 'src/app/domain/managers/session-manager.service';
import { UserManagerService } from 'src/app/domain/managers/user-manager.service';
import { Observable } from 'rxjs';
import { AuthComponent } from '../../auth/auth.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TeamManagerService } from 'src/app/domain/managers/team-manager.service';
import { TeamEntity } from 'src/app/domain/entities/TeamEntity';
import { SearchComponent } from '../search/search.component';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonLinkComponent,
    AuthComponent,
    ReactiveFormsModule,
    SearchComponent
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {

  showMenu:boolean=false;
  @Output() openMenu= new EventEmitter<boolean>();
  @Input() isLarge:boolean=true;
  @Input() isSmall:boolean=true;
  isLogged$= new Observable<boolean>();
  searchField!:FormGroup;
  findedTeams:TeamEntity[] = [];
  openSearch:boolean = false;
  
  constructor(
    private userM: UserManagerService,
    private sessionM: SessionManagerService,
    private fb: FormBuilder,
    private teamM: TeamManagerService,
  ) { 
  }

  setMenu(showMenu:boolean){
    this.openMenu.emit(showMenu);
  }

  ngOnInit(): void {
    this.isLogged$ = this.userM.userIsLogged();
    this.searchField = this.fb.group({
      search:[''],
    })

  }

  signOut(){
    this.sessionM.logOut();
  }

  onSearch(){
    this.teamM.setApiStrategy('TeamServer');
    const teamName = this.searchField.get('search')?.value
    this.teamM.searchTeam(teamName).subscribe({
      next:((result)=>{
        this.findedTeams = result;
        this.teamM.setApiStrategy('TeamfootballApi');
        this.openSearch = true;
      }),
      error:((error)=>{
        this.teamM.setApiStrategy('TeamfootballApi');
      })
    })
  }

  openSearchMenu(open:boolean){
    this.openSearch = open;
  }

}
