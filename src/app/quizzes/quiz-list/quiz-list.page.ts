import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QuizCreatePage } from '../quiz-create/quiz-create.page';
import { QuizService } from '../quiz.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-quiz-list',
    templateUrl: './quiz-list.page.html',
    styleUrls: ['./quiz-list.page.scss']
})
export class QuizListPage implements OnInit {
    quizzes: any;
    videoId: string;

    constructor(
        private modalController: ModalController,
        private quizService: QuizService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.videoId = params.get('video_id');

            this.quizService.data.subscribe(data => {
                this.quizzes = data;
            });
        });
    }

    ionViewWillEnter() {
        this.quizService.fetchQuizzes(this.videoId).subscribe();
    }

    async openQuizCreateModal() {
        const modal = await this.modalController.create({
            component: QuizCreatePage
        });

        modal.present();

        const { data } = await modal.onWillDismiss();

        if (!data) {
            return;
        }

        this.quizService.createQuiz(this.videoId, data).subscribe();
    }

    onDeleteQuiz(quizId: string) {
        this.quizService.deleteQuiz(quizId).subscribe();
    }
}
