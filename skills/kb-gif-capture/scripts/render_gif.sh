#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -lt 2 ] || [ "$#" -gt 4 ]; then
  echo "Usage: $0 <frames_dir> <output_gif> [fps] [width]" >&2
  exit 2
fi

frames_dir="$1"
output_gif="$2"
fps="${3:-4}"
width="${4:-960}"

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg is required but was not found in PATH" >&2
  exit 1
fi

if [ ! -d "$frames_dir" ]; then
  echo "Frames directory not found: $frames_dir" >&2
  exit 1
fi

if ! find "$frames_dir" -maxdepth 1 -name '*.png' | grep -q .; then
  echo "No PNG frames found in: $frames_dir" >&2
  exit 1
fi

mkdir -p "$(dirname "$output_gif")"

ffmpeg -y \
  -framerate "$fps" \
  -i "$frames_dir/%03d.png" \
  -vf "fps=$fps,scale=${width}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" \
  "$output_gif"
