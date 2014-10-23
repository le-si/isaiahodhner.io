
fs = require 'fs'
path = require 'path'
glob = require 'glob'

print = console.log
after = (ms, fn)-> setTimeout(fn, ms)
every = (ms, fn)-> setInterval(fn, ms)

tab = (str)->
	# Indent the output. Because I care.
	str.replace(/\n/g, '\n\t')

boil = ({title, head, body})->
	# Boilerplate and stuff.
	# A Template, really. But I like 'boiling', like I'm cooking webpages.
	# ...before serving them... yes...
	# I don't use any of that nasty phpreprocessed stuff.
	"""
		<!doctype html>
		<html lang="en-US">
			<head>
				<meta charset="utf-8">
				<title>#{title} — Isaiah Odhner</title>
				#{tab tab (head ? "")}
				<meta name="author" content="Isaiah Odhner">
				<meta name="description" content="Isaiah Odhner's portfolio website">
				<meta name="keywords" content="Isaiah Odhner, 1j0, 1j01">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<link rel="stylesheet" type="text/css" href="portfolio.css">
			</head>
			<body>
				<header>
					<b>Hi, my <span id="magic">name</span> is</b>
					<h1 id="name">Isaiah Odhner</h1>
					<b>and this is my portfolio</b>
					<nav>
						<a href="/" data-local="index.html">Home</a>
						<a href="/textures" data-local="textures.html">Textures</a>
						<a href="#!?/myfullnamehere@gmail.com">Contact</a>
					</nav>
				</header>
				#{tab tab body}
				<script src="portfolio.js"></script>
				<script src="global.js"></script>
			</body>
		</html>
	"""

task 'boil', 'Build the website, boiling the pages.', ->
	
	texture_images = (
		for fname in glob.sync 'images/textures/*.png'
			"""
				<article itemscope itemtype="http://schema.org/ImageObject">
					<img src="#{fname}" itemprop="contentURL">
				</article>
			"""
	).join '\n'
	
	fs.writeFileSync 'textures.html', boil
		title: 'Textures'
		body: """
			<p>
				These are some textures I made with code and a tool that I also made.
			</p>
			<div id="textures">
				#{tab texture_images}
			</div>
		"""
	
	projects =
		'tiamblia':
			name: 'Tiamblia'
			description: 'A notagame'
		'boxart':
			name: 'BoxArt'
			description: '3d interactive box art generator'
		'babble':
			name: 'Babble'
			description: 'Sentence generator and more'
		'multifiddle':
			name: 'MultiFiddle'
			description: 'Minimalistic multilingual live code fiddling environment'
		'jspaint':
			name: 'Paint'
			description: 'Good old mspaint, but with unlimited undos/redos'
		'IDE':
			name: 'MyDE'
			description: 'My custom development environment (currently defunct)'
			url: 'repo'
		'1bpp':
			name: 'One Bit Per Pixel'
			description: 'A notagame in pure B&W'
			url: 'repo'
		'mind-map':
			name: 'MindMap'
			description: 'Map your mind without ugly boxes'
		'guitar':
			name: 'Guitar'
			description: 'Easily play and record tabs'
		'mos':
			name: 'MOS'
			description: 'Monochrome Operating System'
		'choon.js':
			name: 'Choon.js'
			description: 'Choon language interpreter built with the Web Audio API'
		'pesterchum':
			name: 'PesterChum'
			description: 'MS Paint Adventures chat client'
			url: 'repo'
		'gif-maker':
			name: 'GIF Maker'
			description: 'Make animated GIF images'
		'une':
			name: 'UNE: The Complete Multitool'
			description: 'An incomplete unitool for a game called 5UNE17A'
		'pool':
			name: 'Jussom Billiards'
			description: 'Just playing around with physics'
		'pipes':
			name: 'Pipes'
			description: '3d pipes screensaver remake'
	
	fs.writeFileSync 'index.html', boil
		title: 'Portfolio'
		body: (
			for key, project of projects
				
				url =
					if project.url is 'repo'
						"http://github.com/1j01/#{key}"
					else
						project.url ? "http://1j01.github.io/#{key}/"
				
				"""
					<article itemscope itemtype="http://schema.org/WebPage">
						<a href="#{url}" itemprop="url">
							<header itemprop="name">#{project.name}</header>
							<img itemprop="image" width=256 height=256 src="images/projects/#{key}.png">
							<footer itemprop="description">#{project.description}</footer>
						</a>
					</article>
				"""
				
		).join '\n'


