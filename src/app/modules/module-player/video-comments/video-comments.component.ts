import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../video.service';
import { CommentService } from '../../comment.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Comment } from '../../comment';
import { ProfileService } from 'src/app/profiles/profile.service';

@Component({
    selector: 'app-video-comments',
    templateUrl: './video-comments.component.html',
    styleUrls: ['./video-comments.component.scss'],
})
export class VideoCommentsComponent implements OnInit {
    comments: Comment[];
    videoId: string;
    moduleCode: string;
    intakeCode: string;
    commentInput: string;

    constructor(
        private route: ActivatedRoute,
        private commentService: CommentService,
        private profileService: ProfileService
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            this.videoId = params.get('video_id');
            this.intakeCode = params.get('intake_code');
            this.moduleCode = params.get('module_code');

            this.commentService.comments.subscribe((comments: Comment[]) => {
                this.comments = comments;

                this.comments.forEach((c) => {
                    this.profileService
                        .getProfile(c.user.username)
                        .subscribe((profile: any) => {
                            c.user.base64_photo = profile.base64_photo;
                        });
                });
            });

            this.commentService.fetchComments(this.videoId).subscribe();
        });
    }

    addComment() {
        this.commentService
            .addComment(this.videoId, this.commentInput)
            .subscribe();

        this.commentInput = '';
    }
}
