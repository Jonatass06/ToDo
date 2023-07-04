import { Injectable } from "@angular/core";
import { PropertyPermissions } from "src/models/users/propertyPermissions";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "src/models/users/user";


const API_URL = 'http://localhost:4300/propertyPermissions';

@Injectable()
export class PropertyPermissionsRepository {

    constructor(private httpClient: HttpClient) { }

    public getPropertyPermissions(): Observable<PropertyPermissions[]> {
        return this.httpClient.get<PropertyPermissions[]>(API_URL)
            .pipe(map(values => {
                const propertyPermissionss: PropertyPermissions[] = [];
                for (const value of values) {
                    propertyPermissionss.push(Object.assign(new PropertyPermissions('', '', ''), value))
                }
                return propertyPermissionss;
            }));
    }

    public getPropPermissionByUserId(user:User): Observable<PropertyPermissions[]> {
        return this.httpClient.get<PropertyPermissions[]>(API_URL+"/"+user.id)
            .pipe(map(values => {
                const propertyPermissionss: PropertyPermissions[] = [];
                for (const value of values) {
                    propertyPermissionss.push(Object.assign(new PropertyPermissions('', '', ''), value))
                }
                return propertyPermissionss;
            }));
    }


    public removePropertyPermissions(propertyPermissions: PropertyPermissions): Observable<PropertyPermissions> {
        return this.httpClient.delete<PropertyPermissions>(API_URL + "/" + propertyPermissions.id)
    }

    public sendPropertyPermissions(propertyPermissions: PropertyPermissions): Observable<PropertyPermissions> {
        return this.httpClient.post<PropertyPermissions>(API_URL, propertyPermissions);
    }
}