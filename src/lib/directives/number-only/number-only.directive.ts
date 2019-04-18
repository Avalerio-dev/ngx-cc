import { ElementRef, Directive, Input, HostListener } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive({
  selector: '[ngxNumberOnly]'
})
export class NumberOnlyDirective {

  @Input()
  get ngxNumberOnly() {
    return this._ngxNumberOnly;
  }

  set ngxNumberOnly(flag: boolean) {
    this._ngxNumberOnly = coerceBooleanProperty(flag);
  }

  @Input() ngxMaxLength: number;

  private _ngxNumberOnly: boolean;

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if (this.ngxNumberOnly) {
      if ([46, 8, 9, 27, 13, 110, 190].indexOf(event.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (event.keyCode === 65 && (event.ctrlKey || event.metaKey)) ||
        // Allow: Ctrl+C
        (event.keyCode === 67 && (event.ctrlKey || event.metaKey)) ||
        // Allow: Ctrl+V
        (event.keyCode === 86 && (event.ctrlKey || event.metaKey)) ||
        // Allow: Ctrl+X
        (event.keyCode === 88 && (event.ctrlKey || event.metaKey)) ||
        // Allow: home, end, left, right
        (event.keyCode >= 35 && event.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
      }
      // Ensure that it is a number and stop the keypress
      if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) {
        event.preventDefault();
      }
      // If creditcard number exceeds the limit provided by braintree api return false.
      if (this.ngxMaxLength) {
        const value = (event.target as HTMLInputElement).value.replace(/\s/g, '').length;
        return (value < this.ngxMaxLength);
      }
    }
  }

  constructor(private elRef: ElementRef<HTMLInputElement>) { }

}
