import * as firebase from 'firebase';
import { error } from 'util';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    token: string;

    constructor(private router: Router) {}
    
    signupUser(email: string, pass: string) {
        firebase.auth().createUserWithEmailAndPassword(email, pass)
            .catch(
                error1 => console.log(error1)
            );
    }

    signinUser(email: string, pass: string) {
        firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(
            response =>
            // tslint:disable-next-line:one-line
            {
                console.log(response);
                this.router.navigate(['/']);
                firebase.auth().currentUser.getToken()
                    .then(
                        (token: string) => this.token = token
                    );
            }
        )
        .catch(
            error1 => console.log(error1)
        );
    }

    getToken() {
        firebase.auth().currentUser.getToken()
        .then(
            (token: string) => this.token = token
        );
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
    }
}
