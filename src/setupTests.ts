/// <reference types="vitest/globals" />
import "@testing-library/jest-dom"
import { fetch } from "cross-fetch"
import createFetchMock from "vitest-fetch-mock"
const fetchMocker = createFetchMock(vi)
global.fetch = fetch
vi.mock("node-fetch")
// sets globalThis.fetch and globalThis.fetchMock to our mocked version
fetchMocker.enableMocks()
