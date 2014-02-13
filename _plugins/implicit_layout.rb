# By specifying an implicit layout here, you do not need to
# write, for example "layout: default" at the top of each of
# your posts and pages (i.e. in the "YAML Front Matter")
#
# Please note that you should only use this plugin if you
# plan to use the same layout for all your posts and pages.
# To use the plugin, just drop this file in _plugins, calling it
# _plugins/implicit-layout.rb, for example
IMPLICIT_LAYOUT = 'default'

module Jekyll
  module Convertible

    def read_yaml(base, name)
      self.content = File.read(File.join(base, name))

      begin
        if self.content =~ /\A(---\s*\n.*?\n?)^(---\s*$\n?)/m
          self.content = $POSTMATCH
          self.data = YAML.load($1) || {}
          self.data["layout"] ||= IMPLICIT_LAYOUT
        end
      rescue => e
        puts "YAML Exception reading #{name}: #{e.message}"
      end

      self.data ||= {}
    end

  end
end