import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/interfaces/Request';
import { RequestService } from 'src/app/services/request.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';

const ELEMENT_DATA:Request[] = [];

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  titre="Dons Scolaire"
  statut = true
  displayedColumns: string[] = ['Titre', 'Description', 'Adresse', 'Téléphone','Email','Date','Bénéficiaire', "Action"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private requestService : RequestService,  private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getListRequest()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter)
  }

  getListRequest(){
    this.requestService.getListRequest().subscribe((data) => {
      this.dataSource = data.charities
    })
  }

  updateRequest(id:string) {
    this.router.navigate([`/admin/requestform/update/${id}`])
  }

  deleteRequest(id:string) {
    this.requestService.deleteRequest(id).subscribe((data) => {
      if(data.success) {
        this.getListRequest();
        this._snackBar.open(data.message, 'Done');
      }else {
        this._snackBar.open(data.message, 'Done');
      }
    })
  }

}
