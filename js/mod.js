let modInfo = {
	name: "The Prestige Tree: Wilted",
	id: "tptwilt",
	author: "micro",
	pointsName: "points",
	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal(10), // Used for hard resets and new players
	
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0.2",
	name: "ew choice :vomiting_face:",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0.1</h3><br>
		- the tree exists now<br>
		- added stuff until 2 infinities<br>
		- next up: hmm<br>
	<h3>v0.0.2</h3><br>
		- layer 3 exists now<br>
		- added stuff until 3 infinities<br>
		- next up: get hindered<br>`

let winText = `youre done pog`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return player.p.upgrades.includes(11)
}

// Calculate points/sec!
function getPointGen() {
	if (!canGenPoints()) {return new Decimal(0)}
	let gain = new Decimal(1)
	if (player.inf.milestones.includes("0")) {gain = gain.mul(69420)}
	if (player.inf.milestones.includes("1")) {gain = gain.mul(69420)}
	if (player.inf.milestones.includes("2")) {gain = gain.mul(69420)}
	if (player.p.upgrades.includes(12)) {gain = gain.mul(tmp.p.upgrades[12].effect)}
	if (player.b.upgrades.includes(11)) {gain = gain.mul(tmp.b.effect)}
	if (player.p.upgrades.includes(24)) {gain = gain.mul(10)}
	if (player.b.upgrades.includes(12)) {gain = gain.mul(tmp.b.effect.mul(tmp.g.effect))}
	if (player.t.upgrades.includes(11)) {gain = gain.mul(1e69)}
	if (player.s.unlocked) {gain = gain.mul(tmp.s.effect[1])}
	if (player.s.upgrades.includes(14)) {gain = gain.mul(1e10)}

	if (player.g.upgrades.includes(14)) {gain = gain.pow(1.115)}
	if (player.g.upgrades.includes(25)) {gain = gain.pow(tmp.g.upgrades[25].effect)}
	if (player.inf.milestones.includes("0")) {gain = gain.pow(new Decimal(0.5).pow(player.inf.milestones.length))}
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.inf.points.gte(3)
}


// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(1) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}

function addAlignments() {
	player.l.law = new Decimal(1)
    player.l.chaos = new Decimal(1)
    player.l.good = new Decimal(1)
    player.l.evil = new Decimal(1)
	player.l.unlocked = true
}