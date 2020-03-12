#!/usr/bin/env sh

# abort on errors
set -e
sudo rm -rf dist
# build
npm run build

# navigate into the build output directory

cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git config user.name JCD09
git config user.email "mishachavaha@gmail.com"
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:JCD09/DEF_Applet.git master:gh-pages

cd -