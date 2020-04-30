import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
    credentialsForm: FormGroup;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private authSevice: AuthService,
        private alertController: AlertController
    ) {}

    ngOnInit() {
        this.credentialsForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // Redirect user if user already logged in
        this.authSevice.userIsAuthenticated.subscribe(isAuthenticated => {
            if (isAuthenticated) {
                this.router.navigateByUrl('/tabs/modules');
            } else {
                // If user is logged out, try auto login
                this.authSevice.autoLogin().subscribe(state => {
                    if (state) {
                        this.router.navigateByUrl('/tabs/modules');
                    }
                });
            }
        });
    }

    onLogin() {
        this.authSevice
            .login(
                this.credentialsForm.get('username').value,
                this.credentialsForm.get('password').value
            )
            .subscribe(
                () => {
                    this.credentialsForm.reset();
                },
                err => {
                    if (err.status === 401) {
                        this.showAlert('Incorrect username or password.');
                    } else {
                        this.showAlert(
                            'Something is wrong, please contact administrator.'
                        );
                    }
                }
            );
    }

    async showAlert(message: string) {
        const alert = await this.alertController.create({
            message,
            header: 'Unable to login',
            buttons: ['OK']
        });
        alert.present();
    }
}
