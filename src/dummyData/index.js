

const images = [
  'https://i.ytimg.com/vi/Z2a4n4VdbOY/maxresdefault.jpg',
  'http://media.salon.com/2016/02/panthers_broncos-620x412.jpg',
  'http://www.stockportgrammar.co.uk/wordpress/wp-content/uploads/2015/04/football-1st-xi-v-old-stopfordians-1024x576.jpg',
  'http://i.telegraph.co.uk/multimedia/archive/02866/schools1_2866611b.jpg',
];
const medias = [
  ...images,
  'http://res.cloudinary.com/dcp6aksn8/video/upload/v1487502853/Incruizer/Paul_Hart_AYC_Raw_Footage_-_TransWorld_SKATEboarding_-_copie_sikgfg.mp4',
  'http://res.cloudinary.com/dcp6aksn8/video/upload/v1487502837/Incruizer/Paul_Hart_AYC_Raw_Footage_-_TransWorld_SKATEboarding_yihb1q.mp4',
];
const addresses = [
  {
    city: "California",
    country: "La",
    location: {
      latitude: 48.8351964874637,
      longitude: 2.359964890176068,
    }
  },
  {
    city: "California",
    country: "La",
    location: {
      latitude: 48.8351964874637,
      longitude: 2.347964900176068
    }
  },
  {
    city: "California",
    country: "La",
    location: {
      latitude: 48.8431964874637,
      longitude: 2.354964900176068
    }
  },
  {
    city: "California",
    country: "La",
    location: {
      latitude: 48.882601853877254,
      longitude: 2.333354407905079
    }
  }
];

const followers = [
  {
    id: 'dsf',
    picture: 'https://az736297.vo.msecnd.net/Profile/images/0bc487c9-ba19-48f4-b1f5-ec62e10e8dee_w0',
    name: 'Eric Slave',
    type: 1,
  },
  {
    id: 'pmi',
    picture: 'http://kingofwallpapers.com/eric/eric-004.jpg',
    name: 'Alain Als',
    type: 2,
  },
  {
    id: 'vbn',
    picture: 'http://media.npr.org/assets/img/2014/04/15/ericwestervelt_2014_vert-87bc366acd12f35e81f56b1b722428d2cbd4143f-s200-c85.jpg',
    name: 'Stive Rols',
    type: 1,
  },
  {
    id: 'fgs',
    picture: 'http://ericwhitacre.com/wp-content/uploads/Eric-Whitacre-2-high-res-Credit-Marc-Royce2-1-533x800.jpg',
    name: 'Claude Big',
    type: 2,
  },
];

const following = [
  {
    id: 'bdl',
    picture: 'http://cdn.screenpicks.com/wp-content/uploads/2012/09/Jesse-Tyler-Ferguson-Modern-Family.jpg',
    name: 'Stéphane Jule',
    type: 1,
  },
  {
    id: 'tgx',
    picture: 'http://ia.media-imdb.com/images/M/MV5BMjA4NDkxNTQ1NV5BMl5BanBnXkFtZTcwNDQ4MjgxNQ@@._V1._SX640_SY905_.jpg',
    name: 'Mario Fortelli',
    type: 2,
  },
  {
    id: 'wwo',
    picture: 'http://media.arkansasonline.com/img/photos/2015/03/05/resized_99263-140133-justin-t-harris_8-19369_t300.jpg?8aff03de2423e912a2467e97388a07f5331c05b6',
    name: 'Alfonso Peres',
    type: 1,
  },
];

