import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private userService : UserService,  private router: Router, private _snackBar: MatSnackBar) { }

  titre="Utilisateurs"
  statut = true
  displayedColumns: string[] = ['Nom', 'Prénom', 'Téléphone', 'Email','Date', "Action"];
  dataSource:User[] = [];

  ngOnInit(): void {
    this.getListClient()
  }

  getListClient(){
    this.userService.getListUsers().subscribe((data) => {
      this.dataSource = data.users
    })
  }

  addCharitie(id:string) {
    this.router.navigate([`/admin/requestform/add/${id}`])
  }

}
