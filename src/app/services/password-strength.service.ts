import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  calculateStrength(password: string): string[] {
    const charPassword = password.split('');
    const minPasswordLength = 8;

    const symbols = ' ! @ # $ % ^ & * ( ) - _ + = { } : " , . < > ~ / ';
    const letters = 'a-zA-Z';
    const numbers = '0-9';

    if (password.length === 0) {
      return ['gray', 'gray', 'gray'];
    } else if (password.length < minPasswordLength) {
      return ['red', 'red', 'red'];
    } else if (
      new RegExp(`^[${letters}]+$`).test(password) ||
      new RegExp(`^[${numbers}]+$`).test(password) ||
      new RegExp(`^[${symbols}]+$`).test(password)
    ) {
      return ['red', 'gray', 'gray'];
    } else if (
      new RegExp(`^[${letters}]+[${symbols}]+$`).test(password) ||
      new RegExp(`^[${symbols}]+[${numbers}]+$`).test(password) ||
      new RegExp(`^[${letters}]+[${numbers}]+$`).test(password) ||
      new RegExp(`^[${numbers}]+[${symbols}]+$`).test(password) ||
      new RegExp(`^[${numbers}]+[${letters}]+$`).test(password) ||
      new RegExp(`^[${symbols}]+[${letters}]+$`).test(password)
    ) {
      return ['yellow', 'yellow', 'gray'];
    } else {
      return ['green', 'green', 'green'];
    }
  }
}
