#!/bin/bash

ls -al packages/**/*.tgz

for f in packages/**/*/*.tgz
do 
  echo "\n$f\n"; tar tvf "$f"
done