export const me = {
    id: 'me',
    type: 1,
    biography: '',
    email: 'meUser@gmail.com',
    picture: null,
    name: 'UserName',
    type: 1,
    description: 'Current User Test',
    website: 'www.website.com',
    followers: ['Follw1', 'Follw2'],
    nbCruises: 30,
    nbFollowers: 2306,
    nbFollowing: 236,
    following: ['Fowing1', 'Fowing2', 'Fowing3', 'Fowing4'],
    friends: [
      {
        id: 'userFriend',
        email: 'aaa@aaa.com',
        picture: 'http://www.cuartopodersalta.com.ar/4podwp/wp-content/uploads/2016/09/Gerardo-Morales-3.jpg',
        name: 'Sylvain Morales',
        type: 1,
        description: 'Desc',
        website: 'www.website.com',
      },
      {
        id: 'bbbbbp',
        email: 'bbb@bbb.com',
        picture: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/1/000/0fc/0a6/28c4bd3.jpg',
        name: 'Styve Bine',
        type: 1,
        description: 'Desc',
        website: 'www.website.com',
      }
    ],
    instagramContacts: [
      {
        id: 'aazzc',
        username: 'sylvainmorales',
        email: 'aaa@aaa.com',
        picture: 'http://www.cuartopodersalta.com.ar/4podwp/wp-content/uploads/2016/09/Gerardo-Morales-3.jpg',
        name: 'Sylvain Morales',
        type: 1,
        description: 'Desc',
        website: 'www.website.com',
      },
      {
        id: 'bbbbbp',
        username: 'styvebine',
        email: 'bbb@bbb.com',
        picture: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/1/000/0fc/0a6/28c4bd3.jpg',
        name: 'Styve Bine',
        type: 1,
        description: 'Desc',
        website: 'www.website.com',
      },
      {
        id: 'aazzc',
        username: 'sylvainmorales',
        email: 'aaa@aaa.com',
        picture: 'http://www.cuartopodersalta.com.ar/4podwp/wp-content/uploads/2016/09/Gerardo-Morales-3.jpg',
        name: 'Sylvain Morales',
        type: 1,
        description: 'Desc',
        website: 'www.website.com',
      },
      {
        id: 'bbbbbp',
        username: 'styvebine',
        email: 'bbb@bbb.com',
        picture: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/1/000/0fc/0a6/28c4bd3.jpg',
        name: 'Styve Bine',
        type: 1,
        description: 'Desc',
        website: 'www.website.com',
      }
    ],
    mobileContacts: [
      {
        id: 'aazzc',
        username: 'sylvainmorales',
        email: 'aaa@aaa.com',
        picture: 'http://www.cuartopodersalta.com.ar/4podwp/wp-content/uploads/2016/09/Gerardo-Morales-3.jpg',
        name: 'Sylvain Morales',
        type: 1,
        description: 'Desc',
        website: 'www.website.com',
      },
      {
        id: 'bbbbbp',
        username: 'styvebine',
        email: 'bbb@bbb.com',
        picture: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/1/000/0fc/0a6/28c4bd3.jpg',
        name: 'Styve Bine',
        type: 1,
        description: 'Desc',
        website: 'www.website.com',
      },
            {
        id: 'aazzc',
        username: 'sylvainmorales',
        email: 'aaa@aaa.com',
        picture: 'http://www.cuartopodersalta.com.ar/4podwp/wp-content/uploads/2016/09/Gerardo-Morales-3.jpg',
        name: 'Sylvain Morales',
        type: 1,
        description: 'Desc',
        website: 'www.website.com',
      },
      {
        id: 'aazzc',
        username: 'sylvainmorales',
        email: 'aaa@aaa.com',
        picture: 'http://www.cuartopodersalta.com.ar/4podwp/wp-content/uploads/2016/09/Gerardo-Morales-3.jpg',
        name: 'Sylvain Morales',
        type: 1,
        description: 'Desc',
        website: 'www.website.com',
      },
      {
        id: 'bbbbbp',
        username: 'styvebine',
        email: 'bbb@bbb.com',
        picture: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/1/000/0fc/0a6/28c4bd3.jpg',
        name: 'Styve Bine',
        type: 1,
        description: 'Desc',
        website: 'www.website.com',
      },
            {
        id: 'aazzc',
        username: 'sylvainmorales',
        email: 'aaa@aaa.com',
        picture: 'http://www.cuartopodersalta.com.ar/4podwp/wp-content/uploads/2016/09/Gerardo-Morales-3.jpg',
        name: 'Sylvain Morales',
        type: 1,
        description: 'Desc',
        website: 'www.website.com',
      },
      {
        id: 'bbbbbp',
        username: 'styvebine',
        email: 'bbb@bbb.com',
        picture: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/1/000/0fc/0a6/28c4bd3.jpg',
        name: 'Styve Bine',
        type: 1,
        description: 'Desc',
        website: 'www.website.com',
      }
    ],
};

export const codeSentBySms = '1296';

export const users = {
  test: {
    id: 'abc',
    email: 'test@test.com',
    picture: 'https://s-media-cache-ak0.pinimg.com/236x/af/07/e9/af07e90de7f5fc56c504c7710c4d09c6.jpg',
    name: 'Alin Sarl',
    snapshot: '@alinSarl',
    type: 1,
    description: 'Biogrphie de l utilisateur avec un nombre limité de caratères',
    website: 'www.website.com',
    followers,
    following,
    moments
  },
  dev: {
    id: 'dev',
    email: 'dev@dev.com',
    picture: 'http://agent.nationwide.com/agentimages/340037716.gif',
    name: 'Amélie Gian',
    snapshot: '@a',
    type: 2,
    description: 'Premitive Demo on 3rd December',
    website: 'www.premitiveskateboard.com',
    followers,
    following,
    moments
  }
};

