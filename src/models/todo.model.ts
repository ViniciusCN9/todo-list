export class Todo {
    public id: Number;
    public title: String;
    public done: Boolean;

    constructor(id: Number, title: String, done: Boolean) {
        this.id = id;
        this.title = title;
        this.done = done;
    }
}