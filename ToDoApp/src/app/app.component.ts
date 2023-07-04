import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { User } from 'src/models/users/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  hide: boolean = false;

  userLogin: User;

  async ngOnInit() {
    //=======================================
    var cookieName = "User=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');

    for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        this.userLogin = await JSON.parse(cookie.substring(cookieName.length, cookie.length));
      }
    }
    //=========================================

    if(this.userLogin == null){
      this.router.navigate(["/login"])
    }
  }

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.hideLoginAndSingup();

      });
  }

  hideLoginAndSingup(): void {
    if (this.userLogin == null) {
      this.hide = false;
    } else {
      this.hide = true;
    }
  }

  logout() {
    this.userLogin = null;
    location.reload();
    var d = new Date();
    d.setTime(d.getTime() + (0 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = "User" + "=" + null + ";" + expires + ";path=/";
  }
}
