const { spawn } = require('child_process');
const path = require('path');
const chokidar = require('chokidar');

const tailwindBin = require.resolve('tailwindcss/lib/cli.js');
const webpackBin = require.resolve('webpack-cli/bin/cli.js');

let tailwindProcess = null;
let pendingBuild = false;
let webpackProcess = null;
let webpackStarted = false;

const tailwindArgs = [
  tailwindBin,
  '-c',
  path.resolve('tailwind.config.js'),
  '-i',
  path.resolve('global.css'),
  '-o',
  path.resolve('nativewind.css'),
];

function runTailwind(onComplete) {
  if (tailwindProcess) {
    pendingBuild = true;
    return;
  }

  console.log('[tailwind] building CSS...');
  tailwindProcess = spawn('node', tailwindArgs, { stdio: 'inherit' });

  tailwindProcess.on('exit', (code) => {
    tailwindProcess = null;
    if (code !== 0) {
      console.error(`[tailwind] build failed with code ${code}`);
    } else {
      console.log('[tailwind] build finished');
    }

    if (typeof onComplete === 'function') {
      onComplete(code);
    }

    if (pendingBuild) {
      pendingBuild = false;
      runTailwind();
    }
  });
}

function startWebpack() {
  if (webpackStarted) return;
  webpackStarted = true;
  webpackProcess = spawn('node', [
    webpackBin,
    'serve',
    '--config',
    path.resolve('webpack.config.js'),
    '--mode',
    'development',
    '--open',
  ], { stdio: 'inherit' });

  webpackProcess.on('exit', (code) => {
    if (code && code !== 0) {
      console.error(`[webpack] exited with code ${code}`);
    }
    shutdown();
  });
}

const watcher = chokidar.watch([
  'tailwind.config.js',
  'global.css',
  'App.{js,jsx,ts,tsx}',
  'MyApp/app/**/*.{js,jsx,ts,tsx}',
  'MyApp/components/**/*.{js,jsx,ts,tsx}',
  'MyApp/hooks/**/*.{js,jsx,ts,tsx}',
], {
  ignoreInitial: true,
});

watcher.on('all', (event, filePath) => {
  console.log(`[tailwind] change detected (${event}): ${filePath}`);
  runTailwind();
});

function shutdown() {
  if (tailwindProcess) {
    tailwindProcess.kill('SIGINT');
    tailwindProcess = null;
  }
  if (webpackProcess) {
    webpackProcess.kill('SIGINT');
    webpackProcess = null;
  }
  watcher.close().catch(() => {});
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

runTailwind((code) => {
  if (code === 0) {
    startWebpack();
  }
});
