import { AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserLogIn } from 'src/services/userLogIn';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  hide:boolean = false;

  ngOnInit(): void {
    if(this.userLogIn.getUserLogin()==null){
      this.router.navigate(["/login"])
    }
  }

  constructor(private userLogIn:UserLogIn, private router:Router){
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.hideLoginAndSingup();
      });
  }

  hideLoginAndSingup():void{
    console.log(this.userLogIn.getUserLogin())
    if(this.userLogIn.getUserLogin() == null){
      this.hide = false;
    } else{
      this.hide = true;
    }
  }

  logout(){
      this.userLogIn.setUserLogIn(null);
      location.reload();
    }
}
