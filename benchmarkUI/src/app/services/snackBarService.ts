import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { color } from 'd3';

@Injectable()
export class SnackBarService {
    constructor(
        private snackBar: MatSnackBar
    ){}

    getSnackBar(message:string){
        this.snackBar.open(message,"OK", {
            panelClass:'background: red'
          });
    }
}