"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./src/pages/index.tsx":
/*!*****************************!*\
  !*** ./src/pages/index.tsx ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Home; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material/Box */ \"./node_modules/@mui/material/Box/index.js\");\n/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material/Typography */ \"./node_modules/@mui/material/Typography/index.js\");\n/* harmony import */ var _mui_material_Unstable_Grid2__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/Unstable_Grid2 */ \"./node_modules/@mui/material/Unstable_Grid2/index.js\");\n/* harmony import */ var _mui_material_Paper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material/Paper */ \"./node_modules/@mui/material/Paper/index.js\");\n/* harmony import */ var _components_Link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Link */ \"./src/components/Link.tsx\");\n/* harmony import */ var _components_general_Layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/general/Layout */ \"./src/components/general/Layout.tsx\");\n/* harmony import */ var _icons_heat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../icons/heat */ \"./src/icons/heat.tsx\");\n/* harmony import */ var _icons_electricBolt__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../icons/electricBolt */ \"./src/icons/electricBolt.tsx\");\n/* harmony import */ var _icons_balance__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../icons/balance */ \"./src/icons/balance.tsx\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\nconst content = [\n    {\n        title: \"Gas\",\n        Icon: _icons_heat__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n        link: \"/\"\n    },\n    {\n        title: \"Electricity\",\n        Icon: _icons_electricBolt__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n        link: \"/\"\n    },\n    {\n        title: \"Budget\",\n        Icon: _icons_balance__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n        link: \"/\"\n    }\n];\nfunction Home() {\n    _s();\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_general_Layout__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Link__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                href: \"/about\",\n                color: \"secondary\",\n                children: \"Go to the about page\"\n            }, void 0, false, {\n                fileName: \"/home/madeleen/dev/gas/next/src/pages/index.tsx\",\n                lineNumber: 27,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                sx: {\n                    flexGrow: 1,\n                    my: 2\n                },\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_Unstable_Grid2__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n                    container: true,\n                    spacing: 2,\n                    justifyContent: \"center\",\n                    children: content.map((param, index)=>{\n                        let { title , Icon , link  } = param;\n                        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_Unstable_Grid2__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n                            xs: 6,\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_Paper__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n                                onClick: ()=>router.push(link),\n                                sx: {\n                                    cursor: \"pointer\",\n                                    p: \"32px\",\n                                    textAlign: \"center\"\n                                },\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Icon, {}, void 0, false, {\n                                        fileName: \"/home/madeleen/dev/gas/next/src/pages/index.tsx\",\n                                        lineNumber: 39,\n                                        columnNumber: 19\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n                                        variant: \"h4\",\n                                        children: title\n                                    }, void 0, false, {\n                                        fileName: \"/home/madeleen/dev/gas/next/src/pages/index.tsx\",\n                                        lineNumber: 40,\n                                        columnNumber: 19\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/home/madeleen/dev/gas/next/src/pages/index.tsx\",\n                                lineNumber: 35,\n                                columnNumber: 17\n                            }, this)\n                        }, \"cotent\".concat(index), false, {\n                            fileName: \"/home/madeleen/dev/gas/next/src/pages/index.tsx\",\n                            lineNumber: 34,\n                            columnNumber: 15\n                        }, this);\n                    })\n                }, void 0, false, {\n                    fileName: \"/home/madeleen/dev/gas/next/src/pages/index.tsx\",\n                    lineNumber: 31,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/home/madeleen/dev/gas/next/src/pages/index.tsx\",\n                lineNumber: 30,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/madeleen/dev/gas/next/src/pages/index.tsx\",\n        lineNumber: 26,\n        columnNumber: 5\n    }, this);\n}\n_s(Home, \"fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter\n    ];\n});\n_c = Home;\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvaW5kZXgudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBd0M7QUFFSjtBQUNjO0FBQ0Y7QUFDUjtBQUdGO0FBQ1k7QUFFakI7QUFDZ0I7QUFDVjtBQUV2QyxNQUFNVSxVQUFVO0lBQ2Q7UUFBRUMsT0FBTztRQUFPQyxNQUFNTCxtREFBSUE7UUFBRU0sTUFBTTtJQUFJO0lBQ3RDO1FBQUVGLE9BQU87UUFBZUMsTUFBTUosMkRBQVlBO1FBQUVLLE1BQU07SUFBSTtJQUN0RDtRQUFFRixPQUFPO1FBQVVDLE1BQU1ILHNEQUFPQTtRQUFFSSxNQUFNO0lBQUk7Q0FDN0M7QUFFYyxTQUFTQyxPQUFPOztJQUM3QixNQUFNQyxTQUFTZixzREFBU0E7SUFFeEIscUJBQ0UsOERBQUNNLGtFQUFNQTs7MEJBQ0wsOERBQUNELHdEQUFJQTtnQkFBQ1csTUFBSztnQkFBU0MsT0FBTTswQkFBWTs7Ozs7OzBCQUd0Qyw4REFBQ2hCLHlEQUFHQTtnQkFBQ2lCLElBQUk7b0JBQUVDLFVBQVU7b0JBQUdDLElBQUk7Z0JBQUU7MEJBQzVCLDRFQUFDakIsb0VBQUlBO29CQUFDa0IsU0FBUztvQkFBQ0MsU0FBUztvQkFBR0MsZ0JBQWU7OEJBQ3hDYixRQUFRYyxHQUFHLENBQUMsUUFBd0JDLFFBQVU7NEJBQWpDLEVBQUVkLE1BQUssRUFBRUMsS0FBSSxFQUFFQyxLQUFJLEVBQUU7d0JBQ2pDLHFCQUNFLDhEQUFDVixvRUFBSUE7NEJBQXdCdUIsSUFBSTtzQ0FDL0IsNEVBQUN0QiwyREFBS0E7Z0NBQ0p1QixTQUFTLElBQU1aLE9BQU9hLElBQUksQ0FBQ2Y7Z0NBQzNCSyxJQUFJO29DQUFFVyxRQUFRO29DQUFXQyxHQUFHO29DQUFRQyxXQUFXO2dDQUFTOztrREFFeEQsOERBQUNuQjs7Ozs7a0RBQ0QsOERBQUNWLGlFQUFVQTt3Q0FBQzhCLFNBQVE7a0RBQU1yQjs7Ozs7Ozs7Ozs7OzJCQU5uQixTQUFlLE9BQU5jOzs7OztvQkFVeEI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS1YsQ0FBQztHQTNCdUJYOztRQUNQZCxrREFBU0E7OztLQURGYyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvcGFnZXMvaW5kZXgudHN4PzE5YTAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvcm91dGVyXCI7XG5cbmltcG9ydCBCb3ggZnJvbSBcIkBtdWkvbWF0ZXJpYWwvQm94XCI7XG5pbXBvcnQgVHlwb2dyYXBoeSBmcm9tIFwiQG11aS9tYXRlcmlhbC9UeXBvZ3JhcGh5XCI7XG5pbXBvcnQgR3JpZCBmcm9tIFwiQG11aS9tYXRlcmlhbC9VbnN0YWJsZV9HcmlkMlwiO1xuaW1wb3J0IFBhcGVyIGZyb20gXCJAbXVpL21hdGVyaWFsL1BhcGVyXCI7XG5pbXBvcnQgeyBzdHlsZWQgfSBmcm9tIFwiQG11aS9tYXRlcmlhbC9zdHlsZXNcIjtcblxuaW1wb3J0IExpbmsgZnJvbSBcIi4uL2NvbXBvbmVudHMvTGlua1wiO1xuaW1wb3J0IExheW91dCBmcm9tIFwiLi4vY29tcG9uZW50cy9nZW5lcmFsL0xheW91dFwiO1xuXG5pbXBvcnQgSGVhdCBmcm9tIFwiLi4vaWNvbnMvaGVhdFwiO1xuaW1wb3J0IEVsZWN0cmljQm9sdCBmcm9tIFwiLi4vaWNvbnMvZWxlY3RyaWNCb2x0XCI7XG5pbXBvcnQgQmFsYW5jZSBmcm9tIFwiLi4vaWNvbnMvYmFsYW5jZVwiO1xuXG5jb25zdCBjb250ZW50ID0gW1xuICB7IHRpdGxlOiBcIkdhc1wiLCBJY29uOiBIZWF0LCBsaW5rOiBcIi9cIiB9LFxuICB7IHRpdGxlOiBcIkVsZWN0cmljaXR5XCIsIEljb246IEVsZWN0cmljQm9sdCwgbGluazogXCIvXCIgfSxcbiAgeyB0aXRsZTogXCJCdWRnZXRcIiwgSWNvbjogQmFsYW5jZSwgbGluazogXCIvXCIgfVxuXTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSG9tZSgpIHtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5cbiAgcmV0dXJuIChcbiAgICA8TGF5b3V0PlxuICAgICAgPExpbmsgaHJlZj1cIi9hYm91dFwiIGNvbG9yPVwic2Vjb25kYXJ5XCI+XG4gICAgICAgIEdvIHRvIHRoZSBhYm91dCBwYWdlXG4gICAgICA8L0xpbms+XG4gICAgICA8Qm94IHN4PXt7IGZsZXhHcm93OiAxLCBteTogMiB9fT5cbiAgICAgICAgPEdyaWQgY29udGFpbmVyIHNwYWNpbmc9ezJ9IGp1c3RpZnlDb250ZW50PVwiY2VudGVyXCI+XG4gICAgICAgICAge2NvbnRlbnQubWFwKCh7IHRpdGxlLCBJY29uLCBsaW5rIH0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8R3JpZCBrZXk9e2Bjb3RlbnQke2luZGV4fWB9IHhzPXs2fT5cbiAgICAgICAgICAgICAgICA8UGFwZXJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHJvdXRlci5wdXNoKGxpbmspfVxuICAgICAgICAgICAgICAgICAgc3g9e3sgY3Vyc29yOiBcInBvaW50ZXJcIiwgcDogXCIzMnB4XCIsIHRleHRBbGlnbjogXCJjZW50ZXJcIiB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxJY29uIC8+XG4gICAgICAgICAgICAgICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwiaDRcIj57dGl0bGV9PC9UeXBvZ3JhcGh5PlxuICAgICAgICAgICAgICAgIDwvUGFwZXI+XG4gICAgICAgICAgICAgIDwvR3JpZD5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvR3JpZD5cbiAgICAgIDwvQm94PlxuICAgIDwvTGF5b3V0PlxuICApO1xufVxuIl0sIm5hbWVzIjpbInVzZVJvdXRlciIsIkJveCIsIlR5cG9ncmFwaHkiLCJHcmlkIiwiUGFwZXIiLCJMaW5rIiwiTGF5b3V0IiwiSGVhdCIsIkVsZWN0cmljQm9sdCIsIkJhbGFuY2UiLCJjb250ZW50IiwidGl0bGUiLCJJY29uIiwibGluayIsIkhvbWUiLCJyb3V0ZXIiLCJocmVmIiwiY29sb3IiLCJzeCIsImZsZXhHcm93IiwibXkiLCJjb250YWluZXIiLCJzcGFjaW5nIiwianVzdGlmeUNvbnRlbnQiLCJtYXAiLCJpbmRleCIsInhzIiwib25DbGljayIsInB1c2giLCJjdXJzb3IiLCJwIiwidGV4dEFsaWduIiwidmFyaWFudCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/index.tsx\n"));

/***/ })

});