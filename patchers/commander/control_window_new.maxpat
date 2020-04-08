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
		"rect" : [ 353.0, 488.0, 859.0, 618.0 ],
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
					"id" : "obj-241",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1419.5, 758.0, 135.0, 22.0 ],
					"text" : "prepend fader_value_in"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-231",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1273.5, 758.0, 127.0, 22.0 ],
					"text" : "prepend cue_value_in"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-229",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "int", "int" ],
					"patching_rect" : [ 801.0, 788.0, 47.0, 22.0 ],
					"text" : "unpack"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-3",
					"maxclass" : "newobj",
					"numinlets" : 8,
					"numoutlets" : 1,
					"outlettype" : [ "list" ],
					"patching_rect" : [ 801.0, 758.0, 429.148148148148266, 22.0 ],
					"text" : "funnel 8"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"id" : "obj-2",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 573.487072518578316, 305.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 65.5, 543.0, 57.0, 31.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "record",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "record"
						}

					}
,
					"text" : "Record",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"texton" : "Metro",
					"varname" : "record"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-253",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 709.016773111290263, 795.0, 49.0, 22.0 ],
					"text" : "append"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-250",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 709.016773111290263, 682.0, 59.0, 22.0 ],
					"text" : "route text"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-248",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 630.016773111290263, 795.0, 49.0, 22.0 ],
					"text" : "append"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-249",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 709.016773111290263, 710.0, 72.0, 22.0 ],
					"text" : "prepend set"
				}

			}
, 			{
				"box" : 				{
					"comment" : "",
					"id" : "obj-247",
					"index" : 0,
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 709.016773111290263, 637.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"comment" : "",
					"id" : "obj-246",
					"index" : 0,
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 629.961217555734834, 637.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-242",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 629.961217555734834, 710.0, 72.0, 22.0 ],
					"text" : "prepend set"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-243",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 629.961217555734834, 839.499999449122697, 189.0, 22.0 ],
					"text" : "prepend call_function load_preset"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-244",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 629.961217555734834, 682.0, 59.0, 22.0 ],
					"text" : "route text"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-240",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 154.0, 848.5, 133.0, 22.0 ],
					"text" : "view_appointed_device"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-238",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 431.0, 1107.0, 32.0, 22.0 ],
					"text" : "prev"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-237",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 479.0, 1107.0, 31.0, 22.0 ],
					"text" : "next"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-160",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 33.75, 1121.0, 73.0, 22.0 ],
					"text" : "OpenPreset"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"id" : "obj-128",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 431.0, 1084.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 363.0, 71.0, 33.0, 19.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "selection_mode[3]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "selection_mode"
						}

					}
,
					"text" : "<",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"texton" : "Load",
					"varname" : "selection_mode[3]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"id" : "obj-126",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 479.0, 1084.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 538.0, 71.0, 36.0, 19.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "next_in_folder_button",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "next_in_folder_button"
						}

					}
,
					"text" : ">",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"texton" : "Load",
					"varname" : "next_in_folder_button"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-125",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1349.0, 1065.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 736.5, 148.0, 59.0, 33.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_longname" : "button[1]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "button"
						}

					}
,
					"text" : "XXX",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "dir_left[1]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-38",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 1342.0, 976.0, 29.5, 22.0 ],
					"text" : "< 1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-230",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1342.0, 1011.0, 61.0, 22.0 ],
					"text" : "hidden $1"
				}

			}
, 			{
				"box" : 				{
					"activebgoncolor" : [ 0.737254901960784, 0.254901960784314, 0.462745098039216, 1.0 ],
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-228",
					"maxclass" : "live.text",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1342.0, 953.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 755.5, 410.5, 19.0, 19.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "redo[1]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "redo"
						}

					}
,
					"text" : "<>",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"texton" : "<>",
					"varname" : "redo[1]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"hidden" : 1,
					"id" : "obj-51",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1295.0, 1065.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 591.0, 497.0, 59.0, 33.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_longname" : "button[36]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "button"
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
					"hidden" : 1,
					"id" : "obj-48",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1133.0, 1065.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 650.0, 462.0, 59.0, 33.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_longname" : "button[35]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "button"
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
					"hidden" : 1,
					"id" : "obj-46",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1241.0, 1065.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 591.0, 427.0, 59.0, 33.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_longname" : "button[34]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "button"
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
					"hidden" : 1,
					"id" : "obj-44",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1187.0, 1065.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 532.0, 462.0, 59.0, 33.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_longname" : "button[33]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "button"
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
					"hidden" : 1,
					"id" : "obj-40",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1079.0, 1065.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 591.0, 462.0, 59.0, 33.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_longname" : "button[32]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "button"
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
					"angle" : 270.0,
					"bgcolor" : [ 0.32549, 0.345098, 0.372549, 1.0 ],
					"border" : 2,
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"hidden" : 1,
					"id" : "obj-227",
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1409.0, 1058.0, 35.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 516.0, 422.0, 209.0, 114.0 ],
					"proportion" : 0.39,
					"rounded" : 115,
					"varname" : "panel[18]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"id" : "obj-226",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 519.0, 305.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 738.0, 545.0, 57.0, 31.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "metro_toggle",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "metro_toggle"
						}

					}
,
					"text" : "Metro",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"texton" : "Metro",
					"varname" : "metro_toggle"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"degrees" : 320,
					"id" : "obj-225",
					"jspainterfile" : "dial_override.js",
					"maxclass" : "dial",
					"needlecolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"outlinecolor" : [ 0.317647, 0.654902, 0.976471, 1.0 ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1273.5, 689.0, 57.0, 57.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 738.0, 484.0, 57.0, 57.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_defer" : 1,
							"parameter_type" : 0,
							"parameter_linknames" : 1,
							"parameter_longname" : "cue",
							"parameter_invisible" : 1,
							"parameter_shortname" : "cue"
						}

					}
,
					"thickness" : 100.0,
					"varname" : "cue"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-224",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1213.0, 697.0, 44.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "preset_right",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "preset_right"
						}

					}
,
					"text" : ">",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "preset_right"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-223",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 801.0, 697.0, 44.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "preset_left",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "preset_left"
						}

					}
,
					"text" : "<",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "preset_left"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-205",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1213.0, 723.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 608.0, 546.0, 59.0, 31.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "preset[7]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "preset"
						}

					}
,
					"text" : "Uber",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "preset[7]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-215",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1154.0, 723.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 549.0, 546.0, 59.0, 31.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "preset[6]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "preset"
						}

					}
,
					"text" : "7",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "preset[6]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-217",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1095.0, 723.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 490.0, 546.0, 59.0, 31.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "preset[5]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "preset"
						}

					}
,
					"text" : "Room",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "preset[5]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-218",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1036.0, 723.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 431.0, 546.0, 59.0, 31.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "preset[4]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "preset"
						}

					}
,
					"text" : "VV",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "preset[4]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-219",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 976.777777777777828, 723.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 371.777777777777828, 546.0, 59.0, 31.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "preset[3]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "preset"
						}

					}
,
					"text" : "Shpr",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "preset[3]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-220",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 918.0, 723.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 313.0, 546.0, 59.0, 31.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "preset[2]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "preset"
						}

					}
,
					"text" : "Drop",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "preset[2]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-221",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 859.0, 723.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 254.0, 546.0, 59.0, 31.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "preset[1]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "preset"
						}

					}
,
					"text" : "Decap",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "preset[1]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-222",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 801.0, 723.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 196.0, 546.0, 59.0, 31.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "preset[0]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "preset"
						}

					}
,
					"text" : "Pro!",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "preset[0]"
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
					"patching_rect" : [ 582.905662000179291, 528.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 159.5, 386.5, 33.5, 31.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "bank_track_left",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "bank_track_left"
						}

					}
,
					"text" : "<-",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "bank_track_left"
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
					"patching_rect" : [ 629.961217555734834, 528.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 672.0, 386.5, 32.0, 31.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "bank_track_right",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "bank_track_right"
						}

					}
,
					"text" : "->",
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
					"id" : "obj-15",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 108.0, 218.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 736.5, 106.0, 58.5, 33.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "new_scene",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "new_scene"
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
					"id" : "obj-26",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 213.0, 442.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 736.5, 71.0, 58.5, 33.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "create_audio_track",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "create_audio_track"
						}

					}
,
					"text" : "Create Audio",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "create_audio_track"
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
					"presentation_rect" : [ 736.5, 36.0, 58.5, 33.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "create_midi_track",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "create_midi_track"
						}

					}
,
					"text" : "Create MIDI",
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
					"id" : "obj-29",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 244.5, 497.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 738.0, 320.5, 57.0, 33.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "redo",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "redo"
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
					"presentation_rect" : [ 738.0, 357.0, 57.0, 33.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "undo",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "undo"
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
					"fontsize" : 10.0,
					"frozen_box_attributes" : [ "parameter_enable" ],
					"id" : "obj-69",
					"items" : [ "some", ",", "thing", ",", "end" ],
					"maxclass" : "umenu",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "int", "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 272.461217555734834, 1091.5, 113.0, 20.0 ],
					"prefix_mode" : 2,
					"presentation" : 1,
					"presentation_rect" : [ 403.0, 71.0, 127.0, 20.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "some", "thing", "end" ],
							"parameter_type" : 2,
							"parameter_longname" : "files_chooser",
							"parameter_mmax" : 2,
							"parameter_shortname" : "files_chooser"
						}

					}
