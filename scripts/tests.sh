#!/bin/bash
npm run start & 
npm run test
kill $(jobs -p)