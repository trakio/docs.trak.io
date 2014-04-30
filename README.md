# trak.io official documentation

The source to the docs.trak.io site. If you feel like you can improve on what we have writen go ahead and fork and create a pull request.

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/trakio/docs.trak.io/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

## Installation
1. Fork this repo
2. Clone your fork
3. Once cloned, execute `bundle install` to install required dependencies.

## Make Tasks

### Build
`make build` compiles the files into static HTML.

### Server
`make server` runs a server which serves the static HTML in `_site`. It's used when
developing the documentation locally.

### Watch
`make watch` continuously builds the documentation, watching the files for changes.
It's handy when developing, as you don't have to keep executing `make build`.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