task 'optimages', 'Optimize all the images.', ->
	
	optimage = require 'optimage'
	
	glob '**/*.png', (err, files)->
		if err
			print err
		else
			do fn = (i = 0)->
				next = ->
					if i + 1 < files.length
						fn i + 1
				
				f = files[i]
				
				if f.match /node_modules/
					do next
				else
					optimage {
						inputFile: f
						outputFile: f
					}, (err, res)->
						
						if err
							print "#{f} ::: ERROR"
							print err
							print "\n"
						else
							if (res.stderr.indexOf 'already optimized') isnt -1 or res.saved < 10
								print "#{f} ::: already optimized"
							else
								print "#{f} ::: saved #{res.saved} bytes"
						
						do next

task 'e', 'Edit a tiled version of a texture in photoshop.', (options)->
	# haha this whole thing is so overkill
	
	cd = fs.realpathSync "."
	temp = "#{cd}/temp"
	try fs.mkdirSync temp
	
	gm = require 'gm'
	cp = require 'child_process'
	readline = require 'readline'
	optimage = require 'optimage'
	
	rl = readline.createInterface
		input: process.stdin
		output: process.stdout
	
	rl.setPrompt "> "
	rl.question "Please enter the filename (extension optional) of an image in 1j01.github.io/images/textures/", (f)->
		f = f.replace ".png", ""
		rl.close()
		
		PsDir = "C:/Program Files (x86)/Adobe/Adobe Photoshop CS2"
		Photoshop = "#{PsDir}/Photoshop.exe"
		ImageReady = "#{PsDir}/ImageReady.exe"
		
		originalFilePath = path.normalize "#{cd}/images/textures/#{f}.png"
		tiledFilePath = path.normalize "#{temp}/#{f}-tiled.png"
		newFilePath = path.normalize "#{cd}/images/textures/#{f}-psedit.png"
		
		print "Editing a tiled version of #{originalFilePath}"
		
		fs.exists originalFilePath, (exists)->
			if not exists
				print "ERROR: #{originalFilePath} does not exist."
			else
				
				img = gm()
				
				# Tile the texture (there might be an option (-tile) for this, but whatever: the documentation is terrible and this works)
				w = h = 512
				for x in [0...3]
					for y in [0...3]
						img.in '-page', "+#{x*w}+#{y*h}"
						img.in originalFilePath
				
				# Merge the images as a matrix
				img.mosaic()
				
				# Write the file
				img.write tiledFilePath, (err)->
					if err
						print """
						
						
						Is GraphicsMagic installed and in the path and computer restarted and stuff?
						You need the Q8 version btw.
						DSWYFT
						
						
						"""
						# Why do I have such detailed error handling in my portfolio website's Cakefile? idk
						# I don't remember what DSWYFT stands for. It's a TANSA. (a Thoughtless And Non-Standard Accronym)
						return console.error err
					
					# Sometimes gm calls back without having written a file, maybe this helps. Probably not.
					after 50, ->
						
						fs.chmod tiledFilePath, 0o777, (err)->
							if err
								print "chmod 777 ::: ERROR"
								return console.error err
							
							cp.spawn Photoshop, [tiledFilePath], cwd: (require 'path').dirname(tiledFilePath)
							
							fs.watch tiledFilePath, ->
								gm()
								.in(tiledFilePath)
								.crop(w, h, w, h) # (width, height, x, y)!? :(
								.write newFilePath, (err)->
									if err
										print "gm.write() error"
										return console.error err
									else
										# regenerate textures.html in case there's a new texture
										invoke 'boil'
										# optimize the new image
										optimage {
											inputFile: newFilePath
											outputFile: newFilePath
										}, (err, res)->
											
											if err
												print "Optimizing #{newFilePath} ::: ERROR"
												print err
												print "\n"
											else
												if (res.stderr.indexOf 'already optimized') isnt -1 # or res.saved < 10
													print "Optimizing #{newFilePath} ::: already optimized??"
												else
													print "Optimizing #{newFilePath} ::: saved #{res.saved} bytes"


task 'sbuild', '(invokes boil) Sublime build: run with Ctrl+B in project dir in Sublime Text', -> invoke 'boil'