,
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "files_chooser"
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
					"patching_rect" : [ 693.961217555734834, 1290.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 669.0, 36.0, 52.0, 28.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "tag_button_bank_down",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "tag_button_bank_down"
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
					"patching_rect" : [ 187.0, 1290.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 141.0, 36.0, 52.0, 28.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "tag_button_bank_up",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "tag_button_bank_up"
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
					"patching_rect" : [ 643.961217555734834, 1290.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 608.0, 36.0, 59.0, 28.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "tag_button[7]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "tag_button[7]"
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
					"patching_rect" : [ 597.961217555734834, 1290.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 549.0, 36.0, 59.0, 28.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "tag_button[6]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "tag_button[6]"
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
					"patching_rect" : [ 551.961217555734834, 1290.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 490.0, 36.0, 59.0, 28.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "tag_button[5]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "tag_button[5]"
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
					"patching_rect" : [ 505.961217555734947, 1290.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 431.0, 36.0, 59.0, 28.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "tag_button[4]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "tag_button[4]"
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
					"patching_rect" : [ 459.961217555734947, 1290.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 371.777777777777828, 36.0, 59.0, 28.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "tag_button[3]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "tag_button[3]"
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
					"patching_rect" : [ 413.961217555734834, 1290.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 313.0, 36.0, 59.0, 28.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "tag_button[2]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "tag_button[2]"
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
					"patching_rect" : [ 367.961217555734834, 1290.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 254.0, 36.0, 59.0, 28.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "tag_button[1]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "tag_button[1]"
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
					"patching_rect" : [ 321.961217555734834, 1290.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 196.0, 36.0, 59.0, 28.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "tag_button[0]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "tag_button[0]"
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
					"floatoutput" : 1,
					"id" : "obj-37",
					"maxclass" : "slider",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1419.5, 689.5, 21.0, 57.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 76.5, 143.0, 38.0, 171.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_defer" : 1,
							"parameter_type" : 1,
							"parameter_linknames" : 1,
							"parameter_longname" : "volume_slider",
							"parameter_invisible" : 2,
							"parameter_steps" : 128,
							"parameter_shortname" : "volume_slider"
						}

					}
,
					"size" : 127.0,
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
					"presentation_rect" : [ 65.5, 508.0, 60.0, 33.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "play",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "play"
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
					"id" : "obj-31",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 265.5, 531.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 736.5, 226.0, 60.0, 33.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "select_first_armed_track",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "select_first_armed_track"
						}

					}
,
					"text" : "Sel1stArm",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "select_first_armed_track"
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
					"presentation_rect" : [ 65.5, 357.0, 60.0, 33.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "fire_next_armed",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "fire_next_armed"
						}

					}
,
					"text" : "FireNextArm",
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
					"presentation_rect" : [ 65.5, 320.5, 60.0, 33.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "fire_all_armed",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "fire_all_armed"
						}

					}
,
					"text" : "FireAllArm",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "fire_all_armed"
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
					"presentation_rect" : [ 738.0, 447.0, 57.0, 33.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "solo_kill",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "solo_kill"
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
					"presentation_rect" : [ 736.5, 191.0, 60.0, 33.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "select_playing_clip",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "select_playing_clip"
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
					"presentation_rect" : [ 65.5, 471.5, 60.0, 33.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "stop_all_clips",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "stop_all_clips"
						}

					}
,
					"text" : "StopAll",
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
					"presentation_rect" : [ 65.5, 415.0, 60.0, 33.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "stop_clip",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "stop_clip"
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
					"presentation_rect" : [ 65.5, 36.0, 60.0, 33.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "solo_selected",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "solo_selected"
						}

					}
,
					"text" : "Solo",
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
					"presentation_rect" : [ 65.5, 71.0, 60.0, 33.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "mute_selected",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "mute_selected"
						}

					}
,
					"text" : "Mute",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "mute_selected"
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
					"presentation_rect" : [ 65.5, 106.0, 60.0, 33.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "arm_selected",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "arm_selected"
						}

					}
,
					"text" : "Arm",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "arm_selected"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-208",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 1202.822328666845578, 322.597594999999956, 37.0, 22.0 ],
					"text" : "* 127"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-209",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 1157.488995333512321, 322.597594999999956, 32.0, 22.0 ],
					"text" : "+ 55"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-210",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1157.488995333512321, 353.597594999999956, 64.333333333333371, 22.0 ],
					"text" : "pack i i"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-211",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "", "", "", "" ],
					"patching_rect" : [ 1157.488995333512321, 294.097610000000032, 87.0, 22.0 ],
					"text" : "mira.mt.region"
				}

			}
, 			{
				"box" : 				{
					"color" : [ 0.749019607843137, 0.749019607843137, 0.749019607843137, 0.0 ],
					"hsegments" : 8,
					"id" : "obj-207",
					"maxclass" : "mira.multitouch",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 774.016773111290377, 252.897598000000016, 377.500000000000114, 24.402404999999987 ],
					"pinch_enabled" : 0,
					"presentation" : 1,
					"presentation_rect" : [ 196.0, 106.0, 472.0, 31.0 ],
					"rotate_enabled" : 0,
					"swipe_enabled" : 0,
					"swipe_touch_count" : 0,
					"tap_enabled" : 0,
					"tap_tap_count" : 0,
					"tap_touch_count" : 0
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"id" : "obj-206",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 33.75, 1094.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 307.0, 71.0, 49.0, 19.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "selection_mode[1]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "selection_mode"
						}

					}
,
					"text" : "Load",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"texton" : "Load",
					"varname" : "selection_mode[1]"
				}

			}
, 			{
				"box" : 				{
					"color" : [ 0.749019607843137, 0.749019607843137, 0.749019607843137, 0.0 ],
					"hsegments" : 8,
					"id" : "obj-132",
					"maxclass" : "mira.multitouch",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1157.488995333512321, 252.897598000000016, 377.500000000000114, 24.402404999999987 ],
					"pinch_enabled" : 0,
					"presentation" : 1,
					"presentation_rect" : [ 196.0, 357.0, 472.0, 31.0 ],
					"rotate_enabled" : 0,
					"swipe_enabled" : 0,
					"swipe_touch_count" : 0,
					"tap_enabled" : 0,
					"tap_tap_count" : 0,
					"tap_touch_count" : 0
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-52",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1486.877884222401008, 227.300003000000061, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 608.0, 357.0, 59.0, 31.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "track[7]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "track[7]"
						}

					}
,
					"text" : "-",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "track[7]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-53",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1439.822328666845351, 227.300003000000061, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 549.0, 357.0, 59.0, 31.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "track[6]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "track[6]"
						}

					}
,
					"text" : "-",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "track[6]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-54",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1392.766773111290149, 227.300003000000061, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 490.0, 357.0, 59.0, 31.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "track[5]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "track[5]"
						}

					}
,
					"text" : "-",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "track[5]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-84",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1345.711217555734493, 227.300003000000061, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 431.0, 357.0, 59.0, 31.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "track[4]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "track[4]"
						}

					}
,
					"text" : "-",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "track[4]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-88",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1298.655662000179063, 227.300003000000061, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 371.777777777777828, 357.0, 59.0, 31.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "track[3]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "track[3]"
						}

					}
,
					"text" : "-",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "track[3]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-89",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1251.600106444623407, 227.300003000000061, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 313.0, 357.0, 59.0, 31.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "track[2]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "track[2]"
						}

					}
,
					"text" : "-",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "track[2]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-90",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1203.488995333512321, 227.300003000000061, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 254.0, 357.0, 59.0, 31.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "track[1]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "track[1]"
						}

					}
,
					"text" : "-",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "track[1]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-108",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1157.488995333512321, 227.300003000000061, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 196.0, 357.0, 59.0, 31.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "track[0]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "track[0]"
						}

					}
,
					"text" : "-",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "track[0]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-144",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 819.350106444623634, 323.0, 37.0, 22.0 ],
					"text" : "* 127"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-143",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 774.016773111290377, 323.0, 32.0, 22.0 ],
					"text" : "+ 47"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-91",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 774.016773111290377, 354.0, 64.333333333333371, 22.0 ],
					"text" : "pack i i"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-140",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "", "", "", "" ],
					"patching_rect" : [ 774.016773111290377, 294.500015000000076, 87.0, 22.0 ],
					"text" : "mira.mt.region"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-94",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1103.405662000179291, 227.300003000000061, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 609.0, 106.0, 59.0, 31.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "device_select[7]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "device_select[7]"
						}

					}
,
					"text" : "-",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "device_select[7]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-106",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1056.350106444623634, 227.300003000000061, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 550.0, 106.0, 59.0, 31.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "device_select[6]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "device_select[6]"
						}

					}
,
					"text" : "-",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "device_select[6]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-107",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1009.294550889068205, 227.300003000000061, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 491.0, 106.0, 59.0, 31.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "device_select[5]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "device_select[5]"
						}

					}
,
					"text" : "-",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "device_select[5]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-109",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 962.238995333512548, 227.300003000000061, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 432.0, 106.0, 59.0, 31.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "device_select[4]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "device_select[4]"
						}

					}
