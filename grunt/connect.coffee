module.exports = (grunt) ->


	##--------------------------------------
	## Clean
	##--------------------------------------

	@config 'connect',
		options:
			debug: true
			keepalive: true
			hostname: 'lol.blog.com'
			port: 80
			base: 'web/'

		main: {}

	@loadNpmTasks 'grunt-contrib-connect'
