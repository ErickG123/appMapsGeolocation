import { Component } from '@angular/core';

import { ViewChild, ElementRef } from '@angular/core';

/* Responsável pela parte de Geolocalização */
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { analyzeAndValidateNgModules, ThrowStmt } from '@angular/compiler';

/* Importação da Interface ILocal */
import { ILocal } from '../interfaces/ILocal';

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

  /* Variável que armazena as posições do mapa */
  public listaLocais:ILocal[] = [
    {
      lat: -22.4941369,
      lng: -48.5525349,
      titulo: "Q-tall Pizzaria e Restaurante"
    },
    {
      lat: -22.4982226,
      lng: -48.5642647,
      titulo: "Batata Mania"
    },
    {
      lat: -22.4990042,
      lng: -48.5571168,
      titulo: "Churrasco Grego"
    },
    {
      lat: -22.4941396,
      lng: -48.5599565,
      titulo: "Colégio Tyto Objetivo"
    },
    {
      lat: -22.498255,
      lng: -48.561198,
      titulo: "Chiquinho Sorvetes"
    }
  ];

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
  
    /* Adiciona os marcadores ao mapa */
    for(let local of this.listaLocais){
      this.adicionarMarcador(local);
    }
  
  }
  
  /* Método que adiciona os marcadores no mapa */
  private adicionarMarcador(local: ILocal) {
    /* Desestruturando o objeto */
    const { lat, lng, titulo } = local;

    const marcador = new google.maps.Marker({
      position: { lat, lng}, /* Marca a posição */
      map: this.map, /* Fala em qual mapa ele vai colocar o marcador */
      title: { titulo }, /* Aparece quando coloco o mouse sobre o marcador */
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
