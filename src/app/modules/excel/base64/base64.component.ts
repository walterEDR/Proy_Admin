import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { ExcelService } from '../services/excel.service';

@Component({
  selector: 'app-base64',
  templateUrl: './base64.component.html',
  styleUrls: ['./base64.component.scss']
})
export class Base64Component implements OnInit {
  myimage : string;
  codigoBase64 : string;
  constructor() { }

  ngOnInit(): void {
  }

  onChange($event : Event){
    const target = $event.target as HTMLInputElement;
    const files = (target.files as FileList)[0];

    const observable = new Observable((subscriber: Subscriber<any>) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files);
        fileReader.onload = () => {
          subscriber.next(fileReader.result);
          subscriber.complete();
        }
        fileReader.onerror = (error) => {
          subscriber.error(error);
          subscriber.complete();
        }
    });

    observable.subscribe((resp : string) => {
      this.myimage = resp;
      this.codigoBase64 = resp;
    })
  }



}