,
					"text" : "-",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "device_select[4]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-111",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 915.183439777957119, 227.300003000000061, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 373.0, 106.0, 59.0, 31.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "device_select[3]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "device_select[3]"
						}

					}
,
					"text" : "-",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "device_select[3]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-112",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 868.127884222401462, 227.300003000000061, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 314.0, 106.0, 59.0, 31.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "device_select[2]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "device_select[2]"
						}

					}
,
					"text" : "-",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "device_select[2]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-115",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 820.016773111290377, 227.300003000000061, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 255.0, 106.0, 59.0, 31.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "device_select[1]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "device_select[1]"
						}

					}
,
					"text" : "-",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "device_select[1]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-116",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 774.016773111290377, 227.300003000000061, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 196.0, 106.0, 59.0, 31.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "device_select[0]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "device_select[0]"
						}

					}
,
					"text" : "-",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "device_select[0]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-117",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1038.503845629868692, 335.056615352630615, 44.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "bank_device_right[1]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "bank_device_right"
						}

					}
,
					"text" : "bank device>",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "bank_device_right[1]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-118",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 984.016773111290377, 335.0, 44.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "bank_device_left[1]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "bank_device_left"
						}

					}
,
					"text" : "< bank device",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "bank_device_left[1]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-119",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 483.0, 252.0, 190.0, 22.0 ],
					"text" : "prepend from_parameter_controls"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-120",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 519.0, 382.0, 45.0, 22.0 ],
					"text" : "$1 127"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-121",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 519.0, 466.0, 195.0, 22.0 ],
					"text" : "prepend call_function receive_note"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-122",
					"maxclass" : "newobj",
					"numinlets" : 4,
					"numoutlets" : 1,
					"outlettype" : [ "list" ],
					"patching_rect" : [ 519.0, 354.0, 182.461217555734834, 22.0 ],
					"text" : "funnel 4 43"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-123",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 933.487072518578316, 335.0, 44.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "bank_up[1]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "bank_up"
						}

					}
,
					"text" : "Bank >",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "bank_up[1]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-124",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 879.0, 335.0, 44.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "bank_down[1]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "bank_down"
						}

					}
,
					"text" : "< Bank",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "bank_down[1]"
				}

			}
, 			{
				"box" : 				{
					"activebgcolor" : [ 0.65098, 0.666667, 0.662745, 1.0 ],
					"activebgoncolor" : [ 0.317647, 0.654902, 0.976471, 1.0 ],
					"activetextoncolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"automation" : "goto",
					"automationon" : "goto",
					"bgcolor" : [ 0.65098, 0.666667, 0.662745, 1.0 ],
					"bgoncolor" : [ 0.317647, 0.654902, 0.976471, 1.0 ],
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-127",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 154.0, 821.0, 40.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 609.0, 143.0, 57.0, 20.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "goto", "goto" ],
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "goto[1]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "goto"
						}

					}
,
					"text" : "goto",
					"varname" : "goto[1]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-130",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 1079.0, 1221.0, 130.000060999999988, 22.0 ],
					"restore" : [ 0 ],
					"saved_object_attributes" : 					{
						"parameter_enable" : 0,
						"parameter_mappable" : 0
					}
,
					"text" : "pattr window_position",
					"varname" : "window_position"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 12.0,
					"id" : "obj-131",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 511.5, 133.0, 57.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 196.0, 143.0, 411.0, 20.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "device_name"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 7.0,
					"id" : "obj-133",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1398.016773111290377, 181.0, 54.0, 14.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 609.0, 335.0, 54.0, 14.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "value[15]"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 7.0,
					"id" : "obj-134",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1339.016773111290377, 181.0, 54.0, 14.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 550.0, 335.0, 54.0, 14.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "value[14]"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 7.0,
					"id" : "obj-135",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1280.016773111290377, 181.0, 54.0, 14.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 491.0, 335.0, 54.0, 14.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "value[13]"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 7.0,
					"id" : "obj-136",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1221.016773111290377, 181.0, 54.0, 14.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 432.0, 335.0, 54.0, 14.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "value[12]"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 7.0,
					"id" : "obj-137",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1162.016773111290377, 181.0, 54.0, 14.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 373.0, 335.0, 54.0, 14.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "value[11]"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 7.0,
					"id" : "obj-138",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1103.016773111290377, 181.0, 54.0, 14.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 314.0, 335.0, 54.0, 14.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "value[10]"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 7.0,
					"id" : "obj-139",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1044.016773111290377, 181.0, 54.0, 14.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 255.0, 335.0, 54.0, 14.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "value[9]"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 7.0,
					"id" : "obj-141",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 984.016773111290377, 181.0, 54.0, 14.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 196.0, 335.0, 54.0, 14.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "value[8]"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 7.0,
					"id" : "obj-142",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1398.016773111290377, 164.0, 54.0, 14.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 609.0, 318.0, 54.0, 14.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "name[15]"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 7.0,
					"id" : "obj-145",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1339.016773111290377, 164.0, 54.0, 14.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 550.0, 318.0, 54.0, 14.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "name[14]"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 7.0,
					"id" : "obj-146",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1280.016773111290377, 164.0, 54.0, 14.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 491.0, 318.0, 54.0, 14.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "name[13]"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 7.0,
					"id" : "obj-147",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1221.016773111290377, 164.0, 54.0, 14.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 432.0, 318.0, 54.0, 14.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "name[12]"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 7.0,
					"id" : "obj-148",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1162.016773111290377, 164.0, 54.0, 14.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 373.0, 318.0, 54.0, 14.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "name[11]"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 7.0,
					"id" : "obj-149",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1103.016773111290377, 164.0, 54.0, 14.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 314.0, 318.0, 54.0, 14.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "name[10]"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 7.0,
					"id" : "obj-150",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1044.016773111290377, 164.0, 54.0, 14.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 255.0, 318.0, 54.0, 14.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "name[9]"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 7.0,
					"id" : "obj-151",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 984.016773111290377, 164.0, 54.0, 14.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 196.0, 318.0, 54.0, 14.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "name[8]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"degrees" : 320,
					"id" : "obj-152",
					"jspainterfile" : "dial_override.js",
					"maxclass" : "dial",
					"needlecolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"outlinecolor" : [ 0.317647, 0.654902, 0.976471, 1.0 ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1368.0, 22.0, 57.0, 57.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 609.0, 259.0, 57.0, 57.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_defer" : 1,
							"parameter_type" : 0,
							"parameter_linknames" : 1,
							"parameter_longname" : "paramDial[15]",
							"parameter_invisible" : 1,
							"parameter_shortname" : "paramDial[15]"
						}

					}
,
					"thickness" : 100.0,
					"varname" : "paramDial[15]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"degrees" : 320,
					"id" : "obj-153",
					"jspainterfile" : "dial_override.js",
					"maxclass" : "dial",
					"needlecolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"outlinecolor" : [ 0.317647, 0.654902, 0.976471, 1.0 ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1309.0, 22.0, 57.0, 57.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 550.0, 259.0, 57.0, 57.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_defer" : 1,
							"parameter_type" : 0,
							"parameter_linknames" : 1,
							"parameter_longname" : "paramDial[14]",
							"parameter_invisible" : 1,
							"parameter_shortname" : "paramDial[14]"
						}

					}
,
					"thickness" : 100.0,
					"varname" : "paramDial[14]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"degrees" : 320,
					"id" : "obj-154",
					"jspainterfile" : "dial_override.js",
					"maxclass" : "dial",
					"needlecolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"outlinecolor" : [ 0.317647, 0.654902, 0.976471, 1.0 ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1250.0, 22.0, 57.0, 57.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 491.0, 259.0, 57.0, 57.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_defer" : 1,
							"parameter_type" : 0,
							"parameter_linknames" : 1,
							"parameter_longname" : "paramDial[13]",
							"parameter_invisible" : 1,
							"parameter_shortname" : "paramDial[13]"
						}

					}
,
					"thickness" : 100.0,
					"varname" : "paramDial[13]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"degrees" : 320,
					"id" : "obj-155",
					"jspainterfile" : "dial_override.js",
					"maxclass" : "dial",
					"needlecolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"outlinecolor" : [ 0.317647, 0.654902, 0.976471, 1.0 ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1191.0, 22.0, 57.0, 57.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 432.0, 259.0, 57.0, 57.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_defer" : 1,
							"parameter_type" : 0,
							"parameter_linknames" : 1,
							"parameter_longname" : "paramDial[12]",
							"parameter_invisible" : 1,
							"parameter_shortname" : "paramDial[12]"
						}

					}
,
					"thickness" : 100.0,
					"varname" : "paramDial[12]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"degrees" : 320,
					"id" : "obj-156",
					"jspainterfile" : "dial_override.js",
					"maxclass" : "dial",
					"needlecolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"outlinecolor" : [ 0.317647, 0.654902, 0.976471, 1.0 ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1132.0, 22.0, 57.0, 57.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 373.0, 259.0, 57.0, 57.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_defer" : 1,
							"parameter_type" : 0,
							"parameter_linknames" : 1,
							"parameter_longname" : "paramDial[11]",
							"parameter_invisible" : 1,
							"parameter_shortname" : "paramDial[11]"
						}

					}
