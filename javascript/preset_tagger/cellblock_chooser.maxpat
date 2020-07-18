{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 1,
			"revision" : 4,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 434.0, 359.0, 598.0, 683.0 ],
		"bglocked" : 0,
		"openinpresentation" : 1,
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
					"comment" : "",
					"id" : "obj-21",
					"index" : 0,
					"maxclass" : "outlet",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 151.532711446285248, 470.422541379928589, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"comment" : "",
					"id" : "obj-20",
					"index" : 0,
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 151.532711446285248, 372.535216152667999, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-8",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 151.532711446285248, 427.166380643844604, 127.0, 22.0 ],
					"saved_object_attributes" : 					{
						"filename" : "cellblock_chooser.js",
						"parameter_enable" : 0
					}
,
					"text" : "js cellblock_chooser.js"
				}

			}
, 			{
				"box" : 				{
					"automouse" : 0,
					"bblend" : 100,
					"bgcolor" : [ 0.847058823529412, 0.847058823529412, 0.847058823529412, 1.0 ],
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"celldef" : [ [ 0, 0, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ] ],
					"cols" : 1,
					"colwidth" : 200,
					"fblend" : 100,
					"fontface" : 0,
					"fontname" : "Arial",
					"fontsize" : 10.0,
					"grid" : 0,
					"gridlinecolor" : [ 0.2, 0.2, 0.2, 1.0 ],
					"hcellcolor" : [ 0.537254901960784, 0.650980392156863, 0.847058823529412, 0.0 ],
					"hscroll" : 0,
					"id" : "obj-7",
					"maxclass" : "jit.cellblock",
					"numinlets" : 2,
					"numoutlets" : 4,
					"outlettype" : [ "list", "", "", "" ],
					"patching_rect" : [ 259.532711446285248, 209.654206454753876, 200.492957949638367, 178.507042706012726 ],
					"presentation" : 1,
					"presentation_rect" : [ 4.603130638599396, 4.724626302719116, 149.084506571292877, 221.464789748191833 ],
					"rowheight" : 15,
					"rows" : 1,
					"sccolor" : [ 0.545098039215686, 0.545098039215686, 0.545098039215686, 1.0 ],
					"sgcolor" : [ 0.380392156862745, 0.380392156862745, 0.388235294117647, 1.0 ],
					"stcolor" : [ 0.317647058823529, 0.317647058823529, 0.356862745098039, 1.0 ],
					"vscroll" : 0
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 0 ],
					"source" : [ "obj-20", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 1 ],
					"source" : [ "obj-7", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-21", 0 ],
					"source" : [ "obj-8", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"midpoints" : [ 269.032711446285248, 468.99644523859024, 491.995328485965729, 468.99644523859024, 491.995328485965729, 196.785047590732574, 269.032711446285248, 196.785047590732574 ],
					"source" : [ "obj-8", 1 ]
				}

			}
 ],
		"dependency_cache" : [ 			{
				"name" : "cellblock_chooser.js",
				"bootpath" : "~/Documents/Max 8/Packages/OJI/javascript/preset_tagger",
				"patcherrelativepath" : ".",
				"type" : "TEXT",
				"implicit" : 1
			}
 ],
		"autosave" : 0
	}

}
