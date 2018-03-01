import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SnackBarService {
    constructor(
        private snackBar: MatSnackBar
    ){}

    getSnackBar(message:string){
        this.snackBar.open(message,"OK", {
            
          });
    }
}