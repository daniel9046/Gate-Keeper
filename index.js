
const Client = require("./Client");
global.roomClients = [];
const clientMPP = undefined;
const firstPart = "Gate Keeper";
const trusteds = [
	"ead940199c7d9717e5149919", //Hri7566
	"b8e8694638387d339340b6bc", //daniel9046
	"3f9996701728f236bd8cddee", //tsunami
	"a41651bf8a46bafc5548dad6", //Lapis
	"8956941e9807fc3991035dcf", //someone8448
	"e31fa53f49bd0395b9ae8015", //James(mod)
]
listCommandUsed = Date.now();
let ownerUser = {
	username: "Anonygold",
	discriminator: "9668"
};
const numberFormatter = Intl.NumberFormat("en-US", {
	maximumFractionDigits: 3,
	minimumFractionDigits: 0
});

function getRooms() {
	return new Promise(function (resolve, reject) {
		if (typeof global.roomClients[0] == "undefined") {
			global.roomClients[0].once("ls", msg => {
				resolve(msg.u);
				global.roomClients[0].sendArray([{
					m: "-ls"
				}]);
			});
			global.roomClients[0].sendArray([{
				m: "+ls"
			}]);
		} else {
			global.roomClients[0].once("ls", msg => {
				resolve(msg.u);
				global.roomClients[0].sendArray([{
					m: "-ls"
				}]);
			});
			global.roomClients[0].sendArray([{
				m: "+ls"
			}]);
		}
	});
}

let goodUsers = ["ead940199c7d9717e5149919","b8e8694638387d339340b6bc"],
	badUsers = [];
function changeCrownID(thisclientname, thiscrownid) {
	try {
		global.roomClients[thisclientname].roomOwnerIds = thiscrownid;
	} catch (err) {
		console.log(
			'Error: Unable to change crown ID for client named "' +
			thisclientname +
			'"'
		);
		return false;
	}
}

function changeRoom(thisclientname, thisroom) {
	try {
		global.roomClients[thisclientname].currentRoom = thisroom;
	} catch (err) {
		console.log(
			'Error: Unable to change a room for client named "' + thisclientname + '"'
		);
		return false;
	}
}

function addToBadUsers(_id) {
	global.roomClients.forEach(client => client.autoBanIds.push(_id));
}

function addToAutoBan(_id) {
	global.roomClients.forEach(client => client.autoBanIds.push(_id));
}

function addToAutoBanArray(_id) {
	global.roomClients.forEach(client => client.autoBanIds.push(_id));
}

