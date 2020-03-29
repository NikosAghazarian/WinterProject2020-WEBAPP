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
  public rowAdditionBox: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById("row_addition_box"); //typecast to stop IDE errors

  public routeTarget: number;

  constructor(private route: ActivatedRoute, private Router: Router, private apiSvc: DbApiBinderService) {  
    let target$ = this.route.paramMap.pipe(switchMap((params: ParamMap) => { // This gets the routing parameter
      return params.get('type');
    }));

    target$.forEach( (val: string) => {
      if (ValidateRouteTarget(val)) {
        this.routeTarget = +val;
      }
      else {
        this.Router.navigate(['/NOT_FOUND']);
      }

      let info: Promise<any> = this.apiSvc.InformationRequest(this.routeTarget);

      info.then( (returnedData) => {
        this.tableRows = returnedData;
        this.tableHeaders = Object.getOwnPropertyNames(this.tableRows[0]); // Table headers are based on only the first row's propery names
      });

      function ValidateRouteTarget(value: string): boolean {
        if (+value === parseInt(value) && parseInt(value) < 7) return true;
        return false;
      }
    });
  }

  

  public CreateNewRows(): void {
    this.rowAdditionBox.value;
    //this.apiSvc.NewInformationEntry(+this.routeTarget, this.rowAdditionBox.value)
  }

  public ForceOriginalOrder = () => {return 0;} // Comparator Fn for keyvalue pipe

  ngOnInit() {
  }

}
