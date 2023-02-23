/* eslint-disable @typescript-eslint/no-explicit-any */
import faker, {Faker} from '@faker-js/faker'
import {useMockBehavior} from './base.decorator'

export type Fn = (...args: any[]) => any

export const fakeProps = [
  'mersenne',
  'random',
  'helpers',
  'datatype',
  'address',
  'animal',
  'commerce',
  'company',
  'database',
  'date',
  'finance',
  'git',
  'hacker',
  'image',
  'internet',
  'lorem',
  'music',
  'name',
  'phone',
  'system',
  'vehicle',
  'word'
] as const


export type FakeProp = typeof fakeProps[number]
export type MockFaker = Pick<Faker, FakeProp>

export const fakerBehaviorKey = 'faker';
const createFakeProxy = <T extends keyof MockFaker, KeyFns extends keyof MockFaker[T]>(fakeKey: T) => {
  // fix Parameter params only allow function
  type MockFnParameters<T> = T extends (...args: infer P) => any ? P : never

  // return's type
  type MockProxy = {
    [key in KeyFns]: (
      ...params: MockFnParameters<MockFaker[T][key]>
    ) => any
  }

  return new Proxy(faker[fakeKey], {
    get(target, targetKey: string) {
      const mockFn = target[targetKey as KeyFns] as unknown as Fn
      return (...params: any[]) => useMockBehavior({
        [fakerBehaviorKey]: {
          mockFn,
          params,
        },
      })
    }
  }) as unknown as MockProxy
};


export const Mersenne = createFakeProxy('mersenne')
export const Random = createFakeProxy('random')
export const Helpers = createFakeProxy('helpers')
export const Datatype = createFakeProxy('datatype')
export const Address = createFakeProxy('address')
export const Animal = createFakeProxy('animal')
export const Commerce = createFakeProxy('commerce')
export const Company = createFakeProxy('company')
export const Database = createFakeProxy('database')
export const Date = createFakeProxy('date')
export const Finance = createFakeProxy('finance')
export const Git = createFakeProxy('git')
export const Hacker = createFakeProxy('hacker')
export const Image = createFakeProxy('image')
export const Internet = createFakeProxy('internet')
export const Lorem = createFakeProxy('lorem')
export const Music = createFakeProxy('music')
export const Name = createFakeProxy('name')
export const Phone = createFakeProxy('phone')
export const System = createFakeProxy('system')
export const Vehicle = createFakeProxy('vehicle')
export const Word = createFakeProxy('word')

// export const Fake = (...params: Parameters<typeof faker.fake>) => useMockBehavior(faker.fake, ...params)
