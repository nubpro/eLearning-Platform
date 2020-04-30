import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModuleVideosPage } from './module-videos.page';
import { AddVideoPageModule } from './add-video/add-video.module';

const routes: Routes = [
    {
        path: '',
        component: ModuleVideosPage
    },
    {
        path: ':video_id',
        loadChildren: () =>
            import('../module-player/module-player.module').then(
                m => m.ModulePlayerPageModule
            )
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddVideoPageModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ModuleVideosPage]
})
export class ModuleVideosPageModule {}
