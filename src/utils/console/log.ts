import chalk from 'chalk'

const log = console.log
const line = '--------------------------------------------'

export const logErrMsg = (message: any) => {
    log(chalk.red.bold(message))
    log(chalk.gray(line))
}

export const logErrInfoMsg = (message: any) => {
    log(chalk.black.bgRed(message))
    log(chalk.gray(line))
}

export const logSuccessMsg = (message: any) => {
    log(chalk.green.bold(message))
    log(chalk.gray(line))
}

export const logBlueMsg = (message: any) => {
    log(chalk.blue.bold(message))
    log(chalk.gray(line))
}

export const logMsg = (message: any) => {
    log(chalk.bold(message))
    log(chalk.gray(line))
}


