import { createDataItemSigner, dryrun, message, result } from "@permaweb/aoconnect";

export async function storeScore(playerName, score) {
  const gameProcess = "H7-v9BHbem3joIuv5wDHQQ4IUKBYGYAymbYsuuSx-uw";

  const tags = [
    { name: "Game", value: "Snake" },
    { name: "Player", value: playerName },
    { name: "Score", value: score.toString() },
    { name: "Timestamp", value: Date.now().toString() },
  ];

  const res = await message({   
    process: gameProcess,
    signer: createDataItemSigner(window.arweaveWallet),
    tags,
    data: { playerName, score },
  });

  let { Messages, Spawns, Output, Error } = await result({
    message: res,
    process: gameProcess,
  });

  console.dir(
    { Messages, Spawns, Output, Error },
    { depth: Infinity, colors: true }
  );

  return { Messages, Spawns, Output, Error };
}

export async function fetchScores() {
  const gameProcess = "H7-v9BHbem3joIuv5wDHQQ4IUKBYGYAymbYsuuSx-uw";

  const res = await dryrun({
    process: gameProcess,
    tags: [{ name: "Game", value: "Snake" }],
  }).then((res) => JSON.parse(res.Messages[0].Data));

  console.dir(res, { depth: Infinity, colors: true });

  return res;
}
