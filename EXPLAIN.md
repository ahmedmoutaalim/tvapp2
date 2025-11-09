C:\Users\Q\Desktop\tv-app\tvapp2\src\screens\Market.tsx in this component I was using dummyData
here is it : export const categories = [
'Boucherie & volaile',
'Essentiels Epicerie',
'Fruit & Légumes',
'Pain, Boullangerie',
'Poissonnerie',
'Maison & Lifestyle'
]

and this data per category:
export const products = [
{
category: 'Boucherie & volaile',
products: [
{
id: 1,
title: 'Couscous',
price: 50,
image: 'https://example.com/couscous.jpg'
},

      {
        id: 2,
        title: 'Tagine',
        price: 70,
        image: 'https://example.com/tagine.jpg'
      },
      {
        id: 3,
        title: 'Tagine',
        price: 70,
        image: 'https://example.com/tagine.jpg'
      },
      {
        id: 4,
        title: 'Tagine',
        price: 70,
        image: 'https://example.com/tagine.jpg'
      },
      {
        id: 5,
        title: 'Tagine',
        price: 70,
        image: 'https://example.com/tagine.jpg'
      }
    ]

},
{
category: 'Essentiels Epicerie',
products: [
{
id: 3,
title: 'Pâtes',
price: 20,
image: 'https://example.com/pates.jpg'
},
{id: 4, title: 'Riz', price: 15, image: 'https://example.com/riz.jpg'}
]
},
{
category: 'Fruit & Légumes',
products: [
{
id: 5,
title: 'Pommes',
price: 10,
image: 'https://example.com/pommes.jpg'
},
{
id: 6,
title: 'Carottes',
price: 8,
image: 'https://example.com/carottes.jpg'
}
]
},
{
category: 'Pain, Boullangerie',
products: [
{
id: 7,
title: 'Baguette',
price: 5,

        image: 'https://example.com/baguette.jpg'
      },
      {
        id: 8,
        title: 'Croissant',
        price: 3,
        image: 'https://example.com/croissant.jpg'
      }
    ]

},
{
category: 'Poissonnerie',
products: [
{
id: 9,
title: 'Saumon',
price: 40,

        image: 'https://example.com/saumon.jpg'
      },
      {id: 10, title: 'Thon', price: 35, image: 'https://example.com/thon.jpg'}
    ]

}
]

right now I have function get categories and their products, here is the function:getMarketProducts here is his path C:\Users\Q\Desktop\tv-app\tvapp2\src\services\market.ts and here is what this function return :
{"page":1,"totalPages":2,"totalItems":13,"marketProducts":[{"_id":"690e3e3228d1b06f74c3c708","title":"Fresh Apples","price":10,"category":{"_id":"690e3c3c28d1b06f74c3c702","name":"fruits"},"image":"https://res.cloudinary.com/dcsnbpgpa/image/upload/v1762541108/menu_images/oxovud4jkxsb9jllrap9.jpg","createdAt":"2025-11-07T18:45:06.417Z","updatedAt":"2025-11-07T18:45:06.417Z","__v":0},{"_id":"690e3e3d28d1b06f74c3c70c","title":"Fresh Apples","price":10,"category":{"_id":"690e3c3c28d1b06f74c3c702","name":"fruits"},"image":"https://res.cloudinary.com/dcsnbpgpa/image/upload/v1762541119/menu_images/mc2vtvvnh05ylizdn6hr.jpg","createdAt":"2025-11-07T18:45:17.294Z","updatedAt":"2025-11-07T18:45:17.294Z","__v":0},{"_id":"690e3e3e28d1b06f74c3c710","title":"Fresh Apples","price":10,"category":{"_id":"690e3c3c28d1b06f74c3c702","name":"fruits"},"image":"https://res.cloudinary.com/dcsnbpgpa/image/upload/v1762541120/menu_images/z1a2sprivy8e83jzlkt1.jpg","createdAt":"2025-11-07T18:45:18.829Z","updatedAt":"2025-11-07T18:45:18.829Z","__v":0},{"_id":"690e3e4028d1b06f74c3c714","title":"Fresh Apples","price":10,"category":{"_id":"690e3c3c28d1b06f74c3c702","name":"fruits"},"image":"https://res.cloudinary.com/dcsnbpgpa/image/upload/v1762541121/menu_images/t7fknqtfaw30sz1injdf.jpg","createdAt":"2025-11-07T18:45:20.044Z","updatedAt":"2025-11-07T18:45:20.044Z","__v":0},{"_id":"690e3e4128d1b06f74c3c718","title":"Fresh Apples","price":10,"category":{"_id":"690e3c3c28d1b06f74c3c702","name":"fruits"},"image":"https://res.cloudinary.com/dcsnbpgpa/image/upload/v1762541123/menu_images/je6xgzpncfhmxq6yub8o.jpg","createdAt":"2025-11-07T18:45:21.185Z","updatedAt":"2025-11-07T18:45:21.185Z","__v":0},{"_id":"690e3e4228d1b06f74c3c71c","title":"Fresh Apples","price":10,"category":{"_id":"690e3c3c28d1b06f74c3c702","name":"fruits"},"image":"https://res.cloudinary.com/dcsnbpgpa/image/upload/v1762541124/menu_images/tioywaqj9knkk9r5blve.jpg","createdAt":"2025-11-07T18:45:22.763Z","updatedAt":"2025-11-07T18:45:22.763Z","__v":0},{"_id":"690e3e4428d1b06f74c3c720","title":"Fresh Apples","price":10,"category":{"_id":"690e3c3c28d1b06f74c3c702","name":"fruits"},"image":"https://res.cloudinary.com/dcsnbpgpa/image/upload/v1762541126/menu_images/naeygocrdjkva78aicpi.jpg","createdAt":"2025-11-07T18:45:24.499Z","updatedAt":"2025-11-07T18:45:24.499Z","__v":0},{"_id":"690e3e5d28d1b06f74c3c724","title":" orange","price":10,"category":{"_id":"690e3c8e28d1b06f74c3c704","name":"drink"},"image":"https://res.cloudinary.com/dcsnbpgpa/image/upload/v1762541151/menu_images/naqc7z9swjakskqq1pgl.jpg","createdAt":"2025-11-07T18:45:49.853Z","updatedAt":"2025-11-07T18:45:49.853Z","__v":0},{"_id":"690e3e5f28d1b06f74c3c728","title":" orange","price":10,"category":{"_id":"690e3c8e28d1b06f74c3c704","name":"drink"},"image":"https://res.cloudinary.com/dcsnbpgpa/image/upload/v1762541153/menu_images/egbhfsy663dhha2mjn7t.jpg","createdAt":"2025-11-07T18:45:51.593Z","updatedAt":"2025-11-07T18:45:51.593Z","__v":0},{"_id":"690e3e6028d1b06f74c3c72c","title":" orange","price":10,"category":{"_id":"690e3c8e28d1b06f74c3c704","name":"drink"},"image":"https://res.cloudinary.com/dcsnbpgpa/image/upload/v1762541154/menu_images/f4kvud5hkfboa8v3ddbs.jpg","createdAt":"2025-11-07T18:45:52.689Z","updatedAt":"2025-11-07T18:45:52.689Z","__v":0}]}

use C:\Users\Q\Desktop\tv-app\tvapp2\src\interfaces\market.ts to create interfaces and replace the dummyData with the data which come from getMarketProducts using useQuery. and paginations.