export const hachTags = [
  '#RedBullSunny',
  '#PrimitiveDemo',
  '#WorldChampionship',
  '#Localoca',
  '#RedBullSunny',
  '#PrimitiveDemo',
  '#WorldChampionship',
  '#Localoca',
  '#RedBullSunny',
  '#PrimitiveDemo',
  '#WorldChampionship',
  '#Localoca',
];

const tags = [
  {
  	comment: 'Lool',
  	user: users.test,
    top: 0.6,
    left: 0.5,
    rotate: '50deg',
    style:{
      color: 'red',
      fontSize: 30
    },
  	date: '14/11/2016 08:00:00 AM'
  },
  {
  	comment: 'BOOM !!',
    user: users.dev,
    date: '14/11/2016 08:00:00 AM',
    top: 0.2,
    left: 0.1,
    rotate: '-30deg',
    style:{
      color: 'yellow',
      fontSize: 90,
      fontWeight: 'bold',
    }
  }
]

const moments = [
  {
    id: 1,
    user:  users.test,
    date: '07/03/2017 09:49:00 AM',
    address: addresses[0],
    image: images[0],
    uri:  medias[0],
    tags,
    live: false,
    cluster: 23,
    unread: true,
  },
  {
    id: 2,
    user:  users.test,
    type: 'video',
    date: '19/12/2016 16:00:00 AM',
    address: addresses[0],
    image: images[0],
    uri:  medias[4],
    tags,
    live: false,
    cluster: 23,
    unread: true,
  },
  {
    id: 3,
    user:  users.dev,
    date: '17/11/2016 10:30:00 AM',
    address: addresses[1],
    image: images[1],
    uri: medias[5],
    type: 'video',
    tags,
    live: true,
    unread: true,
  },
  {
    id: 4,
    user:  users.dev,
    date: '17/11/2016 10:30:00 AM',
    address: addresses[1],
    image: images[1],
    uri: medias[1],
    tags,
    live: true,
    unread: true,
  },
  {
    id: 5,
    user:  users.dev,
    date: '22/11/2016 08:00:00 AM',
    address: addresses[2],
    image: images[2],
    uri: medias[2],
    tags,
    live: false,
    unread: true,
  },
  {
    id: 6,
    user:  users.dev,
    date: '22/11/2016 10:31:00 AM',
    address: addresses[3],
    image: images[3],
    uri: medias[3],
    tags,
    live: true,
    unread: false,
    cluster: null,
  }
];

