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
  /**
    * All constructor items are documented as properties
    * @ignore
  */
  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public router:Router,
    public snackBar: MatSnackBar
    ) { }
/**
 * shows movie list and user's favorite movies (manifests in highlighted heart icons)
 */
  ngOnInit(): void {
    this.getMovies();
    this.getUserFavorites();
  }
/**
 * removes the commas from the actors array (extra commas were added after first 2 actor names in DB because of the React version of this front-end API)
 * @param actors - array with 3 leading actors in each movie as array items
 * @returns {Array} -commas are removed in each array item
 */
  removeCommas(actors: any[]): any[] {
    return actors.map((actor: any) => actor.replace(/,/g, '').trim());
  }

  /**
   * gets list of movies from API
   */
  getMovies() {
    this.fetchApiData
      .getAllMovies()
      .subscribe((res: any[]) => {
         this.movies = res;
         console.log(this.actors);
    });
  }

  /**
   * opens modal to {@link GenreComponent}
   * @param genreName - name of genre
   * @returns {string} name of the genre
   */
  openGenreDialog(genreName: string): void {
    this.dialog.open(GenreComponent, {
      width: '280px',
      data: {
        genreName: genreName
      }
    });
  }

  /**
   * opens modal to {@link DirectorComponent} 
   * @param directorName -name of director
   * @returns {string} -name of the director
   */
  openDirectorDialog(directorName: string): void {
    this.dialog.open(DirectorComponent, {
      width: '280px',
      data: {
        directorName: directorName
      }
    });
  }

  /**
   * opens modal to {@link SynopsisComponent}
   * @param synopsis -synopsis of the movie
   * @param title  - movie title
   * @returns {string} returns both the title of the movie and the synopsis of the movie
   */
  openSynopsisDialog(synopsis: string, title: string): void {
    this.dialog.open(SynopsisComponent, {
      width: '280px',
      data: {
        title,
         synopsis,
      }
    });
  }

  /**
   * gets all the movies that the user has selected as favorites
   * @returns {Array} favorited movies
   */
  getUserFavorites(): void {
    const user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      console.log(this.favorites)
      return this.favorites;
    });
  }

/**
 * Adds movie to user's favorties list via movie ID
 * @param _id -the ID code that represents each movie
 * @returns {Array} the newly updated favorite movie list
 */
  addFavorite(_id: string): void {
    this.fetchApiData.addFavMovie(_id).subscribe((response: any) => {
      this.snackBar.open('Movie added to favorties!', 'OK', {
        duration: 2000,
      });
      console.log(response)
      return this.getUserFavorites();
    });
  }

  /**
   * Removes movie ID from favorites list
   * @param _id -the ID code that represents each movie
   * @returns {Array} newly updated list of user's favorties 
   */
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

  /**
   * determines which "favorite icon" will show - the highlighted or unhighlighted heart icon)
   * @param _id - -the ID code that represents each movie
   * @returns {boolean} if movie is a fav, it will be true and will show highlighted icon, or vice versa
   */
  favStatus(_id: any): any {
    if (this.favorites.includes(_id)) {
      return true;
    }else {
      return false;
    }
  }
}
