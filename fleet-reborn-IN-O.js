const version = `Independent integration V1`

try
{
	Config = require('./config.json')
}
catch (e)
{
	console.log('\Kuro encountered an error while trying to load the config file, please resolve this issue and restart Fleet\n\n' + e.message)
	process.exit()
}
var drive = "C"
if(Config.bot.dir)
{
	drive = Config.bot.dir
}

const botmain = require("discordie"),
	logchannel = "899906158050025483",
	botowner = "201983882625548299",
	hungermaster = ["148914844190507018", botowner];
const axios = require('axios'); //better HTML request.
const sharp = require('sharp'); //Image processing.
const Path = require('path');
var fs = require("fs"),
	servers = [],
	started = Date.now(),
	XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest,
	Http = new XMLHttpRequest,
	Commands = [],
	Event = botmain.Events,
	unirest = require("unirest"),
	game = {
		type: 1,
		name: "Smoll",
		url: ".,;,;,."
	};

const protocord = require('discord.js');
const client = new protocord.Client();

strg = fs.readFileSync(drive+":/resources/variables/storage");
var strg = JSON.parse(strg),
	potion = strg.potion.effects,
	speed = strg.voreroulette.speeds,
	nom = strg.voreroulette.noms,
	nom2 = strg.voreroulette.noms2,
	actionsing = strg.voreroulette.actions,
	animal = strg.voreroulette.animals;
	
