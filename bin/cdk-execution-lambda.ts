#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { CdkExecutionLambdaStack } from '../lib/cdk-execution-lambda-stack';
import * as childProcess from 'child_process';
import * as path from 'path';

prepareLambdaModules(['..', 'lambda', 'layer', 'pack.sh']);
prepareLambdaModules(['..', 'lambda', 'function', 'pack.sh']);

const app = new cdk.App();
new CdkExecutionLambdaStack(app, 'CdkExecutionLambdaStack');

function prepareLambdaModules(paths: string[]): string {
    const distDir = path.join(__dirname, ...paths);
    console.log(distDir);
    childProcess.execSync(`bash ${distDir}`);
    return distDir;
}