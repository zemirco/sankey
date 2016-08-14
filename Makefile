
BIN = ./node_modules/.bin
BROWSERIFY = $(BIN)/browserify
STANDARD = $(BIN)/standard

all: standard example/bundle.js

.PHONY: standard
standard:
	$(STANDARD)

example/bundle.js: example/index.js
	$(BROWSERIFY) $< -o $@

.PHONY: clean
clean:
	rm -rf ./example/bundle.js
