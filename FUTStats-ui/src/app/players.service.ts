import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

export interface DetailedStats {
  
}

export interface Player {
  resource_id: string;
  name: string;
  full_name: string;
  overall: string;
  club: string;
  league: string;
  nation: string;
  pos: string;
  k1: string;
  k2: string
  k3: string;
  k4: string;
  k5: string;
  k6: string;
}

export interface PlayerPrice {
  date: string;
  ps4: number;
  xbox: number;
  pc: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(
    public http: HttpClient) {
  }

  getAllPlayers() {
    return this.http.get<Player[]>('/api/getAllPlayers')
  }

  getPlayer(id: string) {
    return this.http.get<Player>('/api/player/' + id)
  }

  getPlayerPrices(id: string){
    return this.http.get<PlayerPrice[]>('/api/price/' + id)
  }

}
