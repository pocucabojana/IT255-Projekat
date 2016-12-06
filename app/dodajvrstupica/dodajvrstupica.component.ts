import { Component, Directive } from 'angular2/core';
import {Component, FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES, FORM_BINDINGS} from 'angular2/common'
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import 'rxjs/Rx';
import {Router, ROUTER_PROVIDERS} from 'angular2/router'

@Component({ 
  selector: 'DodajVrstuPica',
  templateUrl: 'app/dodajvrstupica/dodajvrstupica.html',
  directives: [FORM_DIRECTIVES],
  viewBindings: [FORM_BINDINGS]
})

export class DodajVrstuPicaComponent {

  dodajVrstuPica: ControlGroup;
  http: Http;
  router: Router;
  postResponse: String;
  
  constructor(builder: FormBuilder, http: Http,  router: Router) {
	this.http = http;
	this.router = router;
    this.dodajVrstuPica = builder.group({
     ime: ["", Validators.none]
   });
  }
  
  onDodajVrstuPica(): void {
	var data = "ime="+this.dodajVrstuPica.value.ime;
	var headers = new Headers();
	headers.append('Content-Type', 'application/x-www-form-urlencoded');
	headers.append('token', localStorage.getItem('token'));
	this.http.post('http://localhost/IT255-Projekat/php/dodajvrstupicaservice.php',data, {headers:headers})
    .map(res => res)
    .subscribe( data => this.postResponse = data,
	err => {
		var obj = JSON.parse(err._body);
		document.getElementsByClassName("alert")[0].style.display = "block";
		document.getElementsByClassName("alert")[0].innerHTML = obj.error.split("\\r\\n").join("<br/>").split("\"").join("");
	},
	() => {
	    this.router.parent.navigate(['./SveVrstePica']);
	 }
	);
  }
}
