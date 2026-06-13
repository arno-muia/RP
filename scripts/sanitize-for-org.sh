#!/usr/bin/env bash
# Redact credential-like values before pushing to RoyalPriesthoodTech org remotes.
set -euo pipefail

find . -type f \( -name '*.md' -o -name '.env.example' \) \
  ! -path './.git/*' \
  ! -path './node_modules/*' \
  ! -path './apps/*/node_modules/*' \
  ! -path './.next/*' \
  -print0 | xargs -0 sed -i \
  -e 's/Admin@2026/(local — set via SEED_ADMIN_PASSWORD)/g' \
  -e 's/Student@2026/(local — set via SEED_STUDENT_PASSWORD)/g' \
  -e 's/admin1234/(local seed password)/g' \
  -e 's/hosp1234/(local seed password)/g' \
  -e 's/pastor1234/(local seed password)/g' \
  -e 's/finance1234/(local seed password)/g' \
  -e 's/leader1234/(local seed password)/g' \
  -e 's|https://github.com/ken-muritu/|https://github.com/RoyalPriesthoodTech/|g' \
  -e 's/-ken-muritu\./-YOUR-TURSO-ORG./g' \
  -e 's/rpos-v3-ken-muritu/rpos-production/g'

echo "Sanitized markdown and .env.example files for org release."
