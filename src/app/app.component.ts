import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Point, Axis, Sequence } from 'src/assets/lib/avl-xy-chart/interfaces/sequence';
import { audiCO2SignalService } from './audiCO2SignalService';
import { bmwCO2SignalService } from './bmwCO2SignalService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Job-Fair-frontend';

  @ViewChild('demoChart')
  chart: ElementRef;

  constructor(private audiSignalService: audiCO2SignalService, private bmwSignalService: bmwCO2SignalService) {
  }

  ngOnInit(): void {
    this.initChart(this.chart.nativeElement);
  }

  private initChart(chartElement): void {
    chartElement.initialize('Demo xy-chart', new Axis('#3E3D3D', 'time'), 400, 1000);

    this.audiSignalService.SignalMetaData.subscribe(smd => {
      const CO2equence = new Sequence(smd.Name, new Axis('#3C9EB8', smd.Name));
      chartElement.addSequence(CO2equence);

      this.audiSignalService.Signal.subscribe(value =>
        CO2equence.addPoints([new Point(value.TimeStamp, value.Value as number)])
      );
    });

    this.bmwSignalService.SignalMetaData.subscribe(smd => {
      const CO2equence = new Sequence("bmw", new Axis('red', "bmw"));
      chartElement.addSequence(CO2equence);

      this.bmwSignalService.Signal.subscribe(value =>
        CO2equence.addPoints([new Point(value.TimeStamp, value.Value as number)])
      );
    });
  }

}



