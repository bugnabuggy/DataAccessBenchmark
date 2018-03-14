import { Injectable } from '@angular/core';
import { MatSnackBar,MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition } from '@angular/material';

@Injectable()
export class SnackBarService {
    constructor(
        private snackBar: MatSnackBar
    ){}
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    getSnackBar(message:string){
        this.snackBar.open(message,"OK", {
            panelClass:'red-snack-bar',
            verticalPosition: this.verticalPosition,
          });
    }
}