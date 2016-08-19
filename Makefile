
BIN = node_modules/.bin
STANDARD = $(BIN)/standard

.PHONY: standard
standard:
	$(STANDARD)

.PHONY: watch
watch:
	$(BIN)/watchify docs/index.js -o docs/bundle.js --debug --verbose

.PHONY: serve
serve:
	cd docs && python -m SimpleHTTPServer 3000
