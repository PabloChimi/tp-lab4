import { Injectable, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit{

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  
  constructor(public auth: AngularFireAuth, public router: Router, public ngZone: NgZone, public snackBar: MatSnackBar, private firestore: Firestore) { 
      const storedAuth = localStorage.getItem('isLoggedIn');
      this.isLoggedInSubject.next(storedAuth === 'true');
    }

    ngOnInit(): void { }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      this.ngZone.run(() => {
        
        let col = collection(this.firestore, 'logins');
        addDoc(col, { fecha: new Date(), "user": email});

        localStorage.setItem('isLoggedIn', 'true');
        this.isLoggedInSubject.next(true);
        this.router.navigate(['/']);
      });
    }).catch((error) => {
      console.log(error);
      
      this.snackBar.open(this.errorMessageFormatter(error), '', {
        duration: 3000
      });
      console.log(error.message);
    })
  }

  errorMessageFormatter(error: { code: any; }){
    let errorMessage = "";
    switch (error.code) {
      case "auth/invalid-email":
        errorMessage = "Email invalido";
        break;
      case "auth/email-already-in-use":
        errorMessage = "Email ya en uso";
        break;
      case "auth/invalid-credential":
        errorMessage = "Email y/o contraseña incorrectos";
        break;
      default:
        errorMessage = error.code
        break;
    }
    return errorMessage;
  }

  register(newUserEmail: string, newUserPassword: string){
    this.auth.createUserWithEmailAndPassword(newUserEmail, newUserPassword).then((result) => {
      this.ngZone.run(() => {
        localStorage.setItem('isLoggedIn', 'true');
        this.isLoggedInSubject.next(true);
        this.router.navigate(['/']);
      });
    }).catch((error) => {
      console.log(error);
      
      this.snackBar.open(this.errorMessageFormatter(error), '', {
        duration: 3000
      });
      console.log(error.message);
    })
  }

  logout() {
    localStorage.setItem('isLoggedIn', 'false');
    this.isLoggedInSubject.next(false);
    this.auth.signOut();
    this.router.navigate(['/login'])
  }
  
}
