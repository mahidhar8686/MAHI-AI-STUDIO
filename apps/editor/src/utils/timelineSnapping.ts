import type { TimelineClip } from "../store/mediaStore";

export interface SnapOptions {
  candidate: number;
  targets: number[];
  zoom: number;
  thresholdPx?: number;
}

export function snapTimelinePosition({
  candidate,
  targets,
  zoom,
  thresholdPx = 8,
}: SnapOptions): number {
  if (zoom <= 0) {
    return Math.max(0, candidate);
  }

  const thresholdSeconds = thresholdPx / zoom;

  let closest = candidate;
  let closestDistance = thresholdSeconds;

  for (const target of targets) {
    if (!Number.isFinite(target) || target < 0) {
      continue;
    }

    const distance = Math.abs(candidate - target);

    if (distance <= closestDistance) {
      closest = target;
      closestDistance = distance;
    }
  }

  return Math.max(0, closest);
}

export function buildSnapTargets(
  activeId: string,
  timeline: TimelineClip[],
  playheadPx: number,
  zoom: number
): number[] {
  const targets: number[] = [0];

  for (const clip of timeline) {
    if (clip.id === activeId) continue;

    targets.push(clip.start);
    targets.push(clip.start + clip.duration);
  }

  if (Number.isFinite(playheadPx) && playheadPx >= 0 && zoom > 0) {
    targets.push(playheadPx / zoom);
  }

  return targets;
}