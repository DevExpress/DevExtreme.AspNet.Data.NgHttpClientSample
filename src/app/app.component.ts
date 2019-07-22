import { Component } from '@angular/core';
import * as devextremeAspNetData from 'devextreme-aspnet-data-nojquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sample';

  constructor() {
    const store = devextremeAspNetData.createStore({ loadUrl: 'https://js.devexpress.com/Demos/Mvc/api/DataGridWebApi/Orders' });
    store.load({ take: 10 }).then((data) => {
      alert(JSON.stringify(data[0]));
    });
  }

}
