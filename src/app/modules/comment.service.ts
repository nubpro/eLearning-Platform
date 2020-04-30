import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap, switchMap, take } from 'rxjs/operators';
import { Comment } from './comment';

@Injectable({
    providedIn: 'root',
})
export class CommentService {
    url = environment.api_url;
    videoId: string;
    private _comments = new BehaviorSubject<Comment[]>([]);

    constructor(private http: HttpClient) {}

    get comments() {
        return this._comments.asObservable();
    }

    fetchComments(videoId: string) {
        return this.http.get(`${this.url}/api/comments/${videoId}`).pipe(
            tap((comments: Comment[]) => {
                this._comments.next(comments);
            })
        );
    }

    addComment(videoId: string, comment: string) {
        let generatedComment: Comment;

        return this.http
            .post(`${this.url}/api/comments/${videoId}`, {
                comment,
            })
            .pipe(
                switchMap((createdComment: Comment) => {
                    generatedComment = createdComment;
                    return this.comments;
                }),
                take(1),
                tap((data) => {
                    this._comments.next(data.concat(generatedComment));
                })
            );
    }
}
