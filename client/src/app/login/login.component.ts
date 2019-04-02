import { Component, OnInit } from "@angular/core";
import { User } from "../user";
import { UserService } from "../user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  user: User = new User();
  constructor(private userService: UserService, private router: Router) {}

  login(): void {
    this.userService.loginUser(this.user).subscribe(() => {
      this.userService.getProfile().subscribe(() => {
        this.userService.loggedIn = true;
        this.router.navigate(["/profile"]);
      });
    });
  }

  ngOnInit() {}
}
