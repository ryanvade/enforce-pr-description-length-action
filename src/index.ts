import * as core from "@actions/core";
import * as github from "@actions/github";

async function run() {
    try {
        core.debug("Starting PR Descrption length check");

        const description = getPullRequestDescription();
        const minLength = getMinimumLength();

        core.debug(description);
        core.debug(String(minLength));

        const descriptionLength = description.length;

        if (descriptionLength < minLength) {
            const failureMessage = (minLength == 1)? "Pull Request Description must be provided": `Pull Request Description Must be at least ${minLength} characters long`;
            core.error(failureMessage);
            core.setFailed(failureMessage);
            return;
        }
        core.info("Description Passed");

    } catch (error) {
        core.setFailed(error.message);
    }
}

export function getMinimumLength() {
    let length = 1;
    const minimumLength = core.getInput("minLength", { required: false }).trim();
    if (minimumLength && /^(\d+)$/.test(minimumLength)) {
        length = Number(minimumLength);
    }

    if (minimumLength && !/^(\d+)$/.test(minimumLength)) {
        throw new Error("minLength must be a positive number");
    }

    return length;
}


export function getPullRequestDescription() {
    let pull_request = github.context.payload.pull_request;
    core.debug(`Pull Request: ${JSON.stringify(github.context.payload.pull_request)}`);
    if (pull_request == undefined || pull_request.body == undefined) {
        throw new Error("This action should only be run with Pull Request Events");
    }
    return pull_request.body;
}

run()