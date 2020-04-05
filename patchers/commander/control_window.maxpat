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
		"rect" : [ 324.0, 168.0, 684.0, 503.0 ],
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
					"id" : "obj-38",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 284.0, 788.566058218479156, 182.0, 22.0 ],
					"text" : "commander_parameter_controls",
					"varname" : "commander_parameter_controls"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-68",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 706.0, 1142.0, 79.0, 22.0 ],
					"text" : "loadmess init"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-114",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 965.961217555734834, 1333.0, 118.0, 22.0 ],
					"text" : "tag_button_bank_up"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-113",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 459.0, 1333.0, 133.0, 22.0 ],
					"text" : "tag_button_bank_down"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-105",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 593.961217555734834, 1367.0, 113.0, 22.0 ],
					"text" : "prepend tag_button"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-104",
					"maxclass" : "newobj",
					"numinlets" : 8,
					"numoutlets" : 1,
					"outlettype" : [ "list" ],
					"patching_rect" : [ 593.961217555734834, 1333.0, 341.000000000000114, 22.0 ],
					"text" : "funnel 8"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-103",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 965.961217555734834, 1297.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 600.659344553947449, 102.699706999999989, 52.0, 28.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "tag_button_bank_down",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "tag_button_bank_down",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : ">",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "tag_button_bank_down"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-102",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 459.0, 1297.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 116.659344553947449, 102.699706999999989, 52.0, 28.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "tag_button_bank_up",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "tag_button_bank_up",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "<",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "tag_button_bank_up"
				}

			}
, 			{
				"box" : 				{
					"activebgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-101",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 915.961217555734834, 1297.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 546.659344553947449, 102.699706999999989, 52.0, 28.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "tag_button[7]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "tag_button[7]",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : " ",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "tag_button[7]"
				}

			}
, 			{
				"box" : 				{
					"activebgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-100",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 869.961217555734834, 1297.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 492.659344553947449, 102.699706999999989, 52.0, 28.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "tag_button[6]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "tag_button[6]",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : " ",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "tag_button[6]"
				}

			}
, 			{
				"box" : 				{
					"activebgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-99",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 823.961217555734834, 1297.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 438.659344553947449, 102.699706999999989, 52.0, 28.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "tag_button[5]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "tag_button[5]",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : " ",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "tag_button[5]"
				}

			}
, 			{
				"box" : 				{
					"activebgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-98",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 777.961217555734947, 1297.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 386.659344553947449, 102.699706999999989, 52.0, 28.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "tag_button[4]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "tag_button[4]",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : " ",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "tag_button[4]"
				}

			}
, 			{
				"box" : 				{
					"activebgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-97",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 731.961217555734947, 1297.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 332.659344553947449, 102.699706999999989, 52.0, 28.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "tag_button[3]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "tag_button[3]",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : " ",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "tag_button[3]"
				}

			}
, 			{
				"box" : 				{
					"activebgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-96",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 685.961217555734834, 1297.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 278.659344553947449, 102.699706999999989, 52.0, 28.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "tag_button[2]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "tag_button[2]",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : " ",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "tag_button[2]"
				}

			}
, 			{
				"box" : 				{
					"activebgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-95",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 639.961217555734834, 1297.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 224.659344553947449, 102.699706999999989, 52.0, 28.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "tag_button[1]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "tag_button[1]",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : " ",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "tag_button[1]"
				}

			}
