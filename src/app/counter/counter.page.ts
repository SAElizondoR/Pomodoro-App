import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.page.html',
  styleUrls: ['./counter.page.scss'],
})
export class CounterPage implements OnInit {

  data: any;
  taskNumber = 0;
  notify: string;

  workTime:  number;
  breakTime: number;
  longBreakTime:number;
  cycles:number;

  configWork = {
    leftTime: 1500,
    format: 'mm:ss',
  };

  configBreak = {
    leftTime: 300,
    format: 'mm:ss',
  };


  configLongBreak={
    leftTime: 300,
    format: 'mm:ss',
  };


  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if(this.route.snapshot.data['special']){
      
      this.data = this.route.snapshot.data['special'];
    }
    console.log(this.data);
    this.workTime  = this.data[0].work;
    this.breakTime = this.data[0].break;
    this.cycles = this.data[0].cycles;
    this.longBreakTime=this.data[0].longBreakTime;

  

    this.configWork = {
      leftTime: (this.workTime*60),
      format: 'mm:ss',
    };

    this.configBreak = {
      leftTime: (this.breakTime*60),
      format: 'mm:ss',
    };

    this.configLongBreak={
      leftTime: (this.longBreakTime*60),
      format: 'mm:ss',
    };
  }

  playAudio(){
    let audio = new Audio();
    audio.src = "./../../../assets/audio/toctoc.mp3";
    audio.load();
    audio.play();
    return true;
  }

  handleEvent(e: CountdownEvent){
    this.notify = `${e.status}`;
    if (this.notify == '3'){
      this.playAudio();
      this.taskNumber++;
      if (this.taskNumber==(2*this.cycles)-1){   // si llega al ultimo 
        this.taskNumber=0;
        this.router.navigateByUrl('/task');
      }
    }
  }


}

