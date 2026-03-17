import { existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const distDir = join(process.cwd(), '.next');

try {
  if (existsSync(distDir)) {
    rmSync(distDir, { recursive: true, force: true });
    console.log('Removed stale .next build artifacts.');
  }
} catch (error) {
  console.error('Failed to clean .next directory:', error);
  process.exitCode = 1;
}
