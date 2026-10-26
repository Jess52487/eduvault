import { checkAllDependencies, DEPENDENCY_STATUS, sanitizeDiagnostics } from './dependencyChecker.js';

const ENVIRONMENT_KEYS = [
  'MONGODB_URI',
  'PINATA_JWT',
  'NEXT_PUBLIC_STELLAR_RPC_URL',
  'NEXT_PUBLIC_HORIZON_URL',
  'NEXT_PUBLIC_MATERIAL_REGISTRY_CONTRACT_ID',
  'NEXT_PUBLIC_PURCHASE_MANAGER_CONTRACT_ID',
];

export function collectContributorDiagnostics({ env = process.env, dependencyReport } = {}) {
  const present = Object.fromEntries(ENVIRONMENT_KEYS.map((key) => [key, Boolean(env[key])]));
  return {
    generatedAt: new Date().toISOString(),
    runtime: { node: process.version, platform: process.platform, arch: process.arch },
    packageManager: {
      npmLock: Boolean(env.npm_config_user_agent?.includes('npm')),
      lockfiles: ['package-lock.json', 'pnpm-lock.yaml', 'yarn.lock'],
    },
    environment: present,
    dependencyReport: sanitizeDiagnostics(dependencyReport),
    remediation: dependencyReport?.remediations || [],
    retryable: dependencyReport?.status === DEPENDENCY_STATUS.UNAVAILABLE,
  };
}

export async function runContributorDiagnostics(options = {}) {
  const dependencyReport = options.dependencyReport || await checkAllDependencies(options);
  return collectContributorDiagnostics({ ...options, dependencyReport });
}
