import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddVideoPage } from './add-video.page';

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
    declarations: [AddVideoPage],
    entryComponents: [AddVideoPage]
})
export class AddVideoPageModule {}
