import { Component, inject, Input } from '@angular/core';
import { SingleTaskComponent } from "./single-task/single-task.component";
import { NewTaskComponent } from "./new-task/new-task.component";
import { newTaskData } from './single-task/task.model';
import { TaskService } from './task.service';




@Component({
  selector: 'app-task',
  standalone: true,
  imports: [SingleTaskComponent, NewTaskComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
private taskService=inject(TaskService)

@Input({required:true}) name?:string;
@Input({required:true})userId!:string;


isAdded=false;

get selectedUserTask(){
  return this.taskService.selectedTasks(this.userId)
}

onDeleteTask(id:string){
  this.taskService.deletedTask(id)
}

onStartAddTask(){
  this.isAdded=true
}

onCancelAddTask(){
  this.isAdded=false

}
onSubmit(taskData:newTaskData){
  this.taskService.submitTask(taskData,this.userId)
  this.onCancelAddTask()

}

}
