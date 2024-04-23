import { Injectable } from '@angular/core';

function _window(): any {
  // Return the global native browser window object
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class JavascriptService {
  constructor() {}

  get nativeWindow(): any {
    return _window();
  }

  /**
   * Load a JavaScript script dynamically by adding it to the document.
   * @param url The URL of the JavaScript script to load.
   */
  injectJsScript(url: string): void {
    const document = this.nativeWindow.document;

    let js = document.getElementById('razorPayScript');
    if (!js) {
      js = document.createElement('script');
      js.setAttribute('src', url);
      js.setAttribute('id', 'razorPayScript');
      document.body.appendChild(js);
    }
  }
}