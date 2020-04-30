import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap, switchMap, take } from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class QuizService {
    url = environment.api_url;
    videoId: string;
    _data = new BehaviorSubject([]);

    constructor(private http: HttpClient) {}

    get data() {
        return this._data.asObservable();
    }

    fetchQuizzes(videoId: string) {
        // console.log('Quiz service: Fetching quizzes');
        // if (this.videoId === videoId && this.data) {
        //     console.log('Quiz service: Quiz retrieved from cache');
        //     return this.data;
        // } else {
        //     console.log('Quiz service: Quiz retrieved from API');
        //     return this.http.get(`${this.url}/api/quizzes/${videoId}`).pipe(
        //         tap((quizzes: any) => {
        //             this._data.next(quizzes);
        //             this.videoId = videoId;
        //         })
        //     );
        // }

        return this.http.get(`${this.url}/api/quizzes/${videoId}`).pipe(
            tap((quizzes: any) => {
                this._data.next(quizzes);
                this.videoId = videoId;
            })
        );
    }

    createQuiz(videoId: string, quiz: any) {
        return this.http.post(`${this.url}/api/quizzes/${videoId}`, quiz).pipe(
            switchMap((createdQuiz: any) => {
                quiz._id = createdQuiz._id;
                return this.data;
            }),
            take(1),
            tap((data) => {
                this._data.next(data.concat(quiz));
            })
        );
    }

    deleteQuiz(quizId: string) {
        return this.http.delete(`${this.url}/api/quizzes/${quizId}`).pipe(
            switchMap(() => {
                return this.data;
            }),
            take(1),
            tap((data) => {
                this._data.next(data.filter((q) => q._id !== quizId));
            })
        );
    }

    submitResult(
        videoId: string,
        correct_questions: string[],
        wrong_questions: string[],
        score: number
    ) {
        const body = {
            correct_questions,
            wrong_questions,
            score,
        };

        return this.http.post(`${this.url}/api/results/${videoId}`, body);
    }

    getLeaderboard(videoId: string) {
        return this.http.get(`${this.url}/api/leaderboard/${videoId}`);
    }
}
