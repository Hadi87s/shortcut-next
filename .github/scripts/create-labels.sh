#!/bin/bash

# Your GitHub repo (format: owner/repo)
REPO="Hadi87s/shortcut-next"

# Create labels
gh label create "documentation" --color "0075ca" --description "Documentation updates" --repo $REPO
gh label create "dependencies" --color "0366d6" --description "Dependency updates" --repo $REPO
gh label create "ci/cd" --color "000000" --description "CI/CD workflow changes" --repo $REPO
gh label create "feature" --color "a2eeef" --description "New features" --repo $REPO
gh label create "components" --color "d4c5f9" --description "Component changes" --repo $REPO
gh label create "config" --color "fbca04" --description "Configuration changes" --repo $REPO
gh label create "tests" --color "c5def5" --description "Test changes" --repo $REPO
gh label create "bug" --color "d73a4a" --description "Bug fixes" --repo $REPO
gh label create "enhancement" --color "84b6eb" --description "Enhancements" --repo $REPO