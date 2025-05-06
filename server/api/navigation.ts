// server/api/navigation.ts
export default defineEventHandler(() => {
    return {
      data: [
        {
          id: 1,
          url: '/catalog',
          name: 'Каталог',
          children: [
            { id: 2, url: '/catalog/electronics', name: 'Электроника' },
            { id: 3, url: '/catalog/fashion', name: 'Одежда и обувь' },
            { id: 4, url: '/catalog/home', name: 'Дом и интерьер' },
            { id: 5, url: '/catalog/beauty', name: 'Красота и здоровье' },
            { id: 6, url: '/catalog/sports', name: 'Спорт и отдых' },
            { id: 7, url: '/catalog/kids', name: 'Детские товары' }
          ]
        },
        {
          id: 8,
          url: '/deals',
          name: 'Акции',
          children: [
            { id: 9, url: '/deals/sale', name: 'Скидки' },
            { id: 10, url: '/deals/new', name: 'Новинки' },
            { id: 11, url: '/deals/bestsellers', name: 'Хиты продаж' }
          ]
        },
        {
          id: 12,
          url: '/brands',
          name: 'Бренды',
          children: []
        },
        {
          id: 13,
          url: '/about',
          name: 'О компании',
          children: [
            { id: 14, url: '/about/info', name: 'Информация' },
            { id: 15, url: '/about/delivery', name: 'Доставка и оплата' },
            { id: 16, url: '/about/guarantees', name: 'Гарантии' },
            { id: 17, url: '/about/contacts', name: 'Контакты' }
          ]
        },
        {
          id: 18,
          url: '/support',
          name: 'Поддержка',
          children: [
            { id: 19, url: '/support/faq', name: 'Частые вопросы' },
            { id: 20, url: '/support/returns', name: 'Возврат товара' },
            { id: 21, url: '/support/help', name: 'Центр помощи' }
          ]
        }
      ]
    }
  })
  