, 			{
				"box" : 				{
					"activebgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-93",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 593.961217555734834, 1297.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 170.659344553947449, 102.699706999999989, 52.0, 28.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "tag_button[0]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "tag_button[0]",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : " ",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "tag_button[0]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-92",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 677.961217555734834, 1256.0, 95.0, 22.0 ],
					"saved_object_attributes" : 					{
						"filename" : "tag_buttons.js",
						"parameter_enable" : 0
					}
,
					"text" : "js tag_buttons.js"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-87",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 299.961125555734839, 1065.0, 108.0, 22.0 ],
					"text" : "set <==back, bang"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-86",
					"linecount" : 2,
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 872.0, 1162.0, 96.0, 35.0 ],
					"text" : "prepend selection_mode"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"id" : "obj-85",
					"maxclass" : "live.text",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 871.961125555734839, 1135.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 386.659344553947449, 135.699706999999989, 212.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "selection_mode",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "selection_mode",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "Select",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"texton" : "Load",
					"varname" : "selection_mode"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-72",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 767.961217555734947, 1217.0, 64.0, 22.0 ],
					"text" : "clear_filter"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-71",
					"linecount" : 2,
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 991.0, 1166.0, 68.0, 35.0 ],
					"text" : "prepend filter_mode"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-83",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 412.0, 996.0, 172.0, 22.0 ],
					"text" : "r from_preset_tagger_deferred"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-82",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 411.961217555734834, 1217.0, 112.0, 22.0 ],
					"text" : "s from_commander"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-81",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 479.0, 1033.0, 121.0, 22.0 ],
					"text" : "r from_preset_tagger"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-78",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 412.0, 1033.0, 54.0, 22.0 ],
					"text" : "deferlow",
					"varname" : "filetreeDefer"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-80",
					"maxclass" : "newobj",
					"numinlets" : 6,
					"numoutlets" : 6,
					"outlettype" : [ "", "", "", "", "", "" ],
					"patching_rect" : [ 412.0, 1065.0, 683.903043889336914, 22.0 ],
					"text" : "route parent files filters back and_or"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-76",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 411.961217555734834, 1128.0, 71.5, 22.0 ],
					"text" : "pack 0 s"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-77",
					"linecount" : 2,
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 411.961217555734834, 1157.0, 125.0, 35.0 ],
					"text" : "prepend toFileTree select_parent"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-74",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 544.461217555734834, 1128.0, 66.0, 22.0 ],
					"text" : "pack 0 s"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-75",
					"linecount" : 2,
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 544.461217555734834, 1157.0, 108.0, 35.0 ],
					"text" : "prepend toFileTree chooser"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-73",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 855.961217555734834, 936.0, 127.0, 22.0 ],
					"text" : "prepend tag_selection"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 10.0,
					"frozen_box_attributes" : [ "parameter_enable" ],
					"id" : "obj-11",
					"items" : [ "#sometag", ",", "#sleepy", ",", "#happy", ",", "#m4l", ",", "#mainSet" ],
					"maxclass" : "umenu",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "int", "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 806.961217555734834, 906.5, 117.0, 20.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "tagchooser",
							"parameter_mmax" : 4,
							"parameter_shortname" : "tagchooser",
							"parameter_enum" : [ "#sometag", "#sleepy", "#happy", "#m4l", "#mainSet" ],
							"parameter_type" : 2
						}

					}
,
					"varname" : "tagchooser"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"id" : "obj-56",
					"maxclass" : "live.text",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 990.961125555734839, 1137.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 384.659344553947449, 188.699706999999989, 106.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "and_or",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "and_or",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "AND",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"texton" : "OR",
					"varname" : "and_or"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"id" : "obj-63",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 767.961217555734947, 1188.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 498.659344553947449, 188.699706999999989, 104.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "live.text[2]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "live.text",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_type" : 2
						}

					}
,
					"text" : "Clear Filter",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "live.text[2]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"id" : "obj-67",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 810.941826333602194, 1098.5, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 170.659344553947449, 135.699706999999989, 214.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "live.text",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "live.text",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_type" : 2
						}

					}
,
					"text" : "<==back",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "live.text"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 10.0,
					"frozen_box_attributes" : [ "parameter_enable" ],
					"id" : "obj-69",
					"items" : "<empty>",
					"maxclass" : "umenu",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "int", "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 544.461217555734834, 1098.5, 113.0, 20.0 ],
					"prefix_mode" : 2,
					"presentation" : 1,
					"presentation_rect" : [ 386.659344553947449, 158.699706999999989, 212.0, 20.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "files_chooser",
							"parameter_mmax" : 1,
							"parameter_shortname" : "files_chooser",
							"parameter_enum" : [ "0", "1" ],
							"parameter_type" : 2
						}

					}
,
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "files_chooser"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 10.0,
					"frozen_box_attributes" : [ "parameter_enable" ],
					"id" : "obj-70",
					"items" : [ "Audio Effects", ",", "Instruments", ",", "MIDI Effects", ",", "<==back" ],
					"maxclass" : "umenu",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "int", "", "" ],
					"parameter_enable" : 0,
					"parameter_mappable" : 0,
					"patching_rect" : [ 411.961217555734834, 1098.5, 124.0, 20.0 ],
					"prefix_mode" : 2,
					"presentation" : 1,
					"presentation_rect" : [ 170.659344553947449, 158.699706999999989, 214.0, 20.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "parent_chooser",
							"parameter_mmax" : 3,
							"parameter_shortname" : "parent_chooser",
							"parameter_enum" : [ "Audio Effects", "Instruments", "MIDI Effects", "<==back" ],
							"parameter_type" : 2
						}

					}
