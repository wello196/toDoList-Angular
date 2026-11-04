import { Component, computed, EventEmitter, inject, input, Input, Output } from '@angular/core';

import { User } from './user.model';
import { CardComponent } from "../shared/card/card.component";
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  
private userData=inject(UserService);
@Input({required:true}) user!:User;
@Input({required:true}) selected!:boolean

get imagePath(){
  return `assets/users/${this.user.avatar}`
}
 
  
  onSelectUser(){
    this.userData.onSelectUser(this.user.id)
  }

}
