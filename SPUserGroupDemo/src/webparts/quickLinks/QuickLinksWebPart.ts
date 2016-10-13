import {
  /*These are basically using statements. Webpack and Gulp allow you to
   use these in your code without manually adding the script links. Here is what
   Mozilla says about them...
   The import statement is used to import functions,
   objects or primitives that have been exported
   from an external module, another script, etc.*/
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';

import styles from './QuickLinks.module.scss';   // These are internal resources that are imported from elsewhere in your project.
import * as strings from 'quickLinksStrings';
import { IQuickLinksWebPartProps } from './IQuickLinksWebPartProps';

export default class QuickLinksWebPart extends BaseClientSideWebPart<IQuickLinksWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {   //We can use styles because it was imported above.
    this.domElement.innerHTML = `
      <div class="${styles.quickLinks}">
        <div class="${styles.container}">
          <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
            <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <span class="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
              <p class="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
              <p class="ms-font-l ms-fontColor-white">${this.properties.description}</p>
              <a href="https://github.com/SharePoint/sp-dev-docs/wiki" class="ms-Button ${styles.button}">
                <span class="ms-Button-label">Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>`;
  }

  // The string formatting above using tick marks(`) and ${} syntax is an es6 and Typscript feature.
  // It makes string concatanation much more intuitive for C# and powershell programmers.

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    // This is what goes in the property pane.
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
