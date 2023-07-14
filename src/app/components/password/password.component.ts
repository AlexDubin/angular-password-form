import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PasswordService } from '../../services/password-strength.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true
    }
  ]
})
export class PasswordComponent implements ControlValueAccessor, OnInit {
  password: string = '';
  passwordStrength: string[] = ['gray', 'gray', 'gray'];

  constructor(private passwordService: PasswordService) {}

  ngOnInit() {
    this.calculateStrength();
  }

  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: any): void {
    if (value !== undefined) {
      this.password = value;
      this.calculateStrength();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // You can add implementation for disabling the component if needed
  }

  calculateStrength() {
    this.passwordStrength = this.passwordService.calculateStrength(this.password);
    this.onChange(this.password);
  }

  getStrengthClass(index: number) {
    return this.passwordStrength[index];
  }

  clearPassword() {
    this.password = '';
    this.calculateStrength();
    this.onTouch();
  }
}
