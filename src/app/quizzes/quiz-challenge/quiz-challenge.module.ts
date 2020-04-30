import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QuizChallengePage } from './quiz-challenge.page';

const routes: Routes = [
    {
        path: '',
        component: QuizChallengePage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [QuizChallengePage]
})
export class QuizChallengePageModule {}
