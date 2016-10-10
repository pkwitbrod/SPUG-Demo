"use strict";
var MockHttpClient = (function () {
    function MockHttpClient() {
    }
    MockHttpClient.get = function (restUrl, options) {
        return new Promise(function (resolve) {
            resolve(MockHttpClient._items);
        });
    };
    MockHttpClient._items = [{ Name: "Patrick", link: "#" }];
    return MockHttpClient;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MockHttpClient;
;
//# sourceMappingURL=MockHttpClient.js.map