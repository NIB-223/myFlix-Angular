import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { OnInit } from '@angular/core';
import { FetchApiDataService } from './fetch-api-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myFlix';
  user: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    // public router: Router,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    let currentUser = localStorage.getItem('user');
    this.fetchApiData.getUser(currentUser).subscribe((response: any) => {
      this.user = response;
      console.log(currentUser)
    });
  
}}
    

