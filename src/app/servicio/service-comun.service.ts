import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceComunService {

  constructor() { }

  titlesApp(param: string) {
    let title;

    if (param === "logo") {
      title = "WineCmp";
    }
    else if (param === "logo2") {
      title = "WineNoseque";
    }

    return title;
  }
}