export const notifications = [
  {
    type: 'welcome',
    unread: false,
    date: new Date(),
  },
  {
    type: 'tag',
    user:  users.test,
    unread: true,
    date: new Date(),
  },
  {
    type: 'follow',
    user:  users.dev,
    unread: false,
    date: new Date(),
  },
  {
    type: 'nearby',
    user:  users.dev,
    unread: true,
    date: new Date(),
  },
  {
    type: 'cruising',
    user:  users.dev,
    unread: false,
    date: new Date(),
  },
  {
    type: 'tag',
    user:  users.dev,
    unread: false,
    date: new Date(),
  },
];
export const usersList = [
  {
    id: 'bdl',
    picture: 'http://cdn.screenpicks.com/wp-content/uploads/2012/09/Jesse-Tyler-Ferguson-Modern-Family.jpg',
    name: 'Stéphane Jule',
    snapshot: '@stehp',
    type: 1,
  },
  {
    id: 'tgx',
    picture: 'http://ia.media-imdb.com/images/M/MV5BMjA4NDkxNTQ1NV5BMl5BanBnXkFtZTcwNDQ4MjgxNQ@@._V1._SX640_SY905_.jpg',
    name: 'Mario Fortelli',
    snapshot: '@mario',
    type: 2,
  },
  {
    id: 'wwo',
    picture: 'http://media.arkansasonline.com/img/photos/2015/03/05/resized_99263-140133-justin-t-harris_8-19369_t300.jpg?8aff03de2423e912a2467e97388a07f5331c05b6',
    name: 'Alfonso Peres',
    type: 1,
  },
  {
    id: 'dsf',
    picture: 'https://az736297.vo.msecnd.net/Profile/images/0bc487c9-ba19-48f4-b1f5-ec62e10e8dee_w0',
    name: 'Eric Slave',
    snapshot: '@ericslave',
    type: 1,
  },
  {
    id: 'pmi',
    picture: 'http://kingofwallpapers.com/eric/eric-004.jpg',
    name: 'Alain Als',
    snapshot: '@aals',
    type: 2,
  },
  {
    id: 'vbn',
    picture: 'http://media.npr.org/assets/img/2014/04/15/ericwestervelt_2014_vert-87bc366acd12f35e81f56b1b722428d2cbd4143f-s200-c85.jpg',
    name: 'Stive Rols',
    snapshot: '@stiver',
    type: 1,
  },
  {
    id: 'fgs',
    picture: 'http://ericwhitacre.com/wp-content/uploads/Eric-Whitacre-2-high-res-Credit-Marc-Royce2-1-533x800.jpg',
    name: 'Claude Big',
    snapshot: '@big',
    type: 2,
  },
  {
    id: 'wwo',
    picture: 'http://media.arkansasonline.com/img/photos/2015/03/05/resized_99263-140133-justin-t-harris_8-19369_t300.jpg?8aff03de2423e912a2467e97388a07f5331c05b6',
    name: 'Alfonso Peres',
    type: 1,
  },
  {
    id: 'dsf',
    picture: 'https://az736297.vo.msecnd.net/Profile/images/0bc487c9-ba19-48f4-b1f5-ec62e10e8dee_w0',
    name: 'Eric Slave',
    snapshot: '@ericslave',
    type: 1,
  },
  {
    id: 'pmi',
    picture: 'http://kingofwallpapers.com/eric/eric-004.jpg',
    name: 'Alain Als',
    snapshot: '@aals',
    type: 2,
  },
  {
    id: 'vbn',
    picture: 'http://media.npr.org/assets/img/2014/04/15/ericwestervelt_2014_vert-87bc366acd12f35e81f56b1b722428d2cbd4143f-s200-c85.jpg',
    name: 'Stive Rols',
    snapshot: '@stiver',
    type: 1,
  },
  {
    id: 'fgs',
    picture: 'http://ericwhitacre.com/wp-content/uploads/Eric-Whitacre-2-high-res-Credit-Marc-Royce2-1-533x800.jpg',
    name: 'Claude Big',
    snapshot: '@big',
    type: 2,
  },
];

export const messages = [
 { userId: 'me', receiverId: 'bdl', receiverId: 'me', receiverId: 'me', receiverId: 'bdl', text: 'Yes I think will be there at 8 hours.', time: 1486388878 },
  { userId: 'bdl', receiverId: 'me', text: 'What r u doing ?', time: 1486388938 },
  { userId: 'bdl', receiverId: 'me', receiverId: 'me', receiverId: 'me', text: 'I\'m on the sofa', time: 1486388943 },
 { userId: 'me', receiverId: 'bdl', receiverId: 'me', receiverId: 'me', receiverId: 'bdl', text: 'Yes I think will be there at 8 hours.', time: 1486388878 },
  { userId: 'bdl', receiverId: 'me', text: 'What r u doing ?', time: 1486388938 },
  { userId: 'bdl', receiverId: 'me', receiverId: 'me', receiverId: 'me', text: 'I\'m on the sofa', time: 1486388943 },
  { userId: 'me', receiverId: 'bdl', receiverId: 'me', receiverId: 'me', receiverId: 'bdl', text: 'Yes I think will be there at 8 hours.', time: 1486388878 },
  { userId: 'bdl', receiverId: 'me', text: 'What r u doing ?', time: 1486388938 },
  { userId: 'bdl', receiverId: 'me', receiverId: 'me', receiverId: 'me', text: 'I\'m on the sofa', time: 1486388943 },
  { userId: 'me', receiverId: 'bdl', receiverId: 'me', receiverId: 'bdl', text: 'I am here', time: 1486388990 },
  { userId: 'me', receiverId: 'tgx', receiverId: 'tgx', text: 'oups !', time: 1486388878 },
  { userId: 'tgx', receiverId: 'me', receiverId: 'me', text: 'test message 1', time: 1486388938 },
  { userId: 'tgx', receiverId: 'me', text: 'test message 2', time: 1486388943 },
  { userId: 'me', receiverId: 'tgx', text: 'Okay', time: 1486388990 },
];

export default moments;
