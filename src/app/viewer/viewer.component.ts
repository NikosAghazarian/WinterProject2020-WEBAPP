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

  public tableRows: Array<Object>;
  public tableHeaders: Array<string>;

  public routeTarget: string;
  constructor(private route: ActivatedRoute, private Router: Router, private apiSvc: DbApiBinderService) {  
    let target$ = this.route.paramMap.pipe(switchMap((params: ParamMap) => { // This gets the routing parameter
      return params.get('type');
    }));
    target$.forEach( (val: string) => {
      this.routeTarget = val;
    });

    let info: Promise<any>;

    ( +this.routeTarget === parseInt(this.routeTarget) && parseInt(this.routeTarget) < 7 ) ?
      ( info = apiSvc.InformationRequest(+this.routeTarget) ) :
      ( this.Router.navigate(['/NOT_FOUND']) );

    info.then( (returnedData) => {
      this.tableRows = returnedData;
      this.tableHeaders = Object.getOwnPropertyNames(this.tableRows[0]); // Table headers are based on only the first row's propery names
    });

  }

  public ForceOriginalOrder = () => {return 0;} // Comparator Fn for keyvalue pipe


  ngOnInit() {
  }

}
