export type TrackType = "video" | "audio" | "overlay";

export interface TimelineTrack {
  id: string;
  name: string;
  type: TrackType;
  index: number;
  locked?: boolean;
  height?: number;
}

export interface ClipSelection {
  clipId?: string;
  trackId?: string;
}

export type TimelinePosition = number;
export type TimelineDuration = number;
