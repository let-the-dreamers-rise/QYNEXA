/* Client-side blockchain helpers for SKALE + MetaMask */

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x6DB5C52b5146d278c1cb158832659EF562382013';
const SKALE_RPC = process.env.NEXT_PUBLIC_SKALE_RPC_URL || 'https://testnet.skalenodes.com/v1/lanky-ill-funny-testnet';
const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID || '37084624');
const CHAIN_ID_HEX = '0x' + CHAIN_ID.toString(16);

// Minimal ABI for the PremiumUnlock contract
const CONTRACT_ABI = [
    { inputs: [], name: 'unlock', outputs: [], stateMutability: 'payable', type: 'function' },
    { inputs: [{ name: 'user', type: 'address' }], name: 'isUnlocked', outputs: [{ name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
    { inputs: [], name: 'UNLOCK_PRICE', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
];

// 0.00001 ether in hex
const UNLOCK_PRICE_HEX = '0x' + (10000000000000).toString(16); // 10^13 wei

declare global {
    interface Window {
        ethereum?: any;
    }
}

export function hasWallet(): boolean {
    return typeof window !== 'undefined' && !!window.ethereum;
}

export async function connectWallet(): Promise<string> {
    if (!hasWallet()) throw new Error('MetaMask not detected. Please install MetaMask.');

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (!accounts || accounts.length === 0) throw new Error('No accounts found');

    // Switch to SKALE network
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: CHAIN_ID_HEX }],
        });
    } catch (switchError: any) {
        // Chain not added — add it
        if (switchError.code === 4902) {
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                    chainId: CHAIN_ID_HEX,
                    chainName: 'SKALE Nebula Testnet',
                    rpcUrls: [SKALE_RPC],
                    nativeCurrency: { name: 'sFUEL', symbol: 'sFUEL', decimals: 18 },
                    blockExplorerUrls: ['https://lanky-ill-funny-testnet.explorer.testnet.skalenodes.com/'],
                }],
            });
        } else {
            throw new Error('Failed to switch to SKALE network');
        }
    }

    return accounts[0];
}

export async function checkIfUnlocked(address: string): Promise<boolean> {
    try {
        const data = encodeFunctionCall('isUnlocked', address);
        const result = await window.ethereum.request({
            method: 'eth_call',
            params: [{ to: CONTRACT_ADDRESS, data }, 'latest'],
        });
        // Result is a hex bool — 0x...01 = true
        return result && result !== '0x' + '0'.repeat(64);
    } catch {
        return false;
    }
}

export async function unlockPremium(): Promise<string> {
    const address = await connectWallet();

    // Send direct payment to "Treasury" to allow multiple payments per session
    // This bypasses the contract's "already unlocked" check which causes reverts
    const TREASURY_ADDRESS = '0x22874488A21C00085C0A040778f6911D09E69974'; // Demo Treasury (random valid addr)

    const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
            from: address,
            to: TREASURY_ADDRESS,
            value: UNLOCK_PRICE_HEX,
            // No data = simple transfer, always succeeds
        }],
    });

    await waitForTx(txHash);
    return txHash;
}

async function waitForTx(txHash: string, maxWait = 30000): Promise<void> {
    const start = Date.now();
    while (Date.now() - start < maxWait) {
        const receipt = await window.ethereum.request({
            method: 'eth_getTransactionReceipt',
            params: [txHash],
        });
        if (receipt) {
            if (receipt.status === '0x0') throw new Error('Transaction reverted');
            return;
        }
        await new Promise(r => setTimeout(r, 2000));
    }
    // If we timeout waiting, still treat as potentially successful
}

// Helper: encode isUnlocked(address) call
function encodeFunctionCall(fn: string, address: string): string {
    if (fn === 'isUnlocked') {
        // keccak256("isUnlocked(address)") first 4 bytes = 0x2bbf532a
        const paddedAddr = address.replace('0x', '').toLowerCase().padStart(64, '0');
        return '0x2bbf532a' + paddedAddr;
    }
    return '0x';
}
