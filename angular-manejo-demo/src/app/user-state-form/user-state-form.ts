import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
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
export class UserStateForm implements OnInit, OnDestroy {
  form!: FormGroup;
  private destroy$ = new Subject<void>();

  liveValue: any = {};
  liveStatus: string | null = null;
  emailSuggestions: string[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
        age: [null, [Validators.min(14), Validators.max(120)]],
        subscribe: [false],
      },
      { Validators: this.passwordsMatchValidator }
    );

    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.liveValue = value;
    });

    this.form
      .get('fullName')
      ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((name) => {
        if (name && typeof name === 'string') {
          const normalized = name.trim().toLocaleLowerCase().replace(/\s+/g, '.');
          this.emailSuggestions = [`${normalized}@gmail.com`, `${normalized}@example.com`];
        } else {
          this.emailSuggestions = [];
        }
      });

    this.form
      .get('email')
      ?.valueChanges.pipe(debounceTime(400), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((email) => {
        console.log('Email changed (debounce): ', email);
      });
  }

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const pwd = control.get('password')?.value;
    const cpwd = control.get('confirmPassword')?.value;
    if (!pwd || !cpwd) return null;
    return pwd === cpwd ? null : { passwordMismatch: true };
  }

  get fullName() {
    return this.form.get('fullName');
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
  get age() {
    return this.form.get('age');
  }
  get subscribe() {
    return this.form.get('subscribe');
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('FORM SUBMIT: ', this.form.value);
    alert('Formulario válido, revisa la consola');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
