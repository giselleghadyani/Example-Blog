module.exports = (grunt) ->


	##--------------------------------------
	## Main Executable Build Tasks
	##--------------------------------------

	# Default
	@registerTask 'default', [
		'connect:main'
	]
