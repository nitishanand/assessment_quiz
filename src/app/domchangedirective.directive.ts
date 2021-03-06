import { Directive, Output, ElementRef, OnDestroy, EventEmitter } from '@angular/core';

@Directive({
  selector: '[domChange]'
})
export class DomchangedirectiveDirective implements OnDestroy {
  private changes: MutationObserver;

  @Output()
  public domChange = new EventEmitter();

  constructor(private elementRef: ElementRef) {
    const element = this.elementRef.nativeElement;

    this.changes = new MutationObserver((mutations: MutationRecord[]) => {
      mutations.forEach((mutation: MutationRecord) => this.domChange.emit(mutation));
    });

    this.changes.observe(element, {
      attributes: true,
      childList: true,
      characterData: true
    });
  }

  ngOnDestroy() {
    this.changes.disconnect();
  }

}
