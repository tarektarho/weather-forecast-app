/// <reference types="vitest/globals" />
import "@testing-library/jest-dom"
import { fetch } from "cross-fetch"
import createFetchMock from "vitest-fetch-mock"

vi.mock("./utils/index", async (importOriginal) => {
  const mod = await importOriginal()
  return {
    // @ts-ignore
    ...mod,
    sleep: vi.fn(),
  }
})
const fetchMocker = createFetchMock(vi)
global.fetch = fetch
vi.mock("node-fetch")
// sets globalThis.fetch and globalThis.fetchMock to our mocked version
fetchMocker.enableMocks()
