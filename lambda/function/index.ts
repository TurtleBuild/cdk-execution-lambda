import { Result, deploy } from './cdk-stack-deployer';
type Event = {
  account: string;
  region: string;
  resources: string;
  detail: {
    callerUserArn: string;
    commitId: string;
    event: string;
    referenceFullName: string;
    referenceName: string;
    referenceType: string;
    repositoryId: string;
    repositoryName: string;
  };
};

export const handler = async (
  event: Event,
  context: { succeed: (a: string) => void; fail: (a: any) => void },
  callback: (a: any, b: any) => void
): Promise<void> => {
  const region = event.region;
  let result: Result;
  result = await deploy(region);

  if (result.status === 'SUCCESS') {
    context.succeed(result.message);
  } else if (result.status === 'FAILED') {
    context.fail(result.message);
  }
};
