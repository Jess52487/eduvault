#!/usr/bin/env node
import { runContributorDiagnostics } from '../src/lib/health/contributorDiagnostics.js';

const json = process.argv.includes('--json');
try {
  const report = await runContributorDiagnostics();
  if (json) console.log(JSON.stringify(report, null, 2));
  else {
    console.log(`Contributor diagnostics: ${report.dependencyReport.status.toUpperCase()}`);
    console.log(`Node: ${report.runtime.node} (${report.runtime.platform}/${report.runtime.arch})`);
    for (const item of report.remediation) console.log(`- ${item.dependency}: ${item.hint}`);
  }
  process.exit(report.dependencyReport.status === 'misconfigured' ? 1 : 0);
} catch (error) {
  console.error(`Contributor diagnostics failed: ${error.message}`);
  process.exit(1);
}
