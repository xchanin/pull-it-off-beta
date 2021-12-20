import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { VideoModel } from '../../models/video.model';

@Injectable({
  providedIn: 'root'
})

export class VideoService {

  /**
   * If videos are loaded or not
   */
  public Loaded: Subject<boolean>;

  public PlayVideo: Subject<number>;

  /**
   * List of videos
   */
  protected videos!: Array<VideoModel>;

  constructor(protected database: AngularFireDatabase) {

    this.Loaded = new Subject<boolean>();
    this.PlayVideo = new Subject<number>();
  }

  protected isLoaded(): void {

    this.Loaded.next(
      this.videos && this.videos.length > 0 ? true : false
    );
  }

  public PlayVideoById(id: number): void {
    this.PlayVideo.next(id);
  }

  /**
   * Sets local data ('Videos')
   */
  public LoadVideos(): void {

      // Return videos from firebase
      this.database.list('/videos').valueChanges()
      .subscribe(
        // should be type of VideoModel
        (vids: Array<VideoModel | any>): void => {
        this.videos = vids;
        this.isLoaded();
      });
  }

  public FilterVideos(): void {
  
  }

  /**
   * Return a specific video
   *
   * @param id value to find video
   *
   */
  public GetVideoByID(id: number): VideoModel | undefined {

    return this.videos.find((video: VideoModel) => {
     // convert string returned from Firebase to number
     return Number(video.ID) === id;
    });
  }

  /**
   * Return all videos
   */
  public GetVideos(): Array<VideoModel> {

    return this.videos;
  }

}
