export const ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "time_rn",
				"type": "string"
			},
			{
				"internalType": "int256",
				"name": "status",
				"type": "int256"
			},
			{
				"internalType": "string",
				"name": "pname",
				"type": "string"
			}
		],
		"name": "approval",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "time_rn",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "pname",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "status",
				"type": "bool"
			}
		],
		"name": "deployment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "time_rn",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "time_dev",
				"type": "string[]"
			},
			{
				"internalType": "string",
				"name": "pname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "pdesc",
				"type": "string"
			},
			{
				"internalType": "string[][]",
				"name": "bugs",
				"type": "string[][]"
			},
			{
				"internalType": "string[][]",
				"name": "features",
				"type": "string[][]"
			},
			{
				"internalType": "string[][]",
				"name": "bugsUn",
				"type": "string[][]"
			},
			{
				"internalType": "string[][]",
				"name": "featuresUn",
				"type": "string[][]"
			}
		],
		"name": "fromAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "role",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "accountAddress",
				"type": "address"
			}
		],
		"name": "newEmployee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_time",
				"type": "string"
			},
			{
				"internalType": "string[][]",
				"name": "new_b",
				"type": "string[][]"
			},
			{
				"internalType": "string[][]",
				"name": "new_f",
				"type": "string[][]"
			}
		],
		"name": "toAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "time_rn",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "pname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ver",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "fileName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_cid",
				"type": "string"
			}
		],
		"name": "uploadedbyDev",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "admins",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "developers",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRequests",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "timeofReport",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "patchName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "patchDescription",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "vno",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "bugTitle",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "bugDescription",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "bugPriority",
								"type": "string"
							}
						],
						"internalType": "struct bugReport[]",
						"name": "bugRequest",
						"type": "tuple[]"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "featureTitle",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "featureDescription",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "featurePriority",
								"type": "string"
							}
						],
						"internalType": "struct featureReport[]",
						"name": "featureRequest",
						"type": "tuple[]"
					},
					{
						"internalType": "bool",
						"name": "deployed",
						"type": "bool"
					},
					{
						"internalType": "int256",
						"name": "uploaded",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "approved",
						"type": "int256"
					},
					{
						"internalType": "string",
						"name": "filename",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "cid",
						"type": "string"
					}
				],
				"internalType": "struct listOfBnF[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "newPatches",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "timeofReport",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "patchName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "patchDescription",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "vno",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "bugTitle",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "bugDescription",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "bugPriority",
								"type": "string"
							}
						],
						"internalType": "struct bugReport[]",
						"name": "bugRequest",
						"type": "tuple[]"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "featureTitle",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "featureDescription",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "featurePriority",
								"type": "string"
							}
						],
						"internalType": "struct featureReport[]",
						"name": "featureRequest",
						"type": "tuple[]"
					},
					{
						"internalType": "bool",
						"name": "deployed",
						"type": "bool"
					},
					{
						"internalType": "int256",
						"name": "uploaded",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "approved",
						"type": "int256"
					},
					{
						"internalType": "string",
						"name": "filename",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "cid",
						"type": "string"
					}
				],
				"internalType": "struct listOfBnF[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "previousReq",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "bugTitle",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "bugDescription",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "bugPriority",
						"type": "string"
					}
				],
				"internalType": "struct bugReport[]",
				"name": "",
				"type": "tuple[]"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "featureTitle",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "featureDescription",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "featurePriority",
						"type": "string"
					}
				],
				"internalType": "struct featureReport[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "quality",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "reporters",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "reports",
		"outputs": [
			{
				"internalType": "bool",
				"name": "admin",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "time",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "requests",
		"outputs": [
			{
				"internalType": "string",
				"name": "timeofReport",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "patchName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "patchDescription",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "vno",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "deployed",
				"type": "bool"
			},
			{
				"internalType": "int256",
				"name": "uploaded",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "approved",
				"type": "int256"
			},
			{
				"internalType": "string",
				"name": "filename",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "cid",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sendList",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bool",
						"name": "admin",
						"type": "bool"
					},
					{
						"internalType": "string",
						"name": "time",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "bugTitle",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "bugDescription",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "bugPriority",
								"type": "string"
							}
						],
						"internalType": "struct bugReport[]",
						"name": "bugsSent",
						"type": "tuple[]"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "featureTitle",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "featureDescription",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "featurePriority",
								"type": "string"
							}
						],
						"internalType": "struct featureReport[]",
						"name": "featuresSent",
						"type": "tuple[]"
					}
				],
				"internalType": "struct fromReporter[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "unselectedBugs",
		"outputs": [
			{
				"internalType": "string",
				"name": "bugTitle",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "bugDescription",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "bugPriority",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "unselectedFeatures",
		"outputs": [
			{
				"internalType": "string",
				"name": "featureTitle",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "featureDescription",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "featurePriority",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
export const Address = "0xcaD5cFA7096A547FBA995ecD84F6C46c9743b24B";