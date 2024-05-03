import chalk from "chalk";

class Logger {
  injector(msg: string, injector: any) {
    console.log(
      `${chalk.blueBright.bold("[INJ]")} ${chalk.whiteBright(msg)} ${chalk.cyan(
        injector
      )}`
    );
  }

  gateway(msg: string, obj?: any) {
    console.log(`${chalk.greenBright.bold("[GTW]")} ${chalk.whiteBright(msg)}`);
    if (obj) console.log(obj);
  }

  voice(msg: string, obj?: any) {
    console.log(
      `${chalk.magentaBright.bold("[VOX]")} ${chalk.whiteBright(msg)}`
    );
    if (obj) console.log(obj);
  }

  router(msg: string, obj?: any) {
    console.log(`${chalk.redBright.bold("[RWT]")} ${chalk.whiteBright(msg)}`);
    if (obj) console.log(obj);
  }

  http(preMsg: string | number, msg: string, obj?: any) {
    console.log(
      `${chalk.yellowBright.bold("[HTP]")} ${chalk.cyan(
        preMsg
      )} ${chalk.whiteBright(msg)}`
    );
    if (obj) console.log(obj);
  }
}

export const logger = new Logger();
