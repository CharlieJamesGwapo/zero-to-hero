# Security Policy

## Supported code

Security fixes apply to the current `main` branch and the production deployment. This project does not yet maintain separate supported release branches.

## Report a vulnerability privately

Use [GitHub private vulnerability reporting](https://github.com/CharlieJamesGwapo/zero-to-hero/security/advisories/new). Include the affected page or component, conditions needed to reproduce, potential impact, and a minimal safe reproduction. Do not include another person's private data or publish exploit instructions in a public issue.

Maintainers will review reports and coordinate a fix and disclosure when appropriate. Reporting does not guarantee a specific response or resolution time.

For a broken link, typo, or ordinary bug without security impact, use a public issue instead.

## Keep secrets out of the repository

Use environment variables for secrets and review staged changes before committing. `.gitignore` does not remove values already recorded in Git history. If a credential is exposed, revoke or rotate it and investigate where it was used.
