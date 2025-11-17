import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

// RxJS (Reactive Extensions for JavaScript)
// Formularios reactivos, HTTP, eventos y manejo de estados

@Component({
  selector: 'app-user-state-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-state-form.html',
  styleUrl: './user-state-form.css',
})
export class UserStateForm {

}
