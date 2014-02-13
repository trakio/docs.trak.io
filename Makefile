build:
	bundle exec jekyll --no-server

watch:
	bundle exec guard

server:
	bundle exec jekyll --server 4001

deploy: build
	jekyll-s3