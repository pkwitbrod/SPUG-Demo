import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField,
  PropertyPaneDropdown // Notice that we added another Import. Now we can use dropdowns in the side bar.
} from "@microsoft/sp-client-preview";

import styles from "./QuickLinks.module.scss";
import * as strings from "quickLinksStrings";
import { IQuickLinksWebPartProps } from "./IQuickLinksWebPartProps";

export default class QuickLinksWebPart extends BaseClientSideWebPart<IQuickLinksWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    // Typescript and ES6 use two new variable declarations. let and const.
    // They do a lot. const can never change (unless it's an array or object but I digress)
    // They both help with 'solve' closure.
    let sNum: string = this.properties.count; //this.properties.count refers to the webpart properties in the side pannel.
    let iNum: number = +sNum;
            // This is type in stypscript. iNum with always be a number. If I try
            // to set it to 1 instead of "1" the gulp task will throw and error and
            // my code won't transpile. I use these variables later.
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
    return { // This JSON object is what makes the side bar. 
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