,
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "parent_chooser"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-65",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 24.0, 758.566058218479156, 45.0, 22.0 ],
					"text" : "$1 127"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-66",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 24.0, 788.566058218479156, 195.0, 22.0 ],
					"text" : "prepend call_function receive_note"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-64",
					"maxclass" : "newobj",
					"numinlets" : 10,
					"numoutlets" : 1,
					"outlettype" : [ "list" ],
					"patching_rect" : [ 404.905662000179291, 720.056615352630615, 442.5, 22.0 ],
					"text" : "funnel 10 32"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-62",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 828.405662000179291, 662.056615352630615, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 546.659344553947449, 26.699706999999989, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "track_select[7]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "track_select[7]",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "'']",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "track_select[7]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-61",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 781.350106444623748, 662.056615352630615, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 492.659344553947449, 26.699706999999989, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "track_select[6]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "track_select[6]",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "'',",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "track_select[6]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-60",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 734.294550889068205, 662.056615352630615, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 438.659344553947449, 26.699706999999989, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "track_select[5]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "track_select[5]",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "u'B-Delay',",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "track_select[5]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-59",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 687.238995333512548, 662.056615352630615, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 384.659344553947449, 26.699706999999989, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "track_select[4]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "track_select[4]",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "u'A-Reverb',",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "track_select[4]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-58",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 640.183439777957119, 662.056615352630615, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 332.659344553947449, 26.699706999999989, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "track_select[3]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "track_select[3]",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "u'4-Audio',",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "track_select[3]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-57",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 593.127884222401462, 662.056615352630615, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 278.659344553947449, 26.699706999999989, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "track_select[2]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "track_select[2]",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "u'3-Audio',",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "track_select[2]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-50",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 545.016773111290377, 662.056615352630615, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 224.659344553947449, 26.699706999999989, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "track_select[1]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "track_select[1]",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "u'2-MIDI',",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "track_select[1]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-49",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 499.016773111290377, 662.056615352630615, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 170.659344553947449, 26.699706999999989, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "track_select[0]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "track_select[0]",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "[u'1-MIDI',",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "track_select[0]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-47",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "init" ],
					"patching_rect" : [ 54.75, 848.5, 31.0, 22.0 ],
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
					"patching_rect" : [ 54.75, 821.0, 83.0, 22.0 ],
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
					"patching_rect" : [ 24.0, 887.0, 116.0, 22.0 ],
					"saved_object_attributes" : 					{
						"filename" : "commander.js",
						"parameter_enable" : 0
					}
,
					"text" : "js commander.js Util"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-42",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 451.961217555734834, 662.056615352630615, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 600.659344553947449, 26.699706999999989, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "bank_track_right",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "bank_track_right",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "bank track >",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "bank_track_right"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-41",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 404.905662000179291, 662.056615352630615, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 116.659344553947449, 26.699706999999989, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "bank_track_left",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "bank_track_left",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "< bank track",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "bank_track_left"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-55",
					"maxclass" : "newobj",
					"numinlets" : 5,
					"numoutlets" : 0,
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
						"rect" : [ 0.0, 0.0, 640.0, 480.0 ],
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
									"id" : "obj-50",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 307.0, 100.0, 62.0, 22.0 ],
									"text" : "46 1, 46 0"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-49",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 104.0, 100.0, 62.0, 22.0 ],
									"text" : "43 1, 43 0"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-47",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 237.0, 100.0, 62.0, 22.0 ],
									"text" : "45 1, 45 0"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-45",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 171.0, 100.0, 62.0, 22.0 ],
									"text" : "44 1, 44 0"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-43",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 50.0, 100.0, 49.0, 22.0 ],
									"text" : "1 1, 1 0"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-38",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 50.0, 162.0, 66.0, 22.0 ],
									"text" : "11strokes2"
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-41",
									"index" : 1,
									"maxclass" : "inlet",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 50.0, 40.0, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-42",
									"index" : 2,
									"maxclass" : "inlet",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 104.0, 40.0, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-52",
									"index" : 3,
									"maxclass" : "inlet",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 171.0, 40.0, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-53",
									"index" : 4,
									"maxclass" : "inlet",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 237.0, 40.0, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-54",
									"index" : 5,
									"maxclass" : "inlet",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 307.0, 40.0, 30.0, 30.0 ]
								}

							}
 ],
						"lines" : [ 							{
								"patchline" : 								{
									"destination" : [ "obj-43", 0 ],
									"source" : [ "obj-41", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-49", 0 ],
									"source" : [ "obj-42", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-38", 0 ],
									"source" : [ "obj-43", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-38", 0 ],
									"source" : [ "obj-45", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-38", 0 ],
									"source" : [ "obj-47", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-38", 0 ],
									"source" : [ "obj-49", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-38", 0 ],
									"source" : [ "obj-50", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-45", 0 ],
									"source" : [ "obj-52", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-47", 0 ],
									"source" : [ "obj-53", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-50", 0 ],
									"source" : [ "obj-54", 0 ]
								}

							}
 ]
					}
,
					"patching_rect" : [ 920.0, 378.0, 235.0, 22.0 ],
					"saved_object_attributes" : 					{
						"description" : "",
						"digest" : "",
						"globalpatchername" : "",
						"tags" : ""
					}
,
					"text" : "p keypress"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-79",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
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
						"rect" : [ 59.0, 104.0, 467.0, 480.0 ],
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
									"id" : "obj-1",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 57.0, 369.0, 72.0, 22.0 ],
									"text" : "prepend set"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-76",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 57.0, 332.5, 54.0, 22.0 ],
									"text" : "deferlow"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-75",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "bang" ],
									"patching_rect" : [ 57.0, 185.5, 22.0, 22.0 ],
									"text" : "t b"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-72",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 3,
									"outlettype" : [ "bang", "int", "int" ],
									"patching_rect" : [ 57.0, 6.0, 83.0, 22.0 ],
									"text" : "live.thisdevice"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-70",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 151.0, 181.5, 54.0, 22.0 ],
									"text" : "deferlow"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-65",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 276.0, 144.5, 142.0, 22.0 ],
									"text" : "prepend set value"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-62",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 276.0, 264.5, 62.0, 22.0 ],
									"saved_object_attributes" : 									{
										"_persistence" : 1
									}
,
									"text" : "live.object"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-59",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 57.0, 264.5, 85.0, 22.0 ],
									"text" : "property value"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-55",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 2,
									"outlettype" : [ "", "" ],
									"patching_rect" : [ 57.0, 297.5, 113.0, 22.0 ],
									"saved_object_attributes" : 									{
										"_persistence" : 1
									}
,
									"text" : "live.observer"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-54",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 3,
									"outlettype" : [ "", "", "" ],
									"patching_rect" : [ 57.0, 144.5, 207.0, 22.0 ],
									"text" : "live.path"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-53",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 57.0, 49.5, 322.0, 22.0 ],
									"text" : "path live_set view selected_track mixer_device volume"
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-77",
									"index" : 1,
									"maxclass" : "inlet",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 276.0, 105.0, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-78",
									"index" : 1,
									"maxclass" : "outlet",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 57.0, 414.5, 30.0, 30.0 ]
								}

							}
 ],
						"lines" : [ 							{
								"patchline" : 								{
									"destination" : [ "obj-78", 0 ],
									"source" : [ "obj-1", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-54", 0 ],
									"source" : [ "obj-53", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-70", 0 ],
									"source" : [ "obj-54", 1 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-75", 0 ],
									"source" : [ "obj-54", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-76", 0 ],
									"source" : [ "obj-55", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-55", 0 ],
									"source" : [ "obj-59", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-62", 0 ],
									"source" : [ "obj-65", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-55", 1 ],
									"order" : 1,
									"source" : [ "obj-70", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-62", 1 ],
									"midpoints" : [ 160.5, 234.0, 328.5, 234.0 ],
									"order" : 0,
									"source" : [ "obj-70", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-53", 0 ],
									"source" : [ "obj-72", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-59", 0 ],
									"source" : [ "obj-75", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-1", 0 ],
									"source" : [ "obj-76", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-65", 0 ],
									"source" : [ "obj-77", 0 ]
								}

							}
 ]
					}
,
					"patching_rect" : [ 756.5, 378.0, 141.0, 22.0 ],
					"saved_object_attributes" : 					{
						"description" : "",
						"digest" : "",
						"globalpatchername" : "",
						"tags" : ""
					}
,
					"text" : "p selected_track_volume"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-51",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1136.0, 350.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 475.5, 380.0, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "button[36]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "button",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2
						}

					}
,
					"text" : "v",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "dir_down"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-48",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 974.0, 350.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 529.5, 339.0, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "button[35]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "button",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2
						}

					}
,
					"text" : ">",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "dir_right"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-46",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1082.0, 350.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 475.5, 301.0, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "button[34]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "button",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2
						}

					}
,
					"text" : "^",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "dir_up"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-44",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1028.0, 350.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 421.5, 339.0, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "button[33]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "button",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2
						}

					}
,
					"text" : "<",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "dir_left"
				}

			}
, 			{
				"box" : 				{
					"activebgcolor" : [ 0.5, 0.5, 0.5, 1.0 ],
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-40",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 920.0, 350.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 475.5, 339.0, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "button[32]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "button",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2
						}

					}
,
					"text" : "Enter",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "enter"
				}

			}
, 			{
				"box" : 				{
					"floatoutput" : 1,
					"id" : "obj-37",
					"maxclass" : "slider",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 756.5, 411.5, 21.0, 57.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 26.5, 265.0, 38.0, 128.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "volume_slider",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1.0,
							"parameter_steps" : 128,
							"parameter_shortname" : "volume_slider",
							"parameter_defer" : 1,
							"parameter_type" : 0,
							"parameter_linknames" : 1
						}

					}
,
					"size" : 1.0,
					"varname" : "volume_slider"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-9",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 339.0, 667.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 21.0, 440.0, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "play",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "play",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "Play",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "play"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-36",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 349.5, 684.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 75.0, 440.0, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "stop",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "stop",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "Stop",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "stop"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-35",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 330.0, 647.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 612.659344553947449, 326.0, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "next_track",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "next_track",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "Next Track",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "next_track"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-34",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 318.0, 627.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 612.659344553947449, 288.0, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "prev_track",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "prev_track",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "Prev Track",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "prev_track"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 8.0,
					"id" : "obj-33",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 287.0, 565.0, 44.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "fire_prev_clip_abs",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "fire_prev_clip_abs",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "Fire Prev Clip Abs",
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"textoffcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"varname" : "fire_prev_clip_abs"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 8.0,
					"id" : "obj-32",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 276.0, 548.0, 44.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "fire_next_clip_abs",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "fire_next_clip_abs",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "Fire Next Clip Abs",
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"textoffcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"varname" : "fire_next_clip_abs"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-31",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 265.5, 531.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 612.659344553947449, 440.0, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "select_first_armed_track",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "select_first_armed_track",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "Select First Armed Track",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "select_first_armed_track"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 8.0,
					"id" : "obj-30",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 255.0, 514.0, 44.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "toggle_detail_clip_loop",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "toggle_detail_clip_loop",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "Toggle Detail Clip Loop",
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"textoffcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"varname" : "toggle_detail_clip_loop"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-29",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 244.5, 497.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 397.0, 440.0, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "redo",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "redo",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "Redo",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "redo"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-28",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 234.0, 478.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 343.0, 440.0, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "undo",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "undo",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "Undo",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "undo"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-27",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 223.5, 459.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 559.0, 440.0, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "create_midi_track",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "create_midi_track",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "Create MIDI Track",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "create_midi_track"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-26",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 213.0, 442.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 505.0, 440.0, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "create_audio_track",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "create_audio_track",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "Create Audio Track",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "create_audio_track"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 8.0,
					"id" : "obj-10",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 202.5, 425.0, 44.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "toggle_clip_detail",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "toggle_clip_detail",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "Toggle Clip Detail",
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"textoffcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"varname" : "toggle_clip_detail"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-8",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 297.0, 586.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 612.659344553947449, 364.0, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "fire_next_armed",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "fire_next_armed",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "Fire Next Armed",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "fire_next_armed"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-4",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 307.5, 607.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 21.0, 402.0, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "fire_all_armed",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "fire_all_armed",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "Fire All Armed",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "fire_all_armed"
				}

			}
