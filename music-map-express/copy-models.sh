#!/bin/bash

#copies models from abckend into /tmp/
sudo docker cp backend:/usr/src/app/models /tmp/

#we installed docker through snap so they get placed here
sudo mv /tmp/snap-private-tmp/snap.docker/tmp/models .
sudo chown -R $(whoami):$(whoami) ./models
