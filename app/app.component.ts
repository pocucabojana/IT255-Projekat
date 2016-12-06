import {Component} from 'angular2/core';
import {RouteConfig,Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {MainPageComponent} from './mainpage/mainpage.component';
import {Pipe} from 'angular2/core';
import {RegisterComponent} from './register/register.component';
import {LoginComponent}  	from './login/login.component';
import {DodajPiceComponent} from './dodajpice/dodajpice.component';
import {DodajVrstuPicaComponent} from "./dodajvrstupica/dodajvrstupica.component";
import {SveVrstePicaComponent} from "./svevrstepica/svevrstepica.component";
import {SvaPicaComponent} from "./svapica/svapica.component";
import {SvePorudzbineComponent} from "./sveporudzbine/sveporudzbine.component";

@Component({
    selector: 'met-kafic',
	templateUrl: 'app/router.html',
	directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    {path:'/', name: 'MainPage',   component: MainPageComponent, useAsDefault: true},
    {path:'/register', name:'RegisterPage', component: RegisterComponent},
    {path:'/login', name:'LoginPage', component: LoginComponent},
	{path:'/dodajvrstupica', name:'DodajVrstuPica', component: DodajVrstuPicaComponent},
	{path:'/svevrstepica', name:'SveVrstePica', component: SveVrstePicaComponent},
	{path:'/dodajpice', name:'DodajPice', component: DodajPiceComponent},
	{path:'/svapica', name:'SvaPica', component: SvaPicaComponent},
	{path:'/sveporudzbine', name:'SvePorudzbine', component: SvePorudzbineComponent}
])

export class AppComponent { 
	router: Router;
	isAuth: String;
	
	constructor(router: Router) {
		this.router = router;
		  router.subscribe((val) => {
		  
		  if(localStorage.getItem('token') !== null){
				this.isAuth = "yes";
		  }else{
			    this.isAuth = "no";
		  }
		  });
	}
	
 onLogout(): void {
	localStorage.removeItem("token");
	 this.router.navigate(['./MainPage']);
	if(localStorage.getItem('token') !== null){
		this.isAuth = "yes";
	}else{
		this.isAuth = "no";
	}
 }
}
