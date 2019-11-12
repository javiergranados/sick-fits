webpackHotUpdate("static/development/pages/sell.js",{

/***/ "./components/CreateItem.js":
/*!**********************************!*\
  !*** ./components/CreateItem.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "../node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/asyncToGenerator */ "../node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/slicedToArray */ "../node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @apollo/react-hooks */ "../node_modules/@apollo/react-hooks/lib/react-hooks.esm.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/router */ "../node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _hooks_useInput__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../hooks/useInput */ "./hooks/useInput.js");
/* harmony import */ var _styles_Form__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./styles/Form */ "./components/styles/Form.js");
/* harmony import */ var _Error__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Error */ "./components/Error.js");
/* harmony import */ var _graphql_mutations__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../graphql/mutations */ "./graphql/mutations.js");



var _jsxFileName = "/Volumes/Data/Dropbox/Programming/Sources/advanced-React/sick-fits/frontend/src/components/CreateItem.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement;








var CreateItem = function CreateItem() {
  var _useInput = Object(_hooks_useInput__WEBPACK_IMPORTED_MODULE_6__["useInput"])(''),
      _useInput2 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useInput, 2),
      title = _useInput2[0],
      setTitle = _useInput2[1];

  var _useInput3 = Object(_hooks_useInput__WEBPACK_IMPORTED_MODULE_6__["useInput"])(0),
      _useInput4 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useInput3, 2),
      price = _useInput4[0],
      setPrice = _useInput4[1];

  var _useInput5 = Object(_hooks_useInput__WEBPACK_IMPORTED_MODULE_6__["useInput"])(''),
      _useInput6 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useInput5, 2),
      description = _useInput6[0],
      setDescription = _useInput6[1];

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(''),
      image = _useState[0],
      setImage = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(''),
      largeImage = _useState2[0],
      setLargeImage = _useState2[1];

  var _useMutation = Object(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_4__["useMutation"])(_graphql_mutations__WEBPACK_IMPORTED_MODULE_9__["CREATE_ITEM"]),
      _useMutation2 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useMutation, 2),
      createItem = _useMutation2[0],
      _useMutation2$ = _useMutation2[1],
      loading = _useMutation2$.loading,
      error = _useMutation2$.error;

  var handleSubmit =
  /*#__PURE__*/
  function () {
    var _ref = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(
    /*#__PURE__*/
    _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(event) {
      var _ref2, data;

      return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              event.preventDefault();
              _context.next = 3;
              return createItem({
                variables: {
                  title: title,
                  price: price,
                  description: description,
                  image: image,
                  largeImage: largeImage
                }
              });

            case 3:
              _ref2 = _context.sent;
              data = _ref2.data;
              next_router__WEBPACK_IMPORTED_MODULE_5___default.a.push({
                pathname: '/item',
                query: {
                  id: data.createItem.id
                }
              });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleSubmit(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var uploadFile =
  /*#__PURE__*/
  function () {
    var _ref4 = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(
    /*#__PURE__*/
    _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(_ref3) {
      var target, files, data, res, file;
      return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              target = _ref3.target;
              files = target.files;
              data = new FormData();
              data.append('file', files[0]);
              data.append('upload_preset', 'sick-fits');
              _context2.next = 7;
              return fetch('https://api.cloudinary.com/v1_1/jvgranados/image/upload', {
                method: 'post',
                body: data
              });

            case 7:
              res = _context2.sent;
              _context2.next = 10;
              return res.json();

            case 10:
              file = _context2.sent;
              setImage(file.secure_url);
              setLargeImage(file.eager[0].secure_url);

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function uploadFile(_x2) {
      return _ref4.apply(this, arguments);
    };
  }();

  return __jsx(_styles_Form__WEBPACK_IMPORTED_MODULE_7__["Form"], {
    onSubmit: handleSubmit,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: this
  }, __jsx(_Error__WEBPACK_IMPORTED_MODULE_8__["default"], {
    error: error,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    },
    __self: this
  }), __jsx("fieldset", {
    disabled: loading,
    "aria-busy": loading,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: this
  }, __jsx("label", {
    htmlFor: "file",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    },
    __self: this
  }, "Image", __jsx("input", {
    type: "file",
    name: "file",
    placeholder: "Upload an image",
    onChange: uploadFile,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50
    },
    __self: this
  })), image && __jsx("img", {
    src: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: this
  }), __jsx("label", {
    htmlFor: "title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: this
  }, "Title", __jsx("input", {
    type: "text",
    name: "title",
    placeholder: "Title",
    required: true,
    value: title,
    onChange: setTitle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: this
  })), __jsx("label", {
    htmlFor: "price",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57
    },
    __self: this
  }, "Price", __jsx("input", {
    type: "number",
    name: "price",
    placeholder: "Price",
    required: true,
    value: price,
    onChange: setPrice,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59
    },
    __self: this
  })), __jsx("label", {
    htmlFor: "description",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61
    },
    __self: this
  }, "Description", __jsx("textarea", {
    name: "description",
    placeholder: "Description",
    required: true,
    value: description,
    onChange: setDescription,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    },
    __self: this
  })), __jsx("button", {
    type: "submit",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71
    },
    __self: this
  }, "Submit")));
};

/* harmony default export */ __webpack_exports__["default"] = (CreateItem);

/***/ })

})
//# sourceMappingURL=sell.js.a96c2cad564d744fb686.hot-update.js.map