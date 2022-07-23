
echo "############## UPDATE GIT CREDENTIALS ##############"
sudo apt update
sudo apt install git -y
git config --global credential.helper cache



echo "############## SETUP DOCKER ##############"
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
sudo apt update
sudo apt install docker-ce -y
sudo usermod -aG docker ${USER}


echo "############## SETUP DOCKER-COMPOSE ##############"

sudo curl -L "https://github.com/docker/compose/releases/download/1.26.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version


echo "############## SETUP MAKE ##############"
sudo apt install make


echo "############## SWAP MEMORY ##############"
dd if=/dev/zero of=/swapf1 bs=4096 count=2097152
mkswap /swapf1
swapon /swapf1
sudo sh -c "echo '/swapf1 swap swap defaults 0 0' >> /etc/fstab"
free -m


# удаление swap пространства
#cat /proc/swaps
#sudo swapoff /swapf1
#sudo rm /swapf1






