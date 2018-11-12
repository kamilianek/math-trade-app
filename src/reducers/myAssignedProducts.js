
const INITIAL_STATE = {
  products: [
    {
      editionId: 3,
      isFetchingSince: null,
      lastSuccessfulFetch: null,
      lastFailedFetch: null,
      didInvalidate: false,
      items: [
        {
          id: 3,
          name: 'Lorem ipsum dolor sit amet',
          description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum dictum ipsum eu elit iaculis, ut pellentesque velit sollicitudin. Donec gravida quis tellus vitae lacinia. Fusce ultricies eget erat commodo consequat.',
          userId: 1,
          images: [
            { uri: 'https://multidoge.org/images/MultiDoge.png' },
            { uri: 'http://www.stickpng.com/assets/images/5845e687fb0b0755fa99d7ee.png' },
            { uri: 'https://i.ytimg.com/vi/Doxj7ACZSe4/hqdefault.jpg' },
            { uri: 'https://cdn.instructables.com/FHB/YMZ2/IGSBKJTL/FHBYMZ2IGSBKJTL.LARGE.jpg' },
            { uri: 'https://www.dailydot.com/wp-content/uploads/2018/04/pattern-2048x1024.jpg' },
          ],
        },
        {
          id: 4,
          name: 'In ultricies id leo ut fringilla',
          description: 'Mauris lobortis ultrices dui, varius condimentum erat efficitur ut. Donec eget augue leo. Suspendisse accumsan venenatis maximus.',
          userId: 1,
          images: [
            { uri: 'https://i.ytimg.com/vi/Doxj7ACZSe4/hqdefault.jpg' },
          ],
        },
        {
          id: 5,
          name: 'Nulla',
          description: 'Curabitur fringilla dui eros.',
          userId: 1,
          images: [
            { uri: 'https://cdn.instructables.com/FHB/YMZ2/IGSBKJTL/FHBYMZ2IGSBKJTL.LARGE.jpg' },
          ],
        },
        {
          id: 6,
          name: 'amet',
          description: 'Donec gravida quis tellus vitae lacinia. Fusce ultricies eget erat commodo consequat.',
          userId: 1,
          images: [
            { uri: 'https://multidoge.org/images/MultiDoge.png' },
            { uri: 'http://www.stickpng.com/assets/images/5845e687fb0b0755fa99d7ee.png' },
            { uri: 'https://i.ytimg.com/vi/Doxj7ACZSe4/hqdefault.jpg' },
            { uri: 'https://cdn.instructables.com/FHB/YMZ2/IGSBKJTL/FHBYMZ2IGSBKJTL.LARGE.jpg' },
            { uri: 'https://www.dailydot.com/wp-content/uploads/2018/04/pattern-2048x1024.jpg' },
          ],
        },
        {
          id: 7,
          name: 'fringilla',
          description: 'Mauris lobortis ultrices dui, varius condimentum erat efficitur ut. Donec eget augue leo. Suspendisse accumsan venenatis maximus.',
          userId: 1,
          images: [
            { uri: 'https://i.ytimg.com/vi/Doxj7ACZSe4/hqdefault.jpg' },
          ],
        },
        {
          id: 8,
          name: 'Nulla123123',
          description: 'Curabitur viverra urna vulputate ac. Vestibulum aliquet fermentum dignissim.',
          userId: 1,
          images: [
            { uri: 'https://cdn.instructables.com/FHB/YMZ2/IGSBKJTL/FHBYMZ2IGSBKJTL.LARGE.jpg' },
          ],
        },
        {
          id: 9,
          name: 'Lorem ipsum dolor sit amet',
          description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum dictum ipsum eu elit iaculis, ut pellentesque velit sollicitudin. Donec gravida quis tellus vitae lacinia. Fusce ultricies eget erat commodo consequat.',
          userId: 1,
          images: [
            { uri: 'https://multidoge.org/images/MultiDoge.png' },
            { uri: 'http://www.stickpng.com/assets/images/5845e687fb0b0755fa99d7ee.png' },
            { uri: 'https://i.ytimg.com/vi/Doxj7ACZSe4/hqdefault.jpg' },
            { uri: 'https://cdn.instructables.com/FHB/YMZ2/IGSBKJTL/FHBYMZ2IGSBKJTL.LARGE.jpg' },
            { uri: 'https://www.dailydot.com/wp-content/uploads/2018/04/pattern-2048x1024.jpg' },
          ],
        },
        {
          id: 10,
          name: 'In ultricies id leo ut fringilla',
          description: 'Mauris lobortis ultrices dui, varius condimentum erat efficitur ut. Donec eget augue leo. Suspendisse accumsan venenatis maximus.',
          userId: 1,
          images: [
            { uri: 'https://i.ytimg.com/vi/Doxj7ACZSe4/hqdefault.jpg' },
          ],
        },
        {
          id: 11,
          name: 'Nulla',
          description: 'Curabitur fringilla dui eros.',
          userId: 1,
          images: [
            { uri: 'https://cdn.instructables.com/FHB/YMZ2/IGSBKJTL/FHBYMZ2IGSBKJTL.LARGE.jpg' },
          ],
        },
        {
          id: 12,
          name: 'amet',
          description: 'Donec gravida quis tellus vitae lacinia. Fusce ultricies eget erat commodo consequat.',
          userId: 1,
          images: [
            { uri: 'https://multidoge.org/images/MultiDoge.png' },
            { uri: 'http://www.stickpng.com/assets/images/5845e687fb0b0755fa99d7ee.png' },
            { uri: 'https://i.ytimg.com/vi/Doxj7ACZSe4/hqdefault.jpg' },
            { uri: 'https://cdn.instructables.com/FHB/YMZ2/IGSBKJTL/FHBYMZ2IGSBKJTL.LARGE.jpg' },
            { uri: 'https://www.dailydot.com/wp-content/uploads/2018/04/pattern-2048x1024.jpg' },
          ],
        },
        {
          id: 13,
          name: 'fringilla',
          description: 'Mauris lobortis ultrices dui, varius condimentum erat efficitur ut. Donec eget augue leo. Suspendisse accumsan venenatis maximus.',
          userId: 1,
          images: [
            { uri: 'https://i.ytimg.com/vi/Doxj7ACZSe4/hqdefault.jpg' },
          ],
        },
        {
          id: 14,
          name: 'Nulla123123',
          description: 'Curabitur viverra urna vulputate ac. Vestibulum aliquet fermentum dignissim.',
          userId: 1,
          images: [
            { uri: 'https://cdn.instructables.com/FHB/YMZ2/IGSBKJTL/FHBYMZ2IGSBKJTL.LARGE.jpg' },
          ],
        },
      ],
    },
  ],
};

