import { Component, Directive } from 'angular2/core';
import {Component, FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES, FORM_BINDINGS} from 'angular2/common'
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import 'rxjs/Rx';
import {Router, ROUTER_PROVIDERS} from 'angular2/router'

@Component({ 
  selector: 'DodajPice',
  templateUrl: 'app/dodajpice/dodajpice.html',
  directives: [FORM_DIRECTIVES],
  viewBindings: [FORM_BINDINGS]
})

export class DodajPiceComponent {

  dodajPice: ControlGroup;
  http: Http;
  router: Router;
  postResponse: String;
  select: Int = 1;
  vrsta_pica: Object[];
  
  constructor(builder: FormBuilder, http: Http,  router: Router) {
	this.http = http;
	this.router = router;
    this.dodajPice = builder.group({
     cena: ["", Validators.none],
     ime: ["", Validators.none],
     opis: ["", Validators.none],
	 vrsta_pica_id: [this.select, Validators.none],
   });
    var headers = new Headers();
	headers.append('Content-Type', 'application/x-www-form-urlencoded');
	headers.append('token', localStorage.getItem('token'));
   	http.get('http://localhost/IT255-Projekat/php/getvrstapica.php',{headers:headers})
		.map(res => res.json()).share()
		.subscribe(drinktypes => {
			this.vrsta_pica = drinktypes.vrsta_pica;
		},
		err => {
			 this.router.parent.navigate(['./MainPage']);
		}
	);
  }
   
  onDodajPice(): void {
	var data = "ime="+this.dodajPice.value.ime + "&cena="+this.dodajPice.value.cena +
	"&opis="+this.dodajPice.value.opis + "&vrsta_pica_id=" + this.select;
	var headers = new Headers();
	headers.append('Content-Type', 'application/x-www-form-urlencoded');
	headers.append('token', localStorage.getItem('token'));
	this.http.post('http://localhost/IT255-Projekat/php/dodajpicaservice.php', data, {headers:headers})
    .map(res => res)
    .subscribe( data => this.postResponse = data,
	err => {
		var obj = JSON.parse(err._body);
		document.getElementsByClassName("alert")[0].style.display = "block";
		document.getElementsByClassName("alert")[0].innerHTML = obj.error.split("\\r\\n").join("<br/>").split("\"").join("");
	},
	() => { 
	    this.router.parent.navigate(['./SvaPica']);
	 }
	);
  }
}
