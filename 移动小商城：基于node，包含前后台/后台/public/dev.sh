#!/bin/bash

rm -rf build build.tgz
npm run build
tar czvf build.tgz build
