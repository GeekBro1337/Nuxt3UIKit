interface NavChild {
    id: number
    url: string
    name: string
    children?: NavChild[]
  }