export class Notes {
    _id: string;
    title: string;
    content: string;
    date: Date;
    username: string;
    constructor(_id: string, title: string, content: string, date: Date, username: string)
    {
        this._id = _id;
        this.title = title;
        this.content = content;
        this.date = date;
        this.username = username;
    }
}