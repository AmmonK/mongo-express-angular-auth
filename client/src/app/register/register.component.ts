import { Component, OnInit } from "@angular/core";
import { User } from "../user";
import { UserService } from "../user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  constructor(private userService: UserService, private router: Router) {}
  register(): void {
    this.userService.registerUser(this.user).subscribe(user => {
      console.log(user);
      this.router.navigate(["/login"]);
    });
  }
  ngOnInit() {}
}
