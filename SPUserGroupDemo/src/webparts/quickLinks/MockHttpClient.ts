import { ISPLink } from "./QuickLinksWebPart";

export default class MockHttpClient {

    private static _items: ISPLink[] = [{ Name: "Patrick", link: "#"}];

    public static get(restUrl: string, options?: any): Promise<ISPLink[]> {
      return new Promise<ISPLink[]>((resolve) => {
            resolve(MockHttpClient._items);
        });
    }
};
