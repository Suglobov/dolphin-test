export default [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: ( a, b ) => a.id > b.id,
    defaultSortOrder: 'ascend',
    width: 80,
  },
  {
    title: 'Название',
    dataIndex: 'name',
    sorter: ( a, b ) => a.name > b.name,
    sortDirections: [ 'descend', 'ascend' ],
    width: 200,
  },
  {
    title: 'Теги',
    scopedSlots: {
      customRender: 'tags'
    },
    width: 150,
  },
  {
    title: 'Facebook профиль',
    scopedSlots: { customRender: 'facebook-profile' },
    dataIndex: 'fb_id',
    width: 200,
  },
  {
    title: 'Статус',
    scopedSlots: { customRender: 'status' },
    dataIndex: 'status',
    width: 150,
  },
  {
    scopedSlots: { customRender: 'actions' },
    align: 'right',
    width: 150,
  }
];