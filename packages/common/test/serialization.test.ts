import fs from 'fs';
import { Buffer } from 'buffer/';
import { AccountAddress } from '../src/types/accountAddress';
import { GtuAmount } from '../src/types/gtuAmount';
import {
    serializeAccountTransactionForSubmission,
    serializeAccountTransactionSignature,
    serializeUpdateContractParameters,
} from '../src/serialization';
import {
    AccountTransaction,
    AccountTransactionHeader,
    AccountTransactionSignature,
    AccountTransactionType,
    SimpleTransferPayload,
} from '../src/types';
import { TransactionExpiry } from '../src/types/transactionExpiry';

test('fail account transaction serialization if no signatures', () => {
    const simpleTransferPayload: SimpleTransferPayload = {
        amount: new GtuAmount(5100000n),
        toAddress: new AccountAddress(
            '3VwCfvVskERFAJ3GeJy2mNFrzfChqUymSJJCvoLAP9rtAwMGYt'
        ),
    };

    const header: AccountTransactionHeader = {
        expiry: new TransactionExpiry(new Date(Date.now() + 1200000)),
        nonce: 0n,
        sender: new AccountAddress(
            '3VwCfvVskERFAJ3GeJy2mNFrzfChqUymSJJCvoLAP9rtAwMGYt'
        ),
    };

    const simpleTransferAccountTransaction: AccountTransaction = {
        header: header,
        payload: simpleTransferPayload,
        type: AccountTransactionType.SimpleTransfer,
    };

    expect(() =>
        serializeAccountTransactionForSubmission(
            simpleTransferAccountTransaction,
            {}
        )
    ).toThrow();
});

test('serialization of an account signature with two credentials', () => {
    const signature: AccountTransactionSignature = {
        0: {
            0: '893f2e4a230bcbeee24675454c4ca95a2f55fd33f328958b626c6fa368341e07902c9ffe7864c3bee23b2b2300ed0922eb814ea41fdee25035be8cddc5c3980f',
        },
        1: {
            0: '620d859224c40160c2bb03dbe84e9f57b8ed17f1a5df28b4e21f10658992531ef27655e6b74b8e47923e1ccb0413d563205e8b6c0cd22b3adce5dc7dc1daf603',
        },
    };

    const serializedSignature = serializeAccountTransactionSignature(signature);
    expect(serializedSignature.toString('hex')).toBe(
        '020001000040893f2e4a230bcbeee24675454c4ca95a2f55fd33f328958b626c6fa368341e07902c9ffe7864c3bee23b2b2300ed0922eb814ea41fdee25035be8cddc5c3980f0101000040620d859224c40160c2bb03dbe84e9f57b8ed17f1a5df28b4e21f10658992531ef27655e6b74b8e47923e1ccb0413d563205e8b6c0cd22b3adce5dc7dc1daf603'
    );
});

test('serialize UpdateContractParameters using CIS2 contract', () => {
    const parameter = serializeUpdateContractParameters(
        'CIS2-NFT',
        'transfer',
        [
            {
                token_id: [],
                amount: [200, 0],
                from: {
                    Account: [
                        '4RgTGQhg1Y8DAUkC2TpZsKmXdicArDqY9gcgJmBDECg4kkYNg4',
                    ],
                },
                to: {
                    Account: [
                        '3UiNwnmZ64YR423uamgZyY8RnRkD88tfn6SYtKzvWZCkyFdN94',
                    ],
                },
                data: [],
            },
        ],
        Buffer.from(fs.readFileSync('./test/resources/cis2-nft-schema.bin')),
        1
    );

    expect(parameter.toString('hex')).toBe(
        '010000c80000c320b41f1997accd5d21c6bf4992370948ed711435e0e2c9302def62afd1295f004651a37c65c8461540decd511e7440d1ff6d4191b7e2133b7239b2485be1a4860000'
    );
});
