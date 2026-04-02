#!/usr/bin/env bash
set -euo pipefail

# Upload all assets in a directory to S3 and print the public URLs.
# Usage: upload_assets.sh <assets_dir> <article_slug>
#
# Files are uploaded to:
#   s3://alitu-knowledge-base-assets/articles/<article_slug>/<filename>
#
# Public URL pattern:
#   https://alitu-knowledge-base-assets.s3.eu-west-1.amazonaws.com/articles/<article_slug>/<filename>

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <assets_dir> <article_slug>" >&2
  exit 2
fi

assets_dir="$1"
slug="$2"
bucket="alitu-knowledge-base-assets"
region="eu-west-1"
base_url="https://${bucket}.s3.${region}.amazonaws.com"

if [ ! -d "$assets_dir" ]; then
  echo "Assets directory not found: $assets_dir" >&2
  exit 1
fi

count=0
for file in "$assets_dir"/*; do
  [ -f "$file" ] || continue
  filename="$(basename "$file")"
  s3_key="articles/${slug}/${filename}"

  # Detect content type
  case "${filename##*.}" in
    gif)  content_type="image/gif" ;;
    png)  content_type="image/png" ;;
    jpg|jpeg) content_type="image/jpeg" ;;
    webp) content_type="image/webp" ;;
    mp4)  content_type="video/mp4" ;;
    webm) content_type="video/webm" ;;
    *)    content_type="application/octet-stream" ;;
  esac

  aws s3 cp "$file" "s3://${bucket}/${s3_key}" \
    --content-type "$content_type" \
    --cache-control "public, max-age=31536000, immutable" \
    --quiet

  echo "${base_url}/${s3_key}"
  count=$((count + 1))
done

echo "Uploaded ${count} file(s) to s3://${bucket}/articles/${slug}/" >&2
