import { Injectable } from '@angular/core';
import { Bet } from '../models/bet.model';  

@Injectable({
  providedIn: 'root',
})
export class BetService {
  private bets: Bet[] = [];  

  constructor() {}

  createBet(bet: Bet) {
    this.bets.push(bet);  
  }

  getBetsByUserId(userId: string): Bet[] {
    return this.bets.filter((bet) => bet.userId === userId);
  }
}
