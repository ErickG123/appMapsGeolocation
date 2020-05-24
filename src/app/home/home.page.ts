import { Component } from '@angular/core';

import { ViewChild, ElementRef } from '@angular/core';

/* Responsável pela parte de Geolocalização */
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { analyzeAndValidateNgModules, ThrowStmt } from '@angular/compiler';

/* Variavel que faz a biblioteca do Google operar */
/* Biblioteca script do index.html */
declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  /* Variável do mapa */
  map: any;
  posicaoAtual: any;

  /* @ViewChild Pega o elemento mapa da home.page.html e coloca elementos filhos dentro dela */
  /* 'mapRef' faz referência ao '#map' da home.page.html */
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  /* Importação do Geolocation */
  constructor(private geolocation: Geolocation) { }

  /* Método que mostra o mapa */
  /* Como não sabe o tempo que vai demorar para achar o posição a função precisa ser 'async' */
  public async showMap() {
    
    /* Pegando a posição pelo GPS */
    await this.buscarPosicao();

    /* Ajuste do mapa */
    const options = {
      center: this.posicaoAtual, /* Centraliza o mapa na posição atual */
      zoom: 15,
      disableDefaultUI: true
    }

    /* Declarando que o mapa seré exibido de acordo com o 'mapRef' e 'options' */
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  
    /* Marcador para a posição atual */
    const marcador = new google.maps.Marker({
      position: this.posicaoAtual, /* Marca a posição */
      map: this.map, /* Fala em qual mapa ele vai colocar o marcador */
      title: "Minha posição atual", /* Aparece quando coloco o mouse sobre o marcador */
      animation: google.maps.Animation.BOUNCE
    });

    /* Variável que guarda a localização */
    /* Latitude e Longitude */
    const location2 = new google.maps.LatLng(-22.4941369,-48.5525349);
    const marcador2 = new google.maps.Marker({
      position: location2, /* Marca a posição */
      map: this.map, /* Fala em qual mapa ele vai colocar o marcador */
      title: "Q-tall Pizzaria e Restaurante", /* Aparece quando coloco o mouse sobre o marcador */
      animation: google.maps.Animation.BOUNCE
    });

    const location3 = new google.maps.LatLng(-22.4982226,-48.5642647);
    const marcador3 = new google.maps.Marker({
      position: location3, /* Marca a posição */
      map: this.map, /* Fala em qual mapa ele vai colocar o marcador */
      title: "Batata Mania", /* Aparece quando coloco o mouse sobre o marcador */
      animation: google.maps.Animation.BOUNCE
    });

    const location4 = new google.maps.LatLng(-22.4990042,-48.5571168);
    const marcador4 = new google.maps.Marker({
      position: location4, /* Marca a posição */
      map: this.map, /* Fala em qual mapa ele vai colocar o marcador */
      title: "Churrasco Grego", /* Aparece quando coloco o mouse sobre o marcador */
      animation: google.maps.Animation.BOUNCE
    });

    const location5 = new google.maps.LatLng(-22.4941396,-48.5599565);
    const marcador5 = new google.maps.Marker({
      position: location5, /* Marca a posição */
      map: this.map, /* Fala em qual mapa ele vai colocar o marcador */
      title: "Colégio Tyto Objetivo", /* Aparece quando coloco o mouse sobre o marcador */
      animation: google.maps.Animation.BOUNCE
    });

    const location6 = new google.maps.LatLng(-22.498255,-48.561198);
    const marcador6 = new google.maps.Marker({
      position: location6, /* Marca a posição */
      map: this.map, /* Fala em qual mapa ele vai colocar o marcador */
      title: "Chiquinho Sorvetes", /* Aparece quando coloco o mouse sobre o marcador */
      animation: google.maps.Animation.BOUNCE
    });
  }

  /* Chamando o método */
  /* A função shoowMap() só funciona depois que o HTML está pronto */
  ionViewDidEnter() {
    this.showMap();
  }

  /* Função resposável por pegar a Geolocalização da pessoa */
  /* Como não sabe o tempo que vai demorar para achar o posição a função precisa ser 'async' */
  public async buscarPosicao() {
    /* Pega a geolicalização e guarda no posicaoGPS */
    await this.geolocation.getCurrentPosition().then((posicaoGPS) => {

    /* Pegando a posição do GPS */
    this.posicaoAtual = {
      lat: posicaoGPS.coords.latitude,
      lng: posicaoGPS.coords.longitude
    }

    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

}
