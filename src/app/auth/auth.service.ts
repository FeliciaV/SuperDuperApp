import * as firebase from 'firebase';
import { error } from 'util';

export class AuthService {
    token: string;

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
}
