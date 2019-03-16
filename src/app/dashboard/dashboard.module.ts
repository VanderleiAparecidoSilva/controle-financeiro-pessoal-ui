import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { FieldsetModule } from 'primeng/fieldset';
import {CalendarModule} from 'primeng/calendar';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,

    PanelModule,
    ChartModule,
    FieldsetModule,
    CalendarModule,

    SharedModule,
    DashboardRoutingModule
  ],
  // declarations: [DashboardComponent],
  providers: [ DecimalPipe ]
})
export class DashboardModule { }
