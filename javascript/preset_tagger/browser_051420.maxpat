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
		"rect" : [ 313.0, 372.0, 783.0, 376.0 ],
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
					"id" : "obj-71",
					"linecount" : 2,
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1218.5, 633.5, 94.0, 35.0 ],
					"text" : "toFileTagger reveal_in_finder"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-70",
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1218.5, 577.0, 100.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 200.5, 283.5, 196.0, 20.0 ],
					"text" : "reveal in finder",
					"texton" : "reveal in finder",
					"varname" : "reveal_in_finder_button"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-69",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 165.0, 15.0, 50.0, 22.0 ],
					"presentation_linecount" : 2,
					"text" : "clear all"
				}

			}
, 			{
				"box" : 				{
					"active" : 0,
					"align" : 2,
					"fontface" : 0,
					"id" : "obj-48",
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 52.0, 171.746478646993637, 56.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 167.5, 3.5, 31.0, 16.0 ],
					"text" : "<==back",
					"textjustification" : 2,
					"texton" : "<==back",
					"varname" : "parent_back_button"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-16",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 337.0, 255.253521353006363, 150.0, 22.0 ],
					"text" : "prepend toChildChooser"
				}

			}
, 			{
				"box" : 				{
					"automouse" : 0,
					"bblend" : 100,
					"bgcolor" : [ 0.886274509803922, 0.886274509803922, 0.886274509803922, 1.0 ],
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"celldef" : [ [ 0, 0, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.0, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 1, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 2, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 3, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 4, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 5, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 6, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 7, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 8, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 9, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 10, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 11, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 12, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ] ],
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
					"id" : "obj-17",
					"maxclass" : "jit.cellblock",
					"numinlets" : 2,
					"numoutlets" : 4,
					"outlettype" : [ "list", "", "", "" ],
					"patching_rect" : [ 337.0, 61.746478646993637, 142.492957949638367, 178.507042706012726 ],
					"presentation" : 1,
					"presentation_rect" : [ 200.5, 3.5, 196.0, 277.982394874095917 ],
					"rowheight" : 15,
					"rows" : 13,
					"sccolor" : [ 0.545098039215686, 0.545098039215686, 0.545098039215686, 1.0 ],
					"sgcolor" : [ 0.380392156862745, 0.380392156862745, 0.388235294117647, 1.0 ],
					"stcolor" : [ 0.317647058823529, 0.317647058823529, 0.356862745098039, 1.0 ],
					"varname" : "child_chooser",
					"vscroll" : 0
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-13",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 169.0, 255.253521353006363, 147.0, 22.0 ],
					"text" : "prepend toParentChooser"
				}

			}
, 			{
				"box" : 				{
					"automouse" : 0,
					"bblend" : 100,
					"bgcolor" : [ 0.886274509803922, 0.886274509803922, 0.886274509803922, 1.0 ],
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"celldef" : [ [ 0, 0, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.0, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 1, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 2, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 3, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 4, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 5, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 6, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 7, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 8, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 9, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 10, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 11, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 12, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ] ],
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
					"id" : "obj-3",
					"maxclass" : "jit.cellblock",
					"numinlets" : 2,
					"numoutlets" : 4,
					"outlettype" : [ "list", "", "", "" ],
					"patching_rect" : [ 169.0, 61.746478646993637, 142.492957949638367, 178.507042706012726 ],
					"presentation" : 1,
					"presentation_rect" : [ 2.5, 22.5, 196.0, 281.0 ],
					"rowheight" : 15,
					"rows" : 13,
					"sccolor" : [ 0.545098039215686, 0.545098039215686, 0.545098039215686, 1.0 ],
					"sgcolor" : [ 0.380392156862745, 0.380392156862745, 0.388235294117647, 1.0 ],
					"stcolor" : [ 0.317647058823529, 0.317647058823529, 0.356862745098039, 1.0 ],
					"varname" : "parent_chooser",
					"vscroll" : 0
				}

			}
