export class AuthService {
    
    loggedIn: boolean = false;

    isAuthenticated() {
        return this.loggedIn;
    }

    onLogin() {
        this.loggedIn = true;
    }

    onLogout() {
        this.loggedIn = false;
    }

}
