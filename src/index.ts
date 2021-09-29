import { App, Stack, Duration, RemovalPolicy } from '@aws-cdk/core';
import { Bucket, BlockPublicAccess } from '@aws-cdk/aws-s3'
import { BucketDeployment, Source } from '@aws-cdk/aws-s3-deployment';

const app = new App();
const stack = new Stack(app, 'issue-16658');

const bucket = new Bucket(stack, 'issue-16658-test-bucket', {
  bucketName: 'issue-16658-test-bucket',
  blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
  lifecycleRules: [{
    abortIncompleteMultipartUploadAfter: Duration.days(2),
    enabled: true,
    expiration: Duration.days(60),
    prefix: "logs/"
  }],
  removalPolicy: RemovalPolicy.RETAIN,
});

new BucketDeployment(stack, "deploySystem", {
  sources: [Source.asset("assets")],
  destinationBucket: bucket,
  retainOnDelete: true,
  prune: false,
});
