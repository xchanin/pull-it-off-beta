import { Subject } from 'rxjs/internal/Subject';
import { Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter, Inject } from '@angular/core';
import { ControlList, CrossOrigin } from '../../data-types/video.types';
import { VideoModel } from './../../models/video.model';
import { Observable } from 'rxjs/internal/Observable';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenericModalModel } from '../../models/generic-modal.model';

@Component({
  selector: 'pio-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})

export class VideoPlayerComponent implements OnInit {

  protected playerReady: Subject<boolean>;

  /**
   * video player element
   */
  @ViewChild('player')
  public Player: ElementRef; 

// Inputs

  /**
   * Toggle video auto play
   */
  @Input('auto-play')
  public AutoPlay: boolean;

  /**
   * Hide/Show video controls
   */
  @Input('controls')
  public Controls: string;

  /**
   * Hide/Show download, fullscreen, remote playback
   *
   * (nodownload, nofullscreen, noremoteplayback)
   *
   * Experimental and may not work (should not be used in production)
   */
  @Input('controls-list')
  public ControlsList: ControlList;

  /**
   * Indicates whether to use CORS to be used
   *
   * (anonymous, use-credentials, or '' - empty string is the same as anonymous)
   */
  @Input('cross-origin')
  public CrossOrigin: CrossOrigin;

  /**
   * Hide/Show picture-in-picture option
   *
   * Experimental and may not work (should not be used in production)
   */

  @Input('disable-picture-in-picture')
  public DisablePictureInPicture: boolean;

  /**
   * Whether or not the browser will seek back to the start of the video
   */
  @Input('loop')
  public Loop: boolean;

  /**
   * Default setting of audio
   */
  @Input('muted')
  public Muted: boolean;

  /**
   * Indicates if the video should be played 'inline'
   *
   * Absence doesn't mean the video will be played at fullscreen
   */
  @Input('plays-inline')
  public PlaysInline: string;

  /**
   * Video to play
   */
  // tslint:disable-next-line:variable-name
  private _video: VideoModel;
  @Input('video')
  set Video(val: VideoModel) {
    this._video = val;
  }

  get Video(): VideoModel {
    return this._video;
  }

  // Outputs

  /**
   * Event when current time changes
   */
  @Output('current-time')
  public CurrentTime: EventEmitter<number>;

  /**
   * Event when duration changes
   */
  @Output('duration')
  public Duration: EventEmitter<number>;

  /**
   * Event when video ends
   */
  @Output('ended')
  public Ended: EventEmitter<boolean>;

  /**
   * Event when video is playing
   */
  @Output('playing')
  public Playing: EventEmitter<boolean>;

  /**
   * Event when video is paused
   */
  @Output('paused')
  public Paused: EventEmitter<boolean>;

  /**
   * Event when volume changes
   */
  @Output('volume-change')
  public VolumeChange: EventEmitter<number>;

  /**
   * Event when video is waiting, lack of data
   */
  @Output('wating')
  public Waiting: EventEmitter<boolean>;

  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: GenericModalModel,
    public dialogRef: MatDialogRef<VideoPlayerComponent>
  ) {
    this.CurrentTime = new EventEmitter<number>();
    this.Duration = new EventEmitter<number>();
    this.Ended = new EventEmitter<boolean>();
    this.Playing = new EventEmitter<boolean>();
    this.Paused = new EventEmitter<boolean>();
    this.Waiting = new EventEmitter<boolean>();
    this.VolumeChange = new EventEmitter<number>();
    this.playerReady = new Subject<boolean>();
  }

  ngOnInit(): void {

    this.Video = this.data.Data.Video;
    this.AutoPlay = this.data.Data.AutoPlay;
    this.Controls = this.data.Data.Controls;
  }

  public PLayVideo(): void {
   // this.Player.play();
  }

  /**
   * Video duration
   */
  public OnDurationChange(): void {
    this.Duration.emit(this.Player.nativeElement.duration);
  }

  /**
   * Video has ended
   */
  public OnEnded(): void {
    this.Ended.emit(true);
  }

  /**
   * Video is playing
   */
  public OnPlaying(): void {
    this.Playing.emit(true);
  }

  /**
   * Video is paused
   */
  public OnPaused(): void {
    this.Paused.emit(this.Player.nativeElement.paused);
  }

  /**
   * Video's current time
   */
  public OnTimeUpdate(): void {
    this.CurrentTime.emit(this.Player.nativeElement.currentTime);
  }
  /**
   * Audio volume changed
   */
  public OnVolumeChange(evt: Event): void {
    this.VolumeChange.emit(this.Player.nativeElement.volume);
  }

  /**
   * Video is waiting, lack of data
   */
  public OnWaiting(): void {
    this.Waiting.emit(true);
  }

  protected enterFullScreen(): void {}
}