import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
    selector: 'app-quiz-create',
    templateUrl: './quiz-create.page.html',
    styleUrls: ['./quiz-create.page.scss']
})
export class QuizCreatePage implements OnInit {
    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private modalController: ModalController,
        private alertController: AlertController
    ) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
            question_desc: ['', [Validators.required, Validators.minLength(5)]],
            answer_1: this.formBuilder.group({
                description: ['', Validators.required],
                is_correct: [false]
            }),
            answer_2: this.formBuilder.group({
                description: ['', Validators.required],
                is_correct: [false]
            }),
            answer_3: this.formBuilder.group({
                description: [''],
                is_correct: [false]
            }),
            answer_4: this.formBuilder.group({
                description: [''],
                is_correct: [false]
            })
        });
    }

    get question_desc() {
        return this.form.get('question_desc');
    }

    get answer_1() {
        return this.form.get('answer_1.description');
    }

    get answer_2() {
        return this.form.get('answer_2.description');
    }

    async createQuiz() {
        // Check whether a correct answer is chosen
        if (
            !(
                this.form.get('answer_1.is_correct').value ||
                this.form.get('answer_2.is_correct').value ||
                this.form.get('answer_3.is_correct').value ||
                this.form.get('answer_4.is_correct').value
            )
        ) {
            const alert = await this.alertController.create({
                header: 'Correct answer required',
                message:
                    'Please mark at least 1 or more answers as the correct answer.',
                buttons: ['OK']
            });

            alert.present();
        } else {
            this.modalController.dismiss(this.form.value);
        }
    }

    close() {
        this.modalController.dismiss();
    }
}
