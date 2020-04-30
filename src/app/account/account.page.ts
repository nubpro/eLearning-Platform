import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-account',
    templateUrl: './account.page.html',
    styleUrls: ['./account.page.scss']
})
export class AccountPage implements OnInit {
    user: any;

    constructor(private router: Router, private authService: AuthService) {}

    ngOnInit() {
        this.authService.user.subscribe(user => {
            this.user = user;
        });
    }

    onLogout() {
        this.authService.logout();
        this.router.navigateByUrl('/auth');
    }
}
