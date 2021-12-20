export type VendorTypes = 'youtube' | 'vimeo' | 'hosted';

export class VideoModel {

    /**
     * Optional Description of video
     */
    public Description?: string;

    /**
     * Video ID
     */
    public ID?: number;

    /**
     * Set default video
     */
    public IsDefault?: boolean;

    /**
     * Type of video data
     */
    public MimeType?: string;

    public SubTitle?: string;

    /**
     * Static image of video
     */
    public Thumbnail?: string;

    public Title?: string;

    /**
     * Video URL
     */
    public URL?: string;

    /**
     * Video vendor, YouTube, Vimeo, or Hosted (video hosted on your server)
     */
    public Vendor?: VendorTypes;


    constructor(opts: VideoModel) {
        Object.assign(this, opts); // destructure values
    }
}
