/*
eslint-disable camelcase
 */
import _ from 'lodash'
// import Base64 from 'crypto-js/enc-base64'
// import HmacSHA256 from 'crypto-js/hmac-sha256'
// import Utf8 from 'crypto-js/enc-utf8'
// import jwtDecode from 'jwt-decode'
// import { PartialDeep } from 'type-fest'
// import axios, { AxiosRequestConfig } from 'axios'
import mockApi from '../mock-api.json'
import MockAdapter from 'axios-mock-adapter'

interface Option {
    label: string
    value: string
}

let statesApi = mockApi.components.examples.states.value as unknown as Option[]

export const sideDataApiMocks = (mock: MockAdapter) => {
    mock.onGet('/states').reply(() => {
        return [200, statesApi]
    })
}
