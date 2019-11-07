.PHONY: build_web run_dev

build_web:
	bash ./socioprophet-web/scripts/build_web.sh

run_dev:
	cd socioprophet-web/scripts && bash run_dev.sh
