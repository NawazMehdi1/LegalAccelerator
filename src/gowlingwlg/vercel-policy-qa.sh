#!/bin/bash
echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_GIT_COMMIT_REF" == "qa" ]]; then
  echo "✅ - Build can proceed"
  exit 1
else
  echo "🛑 - Branch name is invalid for build."
  exit 0
fi
