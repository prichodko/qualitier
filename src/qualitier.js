import cosmiconfig from 'cosmiconfig'
import chalk from 'chalk'
import { warning } from 'log-symbols'

const eslint = cosmiconfig('eslint', { packageProp: 'eslintConfig' })
const prettier = cosmiconfig('prettier')
const lintStaged = cosmiconfig('lint-staged')
const husky = cosmiconfig('husky')
const stylelint = cosmiconfig('stylelint')

const configs = [
  {
    name: 'ESLint',
    explorer: eslint,
    defaultConfig: {},
  },
  {
    name: 'Prettier',
    explorer: prettier,
    defaultConfig: {},
  },
  {
    name: 'lint-staged',
    explorer: lintStaged,
    defaultConfig: {},
  },
  {
    name: 'husky',
    explorer: husky,
    defaultConfig: {},
  },
  {
    name: 'stylelint',
    explorer: stylelint,
    defaultConfig: {},
  },
]

const qualitier = ({ dir = '.' }) => {
  configs.forEach(({ name, explorer }) => {
    const result = explorer.searchSync()
    if (!result) {
      console.log(warning, `Config for ${chalk.yellow(name)} not found.`)
    }
  })
}

export { qualitier }
