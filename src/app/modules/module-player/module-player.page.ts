import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { CourseService } from '../course.service';
import { VideoService } from '../video.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Module } from '../module';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-module-player',
    templateUrl: './module-player.page.html',
    styleUrls: ['./module-player.page.scss']
})
export class ModulePlayerPage implements OnInit {
    module: Module;
    video: Video;
    selectedSegment: string;
    user: any;

    constructor(
        private courseService: CourseService,
        private videoService: VideoService,
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService
    ) {
        this.selectedSegment = 'about';
    }

    ngOnInit() {
        this.authService.user.subscribe(user => {
            this.user = user;
        });

        this.route.paramMap.subscribe(params => {
            const intakeCode = params.get('intake_code');
            const moduleCode = params.get('module_code');
            const videoId = params.get('video_id');

            this.courseService
                .getModule(intakeCode, moduleCode)
                .subscribe(m => {
                    this.module = m;
                });

            this.videoService.getVideo(videoId).subscribe(v => {
                this.video = v;
            });
        });
    }
}
