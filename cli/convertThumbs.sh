#! /usr/bin/env bash

sudo apt-get install imagemagick

rm -Rf light-thumbs/*
for file in img/thumbs/*.jpg
do
  convert $file -thumbnail "300x200!" -sampling-factor 4:2:0 -strip -quality 70 -interlace JPEG -colorspace sRGB "light-thumbs/$(basename $file)"
done