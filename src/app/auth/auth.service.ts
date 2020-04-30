import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, from, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Platform, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { tap, catchError, map, take, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Route } from '@angular/router';
import { ProfileService } from '../profiles/profile.service';

const TOKEN_KEY = 'access_token';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    url = environment.api_url;
    private _user = new BehaviorSubject(null);

    constructor(
        private http: HttpClient,
        private helper: JwtHelperService,
        private storage: Storage,
        private profileService: ProfileService
    ) {}

    get user() {
        return this._user.asObservable();
    }

    get userIsAuthenticated() {
        return this._user.asObservable().pipe(
            map((user) => {
                if (user) {
                    return !!user;
                } else {
                    return false;
                }
            })
        );
    }

    autoLogin() {
        let currentUser: any;

        return from(this.storage.get(TOKEN_KEY)).pipe(
            map((token) => {
                if (!token) {
                    return null;
                }
                const user = this.helper.decodeToken(token);
                const isExpired = this.helper.isTokenExpired(token);

                if (isExpired || !user) {
                    return null;
                }

                return user;
            }),
            tap((user) => {
                if (user) {
                    currentUser = user;
                }
            }),
            switchMap((user) => {
                if (user) {
                    return this.profileService.getProfile(user.username);
                }
                return of(user);
            }),
            tap((profile) => {
                if (profile) {
                    currentUser.base64_photo = profile.base64_photo;
                    this._user.next(currentUser);
                }
            }),
            map((user) => {
                return !!user;
            })
        );
    }

    login(username: string, password: string) {
        return this.http
            .post(`${this.url}/api/login`, { username, password })
            .pipe(
                tap((result: any) => {
                    const user = this.helper.decodeToken(result.token);
                    user.base64_photo = result.base64_photo;

                    this.storage.set(TOKEN_KEY, result.token);
                    this._user.next(user);
                })
            );
    }

    logout() {
        this.storage.remove(TOKEN_KEY);
        this._user.next(null);
    }
}
