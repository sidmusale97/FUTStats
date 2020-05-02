import { Component, OnInit } from '@angular/core';
import { PlayersService, Player } from '../players.service'
import { SelectItem } from 'primeng/api';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  players: Player[];
  loading: boolean;
  timeout: any;
  overallFilter: number;
  positions : SelectItem[];
  constructor(public playerService: PlayersService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.getAllPlayers();
    this.positions = [
      {label: 'CAM', value: 'CAM'},
      {label: 'ST', value: 'ST'},
      {label: 'CF', value: 'CF'},
      {label: 'CB', value: 'CB'},
      {label: 'GK', value: 'GK'},
      {label: 'LW', value: 'LW'},
      {label: 'CM', value: 'CM'},
      {label: 'CDM', value: 'CDM'},
      {label: 'RW', value: 'RW'},
      {label: 'LM', value: 'LM'},
      {label: 'RB', value: 'RB'},
      {label: 'LB', value: 'LB'},
      {label: 'RM', value: 'RM'},
      {label: 'RWB', value: 'RWB'},
      {label: 'LWB', value: 'LWB'},
      {label: 'RF', value: 'RF'},
      {label: 'LF', value: 'LF'}
    ];

  
  }

  getAllPlayers() {
    this.playerService.getAllPlayers().subscribe(
      data => {
        this.players = data;
      },
      error => {
        alert("API not successsful")
        console.log(error)
      }
    )
    this.loading = false;
  }

  onOverallChange(event, dt)
  {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() =>{
      dt.filter(event.value, 'overall', 'lt');
    } ,250);
  }

}
