#! /usr/bin/env node

// Build up the docs _sidebar.md using the contents of /plugins
const path = require('path');
const fs = require('fs-extra');

const SRC_DIR = path.join(__dirname, '..', 'src');
const SIDEBAR_FILE = path.join(SRC_DIR, '_sidebar.md');
const PLUGINS_DOCS_DIR = path.join(SRC_DIR, 'plugins');
const PLUGINS_DIR = path.join(__dirname, '..', '..', '..', 'plugins');

async function moveAndRenamePluginReadmes() {
  const plugins = (await fs.readdir(PLUGINS_DIR)).filter(
    p => p !== '.DS_Store'
  );

  await Promise.all(
    plugins.map(pluginName =>
      fs.copy(
        path.join(PLUGINS_DIR, pluginName, 'README.md'),
        path.join(PLUGINS_DOCS_DIR, `${pluginName}.md`)
      )
    )
  );

  return plugins;
}

async function updateSidebar(pluginNames) {
  const currentSidebarContent = String(await fs.readFile(SIDEBAR_FILE));
  const currentSidebarLines = currentSidebarContent.split('\n');
  const pluginsStartingLine = currentSidebarLines.findIndex(l =>
    l.startsWith('* [Plugins]')
  );
  const pluginsEndingLine = currentSidebarLines
    .slice(pluginsStartingLine + 1)
    .findIndex(l => !l.startsWith('  - ['));

  const pluginLines = pluginNames.map(
    pluginName => `  - [${pluginName}](./plugins/${pluginName}.md)`
  );

  const newLines = [
    ...currentSidebarLines.slice(0, pluginsStartingLine + 1),
    ...pluginLines,
    ...currentSidebarLines.slice(pluginsStartingLine + pluginsEndingLine + 1)
  ];

  await fs.writeFile(SIDEBAR_FILE, newLines.join('\n'));
}

async function main() {
  const pluginNames = await moveAndRenamePluginReadmes();
  await updateSidebar(pluginNames);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
