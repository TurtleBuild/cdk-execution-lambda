import { Construct, StackProps, Stack } from '@aws-cdk/core';
import * as codecommit from '@aws-cdk/aws-codecommit';

export class SampleCodecommitStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // CodeCommit
    const repository = new codecommit.Repository(this, 'sample-repository', {
      repositoryName: 'sample-repository',
    });
  }
}
