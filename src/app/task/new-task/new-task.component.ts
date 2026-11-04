import { Component, EventEmitter, Input, Output } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { newTaskData } from '../single-task/task.model';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  enteredTitle='';
  enteredSummary='';
  enteredDate=''
@Output() cancel=new EventEmitter();
@Output() add = new EventEmitter<newTaskData>();

onCancel(){
  this.cancel.emit()

  }

  onSubmit(){
    this.add.emit({
      title: this.enteredTitle,
      summary: this.enteredSummary,
      dueDate: this.enteredDate
    })
  }
}