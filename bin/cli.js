#!/usr/bin/env node

'use strict'

const updateNotifier = require('update-notifier')

const { qualitier } = require('../')
const pkg = require('../package')

updateNotifier({ pkg }).notify()
// require('please-upgrade-node')(pkg)

const args = process.argv.slice(2)

qualitier({ dir: args[0] })
