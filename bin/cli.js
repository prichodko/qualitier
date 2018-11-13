#!/usr/bin/env node

'use strict'

const sade = require('sade')
const updateNotifier = require('update-notifier')

const { audit, fix } = require('../')
const pkg = require('../package')

updateNotifier({ pkg }).notify()

const cli = sade('qualitier')

cli
  .version(pkg.version)
  .option('--web, -w', 'Audit project as a web app', false)
  .option('--node, -n', 'Audit project as a node app', false)
  .option('--diff, -d', 'Show diff between theirs and ours config object')
  .example('--diff --web')
  .example('--node')

cli
  .command('audit [dir]', 'Audit project standards (default)', {
    default: true,
  })
  .action(audit)

cli.command('fix [dir]', 'Fix or add config files').action(fix)

cli.parse(process.argv)
