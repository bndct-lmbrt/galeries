#! /usr/bin/env bash

sudo apt-get install libimage-exiftool-perl
sudo apt-get install imagemagick

exiftool -ver

if [[ "$TRAVIS_COMMIT_MESSAGE" == "Travis: Add galleries" ]]
then
  exit 0
fi

git checkout master
node --experimental-modules --no-warnings cli/composeDB.mjs
git add data.json
git commit -m "Update data.json"
./cli/convertThumbs.sh
git add light-thumbs
git commit -m "Optimize thumbs"
node --experimental-modules --no-warnings cli/composeHome.mjs
git add index.html
git commit -m "Compose index.html"
node --experimental-modules --no-warnings cli/composeSitemap.mjs
git add sitemap.xml
git commit -m "Compose sitemap.xml"
rm -Rf galleries
mkdir galleries
./cli/composeSearch.sh
git add galleries/index.html
git commit -m "Compose search page"
node --experimental-modules --no-warnings cli/composeGalleries.mjs
git add galleries 
git commit -m "Add galleries"

git push https://$token@github.com/olivier-colli/olifish-tofs.git
