import { HashService } from '../../infrastructure/index.js'

describe('HashService', () => {
  let hashService: HashService

  beforeAll(() => {
    hashService = new HashService()
  })

  describe('hash', () => {
    it('should hash a string', async () => {
      const data = 'some_string'
      const hashedValue = await hashService.hash(data)
      expect(hashedValue).toHaveLength(60)
    })

    it('should fail with an empty string', () => {
      const data = ''
      expect(async () => await hashService.hash(data)).rejects.toThrow('Cannot hash an empty string')
    })
  })

  describe('compare', () => {
    it('should compare a string with a hashed value correctly', async () => {
      const data = 'some_string'
      const hashedValue = await hashService.hash(data)

      const match = await hashService.compare(data, hashedValue)
      expect(match).toBe(true)
    })

    it('should compare a string with a hashed value incorrectly', async () => {
      const data = 'some_string'
      const hashedValue = await hashService.hash(data)
      const notMatch = await hashService.compare('other_string', hashedValue)
      expect(notMatch).toBe(false)
    })

    it('should fail with an empty data value', async () => {
      const data = ''
      const encrypted = 'some_encrypted_string'

      expect(async () => await hashService.compare(data, encrypted)).rejects.toThrow('Data and encrypted value cannot be empty')
    })

    it('should fail with an empty encrypted value', async () => {
      const data = 'some_string'
      const encrypted = ''

      expect(async () => await hashService.compare(data, encrypted)).rejects.toThrow('Data and encrypted value cannot be empty')
    })
  })
})
