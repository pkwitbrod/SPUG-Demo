import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from "@microsoft/sp-client-preview";
import { EnvironmentType } from "@microsoft/sp-client-base";

import styles from "./QuickLinks.module.scss";
import * as strings from "quickLinksStrings";
import { IQuickLinksWebPartProps } from "./IQuickLinksWebPartProps";
import MockHttpClient from "./MockHttpClient";

export interface ISPLinks {
  value: ISPLink[];
}

export interface ISPLink {
  Title: string;
  link: string;
  Id: number;
}

export default class QuickLinksWebPart extends BaseClientSideWebPart<IQuickLinksWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  private _getListData(): Promise<ISPLinks> {
    return this.context.httpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists?$filter=Hidden eq false`)
        .then((response: Response) => {
        return response.json();
        });
}

  private _getMockListData(): Promise<ISPLinks> {
    return MockHttpClient.get(this.context.pageContext.web.absoluteUrl).then(() => {
        const listData: ISPLinks = {
            value:
            [
              { Title: "Google", link: "http://www.google.com", Id: 1 },
              { Title: "Microsoft", link: "http://www.microsoft.com", Id: 2 },
              { Title: "TypScript", link: "https://www.typescriptlang.org/", Id: 3},
              { Title: "Yahoo", link: "http://www.yahoo.com", Id: 4}
            ]
            };
        return listData;
    }) as Promise<ISPLinks>;
}

private _renderList(items: ISPLink[]): void {
  let html: string = "";
  for (let i = 0; i < +this.properties.count; i++) {
      html += `
      <a href="${items[i].link}" class="img-group" >
          <strong>${items[i].Title}</strong></br>
        </div>
      </div>
    </a>`;
  }

  const listContainer: Element = this.domElement.querySelector("#spListContainer");
  listContainer.innerHTML = html;
}

private _renderListAsync(): void {
  // Local environment
  console.log("This is a thing");
  if (this.context.environment.type === EnvironmentType.Local) {
    this._getMockListData().then((response) => {
      this._renderList(response.value);
    });
  }
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
              <p class="ms-font-l ms-fontColor-white">${this.properties.count}</p>
              <div id="spListContainer" />
            </div>
          </div>
        </div>
          <div id="spListContainer" />
      </div>`;
      this._renderListAsync();
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
              PropertyPaneDropdown("count", {
                label: "Count",
                options: [
                  { key: "1", text: "One" },
                  { key: "2", text: "Two" },
                  { key: "3", text: "Three" },
                  { key: "4", text: "Four" }
                ]}),
            ]
            }
          ]
        }
      ]
    };
  }
}
