import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl, Validators, Form } from '@angular/forms';
import { CommonModule } from '@angular/common'; // *ngFor, *ngIf => Control Flow @if @for @switch

@Component({
  selector: 'app-budget-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './budget-form.html',
  styleUrl: './budget-form.css',
})
export class BudgetForm {
  budgetForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.budgetForm = this.fb.group({
      owner: new FormControl('', [Validators.required, Validators.minLength(3)]),
      month: new FormControl('', Validators.required),
      expenses: this.fb.array([this.createExpesesGroup()])
    });
  }

  private createExpesesGroup(): FormGroup {
    return this.fb.group({
      id: this.gerenateId(),
      decription: new FormControl('', Validators.required),
      amount: new FormControl(0, [Validators.required, Validators.min(0.01)]),
      category: new FormControl('')
    });
  }

  private gerenateId(): FormControl {
    const uid = `${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`;
    return new FormControl(uid);
  }
}
