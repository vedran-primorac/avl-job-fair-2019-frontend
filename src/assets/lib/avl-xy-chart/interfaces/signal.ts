import { Observable, Subject, ReplaySubject } from 'rxjs';

import { Sequence } from './sequence';

export interface SignalValue {
  Id: string;
  Value: number | string | boolean;
  TimeStamp: number;
}

export interface SignalMetaData {
  Id: string;
  Name: string;
  Frequency?: number;
  DataType?: 'number' | 'string' | 'boolean';
  Description?: string;
  PhysicalDimension?: string;
  Unit?: string;
}

export interface SignalService {
  //constructor (id: string);
  Signal: Subject<SignalValue>;
  SignalMetaData: ReplaySubject<SignalMetaData>;
}

export interface ChartDataProvider {
  constructor(signalServices: SignalService[]);
  Sequences: Sequence[];
}

// interface DatatableParams {
//   sortOrder: any;
//   filterQuery: string;
//   pageSize: number;
//   page: number;
// }

// interface TableService {
//   getTableRows: (identifier: string, datatableParams: DatatableParams) => Promise<Array<{}>>;
// }

