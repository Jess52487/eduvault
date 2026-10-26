# Contributor diagnostics

Run `npm run diagnostics:contributor -- --json` when local setup or dependency checks fail. The report combines runtime details, presence-only environment checks, dependency health, and remediation hints. Values are never printed, so it is safe to attach the JSON report to a support request. An unavailable service is retryable; a misconfigured dependency requires updating local configuration.
