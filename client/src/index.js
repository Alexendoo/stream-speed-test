let downloadBytes = 0

async function download() {
  const resp = await fetch("/source")
  const reader = resp.body.getReader()

  const start = performance.now()

  while (performance.now() - start < 1000) {
    const chunk = await reader.read()
    downloadBytes += value.byteLength.value
  }

  return reader.cancel()
}

let uploadBytes = 0

function makeUploader() {
  return new ReadableStream({
    start() {},

    pull(controller) {
      const buff = new Uint8Array(16 * 1024)
      window.crypto.getRandomValues(buff)

      controller.enqueue(buff)
    }
  })
}

async function upload() {
  const headers = new Headers()
  headers.append("Content-Type", "application/octet-stream")
  headers.append("Content-Length", "53687091200")

  const body = makeUploader()

  return await fetch("/sink", {
    headers,
    method: "POST",
    body
  })
}

/**
 * @param {number} min lower bound (inclusive)
 * @param {number} max upper bound
 * @returns {number}
 */
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
