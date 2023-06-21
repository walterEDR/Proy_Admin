import { Injectable } from '@angular/core';
import { IAnime } from '../interface/anime';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

  cards : IAnime[] = [];

  constructor(private http : HttpClient) { }

  getCardsAnime(offset = 0){
    const params : any = { // estos son los parametros que acepta la api
      num : 50,
      offset,                 // esta forma es equivalente a offset = offset
    };
    // los pipes y map nos sirven cuan queremos editar la respuesta y obtener algo en especifico
    // como los datos vienen en un array llamado data, necesitamos alterar la respuesta
    // poe eso usamos el pipe para poder usar el map
    return this.http.get<IAnime[]>(this.url,{params}).pipe(map((res:any)=> res.data))
  }

  getCardsAnimeForma2(nombreCard: string | null, offset = 0 ){
    const params : any = { // estos son los parametros que acepta la api
      num : 50,
      offset,                 // esta forma es equivalente a offset = offset
    };
if(nombreCard)
params.fname = nombreCard;
return this.http.get<IAnime[]>(this.url,{params}).pipe(map((res:any)=> res.data))


  }

  busquedas(nombreCard:string | null, offset = 0){
    const params : any = { // estos son los parametros que acepta la api
      num : 50,
      offset,                 // esta forma es equivalente a offset = offset
    };
    if (nombreCard) {
      this.cards = [];
      params.fname = nombreCard;
    }

    this.http.get<IAnime[]>(this.url, { params }).subscribe((resp : any) => {
      console.log(resp.data);
      this.cards = [...this.cards, ...resp.data];
    });
  }

}
