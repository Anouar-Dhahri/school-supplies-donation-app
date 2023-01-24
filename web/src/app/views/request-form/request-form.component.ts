import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestService } from 'src/app/services/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent implements OnInit {

  donForm = new FormGroup({
    titre: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    adresse: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  })
  id: string;
  action: string;

  constructor(
    private requestService: RequestService, 
    private router: Router, 
    private _snackBar: MatSnackBar,
    private activateRoute: ActivatedRoute, 
  ) 
  { 
    this.id = String(activateRoute.snapshot.paramMap.get('id'));
    this.action = String(activateRoute.snapshot.paramMap.get('action'));
  }

  titre = "Dons Scolaire Form"

  ngOnInit(): void {
  }

  formAction(){
    console.log(this.donForm)

    if(this.action !== 'add') {
      this.requestService.updateRequest(
        this.id,
        this.donForm.get('titre')?.value, 
        this.donForm.get('description')?.value,
        this.donForm.get('adresse')?.value, 
        this.donForm.get('phoneNumber')?.value,
        this.donForm.get('email')?.value
      )
      .subscribe((data) => {
        if(data.success){
          this._snackBar.open(data.message, 'Done')
          this.router.navigate(['/admin/requests']);
        }else {
          this._snackBar.open(data.message, 'Done')
        }
      });
    }else {
      this.requestService.createRequest(
        this.id,
        this.donForm.get('titre')?.value, 
        this.donForm.get('description')?.value,
        this.donForm.get('adresse')?.value, 
        this.donForm.get('phoneNumber')?.value,
        this.donForm.get('email')?.value
      )
      .subscribe((data) => {
        if(data.success){
          this._snackBar.open(data.message, 'Done')
          this.router.navigate(['/admin/requests']);
        }else {
          this._snackBar.open(data.message, 'Done')
        }
      });
    }

  }

}
