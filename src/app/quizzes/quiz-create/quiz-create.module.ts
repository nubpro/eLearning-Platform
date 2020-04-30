import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QuizCreatePage } from './quiz-create.page';

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
    declarations: [QuizCreatePage],
    entryComponents: [QuizCreatePage]
})
export class QuizCreatePageModule {}
