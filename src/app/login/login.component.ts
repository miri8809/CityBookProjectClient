import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private userService:UserService) { }
  wellcome = "wellcome!"
  ngOnInit(): void {
  }
   FirstName= this.userService.user.FirstName; 
   LastName= this.userService.user.LastName;
}
