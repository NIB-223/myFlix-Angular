import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflixdb20.herokuapp.com';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

 // Making the api call for the user registration endpoint
   /**
   * HTTP POST request to the API user registration endpoint
   * @param userData Username, Password, Email, Birthday
   * @returns user data object
  */
  public userRegistration(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(apiUrl + '/users', userData).pipe(
    catchError(this.handleError)
    );
  }

  /**
   * HTTP POST request to the API user login endpoint
   * @param userData Username, Password
   * @returns user data object
  */
  public userLogin(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(apiUrl + '/login', userData).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

    /**
   * HTTP GET request to fetch all movies data from the API
   * @returns movies object
  */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

    /**
   * HTTP GET request to fetch data about one movie from the API
   * @returns movie object
  */
  getMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.get(apiUrl + '/movies/:MovieID', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

   /**
   * HTTP GET request to fetch data about director from the API
   * @param directorName -name of director
   * @returns director object
  */
  getDirector(directorName: any): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.get(apiUrl + '/directors/' + directorName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * HTTP GET request to fetch data about genre from the API
   * @param genreName - the name of the genre
   * @returns genre object
  */
  getGenre(genreName: any): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.get(apiUrl + '/genres/' + genreName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
 /**
   * HTTP GET request to fetch user data from the API
   * @param user information for the user 
   * @returns user object
  */
  getUser(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.get(apiUrl + '/users/' + user, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * HHTP GET request to get a list of the user's favorite movie in the API
   * @param movieList --list of favorite movies
   * @returns movie array
   */
 getUserFavMovie(movieList: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const response = this.http.get(apiUrl + '/users/' + username + '/FavoriteMovies/' + movieList,  {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

   /**
   * HTTP POST request to add a movie to the users list of favorites in the API
   * @param movieID - movie ID code 
   * @returns user object
   */
  addFavMovie(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const response = this.http.post(apiUrl + '/users/' + username + '/FavoriteMovies/' + movieID ,{}, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

    /**
   * HTTP PUT request to update user data in the API
   * @param UserData the new user data
   * @returns user object (with updated data from the API)
   */
  editUser(userData:any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const response = this.http.put(apiUrl + '/users/' + username, userData, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
 /**
   * HTTP DELETE request to remove a user from the API
   * @returns success message as string
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username')
    const response = this.http.delete(apiUrl + '/users/' + username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

    /**
   * HTTP DELETE request to remove a movie from the users list of favorites in the API
   * @param movieID -ID code of movie
   * @returns user object
  */
  deleteMovie( MovieID: string): Observable<any> {
    const user = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const response = this.http.delete(apiUrl + '/users/' + user + '/FavoriteMovies/' + MovieID, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

    /**
   * Non-typed response extraction
   * @param response 
   * @returns respone body
   */
  private extractResponseData(response: Response|Object): any {
    const body = response;
    return body || {};
  }

  /**
   * Error handler
   * @param error 
   * @returns 
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}