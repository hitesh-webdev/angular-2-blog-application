import { Subject } from 'rxjs/Subject';

export class AuthService {

    usersList = [
        {email: 'hitesh.aswani@infostretch.com', password: 'hitesh123'},
        {email: 'admin@gmail.com', password: 'admin123'}
    ];

    loggedIn: boolean = false;
    userEmail: string;

    loginStatus = new Subject<boolean>();

    isAuthenticated() {
        return this.loggedIn;
    }

    onLogin(email: string, password: string): boolean {

        for (let user of this.usersList) {
            if (user.email === email && user.password === password) {
                this.loggedIn = true;
                this.userEmail = email;
                this.loginStatus.next(true);
                return true;
            }
        }

        this.loggedIn = false;
        this.loginStatus.next(false);
        return false;
    }

    onLogout() {
        this.loggedIn = false;
        this.loginStatus.next(false);
    }

}
