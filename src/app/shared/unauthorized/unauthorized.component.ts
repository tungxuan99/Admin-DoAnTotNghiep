import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../lib/authentication.service';
@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,private router: Router,) { }

  ngOnInit(): void {
  }
  back()
  {
    console.log(this.authenticationService.userValue.level.trim());
    if(this.authenticationService.userValue.level.trim()=="Student")
    {
      this.router.navigate(['xemdiem']);
    }else{
      this.router.navigate(['/']);
    }
  }

}
