#!/bin/bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"                   # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # This loads nvm bash_completion

_remote="34.199.219.63"
_user="ubuntu"
_remote_directory_name="electrafy-prod"

echo "❗❗❗ ELECTRAFY Prod Frontend Deployment ❗❗❗"
echo "Local system name: $HOSTNAME"
echo "Local date and time: $(date)"

# Run npm to install the dependencies
nvm use 18

npm i

# Run run build
npm run build:prod

# Copy the .htaccess file to the build directory
cp ./.htaccess ./build/.htaccess

echo "❗❗❗ Sync started ❗❗❗"
# Rsync the build directory to the remote server
rsync -rtu --delete --progress "./build/" $_user@$_remote:/var/www/html/$_remote_directory_name
