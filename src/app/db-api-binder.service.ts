import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DbApiBinderService {

  constructor() { }

  private infoCodeDict: Map<number, string> = new Map([
    [1, 'Rsc'],
    [2, 'Product'],
    [3, 'LossReason'],
    [4, 'Employee'],
    [5, 'TrackedObject'],
    [6, 'TxnData']
  ]);

  /**
   * Method for adding new entries to the tables.
   *
   * @param  {number} infoCode - Maps to a string to be used in target API route decision logic.
   * @param  {(JSON|string)} newData - Data to be added to table specified by `infoCode`.
   */
  public NewInformationEntry(infoCode: number, newData: JSON|string): Promise<any> {
    const targetEndpoint: string = this.infoCodeDict.get(infoCode);
    console.log(targetEndpoint);
    if (typeof newData === 'object') {
      newData = JSON.stringify(newData);
    }
    return this.RequestDbData(targetEndpoint + '/C/', 'Post', newData);
  }

  /**
   * Method for reading(GET) from the API.
   *
   * @param  {number} infoCode - Maps to a string to be used in target API route decision logic.
   * @returns Promise
   */
  public InformationRequest(infoCode: number): Promise<any> {
    const targetEndpoint: string = this.infoCodeDict.get(infoCode);
    console.log(targetEndpoint);
    return this.RequestDbData(targetEndpoint + '/R/');
  }

  /**
   * Handles and returns an XHR promise with a given path of the app.
   *
   * @param  {string} path - URL route to API endpoint.
   * @param  {string} [requestMethod='Get'] - HTTP request method. Defaults to GET.
   * @param  {string} [body=''] - Body of HTTP request. Defaults to an empty string.
   * @returns {Promise} XHR Promise.
   */
  private RequestDbData(path: string, requestMethod: string = 'Get', body: string = ''): Promise<any> {
    const url: string = `http://localhost:3000/${path}`; // API domain here
    return new Promise( (resolve, reject): void => {
        const request: XMLHttpRequest = new XMLHttpRequest();
        request.responseType = 'json';
        request.open(requestMethod, url, true);
        request.setRequestHeader('content-type', 'application/json');
        request.onload = (): void => {
            const status = request.status;
            if (status >= 200 && status < 300) {
                resolve(request.response);
            } else {
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