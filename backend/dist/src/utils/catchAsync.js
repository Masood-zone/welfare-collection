"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next); // Automatically pass errors to `next()`
    };
};
exports.catchAsync = catchAsync;
