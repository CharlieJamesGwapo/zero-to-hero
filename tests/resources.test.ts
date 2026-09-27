import assert from "node:assert/strict";
import test from "node:test";
import { resources } from "../src/lib/resources";

test("every video has a valid YouTube ID matching its external link", () => {
  const videos = resources.filter((item) => item.format === "Video");
  assert.ok(videos.length > 0);
  for (const video of videos) {
    assert.match(video.videoId, /^[A-Za-z0-9_-]{11}$/);
    assert.equal(new URL(video.url).searchParams.get("v"), video.videoId);
    assert.equal(new URL(video.url).hostname, "www.youtube.com");
  }
});
