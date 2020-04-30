import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModulePlayerPage } from './module-player.page';
import { VideoAboutComponent } from './video-about/video-about.component';
import { VideoCommentsComponent } from './video-comments/video-comments.component';
import { VideoQuizComponent } from './video-quiz/video-quiz.component';
import { VideoStatsComponent } from './video-stats/video-stats.component';

const routes: Routes = [
    {
        path: '',
        component: ModulePlayerPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ModulePlayerPage,
        VideoAboutComponent,
        VideoCommentsComponent,
        VideoQuizComponent,
        VideoStatsComponent
    ]
})
export class ModulePlayerPageModule {}
