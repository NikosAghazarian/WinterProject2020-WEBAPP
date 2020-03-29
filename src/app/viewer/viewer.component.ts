import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DbApiBinderService } from '../db-api-binder.service';


@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements AfterViewChecked {

  public tableRows: Array<object>;
  public tableHeaders: Array<string>;
  public rowAdditionBox: HTMLTextAreaElement;

  public routeTarget: number;

  constructor(private route: ActivatedRoute, private Router: Router, private apiSvc: DbApiBinderService) {
    const target$ = this.route.paramMap.pipe(switchMap((params: ParamMap) => { // This gets the routing parameter
      return params.get('type');
    }));

    target$.forEach( (val: string) => {
      if (ValidateRouteTarget(val)) {
        this.routeTarget = +val;
      } else {
        this.Router.navigate(['/NOT_FOUND']);
      }

      /* const info: Promise<any> = this.apiSvc.InformationRequest(this.routeTarget);

      info.then( (returnedData) => {
        this.tableRows = returnedData;
        this.tableHeaders = Object.getOwnPropertyNames(this.tableRows[0]); // Table headers are based on only the first row's propery names
      }); */
      this.DrawTable();

      function ValidateRouteTarget(value: string): boolean {
        if (+value === parseInt(value, 10) && parseInt(value, 10) < 7) {
          return true;
        }
        return false;
      }
    });
  }


  public CreateNewRows(): void {
    this.rowAdditionBox.value;
    this.apiSvc.NewInformationEntry(+this.routeTarget, this.rowAdditionBox.value).then(() => {
      this.DrawTable();
    });
  }

  public ForceOriginalOrder = () => 0; // Comparator Fn for keyvalue pipe

  public DrawTable(): void {
    const info: Promise<any> = this.apiSvc.InformationRequest(this.routeTarget);
    info.then( (returnedData) => {
      this.tableRows = returnedData;
      this.tableHeaders = Object.getOwnPropertyNames(this.tableRows[0]); // Table headers are based on only the first row's propery names
    });
  }

  ngAfterViewChecked() {
    this.rowAdditionBox = document.getElementById('row_addition_box') as HTMLTextAreaElement; // Typecast to stop IDE errors
  }
}
