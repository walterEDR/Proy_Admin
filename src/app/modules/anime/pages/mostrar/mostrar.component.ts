import { Component, OnInit } from '@angular/core';
import { IAnime } from '../../interface/anime';
import { AnimeService } from '../../service/anime.service';
import { FormControl } from '@angular/forms';
import { ChartOptions } from '../../grafica-b/chart-type';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.scss']
})
export class MostrarComponent implements OnInit {


  cards : IAnime[] = [];
  offset = 0;
  term : string = ''

  breadCrumbItems: Array<{}>; //({ label: string; active?: undefined; } | { label: string; active: boolean; })[];

  labels : string[] = [];
  dataGrafica = [];
  colores = [{ backgroundColor: []}];

  dataApex :  Partial<ChartOptions> = {
    series : [
      {
        name : "Series",
        data : []
      }
    ],
    chart:{
      height : 350,
      type : "line"
    },
    title : {
      text : ""
    },
    xaxis : {
      categories : []
    }
  }

  constructor(private animeService: AnimeService){}

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Anime' }, { label: 'Mostrar', active: true }];
  this.cards = [];
  this.getCards();
  }

  getCards(nombreCard : string | null = null){
    this.animeService.getCardsAnimeForma2(nombreCard,this.offset).subscribe((res) => {
      console.log(res);
      this.cards = [...this.cards,...res];
      this.graficar();
      this.graficar2();
    })
  }

  graficar(){
    let grupo = {};
    // se agrupa por tipo
    this.cards.forEach((card) => {
      const tipo = card.type;
      if(!grupo[tipo]){
        grupo[tipo] = [];
      }
        grupo[tipo].push(card);
    });
    console.log(grupo);
    let kyColor ='backgroundColor';
    for(const key in grupo){
      this.labels.push(key);
      this.dataGrafica.push(grupo[key].length);
     this.colores[0].backgroundColor.push(this.getRandomColor());
   // this.colores[0].backgroundColor.push(this.colorHex());
    }

  // para la grafica de barras



  }

  getRandomColor(){
    return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
  }

  generarLetra(){
    let letra=["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"];
    let numero = (Math.random()*15).toFixed(0);
    return letra[numero];
  }

  colorHex(){
    let color = "";
    for(let i=0;i<6;i++){
      color = color + this.generarLetra() ;
    }
    return "#"+color;
  }

graficar2(){
  let grupo = {};
  // se agrupa por tipo
  this.cards.forEach((card) => {
    const tipo = card.type;
    if(!grupo[tipo]){
      grupo[tipo] = [];
    }
      grupo[tipo].push(card);
  });
  let kyColor ='backgroundColor';


  let keySeries = 'series';
  let data = 'data';
  let xaxis = 'xaxis';
  let categories = 'categories';
  for(const key in grupo){
  this.labels.push(key);
  this.dataGrafica.push(grupo[key].length);
  this.colores[0][kyColor].push(this.getRandomColor());

  this.dataApex[keySeries][0][data].push(grupo[key].length);
  this.dataApex[xaxis][categories].push(key);




    }
    this.dataApex.title.text = "Grafica de barras";
  console.log("este",this.dataApex);
}



}
