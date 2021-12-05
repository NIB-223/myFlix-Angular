import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.css']
})
export class DeleteProfileComponent implements OnInit {

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  deleteProfile(): void {
    this.fetchApiData.deleteUser().subscribe(
      (response: any) => {
      this.snackBar.open("Profile deleted.", "OK", {
        duration: 2000,
      });
      localStorage.clear();
    },
    (response:any) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000,
      });

      this.router.navigate(['/welcome']).then(() => {
        window.location.reload();
      })
    })
  }

  
  back(): void {
    this.router.navigate(['users']).then(() => {
      window.location.reload();
    })
}


}
