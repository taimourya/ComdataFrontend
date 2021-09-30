import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {



  temps: any;

  constructor() { }

  ngOnInit(): void {



  }

  onStartPause() {



  }

  onEndPause() {
    let socket: WebSocket = new WebSocket('ws://localhost:8085/Move');
    socket.onopen = () => {
      console.log('socket started');
    };

    socket.onmessage = (event: { data: string; }) => {
      console.log('message : ' + event.data);
    }
  }

  onStartInactif() {
  }

  onEndInactif() {
  }

}
