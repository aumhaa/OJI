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
		"rect" : [ 34.0, 79.0, 1413.0, 947.0 ],
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
					"id" : "obj-65",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 82.0, 6.0, 36.0, 22.0 ],
					"text" : "defer",
					"varname" : "filetreeDefer"
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
					"presentation_rect" : [ 590.5, 437.5, 187.0, 20.0 ],
					"text" : "tag selected with filter",
					"varname" : "tag_next_selected_button"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-60",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 170.0, 440.0, 61.0, 22.0 ],
					"text" : "pack 0 s"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-62",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 170.0, 495.0, 180.0, 22.0 ],
					"text" : "prepend toFileTree open_parent"
				}

			}
, 			{
				"box" : 				{
					"align" : 2,
					"fontface" : 0,
					"id" : "obj-57",
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 484.0, 4.0, 56.0, 20.0 ],
					"text" : "<==back",
					"textjustification" : 2,
					"texton" : "<==back",
					"varname" : "parent_back_button[1]"
				}

			}
, 			{
				"box" : 				{
					"align" : 2,
					"fontface" : 0,
					"id" : "obj-48",
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 239.0, 6.0, 56.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 172.5, 23.5, 26.0, 18.0 ],
					"text" : "<==back",
					"textjustification" : 2,
					"texton" : "<==back",
					"varname" : "parent_back_button"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-54",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 188.0, 541.0, 35.0, 22.0 ],
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
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_initial" : [ 0.0 ],
							"parameter_shortname" : "float",
							"parameter_enum" : [ "close", "close" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "float"
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
							"parameter_invisible" : 2,
							"parameter_mmax" : 1,
							"parameter_initial" : [ 0.0 ],
							"parameter_shortname" : "close",
							"parameter_enum" : [ "close", "close" ],
							"parameter_defer" : 1,
							"parameter_type" : 2,
							"parameter_linknames" : 1,
							"parameter_longname" : "close"
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
					"patching_rect" : [ 1158.999908000000005, 178.0, 175.0, 22.0 ],
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
					"patching_rect" : [ 1158.999908000000005, 145.0, 100.0, 20.0 ],
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
					"presentation_rect" : [ 689.5, 504.0, 88.0, 20.0 ],
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
					"presentation_rect" : [ 689.5, 482.0, 88.0, 20.0 ],
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
					"presentation_rect" : [ 590.5, 482.0, 85.0, 20.0 ],
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
					"presentation_rect" : [ 43.625, 3.5, 154.875, 16.0 ],
					"text" : "scan_library",
					"texton" : "scan_library"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-14",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 142.499908000000005, 6.0, 54.0, 22.0 ],
					"text" : "deferlow",
					"varname" : "filetreeDeferLow"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-21",
					"maxclass" : "newobj",
					"numinlets" : 3,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 86.0, 36.0, 482.0, 22.0 ],
					"text" : "route parent files"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-23",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 401.0, 440.0, 61.0, 22.0 ],
					"text" : "pack 0 s"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-27",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 317.0, 440.0, 61.0, 22.0 ],
					"text" : "pack 0 s"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-28",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 86.0, 440.0, 61.0, 22.0 ],
					"text" : "pack 0 s"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-29",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 401.0, 495.0, 171.0, 22.0 ],
					"text" : "prepend toFileTree open_child"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-32",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 86.0, 471.0, 185.0, 22.0 ],
					"text" : "prepend toFileTree select_parent"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-33",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 317.0, 471.0, 175.0, 22.0 ],
					"text" : "prepend toFileTree select_child"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 0,
					"fontname" : "Arial",
					"fontsize" : 10.0,
					"headerheight" : 20,
					"headerlabel" : "Children",
					"id" : "obj-34",
					"items" : "<empty>",
					"margin" : 20,
					"maxclass" : "chooser",
					"multiselect" : 0,
					"numinlets" : 1,
					"numoutlets" : 6,
					"outlettype" : [ "", "", "", "", "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 317.0, 70.0, 229.0, 353.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 200.5, 3.5, 196.0, 454.0 ],
					"selectedclick" : 1,
					"textjustification" : 0,
					"varname" : "files_chooser"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 0,
					"fontname" : "Arial",
					"fontsize" : 10.0,
					"headerheight" : 20,
					"headerlabel" : "Parent",
					"id" : "obj-35",
					"items" : "<empty>",
					"maxclass" : "chooser",
					"multiselect" : 0,
					"numinlets" : 1,
					"numoutlets" : 6,
					"outlettype" : [ "", "", "", "", "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 86.0, 70.0, 229.0, 353.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 2.5, 23.5, 196.0, 434.5 ],
					"textjustification" : 0,
					"varname" : "parent_chooser"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-15",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 661.0, 4.0, 54.0, 22.0 ],
					"text" : "deferlow",
					"varname" : "select_pipe"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-31",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 661.0, 28.0, 72.0, 22.0 ],
					"text" : "prepend set"
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
					"presentation_rect" : [ 200.5, 504.0, 196.0, 22.0 ],
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
					"presentation_rect" : [ 2.5, 460.0, 196.0, 20.0 ],
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
					"presentation_rect" : [ 200.5, 460.0, 388.0, 22.0 ],
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
					"patching_rect" : [ 1139.999908000000005, 99.0, 123.0, 22.0 ],
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
					"patching_rect" : [ 1139.999908000000005, 70.0, 100.0, 20.0 ],
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
					"presentation_rect" : [ 2.5, 482.0, 196.0, 20.0 ],
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
					"presentation_rect" : [ 6.5, 504.0, 192.0, 20.0 ],
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
					"presentation_rect" : [ 590.5, 504.0, 85.0, 20.0 ],
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
					"presentation_rect" : [ 689.5, 459.5, 88.0, 20.0 ],
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
					"presentation_rect" : [ 590.5, 460.0, 85.0, 20.0 ],
					"text" : "add"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-13",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 993.200000000000045, 356.0, 186.0, 22.0 ],
					"text" : "prepend toTagFilter tag_selection"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 0,
					"fontname" : "Arial",
					"fontsize" : 10.0,
					"headerheight" : 20,
					"headerlabel" : "Tag Pool",
					"id" : "obj-10",
					"items" : [ "#cello", ",", "#fx", ",", "#gt", ",", "#loopers", ",", "#m4l", ",", "#drums", ",", "#mainSet", ",", "#plinko", ",", "#synth", ",", "#generative", ",", "#skin", ",", "#none", ",", "#some" ],
					"maxclass" : "chooser",
					"multiselect" : 1,
					"numinlets" : 1,
					"numoutlets" : 6,
					"outlettype" : [ "", "", "", "", "", "" ],
					"parameter_enable" : 0,
					"parameter_mappable" : 0,
					"patching_rect" : [ 964.0, 66.0, 165.0, 281.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 590.5, 47.5, 187.0, 387.0 ],
					"textjustification" : 0,
					"varname" : "tagchooser"
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
					"presentation_rect" : [ 200.5, 482.0, 388.5, 22.0 ],
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
					"bangmode" : 1,
					"id" : "obj-19",
					"keymode" : 1,
					"maxclass" : "textedit",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "", "int", "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 642.0, 664.0, 255.0, 21.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 399.0, 504.0, 190.0, 21.0 ],
					"varname" : "tagfilter"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-18",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 605.799999999999955, 356.0, 84.0, 22.0 ],
					"text" : "pack 0 s"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-17",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 735.399999999999977, 356.0, 83.800000000000011, 22.0 ],
					"text" : "pack 0 s"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-16",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 735.399999999999977, 385.0, 211.0, 22.0 ],
					"text" : "prepend toFileTagger chooser_double"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-11",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 605.799999999999955, 417.0, 206.0, 22.0 ],
					"text" : "prepend toFileTagger chooser_single"
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
					"index" : 1,
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
					"index" : 1,
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 606.0, 14.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontface" : 0,
					"fontname" : "Arial",
					"fontsize" : 10.0,
					"headerheight" : 20,
					"headerlabel" : "Filterd Files",
					"id" : "obj-3",
					"items" : [ "Instrument", "Rack.adg", ",", "Simpler-1.adv", ",", "Simpler.adv", ",", "Built-in", "0-Vel", "(Live", "8)-1.adg", ",", "Built-in", "0-Vel", "(Live", "8).adg", ",", "Buzzer(Compressed)", "(Live", "8)-1.adg", ",", "Buzzer(Compressed)", "(Live", "8).adg", ",", "Chord", "&", "Stutter", "(Live", "8)-1.adg", ",", "Chord", "&", "Stutter", "(Live", "8).adg", ",", "Compressed", "Beat(Reverb)", "(Live", "8)-1.adg", ",", "Compressed", "Beat(Reverb)", "(Live", "8).adg", ",", "FM", "Beat", "Driver(Delay-Vocode)", "(Live", "8)-1.adg", ",", "FM", "Beat", "Driver(Delay-Vocode)", "(Live", "8).adg", ",", "Peach", "Fuzz(Delay)", "(Live", "8)-1.adg", ",", "Peach", "Fuzz(Delay)", "(Live", "8).adg", ",", "Slice", "to", "single", "Sampler", "(Live", "8)-1.adv", ",", "Slice", "to", "single", "Sampler", "(Live", "8).adv", ",", "Slicer", "Dicer", "(Live", "8)-1.adg", ",", "Slicer", "Dicer", "(Live", "8).adg", ",", "Slow", "Riser", "(Live", "8)-1.adg", ",", "Slow", "Riser", "(Live", "8).adg", ",", "Triplet", "Armada", "(Live", "8)-1.adg", ",", "Triplet", "Armada", "(Live", "8).adg", ",", "M4L.sine.aif", ",", "@d_12", "Instrument", "FX", "043020.adg", ",", "MeshInput.adg", ",", "Ext.", "Instrument.adv", ",", "Testing", "AumPush.adg", ",", "skin_tablas.adv", ",", "Pitch.adv", ",", "BELLTONE.adv", ",", "DETUNE-1.adv", ",", "DETUNE.adv", ",", "NATDECFF.adv", ",", "NATDECMF.adv", ",", "NATDECP.adv", ",", "NATDECVELSWX.adv", ",", "SFTBELLTONES.adv", ",", "SFTDETUNED.adv", ",", "SFTPDFF.adv", ",", "SFTPDMF.adv", ",", "SFTPDP.adv", ",", "SFTPDVELSWX.adv", ",", "SFTSTACFF.adv", ",", "SFTSTACMF.adv", ",", "SFTSTACP.adv", ",", "SFTSTACVELSW.adv", ",", "STACFF.adv", ",", "STACMF.adv", ",", "STACP.adv", ",", "STACVELSWX.adv", ",", "Adagio", "Strings.adv", ",", "AreYouPrepared.adv", ",", "EXS", "Strings", 2, "ECO.adv", ",", "Light", "Acoustic", "Grand.adv", ",", "St", "Bosendorfer.adg", ",", "Bd6-02.wav", ",", "Low1-01.wav", ",", "Low1-02.wav", ",", "bol_bd1.wav", ",", "bol_bd2.wav", ",", "dee_bd.wav", ",", "gra_cl1.wav", ",", "gra_cl2.wav", ",", "gra_sn3.wav", ",", "hip_hh1.wav", ",", "hip_hh2.wav", ",", "rav_bd1.wav", ",", "rav_bd2.wav", ",", "rav_bd4.wav", ",", "ste_bd1.wav", ",", "swa_cl1.wav", ",", "swa_cl2.wav", ",", "swa_sn2.wav", ",", "woo_bd1.wav", ",", "woo_bd2.wav", ",", "woo_bd3.wav", ",", "woo_hh1.wav", ",", "woo_hh2.wav", ",", "Arc_Cy01_S_V1.wav", ",", "Arc_HH03_S_V1.wav", ",", "Arc_HH04_S_V1.wav", ",", "Arc_SD01_S_V1.wav", ",", "Arc_SD02_S_V1.wav", ",", "FM_HHv01_S_V1.wav", ",", "FM_HHv02_S_V2.wav", ",", "FM_P07_S_V1.wav", ",", "FM_P08_S_V1.wav", ",", "FM_Pt01_M_V1.wav", ",", "FM_Pt01_M_V2.wav", ",", "Bassdrum_6_stereo.wav", ",", "tom_low.wav", ",", "Sound", "71.wav", ",", "Sound", "78.wav", ",", "Bd-01.wav", ",", "MTL_CNG_MF.wav", ",", "Dusty_Anakick_M.wav", ",", "Dusty_Bassflutter_M.wav", ",", "Dusty_HiBottom_V3_M.wav", ",", "Dusty_HiClosh_V1_M.wav", ",", "Dusty_HiClosh_V2_M.wav", ",", "Dusty_HiClosh_V3_M.wav", ",", "Dusty_HiClosh_V4_M.wav", ",", "Dusty_HiClosh_V5_M.wav", ",", "Dusty_HiClosh_V6_M.wav", ",", "Dusty_HiClosh_V7_M.wav", ",", "Dusty_HiClosh_V8_M.wav", ",", "Dusty_HiClosh_V9_M.wav", ",", "Dusty_Reverbshake_M.wav", ",", "RAmk2_808BD_ST.wav", ",", "RAmk2_BD_work_ST.wav", ",", "RAmk2_acid_bd_ST.wav", ",", "RAmk2_boee_ST.wav", ",", "RAmk2_cl_syn-hat1_ST.wav", ",", "RAmk2_cl_syn-hat2_ST.wav", ",", "RAmk2_klick_bd_ST.wav", ",", "RAmk2_rim01_ST.wav", ",", "RAmk2_rim02_ST.wav", ",", "RAmk2_sub-bomb_ST.wav", ",", "RAmk2_tick_ST.wav", ",", "CDBTR-38.wav", ",", "Tabla", "Open.aif", ",", "Tabla", "Slap", "#1.aif", ",", "Tabla", "Slap", "#2.aif", ",", "Tabla", "Slap", "#3.aif", ",", "Tabla", "Slap", "#4.aif", ",", "Tabla", "Slap", "#5.aif", ",", "Tabla", "Tone", "#1.aif", ",", "Tabla", "Tone", "#2.aif", ",", "Tabla", "Tone", "#3.aif", ",", "Tabla", "Tone", "#4.aif", ",", "Tabla", "Tone", "#5.aif", ",", "Tabla", "Tone", "#6.aif", ",", "Tabla", "Tone", "#7.aif", ",", "Tabla", "Tone", "#8.aif", ",", "Tabla", "Tone.aif", ",", "Tabla:Banya", "#1.aif", ",", "Tabla:Banya", "#2.aif", ",", "Tabla:Banya", "#3.aif", ",", "53.wav", ",", "Arc_SDt04_S_V1.wav", ",", "BD1-06.wav", ",", "A#3FFNATD.aif", ",", "A#4FFNATD.aif", ",", "A3FFNATDC.aif", ",", "A5FFNATDC.aif", ",", "B0FFNATDC.aif", ",", "C#5FFNATD.aif", ",", "C4FFNATDC.aif", ",", "C5FFNATDC.aif", ",", "D#4FFNATD.aif", ",", "D#5FFNATD.aif", ",", "D1FFNATDC.aif", ",", "D2FFNATDC.aif", ",", "D3FFNATDC.aif", ",", "D4FFNATDC.aif", ",", "D5FFNATDC.aif", ",", "E4FFNATDC.aif", ",", "E5FFNATDC.aif", ",", "F3FFNATDC.aif", ",", "F4FFNATDC.aif", ",", "F5FFNATDC.aif", ",", "G#1FFNATD.aif", ",", "G#2FFNATD.aif", ",", "G#3FFNATD.aif", ",", "G#4FFNATD.aif", ",", "G#5FFNATD.aif", ",", "G3FFNATDC.aif", ",", "G5FFNATDC.aif", ",", "A#3FFNATD.aif", ",", "A#4FFNATD.aif", ",", "A3FFNATDC.aif", ",", "A5FFNATDC.aif", ",", "B0FFNATDC.aif", ",", "C#5FFNATD.aif", ",", "C4FFNATDC.aif", ",", "C5FFNATDC.aif", ",", "D#4FFNATD.aif", ",", "D#5FFNATD.aif", ",", "D1FFNATDC.aif", ",", "D2FFNATDC.aif", ",", "D3FFNATDC.aif", ",", "D4FFNATDC.aif", ",", "D5FFNATDC.aif", ",", "E4FFNATDC.aif", ",", "E5FFNATDC.aif", ",", "F3FFNATDC.aif", ",", "F4FFNATDC.aif", ",", "F5FFNATDC.aif", ",", "G#1FFNATD.aif", ",", "G#2FFNATD.aif", ",", "G#3FFNATD.aif", ",", "G#4FFNATD.aif", ",", "G#5FFNATD.aif", ",", "G3FFNATDC.aif", ",", "G5FFNATDC.aif", ",", "Bass", "Drum", "Hip-Hop1-01.wav", ",", "Bass", "Drum2.wav", ",", "Bass", "Drum23.wav", ",", "Bass", "Drum3.wav", ",", "Bd2_One2.wav", ",", "A#3", "FF", "STAC.aif", ",", "A#3FFNATD.aif", ",", "A#4", "FF", "STAC.aif", ",", "A#4FFNATD.aif", ",", "A#5", "FF", "STAC.aif", ",", "A#5FFNATD.aif", ",", "A#7FFNATD.aif", ",", "A3", "FF", "STAC.aif", ",", "A3FFNATDC.aif", ",", "A5", "FF", "STAC.aif", ",", "A5FFNATDC.aif", ",", "A7FFNATDC.aif", ",", "B0FFNATDC.aif", ",", "B7FFNATDC.aif", ",", "C#5", "FF", "STAC.aif", ",", "C#5FFNATD.aif", ",", "C#6FFNATD.aif", ",", "C4", "FF", "STAC.aif", ",", "C4FFNATDC.aif", ",", "C5", "FF", "STAC.aif", ",", "C5FFNATDC.aif", ",", "C6", "FF", "STAC.aif", ",", "C6FFNATDC.aif", ",", "C7FFNATDC.aif", ",", "D#4", "FF", "STAC.aif", ",", "D#4FFNATD.aif", ",", "D#5", "FF", "STAC.aif", ",", "D#5FFNATD.aif", ",", "D#6FFNATD.aif", ",", "D1FFNATDC.aif", ",", "D2", "FF", "STAC.aif", ",", "D2FFNATDC.aif", ",", "D3", "FF", "STAC.aif", ",", "D3FFNATDC.aif", ",", "D4", "FF", "STAC.aif", ",", "D4FFNATDC.aif", ",", "D5", "FF", "STAC.aif", ",", "D5FFNATDC.aif", ",", "D6FFNATDC.aif", ",", "E4", "FF", "STAC.aif", ",", "E4FFNATDC.aif", ",", "E5", "FF", "STAC.aif", ",", "E5FFNATDC.aif", ",", "F#6FFNATD.aif", ",", "F3", "FF", "STAC.aif", ",", "F3FFNATDC.aif", ",", "F4", "FF", "STAC.aif", ",", "F4FFNATDC.aif", ",", "F5", "FF", "STAC.aif", ",", "F5FFNATDC.aif", ",", "F6FFNATDC.aif", ",", "G#1", "FF", "STAC.aif", ",", "G#1FFNATD.aif", ",", "G#2", "FF", "STAC.aif", ",", "G#2FFNATD.aif", ",", "G#3", "FF", "STAC.aif", ",", "G#3FFNATD.aif", ",", "G#4", "FF", "STAC.aif", ",", "G#4FFNATD.aif", ",", "G#5", "FF", "STAC.aif", ",", "G#5FFNATD.aif", ",", "G#7FFNATD.aif", ",", "G3", "FF", "STAC.aif", ",", "G3FFNATDC.aif", ",", "G5", "FF", "STAC.aif", ",", "G5FFNATDC.aif", ",", "A#3", "FF", "STAC.aif", ",", "A#3FFNATD.aif", ",", "A#4", "FF", "STAC.aif", ",", "A#4FFNATD.aif", ",", "A#5", "FF", "STAC.aif", ",", "A#5FFNATD.aif", ",", "A#7FFNATD.aif", ",", "A3", "FF", "STAC.aif", ",", "A3FFNATDC.aif", ",", "A5", "FF", "STAC.aif", ",", "A5FFNATDC.aif", ",", "A7FFNATDC.aif", ",", "B0FFNATDC.aif", ",", "B7FFNATDC.aif", ",", "C#5", "FF", "STAC.aif", ",", "C#5FFNATD.aif", ",", "C#6FFNATD.aif", ",", "C4", "FF", "STAC.aif", ",", "C4FFNATDC.aif", ",", "C5", "FF", "STAC.aif", ",", "C5FFNATDC.aif", ",", "C6", "FF", "STAC.aif", ",", "C6FFNATDC.aif", ",", "C7FFNATDC.aif", ",", "D#4", "FF", "STAC.aif", ",", "D#4FFNATD.aif", ",", "D#5", "FF", "STAC.aif", ",", "D#5FFNATD.aif", ",", "D#6FFNATD.aif", ",", "D1FFNATDC.aif", ",", "D2", "FF", "STAC.aif", ",", "D2FFNATDC.aif", ",", "D3", "FF", "STAC.aif", ",", "D3FFNATDC.aif", ",", "D4", "FF", "STAC.aif", ",", "D4FFNATDC.aif", ",", "D5", "FF", "STAC.aif", ",", "D5FFNATDC.aif", ",", "D6FFNATDC.aif", ",", "E4", "FF", "STAC.aif", ",", "E4FFNATDC.aif", ",", "E5", "FF", "STAC.aif", ",", "E5FFNATDC.aif", ",", "F#6FFNATD.aif", ",", "F3", "FF", "STAC.aif", ",", "F3FFNATDC.aif", ",", "F4", "FF", "STAC.aif", ",", "F4FFNATDC.aif", ",", "F5", "FF", "STAC.aif", ",", "F5FFNATDC.aif", ",", "F6FFNATDC.aif", ",", "G#1", "FF", "STAC.aif", ",", "G#1FFNATD.aif", ",", "G#2", "FF", "STAC.aif", ",", "G#2FFNATD.aif", ",", "G#3", "FF", "STAC.aif", ",", "G#3FFNATD.aif", ",", "G#4", "FF", "STAC.aif", ",", "G#4FFNATD.aif", ",", "G#5", "FF", "STAC.aif", ",", "G#5FFNATD.aif", ",", "G#7FFNATD.aif", ",", "G3", "FF", "STAC.aif", ",", "G3FFNATDC.aif", ",", "G5", "FF", "STAC.aif", ",", "G5FFNATDC.aif", ",", "Fxhits2", "Dub1", "R.wav", ",", "Kick", "2.aif", ",", "A#3FFNATD.aif", ",", "A#4FFNATD.aif", ",", "A#5FFNATD.aif", ",", "A#7FFNATD.aif", ",", "A3FFNATDC.aif", ",", "A5FFNATDC.aif", ",", "A7FFNATDC.aif", ",", "B0FFNATDC.aif", ",", "B7FFNATDC.aif", ",", "C#5FFNATD.aif", ",", "C#6FFNATD.aif", ",", "C4FFNATDC.aif", ",", "C5FFNATDC.aif", ",", "C6FFNATDC.aif", ",", "C7FFNATDC.aif", ",", "D#4FFNATD.aif", ",", "D#5FFNATD.aif", ",", "D#6FFNATD.aif", ",", "D1FFNATDC.aif", ",", "D2FFNATDC.aif", ",", "D3FFNATDC.aif", ",", "D4FFNATDC.aif", ",", "D5FFNATDC.aif", ",", "D6FFNATDC.aif", ",", "E4FFNATDC.aif", ",", "E5FFNATDC.aif", ",", "F#6FFNATD.aif", ",", "F3FFNATDC.aif", ",", "F4FFNATDC.aif", ",", "F5FFNATDC.aif", ",", "F6FFNATDC.aif", ",", "G#1FFNATD.aif", ",", "G#2FFNATD.aif", ",", "G#3FFNATD.aif", ",", "G#4FFNATD.aif", ",", "G#5FFNATD.aif", ",", "G#7FFNATD.aif", ",", "G3FFNATDC.aif", ",", "G5FFNATDC.aif", ",", "A#3FFNATD.aif", ",", "A#4FFNATD.aif", ",", "A#5FFNATD.aif", ",", "A#7FFNATD.aif", ",", "A3FFNATDC.aif", ",", "A5FFNATDC.aif", ",", "A7FFNATDC.aif", ",", "B0FFNATDC.aif", ",", "B7FFNATDC.aif", ",", "C#5FFNATD.aif", ",", "C#6FFNATD.aif", ",", "C4FFNATDC.aif", ",", "C5FFNATDC.aif", ",", "C6FFNATDC.aif", ",", "C7FFNATDC.aif", ",", "D#4FFNATD.aif", ",", "D#5FFNATD.aif", ",", "D#6FFNATD.aif", ",", "D1FFNATDC.aif", ",", "D2FFNATDC.aif", ",", "D3FFNATDC.aif", ",", "D4FFNATDC.aif", ",", "D5FFNATDC.aif", ",", "D6FFNATDC.aif", ",", "E4FFNATDC.aif", ",", "E5FFNATDC.aif", ",", "F#6FFNATD.aif", ",", "F3FFNATDC.aif", ",", "F4FFNATDC.aif", ",", "F5FFNATDC.aif", ",", "F6FFNATDC.aif", ",", "G#1FFNATD.aif", ",", "G#2FFNATD.aif", ",", "G#3FFNATD.aif", ",", "G#4FFNATD.aif", ",", "G#5FFNATD.aif", ",", "G#7FFNATD.aif", ",", "G3FFNATDC.aif", ",", "G5FFNATDC.aif", ",", "A#3FFNATD.aif", ",", "A#4FFNATD.aif", ",", "A#5FFNATD.aif", ",", "A#7FFNATD.aif", ",", "A3FFNATDC.aif", ",", "A5FFNATDC.aif", ",", "A7FFNATDC.aif", ",", "B0FFNATDC.aif", ",", "B7FFNATDC.aif", ",", "C#5FFNATD.aif", ",", "C#6FFNATD.aif", ",", "C4FFNATDC.aif", ",", "C5FFNATDC.aif", ",", "C6FFNATDC.aif", ",", "C7FFNATDC.aif", ",", "D#4FFNATD.aif", ",", "D#5FFNATD.aif", ",", "D#6FFNATD.aif", ",", "D1FFNATDC.aif", ",", "D2FFNATDC.aif", ",", "D3FFNATDC.aif", ",", "D4FFNATDC.aif", ",", "D5FFNATDC.aif", ",", "D6FFNATDC.aif", ",", "E4FFNATDC.aif", ",", "E5FFNATDC.aif", ",", "F#6FFNATD.aif", ",", "F3FFNATDC.aif", ",", "F4FFNATDC.aif", ",", "F5FFNATDC.aif", ",", "F6FFNATDC.aif", ",", "G#1FFNATD.aif", ",", "G#2FFNATD.aif", ",", "G#3FFNATD.aif", ",", "G#4FFNATD.aif", ",", "G#5FFNATD.aif", ",", "G#7FFNATD.aif", ",", "G3FFNATDC.aif", ",", "G5FFNATDC.aif", ",", "A#3", "FF", "STAC.aif", ",", "A#3FFNATD.aif", ",", "A#3MFNATD.aif", ",", "A#4", "FF", "STAC.aif", ",", "A#4FFNATD.aif", ",", "A#4MFNATD.aif", ",", "A#5", "FF", "STAC.aif", ",", "A#5FFNATD.aif", ",", "A#5MFNATD.aif", ",", "A#7", "FF", "STAC.aif", ",", "A#7FFNATD.aif", ",", "A3", "FF", "STAC.aif", ",", "A3FFNATDC.aif", ",", "A3MFNATDC.aif", ",", "A5", "FF", "STAC.aif", ",", "A5FFNATDC.aif", ",", "A5MFNATDC.aif", ",", "A7", "FF", "STAC.aif", ",", "A7FFNATDC.aif", ",", "B0FFNATDC.aif", ",", "B0MFNATDC.aif", ",", "B7", "FF", "STAC.aif", ",", "B7FFNATDC.aif", ",", "C#5", "FF", "STAC.aif", ",", "C#5FFNATD.aif", ",", "C#5MFNATD.aif", ",", "C#6", "FF", "STAC.aif", ",", "C#6FFNATD.aif", ",", "C4", "FF", "STAC.aif", ",", "C4FFNATDC.aif", ",", "C4MFNATDC.aif", ",", "C5", "FF", "STAC.aif", ",", "C5FFNATDC.aif", ",", "C5MFNATDC.aif", ",", "C6", "FF", "STAC.aif", ",", "C6FFNATDC.aif", ",", "C6MFNATDC.aif", ",", "C7", "FF", "STAC.aif", ",", "C7FFNATDC.aif", ",", "D#4", "FF", "STAC.aif", ",", "D#4FFNATD.aif", ",", "D#4MFNATD.aif", ",", "D#5", "FF", "STAC.aif", ",", "D#5FFNATD.aif", ",", "D#5MFNATD.aif", ",", "D#6", "FF", "STAC.aif", ",", "D#6FFNATD.aif", ",", "D1FFNATDC.aif", ",", "D1MFNATDC.aif", ",", "D2", "FF", "STAC.aif", ",", "D2FFNATDC.aif", ",", "D2MFNATDC.aif", ",", "D3", "FF", "STAC.aif", ",", "D3FFNATDC.aif", ",", "D3MFNATDC.aif", ",", "D4", "FF", "STAC.aif", ",", "D4FFNATDC.aif", ",", "D4MFNATDC.aif", ",", "D5", "FF", "STAC.aif", ",", "D5FFNATDC.aif", ",", "D5MFNATDC.aif", ",", "D6", "FF", "STAC.aif", ",", "D6FFNATDC.aif", ",", "E4", "FF", "STAC.aif", ",", "E4FFNATDC.aif", ",", "E4MFNATDC.aif", ",", "E5", "FF", "STAC.aif", ",", "E5FFNATDC.aif", ",", "E5MFNATDC.aif", ",", "F#6", "FF", "STAC.aif", ",", "F#6FFNATD.aif", ",", "F3", "FF", "STAC.aif", ",", "F3FFNATDC.aif", ",", "F3MFNATDC.aif", ",", "F4", "FF", "STAC.aif", ",", "F4FFNATDC.aif", ",", "F4MFNATDC.aif", ",", "F5", "FF", "STAC.aif", ",", "F5FFNATDC.aif", ",", "F5MFNATDC.aif", ",", "F6", "FF", "STAC.aif", ",", "F6FFNATDC.aif", ",", "G#1", "FF", "STAC.aif", ",", "G#1FFNATD.aif", ",", "G#1MFNATD.aif", ",", "G#2", "FF", "STAC.aif", ",", "G#2FFNATD.aif", ",", "G#2MFNATD.aif", ",", "G#3", "FF", "STAC.aif", ",", "G#3FFNATD.aif", ",", "G#3MFNATD.aif", ",", "G#4", "FF", "STAC.aif", ",", "G#4FFNATD.aif", ",", "G#4MFNATD.aif", ",", "G#5", "FF", "STAC.aif", ",", "G#5FFNATD.aif", ",", "G#5MFNATD.aif", ",", "G#7", "FF", "STAC.aif", ",", "G#7FFNATD.aif", ",", "G3", "FF", "STAC.aif", ",", "G3FFNATDC.aif", ",", "G3MFNATDC.aif", ",", "G5", "FF", "STAC.aif", ",", "G5FFNATDC.aif", ",", "G5MFNATDC.aif", ",", "Ride", "Cymbal", "Vintage1.wav", ",", "Ride", "Cymbal", "Vintage3.wav", ",", "Ride", "Cymbal", "Vintage5.wav", ",", "A#3FFSFTND.aif", ",", "A#3FFSFTST.aif", ",", "A#4FFSFTND.aif", ",", "A#4FFSFTST.aif", ",", "A#5FFSFTND.aif", ",", "A#5FFSFTST.aif", ",", "A#7FFSFTND.aif", ",", "A3FFSFTND.aif", ",", "A3FFSFTST.aif", ",", "A5FFSFTND.aif", ",", "A5FFSFTST.aif", ",", "A7FFSFTND.aif", ",", "B0FFSFTND.aif", ",", "B0FFSFTST.aif", ",", "B7FFSFTND.aif", ",", "C#5FFSFTND.aif", ",", "C#5FFSFTST.aif", ",", "C#6FFSFTND.aif", ",", "C#6FFSFTST.aif", ",", "C#7FFSFTND.aif", ",", "C#7FFSFTST.aif", ",", "C4FFSFTND.aif", ",", "C4FFSFTST.aif", ",", "C5FFSFTND.aif", ",", "C5FFSFTST.aif", ",", "C6FFSFTND.aif", ",", "C6FFSFTST.aif", ",", "D#1FFSFTST.aif", ",", "D#4FFSFTND.aif", ",", "D#4FFSFTST.aif", ",", "D#5FFSFTND.aif", ",", "D#5FFSFTST.aif", ",", "D#6FFSFTND.aif", ",", "D#6FFSFTST.aif", ",", "D1FFSFTND.aif", ",", "D2FFSFTND.aif", ",", "D2FFSFTST.aif", ",", "D3FFSFTND.aif", ",", "D3FFSFTST.aif", ",", "D4FFSFTND.aif", ",", "D4FFSFTST.aif", ",", "D5FFSFTND.aif", ",", "D5FFSFTST.aif", ",", "D6FFSFTND.aif", ",", "D6FFSFTST.aif", ",", "E4FFSFTND.aif", ",", "E4FFSFTST.aif", ",", "E5FFSFTND.aif", ",", "E5FFSFTST.aif", ",", "F#6FFSFTND.aif", ",", "F#6FFSFTST.aif", ",", "F3FFSFTND.aif", ",", "F3FFSFTST.aif", ",", "F4FFSFTND.aif", ",", "F4FFSFTST.aif", ",", "F5FFSFTND.aif", ",", "F5FFSFTST.aif", ",", "F6FFSFTND.aif", ",", "F6FFSFTST.aif", ",", "G#1FFSFTND.aif", ",", "G#1FFSFTST.aif", ",", "G#2FFSFTND.aif", ",", "G#2FFSFTST.aif", ",", "G#3FFSFTND.aif", ",", "G#3FFSFTST.aif", ",", "G#4FFSFTND.aif", ",", "G#4FFSFTST.aif", ",", "G#5FFSFTND.aif", ",", "G#5FFSFTST.aif", ",", "G#7FFSFTND.aif", ",", "G#7FFSFTST.aif", ",", "G3FFSFTND.aif", ",", "G3FFSFTST.aif", ",", "G5FFSFTND.aif", ",", "G5FFSFTST.aif", ",", "A#3FFSFTND.aif", ",", "A#3FFSFTST.aif", ",", "A#4FFSFTND.aif", ",", "A#4FFSFTST.aif", ",", "A#5FFSFTND.aif", ",", "A#5FFSFTST.aif", ",", "A#7FFSFTND.aif", ",", "A3FFSFTND.aif", ",", "A3FFSFTST.aif", ",", "A5FFSFTND.aif", ",", "A5FFSFTST.aif", ",", "A7FFSFTND.aif", ",", "B0FFSFTND.aif", ",", "B0FFSFTST.aif", ",", "B7FFSFTND.aif", ",", "C#5FFSFTND.aif", ",", "C#5FFSFTST.aif", ",", "C#6FFSFTND.aif", ",", "C#6FFSFTST.aif", ",", "C#7FFSFTND.aif", ",", "C4FFSFTND.aif", ",", "C4FFSFTST.aif", ",", "C5FFSFTND.aif", ",", "C5FFSFTST.aif", ",", "C6FFSFTND.aif", ",", "C6FFSFTST.aif", ",", "D#1FFSFTST.aif", ",", "D#4FFSFTND.aif", ",", "D#4FFSFTST.aif", ",", "D#5FFSFTND.aif", ",", "D#5FFSFTST.aif", ",", "D#6FFSFTND.aif", ",", "D#6FFSFTST.aif", ",", "D1FFSFTND.aif", ",", "D2FFSFTND.aif", ",", "D2FFSFTST.aif", ",", "D3FFSFTND.aif", ",", "D3FFSFTST.aif", ",", "D4FFSFTND.aif", ",", "D4FFSFTST.aif", ",", "D5FFSFTND.aif", ",", "D5FFSFTST.aif", ",", "D6FFSFTND.aif", ",", "D6FFSFTST.aif", ",", "E4FFSFTND.aif", ",", "E4FFSFTST.aif", ",", "E5FFSFTND.aif", ",", "E5FFSFTST.aif", ",", "F#6FFSFTND.aif", ",", "F3FFSFTND.aif", ",", "F3FFSFTST.aif", ",", "F4FFSFTND.aif", ",", "F4FFSFTST.aif", ",", "F5FFSFTND.aif", ",", "F5FFSFTST.aif", ",", "F6FFSFTND.aif", ",", "F6FFSFTST.aif", ",", "G#1FFSFTND.aif", ",", "G#1FFSFTST.aif", ",", "G#2FFSFTND.aif", ",", "G#2FFSFTST.aif", ",", "G#3FFSFTND.aif", ",", "G#3FFSFTST.aif", ",", "G#4FFSFTND.aif", ",", "G#4FFSFTST.aif", ",", "G#5FFSFTND.aif", ",", "G#5FFSFTST.aif", ",", "G#7FFSFTND.aif", ",", "G3FFSFTND.aif", ",", "G3FFSFTST.aif", ",", "G5FFSFTND.aif", ",", "G5FFSFTST.aif", ",", "A#3FFSFTND.aif", ",", "A#4FFSFTND.aif", ",", "A#5FFSFTND.aif", ",", "A#7FFSFTND.aif", ",", "A3FFSFTND.aif", ",", "A5FFSFTND.aif", ",", "A7FFSFTND.aif", ",", "B0FFSFTND.aif", ",", "B7FFSFTND.aif", ",", "C#5FFSFTND.aif", ",", "C#6FFSFTND.aif", ",", "C#7FFSFTND.aif", ",", "C4FFSFTND.aif", ",", "C5FFSFTND.aif", ",", "C6FFSFTND.aif", ",", "D#4FFSFTND.aif", ",", "D#5FFSFTND.aif", ",", "D#6FFSFTND.aif", ",", "D1FFSFTND.aif", ",", "D2FFSFTND.aif", ",", "D3FFSFTND.aif", ",", "D4FFSFTND.aif", ",", "D5FFSFTND.aif", ",", "D6FFSFTND.aif", ",", "E4FFSFTND.aif", ",", "E5FFSFTND.aif", ",", "F#6FFSFTND.aif", ",", "F3FFSFTND.aif", ",", "F4FFSFTND.aif", ",", "F5FFSFTND.aif", ",", "F6FFSFTND.aif", ",", "G#1FFSFTND.aif", ",", "G#2FFSFTND.aif", ",", "G#3FFSFTND.aif", ",", "G#4FFSFTND.aif", ",", "G#5FFSFTND.aif", ",", "G#7FFSFTND.aif", ",", "G3FFSFTND.aif", ",", "G5FFSFTND.aif", ",", "A#3FFSFTND.aif", ",", "A#4FFSFTND.aif", ",", "A#5FFSFTND.aif", ",", "A#7FFSFTND.aif", ",", "A3FFSFTND.aif", ",", "A5FFSFTND.aif", ",", "A7FFSFTND.aif", ",", "B0FFSFTND.aif", ",", "B7FFSFTND.aif", ",", "C#5FFSFTND.aif", ",", "C#6FFSFTND.aif", ",", "C#7FFSFTND.aif", ",", "C4FFSFTND.aif", ",", "C5FFSFTND.aif", ",", "C6FFSFTND.aif", ",", "D#4FFSFTND.aif", ",", "D#5FFSFTND.aif", ",", "D#6FFSFTND.aif", ",", "D1FFSFTND.aif", ",", "D2FFSFTND.aif", ",", "D3FFSFTND.aif", ",", "D4FFSFTND.aif", ",", "D5FFSFTND.aif", ",", "D6FFSFTND.aif", ",", "E4FFSFTND.aif", ",", "E5FFSFTND.aif", ",", "F#6FFSFTND.aif", ",", "F3FFSFTND.aif", ",", "F4FFSFTND.aif", ",", "F5FFSFTND.aif", ",", "F6FFSFTND.aif", ",", "G#1FFSFTND.aif", ",", "G#2FFSFTND.aif", ",", "G#3FFSFTND.aif", ",", "G#4FFSFTND.aif", ",", "G#5FFSFTND.aif", ",", "G#7FFSFTND.aif", ",", "G3FFSFTND.aif", ",", "G5FFSFTND.aif", ",", "A#3FFSFTND.aif", ",", "A#4FFSFTND.aif", ",", "A#5FFSFTND.aif", ",", "A#7FFSFTND.aif", ",", "A3FFSFTND.aif", ",", "A5FFSFTND.aif", ",", "A7FFSFTND.aif", ",", "B0FFSFTND.aif", ",", "B7FFSFTND.aif", ",", "C#5FFSFTND.aif", ",", "C#6FFSFTND.aif", ",", "C#7FFSFTND.aif", ",", "C4FFSFTND.aif", ",", "C5FFSFTND.aif", ",", "C6FFSFTND.aif", ",", "D#4FFSFTND.aif", ",", "D#5FFSFTND.aif", ",", "D#6FFSFTND.aif", ",", "D1FFSFTND.aif", ",", "D2FFSFTND.aif", ",", "D3FFSFTND.aif", ",", "D4FFSFTND.aif", ",", "D5FFSFTND.aif", ",", "D6FFSFTND.aif", ",", "E4FFSFTND.aif", ",", "E5FFSFTND.aif", ",", "F#6FFSFTND.aif", ",", "F3FFSFTND.aif", ",", "F4FFSFTND.aif", ",", "F5FFSFTND.aif", ",", "F6FFSFTND.aif", ",", "G#1FFSFTND.aif", ",", "G#2FFSFTND.aif", ",", "G#3FFSFTND.aif", ",", "G#4FFSFTND.aif", ",", "G#5FFSFTND.aif", ",", "G#7FFSFTND.aif", ",", "G3FFSFTND.aif", ",", "G5FFSFTND.aif", ",", "A#3FFSFTND.aif", ",", "A#3FFSFTST.aif", ",", "A#3MFSFTND.aif", ",", "A#4FFSFTND.aif", ",", "A#4FFSFTST.aif", ",", "A#4MFSFTND.aif", ",", "A#5FFSFTND.aif", ",", "A#5FFSFTST.aif", ",", "A#5MFSFTND.aif", ",", "A#7FFSFTND.aif", ",", "A#7FFSFTST.aif", ",", "A3FFSFTND.aif", ",", "A3FFSFTST.aif", ",", "A3MFSFTND.aif", ",", "A5FFSFTND.aif", ",", "A5FFSFTST.aif", ",", "A5MFSFTND.aif", ",", "A7FFSFTND.aif", ",", "A7FFSFTST.aif", ",", "B0FFSFTND.aif", ",", "B0FFSFTST.aif", ",", "B0MFSFTND.aif", ",", "B7FFSFTND.aif", ",", "B7FFSFTST.aif", ",", "C#5FFSFTND.aif", ",", "C#5FFSFTST.aif", ",", "C#5MFSFTND.aif", ",", "C#6FFSFTND.aif", ",", "C#6FFSFTST.aif", ",", "C#6MFSFTND.aif", ",", "C#7FFSFTND.aif", ",", "C#7FFSFTST.aif", ",", "C4FFSFTND.aif", ",", "C4FFSFTST.aif", ",", "C4MFSFTND.aif", ",", "C5FFSFTND.aif", ",", "C5FFSFTST.aif", ",", "C5MFSFTND.aif", ",", "C6FFSFTND.aif", ",", "C6FFSFTST.aif", ",", "C6MFSFTND.aif", ",", "D#1FFSFTST.aif", ",", "D#4FFSFTND.aif", ",", "D#4FFSFTST.aif", ",", "D#4MFSFTND.aif", ",", "D#5FFSFTND.aif", ",", "D#5FFSFTST.aif", ",", "D#5MFSFTND.aif", ",", "D#6FFSFTND.aif", ",", "D#6FFSFTST.aif", ",", "D1FFSFTND.aif", ",", "D1MFSFTND.aif", ",", "D2FFSFTND.aif", ",", "D2FFSFTST.aif", ",", "D2MFSFTND.aif", ",", "D3FFSFTND.aif", ",", "D3FFSFTST.aif", ",", "D3MFSFTND.aif", ",", "D4FFSFTND.aif", ",", "D4FFSFTST.aif", ",", "D4MFSFTND.aif", ",", "D5FFSFTND.aif", ",", "D5FFSFTST.aif", ",", "D5MFSFTND.aif", ",", "D6FFSFTND.aif", ",", "D6FFSFTST.aif", ",", "E4FFSFTND.aif", ",", "E4FFSFTST.aif", ",", "E4MFSFTND.aif", ",", "E5FFSFTND.aif", ",", "E5FFSFTST.aif", ",", "E5MFSFTND.aif", ",", "F#6FFSFTND.aif", ",", "F#6FFSFTST.aif", ",", "F3FFSFTND.aif", ",", "F3FFSFTST.aif", ",", "F3MFSFTND.aif", ",", "F4FFSFTND.aif", ",", "F4FFSFTST.aif", ",", "F4MFSFTND.aif", ",", "F5FFSFTND.aif", ",", "F5FFSFTST.aif", ",", "F5MFSFTND.aif", ",", "F6FFSFTND.aif", ",", "F6FFSFTST.aif", ",", "G#1FFSFTND.aif", ",", "G#1FFSFTST.aif", ",", "G#1MFSFTND.aif", ",", "G#2FFSFTND.aif", ",", "G#2FFSFTST.aif", ",", "G#2MFSFTND.aif", ",", "G#3FFSFTND.aif", ",", "G#3FFSFTST.aif", ",", "G#3MFSFTND.aif", ",", "G#4FFSFTND.aif", ",", "G#4FFSFTST.aif", ",", "G#4MFSFTND.aif", ",", "G#5FFSFTND.aif", ",", "G#5FFSFTST.aif", ",", "G#5MFSFTND.aif", ",", "G#7FFSFTND.aif", ",", "G#7FFSFTST.aif", ",", "G3FFSFTND.aif", ",", "G3FFSFTST.aif", ",", "G3MFSFTND.aif", ",", "G5FFSFTND.aif", ",", "G5FFSFTST.aif", ",", "G5MFSFTND.aif", ",", "A#3FFSFTND.aif", ",", "A#4FFSFTND.aif", ",", "A#5FFSFTND.aif", ",", "A#7FFSFTND.aif", ",", "A3FFSFTND.aif", ",", "A5FFSFTND.aif", ",", "A7FFSFTND.aif", ",", "B0FFSFTND.aif", ",", "B7FFSFTND.aif", ",", "C#5FFSFTND.aif", ",", "C#6FFSFTND.aif", ",", "C#7FFSFTND.aif", ",", "C4FFSFTND.aif", ",", "C5FFSFTND.aif", ",", "C6FFSFTND.aif", ",", "D#4FFSFTND.aif", ",", "D#5FFSFTND.aif", ",", "D#6FFSFTND.aif", ",", "D1FFSFTND.aif", ",", "D2FFSFTND.aif", ",", "D3FFSFTND.aif", ",", "D4FFSFTND.aif", ",", "D5FFSFTND.aif", ",", "D6FFSFTND.aif", ",", "E4FFSFTND.aif", ",", "E5FFSFTND.aif", ",", "F#6FFSFTND.aif", ",", "F3FFSFTND.aif", ",", "F4FFSFTND.aif", ",", "F5FFSFTND.aif", ",", "F6FFSFTND.aif", ",", "G#1FFSFTND.aif", ",", "G#2FFSFTND.aif", ",", "G#3FFSFTND.aif", ",", "G#4FFSFTND.aif", ",", "G#5FFSFTND.aif", ",", "G#7FFSFTND.aif", ",", "G3FFSFTND.aif", ",", "G5FFSFTND.aif", ",", "A#3FFSFTND.aif", ",", "A#4FFSFTND.aif", ",", "A#5FFSFTND.aif", ",", "A#7FFSFTND.aif", ",", "A3FFSFTND.aif", ",", "A5FFSFTND.aif", ",", "A7FFSFTND.aif", ",", "B0FFSFTND.aif", ",", "B7FFSFTND.aif", ",", "C#5FFSFTND.aif", ",", "C#6FFSFTND.aif", ",", "C#7FFSFTND.aif", ",", "C4FFSFTND.aif", ",", "C5FFSFTND.aif", ",", "C6FFSFTND.aif", ",", "D#4FFSFTND.aif", ",", "D#5FFSFTND.aif", ",", "D#6FFSFTND.aif", ",", "D1FFSFTND.aif", ",", "D2FFSFTND.aif", ",", "D3FFSFTND.aif", ",", "D4FFSFTND.aif", ",", "D5FFSFTND.aif", ",", "D6FFSFTND.aif", ",", "E4FFSFTND.aif", ",", "E5FFSFTND.aif", ",", "F#6FFSFTND.aif", ",", "F3FFSFTND.aif", ",", "F4FFSFTND.aif", ",", "F5FFSFTND.aif", ",", "F6FFSFTND.aif", ",", "G#1FFSFTND.aif", ",", "G#2FFSFTND.aif", ",", "G#3FFSFTND.aif", ",", "G#4FFSFTND.aif", ",", "G#5FFSFTND.aif", ",", "G#7FFSFTND.aif", ",", "G3FFSFTND.aif", ",", "G5FFSFTND.aif", ",", "A#3FFSFTND.aif", ",", "A#4FFSFTND.aif", ",", "A#5FFSFTND.aif", ",", "A#7FFSFTND.aif", ",", "A3FFSFTND.aif", ",", "A5FFSFTND.aif", ",", "A7FFSFTND.aif", ",", "B0FFSFTND.aif", ",", "B7FFSFTND.aif", ",", "C#5FFSFTND.aif", ",", "C#6FFSFTND.aif", ",", "C#7FFSFTND.aif", ",", "C4FFSFTND.aif", ",", "C5FFSFTND.aif", ",", "C6FFSFTND.aif", ",", "D#4FFSFTND.aif", ",", "D#5FFSFTND.aif", ",", "D#6FFSFTND.aif", ",", "D1FFSFTND.aif", ",", "D2FFSFTND.aif", ",", "D3FFSFTND.aif", ",", "D4FFSFTND.aif", ",", "D5FFSFTND.aif", ",", "D6FFSFTND.aif", ",", "E4FFSFTND.aif", ",", "E5FFSFTND.aif", ",", "F#6FFSFTND.aif", ",", "F3FFSFTND.aif", ",", "F4FFSFTND.aif", ",", "F5FFSFTND.aif", ",", "F6FFSFTND.aif", ",", "G#1FFSFTND.aif", ",", "G#2FFSFTND.aif", ",", "G#3FFSFTND.aif", ",", "G#4FFSFTND.aif", ",", "G#5FFSFTND.aif", ",", "G#7FFSFTND.aif", ",", "G3FFSFTND.aif", ",", "G5FFSFTND.aif", ",", "A#3FFSFTND.aif", ",", "A#3FFSFTST.aif", ",", "A#3MFSFTND.aif", ",", "A#4FFSFTND.aif", ",", "A#4FFSFTST.aif", ",", "A#4MFSFTND.aif", ",", "A#5FFSFTND.aif", ",", "A#5FFSFTST.aif", ",", "A#5MFSFTND.aif", ",", "A#7FFSFTND.aif", ",", "A#7FFSFTST.aif", ",", "A#7MFSFTND.aif", ",", "A3FFSFTND.aif", ",", "A3FFSFTST.aif", ",", "A3MFSFTND.aif", ",", "A5FFSFTND.aif", ",", "A5FFSFTST.aif", ",", "A5MFSFTND.aif", ",", "A7FFSFTND.aif", ",", "A7FFSFTST.aif", ",", "A7MFSFTND.aif", ",", "B0FFSFTND.aif", ",", "B0FFSFTST.aif", ",", "B0MFSFTND.aif", ",", "B7FFSFTND.aif", ",", "B7FFSFTST.aif", ",", "B7MFSFTND.aif", ",", "C#5FFSFTND.aif", ",", "C#5FFSFTST.aif", ",", "C#5MFSFTND.aif", ",", "C#6FFSFTND.aif", ",", "C#6FFSFTST.aif", ",", "C#6MFSFTND.aif", ",", "C#7FFSFTND.aif", ",", "C#7FFSFTST.aif", ",", "C#7MFSFTND.aif", ",", "C4FFSFTND.aif", ",", "C4FFSFTST.aif", ",", "C4MFSFTND.aif", ",", "C5FFSFTND.aif", ",", "C5FFSFTST.aif", ",", "C5MFSFTND.aif", ",", "C6FFSFTND.aif", ",", "C6FFSFTST.aif", ",", "C6MFSFTND.aif", ",", "D#1FFSFTST.aif", ",", "D#4FFSFTND.aif", ",", "D#4FFSFTST.aif", ",", "D#4MFSFTND.aif", ",", "D#5FFSFTND.aif", ",", "D#5FFSFTST.aif", ",", "D#5MFSFTND.aif", ",", "D#6FFSFTND.aif", ",", "D#6FFSFTST.aif", ",", "D#6MFSFTND.aif", ",", "D1FFSFTND.aif", ",", "D1MFSFTND.aif", ",", "D2FFSFTND.aif", ",", "D2FFSFTST.aif", ",", "D2MFSFTND.aif", ",", "D3FFSFTND.aif", ",", "D3FFSFTST.aif", ",", "D3MFSFTND.aif", ",", "D4FFSFTND.aif", ",", "D4FFSFTST.aif", ",", "D4MFSFTND.aif", ",", "D5FFSFTND.aif", ",", "D5FFSFTST.aif", ",", "D5MFSFTND.aif", ",", "D6FFSFTND.aif", ",", "D6FFSFTST.aif", ",", "D6MFSFTND.aif", ",", "E4FFSFTND.aif", ",", "E4FFSFTST.aif", ",", "E4MFSFTND.aif", ",", "E5FFSFTND.aif", ",", "E5FFSFTST.aif", ",", "E5MFSFTND.aif", ",", "F#6FFSFTND.aif", ",", "F#6FFSFTST.aif", ",", "F#6MFSFTND.aif", ",", "F3FFSFTND.aif", ",", "F3FFSFTST.aif", ",", "F3MFSFTND.aif", ",", "F4FFSFTND.aif", ",", "F4FFSFTST.aif", ",", "F4MFSFTND.aif", ",", "F5FFSFTND.aif", ",", "F5FFSFTST.aif", ",", "F5MFSFTND.aif", ",", "F6FFSFTND.aif", ",", "F6FFSFTST.aif", ",", "F6MFSFTND.aif", ",", "G#1FFSFTND.aif", ",", "G#1FFSFTST.aif", ",", "G#1MFSFTND.aif", ",", "G#2FFSFTND.aif", ",", "G#2FFSFTST.aif", ",", "G#2MFSFTND.aif", ",", "G#3FFSFTND.aif", ",", "G#3FFSFTST.aif", ",", "G#3MFSFTND.aif", ",", "G#4FFSFTND.aif", ",", "G#4FFSFTST.aif", ",", "G#4MFSFTND.aif", ",", "G#5FFSFTND.aif", ",", "G#5FFSFTST.aif", ",", "G#5MFSFTND.aif", ",", "G#7FFSFTND.aif", ",", "G#7FFSFTST.aif", ",", "G#7MFSFTND.aif", ",", "G3FFSFTND.aif", ",", "G3FFSFTST.aif", ",", "G3MFSFTND.aif", ",", "G5FFSFTND.aif", ",", "G5FFSFTST.aif", ",", "G5MFSFTND.aif", ",", "A#3FFNATD.aif", ",", "A#4FFNATD.aif", ",", "A#5FFNATD.aif", ",", "A3FFNATDC.aif", ",", "A5FFNATDC.aif", ",", "A7FFNATDC.aif", ",", "B0FFNATDC.aif", ",", "C#5FFNATD.aif", ",", "C#6FFNATD.aif", ",", "C4FFNATDC.aif", ",", "C5FFNATDC.aif", ",", "C6FFNATDC.aif", ",", "C7FFNATDC.aif", ",", "D#4FFNATD.aif", ",", "D#5FFNATD.aif", ",", "D#6FFNATD.aif", ",", "D1FFNATDC.aif", ",", "D2FFNATDC.aif", ",", "D3FFNATDC.aif", ",", "D4FFNATDC.aif", ",", "D5FFNATDC.aif", ",", "D6FFNATDC.aif", ",", "E4FFNATDC.aif", ",", "E5FFNATDC.aif", ",", "F#6FFNATD.aif", ",", "F3FFNATDC.aif", ",", "F4FFNATDC.aif", ",", "F5FFNATDC.aif", ",", "F6FFNATDC.aif", ",", "G#1FFNATD.aif", ",", "G#2FFNATD.aif", ",", "G#3FFNATD.aif", ",", "G#4FFNATD.aif", ",", "G#5FFNATD.aif", ",", "G#7FFNATD.aif", ",", "G3FFNATDC.aif", ",", "G5FFNATDC.aif", ",", "A#3FFNATD.aif", ",", "A#4FFNATD.aif", ",", "A#5FFNATD.aif", ",", "A3FFNATDC.aif", ",", "A5FFNATDC.aif", ",", "A7FFNATDC.aif", ",", "B0FFNATDC.aif", ",", "C#5FFNATD.aif", ",", "C#6FFNATD.aif", ",", "C4FFNATDC.aif", ",", "C5FFNATDC.aif", ",", "C6FFNATDC.aif", ",", "C7FFNATDC.aif", ",", "D#4FFNATD.aif", ",", "D#5FFNATD.aif", ",", "D#6FFNATD.aif", ",", "D1FFNATDC.aif", ",", "D2FFNATDC.aif", ",", "D3FFNATDC.aif", ",", "D4FFNATDC.aif", ",", "D5FFNATDC.aif", ",", "D6FFNATDC.aif", ",", "E4FFNATDC.aif", ",", "E5FFNATDC.aif", ",", "F#6FFNATD.aif", ",", "F3FFNATDC.aif", ",", "F4FFNATDC.aif", ",", "F5FFNATDC.aif", ",", "F6FFNATDC.aif", ",", "G#1FFNATD.aif", ",", "G#2FFNATD.aif", ",", "G#3FFNATD.aif", ",", "G#4FFNATD.aif", ",", "G#5FFNATD.aif", ",", "G#7FFNATD.aif", ",", "G3FFNATDC.aif", ",", "G5FFNATDC.aif", ",", "A#3FFNATD.aif", ",", "A#4FFNATD.aif", ",", "A#5FFNATD.aif", ",", "A3FFNATDC.aif", ",", "A5FFNATDC.aif", ",", "A7FFNATDC.aif", ",", "B0FFNATDC.aif", ",", "C#5FFNATD.aif", ",", "C#6FFNATD.aif", ",", "C4FFNATDC.aif", ",", "C5FFNATDC.aif", ",", "C6FFNATDC.aif", ",", "C7FFNATDC.aif", ",", "D#4FFNATD.aif", ",", "D#5FFNATD.aif", ",", "D#6FFNATD.aif", ",", "D1FFNATDC.aif", ",", "D2FFNATDC.aif", ",", "D3FFNATDC.aif", ",", "D4FFNATDC.aif", ",", "D5FFNATDC.aif", ",", "D6FFNATDC.aif", ",", "E4FFNATDC.aif", ",", "E5FFNATDC.aif", ",", "F#6FFNATD.aif", ",", "F3FFNATDC.aif", ",", "F4FFNATDC.aif", ",", "F5FFNATDC.aif", ",", "F6FFNATDC.aif", ",", "G#1FFNATD.aif", ",", "G#2FFNATD.aif", ",", "G#3FFNATD.aif", ",", "G#4FFNATD.aif", ",", "G#5FFNATD.aif", ",", "G#7FFNATD.aif", ",", "G3FFNATDC.aif", ",", "G5FFNATDC.aif", ",", "A#3", "FF", "STAC.aif", ",", "A#3FFNATD.aif", ",", "A#3MFNATD.aif", ",", "A#4", "FF", "STAC.aif", ",", "A#4FFNATD.aif", ",", "A#4MFNATD.aif", ",", "A#5", "FF", "STAC.aif", ",", "A#5FFNATD.aif", ",", "A#5MFNATD.aif", ",", "A#7", "FF", "STAC.aif", ",", "A#7FFNATD.aif", ",", "A3", "FF", "STAC.aif", ",", "A3FFNATDC.aif", ",", "A3MFNATDC.aif", ",", "A5", "FF", "STAC.aif", ",", "A5FFNATDC.aif", ",", "A5MFNATDC.aif", ",", "A7", "FF", "STAC.aif", ",", "A7FFNATDC.aif", ",", "B0FFNATDC.aif", ",", "B0MFNATDC.aif", ",", "B7", "FF", "STAC.aif", ",", "B7FFNATDC.aif", ",", "C#5", "FF", "STAC.aif", ",", "C#5FFNATD.aif", ",", "C#5MFNATD.aif", ",", "C#6", "FF", "STAC.aif", ",", "C#6FFNATD.aif", ",", "C#6MFNATD.aif", ",", "C4", "FF", "STAC.aif", ",", "C4FFNATDC.aif", ",", "C4MFNATDC.aif", ",", "C5", "FF", "STAC.aif", ",", "C5FFNATDC.aif", ",", "C5MFNATDC.aif", ",", "C6", "FF", "STAC.aif", ",", "C6FFNATDC.aif", ",", "C6MFNATDC.aif", ",", "C7", "FF", "STAC.aif", ",", "C7FFNATDC.aif", ",", "C7MFNATDC.aif", ",", "D#4", "FF", "STAC.aif", ",", "D#4FFNATD.aif", ",", "D#4MFNATD.aif", ",", "D#5", "FF", "STAC.aif", ",", "D#5FFNATD.aif", ",", "D#5MFNATD.aif", ",", "D#6", "FF", "STAC.aif", ",", "D#6FFNATD.aif", ",", "D#6MFNATD.aif", ",", "D1FFNATDC.aif", ",", "D1MFNATDC.aif", ",", "D2", "FF", "STAC.aif", ",", "D2FFNATDC.aif", ",", "D2MFNATDC.aif", ",", "D3", "FF", "STAC.aif", ",", "D3FFNATDC.aif", ",", "D3MFNATDC.aif", ",", "D4", "FF", "STAC.aif", ",", "D4FFNATDC.aif", ",", "D4MFNATDC.aif", ",", "D5", "FF", "STAC.aif", ",", "D5FFNATDC.aif", ",", "D5MFNATDC.aif", ",", "D6", "FF", "STAC.aif", ",", "D6FFNATDC.aif", ",", "D6MFNATDC.aif", ",", "E4", "FF", "STAC.aif", ",", "E4FFNATDC.aif", ",", "E4MFNATDC.aif", ",", "E5", "FF", "STAC.aif", ",", "E5FFNATDC.aif", ",", "E5MFNATDC.aif", ",", "F#6", "FF", "STAC.aif", ",", "F#6FFNATD.aif", ",", "F#6MFNATD.aif", ",", "F3", "FF", "STAC.aif", ",", "F3FFNATDC.aif", ",", "F3MFNATDC.aif", ",", "F4", "FF", "STAC.aif", ",", "F4FFNATDC.aif", ",", "F4MFNATDC.aif", ",", "F5", "FF", "STAC.aif", ",", "F5FFNATDC.aif", ",", "F5MFNATDC.aif", ",", "F6", "FF", "STAC.aif", ",", "F6FFNATDC.aif", ",", "F6MFNATDC.aif", ",", "G#1", "FF", "STAC.aif", ",", "G#1FFNATD.aif", ",", "G#1MFNATD.aif", ",", "G#2", "FF", "STAC.aif", ",", "G#2FFNATD.aif", ",", "G#2MFNATD.aif", ",", "G#3", "FF", "STAC.aif", ",", "G#3FFNATD.aif", ",", "G#3MFNATD.aif", ",", "G#4", "FF", "STAC.aif", ",", "G#4FFNATD.aif", ",", "G#4MFNATD.aif", ",", "G#5", "FF", "STAC.aif", ",", "G#5FFNATD.aif", ",", "G#5MFNATD.aif", ",", "G#7", "FF", "STAC.aif", ",", "G#7FFNATD.aif", ",", "G3", "FF", "STAC.aif", ",", "G3FFNATDC.aif", ",", "G3MFNATDC.aif", ",", "G5", "FF", "STAC.aif", ",", "G5FFNATDC.aif", ",", "G5MFNATDC.aif", ",", "Sd2_Abstract.wav", ",", "Snare", "Drum", "NYHouze2.wav", ",", "Snare", "Velo3RH", "Vintage.wav", ",", "Snare", "Velo6RH", "Vintage.wav", ",", "Snare", "Velo9RH", "Vintage.wav", ",", "Snare1.wav", ",", "Snare9.wav", ",", "Spit", "Up", "Snare.aif", ",", "Sticky", "Snare.aif", ",", "Stinkee", "Cant", "Spell", "Snare.aif", ",", "Stomach", "Jazz", "Snare.aif", ",", "Stop", "Snare.aif", ",", "Suck", "Snare.aif", ",", "Tang", "Snare.aif", ",", "Tell", "The", "Machine", "Snare.aif", ",", "The", "Classic", "Snare.aif", ",", "Tight", "and", "Light", "Snare.aif", ",", "Wack", "Clap.aif", ",", "displace.wav", ",", "elk", "sub", "base.wav", ",", "12_beep_C.aif", ",", "Bd_Lantern.wav", ",", "Glitch", "BSOD.aif", ",", "Glitch", "Flyby.aif", ",", "Glitch", "Friction.aif", ",", "Glitch", "Shock.aif", ",", "Glitch", "Trip.aif", ",", "Halo.wav", ",", "Lowpass", "Kick.wav", ",", "Rim_GiantStep.wav" ],
					"maxclass" : "chooser",
					"multiselect" : 0,
					"numinlets" : 1,
					"numoutlets" : 6,
					"outlettype" : [ "", "", "", "", "", "" ],
					"parameter_enable" : 0,
					"parameter_mappable" : 0,
					"patching_rect" : [ 606.0, 66.0, 343.0, 281.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 398.5, 3.5, 190.0, 454.0 ],
					"selectedclick" : 1,
					"textjustification" : 0,
					"varname" : "filechooser"
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
					"destination" : [ "obj-13", 0 ],
					"source" : [ "obj-10", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
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
					"midpoints" : [ 1002.700000000000045, 466.5, 615.5, 466.5 ],
					"source" : [ "obj-13", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-21", 0 ],
					"source" : [ "obj-14", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-31", 0 ],
					"source" : [ "obj-15", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"midpoints" : [ 744.899999999999977, 465.0, 615.5, 465.0 ],
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
					"destination" : [ "obj-11", 0 ],
					"source" : [ "obj-18", 0 ]
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
					"destination" : [ "obj-34", 0 ],
					"midpoints" : [ 327.0, 59.0, 326.5, 59.0 ],
					"source" : [ "obj-21", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-35", 0 ],
					"midpoints" : [ 95.5, 59.0, 95.5, 59.0 ],
					"source" : [ "obj-21", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-29", 0 ],
					"midpoints" : [ 410.5, 466.0, 410.5, 466.0 ],
					"source" : [ "obj-23", 0 ]
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
					"destination" : [ "obj-33", 0 ],
					"source" : [ "obj-27", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-32", 0 ],
					"source" : [ "obj-28", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"midpoints" : [ 410.5, 691.5, 615.5, 691.5 ],
					"source" : [ "obj-29", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-17", 1 ],
					"source" : [ "obj-3", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-17", 0 ],
					"source" : [ "obj-3", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-18", 1 ],
					"source" : [ "obj-3", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-18", 0 ],
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
					"destination" : [ "obj-3", 0 ],
					"midpoints" : [ 670.5, 57.5, 615.5, 57.5 ],
					"source" : [ "obj-31", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"midpoints" : [ 95.5, 691.5, 615.5, 691.5 ],
					"source" : [ "obj-32", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"midpoints" : [ 326.5, 691.5, 615.5, 691.5 ],
					"source" : [ "obj-33", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-23", 1 ],
					"source" : [ "obj-34", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-23", 0 ],
					"source" : [ "obj-34", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-27", 1 ],
					"source" : [ "obj-34", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-27", 0 ],
					"source" : [ "obj-34", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-28", 1 ],
					"source" : [ "obj-35", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-28", 0 ],
					"source" : [ "obj-35", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-60", 1 ],
					"source" : [ "obj-35", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-60", 0 ],
					"source" : [ "obj-35", 2 ]
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
					"midpoints" : [ 1168.499908000000005, 634.5, 615.5, 634.5 ],
					"source" : [ "obj-47", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-35", 0 ],
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
					"destination" : [ "obj-10", 0 ],
					"midpoints" : [ 197.5, 573.0, 585.5, 573.0, 585.5, 55.0, 973.5, 55.0 ],
					"order" : 0,
					"source" : [ "obj-54", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"color" : [ 0.769209325313568, 0.76918637752533, 0.769199430942535, 0.146074054621849 ],
					"destination" : [ "obj-12", 0 ],
					"midpoints" : [ 197.5, 601.0, 651.5, 601.0 ],
					"order" : 4,
					"source" : [ "obj-54", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"color" : [ 0.769209325313568, 0.76918637752533, 0.769199430942535, 0.146074054621849 ],
					"destination" : [ "obj-19", 0 ],
					"midpoints" : [ 197.5, 613.0, 651.5, 613.0 ],
					"order" : 3,
					"source" : [ "obj-54", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"color" : [ 0.769209325313568, 0.76918637752533, 0.769199430942535, 0.146074054621849 ],
					"destination" : [ "obj-22", 0 ],
					"midpoints" : [ 197.5, 573.0, 424.5, 573.0, 424.5, 471.0, 651.5, 471.0 ],
					"order" : 5,
					"source" : [ "obj-54", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"color" : [ 0.769209325313568, 0.76918637752533, 0.769199430942535, 0.146074054621849 ],
					"destination" : [ "obj-3", 0 ],
					"midpoints" : [ 197.5, 573.0, 406.5, 573.0, 406.5, 55.0, 615.5, 55.0 ],
					"order" : 6,
					"source" : [ "obj-54", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"color" : [ 0.769209325313568, 0.76918637752533, 0.769199430942535, 0.146074054621849 ],
					"destination" : [ "obj-34", 0 ],
					"midpoints" : [ 197.5, 573.0, 262.0, 573.0, 262.0, 59.0, 326.5, 59.0 ],
					"order" : 7,
					"source" : [ "obj-54", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"color" : [ 0.769209325313568, 0.76918637752533, 0.769199430942535, 0.146074054621849 ],
					"destination" : [ "obj-35", 0 ],
					"midpoints" : [ 197.5, 573.0, 146.5, 573.0, 146.5, 59.0, 95.5, 59.0 ],
					"order" : 8,
					"source" : [ "obj-54", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"color" : [ 0.769209325313568, 0.76918637752533, 0.769199430942535, 0.146074054621849 ],
					"destination" : [ "obj-6", 0 ],
					"midpoints" : [ 197.5, 666.0, 651.5, 666.0 ],
					"order" : 2,
					"source" : [ "obj-54", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"color" : [ 0.769209325313568, 0.76918637752533, 0.769199430942535, 0.146074054621849 ],
					"destination" : [ "obj-9", 0 ],
					"midpoints" : [ 197.5, 573.0, 555.5, 573.0, 555.5, 495.0, 913.5, 495.0 ],
					"order" : 1,
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
					"destination" : [ "obj-34", 0 ],
					"source" : [ "obj-57", 1 ]
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
					"midpoints" : [ 1149.499908000000005, 633.0, 615.5, 633.0 ],
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
					"destination" : [ "obj-62", 0 ],
					"midpoints" : [ 179.5, 466.0, 179.5, 466.0 ],
					"source" : [ "obj-60", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"midpoints" : [ 179.5, 691.5, 615.5, 691.5 ],
					"source" : [ "obj-62", 0 ]
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
					"destination" : [ "obj-21", 0 ],
					"source" : [ "obj-65", 0 ]
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
 ]
	}

}
