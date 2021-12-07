import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { map, catchError } from 'rxjs/operators';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  movies: any[] = [];
  actors: any[] = [];
  favorites: any[] = [];
  favoriteMovies: any = [];
  user: any

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public router:Router,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUserFavorites();
  }

  removeCommas(actors: any[]): any[] {
    return actors.map((actor: any) => actor.replace(/,/g, '').trim());
  }

  getMovies() {
    this.fetchApiData
      .getAllMovies()
      .subscribe((res: any[]) => {
         this.movies = res;
         console.log(this.actors);
    });
  }
  openGenreDialog(genreName: string): void {
    this.dialog.open(GenreComponent, {
      width: '280px',
      data: {
        genreName: genreName
      }
    });
  }
  openDirectorDialog(directorName: string): void {
    this.dialog.open(DirectorComponent, {
      width: '280px',
      data: {
        directorName: directorName
      }
    });
  }
  openSynopsisDialog(synopsis: string, title: string): void {
    this.dialog.open(SynopsisComponent, {
      width: '280px',
      data: {
        title,
         synopsis,
      }
    });
  }

  getUserFavorites(): void {
    const user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      console.log(this.favorites)
      return this.favorites;
    });
  }


  addFavorite(_id: string): void {
    this.fetchApiData.addFavMovie(_id).subscribe((response: any) => {
      this.snackBar.open('Movie added to favorties!', 'OK', {
        duration: 2000,
      });
      console.log(response)
      return this.getUserFavorites();
    });
  }

  removeFavorite(_id: string): void {
    this.fetchApiData.deleteMovie(_id).subscribe((resp: any) => {
      this.snackBar.open('Removed from favorites!', 'OK', {
        duration: 2000,
      });
      console.log(resp);
      window.location.reload();
      return this.getUserFavorites();
    })
  }

  favStatus(_id: any): any {
    if (this.favorites.includes(_id)) {
      return true;
    }else {
      return false;
    }
  }
}
