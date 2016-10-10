import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from "@microsoft/sp-client-preview";

import styles from "./QuickLinks.module.scss";
import * as strings from "quickLinksStrings";
import { IQuickLinksWebPartProps } from "./IQuickLinksWebPartProps";

export default class QuickLinksWebPart extends BaseClientSideWebPart<IQuickLinksWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
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
              <p class="ms-font-l ms-fontColor-white">${this.properties.description}</p>
              <p class="ms-font-l ms-fontColor-white">${this.properties.count}</p>
              <a href="https://github.com/SharePoint/sp-dev-docs/wiki" class="ms-Button ${styles.button}">
                <span class="ms-Button-label">Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>`;
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
