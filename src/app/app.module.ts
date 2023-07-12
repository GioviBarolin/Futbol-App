// Angular Imports
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { environment } from '@environment'
// This Module Imports
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './components/Header/header/header.component'
import { FooterComponent } from './components/Footer/footer/footer.component'
import { MainComponent } from './components/Main/main/main.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ROOT_REDUCERS } from './data/state/app.state'
import StrategyFactory from './services/factory/strategyFactory'
import { TeamManagerService } from './services/managers/team-manager.service'



@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		HeaderComponent,
		MainComponent,
		FooterComponent,
		StoreModule.forRoot(ROOT_REDUCERS),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
	],
	providers: [StrategyFactory],
	bootstrap: [AppComponent],
})
export class AppModule {}
