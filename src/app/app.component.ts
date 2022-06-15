import { Component, Type } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { isEmpty } from 'rxjs';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todos: Todo[] = [];
  public homeTitle: string = "Minhas tarefas";
  public form: FormGroup;
  public mode: string = 'list';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ["", Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    })

    this.load();
  }

  changeMode(mode: string) {
    this.mode = mode;
  }

  add() {
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear();
    this.changeMode('list');
  }

  clear() {
    this.form.reset();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.save();
    }
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }

  markAsUndone(todo: Todo) {
    todo.done = false;
    this.save();
  }

  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem("todos", data);
  }

  load() {
    const local = localStorage.getItem("todos")
    if (!local) {
      localStorage.setItem("todos", JSON.stringify([]));
      return
    }

    const data = JSON.parse(local)
    this.todos = data;
  }
}
