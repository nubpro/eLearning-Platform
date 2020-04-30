import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap, map, take, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from './course';
import { Module } from './module';

@Injectable({
    providedIn: 'root',
})
export class CourseService {
    url = environment.api_url;
    courses = new BehaviorSubject<Course[]>([]);
    modules = new BehaviorSubject<Module[]>([]);

    constructor(private http: HttpClient) {}

    loadCourses() {
        return this.http
            .get(`${this.url}/api/courses`)
            .pipe(tap((courses: Course[]) => this.courses.next(courses)));
    }

    getCourses() {
        return this.loadCourses();
    }

    getCourse(intakeCode: string) {
        return this.loadCourses().pipe(
            switchMap((courses: Course[]) =>
                courses.filter((c) => c.INTAKE_CODE === intakeCode)
            )
        );
    }

    getModules(intakeCode: string) {
        return this.http
            .get(`${this.url}/api/courses/${intakeCode}`)
            .pipe(tap((modules: Module[]) => this.modules.next(modules)));
    }

    getModule(intakeCode: string, moduleCode: string) {
        return this.getModules(intakeCode).pipe(
            switchMap((modules: Module[]) =>
                modules.filter((m) => m.MODULE_CODE === moduleCode)
            )
        );
    }
}
