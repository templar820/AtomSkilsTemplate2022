export default {
  type: 'object',
  required: ['id', 'name'],
  properties: {
    id: {
      type: 'number'
    },
    name: {
      type: 'string',
      title: 'Название',
    },
    substance: {
      type: 'object',
      title: 'Вещество',
      required: ['id', 'name', 'code'],
      properties: {
        id: {
          type: 'number',
        },
        name: {
          type: 'string',
          title: 'Название вещества',
        },
        code: {
          type: 'string',
          title: 'Код вещества',
        }
      }
    },
  }
}