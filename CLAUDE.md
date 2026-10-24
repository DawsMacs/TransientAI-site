# Matterworm site instructions

Static site for the Matterworm Foundation (live at matterworm.github.io). See `README.md` for layout, preview and conventions.

## Communication protocol

- **en-US.** All writing (page copy, blog posts, comments, docs, commit messages, replies) is en-US: spelling and vocabulary (color, behavior, license, organize, recognize, center, percent, toward). This holds from now on for all work. Stick with en-US; check new text before committing.

## Private details never go public (strict)

This repository, its commit messages, pull request and issue text, and the published pages are public and permanent. Never name, describe, hint at, link or say that something private exists: anything about work, people or machines outside this site, personal data, contact details, credentials, keys, local notes. Write only what the public needs.

- Before every commit and every pull request or issue text, search what will be published for anything private. The assistant's private notes hold the list of terms, and a local commit hook refuses a match. Never bypass the hook (`--no-verify`, editing or removing it) and never reword a match to get past it: remove the content.
- A guardrail must not describe what it guards: keep such instructions in the private notes, not in a public file.
- A leak found in published text is removed from the current files at once and Daws is told in the same message. Rewriting history is his decision, never the assistant's.
- When unsure whether something is private, treat it as private and ask. No email address or account name that is not already public goes into any file, commit or pull request text.
