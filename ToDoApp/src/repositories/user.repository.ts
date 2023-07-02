import { Injectable } from "@angular/core";
import { User } from "src/models/users/user";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { map} from "rxjs/operators";


const API_URL = 'http://localhost:4300/usuarios';

@Injectable()
export class UserRepository {

    constructor(private httpClient: HttpClient){}

    public getUsers(): Observable<User[]>{
        return this.httpClient.get<User[]>(API_URL)
        .pipe(map(values =>{
            const users: User[] = [];
            for (const value of values){
                users.push(Object.assign(new User('','','',''),value))
            }
            return users;
        }));
    }

    public getUserById(user: User): Observable<User> {
        return this.httpClient.get(API_URL + "/" + user.id).pipe(
          map(user => user as User)
        );
      }

    public removeUser(user:User): Observable<User>{
        return this.httpClient.delete<User>(API_URL+"/"+user.id)
    }

    public updateUser(user:User): Observable<User>{
        return this.httpClient.put<User>(API_URL, user);
    }

    public sendUser(user:User): Observable<User>{
        return this.httpClient.post<User>(API_URL, user);
    }

}