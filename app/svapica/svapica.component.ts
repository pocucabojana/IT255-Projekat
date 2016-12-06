import { Component, Directive } from 'angular2/core';
import {Component, FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES, FORM_BINDINGS} from 'angular2/common'
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import 'rxjs/Rx';
import {Router, ROUTER_PROVIDERS} from 'angular2/router'

@Component({ 
  selector: 'SvaPica', 
  templateUrl: 'app/svapica/svapica.html',
  directives: [FORM_DIRECTIVES],
  viewBindings: [FORM_BINDINGS]
})



export class SvaPicaComponent {
  http: Http;
  router: Router;
  postResponse: String;
  
   	picence: Object[];
	
	constructor(http: Http, router: Router) {
	this.http = http;
	this.router = router;
	var headers = new Headers();
	headers.append('Content-Type', 'application/x-www-form-urlencoded');
	headers.append('token', localStorage.getItem('token'));
		http.get('http://localhost/IT255-Projekat/php/getpica.php',{headers:headers})
		.map(res => res.json()).share()
		.subscribe(drinks => {
			this.picence = drinks.picence;
			setInterval(function(){
				$('table').DataTable();
			},200);
		},
		err => {
			 this.router.parent.navigate(['./MainPage']);
		}
	);
  }
  
  public removeProduct(item: Number) {
		var headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		headers.append('token', localStorage.getItem('token'));
	  this.http.get('http://localhost/IT255-Projekat/php/deletepicenpm .php?id='+item,{headers:headers})
		  .subscribe( data => this.postResponse = data);
	 location.reload();
   }

	public naruciPice(id) {
		var data = "id="+id;
		var headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		headers.append('token', localStorage.getItem('token'));
		this.http.post('http://localhost/IT255-Projekat/php/narucipice.php',data, {headers:headers})
			.map(res => res)
			.subscribe( data => this.postResponse = data,
			err => {
				var obj = JSON.parse(err._body);
				document.getElementsByClassName("alert")[0].style.display = "block";
				document.getElementsByClassName("alert")[0].innerHTML = obj.error.split("\\r\\n").join("<br/>").split("\"").join("");
			},
				() => {
					this.router.parent.navigate(['./SvePorudzbine']);
				});
	}
}
