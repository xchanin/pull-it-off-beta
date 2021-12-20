import { GenericModalModel } from './../../models/generic-modal.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { VideoPlayerComponent } from '../../controls/video-player/video-player.component';
import { VideoModel } from '../../models/video.model';
import { GenericModalService } from '../../services/generic-modal.service';
import { VideoService } from '../../services/video/video.service';

@Component({
  selector: 'pio-videos-page',
  templateUrl: './videos-page.component.html',
  styleUrls: ['./videos-page.component.scss']
})
export class VideosPageComponent implements OnInit, OnDestroy {

  public AutoPlay: boolean;

/**
 * Selected video, video passed to the video component
 */
  public Video: VideoModel;

  /**
   * List of all videos
   */
 public Videos: Array<VideoModel>;

 protected playVideoSubscription: Subscription;
 /**
  * Video loaded subscription,
  * used to listen when videos have loaded
  */
 protected videosLoadedSubscription: Subscription;

  constructor(
    protected videoService: VideoService,
    protected genericModalService: GenericModalService<VideosPageComponent>
    ) {

    this.playVideoSubscription = this.videoService.PlayVideo.subscribe((val: number) => {

      this.AutoPlay = true;
      this.Video = this.videoService.GetVideoByID(val);
      this.OpenVideoModal();
    });

    this.videosLoadedSubscription = this.videoService.Loaded.subscribe((val: boolean) => {
      if (val) {
        this.Video = this.videoService.GetVideoByID(1);
        this.Videos = this.videoService.GetVideos();
      }
    });
   }

  public ngOnInit(): void {

    this.videoService.LoadVideos();
  }

  public ngOnDestroy(): void {

    this.videosLoadedSubscription.unsubscribe();
    this.playVideoSubscription.unsubscribe();
  }

  public OpenVideoModal(): void {
    const modalConfig: GenericModalModel = new GenericModalModel({
      ModalType: 'data',
      CallbackAction: (val: any) => {},
      Component: VideoPlayerComponent,
      Data: {
        AutoPlay: this.AutoPlay,
        Video: this.Video,
        Controls: 'true'
      },
      LabelCancel: 'Cancel',
      LabelAction: 'OK',
      Title: 'Video',
      Width: '50%'
    });

    this.genericModalService.Open(modalConfig);
  }

}
