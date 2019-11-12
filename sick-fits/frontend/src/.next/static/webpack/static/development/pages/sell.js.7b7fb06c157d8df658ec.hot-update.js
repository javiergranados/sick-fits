webpackHotUpdate("static/development/pages/sell.js",{

/***/ "./graphql/mutations.js":
/*!******************************!*\
  !*** ./graphql/mutations.js ***!
  \******************************/
/*! exports provided: CREATE_ITEM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CREATE_ITEM", function() { return CREATE_ITEM; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/taggedTemplateLiteral */ "../node_modules/@babel/runtime-corejs2/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql-tag */ "../node_modules/graphql-tag/src/index.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_1__);


function _templateObject() {
  var data = Object(_babel_runtime_corejs2_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__["default"])(["\n  mutation createItem($title: String!, $description: String!, $price: Int!, $image: String, $largeImage: String) {\n    createItem(title: $title, description: $description, price: $price, image: $image, largeImage: $largeImage) {\n      id\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}


var CREATE_ITEM = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(_templateObject());


/***/ })

})
//# sourceMappingURL=sell.js.7b7fb06c157d8df658ec.hot-update.js.map