, 			{
				"box" : 				{
					"comment" : "",
					"id" : "obj-3",
					"index" : 0,
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 630.0, 15.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-2",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 630.0, 56.0, 100.0, 22.0 ],
					"save" : [ "#N", "thispatcher", ";", "#Q", "end", ";" ],
					"text" : "thispatcher"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 8.0,
					"id" : "obj-25",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 192.0, 408.0, 44.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "toggle_autoarm",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "toggle_autoarm",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "Toggle Autoarm",
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"textoffcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"varname" : "toggle_autoarm"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 8.0,
					"id" : "obj-24",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 181.5, 386.0, 44.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "solo_excl",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "solo_excl",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "Solo Excl",
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"textoffcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"varname" : "solo_excl"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 8.0,
					"id" : "obj-23",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 171.0, 364.0, 44.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "mute_excl",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "mute_excl",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "Mute Excl",
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"textoffcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"varname" : "mute_excl"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 8.0,
					"id" : "obj-22",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 160.5, 340.0, 44.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "arm_excl",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "arm_excl",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "Arm Excl",
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"textoffcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"varname" : "arm_excl"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 8.0,
					"id" : "obj-21",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 150.0, 318.0, 44.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "mute_flip",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "mute_flip",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "Mute Flip",
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"textoffcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"varname" : "mute_flip"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-20",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 139.5, 295.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 21.0, 108.699706999999989, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "solo_kill",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "solo_kill",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "Solo Kill",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "solo_kill"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 8.0,
					"id" : "obj-19",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 129.0, 269.0, 44.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "mute_kill",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "mute_kill",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "Mute Kill",
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"textoffcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"varname" : "mute_kill"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 8.0,
					"id" : "obj-18",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 118.5, 242.0, 44.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "arm_kill",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "arm_kill",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "Arm Kill",
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"textoffcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"varname" : "arm_kill"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-15",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 108.0, 218.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 451.0, 440.0, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "new_scene",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "new_scene",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "New Scene",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "new_scene"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-16",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 97.5, 196.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 289.0, 440.0, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "select_playing_clip",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "select_playing_clip",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "Select Playing Clip",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "select_playing_clip"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-17",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 87.0, 170.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 612.659344553947449, 402.0, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "stop_all_clips",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "stop_all_clips",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "Stop All Clips",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "stop_all_clips"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-12",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 76.5, 146.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 75.0, 402.0, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "stop_clip",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "stop_clip",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "Stop Clip",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "stop_clip"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 8.0,
					"id" : "obj-13",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 66.0, 121.0, 44.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "fire_prev_clip",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "fire_prev_clip",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "Fire Prev Clip",
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"textoffcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"varname" : "fire_prev_clip"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 8.0,
					"id" : "obj-14",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 55.5, 96.0, 44.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "fire_next_clip",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "fire_next_clip",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "Fire Next Clip",
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"textoffcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"varname" : "fire_next_clip"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-7",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 45.0, 69.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 21.0, 146.699706999999989, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "solo_selected",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "solo_selected",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "Solo Selected",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "solo_selected"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-6",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 34.5, 44.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 21.0, 184.699706999999989, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "mute_selected",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "mute_selected",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "Mute Selected",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "mute_selected"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-5",
					"maxclass" : "newobj",
					"numinlets" : 32,
					"numoutlets" : 1,
					"outlettype" : [ "list" ],
					"patching_rect" : [ 24.0, 715.0, 344.5, 22.0 ],
					"text" : "funnel 32"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-1",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 24.0, 17.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 21.0, 222.699706999999989, 52.0, 36.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "arm_selected",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "arm_selected",
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1
						}

					}