,
					"thickness" : 100.0,
					"varname" : "paramDial[11]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"degrees" : 320,
					"id" : "obj-157",
					"jspainterfile" : "dial_override.js",
					"maxclass" : "dial",
					"needlecolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"outlinecolor" : [ 0.317647, 0.654902, 0.976471, 1.0 ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1073.0, 22.0, 57.0, 57.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 314.0, 259.0, 57.0, 57.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_defer" : 1,
							"parameter_type" : 0,
							"parameter_linknames" : 1,
							"parameter_longname" : "paramDial[10]",
							"parameter_invisible" : 1,
							"parameter_shortname" : "paramDial[10]"
						}

					}
,
					"thickness" : 100.0,
					"varname" : "paramDial[10]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"degrees" : 320,
					"id" : "obj-158",
					"jspainterfile" : "dial_override.js",
					"maxclass" : "dial",
					"needlecolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"outlinecolor" : [ 0.317647, 0.654902, 0.976471, 1.0 ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1014.0, 22.0, 57.0, 57.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 255.0, 259.0, 57.0, 57.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_defer" : 1,
							"parameter_type" : 0,
							"parameter_linknames" : 1,
							"parameter_longname" : "paramDial[9]",
							"parameter_invisible" : 1,
							"parameter_shortname" : "paramDial[9]"
						}

					}
,
					"thickness" : 100.0,
					"varname" : "paramDial[9]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"degrees" : 320,
					"id" : "obj-159",
					"jspainterfile" : "dial_override.js",
					"maxclass" : "dial",
					"needlecolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"outlinecolor" : [ 0.317647, 0.654902, 0.976471, 1.0 ],
					"parameter_enable" : 1,
					"patching_rect" : [ 955.0, 22.0, 57.0, 57.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 196.0, 259.0, 57.0, 57.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_defer" : 1,
							"parameter_type" : 0,
							"parameter_linknames" : 1,
							"parameter_longname" : "paramDial[8]",
							"parameter_invisible" : 1,
							"parameter_shortname" : "paramDial[8]"
						}

					}
,
					"thickness" : 100.0,
					"varname" : "paramDial[8]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-162",
					"maxclass" : "newobj",
					"numinlets" : 16,
					"numoutlets" : 1,
					"outlettype" : [ "list" ],
					"patching_rect" : [ 483.0, 97.0, 904.0, 22.0 ],
					"text" : "funnel 16"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 7.0,
					"id" : "obj-163",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 924.5, 181.0, 54.0, 14.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 609.0, 242.0, 54.0, 14.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "value[7]"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 7.0,
					"id" : "obj-164",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 865.5, 181.0, 54.0, 14.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 550.0, 242.0, 54.0, 14.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "value[6]"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 7.0,
					"id" : "obj-165",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 806.5, 181.0, 54.0, 14.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 491.0, 242.0, 54.0, 14.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "value[5]"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 7.0,
					"id" : "obj-166",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 747.5, 181.0, 54.0, 14.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 432.0, 242.0, 54.0, 14.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "value[4]"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 7.0,
					"id" : "obj-167",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 688.5, 181.0, 54.0, 14.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 373.0, 242.0, 54.0, 14.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "value[3]"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 7.0,
					"id" : "obj-168",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 629.5, 181.0, 54.0, 14.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 314.0, 242.0, 54.0, 14.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "value[2]"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 7.0,
					"id" : "obj-169",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 570.5, 181.0, 54.0, 14.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 255.0, 242.0, 54.0, 14.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "value[1]"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 7.0,
					"id" : "obj-170",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 511.5, 181.0, 54.0, 14.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 196.0, 242.0, 54.0, 14.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "value[0]"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 7.0,
					"id" : "obj-171",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 924.5, 164.0, 54.0, 14.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 609.0, 225.0, 54.0, 14.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "name[7]"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 7.0,
					"id" : "obj-172",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 865.5, 164.0, 54.0, 14.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 550.0, 225.0, 54.0, 14.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "name[6]"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 7.0,
					"id" : "obj-173",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 806.5, 164.0, 54.0, 14.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 491.0, 225.0, 54.0, 14.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "name[5]"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 7.0,
					"id" : "obj-174",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 747.5, 164.0, 54.0, 14.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 432.0, 225.0, 54.0, 14.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "name[4]"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 7.0,
					"id" : "obj-175",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 688.5, 164.0, 54.0, 14.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 373.0, 225.0, 54.0, 14.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "name[3]"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 7.0,
					"id" : "obj-176",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 629.5, 164.0, 54.0, 14.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 314.0, 225.0, 54.0, 14.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "name[2]"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 7.0,
					"id" : "obj-177",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 570.5, 164.0, 54.0, 14.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 255.0, 225.0, 54.0, 14.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "name[1]"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 7.0,
					"id" : "obj-178",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 511.5, 164.0, 54.0, 14.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 196.0, 225.0, 54.0, 14.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "name[0]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"degrees" : 320,
					"id" : "obj-179",
					"jspainterfile" : "dial_override.js",
					"maxclass" : "dial",
					"needlecolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"outlinecolor" : [ 0.317647, 0.654902, 0.976471, 1.0 ],
					"parameter_enable" : 1,
					"patching_rect" : [ 896.0, 22.0, 57.0, 57.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 609.0, 166.0, 57.0, 57.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_defer" : 1,
							"parameter_type" : 0,
							"parameter_linknames" : 1,
							"parameter_longname" : "paramDial[7]",
							"parameter_invisible" : 1,
							"parameter_shortname" : "paramDial[7]"
						}

					}
,
					"thickness" : 100.0,
					"varname" : "paramDial[7]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"degrees" : 320,
					"id" : "obj-180",
					"jspainterfile" : "dial_override.js",
					"maxclass" : "dial",
					"needlecolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"outlinecolor" : [ 0.317647, 0.654902, 0.976471, 1.0 ],
					"parameter_enable" : 1,
					"patching_rect" : [ 837.0, 22.0, 57.0, 57.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 550.0, 166.0, 57.0, 57.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_defer" : 1,
							"parameter_type" : 0,
							"parameter_linknames" : 1,
							"parameter_longname" : "paramDial[6]",
							"parameter_invisible" : 1,
							"parameter_shortname" : "paramDial[6]"
						}

					}
,
					"thickness" : 100.0,
					"varname" : "paramDial[6]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"degrees" : 320,
					"id" : "obj-181",
					"jspainterfile" : "dial_override.js",
					"maxclass" : "dial",
					"needlecolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"outlinecolor" : [ 0.317647, 0.654902, 0.976471, 1.0 ],
					"parameter_enable" : 1,
					"patching_rect" : [ 778.0, 22.0, 57.0, 57.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 491.0, 166.0, 57.0, 57.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_defer" : 1,
							"parameter_type" : 0,
							"parameter_linknames" : 1,
							"parameter_longname" : "paramDial[5]",
							"parameter_invisible" : 1,
							"parameter_shortname" : "paramDial[5]"
						}

					}
,
					"thickness" : 100.0,
					"varname" : "paramDial[5]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"degrees" : 320,
					"id" : "obj-182",
					"jspainterfile" : "dial_override.js",
					"maxclass" : "dial",
					"needlecolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"outlinecolor" : [ 0.317647, 0.654902, 0.976471, 1.0 ],
					"parameter_enable" : 1,
					"patching_rect" : [ 719.0, 22.0, 57.0, 57.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 432.0, 166.0, 57.0, 57.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_defer" : 1,
							"parameter_type" : 0,
							"parameter_linknames" : 1,
							"parameter_longname" : "paramDial[4]",
							"parameter_invisible" : 1,
							"parameter_shortname" : "paramDial[4]"
						}

					}
,
					"thickness" : 100.0,
					"varname" : "paramDial[4]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"degrees" : 320,
					"id" : "obj-183",
					"jspainterfile" : "dial_override.js",
					"maxclass" : "dial",
					"needlecolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"outlinecolor" : [ 0.317647, 0.654902, 0.976471, 1.0 ],
					"parameter_enable" : 1,
					"patching_rect" : [ 660.0, 22.0, 57.0, 57.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 373.0, 166.0, 57.0, 57.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_defer" : 1,
							"parameter_type" : 0,
							"parameter_linknames" : 1,
							"parameter_longname" : "paramDial[3]",
							"parameter_invisible" : 1,
							"parameter_shortname" : "paramDial[3]"
						}

					}
,
					"thickness" : 100.0,
					"varname" : "paramDial[3]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"degrees" : 320,
					"id" : "obj-184",
					"jspainterfile" : "dial_override.js",
					"maxclass" : "dial",
					"needlecolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"outlinecolor" : [ 0.317647, 0.654902, 0.976471, 1.0 ],
					"parameter_enable" : 1,
					"patching_rect" : [ 601.0, 22.0, 57.0, 57.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 314.0, 166.0, 57.0, 57.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_defer" : 1,
							"parameter_type" : 0,
							"parameter_linknames" : 1,
							"parameter_longname" : "paramDial[2]",
							"parameter_invisible" : 1,
							"parameter_shortname" : "paramDial[2]"
						}

					}
