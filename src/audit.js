import cosmiconfig from 'cosmiconfig'
import path from 'path'

import chalk from 'chalk'
import { success, warning, error } from 'log-symbols'
import diff from 'jest-diff'
import { NO_DIFF_MESSAGE } from 'jest-diff/build/constants'

const eslint = cosmiconfig('eslint', { packageProp: 'eslintConfig' })
const prettier = cosmiconfig('prettier')
const lintStaged = cosmiconfig('lint-staged')
const husky = cosmiconfig('husky')
const commitlint = cosmiconfig('commitlint')
const stylelint = cosmiconfig('stylelint')

const getConfig = p => require(path.resolve(__dirname, '..', p))

const configs = [
  {
    name: 'ESLint',
    explorer: eslint,
    defaultConfig: {},
  },
  {
    name: 'Prettier',
    explorer: prettier,
    defaultConfig: getConfig('.prettierrc.js'),
  },
  {
    name: 'lint-staged',
    explorer: lintStaged,
    defaultConfig: getConfig('.lintstagedrc.js'),
  },
  {
    name: 'commitlint',
    explorer: commitlint,
    defaultConfig: getConfig('.commitlintrc.js'),
  },
  {
    name: 'husky',
    explorer: husky,
    defaultConfig: getConfig('.huskyrc.js'),
  },
  {
    name: 'stylelint',
    explorer: stylelint,
    defaultConfig: getConfig('.stylelintrc.js'),
  },
]

export const audit = (dir = process.cwd(), flags) => {
  const audit = configs.reduce(
    (acc, { name, explorer, defaultConfig }) => {
      const result = explorer.searchSync(dir)

      if (!result) {
        acc.error.push({ name })
        return acc
      }

      const message = diff(defaultConfig, result.config)

      if (message === NO_DIFF_MESSAGE) {
        acc.success.push({ name })
      } else {
        acc.warning.push({ name, diff: message })
      }

      return acc
    },
    { success: [], warning: [], error: [] }
  )

  console.log()
  console.log(chalk.green('Success'))
  audit.success.forEach(config => {
    console.log(success, chalk.green(config.name))
  })

  console.log()
  console.log(chalk.yellow('Warning - found, but differs from recommended'))
  audit.warning.forEach(config => {
    console.log(warning, `${chalk.yellow(config.name)}`)
    if (flags.diff) {
      console.log(config.diff)
    }
  })

  console.log()
  console.log(chalk.red('Error - not found'))
  audit.error.forEach(config => {
    console.log(error, `${chalk.red(config.name)}`)
  })
}
