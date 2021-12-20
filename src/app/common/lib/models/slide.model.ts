export class SlideModel {

    /**
     * Action button class list
     */
     public ButtonClasslist?: Array<string>;

     /**
     * Action button label
     */
    public ButtonLabel?: string;

    /**
     * Slide detail text
     */
    public Detail!: string;

    /**
     * Slide image
     */
    public Image!: string;

    /**
     * Image class list
     */
    public ImageClasslist?: Array<string>;

    /**
     * Image alt value
     */
    public ImageAlt?: string;

    /**
     * Slide subtitle
     */
    public SubTitle!: string;

    /**
     * subtitle class list
     */
    public SubTitleClasslist?: Array<string>

    /**
     * Slie title
     */
     public Title!: string;

     /**
      * Class for title swipe hover color
      */
     public TitleSwipeColor?: string;

     constructor(opts: SlideModel) {
        Object.assign(this, opts); // destructure values
     }

}