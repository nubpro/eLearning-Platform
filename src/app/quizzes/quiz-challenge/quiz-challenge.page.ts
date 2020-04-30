import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../quiz.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { IonContent } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-quiz-challenge',
    templateUrl: './quiz-challenge.page.html',
    styleUrls: ['./quiz-challenge.page.scss']
})
export class QuizChallengePage implements OnInit {
    quizzes: any;
    videoId: string;
    answerForm: FormGroup;
    user: any;
    @ViewChild(IonContent, { static: false }) content: IonContent;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private quizService: QuizService,
        private loadingController: LoadingController,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private toastController: ToastController
    ) {}

    ngOnInit() {
        this.answerForm = this.formBuilder.group({
            answerArray: this.formBuilder.array([])
        });

        this.route.paramMap.subscribe(params => {
            this.videoId = params.get('video_id');

            this.quizService.data.subscribe(data => {
                this.quizzes = data;
                this.quizzes.map(() => this.addAnswer());
            });
        });

        this.authService.user.subscribe(user => (this.user = user));
    }

    ionViewWillEnter() {
        this.quizService.fetchQuizzes(this.videoId).subscribe();
    }

    get answerArray() {
        return this.answerForm.get('answerArray') as FormArray;
    }

    addAnswer() {
        this.answerArray.push(
            this.formBuilder.control(false, Validators.required)
        );
    }

    async onSubmit() {
        const correctQuestions = [];
        const wrongQuestions = [];

        for (const [i, quiz] of this.quizzes.entries()) {
            const answerCtrl = this.answerArray.get(i + '');

            // Scroll to the question which has not been answered
            if (answerCtrl.hasError('required')) {
                const y = document.getElementById(`quiz-${quiz._id}`).offsetTop;
                this.content.scrollToPoint(0, y - 10, 200);
                return;
            }

            // Categorize the right and wrong questions
            if (quiz[answerCtrl.value] && quiz[answerCtrl.value].is_correct) {
                correctQuestions.push(quiz._id);
            } else {
                wrongQuestions.push(quiz._id);
            }
        }

        // Show loading spinner
        const loading = await this.loadingController.create({
            message: 'Submitting your answers...'
        });
        loading.present();

        // For every correct questions, increment score by 100 pts
        const score = correctQuestions.length * 100;

        this.quizService
            .submitResult(this.videoId, correctQuestions, wrongQuestions, score)
            .subscribe(async () => {
                loading.dismiss();

                const toast = await this.toastController.create({
                    header: `You scored ${score} points!`,
                    message: `${correctQuestions.length} out of ${this.quizzes.length} questions is correct.`,
                    duration: 3000
                });
                toast.present();
            });

        console.log(correctQuestions, wrongQuestions);
    }
}
