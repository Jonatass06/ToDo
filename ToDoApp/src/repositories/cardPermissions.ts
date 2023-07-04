import { Injectable } from "@angular/core";
import { CardPermissions } from "src/models/users/cardPermissions";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "src/models/users/user";


const API_URL = 'http://localhost:4300/cardPermissions';

@Injectable()
export class CardPermissionsRepository {

    constructor(private httpClient: HttpClient) { }

    public getCardPermissions(): Observable<CardPermissions[]> {
        return this.httpClient.get<CardPermissions[]>(API_URL)
            .pipe(map(values => {
                const cardPermissionss: CardPermissions[] = [];
                for (const value of values) {
                    cardPermissionss.push(Object.assign(new CardPermissions('', '', ''), value))
                }
                return cardPermissionss;
            }));
    }

    public getPropPermissionByUserId(user:User): Observable<CardPermissions[]> {
        return this.httpClient.get<CardPermissions[]>(API_URL+"/"+user.id)
            .pipe(map(values => {
                const cardPermissionss: CardPermissions[] = [];
                for (const value of values) {
                    cardPermissionss.push(Object.assign(new CardPermissions('', '', ''), value))
                }
                return cardPermissionss;
            }));
    }


    public removeCardPermissions(cardPermissions: CardPermissions): Observable<CardPermissions> {
        return this.httpClient.delete<CardPermissions>(API_URL + "/" + cardPermissions.id)
    }

    public sendCardPermissions(cardPermissions: CardPermissions): Observable<CardPermissions> {
        return this.httpClient.post<CardPermissions>(API_URL, cardPermissions);
    }
}