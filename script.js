// 90% of this code is shamelessly stolen from Jake White's VGC calc, so huge shoutouts to him!

var showdownFormes = [
["rotomwash", "Rotom-W"],
["rotomheat", "Rotom-H"],
["landorustherian", "Landorus-T"],
["thundurustherian", "Thundurus-T"]];

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
	var ln2p2 = "SET NAME"
	var ln2p3 = '": { \n'
	var ln3 = '      "level": 50, \n'
	var ln4 = '      "evs": { \n'
	var ln5p1 = '        "hp": '
	var lnbr = '\n'
	var ln6p1 = '        "at": '
	var ln7p1 = '        "df": '
	var ln8p1 = '        "sa": '
	var ln9p1 = '        "sd": '
	var ln10p1 = '        "sp": '
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
	var evln = ','
	var evbr = '"'
	
	var item = string.substring(string.indexOf('"item":"')+8, string.indexOf('","ability'));
	var species = string.substring(string.indexOf('{"species":"')+12, string.indexOf('","'));
	var nature = string.substring(string.indexOf('"nature":"')+10, string.indexOf('","moves'));
	var ability = string.substring(string.indexOf('"ability":"')+11, string.indexOf('","evs":'));
	
	// HP EV
	if (string.substring(string.indexOf('"hp":')+5, string.indexOf(',"atk"')) == 0)
	{
		var hpev = ""
	}
	else var hpev = ln5p1.concat(evbr, string.substring(string.indexOf('"hp":')+5, string.indexOf(',"atk"')), evbr)
	// Atk EV
	if (string.substring(string.indexOf('"atk":')+6, string.indexOf(',"def"')) == 0)
	{
		var atev = ""
	}
	else var atev = ln6p1.concat(evbr, string.substring(string.indexOf('"atk":')+6, string.indexOf(',"def"')), evbr)
	// Def EV
	if (string.substring(string.indexOf('"def":')+6, string.indexOf(',"spa"')) == 0)
	{
		var deev = ""
	}
	else var deev = ln7p1.concat(evbr, string.substring(string.indexOf('"def":')+6, string.indexOf(',"spa"')), evbr)
	// SpA EV
	if (string.substring(string.indexOf('"spa":')+6, string.indexOf(',"spd"')) == 0)
	{
		var saev = ""
	}
	else var saev = ln8p1.concat(evbr, string.substring(string.indexOf('"spa":')+6, string.indexOf(',"spd"')), evbr)
	// SpD EV
	if (string.substring(string.indexOf('"spd":')+6, string.indexOf(',"spe"')) == 0)
	{
		var sdev = ""
	}
	else var sdev = ln9p1.concat(evbr, string.substring(string.indexOf('"spd":')+6, string.indexOf(',"spe"')), evbr)
	// Spe EV
	if (string.substring(string.indexOf('"spe":')+6, string.indexOf('},"nature"')) == 0)
	{
		var spev = ""
	}
	else var spev = ln10p1.concat(evbr, string.substring(string.indexOf('"spe":')+6, string.indexOf('},"nature"')), evbr)
	
	if(hpev.length > 0)
	{
		var hpc = ", \n"
	}
	else var hpc = ""
	if(atev.length > 0)
	{
		var atc = ", \n"
	}
	else var atc = ""
	if(deev.length > 0)
	{
		var dec = ", \n"
	}
	else var dec = ""
	if(saev.length > 0)
	{
		var sac = ", \n"
	}
	else var sac = ""
	if(sdev.length > 0)
	{
		var sdc = ", \n"
	}
	else var sdc = ""
	if(spev.length > 0)
	{
		var spc = ", \n"
	}
	else var spc = ""
	
	
	
	
	var movesall = string.substring(string.indexOf('"moves":[[') + 11, string.lastIndexOf(']]'))
	var move1 = string.substring(string.indexOf('"moves":[[') + 11, string.indexOf('"],['))
	var m2p1 = movesall.substring(movesall.indexOf(move1) + move1.length + 4)
	var move2 = m2p1.substring(m2p1.indexOf(m2p1) + 1, m2p1.indexOf('"],['))
	var m3p1 = movesall.substring(movesall.indexOf(move2) + move2.length + 4)
	var move3 = m3p1.substring(m3p1.indexOf(m3p1) + 1, m3p1.indexOf('"],['))
	var move4 = string.substring(string.lastIndexOf('"],["') + 5, string.lastIndexOf('"]]'))
	
	var res = ln1p1.concat(species, ln1p2, ln2p1, ln2p2, ln2p3, ln3, ln4, hpev, hpc, atev, atc, deev, dec, saev, sac, sdev, sdc, spev, spc, ln11, ln12p1, ln19p1, nature, lnen, ln20p1, ability, lnen, ln21p1, item, lnen, ln22, lnmv, move1, lnen, lnmv, move2, lnen, lnmv, move3, lnen, lnmv, move4, lnenl, ln3l, ln2l, lnl)	
	//var res = ln1p1.concat(species, ln1p2, ln2p1, ln2p2, ln2p3, ln3, ln4, hpev, atev, deev, saev, sdev, spev, ln11, ln12p1, hpiv, ativ, deiv, saiv, sdiv, spiv, ln11v2, ln19p1, nature, lnen, ln20p1, ability, lnen, ln21p1, item, lnen, ln22, lnmv, move1, lnen, lnmv, move2, lnen, lnmv, move3, lnen, lnmv, move4, lnenl, ln3l, ln2l, lnl);
    document.getElementById("Output").innerHTML = res


}
