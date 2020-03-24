{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 7,
			"minor" : 3,
			"revision" : 0,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"rect" : [ 100.0, 100.0, 1057.0, 795.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 10.0,
		"default_fontface" : 1,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "11patcher-1",
		"subpatcher_template" : "11oLsen",
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-4",
					"linecount" : 3,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 541.0, 729.0, 349.0, 41.0 ],
					"style" : "",
					"text" : "I decided to use MAC's 'Command' key as the equivalent to WIN's 'Control' key. Although there's a 'Control' key on MAC, most cross-platform software treats MAC's 'Command' like WIN's 'Control'.    "
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-29",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 69.5, 671.800049, 56.0, 18.0 ],
					"style" : "",
					"text" : "zoom out"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-28",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 40.5, 480.800049, 56.0, 18.0 ],
					"style" : "",
					"text" : "zoom in"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-17",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 40.5, 668.800049, 24.0, 24.0 ],
					"style" : ""
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-19",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 40.5, 701.300049, 44.0, 20.0 ],
					"style" : "",
					"text" : "del 200"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-12",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 40.5, 500.800049, 24.0, 24.0 ],
					"style" : ""
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-15",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 40.5, 535.800049, 44.0, 20.0 ],
					"style" : "",
					"text" : "del 200"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-11",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 40.5, 728.0, 104.75, 20.0 ],
					"style" : "",
					"text" : "6 1, 83 1, 83 0, 6 0"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-10",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 40.5, 564.799988, 104.75, 20.0 ],
					"style" : "",
					"text" : "6 1, 84 1, 84 0, 6 0"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-39",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 69.5, 149.0, 131.0, 29.0 ],
					"style" : "",
					"text" : "testing: click the bang, then click the textedit"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Lucida Console",
					"id" : "obj-37",
					"linecount" : 4,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 299.0, 11.0, 511.0, 46.0 ],
					"style" : "",
					"text" : "[11strokes2] \n- creates global keyboard events\n- cross-platform and to a certain degree independent from users keyboard layout\n- by 11OLSEN.DE",
					"textcolor" : [ 0.019608, 0.254902, 0.035294, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-35",
					"maxclass" : "textedit",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "", "int", "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 163.5, 189.0, 100.0, 50.0 ],
					"style" : ""
				}

			}
, 			{
				"box" : 				{
					"fontface" : 1,
					"fontname" : "Arial",
					"fontsize" : 11.0,
					"id" : "obj-31",
					"linecount" : 6,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 100.5, 38.900002, 163.0, 82.0 ],
					"style" : "",
					"text" : "second value: \n1 for key down, 0 for key up\n2 for key down + up\n3 for 2 x key down and up  \n4 for 3 x key down and up\n...  ",
					"textcolor" : [ 0.513726, 0.0, 0.0, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontface" : 1,
					"fontname" : "Arial",
					"fontsize" : 11.0,
					"id" : "obj-32",
					"linecount" : 3,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 20.5, 38.900002, 80.0, 44.0 ],
					"style" : "",
					"text" : "first value: code for the key",
					"textcolor" : [ 0.047059, 0.513726, 0.0, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontface" : 1,
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-33",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 20.5, 16.0, 129.0, 20.0 ],
					"style" : "",
					"text" : "send a list of 2 ints:"
				}

			}
