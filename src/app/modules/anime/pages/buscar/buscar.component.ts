import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';



@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})
export class BuscarComponent implements OnInit {

  cardText = new FormControl('');

@Output()
buscar = new EventEmitter<string | null>();

constructor(){}

ngOnInit(): void {
 this.inputReactivo();
}

inputReactivo(){
  this.cardText.valueChanges
  .pipe(debounceTime(1500)
  ).subscribe((res) => {
    console.log('buscado', res);
    this.buscar.emit(res);

  });
  this.buscar.emit();
}


}
