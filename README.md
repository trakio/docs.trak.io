# trak.io official documentation

## Installation
1. Fork this repo
2. Clone your fork
3. Once cloned, execute `bundle install` to install required dependencies.

## Make Tasks

### `make build`
`make build` compiles the file into static HTML.

### `make server`
`make server` runs a server which serves the static HTML in `_site`. It's used when
developing the documentation locally.

### `make watch`
`make watch` continuously builds the documentation, watching the files for changes.
It's handy when developing, as you don't have to keep executing `make build`

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
