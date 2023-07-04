import { Injectable } from "@angular/core";
import { Groups } from "src/models/users/groups";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { map} from "rxjs/operators";


const API_URL = 'http://localhost:4300/usuarios';

@Injectable()
export class GroupsRepository {

    constructor(private httpClient: HttpClient){}

    public getGroupss(): Observable<Groups[]>{
        return this.httpClient.get<Groups[]>(API_URL)
        .pipe(map(values =>{
            const groupss: Groups[] = [];
            for (const value of values){
                groupss.push(Object.assign(new Groups('',''),value))
            }
            return groupss;
        }));
    }

    public getGroupsById(groups: Groups): Observable<Groups> {
        return this.httpClient.get(API_URL + "/" + groups.id).pipe(
          map(groups => groups as Groups)
        );
      }

    public removeGroups(groups:Groups): Observable<Groups>{
        return this.httpClient.delete<Groups>(API_URL+"/"+groups.id)
    }

    public updateGroups(groups:Groups): Observable<Groups>{
        return this.httpClient.put<Groups>(API_URL, groups);
    }

    public sendGroups(groups:Groups): Observable<Groups>{
        return this.httpClient.post<Groups>(API_URL, groups);
    }

}