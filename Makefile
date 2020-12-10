.PHONY: build_web run_server run_client build_client

build_web:
	cd socioprophet-web/scripts/ && bash build_web.sh

run_server:
	cd socioprophet-web/scripts && bash start_mongod.sh && bash run_server.sh

run_client:
	cd socioprophet-web/scripts && bash run_client.sh

build_client:
	cd socioprophet-web/scripts && bash build_client.sh