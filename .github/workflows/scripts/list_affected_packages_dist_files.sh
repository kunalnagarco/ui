#!/bin/bash

ls -al packages/

for f in packages/**/*/kunalnagarco*.tgz
do 
  echo "\n$f\n"; tar tvf "$f"
done

