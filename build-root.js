const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting root build pipeline...');

try {
  // 1. Install & Build frontend
  console.log('Building frontend application...');
  execSync('npm install', { cwd: path.join(__dirname, 'agentverse', 'frontend'), stdio: 'inherit' });
  execSync('npm run build', { cwd: path.join(__dirname, 'agentverse', 'frontend'), stdio: 'inherit' });

  // 2. Copy build artifacts to root /dist
  console.log('Copying build artifacts to root dist folder...');
  const srcDir = path.join(__dirname, 'agentverse', 'frontend', 'dist');
  const destDir = path.join(__dirname, 'dist');

  if (fs.existsSync(destDir)) {
    fs.rmSync(destDir, { recursive: true, force: true });
  }
  fs.mkdirSync(destDir, { recursive: true });

  const copyRecursiveSync = (src, dest) => {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
      }
      fs.readdirSync(src).forEach((childItemName) => {
        copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  };

  copyRecursiveSync(srcDir, destDir);
  console.log('Build pipeline completed successfully!');
} catch (error) {
  console.error('Build pipeline failed:', error);
  process.exit(1);
}
