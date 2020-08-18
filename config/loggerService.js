// const winston = require('winston');
// let options = {
//   file: {
//     level: 'silly',
//     filename: `./logs/app.log`,
//     handleExceptions: true,
//     json: true,
//     maxsize: 5242880, // 5MB
//     maxFiles: 5,
//     colorize: true,
//   },
//   console: {
//     level: 'silly',
//     handleExceptions: true,
//     json: false,
//     colorize: true,
//   },
// };
// const myCustomLevels = {
//   levels: {
//     error: 0,  //error
//     warn: 1,  //advertir
//     info: 2,  // Informacion
//     http: 3,  // http
//     verbose: 4, //detallado
//     debug: 5, // depuracion
//     silly: 6  // advetencia minima
//   }
// };
// dateFormat = () => {
//   return new Date(Date.now()).toTimeString() + new Date(Date.now()).toLocaleDateString()
// }

// class LoggerService {
//   constructor(route) {
//     this.log_data = null
//     this.route = route
//     const logger = winston.createLogger({
//       levels: myCustomLevels.levels,
//       transports: [
//         new winston.transports.Console(options.console),
//         new winston.transports.File(options.file)
//       ],
//       format: winston.format.printf((info) => {
//         let message = `${dateFormat()} | ${info.level.toUpperCase()}| ${info.message} | `
//         message = info.obj ? message + `data:${JSON.stringify(info.obj)} | ` : message
//         message = this.log_data ? message + `log_data:${JSON.stringify(this.log_data)} | ` : message
//         return message
//       })
//     });

//     this.logger = logger
//   }
//   setLogData(log_data) {
//     this.log_data = log_data
//   }
//   async info(message) {
//     this.logger.log('info', message);
//   }
//   async info(message, obj) {
//     this.logger.log('info', message, {
//       obj
//     })
//   }
//   async debug(message) {
//     this.logger.log('debug', message);
//   }
//   async debug(message, obj) {
//     this.logger.log('debug', message, {
//       obj
//     })
//   }
//   async error(message) {
//     this.logger.log('error', message);
//   }
//   async error(message, obj) {
//     this.logger.log('error', message, {
//       obj
//     })
//   }
//   stream(){
//     this.logger.stream = {
//       write: function(message, encoding) {
//         // use the 'info' log level so the output will be picked up by both transports (file and console)
//         logger.info(message);
//       }
//     }
//   }
// }
// module.exports = LoggerService