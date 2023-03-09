import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input()
  page: any;

  @Output()
  onPage = new EventEmitter();

  pages: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {

    if(!this.page) return;

    this.pages = new Array(this.page.totalPages)
    .fill(0)
    .map((item,index)=>{
      return {
        page: index+1,
        position: index
      }
    })
  }

  onSelectPage(position: number){
    this.onPage.emit(position);
  }

}
