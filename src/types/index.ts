export type BefitDto = {
  id: number,
  userId: number,
  body: string,
  title: string,
}

export type BefitObjectDto = Record<number, BefitDto>