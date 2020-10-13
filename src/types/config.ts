export type Config = {
  articleRoot?: string;
  port?: number;
  awsSqsRegion?: string;
  awsSqsAccessKey?: string;
  awsSqsSecretAccessKey?: string;
  awsBucketInputEventQueueUrl?: string;
  awsEndPoint?: string;
};
