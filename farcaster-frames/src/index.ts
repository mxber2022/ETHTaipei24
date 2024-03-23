import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { html } from 'hono/html'
import type { FrameSignaturePacket } from './types'
import { ethers } from 'ethers'
//@ts-ignore
import { abi } from "./abi.js"  
const app = new Hono()

app.get('/', (c) => {
  const frameImage = `https://placehold.co/1920x1005?text=FatcasterGiveAway`
  const framePostUrl = c.req.url

  return c.html(html`
    <html lang="en">
      <head>
        <meta property="og:image" content="${frameImage}" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${frameImage}" />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
        <meta property="fc:frame:post_url" content="${framePostUrl}" />
        <meta property="fc:frame:button:1" content="WhiteList" />
        <title>Farcaster Frames</title>
      </head>
      <body>
        <h1>Hello Farcaster!</h1>
      </body>
    </html>
  `)
})

app.post('/', async (c) => {
  try {


    /* 
      whitelist
    */
    const PrivateKey :any = process.env.PRIVATEKEY;
    const provider_sepolia: any = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/e96abcff2f494bcd81fadc53c8fd6ac9");
    const provider_zircuit: any = new ethers.providers.JsonRpcProvider("https://zircuit1.p2pify.com/");
    const provider_linea: any = new ethers.providers.JsonRpcProvider("https://rpc.goerli.linea.build");

    const signer = new ethers.Wallet(PrivateKey, provider_sepolia);
    console.log("signer: ", signer);
    const contract = new ethers.Contract("0x9d3F37D1F55Fe00D860C81abb1542FA68e613770", abi, signer);
    let tx = await contract.whitelistAddress("0x7199D548f1B30EA083Fe668202fd5E621241CC89");
    console.log("tx: ", tx);

    const body = await c.req.json<FrameSignaturePacket>()
    const { buttonIndex, inputText } = body.untrustedData

    const backgroundColors = ['green', 'purple', 'red', 'blue']

    const imageText = encodeURIComponent(inputText || 'You are WhiteListed')
    const imageColor = backgroundColors[buttonIndex - 1] || 'white'

    const frameImage = `https://placehold.co/1920x1005?text=YouAreWhiteListed`
    const framePostUrl = c.req.url

    return c.html(html`
      <html lang="en">
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${frameImage}" />
          <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
          <meta property="fc:frame:post_url" content="${framePostUrl}" />
          <meta property="fc:frame:input:text" content="Enter a message" />
          <title>Farcaster Frames</title>
        </head>
      </html>
    `)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Invalid request' }, 400)
  }
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})
