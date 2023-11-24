/* eslint-disable @typescript-eslint/no-explicit-any */
import * as core from "@actions/core";
import { getMinimumLength, getPullRequestDescription } from "./main";

const run = async () => {
  try {
    core.debug("Starting PR Description length check");

    const description = getPullRequestDescription();
    const minLength = getMinimumLength();

    core.debug(description);
    core.debug(String(minLength));

    const descriptionLength = description.length;

    if (descriptionLength < minLength) {
      const failureMessage =
        minLength == 1
          ? "Pull Request Description must be provided"
          : `Pull Request Description Must be at least ${minLength} characters long`;
      core.error(failureMessage);
      core.setFailed(failureMessage);
      return;
    }
    core.info("Description Passed");
  } catch (error: any) {
    core.setFailed(error.message);
  }
};

// noinspection JSIgnoredPromiseFromCall
run();