function makeRoom(
	name,
	server,
	proxy,
	nick,
	roomOwnerIdArray,
	commandsAllowed,
	autoBanArray,
	visible,
	set,
	pBan_IDs,
	pBanIntervalTime,
	realTrusted,
	voteLocked
) {
	let thisClient = new Client(server, proxy);
	thisClient.currentRoom = name;
	thisClient.roomOwnerIds = roomOwnerIdArray;
	thisClient.realTrusted = realTrusted;
	thisClient.autoBanIds = autoBanArray;
	thisClient.autoBan = mode == "MPP";
	if ((proxy || "").endsWith("#s")) {
		const thisClientStartC = thisClient.start.bind(thisClient);
		thisClient.start = () => {
			const p = thisClient.proxy.replace("#s", "");
			if (!thisClient.isConnected() && Math.random() > .8) fetch('https://www.multiplayerpiano.com/', {agent: p ? p.startsWith("socks") ? new socksProxyAgent(p) : new proxyAgent(p) : undefined, headers: {"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36"}}).then(() => {}).catch(e => console.log(p + ": HTTP " + (e || {}).message));
			thisClientStartC();
		};
	}
    thisClient.on("hi", () => {
        console.log("Hi")
    })
	thisClient.onerror = thisClient.start;
	thisClient.theInterval = setInterval(() => {
		if (!thisClient.isConnected()) thisClient.start();
		/*if (
		  !thisClient.channel ||
		  thisClient.channel._id !== thisClient.currentRoom
		)*/
		if (
			!thisClient.channel ||
			thisClient.channel._id !== thisClient.currentRoom
		)
			thisClient.setChannel(thisClient.currentRoom, {
				visible: visible
			});
		thisClient.setName(nick);
		/*if (!thisClient.isOwner()) {
		  try {
		    if (thisClient.channel) if (thisClient.channel.crown !== null && !thisClient.channel.settings.lobby) if (typeof thisClient.channel.crown.participantId !== "string") thisClient.sendArray([{ m: "chown", id: thisClient.getOwnParticipant().id }]);
		  } catch (e) {}
		}*/
		/*console.log(thisClient.currentRoom + ': ' + !thisClient.channel);
		console.log(thisClient.currentRoom + ': ' + !thisClient.isOwner());*/
	}, 16);
	thisClient.theInterval2 = setInterval(() => {
		if (typeof thisClient.autoBanIds == "object" && thisClient.isOwner()) {
			if (thisClient.autoBan) Object.keys(thisClient.ppl).every(key => {
				if (thisClient.autoBanIds) {
					if (thisClient.autoBanIds.indexOf(thisClient.ppl[key]._id) > -1) {
						thisClient.kickBan(thisClient.ppl[key]._id, 3.6e6);
						if (name == rpRoomName) {
							try {
								if (qhyClients.find(cc => cc.desiredChannelId == rpRoomName).isConnected()) if (typeof thisClient.channel.crown == "undefined" ? false : thisClient.channel.crown.userId == thisClient.getOwnParticipant()._id) thisClient.chown(qhyClients.find(cc => cc.desiredChannelId == rpRoomName).getOwnParticipant().id);
							} catch (e) {
								console.log(e);
							}
						}
						return false;
						//thisClient.sendArray([{m: "chown", id: thisClient.getRoomKeeper2().length > 0 ? thisClient.getRoomKeeper2()[0].id : thisClient.getOwnParticipant().id}]);
					}
				}
				return true;
				/*if (thisClient.ppl[key]._id == "0e59460b1fa78b54520d2f1f" && nick == "Gate Keeper² [++help]" && Math.random() > .7) thisClient.sendArray([
				  { m: "chown", id: thisClient.ppl[key].id }
				]);*/
			});
		}
	}, 1000);
	/*setInterval(() => {
	  for (let i = 0; i < pBan_IDs; i++) {
	    setTimeout(() => thisClient.kickBan(pBan_IDs[0], 3.6e6), i * 1000);
	  }
	}, pBanIntervalTime || 3.3e+6);*/
	if (mode == "MPP") thisClient.on("ch", msg => {
		if (msg.ch.crown) {
			setTimeout(() => thisClient.chown(thisClient.getOwnParticipant().id), msg.ch.crown.participantId == thisClient.getOwnParticipant().id ? 3000 : (msg.ch.crown.time + 15000 - thisClient.serverTimeOffset - thisClient.avgPing) - Date.now());
		}
	});
	/*const autoBanDataHarvester = part => {
	  if (part.name.includes("Data Harvester") || part.name.endsWith(" /info")) {
	    thisClient.kickBan(part._id, 3.6e6);
	    if (typeof thisClient.autoBanIds == "object") thisClient.autoBanIds.push(part._id);
	    if (typeof dataHarvester_IDs == "object") dataHarvester_IDs.push(part._id);
	    if (typeof pBan_IDs == "object") pBan_IDs.push(part._id);
	    //if (mode == "MPP") discordSend(part.name, gatewayChannel);
	  }
	};
	thisClient.on("participant added", autoBanDataHarvester);
	thisClient.on("participant removed", autoBanDataHarvester);
	thisClient.on("participant update", autoBanDataHarvester);*/
	thisClient.on("hi", () => setInterval(() => {
		if (thisClient.isConnected()) thisClient.setChannel(thisClient.currentRoom, {
			visible: typeof visible == "boolean" ? visible : true
		});
	}, 1000));
	/*setInterval(() =>
	  if (!thisClient.channel) thisClient.start();
	}), 5000);*/
	let ownerId,
		crownInterval = -1;
	let colorInterval = -1;
	thisClient.start();
	thisClient.setColor = input => {
		if (colorInterval < 0) {
			clearInterval(colorInterval);
			thisClient.say(
				`Changing this room\'s color to ${input.split(" ")[1]}${
          (input.split(" ")[2] || "").startsWith("#")
            ? " and " + input.split(" ")[2]
            : ""
        }.`
			);
			let settings = {
				visible: thisClient.channel.settings.visible,
				chat: thisClient.channel.settings.chat,
				crownsolo: thisClient.channel.settings.crownsolo,
				color: input.split(" ")[1].length < 5 ? input.split(" ")[1].replace(/(?=([0-9a-f]))/g, "$1") : input.split(" ")[1]
			};
			if ((input.split(" ")[2] || "").startsWith("#"))
				settings.color2 = input.split(" ")[2].length < 5 ? input.split(" ")[2].replace(/(?=([0-9a-f]))/g, "$1") : input.split(" ")[2];
			colorInterval = setInterval(
				() => thisClient.sendArray([{
					m: "chset",
					set: settings
				}]),
				1
			);
			setTimeout(() => {
				clearInterval(colorInterval);
			}, 2500);
			setTimeout(() => {
				colorInterval = -1;
			}, 10000);
		} else thisClient.say("Try again later.");
	};
	thisClient.giveCrownToOwner = id => {
		if (crownInterval < 0) {
			thisClient.say("Giving crown to you.");
			ownerId = id;
			crownInterval = setInterval(
				() => thisClient.sendArray([{
					m: "chown",
					id: ownerId
				}]),
				1
			);
			setTimeout(() => {
				clearInterval(crownInterval);
				crownInterval = -1;
			}, 5000);
		}
	};
	thisClient.giveCrownToSomeone = id => {
		if (crownInterval < 0) {
			thisClient.say("Giving crown to the user _ID " + id + ".");
			ownerId = id;
			crownInterval = setInterval(
				() => thisClient.sendArray([{
					m: "chown",
					id: ownerId
				}]),
				1
			);
			setTimeout(() => {
				clearInterval(crownInterval);
				crownInterval = -1;
			}, 5000);
		}
	};
	if (thisClient.autoBan)
		if (thisClient.autoBanIds !== null) {
			if (thisClient.autoBanIds.length > 0) {
				/*thisClient.on("p", msg => {
      if (thisClient.autoBanIds.includes(msg._id))
        thisClient.kickBan(msg._id, 3.6e6);
		if (name == rpRoomName) {
			try {
				if (qhyClients.find(cc => cc.desiredChannelId == rpRoomName).isConnected()) thisClient.chown(qhyClients.find(cc => cc.desiredChannelId == rpRoomName).getOwnParticipant().id);
			} catch (e) {
				console.log(e);
			}
		}
      });*/
			}
		}
	thisClient.info_ID = function (search) {
		let array = [];
		for (let i in thisClient.ppl) {
			if (thisClient.ppl[i]._id.indexOf(search) !== -1) {
				array.push(thisClient.ppl[i]);
			}
		}
		return array;
	}
	thisClient.info = function (search) {
		let array = [];
		for (let i in thisClient.ppl) {
			if (thisClient.ppl[i].name.indexOf(search) !== -1) {
				array.push(thisClient.ppl[i]);
			}
		}
		return array;
	}
	thisClient.getRoomKeeper2 = () => {
		let array = [];
		for (let i in thisClient.ppl) {
			if (thisClient.ppl[i].name == "Gate Keeper² [++help]" && +thisClient.ppl[i].x == 200 && +thisClient.ppl[i].y == 100) array.push(thisClient.ppl[i]);
		}
		return array;
	}
	if (commandsAllowed) {
		thisClient.voteKickUsers = {};
		thisClient.voteBanUsers = {};
		thisClient.voteLocked = voteLocked;
		thisClient.colorLocked = false;
		thisClient.on("a", async msg => {
			let args = msg.a.split(" ");
			let _idRegex = msg.p._id
			let cmd = args[0].toLowerCase();
			let input = msg.a.substring(cmd.length).trim();
			let __goodUsers = [thisClient.getOwnParticipant(), ...thisClient.getRoomKeeper2()];
			if (__goodUsers[__goodUsers.length - 1] == null) __goodUsers.pop();
			let _goodUsers = [...roomOwnerIdArray, ...__goodUsers.map(ppl => ppl._id), msg.p._id];
			if (badUsers.includes(msg.p._id)) return;
			if (msg.p._id !== thisClient.getOwnParticipant()._id) {
				if (
					thisClient.roomOwnerIds.indexOf(msg.p._id) < 0 &&
					(msg.p.name !== "ew")
				) {
					if (msg.a.startsWith("++help"))
						thisClient.say(
							"Commands are: ++help, ++about, ++total, ++id" +
							(thisClient.isOwner() ? ", ++votekick, ++voteban, ++roomcolor. Trusted commands are: ++votelock, ++roomcolorlock, ++unban, ++kickban, ++nocussing, ++visibility, ++gksay, ++autobanner." : ". Trusted commands are: ++votelock, ++roomcolorlock, ++gksay, ++autobanner.")
						);
					else if (msg.a.startsWith("++votekick") && thisClient.isOwner()) {
						console.log(input);
						if (thisClient.voteLocked) {
							thisClient.say('Sorry, but this command is disabled right now.');
							return;
						}
						if (typeof input == "string" && input.length > 0) {
							let targetUsers = [thisClient.ppl[input]]
							if (targetUsers.length < 1 && _idRegex.test(input)) targetUsers.push({
								_id: input
							});
							let targetUser = randomArray(targetUsers);
							/*if (targetUsers.length > 1 && _goodUsers.includes(targetUser._id)) do targetUser = randomArray(targetUsers); while (!_goodUsers.includes(targetUser._id)); else if (targetUsers.length < 2 && **/
							if (targetUser == undefined) thisClient.say("This user doesn't exist.");
							else if (_goodUsers.includes(targetUser._id)) thisClient.say(`Sorry, but you can't vote this user (${targetUser.name}) to get kicked.`);
							else {
								let target_id = typeof targetUser == "object" ? targetUser._id : "-1";
								if (typeof thisClient.voteKickUsers[target_id] == "undefined") thisClient.voteKickUsers[target_id] = {
									_ids: [],
									maxCount: 3 + Math.floor(thisClient.channel.count / 10.5)
								};
								if (thisClient.voteKickUsers[target_id].maxCount < 0) thisClient.voteKickUsers[target_id].maxCount = 3 + Math.floor(thisClient.channel.count / 10.5);
								console.log(_goodUsers);
								if (thisClient.voteKickUsers[target_id]._ids.includes(msg.p._id)) {
									let moreNeeded = thisClient.voteKickUsers[target_id].maxCount - thisClient.voteKickUsers[target_id]._ids.length;
									thisClient.say(`Sorry, but you have voted to kick this user (${targetUser.name}) already. ${moreNeeded} more user${moreNeeded == 1 ? "" : "s"} needed to get this user kicked.`);
								} else {
									thisClient.voteKickUsers[target_id]._ids.push(msg.p._id);
									let moreNeeded = thisClient.voteKickUsers[target_id].maxCount - thisClient.voteKickUsers[target_id]._ids.length;
									thisClient.say(`You have voted to get this user (${targetUser.name}) kicked from this room. ${moreNeeded} more user${moreNeeded == 1 ? "" : "s"} needed to get this user kicked.`);
									if (thisClient.voteKickUsers[target_id]._ids.length > thisClient.voteKickUsers[target_id].maxCount - 1) {
										thisClient.voteKickUsers[target_id]._ids = [];
										thisClient.voteKickUsers[target_id].maxCount = -1;
										let inte = setInterval(() => thisClient.kickBan(target_id, 0), 50);
										setTimeout(() => clearInterval(inte), 5000);
									}
								}
							}
						} else thisClient.say("Usage: ++votekick [User name or User _ID]");
					} else
						/*if (msg.a.startsWith("++getcrown") && thisClient.isOwner()) {
			if (thisClient.realTrusted.includes(msg.p._id)) {
				thisClient.giveCrownToOwner(msg.p._id);
			} else thisClient.say("Only trusted users who don't keep the crown in theirs for a long time take the crown.");
		} else */
						if ((msg.a.startsWith("++kickban") || msg.a.startsWith("++ban60") || msg.a.startsWith("++nocussing") || msg.a.startsWith("++visibility") || msg.a.startsWith("++unban") || msg.a.startsWith("++gksay") || msg.a.startsWith("++votelock") || msg.a.startsWith("++getcrown") || msg.a.startsWith("++roomcolorlock") || msg.a.startsWith("++autobanner")) && thisClient.isOwner()) thisClient.say("Sorry, but you need to be a trusted person.");
						else if (msg.a.startsWith("++voteban") && thisClient.isOwner()) {
						console.log(input);
						if (thisClient.voteLocked) {
							thisClient.say('Sorry, but this command is disabled right now.');
							return;
						}
						if (typeof input == "string" && input.length > 0) {
							let targetUsers = [thisClient.ppl[input]]
							if (targetUsers.length < 1 && _idRegex.test(input)) targetUsers.push({
								_id: input
							});
							let targetUser = randomArray(targetUsers);
							/*if (targetUsers.length > 1 && _goodUsers.includes(targetUser._id)) do targetUser = randomArray(targetUsers); while (!_goodUsers.includes(targetUser._id)); else if (targetUsers.length < 2 && */
							if (targetUser == undefined) thisClient.say("This user doesn't exist.");
							else if (_goodUsers.includes(targetUser._id)) thisClient.say(`Sorry, but you can't vote this user (${targetUser.name}) to get banned for 60 minutes.`);
							else {
								let target_id = typeof targetUser == "object" ? targetUser._id : "-1";
								if (typeof thisClient.voteBanUsers[target_id] == "undefined") thisClient.voteBanUsers[target_id] = {
									_ids: [],
									maxCount: 3 + Math.floor(thisClient.channel.count / 7.5)
								};
								if (thisClient.voteBanUsers[target_id].maxCount < 0) thisClient.voteBanUsers[target_id].maxCount = 3 + Math.floor(thisClient.channel.count / 7.5);
								if (thisClient.voteBanUsers[target_id]._ids.includes(msg.p._id)) {
									let moreNeeded = thisClient.voteBanUsers[target_id].maxCount - thisClient.voteBanUsers[target_id]._ids.length;
									thisClient.say(`Sorry, but you have voted to ban this user (${targetUser.name}) already. ${moreNeeded} more user${moreNeeded == 1 ? "" : "s"} needed to get this user banned for 60 minutes.`);
								} else {
									thisClient.voteBanUsers[target_id]._ids.push(msg.p._id);
									let moreNeeded = thisClient.voteBanUsers[target_id].maxCount - thisClient.voteBanUsers[target_id]._ids.length;
									thisClient.say(`You have voted to get this user (${targetUser.name}) banned from this room. ${moreNeeded} more user${moreNeeded == 1 ? "" : "s"} needed to get this user banned for 60 minutes.`);
									if (thisClient.voteBanUsers[target_id]._ids.length > thisClient.voteBanUsers[target_id].maxCount - 1) {
										thisClient.voteBanUsers[target_id]._ids = [];
										thisClient.voteBanUsers[target_id].maxCount = -1;
										let inte = setInterval(() => thisClient.kickBan(target_id, 3.6e6), 50);
										setTimeout(() => clearInterval(inte), 5000);
									}
									console.log(thisClient.voteBanUsers[target_id]);
								}
							}
						} else thisClient.say("Usage: ++voteban [User name or User _ID]");
					} else if (msg.a.startsWith("++id")) {
						thisClient.say("Your _id is: "+msg.p._id)
					} else if (msg.a.startsWith("++total")) {
						if (listCommandUsed > Date.now()) {
							thisClient.say(`After ${Math.floor((listCommandUsed - Date.now()) / 1000)} seconds. you can use this command.`);
							return;
						}
						listCommandUsed = Date.now() + 60_000;
						//console.log("total");
						let ls = await getRooms();
						//console.log(ls);
						let counter = 0;
						let roomLength = 0;
						let users = [];
						ls.forEach(room => {
							counter += room.count;
							roomLength++;
							if (typeof room.crown == "object") {
								if (users.map(ppl => ppl._id).indexOf(room.crown.userId) > -1) {
									users.forEach(user => {
										if (user._id == room.crown.userId) user.ownedRooms++;
									});
								} else users.push({
									"_id": room.crown.userId,
									"ownedRooms": 1
								});
							}
						});
						let ownedMostRooms = users.sort((a, b) => parseFloat(b.ownedRooms) - parseFloat(a.ownedRooms));
						thisClient.say(
							`Multiplayer Piano: ${numberFormatter.format(counter)} users online on ${numberFormatter.format(roomLength)} public room${
              roomLength > 1 ? "s" : ""
            }. Users in MPP who owned the most rooms: 1st - _ID: ${ownedMostRooms[0] ? ownedMostRooms[0]._id : "Unknown"}, ${numberFormatter.format(ownedMostRooms[0].ownedRooms)} room${ownedMostRooms[0].ownedRooms > 1 ? "s" : ""}, 2nd - _ID: ${ownedMostRooms[1]._id}, ${numberFormatter.format(ownedMostRooms[1].ownedRooms)} room${ownedMostRooms[1].ownedRooms > 1 ? "s" : ""}, 3rd - _ID: ${ownedMostRooms[2]._id}, ${numberFormatter.format(ownedMostRooms[2].ownedRooms)} room${ownedMostRooms[2].ownedRooms > 1 ? "s" : ""}.`
						);
					} else if (msg.a.startsWith("++about")) {
						/*let roomKeeper2Result = await fetch("https://saved-desert.glitch.me/get_id", {
						  method: "GET"
						})
						  .then(handleErrors)
						  .then(response => response.text())
						  .catch(() => "unknown");*/
						/*const roomKeeper2Result = {
							_id: "no"
						};*/
						thisClient.say(
							`This bot is made by ${ownerUser.username}#${ownerUser.discriminator}. Made with Node.js. ${firstPart.split(" ")[0]}'s real _ID: 0f1115e5db841f84ecd397c8. If you see Gate Keepers taking over test/awkward, DJDan is doing it. This bot won't ban anyone (except retarded people.) until someone else has the crown.`
						);
						/*thisClient.say(
							`This bot is made by ${ownerUser.username}#${ownerUser.discriminator}. Made with Node.js. ${firstPart.split(" ")[0]}'s real _ID: ${
              typeof clientMPP == "object"
                ? global.clientMPP.getOwnParticipant()._id
                : "c0395e788c75d0e2de4d10fd"
            }, Gate Keeper²'s real _ID: ${roomKeeper2Result._id}. Don't worry, this bot won't ban anyone (except retarded people.) until someone else has the crown.`
						);*/
					} else if (msg.a.startsWith("++roomcolor") && !msg.a.startsWith("++roomcolorlock") && thisClient.isOwner()) {
						if (thisClient.colorLocked) {
							thisClient.say('Sorry, but this command is disabled right now.');
							return;
						}
						if ((msg.a.split(" ")[1] || "").startsWith("#")) {
							thisClient.setColor(msg.a);
							/*thisClient.say(
							  `this command is broken) Changing this room\'s color to ${msg.a.split(" ")[1]}${
							    (msg.a.split(" ")[2] || "").startsWith("#")
							      ? " and " + msg.a.split(" ")[2]
							      : ""
							  }.`
							);
							let settings = {
							  visible: thisClient.channel.settings.visible,
							  chat: thisClient.channel.settings.chat,
							  crownsolo: thisClient.channel.settings.crownsolo,
							  color: msg.a.split(" ")[1]
							};
							if ((msg.a.split(" ")[2] || "").startsWith("#"))
							  settings.color2 = msg.a.split(" ")[2];
							thisClient.sendArray([{ m: "chset", set: settings }]);*/
						} else thisClient.say("Usage: ++roomcolor [hex color]");
					} else if (msg.a.startsWith("++realids")) {
						thisClient.say(roomClients.map(c => c.getOwnParticipant()._id).filter(a => a !== "").join(", "));
					}
				} else {
					if (msg.a.startsWith("++help"))
						thisClient.say(
							"Commands are: ++help, ++about, ++total" +
							(thisClient.isOwner() ? ", ++votekick, ++voteban, ++roomcolor. Trusted commands are: ++votelock, ++roomcolorlock, ++unban, ++kickban, ++gksay, ++autobanner." : ". Trusted commands are: ++votelock, ++roomcolorlock, ++gksay, ++autobanner.")
						);
					else if (msg.a.startsWith("++votekick") && thisClient.isOwner()) {
						console.log(input);
						if (thisClient.voteLocked) {
							thisClient.say('Sorry, but this command is disabled right now.');
							return;
						}
						if (typeof input == "string" && input.length > 0) {
							let targetUsers = [thisClient.ppl[input]]
							if (targetUsers.length < 1 && _idRegex.test(input)) targetUsers.push({
								_id: input
							});
							let targetUser = randomArray(targetUsers);
							/*if (targetUsers.length > 1 && _goodUsers.includes(targetUser._id)) do targetUser = randomArray(targetUsers); while (!_goodUsers.includes(targetUser._id)); else if (targetUsers.length < 2 && **/
							if (targetUser == undefined) thisClient.say("This user doesn't exist.");
							else if (_goodUsers.includes(targetUser._id)) thisClient.say(`Sorry, but you can't vote this user (${targetUser.name}) to get kicked.`);
							else {
								let target_id = typeof targetUser == "object" ? targetUser._id : "-1";
								if (typeof thisClient.voteKickUsers[target_id] == "undefined") thisClient.voteKickUsers[target_id] = {
									_ids: [],
									maxCount: 3 + Math.floor(thisClient.channel.count / 10.5)
								};
								if (thisClient.voteKickUsers[target_id].maxCount < 0) thisClient.voteKickUsers[target_id].maxCount = 3 + Math.floor(thisClient.channel.count / 10.5);
								console.log(_goodUsers);
								if (thisClient.voteKickUsers[target_id]._ids.includes(msg.p._id)) {
									let moreNeeded = thisClient.voteKickUsers[target_id].maxCount - thisClient.voteKickUsers[target_id]._ids.length;
									thisClient.say(`Sorry, but you have voted to kick this user (${targetUser.name}) already. ${moreNeeded} more user${moreNeeded == 1 ? "" : "s"} needed to get this user kicked.`);
								} else {
									thisClient.voteKickUsers[target_id]._ids.push(msg.p._id);
									let moreNeeded = thisClient.voteKickUsers[target_id].maxCount - thisClient.voteKickUsers[target_id]._ids.length;
									thisClient.say(`You have voted to get this user (${targetUser.name}) kicked from this room. ${moreNeeded} more user${moreNeeded == 1 ? "" : "s"} needed to get this user kicked.`);
									if (thisClient.voteKickUsers[target_id]._ids.length > thisClient.voteKickUsers[target_id].maxCount - 1) {
										thisClient.voteKickUsers[target_id]._ids = [];
										thisClient.voteKickUsers[target_id].maxCount = -1;
										let inte = setInterval(() => thisClient.kickBan(target_id, 0), 50);
										setTimeout(() => clearInterval(inte), 5000);
									}
								}
							}
						} else thisClient.say("Usage: ++votekick [User name or User _ID]");
					} else if (msg.a.startsWith("++voteban") && thisClient.isOwner()) {
						console.log(input);
						if (thisClient.voteLocked) {
							thisClient.say('Sorry, but this command is disabled right now.');
							return;
						}
						if (typeof input == "string" && input.length > 0) {
							let targetUsers = [thisClient.ppl[input]]
							let targetUser = thisClient.ppl[input];
							/*if (targetUsers.length > 1 && _goodUsers.includes(targetUser._id)) do targetUser = randomArray(targetUsers); while (!_goodUsers.includes(targetUser._id)); else if (targetUsers.length < 2 && */
							if (targetUser == undefined) thisClient.say("This user doesn't exist.");
							else if (_goodUsers.includes(targetUser._id)) thisClient.say(`Sorry, but you can't vote this user (${targetUser.name}) to get banned for 60 minutes.`);
							else {
								let target_id = typeof targetUser == "object" ? targetUser._id : "-1";
								if (typeof thisClient.voteBanUsers[target_id] == "undefined") thisClient.voteBanUsers[target_id] = {
									_ids: [],
									maxCount: 3 + Math.floor(thisClient.channel.count / 7.5)
								};
								if (thisClient.voteBanUsers[target_id].maxCount < 0) thisClient.voteBanUsers[target_id].maxCount = 3 + Math.floor(thisClient.channel.count / 7.5);
								if (thisClient.voteBanUsers[target_id]._ids.includes(msg.p._id)) {
									let moreNeeded = thisClient.voteBanUsers[target_id].maxCount - thisClient.voteBanUsers[target_id]._ids.length;
									thisClient.say(`Sorry, but you have voted to ban this user (${targetUser.name}) already. ${moreNeeded} more user${moreNeeded == 1 ? "" : "s"} needed to get this user banned for 60 minutes.`);
								} else {
									thisClient.voteBanUsers[target_id]._ids.push(msg.p._id);
									let moreNeeded = thisClient.voteBanUsers[target_id].maxCount - thisClient.voteBanUsers[target_id]._ids.length;
									thisClient.say(`You have voted to get this user (${targetUser.name}) banned from this room. ${moreNeeded} more user${moreNeeded == 1 ? "" : "s"} needed to get this user banned for 60 minutes.`);
									if (thisClient.voteBanUsers[target_id]._ids.length > thisClient.voteBanUsers[target_id].maxCount - 1) {
										thisClient.voteBanUsers[target_id]._ids = [];
										thisClient.voteBanUsers[target_id].maxCount = -1;
										let inte = setInterval(() => thisClient.kickBan(target_id, 3.6e6), 50);
										setTimeout(() => clearInterval(inte), 5000);
									}
									console.log(thisClient.voteBanUsers[target_id]);
								}
							}
						} else thisClient.say("Usage: ++voteban [User name or User _ID]");
					} else if (msg.a.startsWith("++total")) {
						if (listCommandUsed > Date.now()) {
							thisClient.say(`After ${Math.floor((listCommandUsed - Date.now()) / 1000)} seconds. you can use this command.`);
							return;
						}
						listCommandUsed = Date.now() + 60_000;
						let ls = await getRooms();
						let counter = 0;
						let roomLength = 0;
						let users = [];
						ls.forEach(room => {
							counter += room.count;
							roomLength++;
							if (typeof room.crown == "object") {
								if (users.map(ppl => ppl._id).indexOf(room.crown.userId) > -1) {
									users.forEach(user => {
										if (user._id == room.crown.userId) user.ownedRooms++;
									});
								} else users.push({
									"_id": room.crown.userId,
									"ownedRooms": 1
								});
							}
						});
						let ownedMostRooms = users.sort((a, b) => parseFloat(b.ownedRooms) - parseFloat(a.ownedRooms));
						thisClient.say(
							`Multiplayer Piano: ${numberFormatter.format(counter)} users online on ${numberFormatter.format(roomLength)} public room${
              roomLength > 1 ? "s" : ""
            }. Users in MPP who owned the most rooms: 1st - _ID: ${ownedMostRooms[0]._id}, ${numberFormatter.format(ownedMostRooms[0].ownedRooms)} room${ownedMostRooms[0].ownedRooms > 1 ? "s" : ""}, 2nd - _ID: ${ownedMostRooms[1]._id}, ${numberFormatter.format(ownedMostRooms[1].ownedRooms)} room${ownedMostRooms[1].ownedRooms > 1 ? "s" : ""}, 3rd - _ID: ${ownedMostRooms[2]._id}, ${numberFormatter.format(ownedMostRooms[2].ownedRooms)} room${ownedMostRooms[2].ownedRooms > 1 ? "s" : ""}.`
						);
					} else if (msg.a.startsWith("++roomcolor") && !msg.a.startsWith("++roomcolorlock") && thisClient.isOwner()) {
						if (thisClient.colorLocked) {
							thisClient.say('Sorry, but this command is disabled right now.');
							return;
						}
						if ((msg.a.split(" ")[1] || "").startsWith("#")) {
							thisClient.setColor(msg.a);
							/*thisClient.say(
							  `this command is broken) Changing this room\'s color to ${msg.a.split(" ")[1]}${
							    (msg.a.split(" ")[2] || "").startsWith("#")
							      ? " and " + msg.a.split(" ")[2]
							      : ""
							  }.`
							);
							let settings = {
							  visible: thisClient.channel.settings.visible,
							  chat: thisClient.channel.settings.chat,
							  crownsolo: thisClient.channel.settings.crownsolo,
							  color: msg.a.split(" ")[1]
							};
							if ((msg.a.split(" ")[2] || "").startsWith("#"))
							  settings.color2 = msg.a.split(" ")[2];
							thisClient.sendArray([{ m: "chset", set: settings }]);*/
						} else thisClient.say("Usage: ++roomcolor [hex color]");
					} else if (msg.a.startsWith("++getcrown") && thisClient.isOwner())
						if (thisClient.realTrusted.includes(msg.p._id)) {
							thisClient.giveCrownToOwner(msg.p.id);
						} else thisClient.say("You're not allowed to take the crown.");
						//thisClient.giveCrownToOwner(msg.p.id);

						//thisClient.say("This command has been disabled for reasons.");
					else if (msg.a.startsWith("++about")) {
						/*let roomKeeper2Result = await fetch("https://saved-desert.glitch.me/get_id", {
						  method: "GET"
						})
						  .then(handleErrors)
						  .then(response => response.text())
						  .catch(() => "unknown");*/
						const roomKeeper2Result = {
							_id: "no"
						};
						thisClient.say(
							`This bot is made by ${ownerUser.username}#${ownerUser.discriminator}. Made with Node.js. ${firstPart.split(" ")[0]}'s real _ID: ${
              typeof clientMPP == "object"
                ? global.clientMPP.getOwnParticipant()._id
                : [...new Set(qhyClients.map(c => c.getOwnParticipant()._id))].filter(d => d !== "")
            }. If you see Gate Keepers taking over test/awkward, DJDan is doing it. This bot won't ban anyone (except retarded people.) until someone else has the crown.`
						);
						/*thisClient.say(
							`This bot is made by ${ownerUser.username}#${ownerUser.discriminator}. Made with Node.js. ${firstPart.split(" ")[0]}'s real _ID: ${
              typeof clientMPP == "object"
                ? clientMPP.getOwnParticipant()._id
                : "6fe3d3429a4b988d8dec86d4"
            }, Gate Keeper²'s real _ID: ${roomKeeper2Result._id}. Don't worry, this bot won't ban anyone (except retarded people.) until someone else has the crown.`
						);*/
					} else if (msg.a.startsWith("++crownto") && thisClient.isOwner()) {
						if (input.length < 1) {
							thisClient.say("Usage: ++crownto [user id]");
						} else if (msg.a.split(" ")[1]) {
							thisClient.giveCrownToSomeone(msg.a.split(" ")[1]);
						}
					} else if (msg.a.startsWith("++unban") && thisClient.isOwner()) {
						if (input.length < 1) {
							thisClient.say("Usage: ++unban [user _id]");
						} else if (msg.a.split(" ")[1]) {
							thisClient.sendArray([{
								m: "unban",
								_id: msg.a.split(" ")[1]
							}]);
							thisClient.say("Possibly unbanned.")
						}
					} else if (msg.a.startsWith("++ban60") && thisClient.isOwner()) {
						if (input.length < 1) {
							thisClient.say("Usage: ++ban60 [user _id]");
						} else if (msg.a.split(" ")[1]) {
							if (_goodUsers.includes(msg.a.split(" ")[1])) thisClient.say("no");
							else thisClient.kickBan(msg.a.split(" ")[1], 36e5);
						}
					} else if (msg.a.startsWith("++kickban") && thisClient.isOwner()) {
						if (input.length < 1) {
							thisClient.say("Usage: ++kickban [minutes*] [_id's...] *0 for kick");
						} else if (msg.a.split(" ")[1]) {
							let _ids = input.split(" ");
							const ms = _ids.shift() * 60 * 1000;
							_ids.map((_id, nid) => {
								setTimeout(() => {
									if (_goodUsers.includes(_id.toLowerCase())) thisClient.say(thisClient.ppl[_id].name + " can't be banned.");
									else thisClient.kickBan(_id.toLowerCase(), ms);
								}, nid * 1050);
							});
						}
					} else if (msg.a.startsWith("++nocussing") && thisClient.isOwner()) {
						thisClient.sendArray([{
							m: "chset",
							set: {
								"no cussing": !thisClient.channel.settings["no cussing"]
							}
						}]);
					} else if (msg.a.startsWith("++visibility") && thisClient.isOwner()) {
						thisClient.sendArray([{
							m: "chset",
							set: {
								"visible": !thisClient.channel.settings["visible"]
							}
						}]);
					} else if (msg.a.startsWith("++autobanner")) {
						thisClient.say(`${thisClient.autoBan ? "Dis" : "En"}abled autobanner.`);
						thisClient.autoBan = !thisClient.autoBan;
					} else if (msg.a.startsWith("++votelock")) {
						thisClient.say(`${thisClient.voteLocked ? "En" : "Dis"}abled ++votekick and ++voteban command.`);
						thisClient.voteLocked = !thisClient.voteLocked;
					} else if (msg.a.startsWith("++roomcolorlock")) {
						thisClient.say(`${thisClient.colorLocked ? "En" : "Dis"}abled ++roomcolor command.`);
						thisClient.colorLocked = !thisClient.colorLocked;
					} else if (msg.a.startsWith("++gksay")) {
						if (input.length < 1) {
							thisClient.say("Usage: ++gksay [text]");
						} else if (msg.a.split(" ")[1]) {
							thisClient.say("\u034f" + input);
						}
					} else if (msg.a.startsWith("++realids")) {
						thisClient.say(roomClients.map(c => c.getOwnParticipant()._id).filter(a => a !== "").join(", "));
					}
				}
				if (msg.a.startsWith("++trusted")) thisClient.say(`You're ${thisClient.roomOwnerIds.indexOf(msg.p._id) < 0 ? "not " : ""}trusted.`);
			}
		});
	}
	thisClient.start();
	if (!set) global.roomClients.push(thisClient);
}
mode = "MPP";
let rpRoomName = "\u2727\u{1D4E1}\u{1D4DF} \u{1D4E1}\u{1D4F8}\u{1D4F8}\u{1D4F6}\u2727";
var rooms = [
	rpRoomName,
	" 🌷🌸Tsu here <3🌸🌷",
	"Daniel9046's Room",
	"You Will Regret This (-1)⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀/spin",
	"Furries of MPP",
	"test/⠀⠀⠀⠀-=-=-=-Nou-=-=-=-"
]

rooms.forEach(r => {
	makeRoom(
		r,
		"wss://mppclone.tk",
		"",
		"Gate Keeper [++help]",
		trusteds,
		mode == "MPP" || mode == "ROOM_KEEPER",
		[],
		true,
		false,
		[],
		2.76e+6,
		trusteds,
		false
	);
})