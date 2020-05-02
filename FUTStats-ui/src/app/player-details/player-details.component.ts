import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player, PlayerPrice,PlayersService } from '../players.service';
import { fromEventPattern } from 'rxjs';
import { HttpRequest, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {
  playerId: string;
  player: Player[];
  dates: string[];
  playerName : string;
  ps4Data: any;
  xboxData: any;
  pcData: any;
  cols: string[];

  constructor(private playerService: PlayersService, private route: ActivatedRoute) { 
    route.paramMap.subscribe((paramMap) => {
      this.playerId = paramMap.get('id')

      playerService.getPlayer(this.playerId).subscribe(
        data=> {
          var player = data;
          this.player = [player];
          this.playerName = data.name;
          
          var pos = data.pos;
          if (pos == 'GK')
          {
            this.cols = ['Diving', 'Handling', 'Kicking', 'Reflexes', 'Speed', 'Positioning'];
          }
          else{
            this.cols = ['Pace', 'Shooting','Passing','Dribbling','Defending', 'Physicality']
          }
        },
        (error: HttpResponse<any>) => {
          if (error.status === 404){
            alert('Player not found');
          }
          else{
            console.log(error.status + ' - ' + error.body);
            alert('Error on server side please check console');
          }
        }
      );

      playerService.getPlayerPrices(this.playerId).subscribe(
        data=> {
          var ps4 = [];
          var xbox = [];
          var pc= [];
          var dates = [];
          data.forEach(price => {
            ps4.push(price.ps4);
            xbox.push(price.xbox);
            pc.push(price.pc);
            dates.push(price.date)
          });
          
          this.ps4Data = {
            labels: dates,
            datasets: [
              {
                data: ps4,
                fill: false,
                borderColor: '#4bc0c0',
                label: 'PS4 Prices'
              }
            ]
          };

          this.pcData = {
            labels: dates,
            datasets: [
              {
                data: pc,
                fill: false,
                borderColor: '#4bc0c0',
                label: 'PC Prices'
              }
            ]
          };


          this.xboxData = {
            labels: dates,
            datasets: [
              {
                data: xbox,
                fill: false,
                borderColor: '#4bc0c0',
                label: 'Xbox Prices'
              }
            ]
          };

        },
        (error: HttpResponse<any>) => {
          if (error.status === 404){
            alert('Player prices not found');
          }
          else{
            console.log(error.status + ' - ' + error.body);
            alert('Error on server side please check console');
          }
        }
      );

    });

  }

  ngOnInit(): void {
  }

}
