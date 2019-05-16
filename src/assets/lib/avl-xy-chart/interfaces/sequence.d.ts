import { ReplaySubject } from 'rxjs';
export declare class Point {
    readonly x: number;
    readonly y: number;
    constructor(x: number, y: number);
}
export declare class Sequence {
    readonly label: string;
    readonly yAxis: Axis;
    newPoints: ReplaySubject<Point[]>;
    constructor(label: string, yAxis: Axis);
    addPoints(points: Point[]): void;
}
export declare class Axis {
    readonly color: string;
    readonly name: string;
    readonly orientation: 'left' | 'right' | 'top' | 'bottom';
    readonly automaticallyAdjustRange: boolean;
    readonly centerLineInTheMiddleOfGraph: boolean;
    readonly min: number;
    readonly max: number;
    constructor(color: string, name: string, orientation?: 'left' | 'right' | 'top' | 'bottom', automaticallyAdjustRange?: boolean, centerLineInTheMiddleOfGraph?: boolean, min?: number, max?: number);
}