, 			{
				"box" : 				{
					"angle" : 0.0,
					"bgcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"id" : "obj-34",
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 13.0, 11.0, 250.5, 112.900002 ],
					"proportion" : 0.39,
					"style" : ""
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-30",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 28.25, 284.0, 100.0, 20.0 ],
					"style" : "",
					"text" : "i 47"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-25",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 109.25, 248.0, 50.0, 20.0 ],
					"style" : ""
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.760784, 0.878431, 0.796078, 1.0 ],
					"fontsize" : 12.0,
					"id" : "obj-16",
					"linecount" : 3,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 538.0, 83.0, 282.0, 48.0 ],
					"style" : "",
					"text" : "green numbers address a specific key position on the hardware, the key may create a totally different char if it is not the US default layout  "
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.8, 0.964706, 0.984314, 1.0 ],
					"fontsize" : 12.0,
					"id" : "obj-14",
					"linecount" : 3,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 594.0, 141.0, 259.0, 48.0 ],
					"style" : "",
					"text" : "blue numbers address the correct key or key combination that creates the character, depending on the keyboard layout "
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.760784, 0.878431, 0.796078, 1.0 ],
					"fontface" : 1,
					"fontsize" : 12.0,
					"id" : "obj-13",
					"linecount" : 11,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 780.0, 199.5, 52.0, 158.0 ],
					"style" : "",
					"text" : "1083\n1084\n1085\n1086\n1087\n1088\n1089\n1090\n1091\n1092\n1093",
					"textjustification" : 2
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.8, 0.964706, 0.984314, 1.0 ],
					"fontface" : 1,
					"fontsize" : 12.0,
					"id" : "obj-23",
					"linecount" : 32,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 836.0, 199.5, 32.0, 448.0 ],
					"style" : "",
					"text" : "83\n84\n85\n86\n87\n88\n89\n90\n91\n92\n93\n94\n95\n96\n97\n98\n99\n100\n101\n102\n103\n104\n105\n106\n107\n108\n109\n110\n111\n112\n113\n114",
					"textjustification" : 2
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 1.0, 0.964706, 1.0 ],
					"fontface" : 1,
					"fontsize" : 12.0,
					"id" : "obj-27",
					"linecount" : 32,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 872.0, 199.5, 162.0, 448.0 ],
					"style" : "",
					"text" : "- Hyphen\n= Equals\n[ Opening bracket\n] Closing bracket\n; Semicolon\n' Single quote\n` Grave accent\n\\ Backslash\n, Comma\n. Period, dot or full stop\n/ Slash or divide\n! Exclamation mark\n\" Double quotes \n# Number\n$ Dollar\n% Procenttecken\n& Ampersand\n( Open parenthesis\n) Close parenthesis \n* Asterisk\n+ Plus\n: Colon\n< Less than \n> Greater than \n? Question mark\n@ At symbol\n^ Caret - circumflex\n_ Underscore\n{ Opening brace\n| Vertical bar\n} Closing brace\n~ Equivalency sign, tilde"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.997536, 0.883331, 0.611546, 1.0 ],
					"fontsize" : 12.0,
					"id" : "obj-20",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 299.0, 83.0, 203.0, 34.0 ],
					"style" : "",
					"text" : "these should be the same with any keyboard layout"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.760784, 0.878431, 0.796078, 1.0 ],
					"fontface" : 1,
					"fontsize" : 12.0,
					"id" : "obj-18",
					"linecount" : 36,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 538.0, 199.5, 52.0, 503.0 ],
					"style" : "",
					"text" : "1047\n1048\n1049\n1050\n1051\n1052\n1053\n1054\n1055\n1056\n1057\n1058\n1059\n1060\n1061\n1062\n1063\n1064\n1065\n1066\n1067\n1068\n1069\n1070\n1071\n1072\n1073\n1074\n1075\n1076\n1077\n1078\n1079\n1080\n1081\n1082",
					"textjustification" : 2
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.8, 0.964706, 0.984314, 1.0 ],
					"fontface" : 1,
					"fontsize" : 12.0,
					"id" : "obj-7",
					"linecount" : 36,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 594.0, 199.5, 32.0, 503.0 ],
					"style" : "",
					"text" : "47\n48\n49\n50\n51\n52\n53\n54\n55\n56\n57\n58\n59\n60\n61\n62\n63\n64\n65\n66\n67\n68\n69\n70\n71\n72\n73\n74\n75\n76\n77\n78\n79\n80\n81\n82",
					"textjustification" : 2
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 1.0, 0.964706, 1.0 ],
					"fontface" : 1,
					"fontsize" : 12.0,
					"id" : "obj-9",
					"linecount" : 36,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 630.0, 199.5, 116.0, 503.0 ],
					"style" : "",
					"text" : "a\nb  \nc\nd \ne\nf\ng\nh\ni\nj\nk\nl\nm\nn\no\np\nq\nr\ns\nt\nu\nv\nw\nx\ny\nz\n0\n1\n2\n3            \n4\n5    \n6\n7\n8\n9"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.997536, 0.883331, 0.611546, 1.0 ],
					"fontface" : 1,
					"fontsize" : 12.0,
					"id" : "obj-1",
					"linecount" : 46,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 299.0, 127.0, 43.0, 641.0 ],
					"style" : "",
					"text" : "1 \n2 \n3 \n4 \n5\n6 \n7 \n8 \n9 \n10\n11 \n12\n13 \n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30\n31\n32\n33\n34\n35\n36\n37\n38\n39\n40\n41\n42\n43\n44\n45\n46 ",
					"textjustification" : 2
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 1.0, 0.964706, 1.0 ],
					"fontface" : 1,
					"fontsize" : 12.0,
					"id" : "obj-80",
					"linecount" : 46,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 346.0, 127.0, 158.0, 641.0 ],
					"style" : "",
					"text" : "Return\nTab\nSpace\nDelete (Backspace)          \nEscape\nCommand (Ctrl)\nShift\nCapsLock\nOption (Alt)\nControl (Win Key)        \nRightShift\nRightOption (Alt) \nRightControl (Win Key) \nFunction Key (Mac only!)\nF1\nF2\nF3\nF4\nF5\nF6\nF7\nF8\nF9\nF10\nF11\nF12\nF13\nF14\nF15\nF16\nF17\nF18\nF19\nF20\nHelp (Insert)\nForwardDelete (Delete)\nPageUp\nPageDown\nHome\nEnd\nVolumeUp\nVolumeDown\nLeftArrow\nRightArrow\nUpArrow\nDownArrow"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-8",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 28.25, 149.0, 24.0, 24.0 ],
					"style" : ""
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-6",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 28.25, 189.0, 100.0, 20.0 ],
					"style" : "",
					"text" : "del 2500"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-5",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 28.25, 325.0, 193.0, 20.0 ],
					"style" : "",
					"text" : "$1 1, $1 0"
				}

			}
