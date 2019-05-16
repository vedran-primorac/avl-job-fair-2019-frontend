import { ReplaySubject } from 'rxjs';

export class Point {
  constructor(public readonly x: number,
    public readonly y: number) { }
}

export class Sequence {
  public newPoints = new ReplaySubject<Point[]>(1);

  constructor(public readonly label: string, public readonly yAxis: Axis) { }

  public addPoints(points: Point[]): void {
    this.newPoints.next(points);
  }
}

export class Axis {
  constructor(public readonly color: string, //CSS color
    public readonly name: string,
    public readonly orientation: 'left' | 'right' | 'top' | 'bottom' = 'left',
    public readonly automaticallyAdjustRange = true,
    public readonly centerLineInTheMiddleOfGraph = true,
    public readonly min?: number,
    public readonly max?: number) { }
}
