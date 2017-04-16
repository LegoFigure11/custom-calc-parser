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
	var ln2 = '    "Set Name": { \n'
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
	var lnl = '  }'

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
			if(lines[i].indexOf("IVs") != -1) //if EVs are in this line
			{
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
			}
	}

	
		var ln5p2 = EVs[0]
		var ln6p2 = EVs[1]
		var ln7p2 = EVs[2]
		var ln8p2 = EVs[3]
		var ln9p2 = EVs[4]
		var ln10p2 = EVs[5]
		var ln12p2 = IVs[0] * 2
		var ln13p2 = IVs[1]
		var ln14p2 = IVs[2]
		var ln15p2 = IVs[3]
		var ln16p2 = IVs[4]
		var ln17p2 = IVs[5]	
		
	var res = ln1p1.concat(species, ln1p2, ln2, ln3, ln4, ln5p1, ln5p2, lnbr, ln6p1, ln6p2, lnbr, ln7p1, ln7p2, lnbr, ln8p1, ln8p2, lnbr, ln9p1, ln9p2, lnbr, ln10p1, ln10p2, lnbr, ln11, ln12p1, ln5p1, ln12p2, lnbr, ln6p1, ln13p2, lnbr, ln7p1, ln14p2, lnbr, ln8p1, ln15p2, lnbr, ln9p1, ln16p2, lnbr, ln10p1, ln17p2, lnbr, ln11, ln19p1, nature, lnen, ln20p1, ability, lnen, ln21p1, item, lnen, ln22, lnmv, move1, lnen, lnmv, move2, lnen, lnmv, move3, lnen, lnmv, move4, lnenl, ln3l, ln2l, lnl);
    document.getElementById("Output").innerHTML = res


}
