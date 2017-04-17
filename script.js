// 90% of this code is shamelessly stolen from Jake White's VGC calc, so huge shoutouts to him!

var showdownFormes = [["Kyurem-White", "Kyurem-W"],
["Kyurem-Black", "Kyurem-B"],
["Rotom-Wash", "Rotom-W"],
["Rotom-Heat", "Rotom-H"],
["Rotom-Frost", "Rotom-F"],
["Rotom-Mow", "Rotom-C"],
["Rotom-Fan", "Rotom-S"],
["Giratina-Origin", "Giratina-O"],
["Landorus-Therian", "Landorus-T"],
["Thundurus-Therian", "Thundurus-T"],
["Tornadus-Therian", "Tornadus-T"],
["Floette-Eternal", "Floette-E"],
["Pumpkaboo", "Pumpkaboo-Average"],
["Gourgeist", "Gourgeist-Average"],
["Wormadan-Sandy", "Wormadan-G"],
["Wormadan-Trash", "Wormadan-S"],
["Groudon-Primal", "Groudon"],
["Kyogre-Primal", "Kyogre"]];

var savecustom = function()
{

	var string = document.getElementById('customMon').value
	var lines = string.split('\n')
	var species = "";
	var item = "";
	var ability = ""
	var level = "50";
	var EVs = [0,0,0,0,0,0];
	var IVs = [31,31,31,31,31,31]
	var nature = "Serious"
	var moves = []
	var ln1p1 = '  "'
	var ln1p2 = '" { \n'
	var ln2p1 = '    "'
	var ln2p2 = ""
	var ln2p3 = '": { \n'
	var ln3 = '      "level": 50, \n'
	var ln4 = '      "evs": { \n'
	var ln5p1 = '        "hp": '
	var lnbr = '\n'
	var ln6p1 = '        "at": '
	var ln7p1 = '        "df": '
	var ln8p1 = '        "sa": '
	var ln9p1 = '        "sd": '
	var ln10p1 = '        "se": '
	var ln12p1 = '      "ivs": { \n'
	var ln11 = '      }, \n'
	var ln19p1 = '      "nature": "'
	var lnen = '", \n'
	var ln20p1 = '      "ability": "'
	var ln21p1 = '      "item": "'
	var ln22 = '      "moves": [ \n'
	var lnmv = '        "'
	var lnenl = '" \n'
	var movarray = new Array()
	var ln3l = '      ] \n'
	var ln2l = '    } \n'
	var lnl = '  },'
	var ln12p1 = ""
	var ln11v2 = ""

	if(lines[0].indexOf('(M)') != -1)
	{
		lines[0] = lines[0].substring(0, lines[0].indexOf('(M)') - 1) + 
		lines[0].substring(lines[0].indexOf('(M)') + 3, lines[0].length);
	}
	else if(lines[0].indexOf('(F)') != -1)
	{
		lines[0] = lines[0].substring(0, lines[0].indexOf('(F)')) + 
		lines[0].substring(lines[0].indexOf('(F)') + 3, lines[0].length);
	}
	if(lines[0].indexOf('(') != -1)
	{
		firstParenth = lines[0].lastIndexOf('(');
		lastParenth = lines[0].lastIndexOf(')');
		species = lines[0].substring(firstParenth + 1, lastParenth).trim();
	}
	else
		species = lines[0].split('@')[0].trim(); //species is always first
	for(var i = 0; i < showdownFormes.length; ++i)
	{
		if(species == showdownFormes[i][0])
			species = showdownFormes[i][1]
	}
	
	if(lines[0].indexOf('@') != -1)
		item = lines[0].substring(lines[0].indexOf('@')+1).trim(); //item is always after @
	ability = lines[1].substring(lines[1].indexOf(' ')+1).trim(); //ability is always second
	if(lines.length > 2){
		for(var i = 2; i < lines.length; ++i){
			if(lines[i].indexOf("Level") != -1){
				level = lines[2].split(' ')[1].trim(); //level is sometimes third but uh not always
			}
			if(lines[i].indexOf("EVs") != -1) //if EVs are in this line
			{
				evList = lines[i].split(':')[1].split('/'); //splitting it into a list of " # Stat "
				for(var j = 0; j < evList.length; ++j){
					evList[j] = evList[j].trim();
					evListElements = evList[j].split(' ');
					if(evListElements[1] == "HP")
						EVs[0] = parseInt(evListElements[0])
					else if(evListElements[1] == "Atk")
						EVs[1] = parseInt(evListElements[0])
					else if(evListElements[1] == "Def")
						EVs[2] = parseInt(evListElements[0])
					else if(evListElements[1] == "SpA")
						EVs[3] = parseInt(evListElements[0])
					else if(evListElements[1] == "SpD")
						EVs[4] = parseInt(evListElements[0])
					else if(evListElements[1] == "Spe")
						EVs[5] = parseInt(evListElements[0])
				}

			}
			if(lines[i].indexOf("IVs") != -1) //if IVs are in this line
			{
				var ln12p1 = '      "ivs": { \n'
				var ln11v2 = '      }, \n'
				ivList = lines[i].split(':')[1].split('/'); //splitting it into a list of " # Stat "
				for(var j = 0; j < ivList.length; ++j){
					ivList[j] = ivList[j].trim();
					ivListElements = ivList[j].split(' ');
					if(ivListElements[1] == "HP")
						IVs[0] = parseInt(ivListElements[0])
					else if(ivListElements[1] == "Atk")
						IVs[1] = parseInt(ivListElements[0])
					else if(ivListElements[1] == "Def")
						IVs[2] = parseInt(ivListElements[0])
					else if(ivListElements[1] == "SpA")
						IVs[3] = parseInt(ivListElements[0])
					else if(ivListElements[1] == "SpD")
						IVs[4] = parseInt(ivListElements[0])
					else if(ivListElements[1] == "Spe")
						IVs[5] = parseInt(ivListElements[0])
				}


			}    
			if(lines[i].indexOf("Nature") != -1) //if nature is in this line
			{
				nature = lines[i].split(' ')[0].trim()
			}
			if(lines[i].indexOf("- ") != -1){ //if there is a move in this line
				var nextMove = lines[i].substring(lines[i].indexOf(' ') + 1).trim()
				 nextMove = nextMove.replace('[', '')
				 nextMove = nextMove.replace(']', '')
				 movarray.push(nextMove)
			}
			var movlist = movarray.toString()
			var move1 = movlist.split(",")[0]
			var move2 = movlist.split(",")[1]
			var move3 = movlist.split(",")[2]
			var move4 = movlist.split(",")[3]
			
		    if (lines[0].indexOf('(') != -1)
		    {
		    var ln2p2 = lines[0].substring(0, lines[0].indexOf('(')).trim()
		    }
		    else var ln2p2 = "set name"
		}
	}

	
		var ln5p2 = EVs[0]
		var ln6p2 = EVs[1]
		var ln7p2 = EVs[2]
		var ln8p2 = EVs[3]
		var ln9p2 = EVs[4]
		var ln10p2 = EVs[5]
		var ln12p2 = IVs[0]
		var ln13p2 = IVs[1]
		var ln14p2 = IVs[2]
		var ln15p2 = IVs[3]
		var ln16p2 = IVs[4]
		var ln17p2 = IVs[5]
		
		
		if (EVs[0] == 0)
		{
			var hpev = ""
		}
		else var hpev = ln5p1.concat(EVs[0], lnbr)
		
		if (EVs[1] == 0)
		{
			var atev = ""
		}
		else var atev = ln6p1.concat(EVs[1], lnbr)
		
		if (EVs[2] == 0)
		{
			var deev = ""
		}
		else var deev = ln7p1.concat(EVs[2], lnbr)
		
		if (EVs[3] == 0)
		{
			var saev = ""
		}
		else var saev = ln8p1.concat(EVs[3], lnbr)
		
		if (EVs[4] == 0)
		{
			var sdev = ""
		}
		else var sdev = ln9p1.concat(EVs[4], lnbr)
		
		if (EVs[5] == 0)
		{
			var spev = ""
		}
		else var spev = ln10p1.concat(EVs[5], lnbr)
		
		
		
		if (IVs[0] == 31)
		{
			var hpiv = ""
		}
		else var hpiv = ln5p1.concat(IVs[0], lnbr)
		
		if (IVs[1] == 31)
		{
			var ativ = ""
		}
		else var ativ = ln6p1.concat(IVs[1], lnbr)
		
		if (IVs[2] == 31)
		{
			var deiv = ""
		}
		else var deiv = ln7p1.concat(IVs[2], lnbr)
		
		if (IVs[3] == 31)
		{
			var saiv = ""
		}
		else var saiv = ln8p1.concat(IVs[3], lnbr)
		
		if (IVs[4] == 31)
		{
			var sdiv = ""
		}
		else var sdiv = ln9p1.concat(IVs[4], lnbr)
		
		if (IVs[5] == 31)
		{
			var spiv = ""
		}
		else var spiv = ln10p1.concat(IVs[5], lnbr)
		
		
	var res = ln1p1.concat(species, ln1p2, ln2p1, ln2p2, ln2p3, ln3, ln4, hpev, atev, deev, saev, sdev, spev, ln11, ln12p1, hpiv, ativ, deiv, saiv, sdiv, spiv, ln11v2, ln19p1, nature, lnen, ln20p1, ability, lnen, ln21p1, item, lnen, ln22, lnmv, move1, lnen, lnmv, move2, lnen, lnmv, move3, lnen, lnmv, move4, lnenl, ln3l, ln2l, lnl);
    document.getElementById("Output").innerHTML = res


}
