import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { DbApiBinderService } from "../db-api-binder.service";


@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {

  private FAKE_NEWS: string = `
  {
    "rows": [
      {"name": "steve",  "job": "corporate overlord"},
      {"name": "jones", "job": "slave"},
      {"name": "bob"}
    ]
  }`;
  
  private FAKE_NEWS_PARSED: JSON = JSON.parse(this.FAKE_NEWS);
  public tableRows: Array<Object> = this.FAKE_NEWS_PARSED["rows"];
  public tableHeaders: Array<string> = Object.getOwnPropertyNames(this.tableRows[0]);

  
  constructor(private route: ActivatedRoute, private Router: Router, private apiSvc: DbApiBinderService) {  // This gets the routing parameter
    let routeTarget: string;
    let target$ = this.route.paramMap.pipe(switchMap((params: ParamMap) => {
      return params.get('type');
    }));
    target$.forEach( (val: string) => {
      routeTarget = val;
    });
    ( +routeTarget === parseInt(routeTarget) && parseInt(routeTarget) < 7 ) ?  apiSvc.InformationRequest(+routeTarget) : this.Router.navigate(['/NOT_FOUND']);
  }

  public ForceOriginalOrder = () => {return 0;} // Comparator Fn for keyvalue pipe


  ngOnInit() {
  }

}
