import { ethers } from "hardhat";
import { FAUCET_ADDRESS } from "../utils/constants";

async function main() {
  const userAddresses = [
    {
      user: "0xC383105c17a7fA7162171f41Ffbc8bCA623b8889",
    },
    {
      user: "0x1b63930d2eC7F31e74Ef2adAdA586636A6c3A73f",
    },
    {
      user: "0xAb17A4d36CF851B66A52f47eAed028642D4aE6Bf",
    },
    {
      user: "0x15de656A99f0Fa9F13d1692Ee5b9AaC54b1F1Bf6",
    },
    {
      user: "0x5270aa4D55C0A9BBD29a66A8cb43AD69c2b95F35",
    },
    {
      user: "0x59C0aAeab00bFAB03Ca3E2F993314031BDecD31d",
    },
    {
      user: "0x2FCb93264f19bA6e5609414B88aFB5d727770fA0",
    },
    {
      user: "0x818e2dD21dB8c6B115BC6D813f7Adad4e09CeA1e",
    },
    {
      user: "0x233Fa516322C333251925060fE0890e26d1ee703",
    },
    {
      user: "0xeB64aa98e93211f2ce9e5779100414056881051A",
    },
    {
      user: "0x4D380d1F8c7875D31a9b92c92ff90f15b1478f9b",
    },
    {
      user: "0xE67d47e2856C2a4e1399Dd90fE67C71E1EE52877",
    },
    {
      user: "0x699f6CF5bdDc7208046C020067433782DE2Edc57",
    },
    {
      user: "0xD58e3D4A939Af88853887a8b947D0700f0AcE0d8",
    },
    {
      user: "0xb89129C1D53809f29052b502208A6478e9D6637a",
    },
    {
      user: "0x0Be7337E8Fe292F7684601ccA6380b07259a99E8",
    },
    {
      user: "0xE5A5d2a8832e4027FFe08D5fd3317dcf32d58f8E",
    },
    {
      user: "0xE57D70Dd0819CC17314732fE59cdc1c2Fc29BbC2",
    },
    {
      user: "0xcCfbB8400D84164b536a6b935aC4D79Df1e8871e",
    },
    {
      user: "0x541fB99b19A40936562CBe8F657b9d5F27D1dB18",
    },
    {
      user: "0xaD95Bd88470d3E3AF285616482585f70375d0E60",
    },
    {
      user: "0x9e2F6a25C4b646Ce9a7f215455E4ACAf94A171B1",
    },
    {
      user: "0x05A878D1b489a4601a2DC7d705f6465E0bFD4C9B",
    },
    {
      user: "0x13E0572eAD7731e860602D29b0Fa9CF3f283739c",
    },
    {
      user: "0x8370B645f14491F2894B8950E2e921E89DBA9E07",
    },
    {
      user: "0xa20d473C515F494339809Ef0de53bcf6aAFDf603",
    },
    {
      user: "0x4d27283E99a578deC0CD2F66Eb23694FAa7d449c",
    },
    {
      user: "0xC857532534c8b371d04B5f03c46e773cDBD82C39",
    },
    {
      user: "0xd8413e8623424ED68C4B68711B30BEE568F088e7",
    },
    {
      user: "0xaa070961400722db8E171e6D58cb6Feef12A9817",
    },
    {
      user: "0x5ef7e326Dd821fadfE039Af897DccA917616736A",
    },
    {
      user: "0xbA0F683B988152eCf1178Fcd6AC411F448F6c422",
    },
    {
      user: "0x87565F982932914823e2b4CC0C45DcC104Fe0857",
    },
    {
      user: "0x9bE7119aEb04E20B27891B701f61bb704AF72008",
    },
    {
      user: "0x0fcAB00173BB82d3329B0e9ac244E94d6DE06085",
    },
    {
      user: "0x6E11854ECCFB347Ebb3853F8B4aA999C3e9f19D0",
    },
    {
      user: "0x7fa748B9Dfe378A78AF3e1e30AEcE4dff26bbFA4",
    },
    {
      user: "0x9c780210be9895601dcf20de500e6DF0dD9a968b",
    },
    {
      user: "0x23474f83B6e333Ea894F1bfb58151dAA20dF581A",
    },
    {
      user: "0xBBeec882b07d785A79bC3dB4c7D4a5dFF7AC258A",
    },
    {
      user: "0x65D6280b8Dfe09Fba29F4768A44Fdc78b6eC1b03",
    },
    {
      user: "0x0E6B92116BF7d5c4445C92d2936998Ad8c89480f",
    },
    {
      user: "0xDA29ACe99e2b7C986f88A89319453E111bbec3a0",
    },
    {
      user: "0x7D763094c604a6a9f6d686221DEca586020C0877",
    },
    {
      user: "0x9f7476C2F73fB44f41746155eB3A1985C21463e4",
    },
    {
      user: "0x5486C84e9CD8923B7352216Db896fB928f353541",
    },
    {
      user: "0x1862e965fd8115bBC8f6e2e7EE76FbDaa306084E",
    },
    {
      user: "0x40f86ed4D0AcFb85Bec57D030e4fE74e22161f89",
    },
    {
      user: "0x5e6c28da1214Ce6DeA6Ece4BA841709C934B03A3",
    },
    {
      user: "0x10c00316b025C2215728729c59AeE008Dc2De7a9",
    },
    {
      user: "0x1D31548E3D793e326BcBf00351D8Aa623E27690B",
    },
    {
      user: "0x5E919CB911b737fF47e36dA9d21B51dD2Cee5c7A",
    },
    {
      user: "0xF0bC3E966A6Be0B5D36bD6d3D604A07372E36774",
    },
    {
      user: "0xf830aB22a985D31608e2E8b7d9d6aB3a56c4e987",
    },
    {
      user: "0x857c5FD81D773becA47E5fDA9b1Be466c6aFded9",
    },
    {
      user: "0xc8BF6A3Be8438eaFAd6112059263d5Fdc8CC3940",
    },
    {
      user: "0xd51F9D7ae995A45e9573f0D62E0137722cB9c649",
    },
  ];

  const faucet = await ethers.getContractAt(
    "MultiTokenFaucet",
    FAUCET_ADDRESS!
  );

  for (const userAddress of userAddresses) {
    try {
      // Try to format the existing address
      const formattedAddress = ethers.getAddress(userAddress.user);
      const tx = await faucet.removeUser(formattedAddress);
      await tx.wait();
      console.log(`Successfully removed user ${formattedAddress}`);
    } catch (error) {
      console.log(`Invalid address replaced with random address: ${error}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
