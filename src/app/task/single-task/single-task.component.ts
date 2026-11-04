import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Task } from './task.model'
import { CardComponent } from "../../shared/card/card.component";
import { TaskService } from '../task.service';

@Component({
  selector: 'app-single-task',
  standalone: true,
  imports: [CardComponent,DatePipe],
  templateUrl: './single-task.component.html',
  styleUrl: './single-task.component.css'
})
export class SingleTaskComponent {
private taskService=inject(TaskService)

@Input({required:true}) task!:Task


onDeleteTask(){
  this.taskService.deletedTask(this.task.id)
}
}
