"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function ProgressBarProvider() {
  return (
    <ProgressBar
      height="3px"
      color="#F5A623"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}
