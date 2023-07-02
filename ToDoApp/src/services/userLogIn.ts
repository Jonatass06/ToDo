import { Injectable } from "@angular/core";
import { User } from "src/models/users/user";
import { Observable } from "rxjs";

@Injectable()
export class UserLogIn {
  userLogIn: Observable<User>;

  public getUserLogin(): Observable<User> {
    return this.userLogIn;
  }

  setUserLogIn(user: User): void {
    this.userLogIn = Object.assign(new Observable<User>(), user);
  }
}