, 			{
				"box" : 				{
					"color" : [ 0.819608, 0.054902, 0.054902, 1.0 ],
					"id" : "obj-3",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 28.25, 421.0, 100.0, 20.0 ],
					"style" : "",
					"text" : "11strokes2"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 50.0, 606.800012, 16.474999, 606.800012, 16.474999, 410.0, 37.75, 410.0 ],
					"source" : [ "obj-10", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 50.0, 762.0, 16.274999, 762.0, 16.274999, 410.0, 37.75, 410.0 ],
					"source" : [ "obj-11", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-15", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-12", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-10", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-15", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-19", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-17", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-11", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-19", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-30", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-25", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-30", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-5", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-30", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-6", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-6", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-8", 0 ]
				}

			}
 ],
		"dependency_cache" : [ 			{
				"name" : "11strokes2.mxe64",
				"type" : "mx64"
			}
 ],
		"autosave" : 0,
		"styles" : [ 			{
				"name" : "11patcher",
				"default" : 				{
					"bgfillcolor" : 					{
						"type" : "gradient",
						"color" : [ 0.290196, 0.309804, 0.301961, 1.0 ],
						"color1" : [ 0.65098, 0.666667, 0.662745, 1.0 ],
						"color2" : [ 0.4478, 0.484701, 0.47346, 1.0 ],
						"angle" : 270.0,
						"proportion" : 0.39,
						"autogradient" : 0
					}
,
					"bgcolor" : [ 0.862745, 0.870588, 0.878431, 1.0 ],
					"textcolor_inverse" : [ 0.0, 0.0, 0.0, 1.0 ],
					"patchlinecolor" : [ 0.32549, 0.345098, 0.372549, 0.94 ],
					"accentcolor" : [ 0.589653, 0.589635, 0.589645, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "11patcher-1",
				"default" : 				{
					"bgfillcolor" : 					{
						"type" : "gradient",
						"color" : [ 0.290196, 0.309804, 0.301961, 1.0 ],
						"color1" : [ 0.65098, 0.666667, 0.662745, 1.0 ],
						"color2" : [ 0.4478, 0.484701, 0.47346, 1.0 ],
						"angle" : 270.0,
						"proportion" : 0.39,
						"autogradient" : 0
					}
,
					"fontface" : [ 1 ],
					"fontsize" : [ 10.0 ],
					"bgcolor" : [ 0.984314, 0.976471, 0.976471, 1.0 ],
					"textcolor_inverse" : [ 0.0, 0.0, 0.0, 1.0 ],
					"patchlinecolor" : [ 0.32549, 0.345098, 0.372549, 0.94 ],
					"color" : [ 0.113725, 0.580392, 0.737255, 1.0 ],
					"accentcolor" : [ 0.589653, 0.589635, 0.589645, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
 ],
		"default_bgcolor" : [ 0.984314, 0.976471, 0.976471, 1.0 ],
		"color" : [ 0.113725, 0.580392, 0.737255, 1.0 ],
		"accentcolor" : [ 0.589653, 0.589635, 0.589645, 1.0 ],
		"textcolor_inverse" : [ 0.0, 0.0, 0.0, 1.0 ],
		"patchlinecolor" : [ 0.32549, 0.345098, 0.372549, 0.94 ],
		"bgfillcolor_type" : "gradient",
		"bgfillcolor_color1" : [ 0.65098, 0.666667, 0.662745, 1.0 ],
		"bgfillcolor_color2" : [ 0.4478, 0.484701, 0.47346, 1.0 ],
		"bgfillcolor_color" : [ 0.290196, 0.309804, 0.301961, 1.0 ],
		"bgfillcolor_angle" : 270.0,
		"bgfillcolor_proportion" : 0.39
	}

}
