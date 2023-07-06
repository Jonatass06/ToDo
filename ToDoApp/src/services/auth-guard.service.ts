import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "src/models/users/user";


@Injectable()
export class AuthGuardService implements CanActivate {
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

        let user: User;
        let decodedCookie = decodeURIComponent(document.cookie);
        let cookieArray = decodedCookie.split(';');

        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf("User=") === 0) {
                user = await JSON.parse(cookie.substring("User=".length, cookie.length));
            }
        }
        if (state.url == "/login" || state.url == "/singup") {
            return user != undefined ? false : true;
        }
        return user != undefined ? true : false;
    }

}