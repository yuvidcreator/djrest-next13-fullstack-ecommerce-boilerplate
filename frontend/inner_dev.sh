#! /bin/bash
set -e

# git pull origin main

# check files & folder permissions
sudo chown -cR $USER:$USER .
sudo chown -cR $USER:$USER .*


# delete previous pm2 instances
# pm2 delete all


# Activate the virtualenv for this project
yarn deploy:dev


# Copy .next folder to /var/www public directory
cp -r .next/ /var/www/osty/osty_dev_nextapp/

# sudo service supervisor restart
sudo service nginx restart

