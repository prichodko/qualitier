import inquirer from 'inquirer'
import chalk from 'chalk'

// overwrite dimmed default separator
const separator = msg => {
  const s = new inquirer.Separator()
  s.line = msg
  return s
}

export const fix = async (dir = process.cwd(), opts) => {
  const { configs, place } = await inquirer.prompt([
    {
      type: 'list',
      name: 'place',
      message: 'Where do you prefer placing config?',
      choices: ['file', 'package.json'],
    },
    {
      type: 'checkbox',
      name: 'configs',
      message: 'What do you want to fix?',
      choices: [
        separator(chalk.blue('— Out of date —')),
        'husky',
        separator(chalk.yellow('\n— Not matching to recommended —')),
        'ESLint',
        separator(chalk.red('\n— Missing —')),
        'Prettier',
      ],
      pageSize: 10,
    },
  ])

  // TODO: write file or property to package.json
}
