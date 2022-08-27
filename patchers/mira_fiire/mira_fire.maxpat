{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 5,
			"revision" : 0,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 35.0, 79.0, 1249.0, 987.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
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
		"style" : "",
		"subpatcher_template" : "",
		"assistshowspatchername" : 0,
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-21",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 170.426318399999985, 725.0, 25.0, 22.0 ],
					"text" : "iter"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-20",
					"maxclass" : "newobj",
					"numinlets" : 7,
					"numoutlets" : 2,
					"outlettype" : [ "int", "" ],
					"patching_rect" : [ 107.997371466666635, 769.0, 207.573681600000015, 22.0 ],
					"text" : "midiformat"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-19",
					"maxclass" : "newobj",
					"numinlets" : 4,
					"numoutlets" : 4,
					"outlettype" : [ "", "", "", "" ],
					"patching_rect" : [ 108.426318399999985, 689.0, 112.0, 22.0 ],
					"text" : "route note cc sysex"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-18",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 865.0, 473.0, 123.0, 22.0 ],
					"text" : "prepend ButtonsInput"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-17",
					"maxclass" : "newobj",
					"numinlets" : 32,
					"numoutlets" : 1,
					"outlettype" : [ "list" ],
					"patching_rect" : [ 865.0, 441.0, 344.5, 22.0 ],
					"text" : "funnel 32"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-15",
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 876.5, 403.0, 100.0, 20.0 ],
					"text" : "NOTE",
					"texton" : "NOTE"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-14",
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 865.0, 375.0, 100.0, 20.0 ],
					"text" : "STEP",
					"texton" : "STEP"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-13",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 446.000000000000114, 516.0, 153.0, 22.0 ],
					"saved_object_attributes" : 					{
						"filename" : "decode_sysex_stream.js",
						"parameter_enable" : 0
					}
,
					"text" : "js decode_sysex_stream.js"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-3",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 446.0, 550.0, 115.0, 22.0 ],
					"text" : "prepend SysexInput"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-16",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 375.5, 516.0, 61.0, 22.0 ],
					"text" : "print input"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-12",
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 258.0, 239.0, 100.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 27.0, 672.0, 100.0, 20.0 ],
					"text" : "Detect Ports"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-11",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 258.0, 276.0, 58.0, 22.0 ],
					"text" : "loadbang"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-10",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 268.5, 550.0, 100.0, 22.0 ],
					"text" : "prepend CCInput"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-9",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 258.0, 516.0, 108.0, 22.0 ],
					"text" : "prepend NoteInput"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-8",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 8,
					"outlettype" : [ "", "", "", "int", "int", "", "int", "" ],
					"patching_rect" : [ 258.0, 482.0, 92.5, 22.0 ],
					"text" : "midiparse"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-6",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 441.5, 446.0, 77.0, 22.0 ],
					"text" : "prepend port"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-7",
					"items" : [ "None", ",", "IAC Driver Bus 1", ",", "Sensel Morph", ",", "IAC Driver FireIn", ",", "IAC Driver FireOut", ",", "from Max 1", ",", "from Max 2", ",", "MiraFireOut", ",", "MiraFireIn" ],
					"maxclass" : "umenu",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "int", "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 401.0, 403.0, 100.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 141.0, 672.0, 100.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "None", "IAC Driver Bus 1", "Sensel Morph", "IAC Driver FireIn", "IAC Driver FireOut", "from Max 1", "from Max 2", "MiraFireOut", "MiraFireIn" ],
							"parameter_longname" : "umenu[1]",
							"parameter_mmax" : 8,
							"parameter_shortname" : "umenu",
							"parameter_type" : 2
						}

					}
