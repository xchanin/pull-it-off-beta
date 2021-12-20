type ElementType = 'ID' | 'CLASS';

export class CursorModel {

    /**
     * Styles to apply to cursor
     */
    public Classlist?: Array<string>;

    /**
     * Name to target element by - could be 
     * an ID or a class name, etc.
     */
    public ElementIdentifier!: string;

    /**
     * Element type, for checking which
     * element the mouse is over - default to a class
     */
    public Type: ElementType = 'CLASS';

    /**
     * Cursor inner text
     */
    public Label?: string;

    constructor(opts: CursorModel) {
        Object.assign(this, opts); // destructure values
    }
}