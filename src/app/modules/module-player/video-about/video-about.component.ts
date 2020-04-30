import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Video } from '../../video';
import { VideoService } from '../../video.service';
import { Observable } from 'rxjs';
import { ProfileService } from 'src/app/profiles/profile.service';

@Component({
    selector: 'app-video-about',
    templateUrl: './video-about.component.html',
    styleUrls: ['./video-about.component.scss']
})
export class VideoAboutComponent implements OnInit {
    video: Video;
    author: any;

    constructor(
        private route: ActivatedRoute,
        private videoService: VideoService,
        private profileService: ProfileService
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const intakeCode = params.get('intake_code');
            const moduleCode = params.get('module_code');
            const videoCode = params.get('video_id');

            this.videoService.getVideo(videoCode).subscribe(video => {
                this.video = video;

                this.profileService
                    .getProfile(this.video.user.username)
                    .subscribe(profile => {
                        this.author = profile;
                    });
            });
        });
    }
}
