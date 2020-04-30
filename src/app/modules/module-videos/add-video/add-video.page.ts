import { Component, OnInit } from '@angular/core';
import {
    ModalController,
    LoadingController,
    AlertController,
} from '@ionic/angular';
import {
    BlobService,
    UploadConfig,
    UploadParams,
} from 'angular-azure-blob-service';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

const Config: UploadParams = {
    sas: environment.azure_storage_sas,
    storageAccount: 'elearninghub',
    containerName: 'videos',
};

@Component({
    selector: 'app-add-video',
    templateUrl: './add-video.page.html',
    styleUrls: ['./add-video.page.scss'],
})
export class AddVideoPage implements OnInit {
    intakeCode: string;
    moduleCode: string;

    title: string;
    description: string;
    uploadForm: any;

    // File upload (Azure)
    fileToUpload: File = null;
    config: any;
    percent = 0;

    constructor(
        private modalController: ModalController,
        private blob: BlobService,
        private formBuilder: FormBuilder,
        private alertController: AlertController
    ) {}

    ngOnInit() {
        this.uploadForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(8)]],
            description: ['', Validators.required],
        });
    }

    close() {
        this.modalController.dismiss();
    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files[0];
        console.log(files[0]);
    }

    uploadVideo() {
        const supportedFileTypes = [
            'video/mp4',
            'video/webm',
            'video/quicktime',
        ];

        if (!this.fileToUpload) {
            this.showAlert(
                'Choose a video',
                'Browse and select a video to upload by clicking the file picker.'
            );
        } else {
            const isValid = supportedFileTypes.includes(this.fileToUpload.type);
            if (!isValid) {
                this.showAlert(
                    'Unsupported file type',
                    'Please upload videos only.'
                );
                return;
            }

            const fileName = Date.now() + '-' + this.fileToUpload.name;

            const baseUrl = this.blob.generateBlobUrl(Config, fileName);
            this.config = {
                baseUrl,
                sasToken: Config.sas,
                blockSize: 1024 * 64, // OPTIONAL, default value is 1024 * 32
                file: this.fileToUpload,
                complete: () => {
                    const video = {
                        intake: this.intakeCode,
                        module: this.moduleCode,
                        title: this.title,
                        description: this.description,
                        url: baseUrl,
                    };

                    console.log('Video uploaded: ', baseUrl);

                    this.reset();
                    this.modalController.dismiss(video);
                },
                error: (err) => {
                    console.log('Error:', err);
                    this.reset();
                },
                progress: (percent) => {
                    this.percent = percent;
                },
            };
            this.blob.upload(this.config);
        }
    }

    async showAlert(header: string, message: string) {
        const alert = await this.alertController.create({
            header,
            message,
            buttons: ['OK'],
        });
        alert.present();
    }

    reset() {
        this.percent = 0;
    }

    get title_field() {
        return this.uploadForm.get('title');
    }

    get desc_field() {
        return this.uploadForm.get('description');
    }
}