, 			{
				"box" : 				{
					"automouse" : 0,
					"bblend" : 100,
					"bgcolor" : [ 0.886274509803922, 0.886274509803922, 0.886274509803922, 1.0 ],
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"celldef" : [ [ 0, 0, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.0, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 1, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 2, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 3, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 4, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 5, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 6, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 7, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 8, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 9, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 10, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 11, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 12, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ] ],
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
					"id" : "obj-10",
					"maxclass" : "jit.cellblock",
					"numinlets" : 2,
					"numoutlets" : 4,
					"outlettype" : [ "list", "", "", "" ],
					"patching_rect" : [ 661.0, 65.746478646993637, 142.492957949638367, 178.507042706012726 ],
					"presentation" : 1,
					"presentation_rect" : [ 399.0, 3.5, 189.5, 299.982394874095917 ],
					"rowheight" : 15,
					"rows" : 13,
					"sccolor" : [ 0.545098039215686, 0.545098039215686, 0.545098039215686, 1.0 ],
					"sgcolor" : [ 0.380392156862745, 0.380392156862745, 0.388235294117647, 1.0 ],
					"stcolor" : [ 0.317647058823529, 0.317647058823529, 0.356862745098039, 1.0 ],
					"varname" : "filechooser",
					"vscroll" : 0
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-78",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 840.999908000000005, 259.253521353006363, 131.0, 22.0 ],
					"text" : "prepend toTagChooser"
				}

			}
, 			{
				"box" : 				{
					"automouse" : 0,
					"bblend" : 100,
					"bgcolor" : [ 0.886274509803922, 0.886274509803922, 0.886274509803922, 1.0 ],
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"celldef" : [ [ 0, 0, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.0, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 1, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 2, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 3, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 4, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 5, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 6, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 7, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 8, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 9, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 10, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 11, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ], [ 0, 12, 0, 1, 0.0, 0.0, 0.0, 1.0, 0, 0.705882352941176, 0.705882352941176, 0.705882352941176, 1.0, -1, -1, -1 ] ],
					"cols" : 1,
					"colwidth" : 200,
					"fblend" : 100,
					"fontface" : 0,
					"fontname" : "Arial",
					"fontsize" : 10.0,
					"grid" : 0,
					"gridlinecolor" : [ 0.2, 0.2, 0.2, 1.0 ],
					"hcellcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 0.0 ],
					"hscroll" : 0,
					"id" : "obj-73",
					"maxclass" : "jit.cellblock",
					"numinlets" : 2,
					"numoutlets" : 4,
					"outlettype" : [ "list", "", "", "" ],
					"patching_rect" : [ 840.999908000000005, 65.746478646993637, 142.492957949638367, 178.507042706012726 ],
					"presentation" : 1,
					"presentation_rect" : [ 590.5, 46.517605125904083, 187.0, 237.982394874095917 ],
					"rowheight" : 15,
					"rows" : 15,
					"sccolor" : [ 0.545098039215686, 0.545098039215686, 0.545098039215686, 1.0 ],
					"sgcolor" : [ 0.380392156862745, 0.380392156862745, 0.388235294117647, 1.0 ],
					"stcolor" : [ 0.317647058823529, 0.317647058823529, 0.356862745098039, 1.0 ],
					"varname" : "tagchooser",
					"vscroll" : 0
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-64",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1133.0, 681.0, 175.0, 22.0 ],
					"text" : "toFileTagger tag_next_selected"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-63",
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1132.5, 546.0, 100.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 590.5, 283.5, 187.0, 20.0 ],
					"text" : "tag selected with filter",
					"varname" : "tag_next_selected_button"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-54",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 109.0, 22.0, 35.0, 22.0 ],
					"text" : "clear"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-61",
					"linecount" : 4,
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 22.0, 832.0, 52.0, 62.0 ],
					"text" : "window size 35 79 976 786"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-58",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 34.0, 759.0, 90.0, 22.0 ],
					"text" : "window getsize"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-56",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 93.0, 711.0, 125.0, 22.0 ],
					"text" : "prepend browserInput"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-82",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 24.0, 99.0, 64.0, 22.0 ],
					"text" : "floattoggle"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-81",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 24.0, 44.0, 37.0, 22.0 ],
					"text" : "close"
				}

			}
