import { Component, OnInit, ViewChild } from '@angular/core';
import { MatchService } from '../../../services/match.service';

import { ModalController } from '@ionic/angular';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.page.html',
  styleUrls: ['./match-detail.page.scss'],
})
export class MatchDetailPage implements OnInit {
  match: any;
  message!: string;

  @ViewChild('customModal') customModal!: HTMLIonModalElement;

  matches: any[] = [];
  selectedMatch: any;

  betAmount!: number; 
  homeTeamName!: string;
  awayTeamName!: string;
  betType!: string;
  betOdds: number | undefined;

  homeTeamCrest!: string;
  awayTeamCrest!: string;
  score!: number;


  constructor(
    private matchService: MatchService,
    private modalController: ModalController,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
    ) {
    this.match = this.matchService.getSelectedMatch();
  }

  ngOnInit() {
    if (this.match) {
      const homeTeamName = this.match.homeTeam.name;
      const awayTeamName = this.match.awayTeam.name;
      const competitionName = this.match.competition.name;
      const matchday = this.match.matchday;
      const odds = this.match.odds;
      const score = this.match.score;
      const season = this.match.season;
      const stage = this.match.stage;
      const status = this.match.status;
      const utcDate = this.match.utcDate;
      
      console.log(homeTeamName);
      console.log(awayTeamName);
      console.log(competitionName);
      console.log(matchday);
      console.log(odds);
      console.log(score);
      console.log(season);
      console.log(stage);
      console.log(status);
      console.log(utcDate);
    } else {
      this.message = 'Veuillez recharger'
      console.log('Erreur : Aucun match sélectionné');
    }
  }


  openCustomDialog(
    odds: number,
    homeTeam: string,
    awayTeam: string,
    type: string,
    homeTeamCrest: string,
    awayTeamCrest: string,

    ) {
    this.betAmount = 0;
    this.homeTeamName = homeTeam;
    this.awayTeamName = awayTeam;
    this.betType = type;
    this.betOdds = odds;

    this.homeTeamCrest = homeTeamCrest;
    this.awayTeamCrest = awayTeamCrest;
  
    this.customModal.present();
  }
  
  placeBet() {
    this.modalController.dismiss();
  }
  
  closeCustomDialog() {
    this.modalController.dismiss();
  }
}
