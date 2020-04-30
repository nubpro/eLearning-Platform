import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap, switchMap, take, mergeAll } from 'rxjs/operators';
import { Video } from './video';

@Injectable({
    providedIn: 'root',
})
export class VideoService {
    url = environment.api_url;
    private _videos = new BehaviorSubject<Video[]>([]);
    private _selectedVideo: Video;

    constructor(private http: HttpClient) {}

    get videos() {
        return this._videos.asObservable();
    }

    fetchVideos(intakeCode: string, moduleCode: string) {
        return this.http
            .get(`${this.url}/api/videos/${intakeCode}/${moduleCode}`)
            .pipe(
                tap((videos: Video[]) => {
                    console.log('Retrieving all videos from API');
                    this._videos.next(videos);
                })
            );
    }

    getVideo(videoId: string) {
        if (this._selectedVideo && this._selectedVideo._id === videoId) {
            return of(this._selectedVideo);
        }

        return this.http.get(`${this.url}/api/watch/${videoId}`).pipe(
            tap((video: Video) => {
                console.log('Retrieving the video from API');
                this._selectedVideo = video;
            })
        );
    }

    addVideo(video: Video) {
        return this.http
            .post(
                `${this.url}/api/videos/${video.intake}/${video.module}`,
                video
            )
            .pipe(
                switchMap((createdVideo: Video) => {
                    video = createdVideo;

                    return this.videos;
                }),
                take(1),
                tap((videos: Video[]) => {
                    this._videos.next(videos.concat(video));
                })
            );
    }

    getTraffic(videoId: string, year: string) {
        return this.http.get(`${this.url}/api/traffic/${videoId}/${year}`);
    }
}
