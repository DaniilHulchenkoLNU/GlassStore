import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlassesRoutingModule } from './glasses-routing.module';
import { GlassListComponent } from './list/glassList.component';
import { GlassInfoComponent } from './info/glassInfo.component';
import { GlassService } from '../../../services/Glass.service';
import { UserService } from '../../../services/User.service';




@NgModule({
  declarations: [
    GlassListComponent,
    GlassInfoComponent
  ],
  imports: [
    CommonModule,
    GlassesRoutingModule
  ],
  exports: [],
  providers: [GlassService, UserService],
})
export class GlassesModule { }
