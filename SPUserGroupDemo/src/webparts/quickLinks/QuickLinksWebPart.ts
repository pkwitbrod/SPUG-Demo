import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField,
} from "@microsoft/sp-client-preview";
import { EnvironmentType } from "@microsoft/sp-client-base";
import ModuleLoader from "@microsoft/sp-module-loader";

import styles from "./QuickLinks.module.scss";
import * as strings from "quickLinksStrings";
import { IQuickLinksWebPartProps } from "./IQuickLinksWebPartProps";
import MockHttpClient from "./MockHttpClient";

export interface ISPLinks {
  value: ISPLink[];
}

export interface ISPLink {
  Title: string;
  URL: string;
  Id: number;
}

export default class QuickLinksWebPart extends BaseClientSideWebPart<IQuickLinksWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
    ModuleLoader.loadCss("https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css");
  }

  private _getListData(): Promise<ISPLinks> {
    return this.context.httpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('Links')/Items?$select=Title, Id, URL`)
        .then((response: Response) => {
        return response.json();
        });
}

  private _getMockListData(): Promise<ISPLinks> {
    return MockHttpClient.get(this.context.pageContext.web.absoluteUrl).then(() => {
        const listData: ISPLinks = {
            value:
            [
              { Title: "Google", URL: "http://www.google.com", Id: 1 },
              { Title: "Microsoft", URL: "http://www.microsoft.com", Id: 2 },
              { Title: "TypeScript", URL: "https://www.typescriptlang.org/", Id: 3},
              { Title: "Yahoo", URL: "http://www.yahoo.com", Id: 4},
              { Title: "Yahoo", URL: "http://www.yahoo.com", Id: 5},
              { Title: "Yahoo", URL: "http://www.yahoo.com", Id: 6}
            ]
            };
        return listData;
    }) as Promise<ISPLinks>;
}

private _renderList(items: ISPLink[]): void {
  let html: string = "";
  for (let i = 0; i < items.length; i++) {
      html += `
      <div>
      <a href="${items[i].URL}">
          <strong>${items[i].Title}</strong></br>
      </a>
    </div>
    `
    ;
  }

  const listContainer: Element = this.domElement.querySelector("#spListContainer");
  listContainer.innerHTML = html;
}

private _renderListAsync(): void {
  // Local environment
  if (this.context.environment.type === EnvironmentType.Local) {
    this._getMockListData().then((response) => {
      this._renderList(response.value);
    });
  }else{
    this._getListData().then((response) => {
      this._renderList(response.value);
    });
  }
}

private _saveLink(): void {
  this._saveLinkAsync().then((response) => {
  (<HTMLInputElement>document.getElementById("title")).value = ""; //document.getElementById("title").value,
  (<HTMLInputElement>document.getElementById("url")).value = "";
  this._renderListAsync();
  })
}


private _saveLinkAsync(): Promise<Response>{
  const title = (<HTMLInputElement>document.getElementById("title")).value; //document.getElementById("title").value,
  const URL = (<HTMLInputElement>document.getElementById("url")).value;
     const body: string = JSON.stringify({
       "__metadata": {
         "type": "SP.Data.LinksListItem"
       },
       "Title": title,
       "URL": URL
     });
     return this.context.httpClient.post(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Links')/items`, {
       headers: {
         "Accept": "application/json;odata=nometadata",
         "Content-type": "application/json;odata=verbose",
         "odata-version": ""
       },
       body: body
     });
}

  public render(): void {
    let sNum: string = this.properties.count;
    let iNum: number = +sNum;

    this.domElement.innerHTML = `
      <div class="${styles.quickLinks}">
        <div class="${styles.container}">
          <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
            <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <span class="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
              <p class="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
              <p class="ms-font-l ms-fontColor-white">Development in ${this.context.pageContext.web.title}</p>
              <p class="ms-font-l ms-fontColor-white">${this.properties.description}</p>
              <label for="title">Link Title</label>
              <input id="title" type="text">
              <label for="url">Link URL</label>
              <input id="url" type="text">
              <button class="ms-Button create-Button">
              <span class="ms-Button-label">Save Link</span>
              </button>
              <div id="spListContainer" class="${styles.listContainer}"></div>
            </div>
          </div>
        </div>
      </div>`;
      this.setButtonsEventHandlers();
      this._renderListAsync();
  }

  private setButtonsEventHandlers(): void {
  const webPart: QuickLinksWebPart = this;
  this.domElement.querySelector('button.create-Button').addEventListener('click', () => { webPart._saveLink(); });
  // this.domElement.querySelector('button.delete-Button').addEventListener('click', () => { webPart.deleteItem(); });
}

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
              PropertyPaneTextField("description", {
                label: "Description"
              }),
            ]
            }
          ]
        }
      ]
    };
  }
}
