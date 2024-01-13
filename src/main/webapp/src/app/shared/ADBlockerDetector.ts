import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdsService {
  private readonly ADS_URL: string = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';

  checkAdsBlocked(callback: (adsBlocked: boolean) => void): void {
    const xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        callback(xhr.status === 0 || xhr.responseURL !== this.ADS_URL);
      }
    };
    xhr.open('HEAD', this.ADS_URL, true);
    xhr.send(null);
  }
}
