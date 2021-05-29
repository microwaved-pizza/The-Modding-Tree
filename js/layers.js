addLayer("p", {
    name: "prestige",
    startData() {return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0)
    }},
    color: "#31aeb0",
    row: 0,
    resource: "prestige points",
    hotkeys: [
        {
            key: "p",
            description: "p: reset your points for prestige points",
            onPress() { if (player.p.unlocked && canReset("p")) {doReset("p")} }
        }
    ],
    symbol: "P",
    position: 0,
    type: "normal",
    baseResource: "points",
    baseAmount() {return player.points},
    requires: new Decimal(10),
    exponent() {
        let exp = new Decimal(0.5)
        if (player.g.upgrades.includes(13)) {exp = exp.add(0.06)}
        if (player.b.unlocked) {exp = exp.mul(tmp.b.effect)}
        if (player.b.upgrades.includes(13)) {exp = exp.mul(tmp.b.upgrades[13].effect)}
        if (player.t.unlocked) {exp = exp.mul(tmp.t.effect[2])}
        if (player.inf.milestones.includes("1")) {exp = exp.div(new Decimal(2).pow(player.inf.milestones.length))}
        if (player.inf.milestones.includes("2")) {exp = exp.pow(new Decimal(0.5).pow(player.inf.milestones.length))}
        return exp
    },
    doReset(layer) {
        if (layer === "b") {
            player.p.points = new Decimal(0)
            player.p.best = new Decimal(0)
            if (!(player.b.milestones.includes("0"))) {player.p.upgrades = []}
        }
        if (layer === "g") {
            player.p.points = new Decimal(0)
            player.p.best = new Decimal(0)
            if (!(player.t.milestones.includes("0")) && !(player.s.milestones.includes("0"))) {player.p.upgrades = []}
        }
        if (layer === "t") {
            player.p.points = new Decimal(0)
            player.p.best = new Decimal(0)
            if (!(player.t.milestones.includes("2"))) {player.p.upgrades = []}
        }
        if (layer === "s") {
            player.p.points = new Decimal(0)
            player.p.best = new Decimal(0)
            if (!(player.s.milestones.includes("2"))) {player.p.upgrades = []}
        }
        if (layer === "inf") {
            player.p.points = new Decimal(0)
            player.p.best = new Decimal(0)
            player.p.upgrades = []
        }
    },
    update(diff) {
        if (player.b.milestones.includes("0")) {
            let pow = new Decimal(0.01)
            if (player.t.upgrades.includes(14)) {pow = pow.add(0.9899)}
            if (player.e.upgrades.includes(15)) {pow = pow.add(1.0001)}
            if (player.p.upgrades.includes(31)) {pow = pow.mul(5)}
            if (player.p.upgrades.includes(32)) {pow = pow.mul(tmp.p.upgrades[32].effect)}
            if (player.p.upgrades.includes(33)) {pow = pow.mul(tmp.p.upgrades[33].effect)}
            if (player.p.upgrades.includes(34)) {pow = pow.mul(tmp.p.upgrades[34].effect)}
            if (player.p.upgrades.includes(35)) {pow = pow.mul(tmp.p.upgrades[35].effect)}
            if (player.b.upgrades.includes(21)) {pow = pow.mul(1.5)}
            if (player.b.upgrades.includes(22)) {pow = pow.mul(15)}
            if (player.b.upgrades.includes(23)) {pow = pow.mul(150)}
            if (player.b.upgrades.includes(24)) {pow = pow.mul(1500)}
            if (player.b.upgrades.includes(25)) {pow = pow.pow(15)}
            let gain = player.p.points.pow(pow)
            if (player.s.milestones.includes("3")) {gain = gain.max(1)}
            player.p.points = player.p.points.add(getResetGain("p").mul(gain.div(100)).mul(diff))
            if (player.p.points.gt(player.p.best)) {player.p.best = player.p.points}
        }
    },
    upgrades: {
        11: {
            fullDisplay() {
                return `<h3>Begin</h3><br>
                Generate 1 point per second.<br>
                Cost: 1 prestige point`
            },
            canAfford() {return player.p.points.gte(1)},
            pay() {player.p.points = player.p.points.sub(1)}
        },
        12: {
            fullDisplay() {
                return `<h3>Prestige Boost</h3><br>
                Prestige points boost point gain.<br>
                Cost: 1 prestige point<br>
                Currently: x${format(tmp.p.upgrades[12].effect, 2)}`
            },
            effect() {
                let base = player.p.points.add(10).log10()
                let pow = new Decimal(2)
                if (player.p.upgrades.includes(13)) {pow = pow.mul(2)}
                if (player.p.upgrades.includes(14)) {pow = pow.mul(2)}
                if (player.inf.milestones.includes("0")) {pow = pow.mul(2)}
                return base.pow(pow)
            },
            unlocked() {return player.p.upgrades.includes(11)},
            canAfford() {return player.p.points.gte(1)},
            pay() {player.p.points = player.p.points.sub(1)}
        },
        13: {
            fullDisplay() {
                return `<h3>Prestige Booster</h3><br>
                <h3>Prestige Boost</h3> is squared.<br>
                Cost: 5 prestige points`
            },
            unlocked() {return player.p.upgrades.includes(12)},
            canAfford() {return player.p.points.gte(5)},
            pay() {player.p.points = player.p.points.sub(5)}
        },
        14: {
            fullDisplay() {
                return `<h3>Prestige Boostest</h3><br>
                <h3>Prestige Boost</h3> is squared.<br>
                Cost: 10 prestige points`
            },
            unlocked() {return player.p.upgrades.includes(13)},
            canAfford() {return player.p.points.gte(10)},
            pay() {player.p.points = player.p.points.sub(10)}
        },
        15: {
            fullDisplay() {
                return `<h3>Booster Prestige</h3><br>
                Unlock boosters.<br>
                Cost: 1,000 prestige points`
            },
            unlocked() {return player.p.upgrades.includes(14)},
            canAfford() {return player.p.points.gte(1000)},
            pay() {player.p.points = player.p.points.sub(1000)}
        },
        21: {
            fullDisplay() {
                return `<h3>Booster Boost</h3><br>
                The booster effect boosts itself.<br>
                Cost: 1e150 prestige points<br>
                Currently: x${format(tmp.p.upgrades[21].effect, 2)}`
            },
            effect() {
                let base = tmp.b.effect.add(10).log10()
                if (player.p.upgrades.includes(22)) {base = base.mul(2)}
                if (player.p.upgrades.includes(23)) {base = base.mul(4)}
                return base
            },
            unlocked() {return player.b.upgrades.includes(11)},
            canAfford() {return player.p.points.gte(1e150)},
            pay() {player.p.points = player.p.points.sub(1e150)}
        },
        22: {
            fullDisplay() {
                return `<h3>Booster Booster</h3><br>
                <h3>Booster Boost</h3> is doubled.<br>
                Cost: 1e750 prestige points`
            },
            unlocked() {return player.p.upgrades.includes(21)},
            canAfford() {return player.p.points.gte("1e750")},
            pay() {player.p.points = player.p.points.sub("1e750")}
        },
        23: {
            fullDisplay() {
                return `<h3>Booster Boostest</h3><br>
                <h3>Booster Boost</h3> is quadrupled.<br>
                Cost: 1e2,000 prestige points`
            },
            unlocked() {return player.p.upgrades.includes(22)},
            canAfford() {return player.p.points.gte("1e2000")},
            pay() {player.p.points = player.p.points.sub("1e2000")}
        },
        24: {
            fullDisplay() {
                return `<h3>Point Boost</h3><br>
                Point gain x10.<br>
                Cost: 1e33,333 prestige points`
            },
            unlocked() {return player.p.upgrades.includes(23)},
            canAfford() {return player.p.points.gte("1e33333")},
            pay() {player.p.points = player.p.points.sub("1e33333")}
        },
        25: {
            fullDisplay() {
                return `<h3>Generator Boost</h3><br>
                Unlock generators.<br>
                Cost: 1e126,666 prestige points`
            },
            unlocked() {return player.p.upgrades.includes(24)},
            canAfford() {return player.p.points.gte("1e126666")},
            pay() {player.p.points = player.p.points.sub("1e126666")}
        },
        31: {
            fullDisplay() {
                return `<h3>Prestige Enhancement</h3><br>
                Booster milestone's first effect's exponent x5.<br>
                Req: e77,777 points`
            },
            unlocked() {return player.g.upgrades.includes(25)},
            canAfford() {return player.points.gte("e77777")},
            pay() {return}
        },
        32: {
            fullDisplay() {
                return `<h3>Booster Enhancement</h3><br>
                Boosters boost booster milestone's first effect's exponent.<br>
                Req: e88,888 points<br>
                Currently: x${format(tmp.p.upgrades[32].effect, 2)}`
            },
            effect() {
                let base = player.b.points.add(10).log10()
                return base
            },
            unlocked() {return player.p.upgrades.includes(31)},
            canAfford() {return player.points.gte("e88888")},
            pay() {return}
        },
        33: {
            fullDisplay() {
                return `<h3>Generator Enhancement</h3><br>
                Generators boost booster milestone's first effect's exponent.<br>
                Req: e99,999 points<br>
                Currently: x${format(tmp.p.upgrades[33].effect, 2)}`
            },
            effect() {
                let base = player.g.points.add(10).log10()
                return base
            },
            unlocked() {return player.p.upgrades.includes(32)},
            canAfford() {return player.points.gte("e99999")},
            pay() {return}
        },
        34: {
            fullDisplay() {
                return `<h3>Time Enhancement</h3><br>
                Time power boost booster milestone's first effect's exponent.<br>
                Req: e111,111 points<br>
                Currently: x${format(tmp.p.upgrades[34].effect, 2)}`
            },
            effect() {
                let base = player.t.points.add(10).log10()
                return base
            },
            unlocked() {return player.p.upgrades.includes(33)},
            canAfford() {return player.points.gte("e111111")},
            pay() {return}
        },
        35: {
            fullDisplay() {
                return `<h3>Space Enhancement</h3><br>
                Time power boost booster milestone's first effect's exponent.<br>
                Req: e133,333 points<br>
                Currently: x${format(tmp.p.upgrades[35].effect, 2)}`
            },
            effect() {
                let base = player.s.points.add(10).log10()
                return base
            },
            unlocked() {return player.p.upgrades.includes(34)},
            canAfford() {return player.points.gte("e133333")},
            pay() {return}
        }
    }
})
addLayer("b", {
    name: "boosters",
    startData() {return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0)
    }},
    color: "#6e64c4",
    row: 1,
    resource: "boosters",
    hotkeys: [
        {
            key: "b",
            description: "b: reset your points for boosters",
            onPress() { if (player.b.unlocked && canReset("b")) {doReset("b")} }
        }
    ],
    effect() {
        let base = new Decimal(2)
        if (player.b.milestones.includes("0")) {
            let gain = new Decimal(0.1)
            if (player.g.unlocked) {gain = gain.mul(tmp.g.effect)}
            base = base.add(gain)
        }
        if (player.g.upgrades.includes(12)) {base = base.add(5)}
        if (player.e.upgrades.includes(11)) {base = base.mul(tmp.e.upgrades[11].effect)}
        let effective = player.b.points
        if (effective.gte(10)) {effective = effective.log10().mul(10)}
        let mult = new Decimal(1)
        if (player.p.upgrades.includes(21)) {mult = mult.mul(tmp.p.upgrades[21].effect)}
        if (player.b.upgrades.includes(14)) {mult = mult.mul(tmp.b.upgrades[14].effect)}
        if (player.t.upgrades.includes(12)) {mult = mult.mul(tmp.t.effect[2])}
        if (player.s.upgrades.includes(12)) {mult = mult.mul(tmp.s.effect[1])}
        return base.pow(effective).mul(mult)
    },
    effectDescription() {return `which are multiplying prestige point exponent by ${format(tmp.b.effect, 2)} ${player.b.points.gte(10) ? "(softcapped)" : ""}`},
    layerShown() {return player.p.upgrades.includes(15) || player.b.unlocked},
    symbol: "B",
    position: 0,
    branches: ["p"],
    type: "static",
    baseResource: "points",
    baseAmount() {return player.points},
    requires: new Decimal(1e6),
    exponent() {
        let exp = new Decimal(2)
        return exp
    },
    base() {
        let base = new Decimal(10)
        if (player.g.upgrades.includes(21)) {base = base.sub(6.9)}
        return base
    },
    doReset(layer) {
        if (layer === "t") {
            player.b.points = new Decimal(0)
            player.b.best = new Decimal(0)
            if (!(player.t.milestones.includes("3"))) {player.b.upgrades = []}
            if (!(player.t.milestones.includes("1"))) {player.b.milestones = []}
        }
        if (layer === "s") {
            player.b.points = new Decimal(0)
            player.b.best = new Decimal(0)
            if (!(player.s.milestones.includes("5"))) {player.b.upgrades = []}
            if (!(player.s.milestones.includes("1"))) {player.b.milestones = []}
        }
        if (layer === "inf") {
            player.b.points = new Decimal(0)
            player.b.best = new Decimal(0)
            player.b.upgrades = []
        }
    },
    resetsNothing() {return player.s.milestones.includes("4")},
    canBuyMax() {return player.s.milestones.includes("4")},
    upgrades: {
        11: {
            fullDisplay() {
                return `<h3>Boosted</h3><br>
                The booster effect applies to point gain.<br>
                Cost: 4 boosters`
            },
            canAfford() {return player.b.points.gte(4)},
            pay() {player.b.points = player.b.points.sub(4)}
        },
        12: {
            fullDisplay() {
                return `<h3>Booster Generation</h3><br>
                Product of booster and generator effect multiplies point gain.<br>
                Cost: e2.8e28 prestige points`
            },
            unlocked() {return player.g.points.gte(10)},
            canAfford() {return player.p.points.gte("e2.8e28")},
            pay() {player.p.points = player.p.points.sub("e2.8e28")}
        },
        13: {
            fullDisplay() {
                return `<h3>Prestige Generation</h3><br>
                Points boost prestige point exponent.<br>
                Cost: e1.105e29 prestige points<br>
                Currently: x${format(tmp.b.upgrades[13].effect, 2)}`
            },
            effect() {
                let base = player.points.add(1).log10().add(10).log10()
                return base
            },
            unlocked() {return player.b.upgrades.includes(12)},
            canAfford() {return player.p.points.gte("e1.105e29")},
            pay() {player.p.points = player.p.points.sub("e1.105e29")}
        },
        14: {
            fullDisplay() {
                return `<h3>Generator Generation</h3><br>
                Generators boost booster effect.<br>
                Cost: e9.15e29 prestige points<br>
                Currently: x${format(tmp.b.upgrades[14].effect, 2)}`
            },
            effect() {
                let base = new Decimal(1.1).pow(player.g.points)
                return base
            },
            unlocked() {return player.b.upgrades.includes(13)},
            canAfford() {return player.p.points.gte("e9.15e29")},
            pay() {player.p.points = player.p.points.sub("e9.15e29")}
        },
        15: {
            fullDisplay() {
                return `<h3>Infinity</h3><br>
                Unlock infinity.<br>
                Cost: 1.8e308 points`
            },
            unlocked() {return player.b.upgrades.includes(14)},
            canAfford() {return player.points.gte("1.8e308")},
            pay() {player.points = player.points.sub("1.8e308")}
        },
        21: {
            fullDisplay() {
                return `<h3>Point Boost I</h3><br>
                Booster milestone's first effect's exponent x1.5.<br>
                Req: e166,666 points`
            },
            unlocked() {return player.p.upgrades.includes(35)},
            canAfford() {return player.points.gte("e166,666")},
            pay() {return}
        },
        22: {
            fullDisplay() {
                return `<h3>Point Boost II</h3><br>
                Booster milestone's first effect's exponent x15.<br>
                Req: e200,000 points`
            },
            unlocked() {return player.b.upgrades.includes(21)},
            canAfford() {return player.points.gte("e200000")},
            pay() {return}
        },
        23: {
            fullDisplay() {
                return `<h3>Point Boost III</h3><br>
                Booster milestone's first effect's exponent x150.<br>
                Req: e210,000 points`
            },
            unlocked() {return player.b.upgrades.includes(22)},
            canAfford() {return player.points.gte("e210000")},
            pay() {return}
        },
        24: {
            fullDisplay() {
                return `<h3>Point Boost IV</h3><br>
                Booster milestone's first effect's exponent x1500.<br>
                Req: e233,333 points`
            },
            unlocked() {return player.b.upgrades.includes(23)},
            canAfford() {return player.points.gte("e233333")},
            pay() {return}
        },
        25: {
            fullDisplay() {
                return `<h3>Point Boost V</h3><br>
                Booster milestone's first effect's exponent ^15.<br>
                Req: e250,000 points`
            },
            unlocked() {return player.b.upgrades.includes(24)},
            canAfford() {return player.points.gte("e250000")},
            pay() {return}
        }
    },
    milestones: {
        0: {
            requirementDescription: "7 best boosters",
            effectDescription: "Gain (prestige points^0.01)% of prestige points per second, keep all prestige upgrades on booster reset, and booster base +0.1",
            done() {return player.b.best.gte(7)}
        },
    }
})
addLayer("g", {
    name: "generators",
    startData() {return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0)
    }},
    color: "#a3d9a5",
    row: 1,
    resource: "generators",
    hotkeys: [
        {
            key: "g",
            description: "g: reset your points for generators",
            onPress() { if (player.g.unlocked && canReset("g")) {doReset("g")} }
        }
    ],
    effect() {
        let base = new Decimal(2)
        if (player.g.upgrades.includes(11)) {base = base.add(0.01)}
        if (player.e.upgrades.includes(12)) {base = base.mul(tmp.e.upgrades[12].effect)}
        let effective = player.g.points
        if (effective.gte(10)) {effective = new Decimal(10)}
        let mult = new Decimal(1)
        return base.pow(effective).mul(mult)
    },
    effectDescription() {return `which are multiplying booster milestone's last effect's by ${format(tmp.g.effect, 2)} ${player.g.points.gte(10) ? "(hardcapped)" : ""}`},
    layerShown() {return player.p.upgrades.includes(25) || player.g.unlocked},
    symbol: "G",
    position: 1,
    branches: ["p", "b"],
    type: "static",
    baseResource: "points",
    baseAmount() {return player.points},
    requires: new Decimal(1e48),
    exponent() {
        let exp = new Decimal(2)
        if (player.g.upgrades.includes(22)) {exp = exp.sub(.42)}
        return exp
    },
    base() {
        let base = new Decimal(10)
        return base
    },
    doReset(layer) {
        if (layer === "t") {
            player.g.points = new Decimal(0)
            player.g.best = new Decimal(0)
        }
        if (layer === "s") {
            player.g.points = new Decimal(0)
            player.g.best = new Decimal(0)
        }
        if (layer === "inf") {
            player.g.points = new Decimal(0)
            player.g.best = new Decimal(0)
        }
    },
    resetsNothing() {return player.s.milestones.includes("4")},
    canBuyMax() {return player.s.milestones.includes("4")},
    upgrades: {
        11: {
            fullDisplay() {
                return `<h3>Infinite Generation</h3><br>
                Generator base +0.01.<br>
                Req: 15 generators`
            },
            unlocked() {return player.inf.points.gte(1)},
            canAfford() {return player.g.points.gte(15)},
            pay() {return}
        },
        12: {
            fullDisplay() {
                return `<h3>Infinite Boosters</h3><br>
                Booster base +5.<br>
                Req: e4.625e29 prestige points`
            },
            unlocked() {return player.g.upgrades.includes(11)},
            canAfford() {return player.p.points.gte("e4.625e29")},
            pay() {return}
        },
        13: {
            fullDisplay() {
                return `<h3>Infinite Prestige</h3><br>
                Base prestige point exponent +0.06.<br>
                Req: 16 generators`
            },
            unlocked() {return player.g.upgrades.includes(12)},
            canAfford() {return player.g.points.gte(16)},
            pay() {return}
        },
        14: {
            fullDisplay() {
                return `<h3>Infinite Points</h3><br>
                Point gain ^1.115.<br>
                Req: e4.422e30 prestige points`
            },
            unlocked() {return player.g.upgrades.includes(13)},
            canAfford() {return player.p.points.gte("e4.422e30")},
            pay() {return}
        },
        15: {
            fullDisplay() {
                return `<h3>TimeSpace</h3><br>
                Space power effect applies to time gain.<br>
                Req: e3.1415e314 prestige points`
            },
            unlocked() {return player.t.unlocked && player.s.unlocked},
            canAfford() {return player.p.points.gte("e3.1415e314")},
            pay() {return}
        },
        21: {
            fullDisplay() {
                return `<h3>Boosted Boosts</h3><br>
                Booster cost base -6.9.<br>
                Req: ee542 prestige points`
            },
            unlocked() {return player.g.upgrades.includes(15)},
            canAfford() {return player.p.points.gte("ee542")},
            pay() {return}
        },
        22: {
            fullDisplay() {
                return `<h3>Generator Generation</h3><br>
                Generator cost exponent -.420.<br>
                Req: e2820 points`
            },
            unlocked() {return player.g.upgrades.includes(21)},
            canAfford() {return player.points.gte("e2820")},
            pay() {return}
        },
        23: {
            fullDisplay() {
                return `<h3>Timed Time</h3><br>
                Timewall effect ^1.666.<br>
                Req: ee552 prestige points`
            },
            unlocked() {return player.g.upgrades.includes(22)},
            canAfford() {return player.p.points.gte("ee552")},
            pay() {return}
        },
        24: {
            fullDisplay() {
                return `<h3>Space Spacer</h3><br>
                Space effect applies to time gain.<br>
                Req: e4275 points`
            },
            unlocked() {return player.g.upgrades.includes(23)},
            canAfford() {return player.points.gte("e4275")},
            pay() {return}
        },
        25: {
            fullDisplay() {
                return `<h3>Enhanced Points</h3><br>
                Unlock enhancers and enhancers boost point gain.<br>
                Req: e28,745 points<br>
                Currently: ^${format(tmp.g.upgrades[25].effect, 2)}`
            },
            effect() {
                let base = new Decimal(1.01).pow(player.e.points)
                return base
            },
            unlocked() {return player.g.upgrades.includes(24)},
            canAfford() {return player.points.gte("e28745")},
            pay() {return}
        }
    }
})
addLayer("inf", {
    name: "infinity",
    startData() {return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0)
    }},
    color: "#ffffff",
    row: 69420,
    displayRow: "side",
    resource: "infinity points",
    hotkeys: [
        {
            key: "I",
            description: "shift+i: reset your points for infinity points",
            onPress() { if (player.inf.unlocked && canReset("inf")) {doReset("inf")} }
        }
    ],
    layerShown() {return player.b.upgrades.includes(15) || player.inf.unlocked},
    symbol: "I",
    position: 0,
    type: "static",
    baseResource: "points",
    baseAmount() {return player.points},
    requires: new Decimal(2).pow(1024),
    exponent() {
        let exp = new Decimal(2).pow(4)
        if (player.inf.points.gte(3)) {exp = new Decimal(0)}
        return exp
    },
    base() {
        let base = new Decimal(2).pow(32)
        if (player.inf.points.gte(3)) {base = new Decimal(Infinity)}
        return base
    },
    milestones: {
        0: {
            requirementDescription: "1 infinity point",
            effectDescription: "Point gain ^0.5 per milestone. Keep booster milestone on infinity reset. <h3>Begin</h3> is 69420x stronger. <h3>Prestige Boost</h3> is squared.",
            done() {return player.inf.best.gte(1)}
        },
        1: {
            requirementDescription: "2 infinity point",
            effectDescription: "Prestige point exponent /2 per milestone. Keep generator upgrades on infinity reset. <h3>Begin</h3> is 69420x stronger.",
            done() {return player.inf.best.gte(2)}
        },
        2: {
            requirementDescription: "3 infinity point",
            effectDescription: "Prestige point exponent ^0.5 per milestone. Keep space milestones on infinity reset. Enhancers are not reset on infinity reset. <h3>Begin</h3> is 69420x stronger.",
            done() {return player.inf.best.gte(3)}
        }
    }
})
addLayer("t", {
    name: "time",
    startData() {return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0),
        time: new Decimal(0),
        log: new Decimal(10)
    }},
    color: "#006609",
    row: 2,
    resource: "time power",
    hotkeys: [
        {
            key: "t",
            description: "t: reset your points for time power",
            onPress() { if (player.t.unlocked && canReset("t")) {doReset("t")} }
        }
    ],
    effect() {
        let base = new Decimal(3)
        if (player.t.upgrades.includes(13)) {base = base.add(1)}
        if (player.e.upgrades.includes(13)) {base = base.add(tmp.e.upgrades[13].effect)}
        let effective = player.t.points
        let mult = new Decimal(1)
        let gain = base.pow(effective).mul(mult)
        if (player.g.upgrades.includes(15)) {gain = gain.pow(tmp.s.effect[0])}
        if (player.g.upgrades.includes(24)) {gain = gain.mul(tmp.s.effect[1])}
        let timewalls = player.t.time.max(1).log(player.t.log).floor()
        let boost = new Decimal(10).pow(timewalls)
        if (player.g.upgrades.includes(23)) {boost = boost.pow(1.666)}
        return [gain, timewalls, boost]
    },
    effectDescription() {return `which are producing ${format(tmp.t.effect[0], 2)} time per second`},
    layerShown() {return player.inf.points.gte(2) || player.t.unlocked},
    symbol: "T",
    position: 0,
    branches: ["b"],
    type: "static",
    baseResource: "points",
    baseAmount() {return player.points},
    requires() {
        if (player.s.unlocked && !(player.s.upgrades.includes(15))) {return new Decimal(Infinity)}
        return new Decimal(1e40)
    },
    exponent() {
        let exp = new Decimal(2)
        return exp
    },
    base() {
        let base = new Decimal(1e10)
        return base
    },
    timewallLog() {
        let log = new Decimal(10)
        player.t.log = log
    },
    doReset(layer) {
        if (layer === "inf") {
            player.t.points = new Decimal(0)
            player.t.best = new Decimal(0)
            player.t.time = new Decimal(0)
            player.t.upgrades = []
            player.t.milestones = []
        }
    },
    resetsNothing() {return player.t.milestones.includes("4")},
    update(diff) {
        if (player.t.unlocked) {
            player.t.time = player.t.time.add(tmp.t.effect[0].mul(diff))
        }
    },
    milestones: {
        0: {
            requirementDescription: "1 time power",
            effectDescription: "Keep prestige upgrades on generator reset. Keep generator upgrades on time reset.",
            done() {return player.t.best.gte(1)}
        },
        1: {
            requirementDescription: "5 time power",
            effectDescription: "Keep booster milestone on time reset.",
            done() {return player.t.best.gte(5)}
        },
        2: {
            requirementDescription: "6 time power",
            effectDescription: "Keep prestige upgrades on time reset.",
            done() {return player.t.best.gte(6)}
        },
        3: {
            requirementDescription: "14 time power",
            effectDescription: "Keep booster upgrades on time reset.",
            done() {return player.t.best.gte(14)}
        },
        4: {
            requirementDescription: "20 time power",
            effectDescription: "Time resets nothing.",
            done() {return player.t.best.gte(20)}
        }
    },
    upgrades: {
        11: {
            fullDisplay() {
                return `<h3>Prestige Time</h3><br>
                Point gain x1e69.<br>
                Req: 1e69 points`
            },
            canAfford() {return player.points.gte(1e69)},
            pay() {return}
        },
        12: {
            fullDisplay() {
                return `<h3>Time Boost</h3><br>
                Timewall effect applies to booster effect.<br>
                Req: e7.75e31 prestige points`
            },
            unlocked() {return player.t.upgrades.includes(11)},
            canAfford() {return player.p.points.gte("e7.75e31")},
            pay() {return}
        },
        13: {
            fullDisplay() {
                return `<h3>Time Generation</h3><br>
                Time power base +1.<br>
                Req: 50,000 time`
            },
            unlocked() {return player.t.upgrades.includes(12)},
            canAfford() {return player.t.time.gte(50000)},
            pay() {return}
        },
        14: {
            fullDisplay() {
                return `<h3>Infinite Time</h3><br>
                Booster milestone's first effect's exponent +0.9899.<br>
                Req: e5.25e38 prestige points`
            },
            unlocked() {return player.t.upgrades.includes(13)},
            canAfford() {return player.p.points.gte("e5.25e38")},
            pay() {return}
        },
        15: {
            fullDisplay() {
                return `<h3>SpaceTime</h3><br>
                Reunlock space.<br>
                Req: ee43 prestige points`
            },
            unlocked() {return player.t.upgrades.includes(14)},
            canAfford() {return player.p.points.gte("ee43")},
            pay() {return}
        }
    },
    tabFormat: [
        "main-display",
        "prestige-button",
        "blank",
        [
            "display-text",
            function() {
                return `You have ${format(player.t.time, 2)} time<br>
                You have ${format(tmp.t.effect[1], 2)} timewalls, multiplying prestige point exponent by ${format(tmp.t.effect[2], 2)}<br>
                Your next timewall is at ${format(player.t.log.pow(tmp.t.effect[1].add(1)), 2)} time<br>
                Every timewall increases timewall requirement by ${format(player.t.log, 2)}`
            }
        ],
        "milestones",
        "upgrades"
    ]
})
addLayer("s", {
    name: "space",
    startData() {return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0),
        space: new Decimal(1)
    }},
    color: "#dfdfdf",
    row: 2,
    resource: "space power",
    hotkeys: [
        {
            key: "s",
            description: "s: reset your points for space power",
            onPress() { if (player.s.unlocked && canReset("s")) {doReset("s")} }
        }
    ],
    effect() {
        let base = new Decimal(1.5)
        if (player.e.upgrades.includes(14)) {base = base.add(tmp.e.upgrades[14].effect)}
        let effective = player.s.points
        if (effective.gte(2)) {effective = effective.log2().add(1)}
        let mult = new Decimal(1)
        let pow = base.pow(effective).mul(mult)
        let mult2 = player.s.space
        let pow2 = new Decimal(5)
        let mult3 = mult2.pow(pow2)
        return [pow, mult3]
    },
    effectDescription() {return `which is raising space gain to the ${format(tmp.s.effect[0], 2)}th power ${player.s.points.gte(2) ? "(softcapped)" : ""}`},
    layerShown() {return player.inf.points.gte(2) || player.s.unlocked},
    symbol: "S",
    position: 2,
    branches: ["g"],
    type: "static",
    baseResource: "points",
    baseAmount() {return player.points},
    requires() {
        if (player.t.unlocked && !(player.t.upgrades.includes(15))) {return new Decimal(Infinity)}
        return new Decimal(1e40)
    },
    exponent() {
        let exp = new Decimal(2)
        return exp
    },
    base() {
        let base = new Decimal(1e10)
        return base
    },
    space() {
        let gain = new Decimal(1)
        gain = gain.mul(tmp.s.buyables[11].effect)
        gain = gain.mul(tmp.s.buyables[21].effect)
        gain = gain.mul(tmp.s.buyables[31].effect)
        gain = gain.mul(tmp.s.buyables[41].effect)
        gain = gain.pow(tmp.s.effect[0])
        player.s.space = gain
    },
    spaceBuy() {
        if (player.s.milestones.includes("7")) {
            player.s.buyables[11] = player.points.max(1).log10().div(10).floor()
            player.s.buyables[21] = player.points.max(1).log10().div(20).floor()
            player.s.buyables[31] = player.points.max(1).log10().div(30).floor()
            player.s.buyables[41] = player.points.max(1).log10().div(40).floor()
        }
    },
    doReset(layer) {
        if (layer === "inf") {
            player.s.points = new Decimal(0)
            player.s.best = new Decimal(0)
            player.s.space = new Decimal(0)
            player.s.upgrades = []
            player.s.buyables = {
                11: 0,
                21: 0,
                31: 0,
                41: 0,
            }
        }
    },
    resetsNothing() {return player.s.milestones.includes("6")},
    buyables: {
        11: {
            title: "1st Space Dimension",
            cost() {return new Decimal(1e10).pow(player.s.buyables[11].add(1))},
            effect() {
                let gain = player.s.buyables[11].add(1)
                return gain
            },
            display() {
                return `Cost: ${format(tmp.s.buyables[11].cost, 2)} points
                Amount: ${format(player.s.buyables[11], 2)}`
            },
            unlocked() {return player.s.unlocked},
            canAfford() {return player.points.gte(tmp.s.buyables[11].cost)},
            buy() {
                player.points = player.points.sub(tmp.s.buyables[11].cost)
                player.s.buyables[11] = player.s.buyables[11].add(1)
            },
            style: {"height": "100px", "width": "200px"}
        },
        21: {
            title: "2nd Space Dimension",
            cost() {return new Decimal(1e20).pow(player.s.buyables[21].add(1))},
            effect() {
                let gain = player.s.buyables[21].add(1)
                return gain
            },
            display() {
                return `Cost: ${format(tmp.s.buyables[21].cost, 2)} points
                Amount: ${format(player.s.buyables[21], 2)}`
            },
            unlocked() {return player.s.upgrades.includes(11)},
            canAfford() {return player.points.gte(tmp.s.buyables[21].cost)},
            buy() {
                player.points = player.points.sub(tmp.s.buyables[21].cost)
                player.s.buyables[21] = player.s.buyables[21].add(1)
            },
            style: {"height": "100px", "width": "200px"}
        },
        31: {
            title: "3rd Space Dimension",
            cost() {return new Decimal(1e30).pow(player.s.buyables[31].add(1))},
            effect() {
                let gain = player.s.buyables[31].add(1)
                return gain
            },
            display() {
                return `Cost: ${format(tmp.s.buyables[31].cost, 2)} points
                Amount: ${format(player.s.buyables[31], 2)}`
            },
            unlocked() {return player.s.upgrades.includes(12)},
            canAfford() {return player.points.gte(tmp.s.buyables[31].cost)},
            buy() {
                player.points = player.points.sub(tmp.s.buyables[31].cost)
                player.s.buyables[31] = player.s.buyables[31].add(1)
            },
            style: {"height": "100px", "width": "200px"}
        },
        41: {
            title: "4th Space Dimension",
            cost() {return new Decimal(1e40).pow(player.s.buyables[41].add(1))},
            effect() {
                let gain = player.s.buyables[41].add(1)
                return gain
            },
            display() {
                return `Cost: ${format(tmp.s.buyables[41].cost, 2)} points
                Amount: ${format(player.s.buyables[41], 2)}`
            },
            unlocked() {return player.s.upgrades.includes(13)},
            canAfford() {return player.points.gte(tmp.s.buyables[41].cost)},
            buy() {
                player.points = player.points.sub(tmp.s.buyables[41].cost)
                player.s.buyables[41] = player.s.buyables[41].add(1)
            },
            style: {"height": "100px", "width": "200px"}
        }
    },
    milestones: {
        0: {
            requirementDescription: "1 space power",
            effectDescription: "Keep prestige upgrades on generator reset. Keep generator upgrades on space reset.",
            done() {return player.s.best.gte(1)}
        },
        1: {
            requirementDescription: "2 space power",
            effectDescription: "Keep booster milestone on space reset.",
            done() {return player.s.best.gte(2)}
        },
        2: {
            requirementDescription: "3 space power",
            effectDescription: "Keep prestige upgrades on space reset.",
            done() {return player.s.best.gte(3)}
        },
        3: {
            requirementDescription: "5 space power",
            effectDescription: "Booster milestone's first effect is always at least 1%.",
            done() {return player.s.best.gte(5)}
        },
        4: {
            requirementDescription: "10 space power",
            effectDescription: "Boosters and generators reset nothing. You can buy max boosters and generators.",
            done() {return player.s.best.gte(10)}
        },
        5: {
            requirementDescription: "14 space power",
            effectDescription: "Keep booster upgrades on space reset.",
            done() {return player.s.best.gte(14)}
        },
        6: {
            requirementDescription: "20 space power",
            effectDescription: "Space resets nothing.",
            done() {return player.s.best.gte(20)}
        },
        7: {
            requirementDescription: "45 space power",
            effectDescription: "Auto buy space dimensions.",
            done() {return player.s.best.gte(45)}
        }
    },
    upgrades: {
        11: {
            fullDisplay() {
                return `<h3>Prestige Space</h3><br>
                Unlock a space dimension.<br>
                Req: 1e41 points`
            },
            canAfford() {return player.points.gte(1e41)},
            pay() {return}
        },
        12: {
            fullDisplay() {
                return `<h3>Space Boosters</h3><br>
                Unlock a space dimension and space effect applies to booster effect.<br>
                Req: e185,000,000 prestige points`
            },
            unlocked() {return player.s.upgrades.includes(11)},
            canAfford() {return player.p.points.gte("e185000000")},
            pay() {return}
        },
        13: {
            fullDisplay() {
                return `<h3>Space Generation</h3><br>
                Unlock a space dimension.<br>
                Req: e993 points`
            },
            unlocked() {return player.s.upgrades.includes(12)},
            canAfford() {return player.points.gte("e993")},
            pay() {return}
        },
        14: {
            fullDisplay() {
                return `<h3>Infinite Space</h3><br>
                Point gain x1e10.<br>
                Req: e1437 points`
            },
            unlocked() {return player.s.upgrades.includes(13)},
            canAfford() {return player.points.gte("e1437")},
            pay() {return}
        },
        15: {
            fullDisplay() {
                return `<h3>SpaceTime</h3><br>
                Reunlock time.<br>
                Req: e1445 points`
            },
            unlocked() {return player.s.upgrades.includes(14)},
            canAfford() {return player.points.gte("e1445")},
            pay() {return}
        }
    },
    tabFormat: [
        "main-display",
        "prestige-button",
        "blank",
        [
            "display-text",
            function() {
                return `You have ${format(player.s.space, 2)} space, which is multiplying point gain by ${format(tmp.s.effect[1], 2)}`
            }
        ],
        "milestones",
        "buyables",
        "upgrades"
    ]
})
addLayer("e", {
    name: "enhancer",
    startData() {return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0),
        space: new Decimal(1)
    }},
    color: "#b82fbd",
    row: 2,
    resource: "enhancers",
    hotkeys: [
        {
            key: "e",
            description: "e: reset your points for enhancers",
            onPress() { if (player.e.unlocked && canReset("e")) {doReset("e")} }
        }
    ],
    layerShown() {return player.g.upgrades.includes(25) || player.e.unlocked},
    symbol: "E",
    position: 1,
    branches: ["b", "g", "t", "s"],
    type: "static",
    baseResource: "points",
    baseAmount() {return player.points},
    requires:new Decimal("e28745"),
    exponent() {
        let exp = new Decimal(4)
        return exp
    },
    base() {
        let base = new Decimal(2).pow(1024)
        return base
    },
    doReset(layer) {
        if (layer === "inf") {return}
    },
    resetsNothing: true,
    upgrades: {
        11: {
            fullDisplay() {
                return `<h3>Enhanced Boosters</h3><br>
                Enhancers boost booster base.<br>
                Req: e29,895 points<br>
                Currently: x${format(tmp.e.upgrades[11].effect, 2)}`
            },
            effect() {
                let base = new Decimal(2).pow(player.e.points)
                return base
            },
            canAfford() {return player.points.gte("e29895")},
            pay() {return}
        },
        12: {
            fullDisplay() {
                return `<h3>Enhanced Generation</h3><br>
                Enhancers boost generator base.<br>
                Req: e29,990 points<br>
                Currently: x${format(tmp.e.upgrades[12].effect, 2)}`
            },
            effect() {
                let base = new Decimal(2).pow(player.e.points)
                return base
            },
            canAfford() {return player.points.gte("e29990")},
            pay() {return}
        },
        13: {
            fullDisplay() {
                return `<h3>Enhanced Time</h3><br>
                Enhancers boost time base.<br>
                Req: e31,320 points<br>
                Currently: +${format(tmp.e.upgrades[13].effect, 2)}`
            },
            effect() {
                let base = new Decimal(1.5).pow(player.e.points)
                return base
            },
            canAfford() {return player.points.gte("e31320")},
            pay() {return}
        },
        14: {
            fullDisplay() {
                return `<h3>Enhanced Space</h3><br>
                Enhancers boost space base.<br>
                Req: e42,211 points<br>
                Currently: +${format(tmp.e.upgrades[14].effect, 2)}`
            },
            effect() {
                let base = new Decimal(0.01).mul(player.e.points)
                return base
            },
            canAfford() {return player.points.gte("e42211")},
            pay() {return}
        },
        15: {
            fullDisplay() {
                return `<h3>Infinite Enhancement</h3><br>
                Booster milestone's first effect's exponent +1.0001.<br>
                Req: e75,000 points`
            },
            canAfford() {return player.points.gte("e75000")},
            pay() {return}
        }
    }
})