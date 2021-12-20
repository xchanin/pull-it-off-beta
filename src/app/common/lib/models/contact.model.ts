export class ContactModel {

    /**
     * Contact comment
     */
     public Comment!: string;

    /**
     * Email Address
     */
    public Email!: string;

    /**
     * Full name
     */
    public FullName!: string;

    constructor(opts: ContactModel) {
        Object.assign(this, opts); // destructure values
    }
}