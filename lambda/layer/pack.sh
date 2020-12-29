#!/bin/bash

SED_EXTENDED_REGEXP_FLAG=-r
case $(uname)
in
    *BSD) SED_EXTENDED_REGEXP_FLAG=-r ;;
    Darwin) SED_EXTENDED_REGEXP_FLAG=-E ;;
esac

echo $SED_EXTENDED_REGEXP_FLAG

current=$(echo $0 | sed $SED_EXTENDED_REGEXP_FLAG "s/(.+)\/.+/\1/")

cd $current
# lambda layer should be in a /nodejs/node_modules folder
rm -r ./nodejs
yarn install
mkdir ./nodejs
# remove aws-sdk as it's size is 50mb and it is available in Lambda anyway
rm -r ./node_modules/aws-sdk
cp -r ./node_modules ./nodejs
# zip lambda layer
zip -9 -FS -r ./layer.zip ./nodejs

# note that the maximum size of the a lambda and all its layers is 250mb