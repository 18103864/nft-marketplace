/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/nft_marketplace_v2.json`.
 */
export type NftMarketplaceV2 = {
    "address": "Gyp5WVc2fB8XL1YbZSJJuWP6SXXXZQuy9p3W8iQ462QJ",
    "metadata": {
      "name": "nftMarketplaceV2",
      "version": "0.1.0",
      "spec": "0.1.0",
      "description": "Created with Anchor"
    },
    "instructions": [
      {
        "name": "buyNft",
        "discriminator": [
          96,
          0,
          28,
          190,
          49,
          107,
          83,
          222
        ],
        "accounts": [
          {
            "name": "listing",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    108,
                    105,
                    115,
                    116,
                    105,
                    110,
                    103
                  ]
                },
                {
                  "kind": "account",
                  "path": "mint"
                }
              ]
            }
          },
          {
            "name": "marketplace",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    109,
                    97,
                    114,
                    107,
                    101,
                    116,
                    112,
                    108,
                    97,
                    99,
                    101
                  ]
                }
              ]
            }
          },
          {
            "name": "buyer",
            "writable": true,
            "signer": true
          },
          {
            "name": "seller",
            "writable": true
          },
          {
            "name": "marketplaceAuthority",
            "writable": true
          },
          {
            "name": "mint"
          },
          {
            "name": "escrowTokenAccount",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "listing"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "mint"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "buyerTokenAccount",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "buyer"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "mint"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "metadata",
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    109,
                    101,
                    116,
                    97,
                    100,
                    97,
                    116,
                    97
                  ]
                },
                {
                  "kind": "account",
                  "path": "tokenMetadataProgram"
                },
                {
                  "kind": "account",
                  "path": "mint"
                }
              ],
              "program": {
                "kind": "account",
                "path": "tokenMetadataProgram"
              }
            }
          },
          {
            "name": "tokenProgram",
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          },
          {
            "name": "associatedTokenProgram",
            "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          },
          {
            "name": "tokenMetadataProgram",
            "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
          }
        ],
        "args": []
      },
      {
        "name": "cancelListing",
        "discriminator": [
          41,
          183,
          50,
          232,
          230,
          233,
          157,
          70
        ],
        "accounts": [
          {
            "name": "listing",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    108,
                    105,
                    115,
                    116,
                    105,
                    110,
                    103
                  ]
                },
                {
                  "kind": "account",
                  "path": "mint"
                }
              ]
            }
          },
          {
            "name": "seller",
            "signer": true
          },
          {
            "name": "mint"
          },
          {
            "name": "escrowTokenAccount",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "listing"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "mint"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "sellerTokenAccount",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "seller"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "mint"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "tokenProgram",
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          }
        ],
        "args": []
      },
      {
        "name": "createListing",
        "discriminator": [
          18,
          168,
          45,
          24,
          191,
          31,
          117,
          54
        ],
        "accounts": [
          {
            "name": "listing",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    108,
                    105,
                    115,
                    116,
                    105,
                    110,
                    103
                  ]
                },
                {
                  "kind": "account",
                  "path": "mint"
                }
              ]
            }
          },
          {
            "name": "seller",
            "writable": true,
            "signer": true
          },
          {
            "name": "mint"
          },
          {
            "name": "sellerTokenAccount",
            "writable": true
          },
          {
            "name": "escrowTokenAccount",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "listing"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "mint"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "metadata",
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    109,
                    101,
                    116,
                    97,
                    100,
                    97,
                    116,
                    97
                  ]
                },
                {
                  "kind": "account",
                  "path": "tokenMetadataProgram"
                },
                {
                  "kind": "account",
                  "path": "mint"
                }
              ],
              "program": {
                "kind": "account",
                "path": "tokenMetadataProgram"
              }
            }
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          },
          {
            "name": "tokenProgram",
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          },
          {
            "name": "associatedTokenProgram",
            "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
          },
          {
            "name": "tokenMetadataProgram",
            "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
          }
        ],
        "args": [
          {
            "name": "price",
            "type": "u64"
          }
        ]
      },
      {
        "name": "createNft",
        "discriminator": [
          231,
          119,
          61,
          97,
          217,
          46,
          142,
          109
        ],
        "accounts": [
          {
            "name": "metadata",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    109,
                    101,
                    116,
                    97,
                    100,
                    97,
                    116,
                    97
                  ]
                },
                {
                  "kind": "account",
                  "path": "tokenMetadataProgram"
                },
                {
                  "kind": "account",
                  "path": "mint"
                }
              ],
              "program": {
                "kind": "account",
                "path": "tokenMetadataProgram"
              }
            }
          },
          {
            "name": "mint",
            "writable": true,
            "signer": true
          },
          {
            "name": "tokenAccount",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "creator"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "mint"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "creator",
            "writable": true,
            "signer": true
          },
          {
            "name": "rent",
            "address": "SysvarRent111111111111111111111111111111111"
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          },
          {
            "name": "tokenProgram",
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          },
          {
            "name": "associatedTokenProgram",
            "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
          },
          {
            "name": "tokenMetadataProgram",
            "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
          }
        ],
        "args": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "sellerFeeBasisPoints",
            "type": "u16"
          }
        ]
      },
      {
        "name": "initializeMarketplace",
        "discriminator": [
          47,
          81,
          64,
          0,
          96,
          56,
          105,
          7
        ],
        "accounts": [
          {
            "name": "marketplace",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    109,
                    97,
                    114,
                    107,
                    101,
                    116,
                    112,
                    108,
                    97,
                    99,
                    101
                  ]
                }
              ]
            }
          },
          {
            "name": "authority",
            "writable": true,
            "signer": true
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": [
          {
            "name": "feePercent",
            "type": "u64"
          }
        ]
      },
      {
        "name": "updateListingPrice",
        "discriminator": [
          103,
          80,
          184,
          80,
          159,
          24,
          94,
          138
        ],
        "accounts": [
          {
            "name": "listing",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    108,
                    105,
                    115,
                    116,
                    105,
                    110,
                    103
                  ]
                },
                {
                  "kind": "account",
                  "path": "mint"
                }
              ]
            }
          },
          {
            "name": "seller",
            "signer": true
          },
          {
            "name": "mint"
          }
        ],
        "args": [
          {
            "name": "newPrice",
            "type": "u64"
          }
        ]
      },
      {
        "name": "updateMarketplaceFee",
        "discriminator": [
          28,
          15,
          40,
          156,
          16,
          211,
          77,
          17
        ],
        "accounts": [
          {
            "name": "marketplace",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    109,
                    97,
                    114,
                    107,
                    101,
                    116,
                    112,
                    108,
                    97,
                    99,
                    101
                  ]
                }
              ]
            }
          },
          {
            "name": "authority",
            "signer": true
          }
        ],
        "args": [
          {
            "name": "newFeePercent",
            "type": "u64"
          }
        ]
      }
    ],
    "accounts": [
      {
        "name": "listing",
        "discriminator": [
          218,
          32,
          50,
          73,
          43,
          134,
          26,
          58
        ]
      },
      {
        "name": "marketplace",
        "discriminator": [
          70,
          222,
          41,
          62,
          78,
          3,
          32,
          174
        ]
      }
    ],
    "errors": [
      {
        "code": 6000,
        "name": "invalidPrice",
        "msg": "Invalid price provided"
      },
      {
        "code": 6001,
        "name": "listingNotActive",
        "msg": "Listing is not active"
      },
      {
        "code": 6002,
        "name": "unauthorizedSeller",
        "msg": "Unauthorized seller"
      },
      {
        "code": 6003,
        "name": "unauthorizedAuthority",
        "msg": "Unauthorized authority"
      },
      {
        "code": 6004,
        "name": "feeTooHigh",
        "msg": "Fee percentage too high"
      },
      {
        "code": 6005,
        "name": "insufficientFunds",
        "msg": "Insufficient funds"
      },
      {
        "code": 6006,
        "name": "invalidTokenAmount",
        "msg": "Invalid token amount"
      }
    ],
    "types": [
      {
        "name": "listing",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "seller",
              "type": "pubkey"
            },
            {
              "name": "mint",
              "type": "pubkey"
            },
            {
              "name": "price",
              "type": "u64"
            },
            {
              "name": "createdAt",
              "type": "i64"
            },
            {
              "name": "isActive",
              "type": "bool"
            },
            {
              "name": "bump",
              "type": "u8"
            }
          ]
        }
      },
      {
        "name": "marketplace",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "authority",
              "type": "pubkey"
            },
            {
              "name": "feePercent",
              "type": "u64"
            },
            {
              "name": "totalSales",
              "type": "u64"
            },
            {
              "name": "totalVolume",
              "type": "u64"
            },
            {
              "name": "bump",
              "type": "u8"
            }
          ]
        }
      }
    ]
  };
  