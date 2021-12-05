import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { FetchApiDataService } from './fetch-api-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myFlix';
  user: any = null;

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    
  ) { 
    this.router.events
  .pipe(
    filter( event =>event instanceof NavigationStart)
  )
  .subscribe(
    (event: NavigationEvent) => {
      console.log(event);
      this.getUser();
  });
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    let currentUser = localStorage.getItem('username');
    this.fetchApiData.getUser(currentUser).subscribe((response: any) => {
      this.user = response.Username;
      console.log(currentUser)
      console.log("user", this.user)
    });
  }

  onLogout(): void {
    this.fetchApiData.logout();
    this.router.navigate(['/welcome']);
  }

}
    

