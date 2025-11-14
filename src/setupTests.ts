/// <reference types="vitest/globals" />
import "@testing-library/jest-dom"
import { fetch } from "cross-fetch"
import createFetchMock from "vitest-fetch-mock"
import { vi } from "vitest"

// Mock localStorage for tests
class LocalStorageMock {
  store: { [key: string]: string } = {}

  clear() {
    this.store = {}
  }

  getItem(key: string) {
    return this.store[key] || null
  }

  setItem(key: string, value: string) {
    this.store[key] = value.toString()
  }

  removeItem(key: string) {
    delete this.store[key]
  }

  get length() {
    return Object.keys(this.store).length
  }

  key(index: number) {
    const keys = Object.keys(this.store)
    return keys[index] || null
  }
}

globalThis.localStorage = new LocalStorageMock() as Storage

vi.mock("./utils/index", async (importOriginal) => {
  const mod = await importOriginal()
  return {
    // @ts-ignore
    ...mod,
    sleep: vi.fn(),
  }
})
const fetchMocker = createFetchMock(vi)
globalThis.fetch = fetch
vi.mock("node-fetch")
// sets globalThis.fetch and globalThis.fetchMock to our mocked version
fetchMocker.enableMocks()