,
					"thickness" : 100.0,
					"varname" : "paramDial[2]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"degrees" : 320,
					"id" : "obj-185",
					"jspainterfile" : "dial_override.js",
					"maxclass" : "dial",
					"needlecolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"outlinecolor" : [ 0.317647, 0.654902, 0.976471, 1.0 ],
					"parameter_enable" : 1,
					"patching_rect" : [ 542.0, 22.0, 57.0, 57.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 255.0, 166.0, 57.0, 57.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_defer" : 1,
							"parameter_type" : 0,
							"parameter_linknames" : 1,
							"parameter_longname" : "paramDial[1]",
							"parameter_invisible" : 1,
							"parameter_shortname" : "paramDial[1]"
						}

					}
,
					"thickness" : 100.0,
					"varname" : "paramDial[1]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"degrees" : 320,
					"id" : "obj-186",
					"jspainterfile" : "dial_override.js",
					"maxclass" : "dial",
					"needlecolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"outlinecolor" : [ 0.317647, 0.654902, 0.976471, 1.0 ],
					"parameter_enable" : 1,
					"patching_rect" : [ 483.0, 22.0, 57.0, 57.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 196.0, 166.0, 57.0, 57.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_defer" : 1,
							"parameter_type" : 0,
							"parameter_linknames" : 1,
							"parameter_longname" : "paramDial[0]",
							"parameter_invisible" : 1,
							"parameter_shortname" : "paramDial[0]"
						}

					}
,
					"thickness" : 100.0,
					"varname" : "paramDial[0]"
				}

			}
, 			{
				"box" : 				{
					"angle" : 270.0,
					"bgcolor" : [ 0.32549, 0.345098, 0.372549, 1.0 ],
					"border" : 2,
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-187",
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1207.0, 1357.0, 35.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 609.0, 259.0, 57.0, 92.0 ],
					"proportion" : 0.39,
					"varname" : "panel[16]"
				}

			}
, 			{
				"box" : 				{
					"angle" : 270.0,
					"bgcolor" : [ 0.32549, 0.345098, 0.372549, 1.0 ],
					"border" : 2,
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-188",
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1170.0, 1357.0, 35.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 550.0, 259.0, 57.0, 92.0 ],
					"proportion" : 0.39,
					"varname" : "panel[15]"
				}

			}
, 			{
				"box" : 				{
					"angle" : 270.0,
					"bgcolor" : [ 0.32549, 0.345098, 0.372549, 1.0 ],
					"border" : 2,
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-189",
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1133.0, 1357.0, 35.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 491.0, 259.0, 57.0, 92.0 ],
					"proportion" : 0.39,
					"varname" : "panel[14]"
				}

			}
, 			{
				"box" : 				{
					"angle" : 270.0,
					"bgcolor" : [ 0.32549, 0.345098, 0.372549, 1.0 ],
					"border" : 2,
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-190",
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1096.0, 1357.0, 35.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 432.0, 259.0, 57.0, 92.0 ],
					"proportion" : 0.39,
					"varname" : "panel[13]"
				}

			}
, 			{
				"box" : 				{
					"angle" : 270.0,
					"bgcolor" : [ 0.32549, 0.345098, 0.372549, 1.0 ],
					"border" : 2,
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-191",
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1059.0, 1357.0, 35.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 373.0, 259.0, 57.0, 92.0 ],
					"proportion" : 0.39,
					"varname" : "panel[12]"
				}

			}
, 			{
				"box" : 				{
					"angle" : 270.0,
					"bgcolor" : [ 0.32549, 0.345098, 0.372549, 1.0 ],
					"border" : 2,
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-192",
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1022.0, 1357.0, 35.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 314.0, 259.0, 57.0, 92.0 ],
					"proportion" : 0.39,
					"varname" : "panel[11]"
				}

			}
, 			{
				"box" : 				{
					"angle" : 270.0,
					"bgcolor" : [ 0.32549, 0.345098, 0.372549, 1.0 ],
					"border" : 2,
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-193",
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 985.0, 1357.0, 35.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 255.0, 259.0, 57.0, 92.0 ],
					"proportion" : 0.39,
					"varname" : "panel[10]"
				}

			}
, 			{
				"box" : 				{
					"angle" : 270.0,
					"bgcolor" : [ 0.32549, 0.345098, 0.372549, 1.0 ],
					"border" : 2,
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-194",
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 948.0, 1357.0, 35.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 196.0, 259.0, 57.0, 92.0 ],
					"proportion" : 0.39,
					"varname" : "panel[9]"
				}

			}
, 			{
				"box" : 				{
					"angle" : 270.0,
					"bgcolor" : [ 0.32549, 0.345098, 0.372549, 1.0 ],
					"border" : 2,
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-195",
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1207.0, 1333.0, 35.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 609.0, 166.0, 57.0, 92.0 ],
					"proportion" : 0.39,
					"varname" : "panel[8]"
				}

			}
, 			{
				"box" : 				{
					"angle" : 270.0,
					"bgcolor" : [ 0.32549, 0.345098, 0.372549, 1.0 ],
					"border" : 2,
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-196",
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1170.0, 1333.0, 35.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 550.0, 166.0, 57.0, 92.0 ],
					"proportion" : 0.39,
					"varname" : "panel[7]"
				}

			}
, 			{
				"box" : 				{
					"angle" : 270.0,
					"bgcolor" : [ 0.32549, 0.345098, 0.372549, 1.0 ],
					"border" : 2,
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-197",
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1133.0, 1333.0, 35.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 491.0, 166.0, 57.0, 92.0 ],
					"proportion" : 0.39,
					"varname" : "panel[6]"
				}

			}
, 			{
				"box" : 				{
					"angle" : 270.0,
					"bgcolor" : [ 0.32549, 0.345098, 0.372549, 1.0 ],
					"border" : 2,
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-198",
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1096.0, 1333.0, 35.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 432.0, 166.0, 57.0, 92.0 ],
					"proportion" : 0.39,
					"varname" : "panel[5]"
				}

			}
, 			{
				"box" : 				{
					"angle" : 270.0,
					"bgcolor" : [ 0.32549, 0.345098, 0.372549, 1.0 ],
					"border" : 2,
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-199",
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1059.0, 1333.0, 35.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 373.0, 166.0, 57.0, 92.0 ],
					"proportion" : 0.39,
					"varname" : "panel[4]"
				}

			}
, 			{
				"box" : 				{
					"angle" : 270.0,
					"bgcolor" : [ 0.32549, 0.345098, 0.372549, 1.0 ],
					"border" : 2,
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-200",
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1022.0, 1333.0, 35.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 314.0, 166.0, 57.0, 92.0 ],
					"proportion" : 0.39,
					"varname" : "panel[3]"
				}

			}
, 			{
				"box" : 				{
					"angle" : 270.0,
					"bgcolor" : [ 0.32549, 0.345098, 0.372549, 1.0 ],
					"border" : 2,
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-201",
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 985.0, 1333.0, 35.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 255.0, 166.0, 57.0, 92.0 ],
					"proportion" : 0.39,
					"varname" : "panel[2]"
				}

			}
, 			{
				"box" : 				{
					"angle" : 270.0,
					"bgcolor" : [ 0.32549, 0.345098, 0.372549, 1.0 ],
					"border" : 2,
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-202",
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 948.0, 1333.0, 35.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 196.0, 166.0, 57.0, 92.0 ],
					"proportion" : 0.39,
					"varname" : "panel[1]"
				}

			}
, 			{
				"box" : 				{
					"angle" : 270.0,
					"bgcolor" : [ 0.32549, 0.345098, 0.372549, 1.0 ],
					"border" : 2,
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-203",
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1279.516773111290377, 1333.0, 35.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 196.0, 143.0, 411.0, 20.0 ],
					"proportion" : 0.39,
					"varname" : "panel[17]"
				}

			}
, 			{
				"box" : 				{
					"angle" : 270.0,
					"bgcolor" : [ 0.239216, 0.254902, 0.278431, 1.0 ],
					"border" : 2,
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-204",
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1242.516773111290377, 1333.0, 35.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 189.0, 138.75, 485.0, 215.0 ],
					"proportion" : 0.39,
					"varname" : "panel[0]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-68",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 431.0, 1210.0, 79.0, 22.0 ],
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
					"patching_rect" : [ 693.961217555734834, 1326.0, 118.0, 22.0 ],
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
					"patching_rect" : [ 187.0, 1326.0, 133.0, 22.0 ],
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
					"patching_rect" : [ 321.961217555734834, 1360.0, 113.0, 22.0 ],
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
					"patching_rect" : [ 321.961217555734834, 1326.0, 341.000000000000114, 22.0 ],
					"text" : "funnel 8"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-92",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 405.961217555734834, 1249.0, 95.0, 22.0 ],
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
					"patching_rect" : [ 27.961125555734839, 1058.0, 108.0, 22.0 ],
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
					"patching_rect" : [ 538.941826333602194, 1150.0, 96.990304388933737, 35.0 ],
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
					"patching_rect" : [ 538.902951889337032, 1123.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 682.5, 71.0, 34.5, 20.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "selection_mode",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "selection_mode"
						}

					}
