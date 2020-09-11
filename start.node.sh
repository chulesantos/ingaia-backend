#!/bin/bash

docker run -d -it -v $(pwd):/var/www --name node-teste --network rede-local -p 8080:3000 -w /var/www node