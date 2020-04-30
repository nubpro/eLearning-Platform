import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QuizListPage } from './quiz-list.page';
import { QuizCreatePageModule } from '../quiz-create/quiz-create.module';

const routes: Routes = [
    {
        path: '',
        component: QuizListPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        QuizCreatePageModule,
        RouterModule.forChild(routes)
    ],
    declarations: [QuizListPage]
})
export class QuizListPageModule {}
