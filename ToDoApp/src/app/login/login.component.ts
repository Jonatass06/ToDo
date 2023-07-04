import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/users/user';
import { UserRepository } from 'src/repositories/user.repository';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  ngOnInit(): void {
    
  }

  loginUser:User = new User('','', '', '', [], [])

  private users: User[] = [];

  constructor(
    private userRepository: UserRepository,
    private route:Router
  ) {
    this.userRepository.getUsers().subscribe({
      next: (value) => {
        this.users = value
        console.log(this.users)
      }
    })
  }

  @Output() loginSuccess = new EventEmitter

    logInUser(): void {
      let user;
      this.userRepository.getUserById(this.loginUser).subscribe(
        user => {
          if(user.password == this.loginUser.password){
            this.setCookie("User", JSON.stringify(user), 1)
            this.route.navigate(["/initialPage"])

          } else{
            //outra mensagem de erro
          }
        },
        error => {
          // depois fazer mensagem de erro
          console.error(error);
        }
      )
    }
    setCookie(name, value, days) {
      var d = new Date();
      d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toUTCString();
      document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }
}
