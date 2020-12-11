import { getMinimumLength, getPullRequestDescription } from "../src/index";
import * as github from "@actions/github";
import { readFileSync } from "fs";
import { getDefaultSettings } from "http2";

describe("index", () => {
    describe("getMinimumIndex", () => {
        const name = "minLength";
        it("returns the default length if one is not provided", () => {
            process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] = "";
            const minLength = getMinimumLength();
            expect(minLength).toBe(1);
        });

        it("returns the provided min length if it is valid", () => {
            process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] = "5";
            const minLength = getMinimumLength();
            expect(minLength).toBe(5);
        });

        it("throws an error if the provided min length is not a number", () => {
            process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] = "a";
            expect(getMinimumLength).toThrowError("minLength must be a positive number");
        });


        it("throws an error if the provided min length is negative", () => {
            process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] = "-4";
            expect(getMinimumLength).toThrowError("minLength must be a positive number");
        });
    });

    describe("getPullRequestDescription", () => {
        it("gets a pull request event description", () => {
            process.env["GITHUB_EVENT_PATH"] = __dirname + "/valid-context.json";
            github.context.payload = JSON.parse(
                readFileSync(process.env.GITHUB_EVENT_PATH, { encoding: 'utf8' })
            );
            const description = getPullRequestDescription();
            expect(description).toEqual("Valid Body");
        });

        it("throws an error if the event is not a pull_request type", () => {
            process.env["GITHUB_EVENT_PATH"] = __dirname + "/wrong-event-type-context.json";
            github.context.payload = JSON.parse(
                readFileSync(process.env.GITHUB_EVENT_PATH, { encoding: 'utf8' })
            );
            expect(getPullRequestDescription).toThrowError("This action should only be run with Pull Request Events");
        });

        it("throws an error if the description is not provided", () => {
            process.env["GITHUB_EVENT_PATH"] = __dirname + "/event-without-a-body.json";
            github.context.payload = JSON.parse(
                readFileSync(process.env.GITHUB_EVENT_PATH, { encoding: 'utf8' })
            );
            expect(getPullRequestDescription).toThrowError("This action should only be run with Pull Request Events");
        });
    });
})