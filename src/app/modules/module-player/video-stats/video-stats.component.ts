import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { VideoService } from '../../video.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-video-stats',
    templateUrl: './video-stats.component.html',
    styleUrls: ['./video-stats.component.scss'],
})
export class VideoStatsComponent implements OnInit {
    @ViewChild('trafficCanvas', { static: true }) trafficCanvas: ElementRef;
    private trafficChart: Chart;

    videoId: string;
    trafficData: any;

    constructor(
        private videoService: VideoService,
        private route: ActivatedRoute,
        private alertController: AlertController
    ) {
        this.trafficData = [
            { month: 'Jan', views: null },
            { month: 'Feb', views: null },
            { month: 'Mar', views: null },
            { month: 'Apr', views: null },
            { month: 'May', views: null },
            { month: 'Jun', views: null },
            { month: 'Jul', views: null },
            { month: 'Aug', views: null },
            { month: 'Sep', views: null },
            { month: 'Oct', views: null },
            { month: 'Nov', views: null },
            { month: 'Dec', views: null },
        ];
    }

    get data() {
        return this.trafficData.map((d) => d.views);
    }

    get labels() {
        return this.trafficData.map((d) => d.month);
    }

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            this.videoId = params.get('video_id');

            this.onYearChange('2020');
        });
    }

    async showAlert(message: string) {
        const alert = await this.alertController.create({
            message,
            header: 'Oops!',
            buttons: ['OK'],
        });
        alert.present();
    }

    onYearChange(year: string) {
        this.videoService
            .getTraffic(this.videoId, year)
            .subscribe((dataset: any) => {
                // Reset view count
                this.trafficData.forEach((d) => {
                    d.views = null;
                });

                if (dataset.length < 1) {
                    this.showAlert(`There is no data for Year ${year}.`);
                }

                for (const data of dataset) {
                    const i = data._id.month - 1;

                    this.trafficData[i].views = data.views;
                }

                this.createChart(this.labels, this.data);
            });
    }

    createChart(labels, data) {
        this.trafficChart = new Chart(this.trafficCanvas.nativeElement, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Views',
                        fill: true,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',

                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,

                        data,
                    },
                ],
            },
            options: {
                legend: {
                    display: false,
                },
            },
        });
    }
}
