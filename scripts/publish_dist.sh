#!/bin/bash

# Exit on any error
set -e

# Get version from package.json
VERSION=$(node -p "require('./package.json').version")

echo "Building version $VERSION..."

# Build the project (copies src to dist)
npm run build

# Ensure releases directory exists
mkdir -p releases

# Create a versioned folder for the dist output
DIR_NAME="releases/dist_v$VERSION"
rm -rf "$DIR_NAME"
cp -r dist "$DIR_NAME"

# Copy release notes if they exist
if [ -f "CHANGELOG.md" ]; then
  cp CHANGELOG.md "$DIR_NAME/"
fi
if [ -f "README.md" ]; then
  cp README.md "$DIR_NAME/"
fi

# Zip it for easy upload to pCloud
ZIP_NAME="releases/dist_v$VERSION.zip"
echo "Creating $ZIP_NAME..."
cd releases
zip -r "dist_v$VERSION.zip" "dist_v$VERSION"
cd ..

echo "==================================="
echo "Done! You can now upload $ZIP_NAME to pCloud."
echo "==================================="
