import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Category } from 'src/app/model/registration.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  @ViewChild('help') help: ElementRef<HTMLElement>;
  modalShown = false;

  constructor(private router: Router, private link: ActivatedRoute) { }

  ngOnInit() {
    this.modalShown = this.link.snapshot.url.length < 2;
    console.log(this.modalShown); 
  }

  scrollToHelp() {
    this.help.nativeElement.scrollIntoView({behavior: 'smooth'});
  }

  showModal(help: boolean, category: string) {
    this.modalShown = true;
    const url = [help ? 'help' : 'need', category];
    this.router.navigate(url, { relativeTo: this.link });
  }

}
