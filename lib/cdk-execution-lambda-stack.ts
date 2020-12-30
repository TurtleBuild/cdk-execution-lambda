import { Construct, StackProps, Stack, Duration } from '@aws-cdk/core';
import {
  Code,
  Function as LambdaFunc,
  LayerVersion,
  Runtime,
} from '@aws-cdk/aws-lambda';
import { Asset } from '@aws-cdk/aws-s3-assets';
import * as path from 'path';
import * as iam from '@aws-cdk/aws-iam';

export class CdkExecutionLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Upload Lambda Layer Source to S3
    const layerAsset = new Asset(this, '/layerAsset', {
      path: path.join(__dirname, '..', 'lambda', 'layer', 'layer.zip'),
    });
    // Upload Lambda Source to S3
    const functionAsset = new Asset(this, '/lambdaAsset', {
      path: path.join(__dirname, '..', 'lambda', 'function', 'function.zip'),
    });

    // Lambda Layer
    const lambdaLayer = new LayerVersion(this, '/layer', {
      compatibleRuntimes: [Runtime.NODEJS_12_X],
      code: Code.fromBucket(layerAsset.bucket, layerAsset.s3ObjectKey),
    });

    // Lambda Role
    const lambdaRole = new iam.Role(this, 'cdkExecutionLambda/lambdaRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'),
      ],
    });

    // Lambda Function
    const lambdaFunction = new LambdaFunc(this, '/lambda', {
      runtime: Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: Code.fromBucket(functionAsset.bucket, functionAsset.s3ObjectKey),
      layers: [lambdaLayer],
      role: lambdaRole,
      timeout: Duration.minutes(5),
      memorySize: 256,
    });
  }
}
