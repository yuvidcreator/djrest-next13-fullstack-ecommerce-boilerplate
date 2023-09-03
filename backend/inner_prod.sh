#! /bin/bash
set -e

# git pull origin main

# Activate the virtualenv for this project
source ../innerkomprod_env/bin/activate

pip install -r requirements.txt
# sudo mkdir -pv /var/log/gausrushti/
sudo mkdir -pv ./staticfiles
sudo mkdir -pv /var/www/innerkomfort/innerkomfort_prod_api/staticfiles
# sudo mkdir -pv ./innerkomfort/innerkomfort_prod_api/react_build

# cd ./client
# yarn install
# yarn global add serve
# yarn build
# sudo cp -r ./build /var/www/innerkomfort/innerkomfort_prod_api/react_build
# cd ..

sudo chown -cR $USER:$USER /var/www/innerkomfort/innerkomfort_prod_api
# sudo chown -cR $USER:$USER /var/www/innerkomfort/innerkomfort_prod_api/react_build
# sudo chown -cR $USER:$USER /var/www/innerkomfort/innerkomfort_prod_api/next_build
sudo chown -cR $USER:$USER /var/www/innerkomfort/innerkomfort_prod_api/staticfiles
sudo chown -cR $USER:$USER /var/www/innerkomfort/innerkomfort_prod_api/mediafiles
sudo chown -cR $USER:$USER .
sudo chown -cR $USER:$USER .*

# Start gunicorn going
python manage.py collectstatic --noinput
# python3 manage.py makemigrations --noinput
# python3 manage.py migrate --noinput

sudo service supervisor restart
sudo service nginx restart

