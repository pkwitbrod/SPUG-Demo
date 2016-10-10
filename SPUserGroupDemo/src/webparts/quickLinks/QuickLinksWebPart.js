"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sp_client_preview_1 = require("@microsoft/sp-client-preview");
var sp_client_base_1 = require("@microsoft/sp-client-base");
var QuickLinks_module_scss_1 = require("./QuickLinks.module.scss");
var strings = require("quickLinksStrings");
var MockHttpClient_1 = require("./MockHttpClient");
var QuickLinksWebPart = (function (_super) {
    __extends(QuickLinksWebPart, _super);
    function QuickLinksWebPart(context) {
        _super.call(this, context);
    }
    QuickLinksWebPart.prototype._getListData = function () {
        return this.context.httpClient.get(this.context.pageContext.web.absoluteUrl + "/_api/web/lists?$filter=Hidden eq false")
            .then(function (response) {
            return response.json();
        });
    };
    QuickLinksWebPart.prototype._getMockListData = function () {
        return MockHttpClient_1.default.get(this.context.pageContext.web.absoluteUrl).then(function () {
            var listData = {
                value: [
                    { Name: "Google", link: "http://www.google.com" },
                    { Name: "Microsoft", link: "http://www.microsoft.com" },
                    { Name: "TypScript", link: "https://www.typescriptlang.org/" },
                    { Name: "Yahoo", link: "http://www.yahoo.com" }
                ]
            };
            return listData;
        });
    };
    QuickLinksWebPart.prototype._renderList = function (items) {
        var html = "";
        for (var i = 0; i < +this.properties.count; i++) {
            html += "\n      <a href=\"" + items[i].link + "\" class=\"img-group\" >\n          <strong>" + items[i].Name + "</strong></br>\n        </div>\n      </div>\n    </a>";
        }
        var listContainer = this.domElement.querySelector("#spListContainer");
        listContainer.innerHTML = html;
    };
    QuickLinksWebPart.prototype._renderListAsync = function () {
        var _this = this;
        console.log("This is a thing");
        if (this.context.environment.type === sp_client_base_1.EnvironmentType.Local) {
            this._getMockListData().then(function (response) {
                _this._renderList(response.value);
            });
        }
    };
    QuickLinksWebPart.prototype.render = function () {
        var sNum = this.properties.count;
        var iNum = +sNum;
        this.domElement.innerHTML = "\n      <div class=\"" + QuickLinks_module_scss_1.default.quickLinks + "\">\n        <div class=\"" + QuickLinks_module_scss_1.default.container + "\">\n          <div class=\"ms-Grid-row ms-bgColor-themeDark ms-fontColor-white " + QuickLinks_module_scss_1.default.row + "\">\n            <div class=\"ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1\">\n              <span class=\"ms-font-xl ms-fontColor-white\">Welcome to SharePoint!</span>\n              <p class=\"ms-font-l ms-fontColor-white\">Customize SharePoint experiences using Web Parts.</p>\n              <p class=\"ms-font-l ms-fontColor-white\">Development in " + this.context.pageContext.web.title + "</p>\n              <p class=\"ms-font-l ms-fontColor-white\">" + this.properties.description + "</p>\n              <p class=\"ms-font-l ms-fontColor-white\">" + this.properties.count + "</p>\n              <div id=\"spListContainer\" />\n            </div>\n          </div>\n        </div>\n          <div id=\"spListContainer\" />\n      </div>";
        this._renderListAsync();
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