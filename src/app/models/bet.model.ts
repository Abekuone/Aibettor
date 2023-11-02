export class Bet {
    id: string; 
    userId: string; 
    matchId: string;  
    betType: 'home' | 'draw' | 'away'; 
    betAmount: number;  
    odds: number; 
    status: 'unresolved' | 'won' | 'lost'; 
  
    constructor(
      userId: string,
      matchId: string,
      betType: 'home' | 'draw' | 'away',
      betAmount: number,
      odds: number,
    ) {
      this.id = '';
      this.userId = userId;
      this.matchId = matchId;
      this.betType = betType;
      this.betAmount = betAmount;
      this.odds = odds;
      this.status = 'unresolved'; 
    }
  }
  