import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-clear-button',
  templateUrl: './clear-button.component.html',
  styleUrls: ['./clear-button.component.css']
})
export class ClearButtonComponent {
  @Input() showButton: boolean = false;
  @Output() clearClick: EventEmitter<any> = new EventEmitter();

  onClearClick() {
    this.clearClick.emit();
  }
}
