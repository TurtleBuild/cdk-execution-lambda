import * as cdk from '@aws-cdk/core';
import { SampleCodecommitStack } from './stack/sample-codecommit-stack';

const app = new cdk.App();
new SampleCodecommitStack(app, 'SampleCodecommitStack');
