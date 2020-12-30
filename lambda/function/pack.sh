#!/bin/bash

SED_EXTENDED_REGEXP_FLAG=-r
case $(uname)
in
    *BSD) SED_EXTENDED_REGEXP_FLAG=-r ;;
    Darwin) SED_EXTENDED_REGEXP_FLAG=-E ;;
esac

current=$(echo $0 | sed $SED_EXTENDED_REGEXP_FLAG "s/(.+)\/.+/\1/")

cd $current

rm -r ./function.zip
rm -r ./out

yarn install
yarn run build

mkdir ./out
mkdir ./out/cdk
mkdir ./out/cdk/stack

rm -rf ./node_modules && yarn install --production=true
cp ./cdk.json ./out
cp ./*.js ./out
cp ./cdk/*.js ./out/cdk
cp ./cdk/stack/*.js ./out/cdk/stack

cp -r ./node_modules ./out

zip -r ./out/function.zip ./* && mv ./out/function.zip ./function.zip