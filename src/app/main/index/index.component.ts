import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  @ViewChild('help') help: ElementRef<HTMLElement>;
  constructor() { }

  ngOnInit() {
  }

  scrollToHelp() {
    this.help.nativeElement.scrollIntoView({behavior: 'smooth'});
  }

}
