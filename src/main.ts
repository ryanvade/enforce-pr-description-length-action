import * as github from "@actions/github";
import * as core from "@actions/core";

export const getMinimumLength = () => {
  let length = 1;
  const minimumLength = core.getInput("minLength", { required: false }).trim();
  if (minimumLength && /^(\d+)$/.test(minimumLength)) {
    length = Number(minimumLength);
  }

  if (minimumLength && !/^(\d+)$/.test(minimumLength)) {
    throw new Error("minLength must be a positive number");
  }

  return length;
};

export const getPullRequestDescription = () => {
  const pull_request = github.context.payload.pull_request;
  core.debug(
    `Pull Request: ${JSON.stringify(github.context.payload.pull_request)}`,
  );
  if (pull_request == undefined || pull_request.body == undefined) {
    throw new Error("This action should only be run with Pull Request Events");
  }
  return pull_request.body;
};
