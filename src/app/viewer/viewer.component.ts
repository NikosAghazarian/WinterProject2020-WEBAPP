import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";


@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {

  public vfx: string;

  constructor(private route: ActivatedRoute) { 
    let target$ = this.route.paramMap.pipe(switchMap((params: ParamMap) => {
      return params.get('type');
    }));
    
    target$.forEach(v => {
      this.vfx = v;
    })
  }

  ngOnInit() {
  }

}
