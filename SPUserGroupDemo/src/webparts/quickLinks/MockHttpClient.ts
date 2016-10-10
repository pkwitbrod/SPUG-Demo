import { ISPLink } from "./QuickLinksWebPart";

export default class MockHttpClient {

    private static _items: ISPLink[] = [{ Title: "Patrick", link: "#", Id: 0}];

    public static get(restUrl: string, options?: any): Promise<ISPLink[]> {
      return new Promise<ISPLink[]>((resolve) => {
            resolve(MockHttpClient._items);
        });
    }
};