,
					"varname" : "umenu[1]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-5",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 572.5, 446.0, 77.0, 22.0 ],
					"text" : "prepend port"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-4",
					"items" : [ "None", ",", "IAC Driver Bus 1", ",", "Sensel Morph", ",", "IAC Driver FireIn", ",", "IAC Driver FireOut", ",", "to Max 1", ",", "to Max 2", ",", "MiraFireIn", ",", "MiraFireOut" ],
					"maxclass" : "umenu",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "int", "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 533.0, 403.0, 100.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 258.0, 672.0, 100.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "None", "IAC Driver Bus 1", "Sensel Morph", "IAC Driver FireIn", "IAC Driver FireOut", "to Max 1", "to Max 2", "MiraFireIn", "MiraFireOut" ],
							"parameter_longname" : "umenu",
							"parameter_mmax" : 8,
							"parameter_shortname" : "umenu",
							"parameter_type" : 2
						}

					}
,
					"varname" : "umenu"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-2",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 533.0, 367.0, 170.0, 22.0 ],
					"text" : "aumhaa.midi4lout MiraFireOut"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 260.0, 367.0, 153.0, 22.0 ],
					"text" : "aumhaa.midi4lin MiraFireIn"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-46",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 108.426318399999985, 211.0, 120.0, 22.0 ],
					"text" : "prepend livestep_out"
				}

			}
