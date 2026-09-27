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

test("resource previews use secure publisher images and unique resource IDs", () => {
  assert.equal(
    new Set(resources.map((item) => item.id)).size,
    resources.length,
  );
  for (const resource of resources) {
    assert.equal(new URL(resource.url).protocol, "https:");
    if (resource.format === "Video" || !resource.previewImage) continue;
    const source = new URL(resource.url);
    const preview = new URL(resource.previewImage);
    assert.equal(preview.protocol, "https:");
    assert.equal(preview.hostname, source.hostname);
  }
});