, 			{
				"box" : 				{
					"activebgcolor" : [ 0.274509803921569, 0.466666666666667, 0.843137254901961, 1.0 ],
					"activebgoncolor" : [ 0.188235294117647, 0.313725490196078, 0.992156862745098, 1.0 ],
					"annotation" : "Toggle whether the editor window floats.",
					"automation" : "close",
					"automationon" : "close",
					"bordercolor" : [ 0.12156862745098, 0.12156862745098, 0.12156862745098, 1.0 ],
					"focusbordercolor" : [ 0.12156862745098, 0.12156862745098, 0.12156862745098, 1.0 ],
					"fontsize" : 20.0,
					"id" : "obj-126",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"parameter_mappable" : 0,
					"patching_rect" : [ 24.0, 74.5, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 23.0625, 3.5, 18.5625, 17.0 ],
					"rounded" : 1.0,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "float",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_initial" : [ 0.0 ],
							"parameter_shortname" : "float",
							"parameter_enum" : [ "close", "close" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "-",
					"texton" : "parameters",
					"varname" : "float"
				}

			}
, 			{
				"box" : 				{
					"activebgcolor" : [ 0.847058823529412, 0.27843137254902, 0.27843137254902, 1.0 ],
					"activebgoncolor" : [ 0.996078431372549, 0.192156862745098, 0.192156862745098, 1.0 ],
					"annotation" : "Close the editor window.",
					"automation" : "close",
					"automationon" : "close",
					"bordercolor" : [ 0.12156862745098, 0.12156862745098, 0.12156862745098, 1.0 ],
					"focusbordercolor" : [ 0.12156862745098, 0.12156862745098, 0.12156862745098, 1.0 ],
					"fontface" : 1,
					"fontsize" : 12.0,
					"id" : "obj-119",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"parameter_mappable" : 0,
					"patching_rect" : [ 24.0, 19.5, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 2.5, 3.5, 18.5625, 17.0 ],
					"rounded" : 100.0,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "close",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_initial" : [ 0.0 ],
							"parameter_shortname" : "close",
							"parameter_enum" : [ "close", "close" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "X",
					"textcolor" : [ 0.137254901960784, 0.137254901960784, 0.137254901960784, 1.0 ],
					"textoffcolor" : [ 0.137254901960784, 0.137254901960784, 0.137254901960784, 1.0 ],
					"varname" : "close"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-47",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 992.999908000000005, 28.0, 175.0, 22.0 ],
					"text" : "prepend toTagFilter filter_mode"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-46",
					"maxclass" : "textbutton",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 992.999908000000005, -1.0, 100.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 590.5, 25.5, 187.0, 20.0 ],
					"text" : "OR",
					"textcolor" : [ 0.670588235294118, 0.717647058823529, 0.301960784313725, 1.0 ],
					"texton" : "AND"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-43",
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1076.0, 577.0, 100.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 689.5, 350.0, 88.0, 20.0 ],
					"text" : "folder clear"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-44",
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 999.5, 546.0, 100.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 689.5, 328.0, 88.0, 20.0 ],
					"text" : "folder remove"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-45",
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 925.0, 577.0, 100.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 590.5, 328.0, 85.0, 20.0 ],
					"text" : "folder set"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-42",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1076.0, 606.0, 170.0, 22.0 ],
					"text" : "toFileTagger clear_folder_tags"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-39",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 999.5, 606.0, 184.0, 22.0 ],
					"text" : "toFileTagger remove_folder_tags"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-38",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 925.0, 606.0, 160.0, 22.0 ],
					"text" : "toFileTagger set_folder_tags"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-36",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patcher" : 					{
						"fileversion" : 1,
						"appversion" : 						{
							"major" : 8,
							"minor" : 1,
							"revision" : 4,
							"architecture" : "x64",
							"modernui" : 1
						}
,
						"classnamespace" : "box",
						"rect" : [ 663.0, 286.0, 182.0, 288.0 ],
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
						"boxes" : [ 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-1",
									"index" : 2,
									"maxclass" : "outlet",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 90.0, 198.0, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-24",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 90.0, 158.0, 35.0, 22.0 ],
									"text" : "set 0"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-15",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "bang" ],
									"patching_rect" : [ 90.0, 131.0, 47.0, 22.0 ],
									"text" : "delay 5"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-77",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 2,
									"outlettype" : [ "", "" ],
									"patching_rect" : [ 25.0, 118.0, 38.0, 22.0 ],
									"text" : "zl rev"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-71",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 25.0, 96.0, 54.0, 22.0 ],
									"text" : "pack 0 s"
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-23",
									"index" : 1,
									"maxclass" : "inlet",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 25.0, 36.0, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-25",
									"index" : 2,
									"maxclass" : "inlet",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 56.0, 36.0, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-26",
									"index" : 1,
									"maxclass" : "outlet",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 25.0, 198.0, 30.0, 30.0 ]
								}

							}
 ],
						"lines" : [ 							{
								"patchline" : 								{
									"destination" : [ "obj-24", 0 ],
									"source" : [ "obj-15", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-15", 0 ],
									"order" : 0,
									"source" : [ "obj-23", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-71", 0 ],
									"order" : 1,
									"source" : [ "obj-23", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-1", 0 ],
									"source" : [ "obj-24", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-71", 1 ],
									"source" : [ "obj-25", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-77", 0 ],
									"source" : [ "obj-71", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-26", 0 ],
									"source" : [ "obj-77", 0 ]
								}

							}
 ]
					}
,
					"patching_rect" : [ 462.0, 807.0, 67.0, 22.0 ],
					"saved_object_attributes" : 					{
						"description" : "",
						"digest" : "",
						"globalpatchername" : "",
						"tags" : ""
					}
,
					"text" : "p tbtnswap"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-37",
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 462.0, 774.0, 100.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 43.625, 3.5, 126.875, 16.0 ],
					"text" : "scan_library",
					"texton" : "scan_library"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.235294117647059, 0.584313725490196, 0.364705882352941, 1.0 ],
					"bgcolor2" : [ 0.2, 0.2, 0.2, 1.0 ],
					"bgfillcolor_angle" : 270.0,
					"bgfillcolor_autogradient" : 0.0,
					"bgfillcolor_color" : [ 0.2, 0.2, 0.2, 1.0 ],
					"bgfillcolor_color1" : [ 0.235294117647059, 0.584313725490196, 0.364705882352941, 1.0 ],
					"bgfillcolor_color2" : [ 0.2, 0.2, 0.2, 1.0 ],
					"bgfillcolor_proportion" : 0.5,
					"bgfillcolor_type" : "gradient",
					"dontreplace" : 1,
					"gradient" : 1,
					"id" : "obj-12",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 642.0, 640.0, 255.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 200.5, 350.0, 196.0, 22.0 ],
					"varname" : "tag_buffer_display"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-2",
					"maxclass" : "comment",
					"numinlets" : 0,
					"numoutlets" : 0,
					"patching_rect" : [ 904.0, 484.0, 255.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 2.5, 306.0, 196.0, 20.0 ],
					"suppressinlet" : 1,
					"text" : "Currently selected file",
					"textcolor" : [ 1.0, 0.999974370002747, 0.999991297721863, 1.0 ],
					"textjustification" : 1,
					"underline" : 1
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.235294117647059, 0.352941176470588, 0.584313725490196, 1.0 ],
					"bgcolor2" : [ 0.2, 0.2, 0.2, 1.0 ],
					"bgfillcolor_angle" : 270.0,
					"bgfillcolor_autogradient" : 0.0,
					"bgfillcolor_color" : [ 0.2, 0.2, 0.2, 1.0 ],
					"bgfillcolor_color1" : [ 0.235294117647059, 0.352941176470588, 0.584313725490196, 1.0 ],
					"bgfillcolor_color2" : [ 0.2, 0.2, 0.2, 1.0 ],
					"bgfillcolor_proportion" : 0.5,
					"bgfillcolor_type" : "gradient",
					"gradient" : 1,
					"id" : "obj-9",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 904.0, 506.0, 255.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 200.5, 306.0, 388.0, 22.0 ],
					"varname" : "current_selected_file"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 11.595186999999999,
					"id" : "obj-1",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 142.499908000000005, 759.0, 241.0, 21.0 ],
					"text" : "window size 100 100 650 500, window exec"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-92",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 106.0, 870.5, 99.0, 22.0 ],
					"text" : "prepend position"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-41",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 200.999908000000005, 817.0, 124.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_defer" : 1,
							"parameter_initial" : [ 0, 0 ],
							"parameter_initial_enable" : 1,
							"parameter_invisible" : 1,
							"parameter_longname" : "window_position",
							"parameter_shortname" : "window_position",
							"parameter_type" : 3
						}

					}
