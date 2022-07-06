import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent implements OnInit {

  constructor(public authenticateService: AuthentificationService,private router:Router) { }

  ngOnInit(): void {
  }

  handleLogout(){
    this.authenticateService.logout().subscribe({
      next:(data:boolean) => {
        this.router.navigateByUrl("login");
      }
    })
  }
}
