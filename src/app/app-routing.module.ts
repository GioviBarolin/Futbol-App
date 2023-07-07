// Angular Imports
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './components/Pages/Home/home.component'
import { CompetitionsComponent } from './components/Pages/Competitions/competitions.component'
import { SignInComponent } from './components/sign-in/sign-in.component'
import { TeamComponent } from './components/Pages/Team/team/team.component'

const routes: Routes = [
	{
		path: 'team/:tid',
		component:TeamComponent,
	},
	{
		path: '',
		component:HomeComponent,
	},
	{
		path: 'competitions/:cid',
		component:CompetitionsComponent,
	},
	{
		path: 'sign-in',
		component: SignInComponent
	}, 
	{
		path: '**',
		redirectTo:'/',
		pathMatch:'full'
	},
]


@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
