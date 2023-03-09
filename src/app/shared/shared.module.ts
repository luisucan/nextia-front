import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButtomComponent } from './components/custom-buttom/custom-buttom.component';
import { PaginationComponent } from './components/pagination/pagination.component';



@NgModule({
  declarations: [
    CustomButtomComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [CustomButtomComponent, PaginationComponent]
})
export class SharedModule { }
