import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    url = environment.api_url;

    constructor(private http: HttpClient) {}

    getProfile(username: string) {
        return this.http.get(`${this.url}/api/profiles/${username}`);
    }
}
