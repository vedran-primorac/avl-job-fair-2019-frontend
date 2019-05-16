import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import { Axis, Sequence, Point } from 'src/assets/lib/avl-xy-chart/interfaces/sequence';
// import { SignalService, SignalMetaData, SignalValue } from 'src/assets/lib/avl-xy-chart/interfaces/signal';
// import { ReplaySubject, Subject, Observable } from 'rxjs';

// import { HttpClient } from "@angular/common/http";
import { CO2SignalService } from './CO2Signal.service';
import { Point, Axis, Sequence } from 'src/assets/lib/avl-xy-chart/interfaces/sequence';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Job-Fair-frontend';

  @ViewChild('demoChart')
  chart: ElementRef;

  constructor(private signalService: CO2SignalService) {
  }

  ngOnInit(): void {
    this.initChart(this.chart.nativeElement);
    //this.getValues().subscribe(values => this.initChart2(this.chart.nativeElement, values));
    
  }

  private initChart(chartElement): void {
    chartElement.initialize('Demo xy-chart', new Axis('#3E3D3D', 'time'), 400, 1000);

    this.signalService.SignalMetaData.subscribe(smd => {
      const CO2equence = new Sequence(smd.Name, new Axis('#3C9EB8', smd.Name));
      chartElement.addSequence(CO2equence);

      this.signalService.Signal.subscribe(value =>
        CO2equence.addPoints([new Point(value.TimeStamp, value.Value as number)])
      );
    });
    
  }

  // initChart = (chartElement) => {
  //   chartElement.initialize('Demo xy-chart', new Axis('#3E3D3D', 'time'), 400, 1000);

  //   const powerSignalService = new MockSignalService('Power');
  //   powerSignalService.SignalMetaData.subscribe(smd => {
  //     const powerSequence = new Sequence(smd.Name, new Axis('#3C9EB8', smd.Name));
  //     chartElement.addSequence(powerSequence);

  //     powerSignalService.Signal.subscribe(value =>
  //       powerSequence.addPoints([new Point(value.TimeStamp, value.Value as number)])
  //     );
  //   });

  //   const torqueSignalService = new MockSignalService('Torque');
  //   torqueSignalService.SignalMetaData.subscribe(smd => {
  //     const torqueSequence = new Sequence(smd.Name, new Axis('#DC3229', smd.Name));
  //     chartElement.addSequence(torqueSequence);

  //     torqueSignalService.Signal.subscribe(value =>
  //       torqueSequence.addPoints([
  //         new Point(value.TimeStamp, value.Value as number)
  //       ])
  //     );
  //   });
  // };
}


// export class MockSignalService implements SignalService {
//   private x = 0;

//   constructor(public readonly id: string) {
//     this.SignalMetaData = new ReplaySubject<SignalMetaData>(1);
//     this.Signal = new Subject<SignalValue>();
//     this.SignalMetaData.next({
//       Id: this.id,
//       Name: this.id,
//       DataType: 'number'
//     })
//     this.startEmitingValues();
//   }

//   private startEmitingValues(): void {
//     setInterval(() => {
//       this.Signal.next({ Id: this.id, Value: Math.random() * 100, TimeStamp: this.x++ });
//     }, 500);
//   }

//   public Signal: Subject<SignalValue>;
//   public SignalMetaData: ReplaySubject<SignalMetaData>;
// }
