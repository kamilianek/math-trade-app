
const INITIAL_STATE = {
  isFetchingSince: null,
  lastSuccessfulFetch: null,
  lastFailedFetch: null,
  didInvalidate: false,
  items: [
    {
      id: 31,
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
      id: 41,
      name: 'In ultricies id leo ut fringilla',
      description: 'Mauris lobortis ultrices dui, varius condimentum erat efficitur ut. Donec eget augue leo. Suspendisse accumsan venenatis maximus.',
      userId: 1,
      images: [
        { uri: 'https://i.ytimg.com/vi/Doxj7ACZSe4/hqdefault.jpg' },
      ],
    },
    {
      id: 51,
      name: 'Nulla',
      description: 'Curabitur fringilla dui eros.',
      userId: 1,
      images: [
        { uri: 'https://cdn.instructables.com/FHB/YMZ2/IGSBKJTL/FHBYMZ2IGSBKJTL.LARGE.jpg' },
      ],
    },
    {
      id: 61,
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
      id: 71,
      name: 'fringilla',
      description: 'Mauris lobortis ultrices dui, varius condimentum erat efficitur ut. Donec eget augue leo. Suspendisse accumsan venenatis maximus.',
      userId: 1,
      images: [
        { uri: 'https://i.ytimg.com/vi/Doxj7ACZSe4/hqdefault.jpg' },
      ],
    },
    {
      id: 81,
      name: 'Nulla123123',
      description: 'Curabitur viverra urna vulputate ac. Vestibulum aliquet fermentum dignissim.',
      userId: 1,
      images: [
        { uri: 'https://cdn.instructables.com/FHB/YMZ2/IGSBKJTL/FHBYMZ2IGSBKJTL.LARGE.jpg' },
      ],
    },
  ],
};

export const RECEIVE_ERROR_MY_NOT_ASSIGNED_PRODUCTS = 'RECEIVE_ERROR_MY_NOT_ASSIGNED_PRODUCTS';
export const REQUEST_MY_NOT_ASSIGNED_PRODUCTS = 'REQUEST_MY_NOT_ASSIGNED_PRODUCTS';
export const INVALIDATE_MY_NOT_ASSIGNED_PRODUCTS = 'INVALIDATE_MY_NOT_ASSIGNED_PRODUCTS';
export const RECEIVE_MY_NOT_ASSIGNED_PRODUCTS = 'RECEIVE_MY_NOT_ASSIGNED_PRODUCTS';
export const UPDATE_MY_NOT_ASSIGNED_PRODUCT = 'UPDATE_MY_NOT_ASSIGNED_PRODUCT';
export const REMOVE_MY_NOT_ASSIGNED_PRODUCT = 'REMOVE_MY_NOT_ASSIGNED_PRODUCT';


export default function myNotAssignedProductsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case INVALIDATE_MY_NOT_ASSIGNED_PRODUCTS:
      return {
        ...state,
        didInvalidate: true,
      };
    case REQUEST_MY_NOT_ASSIGNED_PRODUCTS:
      return {
        ...state,
        isFetchingSince: action.timestamp,
      };
    case RECEIVE_MY_NOT_ASSIGNED_PRODUCTS:
      return {
        ...state,
        isFetchingSince: null,
        didInvalidate: false,
        items: action.items,
        lastSuccessfulFetch: action.timestamp,
      };
    case RECEIVE_ERROR_MY_NOT_ASSIGNED_PRODUCTS:
      return {
        ...state,
        isFetchingSince: null,
        lastFailedFetch: action.timestamp,
      };
    case REMOVE_MY_NOT_ASSIGNED_PRODUCT:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.itemId),
      };
    default:
      return state;
  }
}
