import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private token: TokenService,
    private router: Router
  ) { }

  public form = {
    email: null,
    name: null,
    password: null,
    passwordConfirmation: null
  }

  public error = [];

  ngOnInit() {
  }

  onSubmit() {
    return this.http.post('http://recipe.test/api/signup', this.form).subscribe(
      data => this.handleResponse(data),
      err => this.handleError(err)
    )
  }

  handleResponse(data) {
    this.token.handle(data.access_token);
    this.router.navigateByUrl('/profile');
  }

  handleError(error) {
    this.error = error.error.errors;
  }

}
