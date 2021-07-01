import { Component, OnInit } from '@angular/core';
import { Child } from '../Child';
import { SaveUserResponse } from '../SaveUserResponse';
import { User } from '../User';
import { UserService } from '../user.service';
import { DebugElement, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.user;
  }

  user: User = {
    FirstName: "",
    LastName: "",
    TZ: "",
    DateBorn: new Date(),
    NumChildren: 0,
    children: new Array<Child>(),
    Male: false,
    Female: false,
    HMO: ""
  }

  child: Child = {
    FirstName: "",
    LastName: "",
    DateBorn: new Date,
    TZ: ""
  }

  HMO = ['Maccabi', 'meuchedet', 'Leumit', 'Clalit'];
  IfChild = false;

  TZValidation() {
    if (!this.userService.TZValidation(this.user.TZ))
      return false;
    return true;
  }
  TZChildValidation() {
    if (!this.userService.TZValidation(this.child.TZ))
      return false;
    return true;
  }

  save() {
    this.userService.user = this.user;
  }

  addUser() {
    if (!this.TZValidation())
      alert("the details is not valid!")
    else {
      this.userService.addUser(this.user).subscribe((res: SaveUserResponse) => {
        if (!res.IsSuccessful)
          alert("error in saving data!")
        else {
          alert("data send succcessfully!");
          this.user = {
            FirstName: "",
            LastName: "",
            TZ: "",
            DateBorn: new Date(),
            NumChildren: 0,
            children: new Array<Child>(),
            Male: false,
            Female: false,
            HMO: ""
          }
        }
      });
    }
  }

  addChild() {
    this.IfChild = true;
  }

  saveChild() {
    if (!this.TZChildValidation())
      alert("the details is not valid!")
    else if (this.child.FirstName==""&&this.child.LastName==""&&this.child.TZ=="" &&this.child.DateBorn==new Date())
      alert("child is null!")
    else {
      this.user.NumChildren++;
      this.user.children.push(this.child);
      this.child = {
        FirstName: "",
        LastName: "",
        DateBorn: new Date,
        TZ: ""
      }
      this.IfChild = false;
      alert("child added!");
    }
  }
  cancel() {
    this.IfChild = false;
  }
}
