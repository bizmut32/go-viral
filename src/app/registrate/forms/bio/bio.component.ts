import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { animation } from 'src/app/components/animations';
import { Subscription } from 'rxjs';
import { RegistrationService } from 'src/app/services/registration.service';
import { clearInterval } from 'timers';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css'],
  animations: [animation()]
})
export class BioComponent implements OnInit {
  help: boolean;

  description: string;
  videoVisible: boolean;
  isRecording: boolean;
  recordingTime: number;
  intervalId: number;

  @ViewChild('form') form;
  @ViewChild('cameraView') cameraView: ElementRef<HTMLVideoElement>;
  constructor(private link: ActivatedRoute, private registration: RegistrationService) {}

  ngOnInit() {
    this.setRegistrationType(this.link.snapshot.parent.params);
  }

  initializeCamera() {
    this.videoVisible = true;
    const constraints = { video: { facingMode: 'environment' }, audio: false };
    navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      this.cameraView.nativeElement.srcObject = stream;
    })
    .catch(function(error) {
      console.error('Oops. Something is broken.', error);
    });
  }
  setRegistrationType(params) {
    this.help = params.help === 'help';
  }

  next() {
    this.registration.registrationData.bio = {};
    if (this.description.length) this.registration.registrationData.bio.bio = this.description;
    if (this.recordingTime) this.registration.registrationData.bio.video = { length: this.recordingTime };
    this.registration.next.next();
  }

  prev() {
    this.registration.prev.next();
  }

  toggleRecording() {
    if (this.isRecording) this.endRecording();
    else this.startRecording();
  }

  startRecording() {
    this.isRecording = true;
    this.recordingTime = 0;
    this.intervalId = window.setInterval(() => {
      this.recordingTime++;
    }, 1000);
  }

  endRecording() {
    this.isRecording = false;
    window.clearInterval(this.intervalId);
  }
}
