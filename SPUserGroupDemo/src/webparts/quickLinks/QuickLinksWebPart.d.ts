import { BaseClientSideWebPart, IPropertyPaneSettings, IWebPartContext } from "@microsoft/sp-client-preview";
import { IQuickLinksWebPartProps } from "./IQuickLinksWebPartProps";
export default class QuickLinksWebPart extends BaseClientSideWebPart<IQuickLinksWebPartProps> {
    constructor(context: IWebPartContext);
    render(): void;
    protected readonly propertyPaneSettings: IPropertyPaneSettings;
}
