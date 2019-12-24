import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";


@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {

  public ForceOriginalOrder = () => {return 0;} // Comparator Fn for keyvalue pipe

  public FAKE_NEWS: string = `
  {
    "rows": [
      {"name": "steve"},
      {"name": "jones", "job": "slave"},
      {"name": "bob"}
    ]
  }`;
  
  public FAKE_NEWS_PARSED: JSON = JSON.parse(this.FAKE_NEWS);

  public tableRows: Array<Object> = this.FAKE_NEWS_PARSED["rows"];
  public tableHeaders: Array<string> = Object.getOwnPropertyNames(this.tableRows[0]);

  public routeTarget: string;

  constructor(private route: ActivatedRoute) { 
    let target$ = this.route.paramMap.pipe(switchMap((params: ParamMap) => {
      return params.get('type');
    }));
    
    target$.forEach( (val: string) => {
      this.routeTarget = val;
    })
  }

  


  ngOnInit() {
  }

}
