#!/usr/bin/env node

"use strict"

const meow = require("meow")
const chalk = require("chalk").default
const updateNotifier = require("update-notifier")

const { qualitier } = require("../")
const pkg = require("../package")

updateNotifier({ pkg }).notify()

const { input, flags } = meow(
  `
    Usage
      $ qualitier ${chalk.dim("<project-directory> [options]")}
 
    Options
      --diff, -d  Show configs diff object 
 
    Examples
      $ qualitier --diff
`,
  {
    flags: {
      diff: {
        type: "boolean",
        alias: "d"
      },
      version: {
        alias: "v"
      },
      help: {
        alias: "h"
      }
    }
  }
)

qualitier({ dir: input[0], flags })
