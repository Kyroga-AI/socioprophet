.PHONY: build_web run_dev

build_web:
	cd socioprophet-web/scripts/ && bash build_web.sh

run_server:
	cd socioprophet-web/scripts && bash start_mongod.sh && bash run_server.sh

run_client:
	cd socioprophet-web/scripts && bash run_client.sh
