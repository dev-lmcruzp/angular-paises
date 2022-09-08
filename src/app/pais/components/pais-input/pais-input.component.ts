import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit {
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  @Input() placeholder: string = '';

  debouncer: Subject<string> = new Subject();
  termino: string = '';

  ngOnInit(): void {
    this.debouncer
    .pipe(debounceTime(300))// tiempo que de espera emitir el valor, no emite el subscribe
    .subscribe(valor => {
      this.onDebounce.emit(valor);
    })
  }

  buscar() { this.onEnter.emit(this.termino); }
  teclaPrecionada() { this.debouncer.next(this.termino); }

}