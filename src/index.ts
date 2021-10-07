import { App, Stack, RemovalPolicy } from '@aws-cdk/core';
import { Bucket, BlockPublicAccess } from '@aws-cdk/aws-s3'

const app = new App();
const stack = new Stack(app, 'issue-16603');

const bucket = new Bucket(stack, 'Issue16603TestBucket', {
  bucketName: 'issue-16603-test-bucket',
  blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
  removalPolicy: RemovalPolicy.RETAIN,
  autoDeleteObjects: false
});

// new BucketDeployment(stack, "DeployAssets", {
//   sources: [Source.asset("assets")],
//   destinationBucket: bucket,
//   retainOnDelete: true,
//   prune: false,
// });
