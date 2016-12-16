git_version = $$(git branch 2>/dev/null | sed -e '/^[^*]/d'-e's/* \(.*\)/\1/')
npm_bin= $$(npm bin)

all: test
install:
	@npm install
test:
	@echo ""
	@echo "make test-ios             Test sample for iOS"
	@echo "make test-android         Test sample for Android"
	@echo "make custom-reporter      Test sample for PC with custom reporter"
test-ios: install
	macaca doctor
	platform=ios macaca run --verbose -d ./macaca-test/mobile-app-sample.test.js
test-android: install
	macaca doctor
	platform=android macaca run --verbose -d ./macaca-test/mobile-app-sample.test.js
travis-android: install
	npm install macaca-android --save-dev
	${npm_bin}/macaca doctor
	platform=android ${npm_bin}/macaca run --verbose -d ./macaca-test/mobile-app-sample.test.js
travis-ios: install
	npm install macaca-ios --save-dev
	${npm_bin}/macaca doctor
	platform=ios ${npm_bin}/macaca run --verbose -d ./macaca-test/mobile-app-sample.test.js
jshint:
	@${npm_bin}/jshint .
.PHONY: test
