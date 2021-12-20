import { Component, Input, OnInit } from '@angular/core';
import { MinMaxColumnCountModel } from '../../models/min-max-column-count.model';
import { VideoModel } from '../../models/video.model';
import { VideoService } from '../../services/video/video.service';

@Component({
  selector: 'pio-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {

  /**
   * Set number of grid columns
   */
  // tslint:disable-next-line:variable-name
  private _columnCount: MinMaxColumnCountModel;
  // tslint:disable-next-line:no-input-rename
  @Input('column-count')
  public set ColumnCount(val: MinMaxColumnCountModel) {
    this._columnCount = val;
  }

  public get ColumnCount(): MinMaxColumnCountModel {
    return this._columnCount;
  }

  /**
   * Current column count
   */
  public GridColumnCount: number;

  /**
   * List of videos
   */
  // tslint:disable-next-line:variable-name
  private _videos: Array<VideoModel>;
  @Input('videos')
  public set Videos(val: Array<VideoModel>) {

    if (!val) {
      return;
    }

    this._videos = val;
    this.VideosLoaded = true;
  }

  public get Videos(): Array<VideoModel> {
    return this._videos;
  }

  public VideosLoaded: boolean;

  public Title: string;

  constructor(protected videoService: VideoService) {

    this.ColumnCount = { Min: 3, Max: 4 };
    this.GridColumnCount = this.ColumnCount.Min;
    this.VideosLoaded = false;
    this.Title = 'Card View sdfsdfdsf';
  }

  // Life cycle hooks
  ngOnInit(): void {
  }

  /**
   * Toggle number of columns
   */
  public ToggleGridColumns(): void {

    this.GridColumnCount = (this.GridColumnCount ===
                            this.ColumnCount.Min ? this.ColumnCount.Max : this.ColumnCount.Min);
  }

  public Play(idx: number): void {
    this.videoService.PlayVideoById(idx + 1);
  }
}