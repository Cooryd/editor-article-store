import { Config } from '../types/config';
import { ProcessEnv } from '../types/node';

// Creates a new Config by processing the process' arguments.
export function createConfigFromArgs(args: string[]): Config {
  const retVal: Config = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--article-root' || args[i] === '-r') {
      if (++i < args.length) {
        retVal.articleRoot = args[i];
      }
    }
    if (args[i] === '--port' || args[i] === '-p') {
      if (++i < args.length) {
        retVal.port = parseInt(args[i]);
      }
    }
  }
  return retVal;
}

// Creates a new Config from the process' enviroment vars.
export function createConfigFromEnv(env: ProcessEnv): Config {
  const retVal: Config = {};
  if (env['ARTICLE_ROOT']) {
    retVal.articleRoot = env['ARTICLE_ROOT'];
  }
  if (env['PORT']) {
    retVal.port = parseInt(env['PORT']);
  }
  if (env['AWS_REGION']) {
    retVal.awsSqsRegion = env['AWS_REGION'];
  }
  if (env['AWS_ACCESS_KEY']) {
    retVal.awsSqsAccessKey = env['AWS_ACCESS_KEY']; 
  }
  if (env['AWS_SECRET_ACCESS_KEY']) {
    retVal.awsSqsSecretAccessKey = env['AWS_SECRET_ACCESS_KEY'];
  }
  if (env['AWS_SECRET_ACCESS_KEY']) {
    retVal.awsSqsSecretAccessKey = env['AWS_SECRET_ACCESS_KEY']
  }
  if (env['SQS_KRYIA_QUEUE_URL']) {
    retVal.sqsKryiaQueueUrl = env['SQS_KRYIA_QUEUE_URL'];
  }
  if (env['AWS_END_POINT']) {
    retVal.awsEndPoint = env['AWS_END_POINT'];
  }

  return retVal;
}