console.log(started)
bot = new botmain(
{
	messageCacheLimit: 9999,
	autoReconnect: true,
});
client.login(Config.bot.token)
bot.connect(
{
	token: Config.bot.token
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

bot.isFirstConnect = 1
bot.Dispatcher.on("GATEWAY_READY", e =>
{
	
	
	console.log("Connected as: " + bot.User.username);
	bot.User.setStatus("online", game)
	console.log(bot.User)
	bot.Channels.get(logchannel).sendMessage("Systems online. Version: " + version+"\nBoot Code: "+bot.isFirstConnect+"\n"+"Connected to: "+ servers + " Servers")
	var namedservers=[];
	for (i = 0; i < bot.Guilds.toArray().length; i++)
	{
		if(!servers.includes(bot.Guilds.toArray()[i].id)) {servers.push(bot.Guilds.toArray()[i].id);namedservers.push(bot.Guilds.toArray()[i].name)}
	}
	bot.Channels.get(logchannel).sendMessage(namedservers.join(" | "))
	console.log("Connected to:", servers)
	bot.isFirstConnect = 0
});
bot.Dispatcher.on("DISCONNECTED", e =>
{
	return console.log("Connection lost", console.log(servers))
});


function CM(channel, message)
{
	bot.Channels.get(channel).sendMessage(message)
}

bot.log = CM;bot.dm = protoDM;

bot.Dispatcher.on("MESSAGE_CREATE", e =>
{
	var antiecho;
	var guild;
	var msg;
	if (e.message.guild)
	{
		guild = e.message.guild.name
	}
	if (e.message)
	{
		msg = e.message
	}
	if (msg.author == "311682437728043009")
	{
		return
	}
	//console.log(e.message.author.username + " | " + e.message.content + " | " + guild)
	//Fleet Legacy Handling
	levelone = []
	leveltwo = []
	levelthree = []
	if (msg.content.split("")[0] == "-")
	{
		console.log("Before Manipulation"+e.message.author.username + " | " + e.message.content + " | " + guild)
		suffix = msg.content.split(" ")
		trigger = suffix[0].replace("-", "")
		suffix = suffix.join(" ")
		suffix = suffix.replace("-"+trigger, "").replace(" ","")
		console.log("Suffix: "+suffix)
		execute = Commands.filter(e => e.name == trigger.toLowerCase())
		if (execute.length < 1)
		{
			CommandsWithAliases = Commands.filter(e => e.aliases) //Ignore commands without aliases
			execute = CommandsWithAliases.filter(e => e.aliases.includes(trigger.toLowerCase()))
		}
		if (execute.length > 1) {CM(logchannel,"Duplicate commands found:\n"+msg.content)}
		if (execute.length > 0)
		{
			if (execute[0].permFlag)
			{flags = hasPerm(msg.guild.id, msg.author.id)
				if(flags[0]) {}
			 	else if(flags[execute[0].permFlag])
				{}else {return msg.reply("Necesary Flag not present, Flag needed: " +execute[0].permFlag+ "\nFor reference of Flag ids use _hasPerms")}
			}
			if (execute[0].noDM && !msg.guild)
			{
				return msg.reply("This Command can not be executed in DMs")
			}
			if (execute[0].level == "master" && msg.author.id != botowner)
			{
				return
			}
			else if (execute[0].level > 0 && msg.author.id != botowner || execute[0].permFlag)
			{
				switch (execute[0].level)
				{
					case 3:
						if (levelthree.includes(msg.author.id))
							break;
					case 2:
						if (leveltwo.includes(msg.author.id) || levelthree.includes(msg.author.id))
							break;
					case 1:
						if (levelone.includes(msg.author.id) || leveltwo.includes(msg.author.id) || levelthree.includes(msg.author.id))
							break;
					default:
						return msg.reply("You do not have the needed level " + execute[0].level);
				}
			}
			//console.log(suffix)
			try
			{
				execute[0].fn(msg, suffix, bot, client)
			}
			catch (err)
			{
				CM(logchannel, err)
			}
			antiecho = 1;
		}
	}
	//Fleet core -
	if (msg.content.split("")[0] == "-" && !antiecho)
	{
		//console.log(e.message.author.username + " | " + e.message.content + " | " + guild)
		suffix = msg.content.split(" ")
		trigger = suffix[0].replace("-", "")
		suffix = suffix.join(" ").replace("-" + trigger + " ", "")
		commands(msg, suffix, trigger)
	}
	//hungergame core
	if (hungermaster.includes(msg.author.id && !antiecho))
	{
		if (msg.content.includes("-hunger2 "))
		{
			//console.log(e.message.author.username + " | " + e.message.content + " | " + guild)
			var suffix = msg.content.replace("-hunger2 ", "")
			var t0 = Date.now()
			suffix || (suffix = 24), msg.channel.sendMessage("Dinner time~").then(function(e)
			{
				var s = e.id;
				gamemaster = msg.author.username + "#" + msg.author.discriminator, e.edit("Started by: " + gamemaster), e.content = "Started by: " + gamemaster, setTimeout(function()
				{
					! function e(s, t, r = [], a = [])
					{
						ourmessages = bot.Messages.forChannel(msg.channel.id);
						ourmessages = ourmessages.filter(e => e.id > t);
						ourmessages = ourmessages.filter(e => e.content.toLowerCase().includes("here"));
						for (i = 0; i < ourmessages.length && r.length != suffix; i++) r.includes(ourmessages[i].author.id) || (r.push(ourmessages[i].author.id), a.push(ourmessages[i].author.username + "#" + ourmessages[i].author.discriminator + "\n" + ourmessages[i].content)), ourmessages.length - 1 == i && (t = ourmessages[i].id), ourmessages[i].delete();
						var t1 = Date.now(),
							passed = Math.trunc((t1 - t0) / 1e3 / 60 * 100) / 100 + " minutes";
						s.edit("**Started by:** `" + msg.author.username + "#" + msg.author.discriminator + "` `" + passed + "`\n " + a.join("\n\n") + "");
						if (r.length == suffix) return msg.channel.sendMessage("All slots filled!");
						setTimeout(function()
						{
							e(s, t, r, a)
						}, 3e3)
					}(e, s)
				}, 1e3)
			})
		}
	}
	//fleet core
	if (msg.content.includes("fleet") && !antiecho)
	{
		//console.log(e.message.author.username + " | " + e.message.content + " | " + guild)
		//bot owner commands
		if (msg.author.id == botowner)
		{
			if (msg.content.includes("ping"))
			{
				msg.channel.sendMessage("pong")
			}
			if (msg.content.includes("fleet say"))
			{
				CM(msg.channel.id, msg.content.replace('fleet say', '').replace("nodel", ""))
				if (!msg.content.includes("nodel"))
				{
					msg.delete()
				}
			}
		}
	}
});

function commands(msg, suffix, trigger)
{
	switch (trigger)
	{
		case "ping":
			return msg.channel.sendMessage("pong")
		case "swordshield":
			function release()
			{
				var e = "15-11-2019",
					t = (e = e.split("-"))[1] + "," + e[0] + "," + e[2];
				t = new Date(t).getTime(), X = Date.now(), X = t - X;
				var a = " ms";
				if (X<0) {return msg.reply("your soul has been succesfully sold!")}
				return X /= 6e4, a = " minutes", X = Math.trunc(X), X > 60 && (X = Math.trunc(X / 60), a = " hours", X > 24 && (X = Math.trunc(X / 24), a = " days")), X + a
			}
			return msg.channel.sendMessage(release())
		case "vore":
			if(!msg.guild) {return msg.reply("*With no one around to save you the bot simply pins you beneath its gut, getting comfy as it saves you for later~*")}
			return vore(msg, suffix, bot)
		default:
			break;
	}
}
bot.Dispatcher.on("MESSAGE_DELETE", (e) =>
{
	if (!e.message)
	{
		return
	}
	if (!e.message.guild)
	{
		return
	}
	var server = e.message.guild.name
	if (!e.message.content)
	{
		var content = ""
	}
	else
	{
		var content = e.message.content
	}
	var member = e.message.author
	var unirest = require('unirest')
	var hookavatar = e.message.author.avatarURL
	let username = member.username
	let userid = member.id
	var hash = member.discriminator
	var hookname = username + "#" + hash
	var qualitycontent = content.split("")
	if (!e.message.attachments[0])
	{
		var img = ""
	}
	else
	{
		var img = e.message.attachments[0].proxy_url
	}
	if (qualitycontent[0] == "-")
	{
		return
	}
	
	//console.log(server)
	if (server == "Ourpoke")
	{
		var hookurl = Config.webhooks.ourpokelog
		unirest.post(hookurl)
			.header('Content-Type', 'application/json').send(
			{
				"avatar_url": "" + hookavatar + "",
				"username": "" + hookname + "",
				"content": "UID:`" + userid + "` Message ID: `" + e.messageId + "` in <#" + e.channelId + ">\n```" + content + "```\n" + img + ""
			}).end()
		return
	}
	//console.log("ignored deletion")
})

function relaymedaddy(message)
{
	var me = "201983882625548299";
	bot.Users.get(me).openDM()
		.then(function(x)
		{
			x.sendMessage(message)
			return x.close()
		})
}

function protoDM(ID, MESSAGE, bot)
{
	bot.Users.get(ID).openDM() //opens the dm
		.then(function(x)
		{ //passes the info of the opened DM into x
			x.sendMessage(MESSAGE) //sends a message to x
			x.close() //closes the DM
		})
		.catch(function(error)
		{
			// handle error
			protoDM('201983882625548299', error)
		})
}

bot.Dispatcher.on("MESSAGE_CREATE", (e) =>
{
	if (!e.message)
	{
		return
	}
	if (!e.message.guild)
	{
		return
	}
	var server = e.message.guild.name
	var msg = e.message
})

function cry(a, b)
{
	var x = 0
	while (x != a.length)
	{
		if (a[x].name == b)
		{
			return x
		}
		x++
	}
}


function pokelookup(suffix, msg, dir)
{
	pokeValidate(suffix[0])
	path = suffix[0] + "/" + suffix[1] //changed to hard coding suff 1 and 0 to accomedate langaugee suffix 2
	console.log(path)
	if (suffix[2]) console.log("Language selection: " + suffix[2])
	else console.log("No language token defaulting to english")
	const READYSTATE = 4
	const Http = new XMLHttpRequest();
	const url = `https://pokeapi.co/api/v2/${path}`;
	y = []
	var x;
	Http.open("GET", url);
	Http.setRequestHeader(`Authorization`, `The big gay`)
	Http.send();
	Http.onreadystatechange = (e) =>
	{
		if (Http.readyState == READYSTATE)
		{
			if (Http.responseText == 'Not Found')
			{
				fs.writeFile(dir + path, Http.responseText, function(err)
				{
					if (err)
					{
						return console.log(err);
					}
					console.log(path + " has been logged");
				})
				return msg.channel.sendMessage("Not Found")
			}
			x = JSON.parse(Http.responseText)
			fs.writeFile(dir + path, Http.responseText, function(err)
			{
				if (err)
				{
					return console.log(err);
				}
				console.log(path + " has been logged");
			})
			if (typeof pokeparse(suffix, x) == 'object')
			{
				msg.channel.sendMessage("", false,
				{
					color: 0x3498db,
					image:
					{
						url: x.sprites.front_shiny
					},
					thumbnail:
					{
						url: x.sprites.front_default
					},
					fields: pokeparse(suffix, x)
				})
			}
			else
			{
				msg.channel.sendMessage(pokeparse(suffix, x, msg))
			}
		}
	}
}

function fieldmaker(name, value)
{
	return {
		name: name,
		value: value
	}
}

function pokeparse(suffix, x, msg)
{
	var result = [];
	switch (suffix[0])
	{
		case "pokemon-species":
			entries = x.flavor_text_entries
			//console.log(entries)
			if (suffix[2])
			{
				entries = entries.filter(d => d.language.name == suffix[2])
			}
			else
			{
				entries = entries.filter(d => d.language.name == 'en')
			}
			if (entries.length <= 0)
			{
				return "No entries found for given language token " + suffix[2]
			}
			entry = randomIntFromInterval(0, entries.length - 1)
			return (entries[entry].flavor_text)
		case "pokemon":
			var spriteobj = x.sprites;
			var sprites = []
			sprites.push(spriteobj.back_default);
			sprites.push(spriteobj.back_female)
			sprites.push(spriteobj.back_shiny);
			sprites.push(spriteobj.front_default)
			sprites.push(spriteobj.front_female);
			sprites.push(spriteobj.front_shiny)
			var normal = sprites[3];
			var shiny = sprites[5]
			typings = x.types;
			var typing;
			if (typings[0])
			{
				typing = typings[0].type.name
			};
			if (typings[1])
			{
				typing = typing + " " + typings[1].type.name
			}
			result.push(fieldmaker('**Pokedex ID:** ' + x.id, '**name:** ' + x.species.name))
			//result.push(fieldmaker())
			result.push(fieldmaker("**type:** " + typing, '**weight:** ' + x.weight / 10 + " kg"))
			//result.push(fieldmaker())
			if (x.height <= 9)
			{
				result.push(fieldmaker('**height:** ' + x.height * 10 + " cm", "_ _"))
			}
			else
				result.push(fieldmaker('**height:** ' + x.height / 10 + " m", "_ _"))
			//result.push(fieldmaker("**sprites:**" ,normal+" "+shiny))
			//console.log(result)
			//var suffix = ["pokemon-species",suffix[1] ]
			//var dir = drive+":/resources/"
			//if(msg) {pokelookup(suffix,msg,dir)}
			//console.log(msg)
			return result
		case "item":
			result.push(x.name)
			result.push(x.effect_entries[0].effect.split("\n").join(" "))
			return (result.join("\n"))
		case "type":
			var take2dmg = [];
			var give2dmg = [];
			var takehalfdmg = [];
			var givehalfdmg = [];
			var takenodmg = [];
			var givenodmg = [];
			dmgcalc = x.damage_relations
			takedoubledmgcalc = dmgcalc.double_damage_from;
			dmgcalcname(takedoubledmgcalc, take2dmg);
			givedoubledmgcalc = dmgcalc.double_damage_to;
			dmgcalcname(givedoubledmgcalc, give2dmg);
			takehalfdmgcalc = dmgcalc.half_damage_from;
			dmgcalcname(takehalfdmgcalc, takehalfdmg)
			givehalfdmgcalc = dmgcalc.half_damage_to;
			dmgcalcname(givehalfdmgcalc, givehalfdmg)
			takenodmgcalc = dmgcalc.no_damage_from;
			dmgcalcname(takenodmgcalc, takenodmg)
			givenodmgcalc = dmgcalc.no_damage_to;
			dmgcalcname(givenodmgcalc, givenodmg)
			typeinfo = "```CSS\n[" + suffix[1] + "]"
			if (take2dmg.length > 0)
			{
				typeinfo += "\nTakes 200% from:\n" + take2dmg.join(", ")
			}
			if (takehalfdmg.length > 0)
			{
				typeinfo += "\nTakes 50% from:\n" + takehalfdmg.join(", ")
			}
			if (takenodmg.length > 0)
			{
				typeinfo += "\nTakes none from:\n" + takenodmg.join(", ")
			}
			if (givenodmg.length > 0)
			{
				typeinfo += "\nDeals none to:\n" + givenodmg.join(", ")
			}
			if (givehalfdmg.length > 0)
			{
				typeinfo += "\nDeals 50% to:\n" + givehalfdmg.join(", ")
			}
			if (give2dmg.length > 0)
			{
				typeinfo += "\nDeals 200% to:\n" + give2dmg.join(", ")
			}
			typeinfo += "\n\nPokemon with this type: " + x.pokemon.length
			typeinfo += "\n\nMoves with this type: " + x.moves.length
			typeinfo += "\n```"
			return (typeinfo)
		case "ability":
			entries = x.flavor_text_entries
			//console.log(entries)
			if (suffix[2])
			{
				entries = entries.filter(d => d.language.name == suffix[2])
			}
			else
			{
				entries = entries.filter(d => d.language.name == 'en')
			}
			if (entries.length <= 0)
			{
				return "No entries found for given language token " + suffix[2]
			}
			entry = randomIntFromInterval(0, entries.length - 1)
			return (entries[entry].flavor_text)
		case "move":
			moveinfo = "Name: " + x.name + "\n";
			if (x.accuracy)
			{
				moveinfo += "Accuracy: " + x.accuracy + "\n";
			}
			if (x.power)
			{
				moveinfo += "Power: " + x.power + "\n";
			}
			moveinfo += "PP: " + x.pp + "\n";
			moveinfo += "Type: " + x.type.name + "\n";
			moveinfo += "Class: " + x.damage_class.name + "\n";
			moveinfo += "Effect: " + x.effect_entries[0].short_effect + "\n";
			return (moveinfo)
			//and so on
		default:
			return ('Case undefined.')
	}
}

function pokeValidate(string)
{
	switch (string)
	{
		case "pokemon":
		case "ability":
		case "type":
		case "move":
		case "item":
		case "pokemon-species":
			break;
		default:
			suffix = "error";
			return suffix
	}
}

function dmgcalcname(array, output)
{
	for (i = 0; i < array.length; i++)
	{
		output.push("#" + array[i].name)
	}
}

function randomIntFromInterval(min, max)
{
	return Math.floor(Math.random() * (max - min + 1) + min)
}

function vore(msg, suffix, bot)
{
	msg.channel.sendMessage("Dinner time~")
		.then(function(value)
		{ //value.edit
			var gameid = value.id
			timeout = 5 * 1000
			mode = 0
			modes = [0, 1, 2, 3] //0 = firstrun (devour), 1 = sloshing (progress), 2 = succumb (end),3= escape
			var VORGANS = drive+":/resources/VORE/organs"
			if (fs.existsSync(VORGANS))
			{
				organs = JSON.parse(fs.readFileSync(VORGANS))
			}
			/*organs = 
			[
			  {name:"maw",damage:1,trapto:"throat",escapeto:"freedom",
			  messages:[
			    {key:0,message:"\n *the bot leans down and swiftly chomps you up in its jaws.*"},
			    {key:1,message:"\n *you get sloshed around inside the bots maw as it plays with you. Soaking you in saliva.*"},
			    {key:2,message:"\n *as you ran out of stamina the bot used its tongue to press you against its gullet. Your head slipping in and getting pulled down as you got swallowed. A long trip down the gullet later you splashed into its stomach, defeated.*"},
			    {key:0,message:"\n *The bot swiftly snatches you up in its hand dangling you over its jaws before dropping you in.*"},
			    {key:1,message:"\n *you were suckled on and tossed about within the bots maw.*"},
			    {key:2,message:"\n *as you feel your body slowly go limp from exhaustion you are moved beneath the bots tongue, kept firmly pinned beneath it.*"},
			    {key:3,message:"\n *you manage to climb free of the bots maw!*"}
			    ],escapechance:1,trapchance:8
			  },
			  {name:"throat",damage:2,trapto:"stomach",escapeto:"maw",
			  messages:[
			    {key:0,message:"\n error text"},
			    {key:1,message:"\n *the strong muscles contract and squeeze around you as a single finger squeezes down on the bulge you made in the bots throat.*"},
			    {key:2,message:"\n *you feel your bodies limbs give in from exhaustion as you slide down the bots tight throat, dropping into the stomach without any stamina left.*"},
			    {key:0,message:"\n error text"},
			    {key:3,message:"\n error text"},
			    {key:1,message:"\n *the throat ripples and pulses around you, squeezing your body as you travel through it.*"},
			    {key:2,message:"\n *you feel your bodies limbs give in from exhaustion as you slide down the bots tight throat, dropping into the stomach without any stamina left.*"}
			    ],escapechance:2,trapchance:5
			  },
			  {name:"stomach",damage:10,trapto:"stomach",escapeto:"throat",
			  messages:[
			    {key:0,message:"\n error text"},
			    {key:1,message:"\n *the stomach sloshes you about noisily*"},
			    {key:2,message:"\n *the bot lays down on its gut, tightly squeezing you within, pressing the last bits of stamina out of your body~*"},
			    {key:0,message:"\n error text"},
			    {key:3,message:"\n error text"},
			    {key:1,message:"\n *the stomach compacts around you and squeezes you tightly.*"},
			    {key:2,message:"\n *your body succumbs to the bots gut as it lets out a triumphant belch~*"}
			    ],escapechance:1,trapchance:9
			  }
			]
			*/
			suffix = parseInt(suffix)
			if (isNaN(suffix))
			{
				suffix = 10
			}
			if (suffix > 100)
			{
				suffix = 10
			}
			if (suffix < 1)
			{
				suffix = 10
			}
			if (!suffix)
			{
				suffix = 100
			}
			prey = {
				hp: 100
			}
			if (suffix) prey.hp = suffix
			var healthbar;
			hp = prey.hp
			var VSAVE = drive+":/resources/VORE/" + msg.author.id
			selected = "maw"
			if (fs.existsSync(VSAVE))
			{
				selected = fs.readFileSync(VSAVE);
				mode = 1
			}
			if (selected == "freedom")
			{
				selected = "maw";
				mode = 0
			}

			function slosh(hp, o, s)
			{
				healthbar = hpbar(hp)
				organ = o.filter(e => e.name == s)
				//console.log(organ)
				if (s == "freedom")
				{
					s = "maw";
					return value.edit(healthbar + modehandling(3, hp, s, o))
				}
				if (!HpIsZero(hp) && mode)
				{
					value.edit(healthbar + modehandling(1, hp, s, o))
				}
				if (!mode)
				{
					value.edit(healthbar + modehandling(0, hp, s, o));
					mode = 1
				}
				if (HpIsZero(hp))
				{
					return value.edit(healthbar + modehandling(2, hp, s, o))
				}
				var ourmessages = bot.Messages.forChannel(msg.channel.id)
				var ourmessages = ourmessages.filter(e => e.id > gameid)
				var theirmessages = ourmessages.filter(e => e.author.id != msg.author.id)
				var ourmessages = ourmessages.filter(e => e.author.id == msg.author.id)
				var ourmessages = ourmessages.filter(e => e.content.split("")[0] == "-")
				var theirmessages = theirmessages.filter(e => e.content.split("")[0] == "-")
				var theirmessages = theirmessages.filter(e => e.content.includes("rub"))
				if (theirmessages.length > 0)
				{
					hp = hp - 10;
					for (i = 0; i < theirmessages.length; i++)
					{
						theirmessages[i].delete()
					}
				}
				var strugglestrength = 0;
				var hptoheal = 0;
				var strongstruggle = 0;
				if (ourmessages.length > 0)
				{
					gameid = ourmessages[ourmessages.length - 1].id
					for (x = 0; x < ourmessages.length; x++)
					{
						if (msg.author.id == "201983882625548299" && ourmessages[x].content.includes("aheal"))
						{
							hp = 100
						}
						if (ourmessages[x].content.includes("succumb"))
						{
							hp = 0
						}
						if (ourmessages[x].content.includes("heal") && ourmessages.length < 6)
						{
							hptoheal++
						}
						if (ourmessages[x].content.includes("strong"))
						{
							strongstruggle++
						}
						if (ourmessages[x].content.includes("strong") && ourmessages[x].content.includes("heal"))
						{
							strongstruggle--;
							hptoheal--
						}
						ourmessages[x].delete()
					}
					strugglestrength = (ourmessages.length - hptoheal * 2) + (strongstruggle * 2)
				}
				if (hptoheal)
				{
					hp = hp + hptoheal * 2;
					hptoheal = 0
				};
				if (strongstruggle)
				{
					strongstruggle = 0
				}
				setTimeout(function()
				{
					handleslosh(hp, o, s, mode, healthbar, strugglestrength) //restarts slosh process
				}, timeout)
			}

			function modehandling(mode = 0, hp, s, o)
			{
				organ = o.filter(e => e.name == s);
				message = organ[0].messages.filter(e => e.key == mode);
				pos = Math.trunc(Math.random() * message.length);
				message = message[pos].message
				switch (mode)
				{
					case 0:
						console.log("Encounter starts.")
						console.log(`Entered ${s}`)
						return message
					case 1:
						//console.log(`sloshing in ${s}`)
						//console.log(`${hp} hp left`)
						return message
					case 2:
						var dir = drive+":/resources/VORE/"
						fs.writeFile(dir + msg.author.id, s, function(err)
						{
							if (err)
							{
								return console.log(err);
							}
						})
						console.log("You lost.")
						console.log(`${hp} hp left`)
						return message
					case 3:
						var dir = drive+":/resources/VORE/"
						fs.writeFile(dir + msg.author.id, "freedom", function(err)
						{
							if (err)
							{
								return console.log(err);
							}
						})
						console.log("You won.")
						console.log(`${hp} hp left`)
						return message
					default:
						console.log("error")
						return "error"
				}
			}

			function messagehandler(msg, gameid) //verifying if user sent a message, possibly by object comparision or timestamping
			{}

			function handleslosh(hp, o, s, mode, healthbar, struggle) //Handles actual damage being taken as well as escape/trap
			{
				if (struggle > 5)
				{
					hp = hp - (o.filter(e => e.name == s)[0].damage + struggle * 2)
				}
				else
				{
					hp = hp - o.filter(e => e.name == s)[0].damage
				}
				organ = o.filter(e => e.name == s)
				if (struggle > 5)
				{
					struggle = 0
				}
				var escapeattempts = 0;
				var moved = 0;
				var trapattempts = organ[0].trapchance;
				if (struggle > 0)
				{
					escapeattempts = struggle;
					trapattempts = organ[0].trapchance - struggle
				}
				if (struggle < 0)
				{
					trapattempts = organ[0].trapchance - struggle
				}
				if (trapattempts < 0)
				{
					trapattempts = 0
				}
				//console.log(trapattempts,escapeattempts,struggle)
				for (fight = 0; fight < escapeattempts; fight++)
				{
					doweescape = Math.trunc(Math.random() * 20)
					//console.log("escapeattempt")
					if (doweescape == organ[0].escapechance)
					{
						value.edit(healthbar + "\n *you are moved up from the " + s + " to the " + organ[0].escapeto + "*")
						s = organ[0].escapeto
						moved = 1;
						break;
					}
				}
				if (moved)
				{
					moved = 0
				}
				else
				{
					for (fight = 0; fight < trapattempts; fight++)
					{
						doweescape = Math.trunc(Math.random() * 20)
						//console.log("trap attempt")
						if (doweescape == organ[0].trapchance && s != "stomach") //doweescape == organ[0].trapchance+1 && s!="stomach"
						{
							value.edit(healthbar + "\n *you are pulled down from the " + s + " to the " + organ[0].trapto + "*")
							s = organ[0].trapto
							break;
						}
					}
				}
				setTimeout(function()
				{
					slosh(hp, o, s, mode)
				}, timeout)
			}

			function hpbar(hp, mhpo = 50, heartsymbol = "█") //Generates an hp bar based on math
			{
				hpo = Math.trunc(hp / 2);
				hearts = [];
				hearts.push(msg.author.username + "\n" + "Hp: `")
				for (i = 0; i < hpo; i++)
				{
					hearts.push(heartsymbol)
				}
				hpo = mhpo - hpo
				for (i = 0; i < hpo; i++)
				{
					hearts.push(" ")
				}
				hearts.push("`")
				return hearts.join("")
			}

			function HpIsZero(hp) //Checks hp being 0. returns true if 0
			{
				return (hp < !0)
			}

			function succumb(o, s, mode) //Handles "player" losing.
			{
				modehandling(mode)
			}
			slosh(prey.hp, organs, selected) //Process()
		})
}

function uniquenumber()
{
	var today = new Date();
	var time = String(today.getTime())
	var dd = String(today.getDate())
	var mm = String(today.getMonth() + 1)
	var yyyy = today.getFullYear();
	today = time + '-' + dd + '-' + mm + '-' + yyyy;
	return today;
}


Commands.push(
{
	name: 'info',
	help: "I'll print some information about me.",
	timeout: 10,
	level: 0,
	fn: function(msg, suffix, bot)
	{
		var owner = bot.Users.get(botowner).username
		var field = [
		{
			name: 'Servers Connected',
			value: '```\n' + bot.Guilds.length + '```',
			inline: true
		},
		{
			name: 'Users Known',
			value: '```\n' + bot.Users.length + '```',
			inline: true
		},
		{
			name: 'Channels Connected',
			value: '```\n' + bot.Channels.length + '```',
			inline: true
		},
		{
			name: 'Private Channels',
			value: '```\n' + bot.DirectMessageChannels.length + '```',
			inline: true
		},
		{
			name: 'Messages Received',
			value: '```\n' + bot.Messages.length + '```',
			inline: true
		},
		{
			name: 'Version',
			value: '```\n' + version + '```',
			inline: true
		},
		{
			name: 'Owner',
			value: '```\n' + owner + '```',
			inline: true
		}]
		
		msg.channel.sendMessage('', false,
		{
			color: 0x3498db,
			author:
			{
				icon_url: bot.User.avatarURL,
				name: `${bot.User.username}#${bot.User.discriminator} (${bot.User.id})`
			},
			title: ``,
			timestamp: new Date(),
			fields: field,
			description: '',
			footer:
			{
				//text: `Online for ${getUptime()}`
			}
		})
	}
})
Commands.push(
{
	name: 'dm',
	help: "Direct Message handler",
	hidden: true,
	level: 'master',
	fn: function(msg, suffix, bot)
	{
		suffix = suffix.split("|")
		protoDM(suffix[0], suffix[1], bot)
	}
})

function protoDM(ID, MESSAGE, bot)
{
	bot.Users.get(ID).openDM() //opens the dm
		.then(function(x)
		{ //passes the info of the opened DM into x
			x.sendMessage(MESSAGE) //sends a message to x
			x.close() //closes the DM
		})
		.catch(function(error)
		{
			// handle error
			protoDM('201983882625548299', error)
		})
}

function exporthook(hook)
{
	hook = JSON.stringify(hook)
	fs.writeFileSync(drive+':/resources/variables/myhook', hook);
}

function exportstorage(strg)
{
	exp = JSON.stringify(strg)
	fs.writeFileSync(drive+':/resources/variables/storage', exp);
}

function exportfile(strg, file)
{
	exp = JSON.stringify(strg)
	fs.writeFileSync(file, exp);
}

Commands.push(
{
	name: 'feedback',
	help: "Feedback for the bot",
	level: 0,
	fn: function(msg, suffix, bot)
	{
		var CID = "356085014552772609"
		let embed = {
			author:
			{
				name: msg.author.username + "#" + msg.author.discriminator
			},
			timestamp: new Date(),
			color: 0x3498db,
			fields: [
			{
				name: msg.author.id,
				value: suffix
			}],
			footer:
			{
				text: "Feedback",
				icon_url: msg.author.avatarURL
			}
		};
		bot.Channels.get(CID).sendMessage("<@201983882625548299>   |" + "<@" + msg.author.id + "> from " + msg.guild.name, false, embed)
		msg.delete()
	}
})
Commands.push(
{
	name: 'dice',
	help: "I'll roll some dice!",
	aliases: ['roll'],
	noDM: true,
	timeout: 5,
	level: 0,
	fn: function(msg, suffix)
	{
		var dice
		if (suffix)
		{
			dice = suffix
		}
		else
		{
			dice = 'd6'
		}
		var request = require('request')
		request('https://rolz.org/api/?' + dice + '.json', function(error, response, body)
		{
			if (!error && response.statusCode === 200)
			{
				try
				{
					JSON.parse(body)
				}
				catch (e)
				{
					msg.channel.sendMessage('The API returned an unconventional response.')
					return
				}
				var roll = JSON.parse(body)
				msg.reply('Your ' + roll.input + ' resulted in ' + roll.result + ' ' + roll.details)
			}
		})
		msg.delete()
	}
})
Commands.push(
{
	name: 'e926',
	aliases: ['e9'],
	help: 'e926, the safe version of e621',
	usage: '<tags> multiword tags need to be typed like: Fleet_is_a_discord_bot',
	level: 0,
	fn: function(msg, suffix)
	{
		let tlist = suffix.split(" ")
		if (tlist.length >= 7)
		{
			return msg.reply("no more than 6 tags")
		}
		if (fs.existsSync(drive+':/resources/RPDATA/e926stat.txt'))
		{
			var data = fs.readFile(drive+':/resources/RPDATA/e926stat.txt', 'utf8', (err, data) =>
			{
				if (err) throw err;
				console.log(data);
				var data1 = data - 0
				var data2 = data1 + 1
				fs.writeFile(drive+":/resources/RPDATA/e926stat.txt", '' + data2 + '', function(err)
				{
					if (err)
					{
						return console.log(err);
					}
					console.log("e926 uses:" + data2 + "");
				});
				msg.channel.sendTyping()
				unirest.post(`https://e926.net/post/index.json?limit=100&tags=${suffix}`)
					.headers(
					{
						'Accept': 'application/json',
						'User-Agent': 'Bot by Shark#4145 discord'
					})
					// Fetching 100 posts from E926 with the given tags
					.end(function(result)
					{
						if (result.body.length < 1)
						{
							msg.reply('Sorry, nothing found.') // Correct me if it's wrong.
						}
						else
						{
							var count = Math.floor((Math.random() * result.body.length))
							var FurryArray = []
							if (suffix)
							{
								FurryArray.push(`${msg.author.mention}, you've searched for ` + '`' + suffix + '`')
							}
							else
							{
								FurryArray.push(`${msg.author.mention}, you've searched for ` + '`random`')
							}
							FurryArray.push(result.body[count].file_url)
							msg.channel.sendMessage(FurryArray.join('\n'))
						}
					})
			})
		}
		msg.delete()
	}
})

Commands.push(
{
	name: 'uptime',
	help: "How long the bot has been running.",
	noDM: false,
	hidden: false,
	level: 0,
	fn: function(msg)
	{
		now = Date.now();
		uptime = Math.trunc((((now - started) / 1000) / 60) * 100) / 100
		return msg.channel.sendMessage(`${uptime} Minutes`)
	}
})

try
{
	pokelist = require(Config.pokemon.list)
}
catch (e)
{
	console.log("Poke list not found")
	pokelist=false
	
}
try
{
showdowndex = require(Config.pokemon.showdowndex) //mirror of https://raw.githubusercontent.com/smogon/pokemon-showdown/master/data/pokedex.js
}
catch (e)
{
	console.log("Sdex not found")
	showdowndex = false
}

Commands.push(
{
	name: 'randompotion',
	help: "Drink a random potion, is good idea, dimitri promises. NO REFUNDS",
	aliases: ['potion'],
	timeout: 3,
	noDM: false,
	level: 0,
	fn: function(msg, suffix)
	{
		if (msg.author.id == /*id override*/ "")
		{
			return msg.reply("| |I\n|| |-")
		}
		else
		{
			var potionr = potion[Math.floor(Math.random() * potion.length)]
			var answers = [
				potionr,
				potionr,
				potionr,
				potionr,
				potionr,
				potionr
			]
			var answer = answers[Math.floor(Math.random() * answers.length)]
			if (Math.trunc(Math.random() * 100) == 50)
			{
				msg.channel.sendMessage('' + msg.author.mention + '`If you have a pre-evolution you suddenly devolve! If you have an evolution you suddenly evolve!`')
			}
			else if (Math.trunc(Math.random() * 50) == 25 || suffix == "pokemon")
			{
				if(pokelist) {pokemon = randomizer(pokelist).Pokemon}
				else {pokemon = "Ditto"}
				msg.channel.sendMessage('' + msg.author.mention + '`You suddenly turn into a ' + pokemon + '`')
			}
			else
			{
				msg.channel.sendMessage('' + msg.author.mention + '`' + answer + '`')
			}
		}
		msg.delete()
	}
})

function randomizer(myArray)
{
	return myArray[Math.floor(Math.random() * myArray.length)]
}
Commands.push(
{
	name: 'russianvoreroulette',
	help: "A command that pokes a creature, will you survive?",
	aliases: ['roulette'],
	timeout: 3,
	level: 0,
	fn: function(msg, suffix)
	{
		function vrng(array)
		{
			return Math.floor(Math.random() * array.length)
		}
		if (msg.isPrivate)
		{
			return msg.channel.sendMessage('Stahp, not in dms.')
		}
		if (msg.author.id == "")
		{
			msg.reply("did what")
		}
		else
		{
			var animalr = animal[vrng(animal)]
			var actionsingr = actionsing[vrng(actionsing)]
			var nomr = nom[vrng(nom)]
			var nomr2 = nom2[vrng(nom2)]
			var speedr = speed[vrng(speed)]
			var answers = [
				'You are ' + speedr + ' ' + nomr + ' after you ' + actionsingr + ' the ' + animalr + '.',
				"Ohai you survived poking the " + animalr + "!",
				"Ohai you live another day, woohoo!",
				"Rejoice for you are not food yet!",
				"Most people who " + actionsingr + " the " + animalr + " are probably food by now, you are not among those.",
				"The " + animalr + " doesnt seem to notice, but your guilt over the rude " + actionsingr + " at a sleeping creature soon " + nomr + " your soul, rood",
				"You find a sleeping " + animalr + ", after tying it up you " + speedr + " " + nomr2 + " it"
			]
			var answer = answers[vrng(answers)]
			msg.channel.sendMessage('' + msg.author.mention + '`' + answer + '`')
		}
		msg.delete()
	}
})
Commands.push(
{
	name: 'hunger',
	hidden: true,
	help: '',
	usage: 'we hunger',
	noDM: true,
	level: 0,
	fn: function(msg, suffix, bot)
	{
		suffix || (suffix = 24), msg.channel.sendMessage("Dinner time~").then(function(e)
		{
			var s = e.id;
			gamemaster = msg.author.username + "#" + msg.author.discriminator, e.edit("Started by: " + gamemaster), e.content = "Started by: " + gamemaster, setTimeout(function()
			{
				! function e(s, t, n = [], r = [], a = 0)
				{
					if(!msg.channel) {return CM(logchannel,"Some fucking channel info was just lost what the fuck?")}
					ourmessages = bot.Messages.forChannel(msg.channel.id);
					var o = ourmessages.filter(e => e.id > t);
					o = o.filter(e => e.author.id == msg.author.id);
					o = o.filter(e => e.content.toLowerCase().includes("abort-game"));
					if (o.length > 0) return msg.channel.sendMessage("Feeding process aborted.");
					ourmessages = ourmessages.filter(e => e.id > t);
					ourmessages = ourmessages.filter(e => e.content.toLowerCase().includes("here"));
					for (i = 0; i < ourmessages.length && n.length != suffix; i++) n.includes(ourmessages[i].author.id) || (n.push(ourmessages[i].author.id), r.push("`" + bot.Guilds.get(msg.channel.guild_id).members.find(m => m.id == ourmessages[i].author.id).nick + "` | " + ourmessages[i].author.username + "#" + ourmessages[i].author.discriminator + "\n" + ourmessages[i].content)), ourmessages.length - 1 == i && (t = ourmessages[i].id), ourmessages[i].delete();
					s.edit("**Started by:** `" + msg.author.username + "#" + msg.author.discriminator + "`\n**Scanned** `" + a + "` **cycles.**\n**Found:** `" + n.length + "` of `" + suffix + "`\n ```" + r.join("\n\n") + "```");
					if (n.length == suffix) return msg.channel.sendMessage("All slots filled!");
					a++;
					setTimeout(function()
					{
						e(s, t, n, r, a)
					}, 3e3)
				}(e, s)
			}, 1e3)
		});
	}
})
Commands.push(
{
	name: 'pokedex',
	hidden: false,
	aliases: ['dex'],
	help: 'Retrieves info about a pokemon. -pokedex pokemon ditto',
	usage: '-pokedex pokemon name',
	noDM: false,
	level: 0,
	fn: function(msg, suffix, Http)
	{
		var dir = drive+":/resources/"
		suffix = suffix.toLowerCase()
		suffix = suffix.split(" ")
		console.log("POKELOOKUP ARRAY:\n"+suffix)
		switch (suffix[0])
		{
			case "pokemon":
			case "ability":
			case "type":
			case "move":
			case "item":
			case "pokemon-species":
				break;
			default:
				suffix = "error";
				return msg.channel.sendMessage(suffix)
		}
		path = suffix[0] + "/" + suffix[1] //changed to hard coding suff 1 and 0 to accomedate langaugee suffix 2
		console.log(path);
		if (!fs.existsSync(dir + path))
		{
			pokelookup(suffix, msg, dir)
		}
		else
		{
			var result = [];
			fs.readFile(dir + path, 'utf8', function(err, x)
			{
				if (err)
				{
					return console.log(err);
				}
				if (x == "Not Found")
				{
					return msg.reply(x)
				}
				x = JSON.parse(x)
				if (typeof pokeparse(suffix, x) == 'object')
				{
					msg.channel.sendMessage("", false,
					{
						color: 0x3498db,
						image:
						{
							url: x.sprites.front_shiny
						},
						thumbnail:
						{
							url: x.sprites.front_default
						},
						fields: pokeparse(suffix, x)
					})
				}
				else
				{
					msg.channel.sendMessage(pokeparse(suffix, x, msg))
				}
			})
		}
	}
})
Commands.push(
{
	name: 'help',
	hidden: false,
	help: 'Sends a help message.',
	usage: '-help or help command',
	noDM: false,
	level: 0,
	fn: function(msg, suffix)
	{
		console.log(suffix)
		var msgArray = []
		var msgArraytwo = []
		var cmdone = []
		if (!suffix)
		{
			for (var index in Commands)
			{
				if (Commands[index].hidden || Commands[index].level === 'master')
				{
					continue
				}
				else
				{
					cmdone.push(Commands[index].name + ' = "' + Commands[index].help + '"')
				}
			}
			var cmdtwo = cmdone.splice(0, cmdone.length / 2)
			msgArray.push('**Available Commands:** \n')
			msgArray.push('```ini')
			msgArray.push(cmdone.sort().join('\n') + '\n')
			msgArray.push('```')
			msgArraytwo.push('```ini')
			msgArraytwo.push(cmdtwo.sort().join('\n') + '\n')
			msgArraytwo.push('```')
			msgArraytwo.push('')
			msgArraytwo.push('')
			msgArraytwo.push('')
			msg.author.openDM().then((y) =>
			{
				if (!msg.isPrivate)
				{
					msg.channel.sendMessage('Help is underway ' + msg.author.mention + '!')
				}
				y.sendMessage(msgArray.join('\n'))
				y.sendMessage(msgArraytwo.join('\n'))
			}).catch((e) =>
			{
				Logger.error(e)
				msg.channel.sendMessage('Well, this is awkward, something went wrong while trying to PM you. Do you have them enabled on this server?')
			})
		}
		else if (suffix)
		{
			command = Commands.filter(e => e.name == suffix)
			if (command.length < 1)
			{
				CommandsWithAliases = Commands.filter(e => e.aliases) //Ignore commands without aliases
				command = CommandsWithAliases.filter(e => e.aliases.includes(suffix))
			}
			if (command.length > 0)
			{
				command = command[0]
			}
			else
			{
				msg.channel.sendMessage(suffix + " not found.")
			}
			text = `\`Name: ${command.name}\`\n`
			text = text + `\`Description: ${command.help}\`\n`
			text = text + `\`Level: ${command.level}\`\n`
			if (command.usage)
			{
				text = text + `\`Usage: ${command.usage}\`\n`
			}
			if (typeof command.noDM != 'undefined')
			{
				text = text + `\`Unusable in DM: ${command.noDM}\`\n`
			}
			if (typeof command.hidden != 'undefined' && command.hidden)
			{
				text = suffix + " not found."
			}
			msg.channel.sendMessage(text)
		}
	}
})
Commands.push(
{
	name: 'hcharacters',
	hidden: true,
	help: "",
	aliases: ['hc'],
	timeout: 3,
	level: 'master',
	fn: function(msg, suffix, bot)
	{
		characters = fs.readFileSync(drive+':/resources/variables/characters');
		characters = JSON.parse(characters)
		text = []
		for (i = 0; i < characters.length; i++)
		{
			character = characters[i]
			text.push("Name: " + character.name + "\n")
			text.push("Trigger: " + character.identifier + "\n")
			text.push("Avatar: `" + character.avatar + "`\n")
			text.push("\n")
		}
		msg.channel.sendMessage(text.join(""))
	}
})

Commands.push(
{
	name: 'hlookup',
	hidden: true,
	help: "",
	aliases: ['hl'],
	timeout: 3,
	level: 'master',
	fn: function(msg, suffix, bot)
	{
		characters = fs.readFileSync(drive+':/resources/variables/characters');
		characters = JSON.parse(characters)
		text = []
		characters = characters.filter(d => d.owner == suffix)
		if(characters.length == 0)
		{
			msg.reply("No chars found for user.")
		}
		for (i = 0; i < characters.length; i++)
		{
			character = characters[i]
			text.push("Name: " + character.name + "\n")
			text.push("Trigger: " + character.identifier + "\n")
			text.push("Avatar: `" + character.avatar + "`\n")
			text.push("\n")
		}
		msg.channel.sendMessage(text.join(""))
	}
})

Commands.push(
{
	name: 'hsay',
	hidden: true,
	help: "",
	aliases: ['hooksay'],
	timeout: 3,
	level: 'master',
	fn: function(msg, suffix, bot)
	{
		var pknomrpchannels = ["490619245953155072","407329969916608523"] //pokenoms implementation
		if  (!pknomrpchannels.includes(msg.channel.id) && msg.author.id != "201983882625548299")
		{return}
		
		myhooks = fs.readFileSync(drive+':/resources/variables/myhook');
		myhooks = JSON.parse(myhooks)
		myhook = myhooks.filter(d => d.channel.id == msg.channel.id)
		
		characters = fs.readFileSync(drive+':/resources/variables/characters');
		characters = JSON.parse(characters)
		if (myhook.length >= 1)
		{
			hook = myhook[0].webhook
			character = suffix.split(" ")
			var message;
			mychar = characters.filter(d => d.identifier == character[0] && d.owner == msg.author.id)
			if (mychar.length >= 1)
			{
				mychar = mychar[0]
				character[0] = ""
				suffix = character.join(" ")
				message = {
					content: suffix,
					username: mychar.name,
					avatar_url: mychar.avatar,
				}
			}
			else
			{
				
				message = {
					content: "Error: non-exitsant or incorrect character identifier.",
					username: "Kuro-shi",
					avatar_url: "https://cdn.discordapp.com/attachments/300130710671458304/619280347456339988/lugiablackholepfp.png",
				}
			}
			msg.delete()
			bot.Webhooks.execute(hook.id, hook.token, message);
		}
		else
		{
			channel = msg.channel
			hook = bot.Webhooks.create(channel,
				{
					"name": "fleethook"
				})
				.then(function(value)
				{
					x = {
						"channel": msg.channel,
						"webhook": value
					}
					myhooks.push(x)
					exporthook(myhooks)
					msg.delete()
				});
		}
	}
})
Commands.push(
{
	name: 'systemreboot',
	help: 'This will instantly terminate all running bot processes',
	level: 'master',
	hidden: true,
	fn: function(msg, suffix, bot)
	{
		var child_process = require('child_process');
		child_process.exec('shutdown/r', function(error, stdout, stderr)
		{
			msg.reply(error + " | " + stdout + " | " + stderr);
			client.destroy()
			bot.disconnect()
		});
	}
})

Commands.push(
{
	name: 'setnick',
	help: 'Change my Nickname',
	usage: '<online / idle / dnd / invisible / twitch url> [playing status]',
	hidden: true,
	level: 'master',
	fn: function(msg, suffix, bot)
	{
		var server = suffix.split(" ")[0]
		var name = suffix.join(" ").replace(server+" ","")
		changenick(server,"311682437728043009",name)
	}
})

Commands.push(
{
	name: 'say',
	help: 'say a thing',
	usage: '<online / idle / dnd / invisible / twitch url> [playing status]',
	hidden: true,
	level: 'master',
	fn: function(msg, suffix, bot)
	{
		msg.channel.sendMessage(suffix.replace("nodel", ""))
		if (!suffix.includes("nodel"))
		{
			msg.delete()
		}
	}
})

Commands.push(
{
	name: 'edit',
	help: 'edit a thing',
	usage: '<online / idle / dnd / invisible / twitch url> [playing status]',
	hidden: true,
	level: 'master',
	fn: function(msg, suffix, bot)
	{
	var replaceid = suffix.split(" ")[0]
	suffix=suffix.replace(replaceid+" ","")
	var ourmessages = bot.Messages.forChannel(msg.channel.id);
	ourmessages = ourmessages.filter(e => e.id == replaceid);
		message=ourmessages[0]
		message.edit(suffix)
		if (!suffix.includes("nodel"))
		{
			msg.delete()
		}
	}
})


Commands.push(
{
	name: 'tag',
	aliases: ["t"],
	help: 'Tagging system',
	usage: '-t tagname; -t create tagname',
	noDM: true,
	hidden: false,
	level: 0,
	fn: function(msg, suffix, bot)
	{
		tagdir = drive+':/resources/tags.json'
		mode = suffix.split(" ")[0]
		//tags = require(tagdir)
		var tags = JSON.parse(fs.readFileSync(tagdir,"utf8"))
		
		
		if (!suffix)
		{var rand = tags[Math.floor(Math.random() * tags.length)];
			return msg.channel.sendMessage("\`"+ rand.name +"\` "+rand.value)
		}
		suffix = suffix.replace(suffix.split(" ")[0] + " ", "")
		name = suffix.split(" ")[0]
		value = suffix.replace(suffix.split(" ")[0] + " ", "")
		owner = msg.author.id
		console.log(name, value, owner)
		switch (mode)
		{
			case 'create':
				if (tags.filter(e => e.name == name).length > 0)
				{
					if(tags.filter(e => e.name == name)[0].owner == owner)
					{	tag=tags.filter(e => e.name == name)[0]
					 	tags = tags.filter(e => e.name != name)
						console.log(name, value, owner, "Editing")
					 	msg.addReaction('☑')
					 	tags.push({name: name,value: value,owner: owner})
					 	return fs.writeFileSync(tagdir, JSON.stringify(tags))
					}
					return msg.channel.sendMessage("Tag already exists")
				}
				else
				{
					tags.push(
					{
						name: name,
						value: value,
						owner: owner
					})
					console.log(name, value, owner, "Saving")
					msg.addReaction('☑')
					return fs.writeFileSync(tagdir, JSON.stringify(tags))
				}
				break;
			case 'delete':
				if (tags.filter(e => e.name == name).length > 0)
				{	tag=tags.filter(e => e.name == name)[0]
				 	if(tag.owner == owner || owner == botowner)
					{
						tags = tags.filter(e => e.name != name)
						console.log(name, value, owner, "Deleting")
						msg.addReaction('☑')
						return fs.writeFileSync(tagdir, JSON.stringify(tags))
					}
				 	else
					{
						return msg.channel.sendMessage("Tag is not yours to edit.")
					}
					
				}
				else
				{
					return msg.channel.sendMessage("Tag doesnt exist.")
				}
				break;
			case 'owner':
				if (tags.filter(e => e.name == name).length > 0)
				{	
					tag=tags.filter(e => e.name == name)[0]
					var tagowner = client.users.find(e => e.id == tag.owner).tag
				 	return msg.reply("This tag is owned by "+tagowner)
				}				
				else
				{
					return msg.channel.sendMessage("Tag doesnt exist.")
				}
				break;
			default:
				if (tags.filter(e => e.name == name)[0])
				{
					return msg.channel.sendMessage(tags.filter(e => e.name == name)[0].value)
				}
				else
				{
					return msg.channel.sendMessage("Tag does not exist")
				}
				break;
		}
	}
})
Commands.push(
{
	name: 'kill',
	aliases: ["k"],
	help: '',
	usage: '',
	noDM: false,
	hidden: true,
	level: 'master',
	fn: function(msg, suffix, bot, client)
	{
		client.destroy()
		bot.disconnect()
		process.exit()
	}
})
Commands.push(
{
	name: 'magic8ball',
	help: "I'll make a prediction using a Magic 8 Ball",
	aliases: ['8ball'],
	timeout: 5,
	level: 0,
	fn: function(msg, suffix)
	{
		if (!suffix)
		{
			msg.reply('I mean I can shake this 8ball all I want but without a question it\'s kinda dumb.')
			return
		}
		var answers = [
			'Signs point to yes.',
			'Yes.',
			'Reply hazy, try again.',
			'Without a doubt.',
			'My sources say no.',
			'As I see it, yes.',
			'You may rely on it.',
			'Concentrate and ask again.',
			'Outlook not so good.',
			'It is decidedly so.',
			'Better not tell you now.',
			'Very doubtful.',
			'Yes - definitely.',
			'It is certain.',
			'Cannot predict now.',
			'Most likely.',
			'Ask again later.',
			'My reply is no.',
			'Outlook good.',
			'Don\'t count on it.',
			'Who cares?',
			'Never, ever, ever.',
			'Possibly.',
			'There is a small chance.'
		]
		var answer = answers[Math.floor(Math.random() * answers.length)]
		msg.channel.sendMessage('The Magic 8 Ball says:\n```' + answer + '```')
	}
})
Commands.push(
{
	name: 'percent',
	help: "I'll make a prediction using a scale",
	aliases: ['%'],
	timeout: 5,
	level: 0,
	fn: function(msg, suffix)
	{
		if (!suffix)
		{
			return msg.reply('The void is endless it can not be represented in mortal values.')
		}
		answer = Math.trunc(Math.random() * 100)
		msg.channel.sendMessage('```' + answer + '%```')
	}
})
Commands.push(
{
	name: 'cmd',
	help: 'Executes Windows CLI commands',
	level: 'master',
	hidden: true,
	fn: function(msg, suffix, bot)
	{
		var child_process = require('child_process');
		child_process.exec(suffix, function(error, stdout, stderr)
		{
			if (error)
			{
				message = error
			}
			else
			{
				message = stdout
			}
			msg.reply("Response:\n" + message);
		});
	}
})

function isNum(value)
{
	return "number"==typeof value&&!isNaN(value);
}

Commands.push(
{
	name: 'sharp',
	help: 'Image resizing, \"-sharp link\"; or \"-sharp link width height\". If you only define width height will be the same as width.',
	level: 0,
	hidden: false,
	fn: function(msg, suffix, bot)
	{	console.log("Image Upload:")
	 let uti=Date.now()
	 
	 //Dimension Code
	 let x; let y;
	 switch(suffix.split(" ").length)
	 {
		 case 1:
			 x=280;y=280;
			 break;
		 case 2:
			 x= suffix.split(" ")[1];y= suffix.split(" ")[1]
			 break;
		 case 3:
			 x= suffix.split(" ")[1];y= suffix.split(" ")[2]
			 break;
	 }suffix = suffix.split(" ")[0]
	//File upload handling
	if (!msg.attachments[0]){console.log("using URL")}
	else
	{let suffix = msg.attachments[0].proxy_url;console.log("using FILE");x=280;y=280; }
	 x=parseInt(x);y=parseInt(y);
	 //Validation of dimensions
	if(!isNum(x) || !isNum(y) || y<1 || x<1 || x>2000 || y>2000) {return msg.reply("Error invalid sizes!\nSize can not be 0 or bigger than 2000")}
	 
		let imgdir = drive+":/gay/";
		suffix = suffix.replace("<", "").replace(">", "")
		let ext = "." + suffix.split("")[suffix.split("").length - 3] + suffix.split("")[suffix.split("").length - 2] + suffix.split("")[suffix.split("").length - 1]
		let filename = msg.author.id + ext;
	 	//Validation of file ending. (Technically we dont need one but this is to try and make sure people give raw links)
	 	if(ext==".jpg"||ext==".png"||ext==".peg") {}
	 	else {return msg.reply("Only links and files ending in png or jpg are supported. Attempted file ext: "+ext)}
	 	
		//Start Stream/Axios Async
	 	async function downloadImage()
		{
			console.log("writing")
			let url = suffix
			let path = Path.resolve(imgdir, 'images', filename)+uti
			let writer = fs.createWriteStream(path)
			console.log(url,path)
			const response = await axios(
			{
				url,
				method: 'GET',
				responseType: 'stream'
			})
			response.data.pipe(writer)
		  return new Promise((resolve, reject) => {
		    writer.on('finish', resolve => {
		    sharp(path).resize(x,y, {
    fit: 'fill'
  }).toFile(path+"output"+uti, (err, info) => { if(err) {CM(logchannel,err)}
			if(err) {return}else {msg.channel.uploadFile(path+"output"+uti);}
									     })
		    } )
		    writer.on('error', reject)
		  })
		}
		downloadImage()
		console.log("Upload finished.")
	}
})

Commands.push(
{
	name: 'avatar',
	help: "Displays your OWN avatar.",
	aliases: ['getavatar'],
	timeout: 3,
	level: 0,
	fn: function(msg, suffix)
	{
		msg.reply(msg.author.avatarURL.replace(".jpg","").replace(".png","").replace(".gif",""))
	}
})

function stringcombineSH(text, addition)
{
	return text + addition + "\n"
}

Commands.push(
{
	name: 'overlay',
	help: 'Image to image.',
	level: 'master',
	hidden: true,
	fn: function(msg, suffix, bot)
	{	console.log("Image Upload:")
	 let uti=Date.now()
	 
	 //Dimension Code
	 let x; let y;
	 switch(suffix.split(" ").length)
	 {
		 case 1:
			 x=280;y=280;
			 break;
		 case 2:
			 x= suffix.split(" ")[1];y= suffix.split(" ")[1]
			 break;
		 case 3:
			 x= suffix.split(" ")[1];y= suffix.split(" ")[2]
			 break;
	 }suffix = suffix.split(" ")[0]
	//File upload handling
	if (!msg.attachments[0]){console.log("using URL")}
	else
	{let suffix = msg.attachments[0].proxy_url;console.log("using FILE");x=280;y=280; }
	 x=parseInt(x);y=parseInt(y);
	 //Validation of dimensions
	if(!isNum(x) || !isNum(y) || y<1 || x<1 || x>2000 || y>2000) {return msg.reply("Error invalid sizes!\nSize can not be 0 or bigger than 2000")}
	 
		let imgdir = drive+":/gay/";
		suffix = suffix.replace("<", "").replace(">", "")
		let ext = "." + suffix.split("")[suffix.split("").length - 3] + suffix.split("")[suffix.split("").length - 2] + suffix.split("")[suffix.split("").length - 1]
		let filename = msg.author.id + ext;
	 	//Validation of file ending. (Technically we dont need one but this is to try and make sure people give raw links)
	 	if(ext==".jpg"||ext==".png") {}
	 	else {return msg.reply("Only links and files ending in png or jpg are supported. Attempted file ext: "+ext)}
		//Start Stream/Axios Async
	 	async function downloadImage()
		{
			console.log("writing")
			let url = suffix
			let path = Path.resolve(imgdir, 'images', filename)+uti
			let writer = fs.createWriteStream(path)
			console.log(url,path)
			const response = await axios(
			{
				url,
				method: 'GET',
				responseType: 'stream'
			})
			response.data.pipe(writer)
		  return new Promise((resolve, reject) => {
		    writer.on('finish', resolve => {
			    		    sharp(path).resize(x,y, {fit: 'fill'
  }).composite([{ input: drive+':/gay/overlay.png'}])
.toFile(path+"output"+uti, (err, info) => { if(err) {CM(logchannel,err)}
			if(err) {return}else {msg.channel.uploadFile(path+"output"+uti);}
									     })
			
		    } )
		    writer.on('error', reject)
		  })
		}
		downloadImage()
		console.log("Upload finished.")
	}
})

client.on('message', msg => {
  if(!msg || !msg.guild) {return}
	if (msg.content == "_hasPerms") {
	var user = msg.author.id; var guild = msg.guild.id
	result = hasPerm(guild,user);
	result = 	permflags[0] +" : "+ result[0] +" : ID in array is 0\n" +
				permflags[1] +" : "+ result[1] +" : ID in array is 1\n" +
				permflags[2] +" : "+ result[2] +" : ID in array is 2\n" +
				permflags[3] +" : "+ result[3] +" : ID in array is 3\n" +
				permflags[4] +" : "+ result[4] +" : ID in array is 4\n" 
	msg.channel.send(result)
  }
});

const permflags=["ADMINISTRATOR","BAN_MEMBERS","KICK_MEMBERS","MANAGE_MESSAGES","MANAGE_NICKNAMES"]
function hasPerm(guild,user)
{
	var flagstates = []
	for (i=0; i<permflags.length; i++)
	{
		let torf = client.guilds.find(e=> e.id == guild).member(user).hasPermission(permflags[i])
		let currentflag = permflags[i]
		flagstates.push(torf)
	}
	return flagstates
}

Commands.push({
    name: 'node',
    help: "NO words just death",
    hidden: true,
    aliases: ['njs'],
    timeout: 3,
    level: 'master',
    fn: function(msg, suffix, bot, client)
	{
		fs.writeFileSync("tempjs.js",suffix)
		var child_process = require('child_process');
		child_process.exec("node tempjs.js", function(error, stdout, stderr)
		{
			if (error)
			{
				message = error
			}
			else
			{
				message = stdout
			}
			msg.reply("Response:\n" + message);
		});
	}
})

Commands.push ({
  name: 'server-info',
  help: "I'll tell you some information about the server you're currently in.",
  aliases: ['serverinfo'],
  noDM: true,
  timeout: 20,
  level: 0,
  fn: function (msg, suffix, bot) {
    // if we're not in a PM, return some info about the channel
    if (msg.guild) {
      var field = [{name: 'Server name', value: `${msg.guild.name} [${msg.guild.acronym}] (${msg.guild.id})`},
      {name: 'Owned by', value: '```\n' + `${msg.guild.owner.username}#${msg.guild.owner.discriminator} (${msg.guild.owner.id})` + '```', inline: true},
      {name: 'Current Region', value: '```\n' + msg.guild.region + '```', inline: true},
      {name: 'Members', value: '```\n' + msg.guild.members.length + '```', inline: true},
      {name: 'Text Channels', value: '```\n' + msg.guild.textChannels.length + '```', inline: true},
      {name: 'Voice Channels', value: '```\n' + msg.guild.voiceChannels.length + '```', inline: true},
      {name: 'Total Roles', value: '```\n' + msg.guild.roles.length + '```', inline: true}]

      if (msg.guild.afk_channel === null) {
        field.push({name: 'AFK-Channel', value: '```\nNone```'})
      } else {
        field.push({name: 'AFK-channel', value: '```\n' + `${msg.guild.afk_channel.name} (${msg.guild.afk_channel.id})` + '```'})
      }
      var embed = {
        author: {name: `Information requested by ${msg.author.username}`},
        timestamp: new Date(),
        color: 0x3498db,
        fields: field,
        footer: {text: `Online for ${started}`, icon_url: bot.User.avatarURL}
      }
      if (msg.guild.icon) {
        embed.thumbnail = {url: msg.guild.iconURL}
        embed.url = msg.guild.iconURL
      }
      msg.channel.sendMessage('', false, embed)
    } else {
      msg.channel.sendMessage("You can't do that in a DM, dummy!")
    }
  }
})
