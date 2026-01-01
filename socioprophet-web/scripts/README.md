# Scripts

## Purpose
Helper scripts invoked by the root `Makefile` to install dependencies and run the client/server together.

## Scripts
- `install_web.sh`
  - Installs dependencies in `client/` and `server/` sequentially.
  - Uses Yarn in each directory.
- `run_web.sh`
  - Starts the server (`yarn run dev`) in the background.
  - Starts the client (`yarn run start`) in the foreground.

## Notes
- These scripts assume they are executed from within `socioprophet-web/scripts` (as the Makefile does).
- If you change client or server script names, update these files and the Makefile accordingly.
