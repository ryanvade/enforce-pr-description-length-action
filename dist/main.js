"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPullRequestDescription = exports.getMinimumLength = void 0;
var github = __importStar(require("@actions/github"));
var core = __importStar(require("@actions/core"));
var getMinimumLength = function () {
    var length = 1;
    var minimumLength = core.getInput("minLength", { required: false }).trim();
    if (minimumLength && /^(\d+)$/.test(minimumLength)) {
        length = Number(minimumLength);
    }
    if (minimumLength && !/^(\d+)$/.test(minimumLength)) {
        throw new Error("minLength must be a positive number");
    }
    return length;
};
exports.getMinimumLength = getMinimumLength;
var getPullRequestDescription = function () {
    var pull_request = github.context.payload.pull_request;
    core.debug("Pull Request: ".concat(JSON.stringify(github.context.payload.pull_request)));
    if (pull_request == undefined || pull_request.body == undefined) {
        throw new Error("This action should only be run with Pull Request Events");
    }
    return pull_request.body;
};
exports.getPullRequestDescription = getPullRequestDescription;
