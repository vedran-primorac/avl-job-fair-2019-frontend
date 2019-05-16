import { Injectable } from '@angular/core';
import { SignalService, SignalValue, SignalMetaData } from 'src/assets/lib/avl-xy-chart/interfaces/signal';
import { Subject, ReplaySubject, Observable } from 'rxjs';
import { Point } from 'src/assets/lib/avl-xy-chart/interfaces/sequence';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable()
export class CO2SignalService implements SignalService {
    public Signal: Subject<SignalValue>;
    public SignalMetaData: ReplaySubject<SignalMetaData>;
    public readonly id: string;

    private protocol = 'http';
    private hostname = 'localhost';
    private port = '5000';
    private path = '/odata/Measurements';
    private query = '$select=Time,Value'
    private apiUrl = `${this.protocol}://${this.hostname}:${this.port}${this.path}`;
  
    constructor(private http: HttpClient) {
      this.id = 'demoId'; 
      this.SignalMetaData = new ReplaySubject<SignalMetaData>(1);
      this.Signal = new Subject<SignalValue>();
      this.SignalMetaData.next({
        Id: this.id,
        Name: this.id,
        DataType: 'number'
      })
      this.startEmitingValues();
    }
  
    private startEmitingValues(): void {
      this.getValues().subscribe( values => {
        values.forEach(value => {
          this.Signal.next({ Id: this.id, Value: value.y, TimeStamp: value.x });          
        });        
      });
    }
  
    private getValues(): Observable<Point[]> {
      return this.http
        .get<responseValues>(`${this.apiUrl}?${this.query}`)
        .pipe(
          map(response => {
            return this.responseToPoints(response.value);
          })
        );
    }

    private responseToPoints(values: { Time: string, Value: string }[]): Point[] {
        return values.map(val => new Point(parseFloat(val.Time), parseFloat(val.Value)));     
    }
  }

  type responseValues = {
    value: {Time: string, Value: string}[]
  };
