# vim:ts=8:sw=8:noet

ROOT := public

JS_GEN_DIR := $(ROOT)/gen
JS_GEN_FILES := find $(JS_GEN_DIR) -name "*.js" -print | xargs

CSS_GEN_DIR := $(ROOT)/gen/css
CSS_GEN_FILES := find $(CSS_GEN_DIR) -name "*.css" -print | xargs

VERSION_FILE := build/version
VERSION_TEMPLATE := views/includes/version.jade

VERSIONNED_GEN_DIR := $(ROOT)/vgen
PATHS_FILE := views/includes/prod-require-paths.jade
RESSOURCE_MAPPING_FILE := build/ressource-mapping.json

REQUIREJS_OPTIMIZER := node ./node_modules/requirejs/bin/r.js

all: clean prod

prod: js-optimizing css-optimizing md5ize paths fixversion

js-optimizing:
	@echo 'Minifying and Packing JS files via r.js'
	$(REQUIREJS_OPTIMIZER) -o build/js-build-profile.js

css-optimizing:
	@echo 'Minifying CSS files via r.js'
	$(REQUIREJS_OPTIMIZER) -o build/css-build-profile.js

md5ize:
	@mkdir -p $(VERSIONNED_GEN_DIR)
	@rm -rf $(VERSIONNED_GEN_DIR)/*
	@echo '\c' > $(RESSOURCE_MAPPING_FILE)
	@./build/md5ize.rb `$(JS_GEN_FILES)` `$(CSS_GEN_FILES)`

paths:
	@echo 'add "paths" to requirejs config in $(PATHS_FILE) (only for page modules)'
	@echo '\c' > $(PATHS_FILE)
	@node build/build-require-paths.js

fixversion:
	@echo 'put prod version in html (on page change + on error, reload page)'
	@touch $(VERSION_FILE)
	@echo `date +%s` > $(VERSION_FILE)
	@echo 'script.' > $(VERSION_TEMPLATE)
	@echo "  IAC_VERSION='"`cat $(VERSION_FILE)`"'" >> $(VERSION_TEMPLATE)

clean:
	rm -rf public/gen public/vgen