,
					"saved_object_attributes" : 					{
						"initial" : [ 0, 0 ],
						"parameter_enable" : 1,
						"parameter_mappable" : 0
					}
,
					"text" : "pattr window_position",
					"varname" : "window_position"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-40",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 34.0, 802.0, 69.0, 22.0 ],
					"save" : [ "#N", "thispatcher", ";", "#Q", "end", ";" ],
					"text" : "thispatcher",
					"varname" : "thispatcher"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-59",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 815.0, 28.0, 123.0, 22.0 ],
					"text" : "toTagFilter clear_filter"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-55",
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 815.0, -1.0, 100.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 590.5, 3.5, 187.0, 20.0 ],
					"text" : "clear filter"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-53",
					"maxclass" : "comment",
					"numinlets" : 0,
					"numoutlets" : 0,
					"patching_rect" : [ 642.0, 506.0, 255.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 2.5, 328.0, 196.0, 20.0 ],
					"suppressinlet" : 1,
					"text" : "Currently selected file's active tags",
					"textcolor" : [ 1.0, 0.999974370002747, 0.999991297721863, 1.0 ],
					"textjustification" : 1,
					"underline" : 1
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.8000000119, 0.8000000119, 0.8000000119, 0.0 ],
					"id" : "obj-52",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 747.0, 687.0, 150.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 6.5, 350.0, 192.0, 20.0 ],
					"text" : "Edited tag for selected file",
					"textcolor" : [ 1.0, 0.999974370002747, 0.999991297721863, 1.0 ],
					"textjustification" : 1,
					"underline" : 1
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-51",
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 810.0, 546.0, 100.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 590.5, 350.0, 85.0, 20.0 ],
					"text" : "clear all"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-50",
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 713.0, 577.0, 100.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 689.5, 305.5, 88.0, 20.0 ],
					"text" : "remove"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-49",
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 642.0, 546.0, 100.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 590.5, 306.0, 85.0, 20.0 ],
					"text" : "add"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-30",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 642.0, 701.0, 59.0, 22.0 ],
					"text" : "route text"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-26",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 810.0, 606.0, 133.0, 22.0 ],
					"text" : "toFileTagger clear_tags"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-25",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 713.0, 606.0, 141.0, 22.0 ],
					"text" : "toFileTagger remove_tag"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-24",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 642.0, 606.0, 117.0, 22.0 ],
					"text" : "toFileTagger set_tag"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.588235294117647, 0.23921568627451, 0.23921568627451, 1.0 ],
					"bgcolor2" : [ 0.2, 0.2, 0.2, 1.0 ],
					"bgfillcolor_angle" : 270.0,
					"bgfillcolor_autogradient" : 0.0,
					"bgfillcolor_color" : [ 0.2, 0.2, 0.2, 1.0 ],
					"bgfillcolor_color1" : [ 0.588235294117647, 0.23921568627451, 0.23921568627451, 1.0 ],
					"bgfillcolor_color2" : [ 0.2, 0.2, 0.2, 1.0 ],
					"bgfillcolor_proportion" : 0.5,
					"bgfillcolor_type" : "gradient",
					"gradient" : 1,
					"id" : "obj-22",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 642.0, 482.0, 255.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 200.5, 328.0, 388.5, 22.0 ],
					"varname" : "selected_file_tags"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-20",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 642.0, 730.0, 202.0, 22.0 ],
					"text" : "prepend toFileTagger set_tag_buffer"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-19",
					"keymode" : 1,
					"maxclass" : "textedit",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "", "int", "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 642.0, 664.0, 255.0, 21.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 399.0, 350.0, 190.0, 21.0 ],
					"varname" : "tagfilter"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-11",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 661.0, 259.253521353006363, 131.0, 22.0 ],
					"text" : "prepend toFileChooser"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-8",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 642.0, 812.0, 59.0, 22.0 ],
					"text" : "route text"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-7",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 642.0, 842.0, 184.0, 22.0 ],
					"text" : "prepend toTagFilter set_tag_filter"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-6",
					"keymode" : 1,
					"maxclass" : "textedit",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "", "int", "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 642.0, 770.0, 255.0, 21.0 ],
					"varname" : "tagbox"
				}

			}
