/*
  Extract data from config.js and return the pageNames to Bash
*/

import fs from 'fs'
import slugify from './slugify.mjs'
import readConfig from './readConfig.mjs'

readConfig(config => console.log(config.map(gallery => slugify(gallery.title)).join(' ')))