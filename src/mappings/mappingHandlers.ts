import {SubstrateExtrinsic,SubstrateEvent,SubstrateBlock} from "@subql/types";
import {StarterEntity} from "../types";
import {Balance} from "@polkadot/types/interfaces";


const BIOAUTH_EXT_METHOD = Uint8Array.from(Buffer.from('0x0400', 'hex'));

export async function handleBlock(block: SubstrateBlock): Promise<void> {
    //Create a new starterEntity with ID using block hash
    let record = new StarterEntity(block.block.header.hash.toString());
    //Record block number
    record.blockNumber = block.block.header.number.toNumber();

    let extrinsics = block.block.extrinsics;
    for (let i = 0; i < extrinsics.length; i++) {
        let extrinsic = extrinsics[i];
        if (extrinsic.method.callIndex === BIOAUTH_EXT_METHOD) {
            record.signer = extrinsic.signer.toString();
            record.signature = extrinsic.signature.toString();


            record.ticket = extrinsic.method.args['req']['ticket'];
            record.ticketSignature = extrinsic.method.args['req']['ticketSignature'];

            await record.save();
        }
    }

}

export async function handleEvent(event: SubstrateEvent): Promise<void> {}

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {}


