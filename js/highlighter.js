var sS ='<span class="';
var sE = "</span>"
var sC = {sFunction: sS +'function">function'+sE,
			sFunctionName: sS +'funcName">',
			sIf: sS +'if">if'+sE,
			sVariable: sS +'variable">',
			sOperand: sS +'operand">',
			sStringS: sS +'string">',
			sVar: sS +'var">var'+sE,
			sFor: sS +'for">for'+sE,
			sNew: sS +'new">new'+sE,
			sBreak: sS +'break">break'+sE,
			sReturn: sS +'return">return'+sE,
			sNumber: sS +'number">',
			sFuncCall: sS +'funcCall">',
			sClass: sS +'class">'};
function colorCode(inText)
{
	var functions =inText.split("function ");
	var pos =0;
	var endPos=0;
	for(var i = 0 ; i < functions.length;i++)
	{
		functions[i] = functions[i].substring(0,functions[i].search(/\W/gi));
	}
//sting highligher
	pos=0;
	var nBreaks = inText.split('"').length-1;
	var tier = inText.length;
	while(pos < inText.length)
	{
		pos = inText.indexOf('"',pos);
		if(pos < 0)
		{
			break;
		}
		if(isNotInTag(pos))
		{
			inText = [inText.slice(0,pos),sC.sStringS,inText.slice(pos)].join('');
			pos += sC.sStringS.length+1;
			pos = inText.indexOf('"',pos);
			inText = [inText.slice(0,pos+1),sE,inText.slice(pos+1)].join('');
			pos += sE.length+1;
		}
		else
		{
			pos++;
		}
	}
//operands

	pos =0;
	var nBreaks = inText.length;
	while(pos < inText.length)
	{
		var extra = inText.substring(pos).search(/[+\-*/$^&%=<]/gi);
		if(extra <0)
			break;
		pos += extra;
		if(isNotInTag(pos+1)&& inText[pos-1]!="<" && inText[pos+1]!="/")
		{
			inText = [inText.slice(0,pos+1),sE,inText.slice(pos+1)].join('');
			inText = [inText.slice(0,pos),sC.sOperand,inText.slice(pos)].join('');
			pos += sE.length + sC.sOperand.length+1;
		}
		else
		{
			pos++;
		}
	}
	
//functionNames
	pos =0;
	nBreaks = inText.split('function').length-1;
	for(var i =0 ; i<nBreaks;i++)
	{
		pos = inText.indexOf('function',pos)+8;
		if(isNotInTag(pos))
		{
			inText = [inText.slice(0,pos),sC.sFunctionName,inText.slice(pos)].join('');
			pos = inText.indexOf('(',pos);
			inText = [inText.slice(0,pos),sE,inText.slice(pos)].join('');
		}
		else
		{
			pos++;
		}
	}
//classFunction
	pos =0;
	while(pos < inText.length)
	{
		var extra = inText.substring(pos).search(/[\w]+\(/gi);
		if(extra <0)
			break;
		pos += extra;
		if(isNotInTag(pos))
		{
			var endPos = pos + inText.substring(pos).search(/\W/gi);
			if(functions.indexOf(inText.substring(pos,endPos))<0)
			{
				inText = [inText.slice(0,endPos),sE,inText.slice(endPos)].join('');
				inText = [inText.slice(0,pos),sC.sFuncCall,inText.slice(pos)].join('');
				pos += sE.length + sC.sFuncCall.length+1;
			}
			else
			{
				pos+=inText.substring(pos,endPos).length;
			}
		}
		else
		{
			pos++;
		}
	}
	


//numbers
	pos =0;
	var nBreaks = inText.length;
	while(pos < inText.length)
	{
		var extra = inText.substring(pos).search(/[ >\(\d][\d]/gi);
		
		if(extra <0)
			break;
		pos += extra +1;
		if(isNotInTag(pos))
		{
			inText = [inText.slice(0,pos+1),sE,inText.slice(pos+1)].join('');
			inText = [inText.slice(0,pos),sC.sNumber,inText.slice(pos)].join('');
			pos += sE.length + sC.sNumber.length;
		}
	}
//Class

	pos =0;
	while(pos < inText.length)
	{
		var extra = inText.substring(pos).search(/\W[A-Z]+/g);
		
		if(extra <0)
			break;
		pos += extra+1;
		if(isNotInTag(pos))
		{
			var endPos = inText.indexOf(".",pos);
			var endPosTwo = inText.indexOf("{",pos);
			if (endPosTwo < endPos && endPosTwo > 0) endPos = endPosTwo;
			endPosTwo = inText.indexOf(")",pos);
			if (endPosTwo < endPos && endPosTwo > 0) endPos = endPosTwo;
			inText = [inText.slice(0,endPos),sE,inText.slice(endPos)].join('');
			inText = [inText.slice(0,pos),sC.sClass,inText.slice(pos)].join('');
			pos += sE.length + sC.sClass.length+1;
		}
		else
		{
			pos++;
		}
	}
//simpleHighlight
	return inText.replace(/!@/gi ,"<br />")
		.replace(/!#/gi,"    ")
		.replace(/function/gi,sC.sFunction)
		.replace(/if/gi,sC.sIf)
		.replace(/var/gi,sC.sVar)
		.replace(/new/gi,sC.sNew)
		.replace(/for/gi,sC.sFor)
		.replace(/return/gi,sC.sReturn)
		.replace(/break/gi,sC.sBreak);
		
	function isNotInTag(pos)
	{
		var spanDex = inText.indexOf("<span",pos);
		var closeDex = inText.indexOf("</span>",pos);
		var lastDex = inText.substring(0,pos).lastIndexOf("<span");
		var lastCloseDex = inText.substring(0,pos).lastIndexOf("</");
		if(spanDex < 0) spanDex= 99999;
		if(lastCloseDex<0) lastCloseDex = lastDex+1;
		if((spanDex < closeDex || closeDex < 0)&& lastDex < lastCloseDex)
		{
			return true;
		}
		return false;
	}
}