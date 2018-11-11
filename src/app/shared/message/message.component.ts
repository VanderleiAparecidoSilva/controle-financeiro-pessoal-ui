import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
    <p-message severity="{{severity}}" text="{{text}}" *ngIf="temErro()"></p-message>
  `,
  styles: [`
    .ui-message-error {
      margin: 0;
      margin-top: 4px;
    }
  `]
})
export class MessageComponent {
  @Input() error: string;
  @Input() control: FormControl;
  @Input() text: string;
  @Input() severity: string;

  temErro(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }
}
