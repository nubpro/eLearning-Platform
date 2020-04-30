import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course.service';
import { ActionSheetController } from '@ionic/angular';
import { Module } from '../module';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoService } from '../video.service';

@Component({
    selector: 'app-module-list',
    templateUrl: './module-list.page.html',
    styleUrls: ['./module-list.page.scss']
})
export class ModuleListPage implements OnInit {
    courses: Course[];
    modules: any;

    selectedCourse: Course;

    constructor(
        private courseService: CourseService,
        private moduleService: VideoService,
        private actionSheetController: ActionSheetController,
        private router: Router
    ) {}

    ngOnInit() {
        this.courseService.getCourses().subscribe(courses => {
            this.courses = courses;

            this.selectedCourse = this.courses[0];
            this.loadModules(this.selectedCourse.INTAKE_CODE);
        });
    }

    loadModules(intakeCode) {
        this.courseService
            .getModules(intakeCode)
            .subscribe((modules: Module[]) => {
                this.modules = modules;
                console.log('Modules loaded:', modules);
            });
    }

    goToModule(module: Module) {
        this.router.navigate([
            '/modules',
            this.selectedCourse.INTAKE_CODE,
            module.MODULE_CODE
        ]);
    }

    async presentIntakesSheet() {
        const mButtons: any[] = [
            {
                text: 'Cancel',
                icon: 'close',
                role: 'cancel'
            }
        ];

        // Populate sheet
        for (const key in this.courses) {
            if (!this.courses.hasOwnProperty(key)) {
                continue;
            }

            const intake = this.courses[key];
            const button = {
                text: intake.INTAKE_CODE,
                handler: () => {
                    this.selectedCourse = this.courses[key];
                    this.loadModules(intake.INTAKE_CODE);
                }
            };

            mButtons.push(button);
        }

        const actionSheet = await this.actionSheetController.create({
            header: 'Choose your intake',
            buttons: mButtons
        });
        await actionSheet.present();
    }
}