,
					"text" : "SEL",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"texton" : "LOAD",
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
					"patching_rect" : [ 814.961217555734947, 1159.0, 64.0, 22.0 ],
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
					"patching_rect" : [ 671.922435111469554, 1150.0, 68.0, 35.0 ],
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
					"patching_rect" : [ 140.0, 989.0, 172.0, 22.0 ],
					"text" : "r from_preset_tagger_deferred"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-82",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 139.961217555734834, 1210.0, 112.0, 22.0 ],
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
					"patching_rect" : [ 207.0, 1026.0, 121.0, 22.0 ],
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
					"patching_rect" : [ 140.0, 1026.0, 54.0, 22.0 ],
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
					"patching_rect" : [ 140.0, 1058.0, 683.903043889336914, 22.0 ],
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
					"patching_rect" : [ 139.961217555734834, 1121.0, 71.5, 22.0 ],
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
					"patching_rect" : [ 139.961217555734834, 1150.0, 125.0, 35.0 ],
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
					"patching_rect" : [ 272.461217555734834, 1121.0, 66.0, 22.0 ],
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
					"patching_rect" : [ 272.461217555734834, 1150.0, 108.0, 35.0 ],
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
					"patching_rect" : [ 389.961217555734834, 1026.0, 127.0, 22.0 ],
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
					"patching_rect" : [ 340.961217555734834, 989.0, 117.0, 20.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "#sometag", "#sleepy", "#happy", "#m4l", "#mainSet" ],
							"parameter_type" : 2,
							"parameter_longname" : "tagchooser",
							"parameter_mmax" : 4,
							"parameter_shortname" : "tagchooser"
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
					"patching_rect" : [ 671.922435111469554, 1123.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 633.0, 71.0, 46.0, 20.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "and_or",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "and_or"
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
					"patching_rect" : [ 814.961217555734947, 1130.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 578.0, 71.0, 53.0, 19.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_type" : 2,
							"parameter_longname" : "live.text[2]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "live.text"
						}

					}
,
					"text" : "Clr Fltr",
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
					"patching_rect" : [ 538.941826333602194, 1091.5, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 141.0, 71.0, 35.0, 20.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_type" : 2,
							"parameter_longname" : "live.text",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "live.text"
						}

					}
,
					"text" : "<==",
					"textcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"textoffcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"varname" : "live.text"
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
					"patching_rect" : [ 139.961217555734834, 1091.5, 124.0, 20.0 ],
					"prefix_mode" : 2,
					"presentation" : 1,
					"presentation_rect" : [ 184.0, 71.0, 117.0, 20.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "Audio Effects", "Instruments", "MIDI Effects", "<==back" ],
							"parameter_type" : 2,
							"parameter_longname" : "parent_chooser",
							"parameter_mmax" : 3,
							"parameter_shortname" : "parent_chooser"
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
					"patching_rect" : [ 582.905662000179291, 586.0, 442.5, 22.0 ],
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
					"patching_rect" : [ 1006.405662000179291, 528.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 610.0, 390.0, 57.0, 24.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "track_select[7]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "track_select[7]"
						}

					}
,
					"text" : "-",
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
					"patching_rect" : [ 959.350106444623748, 528.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 550.999999999999886, 390.0, 57.0, 24.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "track_select[6]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "track_select[6]"
						}

					}
,
					"text" : "-",
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
					"patching_rect" : [ 912.294550889068205, 528.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 492.0, 390.0, 57.0, 24.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "track_select[5]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "track_select[5]"
						}

					}
,
					"text" : "-",
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
					"patching_rect" : [ 865.238995333512548, 528.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 433.0, 390.0, 57.0, 24.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "track_select[4]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "track_select[4]"
						}

					}
,
					"text" : "-",
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
					"patching_rect" : [ 818.183439777957119, 528.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 374.0, 390.0, 57.0, 24.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "track_select[3]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "track_select[3]"
						}

					}
,
					"text" : "-",
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
					"patching_rect" : [ 771.127884222401462, 528.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 312.5, 390.0, 57.0, 24.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "track_select[2]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "track_select[2]"
						}

					}
,
					"text" : "-",
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
					"patching_rect" : [ 723.016773111290377, 528.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 256.0, 390.0, 57.0, 24.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "track_select[1]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "track_select[1]"
						}

					}
,
					"text" : "-",
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
					"patching_rect" : [ 677.016773111290377, 528.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 196.0, 390.0, 59.0, 24.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "track_select[0]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "track_select[0]"
						}

					}
,
					"text" : "-",
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
					"id" : "obj-55",
					"maxclass" : "newobj",
					"numinlets" : 6,
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
						"rect" : [ 788.0, 637.0, 577.0, 248.0 ],
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
									"id" : "obj-4",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 398.0, 100.0, 139.0, 22.0 ],
									"text" : "6 1, 12 1, 62 2, 12 0, 6 0"
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-1",
									"index" : 6,
									"maxclass" : "inlet",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 398.0, 40.0, 30.0, 30.0 ]
								}

							}
, 							{
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
									"destination" : [ "obj-4", 0 ],
									"source" : [ "obj-1", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-38", 0 ],
									"source" : [ "obj-4", 0 ]
								}

							}
, 							{
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
					"patching_rect" : [ 1079.0, 1093.0, 289.0, 22.0 ],
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
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "stop",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "stop"
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
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "next_track",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "next_track"
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
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "prev_track",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "prev_track"
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
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "fire_prev_clip_abs",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "fire_prev_clip_abs"
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
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "fire_next_clip_abs",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "fire_next_clip_abs"
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
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "toggle_detail_clip_loop",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "toggle_detail_clip_loop"
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
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "toggle_clip_detail",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "toggle_clip_detail"
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
					"fontsize" : 8.0,
					"id" : "obj-25",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 192.0, 408.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 736.5, 271.0, 60.0, 33.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "toggle_autoarm",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "toggle_autoarm"
						}

					}
,
					"text" : "AutoArm",
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
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "solo_excl",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "solo_excl"
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
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "mute_excl",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "mute_excl"
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
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "arm_excl",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "arm_excl"
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
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "mute_flip",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "mute_flip"
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
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "mute_kill",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "mute_kill"
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
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "arm_kill",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "arm_kill"
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
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "fire_prev_clip",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "fire_prev_clip"
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
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "fire_next_clip",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_shortname" : "fire_next_clip"
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
					"angle" : 270.0,
					"bgcolor" : [ 0.32549, 0.345098, 0.372549, 1.0 ],
					"border" : 2,
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-212",
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1242.516773111290377, 1357.0, 35.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 137.0, 30.024780250000049, 588.0, 70.0 ],
					"proportion" : 0.39,
					"varname" : "preset_panel"
				}

			}
, 			{
				"box" : 				{
					"angle" : 270.0,
					"bgcolor" : [ 0.32549, 0.345098, 0.372549, 1.0 ],
					"border" : 2,
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-214",
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1316.516773111290377, 1357.0, 35.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 137.0, 543.0, 588.0, 37.0 ],
					"proportion" : 0.39,
					"varname" : "panel[21]"
				}

			}
, 			{
				"box" : 				{
					"angle" : 270.0,
					"bgcolor" : [ 0.32549, 0.345098, 0.372549, 1.0 ],
					"border" : 2,
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-213",
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1316.516773111290377, 1333.0, 35.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 61.5, 30.024780250000049, 69.0, 549.0 ],
					"proportion" : 0.39,
					"varname" : "panel[19]"
				}

			}
, 			{
				"box" : 				{
					"angle" : 270.0,
					"bgcolor" : [ 0.32549, 0.345098, 0.372549, 1.0 ],
					"border" : 2,
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-216",
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1279.516773111290377, 1357.0, 35.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 732.5, 30.024780250000049, 69.0, 549.0 ],
					"proportion" : 0.39,
					"varname" : "right_panel"
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
					"patching_rect" : [ 1324.881866455078125, 566.999998898245394, 71.73626708984375, 51.000001101754577 ],
					"presentation" : 1,
					"presentation_rect" : [ 39.798582150390246, 25.524780250000049, 783.402832031250114, 556.950436892302946 ],
					"tabname" : "commander",
					"varname" : "mira_frame"
				}

			}
