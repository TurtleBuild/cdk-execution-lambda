# CDK Execution Lambda
## Overview
CDK stack of the lambda function that executes the cdk command

![cdk-execution-lambda](https://user-images.githubusercontent.com/61332083/103284495-b8830280-4a1e-11eb-8a50-c2ed8eedbee4.png)

## Directory
```
cdk-execution-lambda
├── lib                             CDK(Lambda function & layer)
└── lambda
     ├── function
     │    ├── cdk                   CDK(CodeCommit)
     │    ├── index.ts              Lambda function
     │    └── cdk-stack-deployer.ts Lambda function
     └── layer                      Lambda layer
```

## Procedure
build & deploy
```
$ npm run build
$ cdk deploy
```
Lambda test event settings
```
{
    "region": "ap-northeast-1"
}
```
