module.exports = [
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'blockchainId_',
        type: 'bytes4'
      },
      {
        internalType: 'address',
        name: 'feeCollector_',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'wrappedAssetMaster_',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'oracle_',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'WETH_',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bytes4',
        name: 'source',
        type: 'bytes4'
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'sourceAddress',
        type: 'bytes32'
      }
    ],
    name: 'CreatedWrappedToken',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'token',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'lockId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'bytes4',
        name: 'source',
        type: 'bytes4'
      }
    ],
    name: 'Received',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes4',
        name: 'tokenSource',
        type: 'bytes4'
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'tokenSourceAddress',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'recipient',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'lockId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'bytes4',
        name: 'destination',
        type: 'bytes4'
      }
    ],
    name: 'Sent',
    type: 'event'
  },
  {
    inputs: [],
    name: 'WETH',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'blockchainId',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4'
      },
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    name: 'externalTokenMap',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'feeCollector',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'locks',
    outputs: [
      {
        internalType: 'address',
        name: 'sender',
        type: 'address'
      },
      {
        internalType: 'bytes32',
        name: 'recipient',
        type: 'bytes32'
      },
      {
        internalType: 'bytes4',
        name: 'destination',
        type: 'bytes4'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        internalType: 'bytes4',
        name: 'tokenSource',
        type: 'bytes4'
      },
      {
        internalType: 'bytes32',
        name: 'tokenSourceAddress',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'tokenInfos',
    outputs: [
      {
        internalType: 'bytes4',
        name: 'tokenSource',
        type: 'bytes4'
      },
      {
        internalType: 'bytes32',
        name: 'tokenSourceAddress',
        type: 'bytes32'
      },
      {
        internalType: 'uint256',
        name: 'fee',
        type: 'uint256'
      },
      {
        internalType: 'uint8',
        name: 'precision',
        type: 'uint8'
      },
      {
        internalType: 'bool',
        name: 'isNative',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'unlocks',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'wrappedTokenMaster',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'lockLength',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        internalType: 'bytes32',
        name: 'recipient',
        type: 'bytes32'
      },
      {
        internalType: 'bytes4',
        name: 'destination',
        type: 'bytes4'
      }
    ],
    name: 'lock',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'recipient',
        type: 'bytes32'
      },
      {
        internalType: 'bytes4',
        name: 'destination',
        type: 'bytes4'
      }
    ],
    name: 'lockEth',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'lockId',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        internalType: 'bytes4',
        name: 'lockSource',
        type: 'bytes4'
      },
      {
        internalType: 'bytes4',
        name: 'tokenSource',
        type: 'bytes4'
      },
      {
        internalType: 'bytes32',
        name: 'tokenSourceAddress',
        type: 'bytes32'
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes'
      }
    ],
    name: 'unlock',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]