, 			{
				"box" : 				{
					"comment" : "",
					"id" : "obj-5",
					"index" : 0,
					"maxclass" : "outlet",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 606.0, 918.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"comment" : "",
					"id" : "obj-4",
					"index" : 0,
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 606.0, 14.0, 30.0, 30.0 ]
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-40", 0 ],
					"midpoints" : [ 151.999908000000005, 790.5, 43.5, 790.5 ],
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-11", 0 ],
					"midpoints" : [ 670.5, 260.753521353006363, 670.5, 260.753521353006363 ],
					"source" : [ "obj-10", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"midpoints" : [ 670.5, 313.126760676503181, 615.5, 313.126760676503181 ],
					"source" : [ "obj-11", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-81", 0 ],
					"source" : [ "obj-119", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-82", 0 ],
					"source" : [ "obj-126", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"midpoints" : [ 178.5, 314.126760676503181, 615.5, 314.126760676503181 ],
					"source" : [ "obj-13", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"midpoints" : [ 346.5, 316.626760676503181, 615.5, 316.626760676503181 ],
					"source" : [ "obj-16", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-16", 0 ],
					"source" : [ "obj-17", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-30", 0 ],
					"source" : [ "obj-19", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"midpoints" : [ 651.5, 752.0, 615.5, 752.0 ],
					"source" : [ "obj-20", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"midpoints" : [ 651.5, 633.5, 615.5, 633.5 ],
					"source" : [ "obj-24", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"midpoints" : [ 722.5, 632.5, 615.5, 632.5 ],
					"source" : [ "obj-25", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"midpoints" : [ 819.5, 633.5, 615.5, 633.5 ],
					"source" : [ "obj-26", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-13", 0 ],
					"source" : [ "obj-3", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-20", 0 ],
					"source" : [ "obj-30", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"midpoints" : [ 471.5, 859.5, 615.5, 859.5 ],
					"source" : [ "obj-36", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-36", 1 ],
					"source" : [ "obj-37", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-36", 0 ],
					"source" : [ "obj-37", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"midpoints" : [ 934.5, 633.0, 615.5, 633.0 ],
					"source" : [ "obj-38", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"midpoints" : [ 1009.0, 634.0, 615.5, 634.0 ],
					"source" : [ "obj-39", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-61", 1 ],
					"source" : [ "obj-40", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"midpoints" : [ 1085.5, 633.0, 615.5, 633.0 ],
					"source" : [ "obj-42", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-42", 0 ],
					"source" : [ "obj-43", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-39", 0 ],
					"source" : [ "obj-44", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-38", 0 ],
					"source" : [ "obj-45", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-47", 0 ],
					"source" : [ "obj-46", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"midpoints" : [ 1002.499908000000005, 313.5, 615.5, 313.5 ],
					"source" : [ "obj-47", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-13", 0 ],
					"midpoints" : [ 80.0, 253.0, 178.5, 253.0 ],
					"source" : [ "obj-48", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-24", 0 ],
					"source" : [ "obj-49", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-25", 0 ],
					"source" : [ "obj-50", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-26", 0 ],
					"source" : [ "obj-51", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"color" : [ 0.769209325313568, 0.76918637752533, 0.769199430942535, 0.146074054621849 ],
					"destination" : [ "obj-12", 0 ],
					"midpoints" : [ 118.5, 601.0, 651.5, 601.0 ],
					"order" : 3,
					"source" : [ "obj-54", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"color" : [ 0.769209325313568, 0.76918637752533, 0.769199430942535, 0.146074054621849 ],
					"destination" : [ "obj-19", 0 ],
					"midpoints" : [ 118.5, 613.0, 651.5, 613.0 ],
					"order" : 2,
					"source" : [ "obj-54", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"color" : [ 0.769209325313568, 0.76918637752533, 0.769199430942535, 0.146074054621849 ],
					"destination" : [ "obj-22", 0 ],
					"midpoints" : [ 118.5, 573.0, 424.5, 573.0, 424.5, 471.0, 651.5, 471.0 ],
					"order" : 4,
					"source" : [ "obj-54", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"color" : [ 0.769209325313568, 0.76918637752533, 0.769199430942535, 0.146074054621849 ],
					"destination" : [ "obj-6", 0 ],
					"midpoints" : [ 118.5, 666.0, 651.5, 666.0 ],
					"order" : 1,
					"source" : [ "obj-54", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"color" : [ 0.769209325313568, 0.76918637752533, 0.769199430942535, 0.146074054621849 ],
					"destination" : [ "obj-9", 0 ],
					"midpoints" : [ 118.5, 573.0, 555.5, 573.0, 555.5, 495.0, 913.5, 495.0 ],
					"order" : 0,
					"source" : [ "obj-54", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-59", 0 ],
					"source" : [ "obj-55", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"midpoints" : [ 102.5, 742.5, 615.5, 742.5 ],
					"source" : [ "obj-56", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-40", 0 ],
					"source" : [ "obj-58", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"midpoints" : [ 824.5, 313.0, 615.5, 313.0 ],
					"source" : [ "obj-59", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 0 ],
					"midpoints" : [ 651.5, 806.0, 651.5, 806.0 ],
					"source" : [ "obj-6", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-64", 0 ],
					"source" : [ "obj-63", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"midpoints" : [ 1142.5, 728.0, 615.5, 728.0 ],
					"source" : [ "obj-64", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-10", 0 ],
					"order" : 1,
					"source" : [ "obj-69", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-17", 0 ],
					"order" : 2,
					"source" : [ "obj-69", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"order" : 3,
					"source" : [ "obj-69", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-73", 0 ],
					"order" : 0,
					"source" : [ "obj-69", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"midpoints" : [ 651.5, 864.5, 615.5, 864.5 ],
					"source" : [ "obj-7", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-71", 0 ],
					"source" : [ "obj-70", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"midpoints" : [ 1228.0, 730.75, 615.5, 730.75 ],
					"source" : [ "obj-71", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-78", 0 ],
					"source" : [ "obj-73", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"midpoints" : [ 850.499908000000005, 313.0, 615.5, 313.0 ],
					"source" : [ "obj-78", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"midpoints" : [ 651.5, 839.5, 651.5, 839.5 ],
					"source" : [ "obj-8", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-56", 0 ],
					"midpoints" : [ 33.5, 704.0, 102.5, 704.0 ],
					"source" : [ "obj-81", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-56", 0 ],
					"midpoints" : [ 33.5, 703.5, 102.5, 703.5 ],
					"source" : [ "obj-82", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"midpoints" : [ 115.5, 898.5, 615.5, 898.5 ],
					"source" : [ "obj-92", 0 ]
				}

			}
 ],
		"parameters" : 		{
			"obj-41" : [ "window_position", "", 0 ],
			"obj-119" : [ "close", "", 0 ],
			"obj-126" : [ "float", "", 0 ],
			"parameterbanks" : 			{

			}

		}
,
		"dependency_cache" : [  ],
		"autosave" : 0
	}

}