, 			{
				"box" : 				{
					"bgstepcolor" : [ 0.643137254901961, 0.643137254901961, 0.643137254901961, 1.0 ],
					"bgstepcolor2" : [ 0.643137254901961, 0.643137254901961, 0.643137254901961, 1.0 ],
					"bordercolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"bordercolor2" : [ 1.0, 1.0, 1.0, 1.0 ],
					"columns" : 32,
					"direction" : 0,
					"id" : "obj-44",
					"marker_horizontal" : 32,
					"marker_vertical" : 17,
					"matrixmode" : 1,
					"maxclass" : "live.grid",
					"numinlets" : 2,
					"numoutlets" : 6,
					"outlettype" : [ "", "", "", "", "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 26.0, 45.775013357143052, 431.131591999999955, 148.107117000000017 ],
					"presentation" : 1,
					"presentation_rect" : [ 27.0, 131.592589999999973, 959.0, 317.107117000000017 ],
					"rounded" : 35.0,
					"rows" : 8,
					"saved_attribute_attributes" : 					{
						"bgstepcolor" : 						{
							"expression" : ""
						}
,
						"bgstepcolor2" : 						{
							"expression" : ""
						}
,
						"bordercolor" : 						{
							"expression" : ""
						}
,
						"bordercolor2" : 						{
							"expression" : ""
						}
,
						"valueof" : 						{
							"parameter_invisible" : 1,
							"parameter_longname" : "live.grid",
							"parameter_shortname" : "live.grid",
							"parameter_type" : 3
						}

					}
,
					"spacing" : 0.0,
					"varname" : "live.grid"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-47",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "init" ],
					"patching_rect" : [ 136.176318399999985, 403.0, 31.0, 22.0 ],
					"text" : "t init"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-45",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "bang", "int", "int" ],
					"patching_rect" : [ 136.176318399999985, 367.0, 83.0, 22.0 ],
					"text" : "live.thisdevice"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-43",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 108.426318399999985, 645.0, 79.0, 22.0 ],
					"saved_object_attributes" : 					{
						"filename" : "mira_fire.js",
						"parameter_enable" : 0
					}
,
					"text" : "js mira_fire.js"
				}

			}
, 			{
				"box" : 				{
					"background" : 1,
					"id" : "obj-39",
					"ignoreclick" : 1,
					"maxclass" : "mira.frame",
					"numinlets" : 0,
					"numoutlets" : 0,
					"patching_rect" : [ 496.0, 45.775013357143052, 71.73626708984375, 51.000001101754577 ],
					"presentation" : 1,
					"presentation_rect" : [ 16.11726272106165, 11.0, 988.765474557876701, 702.950436892302946 ],
					"tabname" : "fire",
					"varname" : "mira_frame"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-13", 0 ],
					"order" : 0,
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"source" : [ "obj-1", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 0 ],
					"order" : 1,
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-43", 0 ],
					"midpoints" : [ 278.0, 582.0, 117.926318399999985, 582.0 ],
					"source" : [ "obj-10", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"order" : 1,
					"source" : [ "obj-11", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 0 ],
					"midpoints" : [ 267.5, 332.0, 542.5, 332.0 ],
					"order" : 0,
					"source" : [ "obj-11", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-11", 0 ],
					"source" : [ "obj-12", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"source" : [ "obj-13", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-17", 0 ],
					"source" : [ "obj-14", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-17", 1 ],
					"source" : [ "obj-15", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-18", 0 ],
					"source" : [ "obj-17", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-43", 0 ],
					"midpoints" : [ 874.5, 641.5, 117.926318399999985, 641.5 ],
					"source" : [ "obj-18", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-20", 1 ],
					"source" : [ "obj-19", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-20", 0 ],
					"source" : [ "obj-19", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-21", 0 ],
					"source" : [ "obj-19", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-4", 0 ],
					"source" : [ "obj-2", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 0 ],
					"midpoints" : [ 117.497371466666635, 807.0, 832.713159200000064, 807.0, 832.713159200000064, 335.0, 542.5, 335.0 ],
					"source" : [ "obj-20", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 0 ],
					"midpoints" : [ 179.926318399999985, 757.0, 832.713159200000064, 757.0, 832.713159200000064, 334.0, 542.5, 334.0 ],
					"source" : [ "obj-21", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-43", 0 ],
					"midpoints" : [ 455.5, 640.5, 117.926318399999985, 640.5 ],
					"source" : [ "obj-3", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"source" : [ "obj-4", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-19", 0 ],
					"source" : [ "obj-43", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-46", 0 ],
					"source" : [ "obj-44", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-47", 0 ],
					"source" : [ "obj-45", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-43", 0 ],
					"source" : [ "obj-46", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-43", 0 ],
					"midpoints" : [ 145.676318399999985, 432.75, 117.926318399999985, 432.75 ],
					"source" : [ "obj-47", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 1 ],
					"midpoints" : [ 582.0, 478.0, 716.75, 478.0, 716.75, 356.0, 693.5, 356.0 ],
					"source" : [ "obj-5", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"midpoints" : [ 451.0, 478.0, 527.75, 478.0, 527.75, 355.0, 269.5, 355.0 ],
					"source" : [ "obj-6", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-6", 0 ],
					"source" : [ "obj-7", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-10", 0 ],
					"source" : [ "obj-8", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-16", 0 ],
					"source" : [ "obj-8", 7 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-9", 0 ],
					"source" : [ "obj-8", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-43", 0 ],
					"midpoints" : [ 267.5, 548.0, 117.926318399999985, 548.0 ],
					"source" : [ "obj-9", 0 ]
				}

			}
 ],
		"parameters" : 		{
			"obj-4" : [ "umenu", "umenu", 0 ],
			"obj-44" : [ "live.grid", "live.grid", 0 ],
			"obj-7" : [ "umenu[1]", "umenu", 0 ],
			"parameterbanks" : 			{
				"0" : 				{
					"index" : 0,
					"name" : "",
					"parameters" : [ "-", "-", "-", "-", "-", "-", "-", "-" ]
				}

			}
,
			"inherited_shortname" : 1
		}
,
		"dependency_cache" : [ 			{
				"name" : "aumhaa.midi4lin.mxo",
				"type" : "iLaX"
			}
, 			{
				"name" : "aumhaa.midi4lout.mxo",
				"type" : "iLaX"
			}
, 			{
				"name" : "aumhaa_LiveAPI_util.js",
				"bootpath" : "~/Documents/Max 8/Packages/mod/javascript/aumhaa_js/base",
				"patcherrelativepath" : "../../../mod/javascript/aumhaa_js/base",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "decode_sysex_stream.js",
				"bootpath" : "~/Documents/Max 8/Packages/OJI/patchers/mira_fiire",
				"patcherrelativepath" : ".",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "mira_fire.js",
				"bootpath" : "~/Documents/Max 8/Packages/OJI/javascript/mira_fire",
				"patcherrelativepath" : "../../javascript/mira_fire",
				"type" : "TEXT",
				"implicit" : 1
			}
 ],
		"autosave" : 0
	}

}
