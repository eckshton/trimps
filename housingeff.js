function coloreffhousing() {
    var buildings = {
        Hut:{raw:{},eff:0},
        House:{raw:{},eff:0},
        Mansion:{raw:{},eff:0},
        Hotel:{raw:{},eff:0},
        Resort:{raw:{},eff:0},
        Gateway:{raw:{},eff:0},
        Wormhole:{raw:{},eff:0},
        Collector:{raw:{},eff:0},
        Warpstation:{raw:{},eff:0}
    }
    
    var namelist = Object.getOwnPropertyNames(buildings)
    
    for(var i = 0; i < namelist.length; i++) {
        if(game.buildings[namelist[i]].locked==1) continue
        var resources = Object.getOwnPropertyNames(game.buildings[namelist[i]].cost)
        for(var j = 0; j < resources.length; j++) {
            buildings[namelist[i]].raw[resources[j]] = (game.buildings[namelist[i]].cost[resources[j]][0]*Math.pow(game.buildings[namelist[i]].cost[resources[j]][1],game.buildings[namelist[i]].owned))/game.buildings[namelist[i]].increase.by
        }
    }

    var maxmin = {}

    for(var i = 0; i < namelist.length; i++) {
        if(game.buildings[namelist[i]].locked==1) continue
        var resources = Object.getOwnPropertyNames(buildings[namelist[i]].raw)
        for(var j = 0; j < resources.length; j++) {
            if(maxmin[resources[j]] == undefined) {
                maxmin[resources[j]] = {max:buildings[namelist[i]].raw[resources[j]],min:buildings[namelist[i]].raw[resources[j]]}
                continue
            }
            if(maxmin[resources[j]].max < buildings[namelist[i]].raw[resources[j]]) {
                maxmin[resources[j]].max = buildings[namelist[i]].raw[resources[j]]
                continue
            }
            if(maxmin[resources[j]].min > buildings[namelist[i]].raw[resources[j]]) {
                maxmin[resources[j]].min = buildings[namelist[i]].raw[resources[j]]
            }
        }
    }

    var effs = []
    var namelist2 = []

    for(var i = 0; i < namelist.length; i++) {
        if(game.buildings[namelist[i]].locked==1) continue
        var resources = Object.getOwnPropertyNames(buildings[namelist[i]].raw)
        var vals = []
        for(var j = 0; j < resources.length; j++) {
            if(maxmin[resources[j]].max==maxmin[resources[j]].min) continue
            vals.push(Math.abs(1-((buildings[namelist[i]].raw[resources[j]]-maxmin[resources[j]].min)/(maxmin[resources[j]].max-maxmin[resources[j]].min))))
        }
        var sum = 0
        for(var j = 0; j < vals.length; j++) {
            sum+=vals[j]
        }
        effs.push(Math.floor(100*(sum/resources.length)))
        namelist2.push(namelist[i])
    }
    
    var max = 0

    for(var i = 0; i < effs.length; i++) {
        if(effs[i]>max) max=effs[i]
    }
    for(var i = 0; i < effs.length; i++) {
        if(effs[i]==max) {
            if(!document.getElementById(namelist[i]).classList.contains("efficientYes")) {
                document.getElementById(namelist[i]).classList.add("efficientYes")
            }
            continue
        }
        if(document.getElementById(namelist[i]).classList.contains("efficientYes")) {
            document.getElementById(namelist[i]).classList.remove("efficientYes")
        }
    }
}

setInterval(() => {coloreffhousing()},1000/10)