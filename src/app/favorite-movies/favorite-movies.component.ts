import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { MovieCardComponent } from '../movie-card/movie-card.component'
import { localizedString } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.css']
})
export class FavoriteMoviesComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public router:Router,
    public snackBar: MatSnackBar,
  ) { }

  movies: any[] = [];
  favorites: any[] = [];
  favoritesID: any[] = [];
  actors: any[] = [];


  

  ngOnInit(): void {
    this.getMovies()
    this.getFavorites();
  }

  removeCommas(actors: any[]): any[] {
    return actors.map((actor: any) => actor.replace(/,/g, '').trim());
  }


  getMovies() {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
         this.movies = res;
         this.movies.forEach((movie) => {
           if (this.favoritesID.includes(movie._id))
           this.favorites.push(movie);
         })
         return this.favorites
    });
  }



  getFavorites(): void {
    let user = localStorage.getItem('username')
    this.fetchApiData.getUser(user).subscribe((response: any) => {
      this.favoritesID = response[0].favorites;
      console.log(response)
    });
    setTimeout(() => {
      this.getMovies();
    }, 100);
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

}