export const RECEIVE_ERROR_MY_ASSIGNED_PRODUCTS = 'RECEIVE_ERROR_MY_ASSIGNED_PRODUCTS';
export const REQUEST_MY_ASSIGNED_PRODUCTS = 'REQUEST_MY_ASSIGNED_PRODUCTS';
export const INVALIDATE_MY_ASSIGNED_PRODUCTS = 'INVALIDATE_MY_ASSIGNED_PRODUCTS';
export const RECEIVE_MY_ASSIGNED_PRODUCTS = 'RECEIVE_MY_ASSIGNED_PRODUCTS';


export default function myAssignedProductsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case INVALIDATE_MY_ASSIGNED_PRODUCTS:
      return {
        ...state,
        products: [...state.products.map(product => (
          product.editionId !== action.editionId ? product : {
            ...product,
            didInvalidate: true,
          }))],
      };
    case REQUEST_MY_ASSIGNED_PRODUCTS:
      return {
        ...state,
        products: [...state.products.map(product => (
          product.editionId !== action.editionId ? product : {
            ...product,
            isFetchingSince: action.timestamp,
          }))],
      };
    case RECEIVE_MY_ASSIGNED_PRODUCTS:
      return {
        ...state,
        products: [...state.products.map(product => (
          product.editionId !== action.editionId ? product : {
            ...product,
            isFetchingSince: null,
            didInvalidate: false,
            items: action.items,
            lastSuccessfulFetch: action.timestamp,
          }))],
      };
    case RECEIVE_ERROR_MY_ASSIGNED_PRODUCTS:
      return {
        ...state,
        products: [...state.products.map(product => (
          product.editionId !== action.editionId ? product : {
            ...product,
            isFetchingSince: null,
            lastFailedFetch: action.timestamp,
          }))],
      };
    default:
      return state;
  }
}
