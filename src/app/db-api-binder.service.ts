import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DbApiBinderService {

  constructor() { }

  private infoCodeDict: Map<number, string> = new Map([
    [1,"Rsc"], 
    [2,"Product"], 
    [3,"LossReason"], 
    [4,"Employee"], 
    [5,"TrackedObject"], 
    [6,"TxnData"]
  ])

  public InformationRequest(infoCode: number): Promise<any> {
    let targetEndpoint: string = this.infoCodeDict.get(infoCode);
    return this.RequestDbData(targetEndpoint + '/R/')
  }

  private RequestDbData(path: string, requestMethod: string = 'Get', body: string = ''): Promise<any> {
    /* 
    *  Handles and returns an XHR promise with a given path of the app
    */
    let url: string = `http://localhost:3000/${path}`; // API domain here
    return new Promise( (resolve, reject): void => {
        let request: XMLHttpRequest = new XMLHttpRequest();
        request.responseType = 'json';
        request.open(requestMethod, url, true);
        request.onload = (): void => {
            let status = request.status;
            if (status >= 200 && status < 300) {
                resolve(request.response);
            }
            else {
                reject(request.statusText);
            }
        };
        request.onerror = (): void => {
            console.log(request.statusText);
        };
        request.send(body);
    });
  }

  

}
