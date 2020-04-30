import { Component, OnInit } from '@angular/core';
import { VideoService } from '../video.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Module } from '../module';
import { CourseService } from '../course.service';
import { Video } from '../video';
import { ModalController } from '@ionic/angular';
import { AddVideoPage } from './add-video/add-video.page';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-module-videos',
    templateUrl: './module-videos.page.html',
    styleUrls: ['./module-videos.page.scss']
})
export class ModuleVideosPage implements OnInit {
    module: Module;
    videos: Video[];
    user: any;

    constructor(
        private courseService: CourseService,
        private videoService: VideoService,
        private route: ActivatedRoute,
        private modalController: ModalController,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.authService.user.subscribe(user => {
            this.user = user;
        });

        this.videoService.videos.subscribe(videos => {
            this.videos = videos;
        });

        this.route.paramMap.subscribe(params => {
            const intakeCode = params.get('intake_code');
            const moduleCode = params.get('module_code');

            this.courseService
                .getModule(intakeCode, moduleCode)
                .subscribe(m => (this.module = m));

            this.videoService.fetchVideos(intakeCode, moduleCode).subscribe();
        });
    }

    async addVideo() {
        const modal = await this.modalController.create({
            component: AddVideoPage,
            componentProps: {
                intakeCode: this.route.snapshot.paramMap.get('intake_code'),
                moduleCode: this.route.snapshot.paramMap.get('module_code')
            }
        });

        await modal.present();

        // Add video
        // Handling data from modal
        const { data } = await modal.onWillDismiss();
        if (data) {
            this.videoService.addVideo(data).subscribe();
        }
    }
}