, 			{
				"box" : 				{
					"angle" : 270.0,
					"background" : 1,
					"bgcolor" : [ 0.129411764705882, 0.137254901960784, 0.145098039215686, 1.0 ],
					"border" : 2,
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-110",
					"maxclass" : "panel",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1356.0, 1357.0, 35.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 18.0, 8.0, 827.0, 586.0 ],
					"proportion" : 0.39,
					"varname" : "background_panel"
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
					"midpoints" : [ 331.461217555734834, 1392.0, 825.461217555734947, 1392.0, 825.461217555734947, 1238.0, 415.461217555734834, 1238.0 ],
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
					"midpoints" : [ 196.5, 1367.0, 155.980608777867474, 1367.0, 155.980608777867474, 1238.0, 415.461217555734834, 1238.0 ],
					"source" : [ "obj-113", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-92", 0 ],
					"midpoints" : [ 703.461217555734834, 1358.0, 824.461217555734947, 1358.0, 824.461217555734947, 1238.0, 415.461217555734834, 1238.0 ],
					"source" : [ "obj-114", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-43", 0 ],
					"midpoints" : [ 492.5, 881.5, 33.5, 881.5 ],
					"source" : [ "obj-119", 0 ]
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
					"destination" : [ "obj-121", 0 ],
					"source" : [ "obj-120", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-43", 0 ],
					"midpoints" : [ 528.5, 881.5, 33.5, 881.5 ],
					"source" : [ "obj-121", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-120", 0 ],
					"source" : [ "obj-122", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-55", 5 ],
					"source" : [ "obj-125", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-237", 0 ],
					"source" : [ "obj-126", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-240", 0 ],
					"source" : [ "obj-127", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-238", 0 ],
					"source" : [ "obj-128", 0 ]
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
					"destination" : [ "obj-211", 0 ],
					"source" : [ "obj-132", 0 ]
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
					"destination" : [ "obj-143", 0 ],
					"source" : [ "obj-140", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-144", 0 ],
					"source" : [ "obj-140", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-91", 0 ],
					"source" : [ "obj-143", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-91", 1 ],
					"source" : [ "obj-144", 0 ]
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
					"destination" : [ "obj-162", 15 ],
					"source" : [ "obj-152", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-162", 14 ],
					"source" : [ "obj-153", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-162", 13 ],
					"source" : [ "obj-154", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-162", 12 ],
					"source" : [ "obj-155", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-162", 11 ],
					"source" : [ "obj-156", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-162", 10 ],
					"source" : [ "obj-157", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-162", 9 ],
					"source" : [ "obj-158", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-162", 8 ],
					"source" : [ "obj-159", 0 ]
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
					"destination" : [ "obj-82", 0 ],
					"midpoints" : [ 43.25, 1202.0, 149.461217555734834, 1202.0 ],
					"source" : [ "obj-160", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-119", 0 ],
					"source" : [ "obj-162", 0 ]
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
					"destination" : [ "obj-162", 7 ],
					"source" : [ "obj-179", 0 ]
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
					"destination" : [ "obj-162", 6 ],
					"source" : [ "obj-180", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-162", 5 ],
					"source" : [ "obj-181", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-162", 4 ],
					"source" : [ "obj-182", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-162", 3 ],
					"source" : [ "obj-183", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-162", 2 ],
					"source" : [ "obj-184", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-162", 1 ],
					"source" : [ "obj-185", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-162", 0 ],
					"source" : [ "obj-186", 0 ]
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
					"destination" : [ "obj-122", 1 ],
					"source" : [ "obj-2", 0 ]
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
					"destination" : [ "obj-3", 7 ],
					"source" : [ "obj-205", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-160", 0 ],
					"source" : [ "obj-206", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-140", 0 ],
					"source" : [ "obj-207", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-210", 1 ],
					"source" : [ "obj-208", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-210", 0 ],
					"source" : [ "obj-209", 0 ]
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
					"destination" : [ "obj-121", 0 ],
					"midpoints" : [ 1166.988995333512321, 453.84999849999997, 528.5, 453.84999849999997 ],
					"source" : [ "obj-210", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-208", 0 ],
					"source" : [ "obj-211", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-209", 0 ],
					"source" : [ "obj-211", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 6 ],
					"source" : [ "obj-215", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 5 ],
					"source" : [ "obj-217", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 4 ],
					"source" : [ "obj-218", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 3 ],
					"source" : [ "obj-219", 0 ]
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
					"destination" : [ "obj-3", 2 ],
					"source" : [ "obj-220", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 1 ],
					"source" : [ "obj-221", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"source" : [ "obj-222", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-231", 0 ],
					"source" : [ "obj-225", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-122", 0 ],
					"source" : [ "obj-226", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-38", 0 ],
					"source" : [ "obj-228", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-253", 0 ],
					"midpoints" : [ 810.5, 823.0, 776.988995333512548, 823.0, 776.988995333512548, 784.0, 718.516773111290263, 784.0 ],
					"source" : [ "obj-229", 0 ]
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
					"destination" : [ "obj-227", 0 ],
					"midpoints" : [ 1351.5, 1049.0, 1418.5, 1049.0 ],
					"order" : 0,
					"source" : [ "obj-230", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-40", 0 ],
					"midpoints" : [ 1351.5, 1048.5, 1088.5, 1048.5 ],
					"order" : 5,
					"source" : [ "obj-230", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-44", 0 ],
					"midpoints" : [ 1351.5, 1048.5, 1196.5, 1048.5 ],
					"order" : 3,
					"source" : [ "obj-230", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-46", 0 ],
					"midpoints" : [ 1351.5, 1048.5, 1250.5, 1048.5 ],
					"order" : 2,
					"source" : [ "obj-230", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-48", 0 ],
					"midpoints" : [ 1351.5, 1048.5, 1142.5, 1048.5 ],
					"order" : 4,
					"source" : [ "obj-230", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-51", 0 ],
					"midpoints" : [ 1351.5, 1048.5, 1304.5, 1048.5 ],
					"order" : 1,
					"source" : [ "obj-230", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-43", 0 ],
					"midpoints" : [ 1283.0, 882.0, 33.5, 882.0 ],
					"source" : [ "obj-231", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-69", 0 ],
					"midpoints" : [ 488.5, 1139.0, 399.230608777867417, 1139.0, 399.230608777867417, 1080.5, 281.961217555734834, 1080.5 ],
					"source" : [ "obj-237", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-69", 0 ],
					"midpoints" : [ 440.5, 1139.0, 400.230608777867417, 1139.0, 400.230608777867417, 1080.5, 281.961217555734834, 1080.5 ],
					"source" : [ "obj-238", 0 ]
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
					"destination" : [ "obj-43", 0 ],
					"midpoints" : [ 163.5, 881.25, 33.5, 881.25 ],
					"source" : [ "obj-240", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-43", 0 ],
					"midpoints" : [ 1429.0, 882.0, 33.5, 882.0 ],
					"source" : [ "obj-241", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-248", 0 ],
					"midpoints" : [ 639.461217555734834, 741.0, 639.516773111290263, 741.0 ],
					"source" : [ "obj-242", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-43", 0 ],
					"midpoints" : [ 639.461217555734834, 881.283029109239578, 33.5, 881.283029109239578 ],
					"source" : [ "obj-243", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-242", 0 ],
					"source" : [ "obj-244", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-244", 0 ],
					"source" : [ "obj-246", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-250", 0 ],
					"source" : [ "obj-247", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-243", 0 ],
					"source" : [ "obj-248", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-253", 0 ],
					"midpoints" : [ 718.516773111290263, 744.0, 718.516773111290263, 744.0 ],
					"source" : [ "obj-249", 0 ]
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
					"destination" : [ "obj-249", 0 ],
					"source" : [ "obj-250", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-248", 0 ],
					"midpoints" : [ 718.516773111290263, 827.0, 698.016773111290263, 827.0, 698.016773111290263, 784.0, 639.516773111290263, 784.0 ],
					"source" : [ "obj-253", 0 ]
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
					"destination" : [ "obj-229", 0 ],
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
					"destination" : [ "obj-241", 0 ],
					"source" : [ "obj-37", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-230", 0 ],
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
					"midpoints" : [ 592.405662000179291, 749.811336785554886, 33.5, 749.811336785554886 ],
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
					"midpoints" : [ 573.441826333602194, 1114.0, 843.961171555734836, 1114.0, 843.961171555734836, 973.0, 37.461125555734839, 973.0 ],
					"source" : [ "obj-67", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-92", 0 ],
					"midpoints" : [ 440.5, 1238.0, 415.461217555734834, 1238.0 ],
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
					"midpoints" : [ 681.422435111469554, 1204.0, 149.461217555734834, 1204.0 ],
					"source" : [ "obj-71", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-92", 0 ],
					"midpoints" : [ 824.461217555734947, 1238.0, 415.461217555734834, 1238.0 ],
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
					"midpoints" : [ 281.961217555734834, 1203.0, 149.461217555734834, 1203.0 ],
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
					"midpoints" : [ 216.5, 1052.5, 149.5, 1052.5 ],
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
					"midpoints" : [ 548.441826333602194, 1204.5, 149.461217555734834, 1204.5 ],
					"source" : [ "obj-86", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-70", 0 ],
					"midpoints" : [ 37.461125555734839, 1085.25, 149.461217555734834, 1085.25 ],
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
					"destination" : [ "obj-121", 0 ],
					"midpoints" : [ 783.516773111290377, 411.5, 528.5, 411.5 ],
					"source" : [ "obj-91", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-82", 0 ],
					"midpoints" : [ 415.461217555734834, 1281.0, 383.461217555734834, 1281.0, 383.461217555734834, 1205.0, 149.461217555734834, 1205.0 ],
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
			"obj-111" : [ "device_select[3]", "device_select[3]", 0 ],
			"obj-123" : [ "bank_up[1]", "bank_up", 0 ],
			"obj-48" : [ "button[35]", "button", 0 ],
			"obj-228" : [ "redo[1]", "redo", 0 ],
			"obj-57" : [ "track_select[2]", "track_select[2]", 0 ],
			"obj-46" : [ "button[34]", "button", 0 ],
			"obj-100" : [ "tag_button[6]", "tag_button[6]", 0 ],
			"obj-69" : [ "files_chooser", "files_chooser", 0 ],
			"obj-206" : [ "selection_mode[1]", "selection_mode", 0 ],
			"obj-224" : [ "preset_right", "preset_right", 0 ],
			"obj-44" : [ "button[33]", "button", 0 ],
			"obj-35" : [ "next_track", "next_track", 0 ],
			"obj-179" : [ "paramDial[7]", "paramDial[7]", 0 ],
			"obj-155" : [ "paramDial[12]", "paramDial[12]", 0 ],
			"obj-20" : [ "solo_kill", "solo_kill", 0 ],
			"obj-217" : [ "preset[5]", "preset", 0 ],
			"obj-94" : [ "device_select[7]", "device_select[7]", 0 ],
			"obj-11" : [ "tagchooser", "tagchooser", 0 ],
			"obj-34" : [ "prev_track", "prev_track", 0 ],
			"obj-19" : [ "mute_kill", "mute_kill", 0 ],
			"obj-60" : [ "track_select[5]", "track_select[5]", 0 ],
			"obj-33" : [ "fire_prev_clip_abs", "fire_prev_clip_abs", 0 ],
			"obj-18" : [ "arm_kill", "arm_kill", 0 ],
			"obj-127" : [ "goto[1]", "goto", 0 ],
			"obj-225" : [ "cue", "cue", 0 ],
			"obj-32" : [ "fire_next_clip_abs", "fire_next_clip_abs", 0 ],
			"obj-89" : [ "track[2]", "track[2]", 0 ],
			"obj-95" : [ "tag_button[1]", "tag_button[1]", 0 ],
			"obj-37" : [ "volume_slider", "volume_slider", 0 ],
			"obj-9" : [ "play", "play", 0 ],
			"obj-15" : [ "new_scene", "new_scene", 0 ],
			"obj-28" : [ "undo", "undo", 0 ],
			"obj-184" : [ "paramDial[2]", "paramDial[2]", 0 ],
			"obj-31" : [ "select_first_armed_track", "select_first_armed_track", 0 ],
			"obj-126" : [ "next_in_folder_button", "next_in_folder_button", 0 ],
			"obj-16" : [ "select_playing_clip", "select_playing_clip", 0 ],
			"obj-36" : [ "stop", "stop", 0 ],
			"obj-30" : [ "toggle_detail_clip_loop", "toggle_detail_clip_loop", 0 ],
			"obj-17" : [ "stop_all_clips", "stop_all_clips", 0 ],
			"obj-115" : [ "device_select[1]", "device_select[1]", 0 ],
			"obj-220" : [ "preset[2]", "preset", 0 ],
			"obj-49" : [ "track_select[0]", "track_select[0]", 0 ],
			"obj-98" : [ "tag_button[4]", "tag_button[4]", 0 ],
			"obj-54" : [ "track[5]", "track[5]", 0 ],
			"obj-25" : [ "toggle_autoarm", "toggle_autoarm", 0 ],
			"obj-125" : [ "button[1]", "button", 0 ],
			"obj-12" : [ "stop_clip", "stop_clip", 0 ],
			"obj-52" : [ "track[7]", "track[7]", 0 ],
			"obj-222" : [ "preset[0]", "preset", 0 ],
			"obj-13" : [ "fire_prev_clip", "fire_prev_clip", 0 ],
			"obj-181" : [ "paramDial[5]", "paramDial[5]", 0 ],
			"obj-24" : [ "solo_excl", "solo_excl", 0 ],
			"obj-157" : [ "paramDial[10]", "paramDial[10]", 0 ],
			"obj-107" : [ "device_select[5]", "device_select[5]", 0 ],
			"obj-14" : [ "fire_next_clip", "fire_next_clip", 0 ],
			"obj-23" : [ "mute_excl", "mute_excl", 0 ],
			"obj-58" : [ "track_select[3]", "track_select[3]", 0 ],
			"obj-22" : [ "arm_excl", "arm_excl", 0 ],
			"obj-7" : [ "solo_selected", "solo_selected", 0 ],
			"obj-101" : [ "tag_button[7]", "tag_button[7]", 0 ],
			"obj-108" : [ "track[0]", "track[0]", 0 ],
			"obj-6" : [ "mute_selected", "mute_selected", 0 ],
			"obj-42" : [ "bank_track_right", "bank_track_right", 0 ],
			"obj-21" : [ "mute_flip", "mute_flip", 0 ],
			"obj-154" : [ "paramDial[13]", "paramDial[13]", 0 ],
			"obj-186" : [ "paramDial[0]", "paramDial[0]", 0 ],
			"obj-41" : [ "bank_track_left", "bank_track_left", 0 ],
			"obj-1" : [ "arm_selected", "arm_selected", 0 ],
			"obj-124" : [ "bank_down[1]", "bank_down", 0 ],
			"obj-215" : [ "preset[6]", "preset", 0 ],
			"obj-2" : [ "record", "record", 0 ],
			"obj-61" : [ "track_select[6]", "track_select[6]", 0 ],
			"obj-88" : [ "track[3]", "track[3]", 0 ],
			"obj-226" : [ "metro_toggle", "metro_toggle", 0 ],
			"obj-96" : [ "tag_button[2]", "tag_button[2]", 0 ],
			"obj-183" : [ "paramDial[3]", "paramDial[3]", 0 ],
			"obj-159" : [ "paramDial[8]", "paramDial[8]", 0 ],
			"obj-152" : [ "paramDial[15]", "paramDial[15]", 0 ],
			"obj-112" : [ "device_select[2]", "device_select[2]", 0 ],
			"obj-50" : [ "track_select[1]", "track_select[1]", 0 ],
			"obj-223" : [ "preset_left", "preset_left", 0 ],
			"obj-99" : [ "tag_button[5]", "tag_button[5]", 0 ],
			"obj-53" : [ "track[6]", "track[6]", 0 ],
			"obj-85" : [ "selection_mode", "selection_mode", 0 ],
			"obj-219" : [ "preset[3]", "preset", 0 ],
			"obj-156" : [ "paramDial[11]", "paramDial[11]", 0 ],
			"obj-40" : [ "button[32]", "button", 0 ],
			"obj-180" : [ "paramDial[6]", "paramDial[6]", 0 ],
			"obj-27" : [ "create_midi_track", "create_midi_track", 0 ],
			"obj-106" : [ "device_select[6]", "device_select[6]", 0 ],
			"obj-117" : [ "bank_device_right[1]", "bank_device_right", 0 ],
			"obj-26" : [ "create_audio_track", "create_audio_track", 0 ],
			"obj-103" : [ "tag_button_bank_down", "tag_button_bank_down", 0 ],
			"obj-59" : [ "track_select[4]", "track_select[4]", 0 ],
			"obj-10" : [ "toggle_clip_detail", "toggle_clip_detail", 0 ],
			"obj-63" : [ "live.text[2]", "live.text", 0 ],
			"obj-90" : [ "track[1]", "track[1]", 0 ],
			"obj-93" : [ "tag_button[0]", "tag_button[0]", 0 ],
			"obj-8" : [ "fire_next_armed", "fire_next_armed", 0 ],
			"obj-153" : [ "paramDial[14]", "paramDial[14]", 0 ],
			"obj-128" : [ "selection_mode[3]", "selection_mode", 0 ],
			"obj-221" : [ "preset[1]", "preset", 0 ],
			"obj-185" : [ "paramDial[1]", "paramDial[1]", 0 ],
			"obj-4" : [ "fire_all_armed", "fire_all_armed", 0 ],
			"obj-70" : [ "parent_chooser", "parent_chooser", 0 ],
			"obj-218" : [ "preset[4]", "preset", 0 ],
			"obj-62" : [ "track_select[7]", "track_select[7]", 0 ],
			"obj-116" : [ "device_select[0]", "device_select[0]", 0 ],
			"obj-205" : [ "preset[7]", "preset", 0 ],
			"obj-118" : [ "bank_device_left[1]", "bank_device_left", 0 ],
			"obj-29" : [ "redo", "redo", 0 ],
			"obj-84" : [ "track[4]", "track[4]", 0 ],
			"obj-97" : [ "tag_button[3]", "tag_button[3]", 0 ],
			"obj-102" : [ "tag_button_bank_up", "tag_button_bank_up", 0 ],
			"obj-67" : [ "live.text", "live.text", 0 ],
			"obj-56" : [ "and_or", "and_or", 0 ],
			"obj-158" : [ "paramDial[9]", "paramDial[9]", 0 ],
			"obj-182" : [ "paramDial[4]", "paramDial[4]", 0 ],
			"obj-109" : [ "device_select[4]", "device_select[4]", 0 ],
			"obj-51" : [ "button[36]", "button", 0 ],
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
				"name" : "mira.mt.region.maxpat",
				"bootpath" : "C74:/packages/mira/patchers",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "11strokes2.mxo",
				"type" : "iLaX"
			}
, 			{
				"name" : "mira.multitouch.mxo",
				"type" : "iLaX"
			}
 ],
		"autosave" : 0,
		"bgcolor" : [ 0.717647058823529, 0.717647058823529, 0.717647058823529, 1.0 ],
		"editing_bgcolor" : [ 0.356862745098039, 0.356862745098039, 0.356862745098039, 1.0 ]
	}

}
