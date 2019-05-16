import { CO2SignalService } from './CO2Signal.service';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class bmwCO2SignalService extends CO2SignalService {
    constructor(http: HttpClient) {
        super(http);

        let vehicleType = "BMW M2";
        let filter = `$filter=UUT EQ '${vehicleType}'`;
        this.apiUrl = `${this.protocol}://${this.hostname}:${this.port}${this.path}?${this.query}&${filter}`;

        this.initialize();
    }
}