,
					"text" : "Arm Selected",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "arm_selected"
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
					"patching_rect" : [ 913.0, 282.0, 71.736265540122986, 51.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 15.0, 17.0, 658.216019364495196, 467.950439499999959 ],
					"tabname" : "commander",
					"varname" : "mira_frame"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 17 ],
					"source" : [ "obj-10", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-104", 6 ],
					"source" : [ "obj-100", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-104", 7 ],
					"source" : [ "obj-101", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-113", 0 ],
					"source" : [ "obj-102", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-114", 0 ],
					"source" : [ "obj-103", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-105", 0 ],
					"source" : [ "obj-104", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-92", 0 ],
					"midpoints" : [ 603.461217555734834, 1399.0, 520.461217555734834, 1399.0, 520.461217555734834, 1245.0, 687.461217555734834, 1245.0 ],
					"source" : [ "obj-105", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-73", 0 ],
					"source" : [ "obj-11", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-92", 0 ],
					"midpoints" : [ 468.5, 1374.0, 427.980608777867474, 1374.0, 427.980608777867474, 1245.0, 687.461217555734834, 1245.0 ],
					"source" : [ "obj-113", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-92", 0 ],
					"midpoints" : [ 975.461217555734834, 1365.0, 1096.461217555734947, 1365.0, 1096.461217555734947, 1245.0, 687.461217555734834, 1245.0 ],
					"source" : [ "obj-114", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 5 ],
					"source" : [ "obj-12", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 4 ],
					"source" : [ "obj-13", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 3 ],
					"source" : [ "obj-14", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 8 ],
					"source" : [ "obj-15", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 7 ],
					"source" : [ "obj-16", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 6 ],
					"source" : [ "obj-17", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 9 ],
					"source" : [ "obj-18", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 10 ],
					"source" : [ "obj-19", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 11 ],
					"source" : [ "obj-20", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 12 ],
					"source" : [ "obj-21", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 13 ],
					"source" : [ "obj-22", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 14 ],
					"source" : [ "obj-23", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 15 ],
					"source" : [ "obj-24", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 16 ],
					"source" : [ "obj-25", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 18 ],
					"source" : [ "obj-26", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 19 ],
					"source" : [ "obj-27", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 20 ],
					"source" : [ "obj-28", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 21 ],
					"source" : [ "obj-29", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 0 ],
					"source" : [ "obj-3", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 22 ],
					"source" : [ "obj-30", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 23 ],
					"source" : [ "obj-31", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 24 ],
					"source" : [ "obj-32", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 25 ],
					"source" : [ "obj-33", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 28 ],
					"source" : [ "obj-34", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 29 ],
					"source" : [ "obj-35", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 31 ],
					"source" : [ "obj-36", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-79", 0 ],
					"midpoints" : [ 766.0, 487.5, 734.5, 487.5, 734.5, 368.0, 766.0, 368.0 ],
					"source" : [ "obj-37", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-43", 0 ],
					"source" : [ "obj-38", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 27 ],
					"source" : [ "obj-4", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-55", 0 ],
					"source" : [ "obj-40", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-64", 0 ],
					"source" : [ "obj-41", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-64", 1 ],
					"source" : [ "obj-42", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-55", 2 ],
					"source" : [ "obj-44", 0 ]
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
					"destination" : [ "obj-55", 3 ],
					"source" : [ "obj-46", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-43", 0 ],
					"source" : [ "obj-47", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-55", 1 ],
					"source" : [ "obj-48", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-64", 2 ],
					"source" : [ "obj-49", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-65", 0 ],
					"source" : [ "obj-5", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-64", 3 ],
					"source" : [ "obj-50", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-55", 4 ],
					"source" : [ "obj-51", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-71", 0 ],
					"source" : [ "obj-56", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-64", 4 ],
					"source" : [ "obj-57", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-64", 5 ],
					"source" : [ "obj-58", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-64", 6 ],
					"source" : [ "obj-59", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 1 ],
					"source" : [ "obj-6", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-64", 7 ],
					"source" : [ "obj-60", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-64", 8 ],
					"source" : [ "obj-61", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-64", 9 ],
					"source" : [ "obj-62", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-72", 0 ],
					"source" : [ "obj-63", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-65", 0 ],
					"midpoints" : [ 414.405662000179291, 749.811336785554886, 33.5, 749.811336785554886 ],
					"source" : [ "obj-64", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-66", 0 ],
					"source" : [ "obj-65", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-43", 0 ],
					"source" : [ "obj-66", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-87", 0 ],
					"midpoints" : [ 845.441826333602194, 1121.0, 1013.961171555734836, 1121.0, 1013.961171555734836, 980.0, 309.461125555734839, 980.0 ],
					"source" : [ "obj-67", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-92", 0 ],
					"source" : [ "obj-68", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-74", 1 ],
					"source" : [ "obj-69", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-74", 0 ],
					"source" : [ "obj-69", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 2 ],
					"source" : [ "obj-7", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-76", 1 ],
					"source" : [ "obj-70", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-76", 0 ],
					"source" : [ "obj-70", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-82", 0 ],
					"midpoints" : [ 1000.5, 1211.0, 421.461217555734834, 1211.0 ],
					"source" : [ "obj-71", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-92", 0 ],
					"midpoints" : [ 777.461217555734947, 1247.0, 687.461217555734834, 1247.0 ],
					"source" : [ "obj-72", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-75", 0 ],
					"source" : [ "obj-74", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-82", 0 ],
					"midpoints" : [ 553.961217555734834, 1210.0, 421.461217555734834, 1210.0 ],
					"source" : [ "obj-75", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-77", 0 ],
					"source" : [ "obj-76", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-82", 0 ],
					"source" : [ "obj-77", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-80", 0 ],
					"source" : [ "obj-78", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-37", 0 ],
					"midpoints" : [ 766.0, 401.75, 766.0, 401.75 ],
					"source" : [ "obj-79", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 26 ],
					"source" : [ "obj-8", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-56", 0 ],
					"source" : [ "obj-80", 4 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-67", 0 ],
					"source" : [ "obj-80", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-69", 0 ],
					"source" : [ "obj-80", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-70", 0 ],
					"source" : [ "obj-80", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-92", 0 ],
					"source" : [ "obj-80", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-80", 0 ],
					"midpoints" : [ 488.5, 1059.5, 421.5, 1059.5 ],
					"source" : [ "obj-81", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-78", 0 ],
					"source" : [ "obj-83", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-86", 0 ],
					"source" : [ "obj-85", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-82", 0 ],
					"midpoints" : [ 881.5, 1211.5, 421.461217555734834, 1211.5 ],
					"source" : [ "obj-86", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-70", 0 ],
					"midpoints" : [ 309.461125555734839, 1092.25, 421.461217555734834, 1092.25 ],
					"source" : [ "obj-87", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 30 ],
					"source" : [ "obj-9", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-82", 0 ],
					"midpoints" : [ 687.461217555734834, 1288.0, 655.461217555734834, 1288.0, 655.461217555734834, 1206.0, 421.461217555734834, 1206.0 ],
					"source" : [ "obj-92", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-104", 0 ],
					"source" : [ "obj-93", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-104", 1 ],
					"source" : [ "obj-95", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-104", 2 ],
					"source" : [ "obj-96", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-104", 3 ],
					"source" : [ "obj-97", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-104", 4 ],
					"source" : [ "obj-98", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-104", 5 ],
					"source" : [ "obj-99", 0 ]
				}

			}
 ],
		"parameters" : 		{
			"obj-99" : [ "tag_button[5]", "tag_button[5]", 0 ],
			"obj-36" : [ "stop", "stop", 0 ],
			"obj-103" : [ "tag_button_bank_down", "tag_button_bank_down", 0 ],
			"obj-51" : [ "button[36]", "button", 0 ],
			"obj-38::obj-64" : [ "paramDial[15]", "paramDial[15]", 0 ],
			"obj-63" : [ "live.text[2]", "live.text", 0 ],
			"obj-38::obj-8" : [ "paramDial[4]", "paramDial[4]", 0 ],
			"obj-56" : [ "and_or", "and_or", 0 ],
			"obj-48" : [ "button[35]", "button", 0 ],
			"obj-38::obj-62" : [ "paramDial[13]", "paramDial[13]", 0 ],
			"obj-46" : [ "button[34]", "button", 0 ],
			"obj-93" : [ "tag_button[0]", "tag_button[0]", 0 ],
			"obj-70" : [ "parent_chooser", "parent_chooser", 0 ],
			"obj-44" : [ "button[33]", "button", 0 ],
			"obj-38::obj-57" : [ "paramDial[8]", "paramDial[8]", 0 ],
			"obj-16" : [ "select_playing_clip", "select_playing_clip", 0 ],
			"obj-25" : [ "toggle_autoarm", "toggle_autoarm", 0 ],
			"obj-27" : [ "create_midi_track", "create_midi_track", 0 ],
			"obj-24" : [ "solo_excl", "solo_excl", 0 ],
			"obj-17" : [ "stop_all_clips", "stop_all_clips", 0 ],
			"obj-97" : [ "tag_button[3]", "tag_button[3]", 0 ],
			"obj-26" : [ "create_audio_track", "create_audio_track", 0 ],
			"obj-38::obj-9" : [ "paramDial[5]", "paramDial[5]", 0 ],
			"obj-23" : [ "mute_excl", "mute_excl", 0 ],
			"obj-12" : [ "stop_clip", "stop_clip", 0 ],
			"obj-38::obj-63" : [ "paramDial[14]", "paramDial[14]", 0 ],
			"obj-10" : [ "toggle_clip_detail", "toggle_clip_detail", 0 ],
			"obj-22" : [ "arm_excl", "arm_excl", 0 ],
			"obj-13" : [ "fire_prev_clip", "fire_prev_clip", 0 ],
			"obj-8" : [ "fire_next_armed", "fire_next_armed", 0 ],
			"obj-69" : [ "files_chooser", "files_chooser", 0 ],
			"obj-38::obj-2" : [ "paramDial[0]", "paramDial[0]", 0 ],
			"obj-21" : [ "mute_flip", "mute_flip", 0 ],
			"obj-14" : [ "fire_next_clip", "fire_next_clip", 0 ],
			"obj-38::obj-58" : [ "paramDial[9]", "paramDial[9]", 0 ],
			"obj-4" : [ "fire_all_armed", "fire_all_armed", 0 ],
			"obj-42" : [ "bank_track_right", "bank_track_right", 0 ],
			"obj-20" : [ "solo_kill", "solo_kill", 0 ],
			"obj-7" : [ "solo_selected", "solo_selected", 0 ],
			"obj-100" : [ "tag_button[6]", "tag_button[6]", 0 ],
			"obj-41" : [ "bank_track_left", "bank_track_left", 0 ],
			"obj-62" : [ "track_select[7]", "track_select[7]", 0 ],
			"obj-38::obj-81" : [ "bank_down", "bank_down", 0 ],
			"obj-6" : [ "mute_selected", "mute_selected", 0 ],
			"obj-19" : [ "mute_kill", "mute_kill", 0 ],
			"obj-61" : [ "track_select[6]", "track_select[6]", 0 ],
			"obj-18" : [ "arm_kill", "arm_kill", 0 ],
			"obj-1" : [ "arm_selected", "arm_selected", 0 ],
			"obj-38::obj-10" : [ "paramDial[6]", "paramDial[6]", 0 ],
			"obj-9" : [ "play", "play", 0 ],
			"obj-60" : [ "track_select[5]", "track_select[5]", 0 ],
			"obj-15" : [ "new_scene", "new_scene", 0 ],
			"obj-38::obj-54" : [ "goto", "goto", 0 ],
			"obj-59" : [ "track_select[4]", "track_select[4]", 0 ],
			"obj-95" : [ "tag_button[1]", "tag_button[1]", 0 ],
			"obj-38::obj-5" : [ "paramDial[1]", "paramDial[1]", 0 ],
			"obj-58" : [ "track_select[3]", "track_select[3]", 0 ],
			"obj-38::obj-59" : [ "paramDial[10]", "paramDial[10]", 0 ],
			"obj-57" : [ "track_select[2]", "track_select[2]", 0 ],
			"obj-35" : [ "next_track", "next_track", 0 ],
			"obj-85" : [ "selection_mode", "selection_mode", 0 ],
			"obj-50" : [ "track_select[1]", "track_select[1]", 0 ],
			"obj-34" : [ "prev_track", "prev_track", 0 ],
			"obj-49" : [ "track_select[0]", "track_select[0]", 0 ],
			"obj-98" : [ "tag_button[4]", "tag_button[4]", 0 ],
			"obj-38::obj-11" : [ "paramDial[7]", "paramDial[7]", 0 ],
			"obj-102" : [ "tag_button_bank_up", "tag_button_bank_up", 0 ],
			"obj-33" : [ "fire_prev_clip_abs", "fire_prev_clip_abs", 0 ],
			"obj-32" : [ "fire_next_clip_abs", "fire_next_clip_abs", 0 ],
			"obj-29" : [ "redo", "redo", 0 ],
			"obj-37" : [ "volume_slider", "volume_slider", 0 ],
			"obj-38::obj-6" : [ "paramDial[2]", "paramDial[2]", 0 ],
			"obj-31" : [ "select_first_armed_track", "select_first_armed_track", 0 ],
			"obj-38::obj-60" : [ "paramDial[11]", "paramDial[11]", 0 ],
			"obj-101" : [ "tag_button[7]", "tag_button[7]", 0 ],
			"obj-30" : [ "toggle_detail_clip_loop", "toggle_detail_clip_loop", 0 ],
			"obj-40" : [ "button[32]", "button", 0 ],
			"obj-11" : [ "tagchooser", "tagchooser", 0 ],
			"obj-67" : [ "live.text", "live.text", 0 ],
			"obj-38::obj-82" : [ "bank_up", "bank_up", 0 ],
			"obj-96" : [ "tag_button[2]", "tag_button[2]", 0 ],
			"obj-38::obj-7" : [ "paramDial[3]", "paramDial[3]", 0 ],
			"obj-38::obj-61" : [ "paramDial[12]", "paramDial[12]", 0 ],
			"obj-28" : [ "undo", "undo", 0 ],
			"parameterbanks" : 			{

			}

		}
,
		"dependency_cache" : [ 			{
				"name" : "commander.js",
				"bootpath" : "~/Documents/Max 8/Packages/OJI/javascript/commander",
				"patcherrelativepath" : "../../javascript/commander",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "tag_buttons.js",
				"bootpath" : "~/Documents/Max 8/Packages/OJI/javascript/commander",
				"patcherrelativepath" : "../../javascript/commander",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "commander_parameter_controls.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/OJI/javascript/commander",
				"patcherrelativepath" : "../../javascript/commander",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "11strokes2.mxo",
				"type" : "iLaX"
			}
 ],
		"autosave" : 0
	}

}
