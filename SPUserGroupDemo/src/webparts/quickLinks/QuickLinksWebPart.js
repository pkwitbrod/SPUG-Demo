"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sp_client_preview_1 = require("@microsoft/sp-client-preview");
var sp_client_base_1 = require("@microsoft/sp-client-base");
var sp_module_loader_1 = require("@microsoft/sp-module-loader");
var QuickLinks_module_scss_1 = require("./QuickLinks.module.scss");
var strings = require("quickLinksStrings");
var MockHttpClient_1 = require("./MockHttpClient");
var QuickLinksWebPart = (function (_super) {
    __extends(QuickLinksWebPart, _super);
    function QuickLinksWebPart(context) {
        _super.call(this, context);
        sp_module_loader_1.default.loadCss("https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css");
    }
    QuickLinksWebPart.prototype._getListData = function () {
        return this.context.httpClient.get(this.context.pageContext.web.absoluteUrl + "/_api/web/lists/getbytitle('Links')/Items?$select=Title, Id, URL")
            .then(function (response) {
            return response.json();
        });
    };
    QuickLinksWebPart.prototype._getMockListData = function () {
        return MockHttpClient_1.default.get(this.context.pageContext.web.absoluteUrl).then(function () {
            var listData = {
                value: [
                    { Title: "Google", URL: "http://www.google.com", Id: 1 },
                    { Title: "Microsoft", URL: "http://www.microsoft.com", Id: 2 },
                    { Title: "TypeScript", URL: "https://www.typescriptlang.org/", Id: 3 },
                    { Title: "Yahoo", URL: "http://www.yahoo.com", Id: 4 },
                    { Title: "Yahoo", URL: "http://www.yahoo.com", Id: 5 },
                    { Title: "Yahoo", URL: "http://www.yahoo.com", Id: 6 }
                ]
            };
            return listData;
        });
    };
    QuickLinksWebPart.prototype._renderList = function (items) {
        var html = "";
        for (var i = 0; i < items.length; i++) {
            html += "\n      <div>\n      <a href=\"" + items[i].URL + "\">\n          <strong>" + items[i].Title + "</strong></br>\n      </a>\n    </div>\n    ";
        }
        var listContainer = this.domElement.querySelector("#spListContainer");
        listContainer.innerHTML = html;
    };
    QuickLinksWebPart.prototype._renderListAsync = function () {
        var _this = this;
        if (this.context.environment.type === sp_client_base_1.EnvironmentType.Local) {
            this._getMockListData().then(function (response) {
                _this._renderList(response.value);
            });
        }
        else {
            this._getListData().then(function (response) {
                _this._renderList(response.value);
            });
        }
    };
    QuickLinksWebPart.prototype._saveLink = function () {
        var _this = this;
        this._saveLinkAsync().then(function (response) {
            document.getElementById("title").value = "";
            document.getElementById("url").value = "";
            _this._renderListAsync();
        });
    };
    QuickLinksWebPart.prototype._saveLinkAsync = function () {
        var title = document.getElementById("title").value;
        var URL = document.getElementById("url").value;
        var body = JSON.stringify({
            "__metadata": {
                "type": "SP.Data.LinksListItem"
            },
            "Title": title,
            "URL": URL
        });
        return this.context.httpClient.post(this.context.pageContext.web.absoluteUrl + "/_api/web/lists/getbytitle('Links')/items", {
            headers: {
                "Accept": "application/json;odata=nometadata",
                "Content-type": "application/json;odata=verbose",
                "odata-version": ""
            },
            body: body
        });
    };
    QuickLinksWebPart.prototype.render = function () {
        var sNum = this.properties.count;
        var iNum = +sNum;
        this.domElement.innerHTML = "\n      <div class=\"" + QuickLinks_module_scss_1.default.quickLinks + "\">\n        <div class=\"" + QuickLinks_module_scss_1.default.container + "\">\n          <div class=\"ms-Grid-row ms-bgColor-themeDark ms-fontColor-white " + QuickLinks_module_scss_1.default.row + "\">\n            <div class=\"ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1\">\n              <span class=\"ms-font-xl ms-fontColor-white\">Welcome to SharePoint!</span>\n              <p class=\"ms-font-l ms-fontColor-white\">Customize SharePoint experiences using Web Parts.</p>\n              <p class=\"ms-font-l ms-fontColor-white\">Development in " + this.context.pageContext.web.title + "</p>\n              <p class=\"ms-font-l ms-fontColor-white\">" + this.properties.description + "</p>\n              <label for=\"title\">Link Title</label>\n              <input id=\"title\" type=\"text\">\n              <label for=\"url\">Link URL</label>\n              <input id=\"url\" type=\"text\">\n              <button class=\"ms-Button create-Button\">\n              <span class=\"ms-Button-label\">Save Link</span>\n              </button>\n              <div id=\"spListContainer\" class=\"" + QuickLinks_module_scss_1.default.listContainer + "\"></div>\n            </div>\n          </div>\n        </div>\n      </div>";
        this.setButtonsEventHandlers();
        this._renderListAsync();
    };
    QuickLinksWebPart.prototype.setButtonsEventHandlers = function () {
        var webPart = this;
        this.domElement.querySelector('button.create-Button').addEventListener('click', function () { webPart._saveLink(); });
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