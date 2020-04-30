import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/quizzes/quiz.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-video-quiz',
    templateUrl: './video-quiz.component.html',
    styleUrls: ['./video-quiz.component.scss']
})
export class VideoQuizComponent implements OnInit {
    videoId: string;
    leaderboard: any;
    user: any;

    constructor(
        private route: ActivatedRoute,
        private quizService: QuizService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.videoId = params.get('video_id');

            this.quizService
                .getLeaderboard(this.videoId)
                .subscribe((leaderboard: any) => {
                    this.leaderboard = leaderboard;
                });
        });

        this.authService.user.subscribe(user => (this.user = user));
    }
}
