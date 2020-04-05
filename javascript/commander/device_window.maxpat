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
		"rect" : [ 643.0, 519.0, 640.0, 480.0 ],
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
					"id" : "obj-45",
					"maxclass" : "dial",
					"mode" : 4,
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 342.0, 93.0, 40.0, 40.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 20.659344553947449, 57.699706999999989, 40.0, 40.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_dial",
							"parameter_shortname" : "param_dial",
							"parameter_defer" : 1,
							"parameter_type" : 0
						}

					}
,
					"varname" : "param_dial"
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
					"patching_rect" : [ 178.659344553947449, 292.699706999999989, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 391.659344553947449, 169.699706999999989, 52.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_value[15]",
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
					"varname" : "param_value[15]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-43",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 123.659344553947449, 292.699706999999989, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 337.659344553947449, 169.699706999999989, 52.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_value[14]",
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
					"varname" : "param_value[14]"
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
					"patching_rect" : [ 69.659344553947449, 286.699706999999989, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 283.659344553947449, 169.699706999999989, 52.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_value[13]",
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
					"varname" : "param_value[13]"
				}

			}
, 			{
				"box" : 				{
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
					"patching_rect" : [ 19.659344553947449, 290.699706999999989, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 229.659344553947449, 169.699706999999989, 52.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_value[12]",
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
					"varname" : "param_value[12]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-39",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 176.659344553947449, 265.699706999999989, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 391.659344553947449, 145.699706999999989, 52.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_name[15]",
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
					"varname" : "param_name[15]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-38",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 119.659344553947449, 266.699706999999989, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 337.659344553947449, 145.699706999999989, 52.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_name[14]",
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
					"varname" : "param_name[14]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-37",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 71.659344553947449, 266.699706999999989, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 283.659344553947449, 145.699706999999989, 52.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_name[13]",
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
					"varname" : "param_name[13]"
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
					"patching_rect" : [ 16.659344553947449, 266.699706999999989, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 229.659344553947449, 145.699706999999989, 52.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_name[12]",
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
					"varname" : "param_name[12]"
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
					"patching_rect" : [ 176.659344553947449, 202.699706999999989, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 176.659344553947449, 169.699706999999989, 52.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_value[11]",
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
					"varname" : "param_value[11]"
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
					"patching_rect" : [ 121.659344553947449, 201.699706999999989, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 122.659344553947449, 169.699706999999989, 52.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_value[10]",
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
					"varname" : "param_value[10]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-33",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 70.659344553947449, 200.699706999999989, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 68.659344553947449, 169.699706999999989, 52.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_value[9]",
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
					"varname" : "param_value[9]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-32",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 14.659344553947449, 201.699706999999989, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 14.659344553947449, 169.699706999999989, 52.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_value[8]",
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
					"varname" : "param_value[8]"
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
					"patching_rect" : [ 177.659344553947449, 179.699706999999989, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 176.659344553947449, 145.699706999999989, 52.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_name[11]",
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
					"varname" : "param_name[11]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-30",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 120.659344553947449, 177.699706999999989, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 122.659344553947449, 145.699706999999989, 52.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_name[10]",
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
					"varname" : "param_name[10]"
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
					"patching_rect" : [ 66.659344553947449, 179.699706999999989, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 68.659344553947449, 145.699706999999989, 52.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_name[9]",
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
					"varname" : "param_name[9]"
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
					"patching_rect" : [ 15.659344553947449, 177.699706999999989, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 14.659344553947449, 145.699706999999989, 52.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_name[8]",
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
					"varname" : "param_name[8]"
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
					"patching_rect" : [ 178.659344553947449, 108.699706999999989, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 391.659344553947449, 33.699706999999989, 52.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_value[7]",
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
					"varname" : "param_value[7]"
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
					"patching_rect" : [ 123.659344553947449, 110.699706999999989, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 337.659344553947449, 33.699706999999989, 52.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_value[6]",
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
					"varname" : "param_value[6]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-25",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 65.659344553947449, 106.699706999999989, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 283.659344553947449, 33.699706999999989, 52.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_value[5]",
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
					"varname" : "param_value[5]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-24",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 17.659344553947449, 106.699706999999989, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 229.659344553947449, 33.699706999999989, 52.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_value[4]",
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
					"varname" : "param_value[4]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-23",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 176.659344553947449, 33.699706999999989, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 176.659344553947449, 33.699706999999989, 52.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_value[3]",
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
					"varname" : "param_value[3]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-22",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 121.659344553947449, 34.699706999999989, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 122.659344553947449, 33.699706999999989, 52.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_value[2]",
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
					"varname" : "param_value[2]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-21",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 70.659344553947449, 30.699706999999989, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 68.659344553947449, 33.699706999999989, 52.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_value[1]",
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
					"varname" : "param_value[1]"
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
					"patching_rect" : [ 15.659344553947449, 29.699706999999989, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 14.659344553947449, 33.699706999999989, 52.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_value[0]",
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
					"varname" : "param_value[0]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-11",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 390.659344553947449, 8.699706999999989, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 391.659344553947449, 9.699706999999989, 52.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_name[7]",
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
					"varname" : "param_name[7]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-10",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 334.659344553947449, 7.699706999999989, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 337.659344553947449, 9.699706999999989, 52.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_name[6]",
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
					"varname" : "param_name[6]"
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
					"patching_rect" : [ 284.659344553947449, 11.699706999999989, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 283.659344553947449, 9.699706999999989, 52.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_name[5]",
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
					"varname" : "param_name[5]"
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
					"patching_rect" : [ 229.659344553947449, 8.699706999999989, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 229.659344553947449, 9.699706999999989, 52.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_name[4]",
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
					"varname" : "param_name[4]"
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
					"patching_rect" : [ 172.659344553947449, 11.699706999999989, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 176.659344553947449, 9.699706999999989, 52.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_name[3]",
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
					"varname" : "param_name[3]"
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
					"patching_rect" : [ 123.659344553947449, 9.699706999999989, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 122.659344553947449, 9.699706999999989, 52.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_name[2]",
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
					"varname" : "param_name[2]"
				}

			}
, 			{
				"box" : 				{
					"activetextcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"activetextoncolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"fontsize" : 8.0,
					"id" : "obj-5",
					"maxclass" : "live.text",
					"mode" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 67.659344553947449, 11.699706999999989, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 68.659344553947449, 9.699706999999989, 52.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_name[1]",
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
					"varname" : "param_name[1]"
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
					"patching_rect" : [ 49.0, 47.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 14.659344553947449, 9.699706999999989, 52.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "param_name[0]",
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
					"varname" : "param_name[0]"
				}

			}
, 			{
				"box" : 				{
					"background" : 1,
					"id" : "obj-46",
					"ignoreclick" : 1,
					"maxclass" : "mira.frame",
					"numinlets" : 0,
					"numoutlets" : 0,
					"patching_rect" : [ 471.0, 266.0, 256.000006437301636, 182.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 10.0, 4.0, 445.890121102333069, 317.0 ],
					"tabname" : "device"
				}

			}
 ],
		"lines" : [  ],
		"parameters" : 		{
			"obj-5" : [ "param_name[1]", "bank_track_left", 0 ],
			"obj-6" : [ "param_name[2]", "bank_track_left", 0 ],
			"obj-44" : [ "param_value[15]", "bank_track_left", 0 ],
			"obj-41" : [ "param_name[0]", "bank_track_left", 0 ],
			"obj-31" : [ "param_name[11]", "bank_track_left", 0 ],
			"obj-37" : [ "param_name[13]", "bank_track_left", 0 ],
			"obj-28" : [ "param_name[8]", "bank_track_left", 0 ],
			"obj-21" : [ "param_value[1]", "bank_track_left", 0 ],
			"obj-11" : [ "param_name[7]", "bank_track_left", 0 ],
			"obj-45" : [ "param_dial", "param_dial", 0 ],
			"obj-22" : [ "param_value[2]", "bank_track_left", 0 ],
			"obj-23" : [ "param_value[3]", "bank_track_left", 0 ],
			"obj-39" : [ "param_name[15]", "bank_track_left", 0 ],
			"obj-30" : [ "param_name[10]", "bank_track_left", 0 ],
			"obj-36" : [ "param_name[12]", "bank_track_left", 0 ],
			"obj-40" : [ "param_value[12]", "bank_track_left", 0 ],
			"obj-24" : [ "param_value[4]", "bank_track_left", 0 ],
			"obj-42" : [ "param_value[13]", "bank_track_left", 0 ],
			"obj-25" : [ "param_value[5]", "bank_track_left", 0 ],
			"obj-43" : [ "param_value[14]", "bank_track_left", 0 ],
			"obj-26" : [ "param_value[6]", "bank_track_left", 0 ],
			"obj-7" : [ "param_name[3]", "bank_track_left", 0 ],
			"obj-27" : [ "param_value[7]", "bank_track_left", 0 ],
			"obj-8" : [ "param_name[4]", "bank_track_left", 0 ],
			"obj-20" : [ "param_value[0]", "bank_track_left", 0 ],
			"obj-9" : [ "param_name[5]", "bank_track_left", 0 ],
			"obj-38" : [ "param_name[14]", "bank_track_left", 0 ],
			"obj-32" : [ "param_value[8]", "bank_track_left", 0 ],
			"obj-33" : [ "param_value[9]", "bank_track_left", 0 ],
			"obj-10" : [ "param_name[6]", "bank_track_left", 0 ],
			"obj-29" : [ "param_name[9]", "bank_track_left", 0 ],
			"obj-34" : [ "param_value[10]", "bank_track_left", 0 ],
			"obj-35" : [ "param_value[11]", "bank_track_left", 0 ],
			"parameterbanks" : 			{

			}

		}
,
		"dependency_cache" : [  ],
		"autosave" : 0
	}

}
