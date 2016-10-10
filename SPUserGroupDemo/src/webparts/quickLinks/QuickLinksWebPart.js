"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sp_client_preview_1 = require("@microsoft/sp-client-preview");
var QuickLinks_module_scss_1 = require("./QuickLinks.module.scss");
var strings = require("quickLinksStrings");
var QuickLinksWebPart = (function (_super) {
    __extends(QuickLinksWebPart, _super);
    function QuickLinksWebPart(context) {
        _super.call(this, context);
    }
    QuickLinksWebPart.prototype.render = function () {
        var sNum = this.properties.count;
        var iNum = +sNum;
        this.domElement.innerHTML = "\n      <div class=\"" + QuickLinks_module_scss_1.default.quickLinks + "\">\n        <div class=\"" + QuickLinks_module_scss_1.default.container + "\">\n          <div class=\"ms-Grid-row ms-bgColor-themeDark ms-fontColor-white " + QuickLinks_module_scss_1.default.row + "\">\n            <div class=\"ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1\">\n              <span class=\"ms-font-xl ms-fontColor-white\">Welcome to SharePoint!</span>\n              <p class=\"ms-font-l ms-fontColor-white\">Customize SharePoint experiences using Web Parts.</p>\n              <p class=\"ms-font-l ms-fontColor-white\">" + this.properties.description + "</p>\n              <p class=\"ms-font-l ms-fontColor-white\">" + this.properties.count + "</p>\n              <a href=\"https://github.com/SharePoint/sp-dev-docs/wiki\" class=\"ms-Button " + QuickLinks_module_scss_1.default.button + "\">\n                <span class=\"ms-Button-label\">Learn more</span>\n              </a>\n            </div>\n          </div>\n        </div>\n      </div>";
    };
    Object.defineProperty(QuickLinksWebPart.prototype, "propertyPaneSettings", {
        get: function () {
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
                                    sp_client_preview_1.PropertyPaneTextField("description", {
                                        label: "Description"
                                    }),
                                    sp_client_preview_1.PropertyPaneDropdown("count", {
                                        label: "Count",
                                        options: [
                                            { key: "1", text: "One" },
                                            { key: "2", text: "Two" },
                                            { key: "3", text: "Three" },
                                            { key: "4", text: "Four" }
                                        ] }),
                                ]
                            }
                        ]
                    }
                ]
            };
        },
        enumerable: true,
        configurable: true
    });
    return QuickLinksWebPart;
}(sp_client_preview_1.BaseClientSideWebPart));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QuickLinksWebPart;
//# sourceMappingURL=QuickLinksWebPart.js.map