import { mkdir, writeFile } from 'node:fs/promises'

// Original font files used by the reference design, stored locally for runtime use.
const fonts = [
  ['ImperialScript-Regul.woff', 'https://static.tildacdn.net/tild3662-6132-4065-a162-656631353462/ImperialScript-Regul.woff'],
  ['BeauRivage-Regular.woff', 'https://static.tildacdn.net/tild6334-3637-4038-b535-343732613265/BeauRivage-Regular.woff'],
  ['GT_Super_Display_Lig.woff', 'https://static.tildacdn.net/tild3435-3236-4634-b530-333463616662/GT_Super_Display_Lig.woff'],
  ['Ovo-Regular.woff2', 'https://static.tildacdn.net/tild6632-6530-4434-b631-333238313335/Ovo-Regular.woff2'],
  ['SourceSans3-Regular.woff', 'https://static.tildacdn.net/tild6665-3565-4465-a433-333232363232/SourceSans3-Regular.woff'],
  ['Cinzel-Regular.woff2', 'https://fonts.gstatic.com/s/cinzel/v26/8vIJ7ww63mVu7gt7-GT7LEc.woff2'],
]
const destination = new URL('../src/assets/fonts/', import.meta.url)
await mkdir(destination, { recursive: true })
const results = await Promise.allSettled(fonts.map(async ([name, url]) => {
  const response = await fetch(url, { signal: AbortSignal.timeout(25000) })
  if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`)
  const data = Buffer.from(await response.arrayBuffer())
  const signature = name.endsWith('.woff2') ? 'wOF2' : 'wOFF'
  if (data.toString('ascii', 0, 4) !== signature || data.readUInt32BE(8) !== data.length) {
    throw new Error(`${name}: invalid font data`)
  }
  await writeFile(new URL(name, destination), data)
  console.log(`${name}: ${data.length} bytes`)
}))
for (const result of results) {
  if (result.status === 'rejected') {
    console.error(result.reason)
    process.exitCode = 1
  }
}
