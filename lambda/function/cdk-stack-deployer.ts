import * as childProcess from 'child_process';

const SUCCESS_STATUS = 'SUCCESS';
const FAILED_STATUS = 'FAILED';

interface CdkParam {
  id: string;
  awsRegion: string;
  command: string;
  additionalCommandParam: string;
}

export interface Result {
  status: string;
  message: string;
}

export async function deploy(region: string): Promise<Result> {
  const id = 'SampleCodecommitStack'
  const result: Result = { status: '', message: '' };

  console.log(`Deploy stack ${id}`);
  console.log(id);

  let res = '';
  try {
    res = deployCDK({
      id: id,
      awsRegion: region,
      command: 'deploy',
      additionalCommandParam: '',
    });
  } catch (e) {
    if (e instanceof Error) {
      deployFailed(`Failed to deploy CDK ${e.toString()}`, id);
    }
  }
  console.log(res);

  // CDK deploy finished/failed
  if (isResultReturnCloudformationArn(res, region)) {
    const stackName = res.split('/')[1];
    console.log(`Deploy succeeded, stack name - ${stackName}`);
    result.status = SUCCESS_STATUS;
    result.message = deploySucceeded(id);
  } else {
    console.log('Deploy failed - return result is not stack arn');
    result.status = FAILED_STATUS;
    result.message = deployFailed(res, id);
  }
  console.log('Deploy returned');

  return result;
}

function deployCDK(params: CdkParam): string {
  console.log(`Stack request for: ${params.id}`);
  console.log('Request started');

  // Set process.env.HOME Lambda default HOME is /home/usrXXX.
  const cmd = `
  export HOME='/tmp'
  ID_ENV='${params.id}' /opt/nodejs/node_modules/aws-cdk/bin/cdk ${params.command} -v ${params.additionalCommandParam}
  `;

  console.log(cmd);

  return childProcess.execSync(cmd).toString();
}

function isResultReturnCloudformationArn(res: string, region: string) {
  const regex = new RegExp(
    '^arn:aws:cloudformation:' + region + ':.+:stack\\/.*\\/.*',
    'gi'
  );
  return regex.test(res);
}

function deploySucceeded(id: string): string {
  const msg = `Deploy succeed. Id ${id}`;
  console.log(msg);
  return msg;
}

function deployFailed(res: string, id: string): string {
  const msg = `Deploy deployFailed. Id ${id}, Reason: ${res}`;
  console.log(msg);
  return msg;
}
