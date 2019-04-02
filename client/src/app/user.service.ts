import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "./user";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}
  options = { withCredentials: true };

  url: string = "http://localhost:3000/users/";

  loggedIn: boolean = false;

  registerUser(user: User): Observable<string> {
    return this.http.post<string>(this.url + "signup", user, this.options);
  }

  loginUser(user: User): Observable<string> {
    return this.http.post<string>(this.url + "login", user, this.options);
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(this.url + "profile", this.options);
  }

  logout(): Observable<string> {
    return this.http.get<string>(this.url + "logout", this.options);
  }

  validateToken(): Observable<boolean> {
    return this.http.get<boolean>(this.url + "validateToken", this.options);
  }
}
